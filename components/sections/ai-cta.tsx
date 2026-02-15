"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AiCta() {
    const t = useTranslations("aiLab.cta");

    return (
        <section className="relative overflow-hidden bg-orange-600 py-24 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-black blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 font-display text-4xl font-bold uppercase md:text-6xl"
                >
                    {t("title")}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mx-auto mb-10 max-w-2xl text-xl text-orange-100"
                >
                    {t("description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <a
                        href="https://cal.com/dkapture/discovery" // Placeholder link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center rounded-full bg-white px-8 py-4 text-lg font-bold text-orange-600 transition-transform hover:scale-105"
                    >
                        {t("button")}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
