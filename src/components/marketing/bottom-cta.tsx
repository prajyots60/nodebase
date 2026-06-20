"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BottomCtaProps {
  session: boolean;
}

export function BottomCta({ session }: BottomCtaProps) {
  return (
    <section className="pt-28 pb-[13vw] border-t border-border/40 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
          Your workflows shouldn&apos;t have timeouts.
        </h2>
        <p className="text-base text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
          Ditch fragile serverless integrations. Build resilient background
          executions in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={session ? "/workflows" : "/login"}>
            <Button
              size="lg"
              className="rounded-lg h-12 px-8 text-sm font-semibold shadow-lg shadow-primary/10"
            >
              {session ? "Go to App" : "Start Building Free"}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
          <Link href="https://github.com/prajyots60/nodebase">
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg h-12 px-8 text-sm font-mono"
            >
              <BookOpen className="size-4 mr-2" />
              Documentation
            </Button>
          </Link>
        </div>
      </div>

      {/* Giant background text logo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 text-[13vw] font-black tracking-[0.15em] uppercase text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.06)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.03)] bg-clip-text bg-gradient-to-b from-foreground/[0.07] dark:from-foreground/[0.04] to-transparent font-sans leading-none animate-[pulse_8s_ease-in-out_infinite]">
        Nodebase
      </div>
      {/* Subtle backglow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] size-[350px] rounded-full bg-gradient-to-tr from-primary/10 to-orange-500/10 blur-[80px] pointer-events-none z-0 animate-[pulse_5s_ease-in-out_infinite]" />
    </section>
  );
}
