"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { openaiChannel } from "@/inngest/channels/openai";

export type OpenAiToken = ClientSubscriptionToken;

export async function fetchOpenAiRealtimeToken(): Promise<OpenAiToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: openaiChannel,
    topics: ["status"],
  });

  return token;
}
