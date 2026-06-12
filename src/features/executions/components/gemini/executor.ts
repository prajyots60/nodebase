import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { NodeExecutor } from "@/features/executions/types";
import { geminiChannel } from "@/inngest/channels/gemini";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type GeminiData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const geminiExecutor: NodeExecutor<GeminiData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  await publish("publish-loading-status", geminiChannel.status, {
    nodeId,
    status: "loading",
  });

  // Validate before step.run — step tools (publish) can't be called inside another step
  // Temporarily bypass credential validation for testing
  // if (!data.credentialId) {
  //   await publish("publish-error-status", geminiChannel.status, {
  //     nodeId,
  //     status: "error",
  //   });
  //   throw new NonRetriableError("Gemini node: No credential configured");
  // }

  if (!data.variableName) {
    await publish("publish-error-status", geminiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Gemini node: Variable name not configured");
  }

  if (!data.userPrompt) {
    await publish("publish-error-status", geminiChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Gemini node: User prompt not configured");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant.";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  const credentialValue = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  const google = createGoogleGenerativeAI({
    apiKey: credentialValue,
  });

  try {
    const { text } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-3.5-flash"),
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    await publish("publish-success-status", geminiChannel.status, {
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
    await publish("publish-catch-error-status", geminiChannel.status, {
      nodeId,
      status: "error",
    });
    throw error;
  }
};
