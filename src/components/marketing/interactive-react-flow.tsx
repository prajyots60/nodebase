"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type Connection,
  Controls,
  type Edge,
  type EdgeChange,
  Handle,
  type Node,
  type NodeChange,
  Position,
  ReactFlow,
} from "@xyflow/react";
import { CheckCircle2, Play, RotateCcw, Terminal } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import "@xyflow/react/dist/style.css";

// --- Custom Node Types & Components ---

interface NodeData {
  label: string;
  icon?: string;
  type: "trigger" | "database" | "ai" | "action" | "logic";
  status?: "idle" | "running" | "success" | "error";
  detail?: string;
  meta?: string;
}

const CustomMarketingNode = ({ data }: { data: NodeData }) => {
  const getStatusBorder = () => {
    switch (data.status) {
      case "running":
        return "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10 scale-[1.02] translate-y-[-2px]";
      case "success":
        return "border-emerald-500 shadow-md shadow-emerald-500/5";
      case "error":
        return "border-destructive shadow-md shadow-destructive/5";
      default:
        return "border-border hover:border-zinc-500 dark:hover:border-zinc-400";
    }
  };

  const getBadgeColor = () => {
    switch (data.type) {
      case "trigger":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "database":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "ai":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "action":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div
      className={`px-3.5 py-3 rounded-xl border bg-card text-foreground transition-all duration-300 w-56 relative shadow-sm ${getStatusBorder()}`}
    >
      {/* Top neon glow for active node */}
      {data.status === "running" && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-orange-500 animate-pulse rounded-t-xl" />
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-zinc-400 dark:!bg-zinc-600 !border-2 !border-background hover:!bg-primary transition"
      />

      <div className="flex flex-col gap-2">
        {/* Node header */}
        <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
          <div className="flex items-center gap-2">
            {data.icon && (
              <div className="size-5 relative flex items-center justify-center rounded-md bg-muted p-0.5 border border-border/50">
                <Image
                  src={data.icon}
                  alt={data.label}
                  width={14}
                  height={14}
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-[11px] font-bold text-foreground truncate max-w-[100px]">
              {data.label}
            </span>
          </div>
          <span
            className={`text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded border shrink-0 ${getBadgeColor()}`}
          >
            {data.type}
          </span>
        </div>

        {/* Node details */}
        <div className="flex items-center justify-between gap-1.5 min-w-0">
          <div className="flex-1 min-w-0">
            {data.detail && (
              <p className="text-[10px] text-muted-foreground font-mono truncate leading-none">
                {data.detail}
              </p>
            )}
            {data.meta && (
              <p className="text-[8px] text-muted-foreground/60 font-mono truncate mt-1 leading-none">
                {data.meta}
              </p>
            )}
          </div>
          {data.status === "success" && (
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
          )}
          {data.status === "running" && (
            <span className="size-2 rounded-full bg-primary animate-ping shrink-0" />
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-zinc-400 dark:!bg-zinc-600 !border-2 !border-background hover:!bg-primary transition"
      />
    </div>
  );
};

const nodeTypes = {
  marketingNode: CustomMarketingNode,
};

// --- Initial Nodes and Edges ---

const initialNodes: Node[] = [
  {
    id: "stripe-node",
    type: "marketingNode",
    position: { x: 30, y: 150 },
    data: {
      label: "Stripe Trigger",
      icon: "/logos/stripe.svg",
      type: "trigger",
      detail: "checkout.completed",
      meta: "Webhook API v3",
      status: "idle",
    },
  },
  {
    id: "gemini-node",
    type: "marketingNode",
    position: { x: 300, y: 150 },
    data: {
      label: "Gemini Model",
      icon: "/logos/gemini.svg",
      type: "ai",
      detail: "gemini-3.5-flash",
      meta: "Temperature: 0.2",
      status: "idle",
    },
  },
  {
    id: "googleform-node",
    type: "marketingNode",
    position: { x: 580, y: 30 },
    data: {
      label: "Google Forms",
      icon: "/logos/googleform.svg",
      type: "action",
      detail: "Append record",
      meta: "Google Sheets integration",
      status: "idle",
    },
  },
  {
    id: "slack-node",
    type: "marketingNode",
    position: { x: 580, y: 150 },
    data: {
      label: "Slack Alert",
      icon: "/logos/slack.svg",
      type: "action",
      detail: "#sales-pipeline",
      meta: "Team Slack Channel",
      status: "idle",
    },
  },
  {
    id: "discord-node",
    type: "marketingNode",
    position: { x: 580, y: 270 },
    data: {
      label: "Discord Webhook",
      icon: "/logos/discord.svg",
      type: "action",
      detail: "#dev-alerts",
      meta: "DevOps Discord Server",
      status: "idle",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-stripe-gemini",
    source: "stripe-node",
    target: "gemini-node",
    animated: false,
    style: { stroke: "#e4e4e7" },
  },
  {
    id: "e-gemini-googleform",
    source: "gemini-node",
    target: "googleform-node",
    animated: false,
    style: { stroke: "#e4e4e7" },
  },
  {
    id: "e-gemini-slack",
    source: "gemini-node",
    target: "slack-node",
    animated: false,
    style: { stroke: "#e4e4e7" },
  },
  {
    id: "e-gemini-discord",
    source: "gemini-node",
    target: "discord-node",
    animated: false,
    style: { stroke: "#e4e4e7" },
  },
];

export function InteractiveReactFlow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: false, style: { stroke: "#e4e4e7" } },
          eds,
        ),
      ),
    [],
  );

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const simulateWorkflow = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLogs([]);

    // 1. Stripe trigger active
    addLog(
      "⚡ [Stripe Node] Webhook event received: checkout.session.completed",
    );
    setNodes((nds) =>
      nds.map((n) =>
        n.id === "stripe-node"
          ? { ...n, data: { ...n.data, status: "running" } }
          : n,
      ),
    );
    setEdges((eds) =>
      eds.map((e) =>
        e.id === "e-stripe-gemini"
          ? { ...e, animated: true, style: { stroke: "#f97316" } }
          : e,
      ),
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 2. Stripe trigger success -> Gemini active
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "stripe-node")
          return { ...n, data: { ...n.data, status: "success" } };
        if (n.id === "gemini-node")
          return { ...n, data: { ...n.data, status: "running" } };
        return n;
      }),
    );
    addLog(
      "🧠 [Gemini Node] Generating custom onboarding instructions via gemini-3.5-flash...",
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Gemini success -> parallel Actions active (Google Form, Slack, Discord)
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "gemini-node")
          return { ...n, data: { ...n.data, status: "success" } };
        if (
          n.id === "googleform-node" ||
          n.id === "slack-node" ||
          n.id === "discord-node"
        ) {
          return { ...n, data: { ...n.data, status: "running" } };
        }
        return n;
      }),
    );
    setEdges((eds) =>
      eds.map((e) =>
        e.id === "e-gemini-googleform" ||
        e.id === "e-gemini-slack" ||
        e.id === "e-gemini-discord"
          ? { ...e, animated: true, style: { stroke: "#f97316" } }
          : e,
      ),
    );
    addLog("✓ [Gemini Node] Prompt completion finished successfully.");
    addLog(
      "📢 Broadcasting parallel tasks to Google Forms, Slack, & Discord...",
    );

    await new Promise((resolve) => setTimeout(resolve, 1800));

    // 4. All finished successfully
    setNodes((nds) =>
      nds.map((n) =>
        n.id === "googleform-node" ||
        n.id === "slack-node" ||
        n.id === "discord-node"
          ? { ...n, data: { ...n.data, status: "success" } }
          : n,
      ),
    );
    addLog("✓ [Google Forms] Row appended for customer: supra@example.com");
    addLog("✓ [Slack Node] Alert sent to channel #sales-pipeline");
    addLog("✓ [Discord Node] Fired webhook alert to #dev-alerts");
    addLog("🎉 Complex workflow completed successfully with 0 errors.");
    setIsSimulating(false);
  };

  const resetWorkflow = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setLogs([]);
    setIsSimulating(false);
  };

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 h-auto xl:h-[550px]">
      {/* React Flow Editor */}
      <div className="flex-1 min-h-[380px] xl:h-full relative border border-border bg-muted/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          className="bg-dot-pattern"
        >
          <Background gap={16} size={1} />
          <Controls className="!bg-background !border-border !shadow-md" />
        </ReactFlow>

        {/* Quick Simulation Overlay */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <button
            type="button"
            onClick={simulateWorkflow}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-semibold shadow-md disabled:opacity-50"
          >
            <Play className="size-3.5 fill-white" />
            Simulate Event
          </button>
          <button
            type="button"
            onClick={resetWorkflow}
            className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground transition"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal logs panel */}
      <div className="w-full xl:w-80 h-[250px] xl:h-full border border-zinc-800 bg-zinc-950 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/20">
        <div className="h-12 border-b border-zinc-800 bg-zinc-900/60 px-4 flex items-center gap-2 text-zinc-300">
          <Terminal className="size-4 text-primary" />
          <span className="text-xs font-bold tracking-wider font-mono">
            LIVE EXECUTION TRACE
          </span>
        </div>
        <div className="flex-1 p-4 font-mono text-[11px] space-y-2 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-zinc-600 italic text-center py-12">
              Click &quot;Simulate Event&quot; to test. Drag nodes or connect
              ports directly to experiment.
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log}
                className="text-zinc-300 leading-normal animate-in fade-in duration-300"
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
