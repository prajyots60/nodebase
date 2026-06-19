import { Bot, Globe, Webhook } from "lucide-react";
import Image from "next/image";

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description:
      "Wire up triggers from Google Forms, Stripe webhooks, or any HTTP endpoint. Events flow in automatically.",
    icon: Webhook,
    color: "text-purple-500 bg-purple-500/10",
    card: {
      logo: "/logos/googleform.svg",
      name: "Google Form",
      detail: "When form is submitted",
    },
  },
  {
    number: "02",
    title: "Think",
    description:
      "Route data through AI nodes powered by OpenAI, Anthropic, and Gemini. No SDK wrangling — just drag and drop.",
    icon: Bot,
    color: "text-amber-500 bg-amber-500/10",
    card: {
      logo: "/logos/anthropic.svg",
      name: "Anthropic",
      detail: "claude-sonnet-4-6",
    },
  },
  {
    number: "03",
    title: "Act",
    description:
      "Execute durable actions — send Slack messages, update databases, call external APIs. Jobs never timeout.",
    icon: Globe,
    color: "text-blue-500 bg-blue-500/10",
    card: {
      logo: "/logos/slack.svg",
      name: "Slack",
      detail: "Post to #alerts",
    },
  },
];

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {STEPS.map((step) => (
        <div key={step.number} className="flex flex-col">
          {/* Number */}
          <span className="text-xs font-mono font-bold text-primary mb-4 tracking-widest">
            {step.number}
          </span>
          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 text-foreground">
            {step.title}
          </h3>
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {step.description}
          </p>
          {/* Mini node card */}
          <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 shadow-sm">
            <div className={`p-2 rounded-lg ${step.color}`}>
              <Image
                src={step.card.logo}
                alt={step.card.name}
                width={20}
                height={20}
                className="size-5"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                {step.card.name}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {step.card.detail}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
