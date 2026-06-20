"use client";

export function HeroPipelines() {
  return (
    <>
      {/* Animated SVG Workflow Pipelines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-[0.85] dark:opacity-40"
        viewBox="0 0 1440 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Background static pipelines */}
        <path
          d="M -50,40 L 700,40 L 760,100 L 1500,100"
          stroke="currentColor"
          className="text-zinc-200/80 dark:text-zinc-800/40"
          strokeWidth="1.5"
        />
        <path
          d="M -50,560 L 600,560 L 660,500 L 1100,500 L 1170,560 L 1500,560"
          stroke="currentColor"
          className="text-zinc-200/80 dark:text-zinc-800/40"
          strokeWidth="1.5"
        />
        <path
          d="M -50,220 L 60,220 L 110,270 L 110,680"
          stroke="currentColor"
          className="text-zinc-200/80 dark:text-zinc-800/40"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 780,-50 L 780,180 L 840,240 L 1500,240"
          stroke="currentColor"
          className="text-zinc-200/80 dark:text-zinc-800/40"
          strokeWidth="1.5"
        />

        {/* Glowing Dash Packets moving along the pipes */}
        <path
          d="M -50,40 L 700,40 L 760,100 L 1500,100"
          stroke="url(#hero-gradient-1)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-workflow-dash-1"
        />
        <path
          d="M -50,560 L 600,560 L 660,500 L 1100,500 L 1170,560 L 1500,560"
          stroke="url(#hero-gradient-2)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-workflow-dash-2"
        />
        <path
          d="M 780,-50 L 780,180 L 840,240 L 1500,240"
          stroke="url(#hero-gradient-2)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-workflow-dash-3"
        />

        {/* Faint network junction nodes */}
        <circle
          cx="700"
          cy="40"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="760"
          cy="100"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="600"
          cy="560"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="660"
          cy="500"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="1100"
          cy="500"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="220"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="110"
          cy="270"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="780"
          cy="180"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />
        <circle
          cx="840"
          cy="240"
          r="4.5"
          className="fill-background stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1"
        />

        {/* Glowing active node highlights */}
        <circle cx="700" cy="40" r="2" className="fill-primary animate-ping" />
        <circle
          cx="660"
          cy="500"
          r="2"
          className="fill-orange-500 animate-ping"
        />
        <circle cx="60" cy="220" r="2" className="fill-primary animate-ping" />
        <circle
          cx="780"
          cy="180"
          r="2"
          className="fill-indigo-500 animate-ping"
        />

        {/* Gradients */}
        <defs>
          <linearGradient
            id="hero-gradient-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient
            id="hero-gradient-2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {/* Flashing network nodes in background */}
      <div className="absolute top-1/4 left-1/3 size-3 rounded-full bg-primary/20 blur-sm animate-ping duration-[6s] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 size-4 rounded-full bg-indigo-500/20 blur-sm animate-ping duration-[8s] pointer-events-none -z-10" />
    </>
  );
}
