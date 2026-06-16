"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCredentialsByType } from "@/features/credentials/hooks/use-credentials";
import { NodeType } from "@/generated/prisma/enums";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and container only letters, numbers, and underscores",
    }),
  credentialId: z.string().min(1, "Credential is required"),
  systemPrompt: z.string().optional(),
  userPrompt: z.string().min(1, "User prompt is required"),
});

export type GeminiFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<GeminiFormValues>;
}

export const GeminiDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(NodeType.GEMINI);

  const form = useForm<GeminiFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      credentialId: defaultValues.credentialId || "",
      systemPrompt: defaultValues.systemPrompt || "",
      userPrompt: defaultValues.userPrompt || "",
    },
  });

  // Reset form values when dialog opens with new defaults
  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        credentialId: defaultValues.credentialId || "",
        systemPrompt: defaultValues.systemPrompt || "",
        userPrompt: defaultValues.userPrompt || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchVariableName = form.watch("variableName") || "myGemini";

  const handleSubmit = (values: GeminiFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gemini Configuration</DialogTitle>
          <DialogDescription>
            Configure the AI model and prompts for this node.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 pt-2"
        >
          <Controller
            control={form.control}
            name="variableName"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Variable Name</FieldLabel>
                <Input placeholder="myGemini" {...field} />
                <FieldDescription>
                  Use this name to reference the result in other nodes:{" "}
                  {`{{${watchVariableName}.httpResponse.data}}`}
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="credentialId"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Gemini Credential</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoadingCredentials || !credentials?.length}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a credential" />
                  </SelectTrigger>
                  <SelectContent>
                    {credentials?.map((credential) => (
                      <SelectItem key={credential.id} value={credential.id}>
                        <div className="flex items-center gap-2">
                          <Image
                            src="/logos/gemini.svg"
                            alt="Gemini"
                            width={16}
                            height={16}
                          />
                          {credential.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="systemPrompt"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>System Prompt (Optional)</FieldLabel>
                <Textarea
                  placeholder="You are a helpful assistant."
                  className="min-h-[80px] font-mono text-sm"
                  {...field}
                />
                <FieldDescription>
                  Sets the behavior of the assistant. Use {"{{variables}}"} for
                  simple values or {"{{json variable}}"} to stringify objects
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="userPrompt"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>User Prompt</FieldLabel>
                <Textarea
                  placeholder="Summarize this text: {{json httpResponse.data}}"
                  className="min-h-[80px] font-mono text-sm"
                  {...field}
                />
                <FieldDescription>
                  The prompt to send to the AI. Use {"{{variables}}"} for simple
                  values or {"{{json variable}}"} to stringify objects
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <DialogFooter className="mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
