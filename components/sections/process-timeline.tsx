"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Service } from "@/types/service";

interface ProcessTimelineProps {
    process: Service["process"];
}

export function ProcessTimeline({ process }: ProcessTimelineProps) {
    const t = useTranslations();

    return (
        <section className="py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                        {t("serviceSections.ourProcess")}
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-12 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[#FF4500] to-transparent lg:block" />

                    {/* Connecting Line (Mobile) */}
                    <div className="absolute bottom-0 left-8 top-0 block w-0.5 bg-gradient-to-b from-transparent via-[#FF4500] to-transparent lg:hidden" />

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                        {process.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }} // Mobile anim
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                            >
                                {/* Step Number Bubble */}
                                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#FF4500] bg-black text-xl font-bold text-white shadow-[0_0_15px_rgba(255,69,0,0.3)] lg:mb-6">
                                    {index + 1}
                                </div>

                                <div className="pt-2 lg:pt-0">
                                    <h3 className="mb-2 font-display text-lg font-bold text-white">
                                        {t(step.stepKey)}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {t(step.descriptionKey)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
