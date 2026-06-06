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

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and container only letters, numbers, and underscores",
    }),
  endpoint: z.string().min(1, { message: "Please enter a valid URL" }),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
});

export type HttpRequestFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<HttpRequestFormValues>;
}

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<HttpRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      endpoint: defaultValues.endpoint || "",
      method: defaultValues.method || "GET",
      body: defaultValues.body || "",
    },
  });

  // Reset form values when dialog opens with new defaults
  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        endpoint: defaultValues.endpoint || "",
        method: defaultValues.method || "GET",
        body: defaultValues.body || "",
      });
    }
  }, [
    open,
    form,
    defaultValues.variableName,
    defaultValues.endpoint,
    defaultValues.method,
    defaultValues.body,
  ]);

  const watchVariableName = form.watch("variableName") || "myApiCall";
  const watchMethod = form.watch("method");
  const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod);

  const handleSubmit = (values: HttpRequestFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP Request node.
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
                <Input placeholder="myApiCall" {...field} />
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
            name="method"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Method</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  The HTTP method to use for this request
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="endpoint"
            render={({ field, fieldState }) => (
              <Field data-invalid={!!fieldState.error}>
                <FieldLabel>Endpoint URL</FieldLabel>
                <Input
                  placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                  {...field}
                />
                <FieldDescription>
                  Static URL or use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {showBodyField && (
            <Controller
              control={form.control}
              name="body"
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel>Request Body</FieldLabel>
                  <Textarea
                    placeholder={
                      '{\n  "userId": "{{httpResponse.data.id}}",\n  "name": "{{httpResponse.data.name}}",\n  "items": "{{httpResponse.data.items}}"\n}'
                    }
                    className="h-[180px] resize-none overflow-y-auto font-mono text-sm"
                    style={{ fontFamily: "monospace", fontSize: "14px" }}
                    {...field}
                  />
                  <FieldDescription>
                    JSON with template variables. Use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects
                  </FieldDescription>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
          )}
          <DialogFooter className="mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
