"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { anthropicChannel } from "@/inngest/channels/anthropic";

export type AnthropicToken = ClientSubscriptionToken;

export async function fetchAnthropicRealtimeToken(): Promise<AnthropicToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: anthropicChannel,
    topics: ["status"],
  });

  return token;
}
