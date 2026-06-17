import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "@/features/executions/types";
import { discordChannel } from "@/inngest/channels/discord";
import ky from "ky";
import { decode } from "html-entities";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);

  return safeString;
});

type DiscordData = {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
  username?: string;
};

export const discordExecutor: NodeExecutor<DiscordData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish("publish-loading-status", discordChannel.status, {
    nodeId,
    status: "loading",
  });

  if (!data.content) {
    await publish("publish-error-status", discordChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Discord node: Content not configured");
  }

  if (!data.variableName) {
    await publish("publish-error-status", discordChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Discord node: Variable name not configured");
  }

  if (!data.webhookUrl) {
    await publish("publish-error-status", discordChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError("Discord node: Webhook URL not configured");
  }

  let content: string;
  let username: string | undefined;

  try {
    const rawContent = Handlebars.compile(data.content)(context);
    content = decode(rawContent);

    username = data.username
      ? decode(Handlebars.compile(data.username)(context))
      : undefined;
  } catch (error) {
    await publish("publish-error-status", discordChannel.status, {
      nodeId,
      status: "error",
    });
    throw new NonRetriableError(
      `Discord node failed to resolve template: ${error}`,
    );
  }

  try {
    const result = await step.run("discord-webhook", async () => {
      await ky.post(data.webhookUrl!, {
        json: {
          content: content.slice(0, 2000), // Discord's max message length
          username,
        },
      });

      return {
        ...context,
        [data.variableName!]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });

    await publish("publish-success-status", discordChannel.status, {
      nodeId,
      status: "success",
    });

    return result;
  } catch (error) {
    await publish("publish-catch-error-status", discordChannel.status, {
      nodeId,
      status: "error",
    });
    throw error;
  }
};
