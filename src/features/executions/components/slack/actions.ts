"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { slackChannel } from "@/inngest/channels/slack";

export type SlackToken = ClientSubscriptionToken;

export async function fetchSlackRealtimeToken(): Promise<SlackToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: slackChannel,
    topics: ["status"],
  });

  return token;
}
