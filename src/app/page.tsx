import { ArrowRight, Workflow } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroDemoSection } from "@/components/marketing/hero-demo-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { StatsStrip } from "@/components/marketing/stats-strip";
import { WorkflowDemo } from "@/components/marketing/workflow-demo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function LandingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ──────────────── Navigation ──────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-7  flex items-center justify-center">
              <Image
                src="/logos/logo.svg"
                alt="Nodebase"
                width={50}
                height={50}
              />
            </div>
            <span className="font-bold text-base tracking-tight">Nodebase</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="#how-it-works"
              className="hover:text-foreground transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#demo"
              className="hover:text-foreground transition-colors"
            >
              Demo
            </Link>
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="https://github.com/prajyots60/nodebase"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!session && (
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                Sign in
              </Link>
            )}
            <Link href={session ? "/workflows" : "/login"}>
              <Button size="sm" className="rounded-lg text-xs h-8 px-4">
                {session ? "Go to App" : "Start Building"}
                <ArrowRight className="size-3 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ──────────────── Hero ──────────────── */}
        <section className="relative overflow-hidden">
          {/* Subtle top gradient */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28 pb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-6">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Open Source · MIT Licensed
            </div>

            {/* Heading — left aligned */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] max-w-3xl mb-5">
              The workflow engine
              <br />
              that thinks in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                nodes.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Connect APIs, orchestrate AI models, and run durable background
              jobs — all from a visual canvas. Built for developers who ship.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-16">
              <Link href={session ? "/workflows" : "/login"}>
                <Button
                  size="lg"
                  className="rounded-lg h-11 px-6 text-sm shadow-lg shadow-primary/15"
                >
                  {session ? "Go to App" : "Start Building Free"}
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
              <Link href="https://github.com/prajyots60/nodebase">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-lg h-11 px-6 text-sm"
                >
                  <svg
                    className="size-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </Button>
              </Link>
            </div>

            {/* Product demo */}
            <HeroDemoSection />
          </div>
        </section>

        {/* ──────────────── Stats Strip ──────────────── */}
        <StatsStrip />

        {/* ──────────────── How It Works ──────────────── */}
        <section id="how-it-works" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16">
              <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest mb-3 block">
                How it works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Three steps. Zero boilerplate.
              </h2>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* ──────────────── Interactive Demo ──────────────── */}
        <section
          id="demo"
          className="py-24 md:py-32 bg-muted/20 border-y border-border/40"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12">
              <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest mb-3 block">
                Live Demo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
                Watch a workflow execute in real time.
              </h2>
              <p className="text-muted-foreground max-w-xl">
                This demo auto-plays when you scroll here. Each node lights up
                as data flows through the pipeline.
              </p>
            </div>
            <WorkflowDemo />
          </div>
        </section>

        {/* ──────────────── Feature Grid ──────────────── */}
        <section id="features" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16">
              <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest mb-3 block">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Everything you need. Nothing you don&apos;t.
              </h2>
            </div>
            <FeatureGrid />
          </div>
        </section>

        {/* ──────────────── Bottom CTA ──────────────── */}
        <section className="py-24 md:py-32 border-t border-border/40 bg-muted/10">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Your workflows shouldn&apos;t have timeouts.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              Start building durable, AI-powered automations today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={session ? "/workflows" : "/login"}>
                <Button
                  size="lg"
                  className="rounded-lg h-12 px-8 text-base shadow-lg shadow-primary/15"
                >
                  {session ? "Go to App" : "Start Building Free"}
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
              <Link href="https://github.com/prajyots60/nodebase">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-lg h-12 px-8 text-base"
                >
                  Read the Docs
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Trusted by developers. Backed by open source.
            </p>
          </div>
        </section>
      </main>

      {/* ──────────────── Footer ──────────────── */}
      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-6 rounded-md  flex items-center justify-center">
                  <Image
                    src="/logos/logo.svg"
                    alt="Nodebase"
                    width={35}
                    height={35}
                  />
                </div>
                <span className="font-bold text-sm">Nodebase</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The open-source workflow automation engine for developers.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#demo"
                    className="hover:text-foreground transition-colors"
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/workflows"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="https://github.com/prajyots60/nodebase"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    MIT License
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Nodebase. Open-source under MIT.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Link
                href="https://twitter.com"
                className="hover:text-foreground transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/prajyots60/nodebase"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
