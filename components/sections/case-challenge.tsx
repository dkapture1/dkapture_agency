"use client";

import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

interface CaseChallengeProps {
    study: CaseStudy;
}

export function CaseChallenge({ study }: CaseChallengeProps) {
    const t = useTranslations();

    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Challenge Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-6 font-display text-3xl font-bold uppercase text-white md:text-4xl">
                            {t("caseStudies.sections.challenge")}
                        </h2>
                        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                            {t(study.challenge.descriptionKey)}
                        </p>

                        <div className="space-y-4">
                            {study.challenge.painPointsKeys.map((key, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                                    <p className="text-white">{t(key)}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Client Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-2xl bg-secondary/50 p-8 md:p-12"
                    >
                        <Quote className="absolute left-8 top-8 h-10 w-10 text-primary/20" />

                        <blockquote className="relative z-10 mb-8 text-xl font-medium italic leading-relaxed text-white md:text-2xl">
                            "{t(study.challenge.clientQuoteKey)}"
                        </blockquote>

                        <div className="flex items-center gap-4">
                            {study.challenge.clientPhoto && (
                                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                    <Image
                                        src={study.challenge.clientPhoto}
                                        alt={study.challenge.clientName}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="font-bold text-white">{study.challenge.clientName}</p>
                                <p className="text-sm text-primary">
                                    {t(study.challenge.clientTitleKey)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
