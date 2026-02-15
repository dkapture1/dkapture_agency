"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Database, Cpu, DollarSign, ArrowRight } from "lucide-react";

export function AiFlowDiagram() {
    const t = useTranslations("aiLab.flow");

    const steps = [
        {
            key: "input",
            icon: Database,
            color: "text-neutral-400",
        },
        {
            key: "processing",
            icon: Cpu,
            color: "text-orange-500",
        },
        {
            key: "output",
            icon: DollarSign,
            color: "text-green-500",
        },
    ];

    return (
        <section className="border-y border-neutral-800 bg-neutral-900/30 py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
                        {t("title")}
                    </h2>
                </div>

                <div className="relative flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-neutral-800 md:block" />

                    {steps.map((step, index) => (
                        <div key={step.key} className="relative z-10 flex flex-col items-center text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-neutral-800 bg-black shadow-xl ${step.color}`}
                            >
                                <step.icon className="h-10 w-10" />
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 + 0.1 }}
                                className="text-lg font-bold text-white"
                            >
                                {t(`steps.${step.key}`)}
                            </motion.h3>

                            {/* Mobile Arrow */}
                            {index < steps.length - 1 && (
                                <ArrowRight className="mt-8 h-6 w-6 text-neutral-600 md:hidden" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
