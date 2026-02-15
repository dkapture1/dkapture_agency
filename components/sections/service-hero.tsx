"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ServiceHeroProps {
    titleKey: string;
    descriptionKey: string;
}

export function ServiceHero({ titleKey, descriptionKey }: ServiceHeroProps) {
    const t = useTranslations();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF4500]/20 blur-[100px]" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto max-w-4xl px-6 text-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-display text-4xl font-bold uppercase tracking-wider text-white sm:text-6xl md:text-7xl"
                >
                    <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                        {t(titleKey)}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
                >
                    {t(descriptionKey)}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-10"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-[#FF4500] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#FF4500]/90 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]"
                    >
                        {t("common.getStarted")}
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
