"use client";

import { Check, ChevronRight, GitMerge, Server, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  details: string;
  metrics: { name: string; value: string }[];
  visualCode: string;
}

const steps: Step[] = [
  {
    id: "trigger",
    title: "1. Event Ingress",
    subtitle: "Webhooks, schedules, triggers",
    icon: <Zap className="size-5" />,
    details:
      "All requests hit our stateless endpoint, are parsed against custom Zod schemas, validated, and logged immediately for security and traceability.",
    metrics: [
      { name: "Ingress Latency", value: "< 14ms" },
      { name: "Parser Validation", value: "Zod Schema" },
    ],
    visualCode: `// Trigger Endpoint Validation
const event = triggerSchema.safeParse(req.body);
if (!event.success) return badRequest();
await engine.queueEvent(event.data);`,
  },
  {
    id: "durable",
    title: "2. Durable Orchestrator",
    subtitle: "Durable state & queues",
    icon: <GitMerge className="size-5" />,
    details:
      "Using durable execution patterns, our state manager persists every node step to PostgreSQL. If the server fails mid-execution, it recovers and resumes.",
    metrics: [
      { name: "State Store", value: "PostgreSQL" },
      { name: "Max Execution Timeout", value: "30 Days" },
    ],
    visualCode: `// Resilient Step Execution
await step.run("query-db", async () => {
  return db.select().from(users);
}); // Auto-retries & restores state`,
  },
  {
    id: "worker",
    title: "3. Node Execution Engine",
    subtitle: "Serverless step worker",
    icon: <Server className="size-5" />,
    details:
      "Each individual node operates in an isolated context. Actions run in parallel where possible, logging step payloads to Prisma for interactive replay.",
    metrics: [
      { name: "Execution Context", value: "Node.js v20" },
      { name: "Max Concurrency", value: "10,000 runs" },
    ],
    visualCode: `// Concurrent Action Runners
const results = await Promise.all([
  engine.runNode("gpt-4", payload),
  engine.runNode("slack-send", slackPayload)
]);`,
  },
];

export function ArchitectureVisualizer() {
  const [activeStepId, setActiveStepId] = useState<string>("trigger");

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Selector sidebar (left 5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStepId(step.id)}
              className={`flex items-start text-left gap-4 p-4 rounded-xl border transition-all ${
                isActive
                  ? "bg-card border-primary/40 shadow-lg shadow-primary/5"
                  : "border-border hover:border-zinc-500 bg-muted/10"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border shrink-0 ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-foreground">
                    {step.title}
                  </h4>
                  <ChevronRight
                    className={`size-4 text-muted-foreground transition-transform ${
                      isActive ? "translate-x-1" : ""
                    }`}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel (right 7 cols) */}
      <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
        <div className="h-12 border-b border-zinc-800 bg-zinc-900/60 px-6 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-zinc-400">
            ARCHITECTURE_SPEC.TSX
          </span>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-3 text-zinc-100">
            {activeStep.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            {activeStep.details}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {activeStep.metrics.map((metric) => (
              <div
                key={metric.name}
                className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                  {metric.name}
                </div>
                <div className="text-sm font-bold text-zinc-200 mt-1 flex items-center gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0" />
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Code Mockup */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 font-mono text-xs overflow-x-auto select-none text-zinc-300">
            <pre className="leading-relaxed">
              <code>{activeStep.visualCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
