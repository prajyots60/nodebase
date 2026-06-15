import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import type { NodeExecutor } from "@/features/executions/types";
import { anthropicChannel } from "@/inngest/channels/anthropic";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type AnthropicData = {
  variableName?: string;
  credentialId?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const anthropicExecutor: NodeExecutor<AnthropicData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  await publish("publish-loading-status", anthropicChannel.status, {
    nodeId,
    status: "loading",
  });

  // Validate before step.run — step tools (publish) can't be called inside another step
  // Temporarily bypass credential validation for testing
  // if (!data.credentialId) {
  //   await publish("publish-error-status", anthropicChannel.status, {
  //     nodeId,
  //     status: "error",
  //   });
  //   throw new NonRetriableError("Anthropic node: No credential configured");
  // }

  if (!data.variableName) {
    await publish("publish-error-status", anthropicChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Anthropic node: Variable name not configured");
  }

  if (!data.userPrompt) {
    await publish("publish-error-status", anthropicChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Anthropic node: User prompt not configured");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant.";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  //TODO

  const credentialValue = process.env.ANTHROPIC_API_KEY;

  const anthropic = createAnthropic({
    apiKey: credentialValue,
  });

  try {
    const { text } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        system: systemPrompt,
        prompt: userPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    await publish("publish-success-status", anthropicChannel.status, {
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
    await publish("publish-catch-error-status", anthropicChannel.status, {
      nodeId,
      status: "error",
    });
    throw error;
  }
};
