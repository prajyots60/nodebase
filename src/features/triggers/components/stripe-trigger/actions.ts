"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

export type StripeTriggerToken = ClientSubscriptionToken;

export async function fetchStripeTriggerRealtimeToken(): Promise<StripeTriggerToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: googleFormTriggerChannel,
    topics: ["status"],
  });

  return token;
}
