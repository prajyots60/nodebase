import { GitFork, RefreshCcw, Workflow, Zap } from "lucide-react";

const STATS = [
  {
    icon: Workflow,
    label: "6 Node Types",
    sublabel: "Triggers, AI, HTTP & more",
  },
  { icon: Zap, label: "Inngest-Powered", sublabel: "Durable execution engine" },
  {
    icon: RefreshCcw,
    label: "Real-time Logs",
    sublabel: "Live execution tracing",
  },
  { icon: GitFork, label: "Open Source", sublabel: "MIT Licensed · Self-host" },
];

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border-y border-border/40">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-background px-6 py-6 flex items-center gap-4 group"
        >
          <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
            <stat.icon className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {stat.label}
            </div>
            <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
