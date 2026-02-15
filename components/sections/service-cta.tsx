"use client";

import { useTranslations } from "next-intl";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ServiceCTA() {
    const t = useTranslations();

    return (
        <section className="relative overflow-hidden py-32">
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF4500]/10 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
                        {t("serviceSections.ctaTitle")}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        {t("serviceSections.ctaDescription")}
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-6">
                        <Button
                            size="lg"
                            className="group h-14 rounded-full bg-[#FF4500] px-8 text-base font-semibold text-white transition-all hover:bg-[#FF4500]/90 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]"
                        >
                            {t("navigation.startProject")}
                            <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
