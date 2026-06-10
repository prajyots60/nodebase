"use server";

import {
  getClientSubscriptionToken,
  type ClientSubscriptionToken,
} from "inngest/react";
import { inngest } from "@/inngest/client";
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

export type GoogleFormTriggerToken = ClientSubscriptionToken;

export async function fetchGoogleFormTriggerRealtimeToken(): Promise<GoogleFormTriggerToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: googleFormTriggerChannel,
    topics: ["status"],
  });

  return token;
}
