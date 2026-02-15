"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShutterIcon } from "./shutter-icon";

export function AILabSection() {
  const t = useTranslations('aiLab');

  const capabilities = [
    { label: t("capability1"), description: t("capability1Desc") },
    { label: t("capability2"), description: t("capability2Desc") },
    { label: t("capability3"), description: t("capability3Desc") },
    { label: t("capability4"), description: t("capability4Desc") },
    { label: t("capability5"), description: t("capability5Desc") },
    { label: t("capability6"), description: t("capability6Desc") },
  ];
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
              {t("sectionTag")}
            </span>
            <span className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
            {t("title1")}
            <br />
            <span className="text-muted-foreground">{t("title2")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("description")}
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/ai-lab"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
          >
            {t("exploreButton")}
            <span className="block h-px w-8 bg-primary transition-all duration-300 group-hover:w-12" />
          </Link>
        </div>
      </div>
    </section >
  );
}
