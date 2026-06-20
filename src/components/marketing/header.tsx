"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  session: boolean;
}

export function Header({ session }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-6 flex items-center justify-center">
            <Image
              src="/logos/logo.svg"
              alt="Nodebase"
              width={32}
              height={32}
            />
          </div>
          <span className="font-bold text-base tracking-tight text-foreground">
            Nodebase
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-muted-foreground uppercase">
          <Link
            href="#playground"
            className="hover:text-foreground transition-colors"
          >
            Playground
          </Link>
          <Link
            href="#architecture"
            className="hover:text-foreground transition-colors"
          >
            Architecture
          </Link>
          <Link
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="https://github.com/prajyots60/nodebase"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!session && (
            <Link
              href="/login"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Sign in
            </Link>
          )}
          <Link href={session ? "/workflows" : "/login"}>
            <Button
              size="sm"
              className="rounded-lg text-xs h-8 px-4 font-mono uppercase tracking-wider"
            >
              {session ? "Go to App" : "Start Building"}
              <ArrowRight className="size-3 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
