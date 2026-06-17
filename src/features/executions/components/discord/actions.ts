"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { discordChannel } from "@/inngest/channels/discord";

export type DiscordToken = ClientSubscriptionToken;

export async function fetchDiscordRealtimeToken(): Promise<DiscordToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: discordChannel,
    topics: ["status"],
  });

  return token;
}
