"use client";

export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-[0.15] dark:opacity-[0.25]">
      {/* SVG Grid Overlay */}
      <svg
        className="absolute inset-0 h-full w-full stroke-zinc-400 dark:stroke-zinc-700 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        {/* Alignment markings */}
        <svg x="50%" y="0" className="overflow-visible" aria-hidden="true">
          <circle cx="0" cy="0" r="1.5" className="fill-primary" />
          <circle cx="200" cy="120" r="1.5" className="fill-primary" />
          <circle cx="-200" cy="240" r="1.5" className="fill-primary" />
          <circle cx="400" cy="360" r="1.5" className="fill-primary" />
          {/* Mock coordinate labels */}
          <text
            x="10"
            y="20"
            className="font-mono text-[8px] fill-zinc-500 font-medium"
          >
            [x_0, y_0]
          </text>
          <text
            x="210"
            y="140"
            className="font-mono text-[8px] fill-zinc-500 font-medium"
          >
            [ref_a1]
          </text>
          <text
            x="-190"
            y="260"
            className="font-mono text-[8px] fill-zinc-500 font-medium"
          >
            [ref_b2]
          </text>
        </svg>
      </svg>
    </div>
  );
}
