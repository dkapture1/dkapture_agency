"use client";

import { useState } from "react";
import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PortfolioGridProps {
    items: CaseStudy[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
    const t = useTranslations();
    const [filter, setFilter] = useState("all");

    // Unique industries + 'all'
    const filters = ["all", ...Array.from(new Set(items.map((item) => item.industry)))];

    const filteredItems = filter === "all"
        ? items
        : items.filter((item) => item.industry === filter);

    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-4">

                {/* Filter Tabs */}
                <div className="mb-12 flex flex-wrap justify-center gap-4">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${filter === f
                                ? "bg-primary text-white"
                                : "bg-secondary/20 text-muted-foreground hover:bg-secondary/40 hover:text-white"
                                }`}
                        >
                            {t(`portfolio.filters.${f}`)}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/10"
                            >
                                <Link href={{ pathname: '/portfolio/[slug]', params: { slug: item.slug } }} className="block h-full w-full">
                                    {/* Image */}
                                    <Image
                                        src={item.heroImage}
                                        alt={t(item.titleKey)}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-primary">
                                            {t(`portfolio.filters.${item.industry}`)}
                                        </span>
                                        <h3 className="mb-2 text-2xl font-bold text-white">
                                            {t(item.titleKey)}
                                        </h3>

                                        {/* Hover Reveal Action */}
                                        <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                                            {t("portfolio.viewCase")} <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
