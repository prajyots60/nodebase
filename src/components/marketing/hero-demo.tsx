"use client";

import { useEffect, useRef, useState } from "react";

export function HeroDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Browser chrome frame */}
      <div className="rounded-xl border border-border/60 bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
        {/* Title bar */}
        <div className="h-10 bg-muted/50 border-b border-border/40 flex items-center px-4 gap-3">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400/80" />
            <div className="size-2.5 rounded-full bg-yellow-400/80" />
            <div className="size-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-background/60 border border-border/40 rounded-md px-4 py-0.5 text-[10px] font-mono text-muted-foreground">
              nodebase.originly.dev/workflows
            </div>
          </div>
          <div className="w-12" />
        </div>
        {/* Video content */}
        <div className="relative aspect-video bg-zinc-950">
          <video
            ref={videoRef}
            src="/automation.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
