// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";

import { NonRetriableError } from "inngest";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow", triggers: { event: "workflows/execute.workflow" } },
  async ({ event, step }) => {
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId;

    if (!inngestEventId || !workflowId) {
      throw new NonRetriableError("Event ID or workflow ID is missing");
    }

    const nodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return workflow.nodes;
    });

    return { nodes };
  },
);
