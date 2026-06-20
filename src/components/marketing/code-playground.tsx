"use client";

import { Code2, MessageSquare, Sparkles, Terminal } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface NodeCodeTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  typescript: string;
  visualNode: {
    title: string;
    type: string;
    params: { name: string; value: string }[];
    outputType: string;
  };
}

const codeTabs: NodeCodeTab[] = [
  {
    id: "stripe",
    name: "Stripe Webhook",
    icon: <Sparkles className="size-4" />,
    title: "Define a Stripe Trigger",
    typescript: `import { createTrigger } from "@nodebase/sdk";

export const stripeTrigger = createTrigger({
  id: "stripe-charge-succeeded",
  displayName: "Stripe Charge Succeeded",
  event: "charge.succeeded",
  outputSchema: z.object({
    amount: z.number(),
    email: z.string(),
    customerId: z.string()
  })
});`,
    visualNode: {
      title: "Stripe Charge Succeeded",
      type: "TRIGGER",
      params: [
        { name: "Event", value: "charge.succeeded" },
        { name: "Output Schema", value: "ZodObject" },
      ],
      outputType: "charge_data",
    },
  },
  {
    id: "gemini",
    name: "Gemini AI Node",
    icon: <Code2 className="size-4" />,
    title: "Define a Gemini Executor",
    typescript: `import { createExecutor } from "@nodebase/sdk";

export const geminiParser = createExecutor({
  id: "gemini-sentiment",
  displayName: "Gemini Sentiment Parser",
  run: async ({ input, credentials }) => {
    const ai = getGeminiClient(credentials);
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: \`Analyze: \${input.email}\`
    });
    return { sentiment: result.text };
  }
});`,
    visualNode: {
      title: "Gemini Sentiment Parser",
      type: "EXECUTOR",
      params: [
        { name: "Model", value: "gemini-3.5-flash" },
        { name: "Input Source", value: "stripe.email" },
      ],
      outputType: "sentiment_text",
    },
  },
  {
    id: "discord",
    name: "Discord Bot Alert",
    icon: <MessageSquare className="size-4" />,
    title: "Define a Discord Notification Node",
    typescript: `import { createExecutor } from "@nodebase/sdk";

export const discordNotifier = createExecutor({
  id: "discord-webhook-alert",
  displayName: "Discord Alert",
  run: async ({ input }) => {
    await fetch(input.webhookUrl, {
      method: "POST",
      body: JSON.stringify({
        content: \`New payment of $\${input.amount}!\`
      })
    });
  }
});`,
    visualNode: {
      title: "Discord Alert",
      type: "EXECUTOR",
      params: [
        { name: "Webhook Url", value: "env.DISCORD_WEBHOOK" },
        { name: "Content", value: "New payment..." },
      ],
      outputType: "void",
    },
  },
];

export function CodePlayground() {
  const [activeTabId, setActiveTabId] = useState<string>("stripe");

  const activeTab = codeTabs.find((t) => t.id === activeTabId) || codeTabs[0];

  return (
    <div className="w-full border border-zinc-800 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 flex flex-col">
      {/* Header with Selector Tabs */}
      <div className="border-b border-zinc-800 bg-zinc-900/60 px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-primary" />
          <span className="text-xs font-mono font-bold tracking-wider text-zinc-200">
            CODE-FIRST PLAYGROUND
          </span>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {codeTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Visual Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Editor panel (left 7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto min-h-[250px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-zinc-500 mb-4 pb-2 border-b border-zinc-800/80">
              <span>{activeTab.typescript ? "node-definition.ts" : ""}</span>
              <span className="text-[10px] text-emerald-400">
                ✓ Type Checked
              </span>
            </div>
            <pre className="leading-relaxed">
              <code>{activeTab.typescript}</code>
            </pre>
          </div>
          <div className="text-[10px] text-zinc-500 mt-6 pt-2 border-t border-zinc-800/80">
            Nodebase automatically generates schema validation rules & forms
            based on these definitions.
          </div>
        </div>

        {/* Visual node representation (right 5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col items-center justify-center bg-zinc-900/20">
          <div className="w-full max-w-[280px] border border-zinc-800 bg-zinc-900/80 rounded-xl p-4 shadow-lg hover:border-zinc-700 transition relative text-zinc-300">
            {/* Input handle indicator */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 size-2 rounded-full bg-zinc-500 -translate-x-1" />
            {/* Output handle indicator */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 rounded-full bg-zinc-500 translate-x-1" />

            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
              <span className="text-xs font-bold truncate leading-none text-zinc-100">
                {activeTab.visualNode.title}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider bg-primary/10 text-primary border border-primary/20">
                {activeTab.visualNode.type}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {activeTab.visualNode.params.map((p) => (
                <div
                  key={p.name}
                  className="flex justify-between items-center text-[10px]"
                >
                  <span className="text-zinc-500">{p.name}</span>
                  <span className="font-mono text-zinc-300 font-semibold truncate max-w-[140px]">
                    {p.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-zinc-800 text-[10px]">
              <span className="text-zinc-500">Output payload</span>
              <span className="font-mono font-bold text-emerald-400">
                {activeTab.visualNode.outputType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
