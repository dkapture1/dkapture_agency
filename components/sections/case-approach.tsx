"use client";

import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface CaseApproachProps {
    study: CaseStudy;
}

export function CaseApproach({ study }: CaseApproachProps) {
    const t = useTranslations();

    return (
        <section className="bg-secondary/20 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-display text-3xl font-bold uppercase text-white md:text-4xl">
                        {t("caseStudies.sections.approach") || "Our Approach"}
                    </h2>
                    <div className="mx-auto h-1 w-20 bg-primary" />
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {study.approach.steps.map((step, index) => {
                        // Dynamic icon mapping
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const IconComponent = (LucideIcons as any)[step.icon] || LucideIcons.HelpCircle;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-2xl bg-background/50 p-8 shadow-lg transition-all hover:bg-background/80"
                            >
                                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                    <IconComponent size={24} />
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-white">
                                    {t(step.titleKey)}
                                </h3>

                                <p className="text-muted-foreground">
                                    {t(step.descriptionKey)}
                                </p>

                                {/* Step Number Background */}
                                <div className="absolute -right-4 -top-4 text-9xl font-bold text-white/5 opacity-0 transition-opacity group-hover:opacity-100">
                                    {index + 1}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
