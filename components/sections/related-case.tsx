"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface RelatedCaseProps {
    slug?: string;
}

export function RelatedCase({ slug }: RelatedCaseProps) {
    const t = useTranslations();

    if (!slug) return null;

    // In a real app, we would fetch the case study data based on the slug.
    // For now, we'll display a placeholder card that links to the portfolio.
    // The prompt implies "featured success story card".

    return (
        <section className="py-24 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-display text-2xl font-bold uppercase text-white">
                        {t("serviceSections.successStories")}
                    </h2>
                    <Link
                        href="/portfolio"
                        className="group flex items-center text-sm font-medium text-[#FF4500] transition-colors hover:text-[#FF4500]/80"
                    >
                        {t("serviceSections.viewAllWork")}
                        <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 aspect-video md:aspect-[21/9]"
                >
                    {/* Placeholder Image */}
                    <div className="absolute inset-0 bg-neutral-900" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 md:p-12">
                        <p className="text-sm font-medium uppercase tracking-wider text-[#FF4500] mb-2">
                            {t("serviceSections.featuredCaseStudy")}
                        </p>
                        <h3 className="font-display text-3xl font-bold text-white md:text-5xl mb-4">
                            {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </h3>
                        <p className="max-w-xl text-lg text-gray-300 mb-8 line-clamp-2">
                            {t("serviceSections.caseStudyPlaceholder")}
                        </p>
                        <Link
                            href={`/portfolio/${slug}` as any}
                            className="inline-flex h-12 items-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-transform hover:scale-105"
                        >
                            {t("serviceSections.viewCaseStudy")}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
