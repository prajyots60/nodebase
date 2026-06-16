import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import type { NodeExecutor } from "@/features/executions/types";
import { openaiChannel } from "@/inngest/channels/openai";
import prisma from "@/lib/db";
import { NodeType } from "@/generated/prisma/enums";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type OpenAiData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const openAiExecutor: NodeExecutor<OpenAiData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  await publish("publish-loading-status", openaiChannel.status, {
    nodeId,
    status: "loading",
  });

  if (!data.credentialId) {
    await publish("publish-error-status", openaiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("OpenAi node: No credential configured");
  }

  if (!data.variableName) {
    await publish("publish-error-status", openaiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("OpenAi node: Variable name not configured");
  }

  if (!data.userPrompt) {
    await publish("publish-error-status", openaiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("OpenAi node: User prompt not configured");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant.";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  const credential = await step.run("get-credential", () => {
    return prisma.credential.findUnique({
      where: { id: data.credentialId, userId },
    });
  });

  if (!credential) {
    await publish("publish-error-status", openaiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("OpenAi node: Credential not found");
  }

  if (credential.type !== NodeType.OPENAI) {
    await publish("publish-error-status", openaiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("OpenAi node: Invalid credential");
  }

  const openai = createOpenAI({
    apiKey: credential.value,
  });

  try {
    const { text } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("gpt-5-mini"),
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    await publish("publish-success-status", openaiChannel.status, {
      nodeId,
      status: "success",
    });

    return {
      ...context,
      [data.variableName]: {
        text,
      },
    };
  } catch (error) {
    await publish("publish-catch-error-status", openaiChannel.status, {
      nodeId,
      status: "error",
    });
    throw error;
  }
};
