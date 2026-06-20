import { ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ArchitectureVisualizer } from "@/components/marketing/architecture-visualizer";
import { BottomCta } from "@/components/marketing/bottom-cta";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Footer } from "@/components/marketing/footer";
import { GridBackground } from "@/components/marketing/grid-background";
import { Header } from "@/components/marketing/header";
import { HeroPipelines } from "@/components/marketing/hero-pipelines";
import { InteractiveReactFlow } from "@/components/marketing/interactive-react-flow";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function LandingPage() {
  const sessionData = await auth.api.getSession({ headers: await headers() });
  const hasSession = !!sessionData;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Blueprint Grid Background */}
      <GridBackground />

      {/* Navigation Header */}
      <Header session={hasSession} />

      <main>
        {/* ──────────────── Hero ──────────────── */}
        <section className="relative pt-20 md:pt-28 pb-16 overflow-hidden isolate">
          {/* Animated SVG Workflow Pipelines background */}
          <HeroPipelines />

          <div className="mx-auto max-w-6xl px-6 relative z-10">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/30 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open Source Developer Platform
            </div>

            {/* Asymmetric Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-2xl mb-6">
                  Visual workflow execution,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                    built for automation.
                  </span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                  Build fault-tolerant background queues and AI agent loops with
                  type-safe canvas controls. Ensure 100% reliable execution of
                  your critical product automations.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Link href={hasSession ? "/workflows" : "/login"}>
                    <Button
                      size="lg"
                      className="rounded-lg h-11 px-6 text-sm font-semibold shadow-lg shadow-primary/10"
                    >
                      {hasSession ? "Go to App" : "Start Building Free"}
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="https://github.com/prajyots60/nodebase">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-lg h-11 px-6 text-sm font-mono"
                    >
                      <svg
                        className="size-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      prajyots60/nodebase
                    </Button>
                  </Link>
                </div>
              </div>

              {/* High-fidelity Automation Video Demo (right 5 cols) */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-orange-500 rounded-2xl opacity-15 blur-lg group-hover:opacity-25 transition duration-1000" />
                <div className="relative border border-border bg-card rounded-xl overflow-hidden shadow-2xl">
                  {/* Browser header bar */}
                  <div className="h-9 bg-muted/40 border-b border-border/60 px-4 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    </div>
                    <div className="h-5 px-3 bg-background border border-border/50 rounded-md text-[9px] font-mono text-muted-foreground flex items-center justify-center max-w-[150px] truncate">
                      nodebase.dev/demo
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Video content */}
                  <div className="aspect-video relative bg-muted/10 flex items-center justify-center overflow-hidden">
                    <video
                      src="/automation.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── Interactive Playground ──────────────── */}
        <section id="playground" className="py-12 border-t border-border/40">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center lg:text-left">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3 block">
                Interactive Canvas
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                Play with the visual editor live
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Drag nodes, create custom connections, and press{" "}
                <strong>Simulate Event</strong> to watch execution logs stream
                in real-time.
              </p>
            </div>

            {/* Custom Interactive React Flow Playground */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-border/50 to-transparent border border-border/80">
              <InteractiveReactFlow />
            </div>
          </div>
        </section>

        {/* ──────────────── Architecture Visualizer ──────────────── */}
        <section
          id="architecture"
          className="py-24 border-t border-border/40 bg-muted/30"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3 block">
                Under the hood
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                Built for resilient operations
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Nodebase handles state checkpointing automatically. If a step
                fails, the worker retries using exponential backoffs.
              </p>
            </div>
            <ArchitectureVisualizer />
          </div>
        </section>

        {/* ──────────────── Feature Grid ──────────────── */}
        <section id="features" className="py-24 border-t border-border/40">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3 block">
                Specifications
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                Production-grade building blocks
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Engineered with enterprise security and microsecond processing
                latency.
              </p>
            </div>
            <FeatureGrid />
          </div>
        </section>

        {/* ──────────────── Bottom CTA ──────────────── */}
        <BottomCta session={hasSession} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
