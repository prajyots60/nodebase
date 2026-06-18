import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "@/features/executions/types";
import { slackChannel } from "@/inngest/channels/slack";
import ky from "ky";
import { decode } from "html-entities";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type SlackData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
};

export const slackExecutor: NodeExecutor<SlackData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish("publish-loading-status", slackChannel.status, {
    nodeId,
    status: "loading",
  });

  if (!data.content) {
    await publish("publish-error-status", slackChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Slack node: Content not configured");
  }

  if (!data.variableName) {
    await publish("publish-error-status", slackChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Slack node: Variable name not configured");
  }

  if (!data.webhookUrl) {
    await publish("publish-error-status", slackChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Slack node: Webhook URL not configured");
  }

  let content: string;

  try {
    const rawContent = Handlebars.compile(data.content)(context);
    content = decode(rawContent);
  } catch (error) {
    await publish("publish-error-status", slackChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError(
      `Slack node failed to resolve template: ${error}`,
    );
  }

  try {
    const result = await step.run("slack-webhook", async () => {
      await ky.post(data.webhookUrl!, {
        json: {
          content: content,
        },
      });

      return {
        ...context,
        [data.variableName!]: {
          messageContent: content,
        },
      };
    });

    await publish("publish-success-status", slackChannel.status, {
      nodeId,
      status: "success",
    });

    return result;
  } catch (error) {
    await publish("publish-catch-error-status", slackChannel.status, {
      nodeId,
      status: "error",
    });
    throw error;
  }
};
