"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

export type ManualTriggerToken = ClientSubscriptionToken;

export async function fetchManualTriggerRealtimeToken(): Promise<ManualTriggerToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: manualTriggerChannel,
    topics: ["status"],
  });

  return token;
}
