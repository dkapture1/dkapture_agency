"use client";

import { useTranslations } from "next-intl";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProblemSolutionProps {
    challengesKey: string;
    solutionsKey: string;
}

export function ProblemSolution({
    challengesKey,
    solutionsKey,
}: ProblemSolutionProps) {
    const t = useTranslations();

    // We need to retrieve the arrays from the translations
    // Since we can't know the length beforehand in a type-safe way with straight useTranslations,
    // we are relying on the known structure of 4 items as per the data files.
    // Alternatively, we could fetch the raw object, but next-intl encourages knowing keys.
    // For this implementation, we will assume 4 items as standardized in the data files.
    const indices = [0, 1, 2, 3];

    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
                    {/* Challenges Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl border border-white/5 bg-white/5 p-8 sm:p-10"
                    >
                        <h3 className="mb-8 font-display text-2xl font-bold text-white">
                            {t("serviceSections.theChallenge")}
                        </h3>
                        <div className="flex flex-col gap-6">
                            {indices.map((i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 rounded-full bg-red-500/10 p-2 text-red-500">
                                        <X className="h-5 w-5" />
                                    </div>
                                    <p className="text-muted-foreground">
                                        {t(`${challengesKey}.${i}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Solutions Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-2xl border border-[#FF4500]/20 bg-[#FF4500]/5 p-8 sm:p-10"
                    >
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#FF4500]/10 to-transparent opacity-50" />

                        <h3 className="mb-8 font-display text-2xl font-bold text-[#FF4500]">
                            {t("serviceSections.ourSolution")}
                        </h3>
                        <div className="flex flex-col gap-6">
                            {indices.map((i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 rounded-full bg-[#FF4500]/20 p-2 text-[#FF4500]">
                                        <Check className="h-5 w-5" />
                                    </div>
                                    <p className="text-foreground">
                                        {t(`${solutionsKey}.${i}`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
