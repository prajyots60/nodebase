"use server";

import { getClientSubscriptionToken, type ClientSubscriptionToken } from "inngest/react";
import { httpRequestChannel } from "@/inngest/channels/http-request";
import { inngest } from "@/inngest/client";

export type HttpRequestToken = ClientSubscriptionToken;

export async function fetchHttpRequestRealtimeToken(): Promise<HttpRequestToken> {
  const token = await getClientSubscriptionToken(inngest, {
    channel: httpRequestChannel,
    topics: ["status"],
  });

  return token;
}
