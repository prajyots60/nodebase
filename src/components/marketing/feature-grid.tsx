"use client";

import {
  Bot,
  Clock,
  Code,
  RefreshCcw,
  Server,
  Shield,
  TerminalSquare,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { DeveloperSandbox } from "./developer-sandbox";

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {/* Card 1: Durable Execution — wide (4 cols) */}
      <div className="md:col-span-4 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-colors">
        <Server className="size-6 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2 text-foreground">
          Durable Execution
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          Powered by Inngest. Workflows survive server restarts, handle
          automatic retries, and support sleep states up to days.
        </p>
        {/* Mini timeline visualization */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md">
            <Zap className="size-3" />
            Trigger
          </div>
          <div className="w-6 h-px bg-border" />
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-md">
            <Clock className="size-3" />
            Sleep(5m)
          </div>
          <div className="w-6 h-px bg-border" />
          <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md">
            <RefreshCcw className="size-3" />
            Retry ×3
          </div>
          <div className="w-6 h-px bg-border" />
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md">
            ✓ Success
          </div>
        </div>
      </div>

      {/* Card 2: AI Native — square (2 cols) */}
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-colors">
        <Bot className="size-6 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2 text-foreground">AI Native</h3>
        <p className="text-sm text-muted-foreground mb-6">
          First-class Vercel AI SDK integration. Drag-and-drop LLM nodes.
        </p>
        {/* Real integration logos */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
            <Image
              src="/logos/openai.svg"
              alt="OpenAI"
              width={16}
              height={16}
            />
            <span className="text-xs font-medium text-foreground">OpenAI</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
            <Image
              src="/logos/anthropic.svg"
              alt="Anthropic"
              width={16}
              height={16}
            />
            <span className="text-xs font-medium text-foreground">Claude</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
            <Image
              src="/logos/gemini.svg"
              alt="Gemini"
              width={16}
              height={16}
            />
            <span className="text-xs font-medium text-foreground">Gemini</span>
          </div>
        </div>
      </div>

      {/* Card 3: Self-Hostable — square (2 cols) */}
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-colors">
        <Shield className="size-6 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2 text-foreground">
          Self-Hostable
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your data, your infrastructure. Deploy with Docker or Vercel.
        </p>
        {/* Terminal block */}
        <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <TerminalSquare className="size-3" />
            <span>terminal</span>
          </div>
          <div className="text-emerald-400">
            <span className="text-zinc-500">$</span> docker compose up -d
          </div>
          <div className="text-zinc-400 mt-1">
            ✓ nodebase-app running on :3000
          </div>
        </div>
      </div>

      {/* Card 4: Code-First — wide (4 cols) */}
      <div className="md:col-span-4 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-colors">
        <Code className="size-6 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2 text-foreground">
          Code-First Extensibility
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Write custom nodes in pure TypeScript. No proprietary DSLs — if it
          runs in Node.js, it runs in Nodebase.
        </p>
        <DeveloperSandbox />
      </div>
    </div>
  );
}
