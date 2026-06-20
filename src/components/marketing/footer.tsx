"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-zinc-50 dark:bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/logos/logo.svg"
                alt="Nodebase"
                width={24}
                height={24}
              />
              <span className="font-bold text-sm tracking-tight">Nodebase</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Open-source workflow engine designed for developers who build.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link
                  href="#playground"
                  className="hover:text-foreground transition-colors"
                >
                  Playground
                </Link>
              </li>
              <li>
                <Link
                  href="#architecture"
                  className="hover:text-foreground transition-colors"
                >
                  Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
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
                  SDK Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-3">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  MIT License
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nodebase. Open-source under MIT.</p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/prajyots60/nodebase"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
