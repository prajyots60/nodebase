"use client";

import {
  Bot,
  Clock,
  Code,
  Database,
  KeyRound,
  RefreshCcw,
  Server,
  Shield,
  TerminalSquare,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CodePlayground } from "./code-playground";

export function FeatureGrid() {
  const [retryCount, setRetryCount] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      {/* Card 1: Durable Execution — wide (4 cols) */}
      <div className="md:col-span-4 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between min-h-[280px] shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Server className="size-5 text-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              RESILIENCE
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Durable Execution State
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md leading-relaxed">
            Powered by resilient transaction engines. Workflows survive server
            restarts, handle automatic backoff retries, and support sleep states
            up to days.
          </p>
        </div>

        {/* Dynamic interactive timeline visualization */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono bg-muted/40 p-4 rounded-xl border border-border/40">
          <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20">
            <Zap className="size-3.5" />
            Trigger
          </div>
          <div className="w-4 h-px bg-border" />
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-500/20">
            <Clock className="size-3.5" />
            Sleep(5m)
          </div>
          <div className="w-4 h-px bg-border" />
          <button
            type="button"
            onClick={() => setRetryCount((prev) => (prev + 1) % 4)}
            className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-500/20 transition"
          >
            <RefreshCcw
              className={`size-3.5 ${retryCount > 0 ? "animate-spin" : ""}`}
            />
            {retryCount === 0
              ? "Retry (Click to test)"
              : `Retry #${retryCount}`}
          </button>
          <div className="w-4 h-px bg-border" />
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            ✓ Success
          </div>
        </div>
      </div>

      {/* Card 2: AI Native — square (2 cols) */}
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between min-h-[280px] shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="size-5 text-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              INTEGRATION
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            AI Orchestration
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            First-class AI orchestration support. Drag-and-drop LLM nodes and
            parse natural language schemas seamlessly.
          </p>
        </div>

        {/* Real integration logos with premium look */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-muted/30 border border-border/50 hover:border-zinc-500 dark:hover:border-zinc-400 transition">
            <Image
              src="/logos/openai.svg"
              alt="OpenAI"
              width={20}
              height={20}
            />
            <span className="text-[9px] font-bold text-foreground">OpenAI</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-muted/30 border border-border/50 hover:border-zinc-500 dark:hover:border-zinc-400 transition">
            <Image
              src="/logos/anthropic.svg"
              alt="Claude"
              width={20}
              height={20}
            />
            <span className="text-[9px] font-bold text-foreground">Claude</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-muted/30 border border-border/50 hover:border-zinc-500 dark:hover:border-zinc-400 transition">
            <Image
              src="/logos/gemini.svg"
              alt="Gemini"
              width={20}
              height={20}
            />
            <span className="text-[9px] font-bold text-foreground">Gemini</span>
          </div>
        </div>
      </div>

      {/* Card 3: Self-Hostable — square (2 cols) */}
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between min-h-[280px] shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="size-5 text-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              DEPLOYMENT
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Self-Hostable
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Your data, your servers. Deploy with Docker or Serverless to any
            cloud in minutes.
          </p>
        </div>

        {/* Terminal block */}
        <div className="rounded-xl bg-muted/30 border border-border/60 p-3.5 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-2 text-muted-foreground mb-2.5">
            <TerminalSquare className="size-3.5" />
            <span>docker-compose.yml</span>
          </div>
          <div className="text-emerald-600 dark:text-emerald-400">
            <span className="text-muted-foreground">$</span> docker compose up
            -d
          </div>
          <div className="text-zinc-700 dark:text-zinc-300 mt-1 text-[11px]">
            ✓ engine running on :3000
          </div>
        </div>
      </div>

      {/* Card 4: Secrets Manager — square (2 cols) */}
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between min-h-[280px] shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <KeyRound className="size-5 text-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              SECURITY
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Secure Secrets
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Credentials are fully encrypted at rest using AES-256-GCM. Decrypted
            only during step execution.
          </p>
        </div>

        {/* Encrypted visual tag */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 border border-border/60 font-mono text-[10px] text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center gap-2">
            <Database className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>API_KEY</span>
          </div>
          <span className="text-muted-foreground">aes256:8b4f...1e3a</span>
        </div>
      </div>

      {/* Card 5: Code-First Extensibility — wide (6 cols or col-span-2) */}
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between min-h-[280px] shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Code className="size-5 text-primary" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              EXTENSIBILITY
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground">
            Code-First Extensibility
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Write custom nodes in pure TypeScript. No proprietary DSLs — if it
            runs in Node.js, it runs in Nodebase.
          </p>
        </div>
        <div className="p-3 bg-muted/30 rounded-xl border border-border/40 font-mono text-[11px] text-zinc-800 dark:text-zinc-200">
          npm i @nodebase/sdk
        </div>
      </div>

      {/* Code Playground Section (Full Width 6 columns) */}
      <div className="md:col-span-6 mt-4">
        <CodePlayground />
      </div>
    </div>
  );
}
