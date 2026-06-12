"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { geminiChannel } from "@/inngest/channels/gemini";

export type GeminiToken = ClientSubscriptionToken;

export async function fetchGeminiRealtimeToken(): Promise<GeminiToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: geminiChannel,
    topics: ["status"],
  });

  return token;
}
