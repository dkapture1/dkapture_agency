"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const categoryKeys = ["All", "Home Services", "Gastronomy", "Real Estate", "Events", "Beauty & Wellness"] as const;
type Category = typeof categoryKeys[number];

export function PortfolioSection() {
  const t = useTranslations('portfolio');

  const categoryLabels: Record<Category, string> = {
    "All": t("filterAll"),
    "Home Services": t("filterHomeServices"),
    "Gastronomy": t("filterGastronomy"),
    "Real Estate": t("filterRealEstate"),
    "Events": t("filterEvents"),
    "Beauty & Wellness": t("filterBeauty"),
  };

  const categories: Category[] = [
    "All",
    "Home Services",
    "Gastronomy",
    "Real Estate",
    "Events",
    "Beauty & Wellness",
  ];

  const projects = [
    {
      id: 1,
      title: t("project1Title"),
      description: t("project1Desc"),
      category: "Gastronomy" as Category,
      metric: t("project1Metric"),
      metricLabel: t("project1MetricLabel"),
      image: "/portfolio/restaurant-branding.jpg",
      size: "large" as const,
    },
    {
      id: 2,
      title: t("project2Title"),
      description: t("project2Desc"),
      category: "Home Services" as Category,
      metric: t("project2Metric"),
      metricLabel: t("project2MetricLabel"),
      image: "/portfolio/home-services.jpg",
      size: "small" as const,
    },
    {
      id: 3,
      title: t("project3Title"),
      description: t("project3Desc"),
      category: "Real Estate" as Category,
      metric: t("project3Metric"),
      metricLabel: t("project3MetricLabel"),
      image: "/portfolio/real-estate.jpg",
      size: "small" as const,
    },
    {
      id: 4,
      title: t("project4Title"),
      description: t("project4Desc"),
      category: "Events" as Category,
      metric: t("project4Metric"),
      metricLabel: t("project4MetricLabel"),
      image: "/portfolio/events.jpg",
      size: "small" as const,
    },
    {
      id: 5,
      title: t("project5Title"),
      description: t("project5Desc"),
      category: "Beauty & Wellness" as Category,
      metric: t("project5Metric"),
      metricLabel: t("project5MetricLabel"),
      image: "/portfolio/beauty-wellness.jpg",
      size: "small" as const,
    },
    {
      id: 6,
      title: t("project6Title"),
      description: t("project6Desc"),
      category: "Gastronomy" as Category,
      metric: t("project6Metric"),
      metricLabel: t("project6MetricLabel"),
      image: "/portfolio/gastronomy-brand.jpg",
      size: "large" as const,
    },
  ];
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Radial glow top right */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#FF4500]/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-6 mb-8">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground">
              {t("sectionTitle")}
            </h2>
            <span className="hidden sm:block h-px flex-1 bg-[#FF4500]" />
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="mb-12 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveFilter(cat);
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[#FF4500] text-foreground"
                  : "bg-transparent text-foreground border border-foreground/10 hover:bg-foreground/[0.07]"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Portfolio grid - bento */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`group relative overflow-hidden rounded-2xl bg-[#0a0a0a] ${
                  project.size === "large"
                    ? "md:col-span-2 aspect-[21/9]"
                    : "aspect-[4/3]"
                }`}
              >
                {/* Image */}
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    project.size === "large"
                      ? "(max-width: 768px) 100vw, 100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Hover orange border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-[#FF4500]/30 group-hover:shadow-[inset_0_0_30px_rgba(255,69,0,0.05)]" />

                {/* Always-visible content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  {/* Industry tag */}
                  <span className="inline-flex rounded-full bg-[#FF4500]/20 px-3 py-1 text-xs font-medium text-[#FF4500] mb-4">
                    {project.category}
                  </span>

                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-wide text-foreground">
                        {project.title}
                      </h3>
                    </div>
                    {/* Metric */}
                    <div className="text-right shrink-0">
                      <span className="block font-display text-3xl lg:text-4xl font-bold text-[#FF4500]">
                        {project.metric}
                      </span>
                      <span className="text-xs tracking-widest uppercase text-muted-foreground">
                        {project.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover overlay with description */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 bg-gradient-to-t from-black via-black/80 to-black/40 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="inline-flex self-start rounded-full bg-[#FF4500]/20 px-3 py-1 text-xs font-medium text-[#FF4500] mb-4">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-wide text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5 max-w-lg">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-[#FF4500] transition-all duration-300 hover:gap-3"
                    >
                      {t("viewCase")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                    <div className="text-right">
                      <span className="block font-display text-3xl lg:text-4xl font-bold text-[#FF4500]">
                        {project.metric}
                      </span>
                      <span className="text-xs tracking-widest uppercase text-muted-foreground">
                        {project.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {!showAll && filtered.length > 4 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#FF4500]/40 bg-transparent px-8 py-3.5 text-sm font-semibold text-[#FF4500] transition-all duration-300 hover:bg-[#FF4500]/10 hover:border-[#FF4500]"
            >
              {t("loadMore")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
