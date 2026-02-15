"use client";

import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";
import Image from "next/image";

interface CaseResultsProps {
    study: CaseStudy;
}

export function CaseResults({ study }: CaseResultsProps) {
    const t = useTranslations();

    return (
        <section className="bg-primary/5 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-display text-3xl font-bold uppercase text-primary md:text-4xl">
                        {t("caseStudies.sections.results") || "The Results"}
                    </h2>
                    <div className="mx-auto h-1 w-20 bg-primary" />
                </div>

                {/* Metrics Grid */}
                <div className="mb-20 grid gap-8 md:grid-cols-3">
                    {study.results.metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-xl bg-background p-6 shadow-sm ring-1 ring-primary/10"
                        >
                            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                {t(metric.labelKey)}
                            </h3>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-sm text-red-400 opacity-80 decoration-slate-400 line-through">
                                        {metric.before}
                                    </p>
                                    <p className="text-4xl font-bold text-primary">
                                        {metric.after}
                                    </p>
                                </div>
                                <TrendingUp className="mb-2 h-6 w-6 text-green-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-white shadow-2xl md:p-12"
                >
                    <Quote className="h-10 w-10 text-white/30" />
                    <p className="my-6 text-2xl font-medium leading-relaxed md:text-3xl">
                        "{t(study.results.testimonial.quoteKey)}"
                    </p>

                    <div className="flex items-center gap-4">
                        {study.results.testimonial.photo && (
                            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/30">
                                <Image
                                    src={study.results.testimonial.photo}
                                    alt={study.results.testimonial.name}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                            </div>
                        )}
                        <div>
                            <p className="font-bold">{study.results.testimonial.name}</p>
                            <p className="text-white/80">{t(study.results.testimonial.titleKey)}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
