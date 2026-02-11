"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const insights = [
  {
    tag: "Strategy",
    title: "How AI is Reshaping the Brazilian-American Market",
    date: "Feb 2026",
    readTime: "8 min read",
  },
  {
    tag: "Growth",
    title: "5 Funnels That Took Our Clients From $0 to $1M",
    date: "Jan 2026",
    readTime: "12 min read",
  },
  {
    tag: "Culture",
    title: "The Power of Bilingual Branding in a Multicultural Economy",
    date: "Jan 2026",
    readTime: "6 min read",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative py-32 lg:py-40"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF4500]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <div className="flex items-center gap-6 mb-4">
              <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground">
                Insights
              </h2>
              <span className="hidden sm:block h-px flex-1 bg-[#FF4500]" />
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Dispatches from the frontier of AI-powered marketing.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#FF4500]"
          >
            View all insights
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Insights cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((insight, i) => (
            <motion.a
              key={insight.title}
              href="#"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative flex flex-col rounded-2xl border border-foreground/5 bg-[#111111]/50 p-8 transition-all duration-500 hover:border-[#FF4500]/20 hover:bg-[#111111]"
            >
              {/* Tag */}
              <span className="inline-flex self-start rounded-full border border-[#FF4500]/20 bg-[#FF4500]/5 px-3 py-1 text-xs font-medium text-[#FF4500] mb-6">
                {insight.tag}
              </span>

              {/* Title */}
              <h3 className="font-display text-xl font-bold tracking-wide text-foreground mb-auto leading-snug transition-colors duration-300 group-hover:text-[#FF4500]">
                {insight.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-foreground/5">
                <span className="text-xs text-muted-foreground">
                  {insight.date}
                </span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="text-xs text-muted-foreground">
                  {insight.readTime}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
