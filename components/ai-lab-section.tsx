"use client";

import { ShutterIcon } from "./shutter-icon";

const capabilities = [
  {
    label: "Predictive Analytics",
    description: "Forecast market trends before your competitors",
  },
  {
    label: "Sentiment Analysis",
    description: "Bilingual brand perception monitoring",
  },
  {
    label: "Creative AI",
    description: "Auto-generate on-brand visuals and copy",
  },
  {
    label: "Campaign Optimizer",
    description: "Real-time budget allocation across channels",
  },
  {
    label: "Audience Intelligence",
    description: "Deep behavioral segmentation and targeting",
  },
  {
    label: "Performance Dashboard",
    description: "Unified cross-platform reporting in real time",
  },
];

export function AILabSection() {
  return (
    <section id="ai-lab" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[150px]" />

      {/* Background shutter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <ShutterIcon className="h-[500px] w-[500px] animate-shutter-spin" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-primary" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
              AI Lab
            </span>
            <span className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            INTELLIGENCE
            <br />
            <span className="text-muted-foreground">AT YOUR SERVICE</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our proprietary AI stack analyzes millions of data points to deliver
            actionable insights, automated workflows, and creative output.
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div
              key={cap.label}
              className="group relative rounded-2xl border border-foreground/5 bg-card/30 p-8 transition-all duration-500 hover:border-primary/20 hover:bg-card/60"
            >
              {/* Index */}
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-xs font-display font-bold text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-3">
                {cap.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
