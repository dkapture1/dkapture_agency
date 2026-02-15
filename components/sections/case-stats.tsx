"use client";

import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { Calendar, Layers, BarChart3, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface CaseStatsProps {
    study: CaseStudy;
}

export function CaseStats({ study }: CaseStatsProps) {
    const t = useTranslations();

    const stats = [
        {
            icon: Calendar,
            label: t("caseStudies.sections.duration") || "Duration",
            value: t(study.durationKey),
        },
        {
            icon: Layers,
            label: t("caseStudies.sections.servicesUsed"),
            value: `${study.servicesUsed.length} Services`, // Could be translated if needed, or mapped
        },
        {
            icon: Globe,
            label: t("portfolio.filters." + study.industry),
            value: t("portfolio.filters." + study.industry), // Redundant but consistent
        },
    ];

    // Add the key metric if available
    if (study.results && study.results.keyMetric) {
        stats.push({
            icon: BarChart3,
            label: t(study.results.keyMetric.labelKey),
            value: study.results.keyMetric.value
        });
    }

    return (
        <section className="border-b border-white/10 bg-background py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center justify-center text-center md:items-start md:text-left"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <stat.icon size={24} />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </p>
                            <p className="text-lg font-bold text-white md:text-xl">
                                {stat.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
