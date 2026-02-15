"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CaseHeroProps {
    study: CaseStudy;
}

export function CaseHero({ study }: CaseHeroProps) {
    const t = useTranslations();

    return (
        <section className="relative min-h-[80vh] w-full overflow-hidden bg-background pt-24">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={study.heroImage}
                    alt={t(study.titleKey)}
                    fill
                    className="object-cover opacity-60"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto flex min-h-[60vh] flex-col justify-end px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Industry Badge */}
                    <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                        {t(`portfolio.filters.${study.industry}`)}
                    </span>

                    {/* Title - Translated */}
                    <h1 className="mb-4 text-5xl font-bold leading-tight text-white md:text-7xl">
                        {t(study.titleKey)}
                    </h1>

                    {/* Client Name */}
                    <p className="text-xl text-white/80 md:text-2xl">
                        {t("caseStudies.sections.client") || "Client"}: <span className="text-white">{t(study.clientKey)}</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
