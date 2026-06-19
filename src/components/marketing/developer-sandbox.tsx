"use client";

import { Code2, Cpu, FileJson, Terminal } from "lucide-react";
import { useState } from "react";

type Tab = "typescript" | "json" | "curl";

const CODE_EXAMPLES = {
  typescript: `import { defineNode } from "@nodebase/sdk";

export const aiParser = defineNode({
  id: "openai-sentiment",
  name: "AI Sentiment Analysis",
  inputs: {
    text: { type: "string", required: true }
  },
  async execute({ inputs, credentials }) {
    const ai = new OpenAI({ apiKey: credentials.OPENAI_API_KEY });
    const response = await ai.chat.completures.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: \`Analyze: \${inputs.text}\` }]
    });
    return { sentiment: response.choices[0].message.content };
  }
});`,
  json: `{
  "id": "workflow_01jh9823",
  "name": "Stripe Onboarding Flow",
  "nodes": [
    { "id": "trigger-1", "type": "stripeWebhook", "position": { "x": 0, "y": 150 } },
    { "id": "action-1", "type": "aiSentiment", "position": { "x": 250, "y": 250 } },
    { "id": "action-2", "type": "postgresUpsert", "position": { "x": 500, "y": 150 } }
  ],
  "edges": [
    { "id": "e1-2", "source": "trigger-1", "target": "action-1" },
    { "id": "e2-3", "source": "action-1", "target": "action-2" }
  ]
}`,
  curl: `curl -X POST https://nodebase.originly.dev/api/webhooks/google-form \\
  -H "Content-Type: application/json" \\
  -H "X-Nodebase-Signature: sha256=..." \\
  -d '{
    "userId": "usr_9812",
    "event": "form_submission",
    "data": {
      "name": "Alex Rivera",
      "feedback": "I love the speed of Nodebase!"
    }
  }'`,
};

export function DeveloperSandbox() {
  const [activeTab, setActiveTab] = useState<Tab>("typescript");

  return (
    <div className="w-full rounded-xl border border-white/5 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col">
      {/* Code Header */}
      <div className="h-11 border-b border-white/5 bg-zinc-900/30 flex items-center justify-between px-4">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("typescript")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "typescript"
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Code2 className="size-3.5" />
            TypeScript Node
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("json")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "json"
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <FileJson className="size-3.5" />
            Workflow AST
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("curl")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "curl"
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Terminal className="size-3.5" />
            Webhook Trigger
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-2xs font-mono text-zinc-600">
          <Cpu className="size-3" />
          <span>ESM Modules</span>
        </div>
      </div>

      {/* Code Body */}
      <div className="flex-1 p-5 font-mono text-[11px] md:text-xs text-zinc-300 overflow-x-auto bg-zinc-950 leading-relaxed min-h-[220px]">
        <pre className="whitespace-pre">{CODE_EXAMPLES[activeTab]}</pre>
      </div>
    </div>
  );
}
