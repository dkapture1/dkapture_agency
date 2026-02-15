"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function AiHero() {
    const t = useTranslations("aiLab.hero");

    return (
        <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
            {/* Background Matrix/Code Effect (Simplified CSS/SVG) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_100%),linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 backdrop-blur-sm"
                >
                    <span className="mr-2 flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                    </span>
                    {t("badge")}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 max-w-4xl font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-6xl lg:text-7xl"
                >
                    {t("headline")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-10 max-w-2xl text-lg text-neutral-400 md:text-xl"
                >
                    {t("subheadline")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <a
                        href="#roi-calculator"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-orange-500 bg-orange-600 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
                    >
                        <span className="mr-2">{t("ctaPrimary")}</span>
                        <svg
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
