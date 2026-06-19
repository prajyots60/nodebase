"use client";

import { Check, Globe, Terminal, Zap } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "trigger" | "ai" | "http" | "notify" | "done";

type LogLine = {
  id: string;
  icon: string;
  color: string;
  text: string;
};

const NODES = [
  {
    id: "stripe",
    label: "Stripe",
    detail: "checkout.completed",
    logo: "/logos/stripe.svg",
    color: "border-indigo-500/50",
    activeColor: "border-indigo-400 shadow-indigo-500/20",
    phase: "trigger" as Phase,
  },
  {
    id: "anthropic",
    label: "Anthropic",
    detail: "claude-sonnet-4-6",
    logo: "/logos/anthropic.svg",
    color: "border-orange-500/50",
    activeColor: "border-orange-400 shadow-orange-500/20",
    phase: "ai" as Phase,
  },
  {
    id: "http",
    label: "HTTP Request",
    detail: "POST /api/enrich",
    icon: Globe,
    color: "border-blue-500/50",
    activeColor: "border-blue-400 shadow-blue-500/20",
    phase: "http" as Phase,
  },
  {
    id: "slack",
    label: "Slack",
    detail: "#sales-alerts",
    logo: "/logos/slack.svg",
    color: "border-emerald-500/50",
    activeColor: "border-emerald-400 shadow-emerald-500/20",
    phase: "notify" as Phase,
  },
];

const TIMELINE: { phase: Phase; logs: LogLine[] }[] = [
  {
    phase: "trigger",
    logs: [
      {
        id: "t1",
        icon: "⚡",
        color: "text-indigo-400",
        text: "Event received: checkout.session.completed",
      },
    ],
  },
  {
    phase: "ai",
    logs: [
      {
        id: "a1",
        icon: "🧠",
        color: "text-orange-400",
        text: "Anthropic: analyzing customer intent...",
      },
      {
        id: "a2",
        icon: "✓",
        color: "text-emerald-400",
        text: "Sentiment: positive (0.94 confidence)",
      },
    ],
  },
  {
    phase: "http",
    logs: [
      {
        id: "h1",
        icon: "🌐",
        color: "text-blue-400",
        text: "POST /api/enrich → 200 OK (312ms)",
      },
    ],
  },
  {
    phase: "notify",
    logs: [
      {
        id: "n1",
        icon: "💬",
        color: "text-emerald-400",
        text: "Slack: message delivered to #sales-alerts",
      },
    ],
  },
  {
    phase: "done",
    logs: [
      {
        id: "d1",
        icon: "🎉",
        color: "text-emerald-400",
        text: "Workflow completed in 4.2s — 0 errors",
      },
    ],
  },
];

export function WorkflowDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleLogs, setVisibleLogs] = useState<LogLine[]>([]);
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  const runDemo = useCallback(async () => {
    for (const step of TIMELINE) {
      setPhase(step.phase);

      const prevNode = NODES.find((n) => {
        const prevIdx = TIMELINE.findIndex((t) => t.phase === step.phase) - 1;
        if (prevIdx >= 0) return n.phase === TIMELINE[prevIdx].phase;
        return false;
      });
      if (prevNode) {
        setCompletedNodes((prev) => new Set(prev).add(prevNode.id));
      }

      for (const log of step.logs) {
        setVisibleLogs((prev) => [...prev, log]);
        await new Promise((r) => setTimeout(r, 600));
      }
      await new Promise((r) => setTimeout(r, 900));
    }

    setCompletedNodes(new Set(NODES.map((n) => n.id)));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          runDemo();
        }
      },
      { threshold: 0.4 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [runDemo]);

  const isActive = (nodePhase: Phase) => phase === nodePhase;
  const isCompleted = (nodeId: string) => completedNodes.has(nodeId);

  return (
    <div ref={containerRef} className="w-full">
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xl">
        {/* Toolbar */}
        <div className="h-12 border-b border-border/60 bg-muted/20 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Zap className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Stripe → AI → HTTP → Slack
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={`size-2 rounded-full ${phase === "idle" ? "bg-muted-foreground/40" : phase === "done" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}
              />
              {phase === "idle"
                ? "Waiting"
                : phase === "done"
                  ? "Completed"
                  : "Executing..."}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Node pipeline */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              {NODES.map((node, i) => (
                <div key={node.id} className="flex items-center gap-3 flex-1">
                  {/* Node card */}
                  <div
                    className={`flex-1 rounded-lg border-2 bg-background p-4 transition-all duration-500 relative ${
                      isActive(node.phase)
                        ? `${node.activeColor} shadow-lg scale-[1.03]`
                        : isCompleted(node.id)
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : `${node.color} border-dashed`
                    }`}
                  >
                    {/* Completed checkmark */}
                    {isCompleted(node.id) && (
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                        <Check className="size-3" strokeWidth={3} />
                      </div>
                    )}

                    <div className="flex items-center gap-2.5 mb-2">
                      {"logo" in node && node.logo ? (
                        <Image
                          src={node.logo}
                          alt={node.label}
                          width={18}
                          height={18}
                          className="size-[18px]"
                        />
                      ) : (
                        "icon" in node &&
                        node.icon && (
                          <node.icon className="size-[18px] text-blue-400" />
                        )
                      )}
                      <span className="text-sm font-semibold text-foreground">
                        {node.label}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {node.detail}
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {i < NODES.length - 1 && (
                    <div className="hidden sm:block text-muted-foreground/30 flex-shrink-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <title>Connection arrow</title>
                        <path
                          d="M5 12h14m-4-4 4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Execution log */}
          <div className="w-full lg:w-[320px] border-t lg:border-t-0 lg:border-l border-border/60 bg-muted/5">
            <div className="h-10 border-b border-border/40 flex items-center px-4 gap-2">
              <Terminal className="size-3.5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Execution Log
              </span>
            </div>
            <div className="p-4 font-mono text-xs space-y-2 min-h-[160px] max-h-[220px] overflow-y-auto">
              {visibleLogs.length === 0 ? (
                <div className="text-muted-foreground/40 italic text-center py-8">
                  Scroll here to trigger the demo
                </div>
              ) : (
                visibleLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <span className={log.color}>{log.icon}</span>
                    <span className="text-foreground/80">{log.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
