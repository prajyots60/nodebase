// src/inngest/functions.ts
import { inngest } from "./client";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { google } from '@ai-sdk/google';
import { generateText } from "ai";

const google = createGoogleGenerativeAI();

export const queryExecute = inngest.createFunction(
  { id: "query-execute", triggers: { event: "query.execute" } },
  async ({ event, step }) => {
    await step.sleep("pretend-sleep", 5000);
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant.",
      prompt: "What is India?",
    });

    return steps;
  },
);
