// src/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "nodebase",
  isDev: process.env.NODE_ENV !== "production",
});
