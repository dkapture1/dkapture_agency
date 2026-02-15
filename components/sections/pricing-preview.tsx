"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";
import { cn } from "@/lib/utils";

interface PricingPreviewProps {
    pricing: Service["pricing"];
}

export function PricingPreview({ pricing }: PricingPreviewProps) {
    const t = useTranslations();

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                        {t("serviceSections.pricingPlans")}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        {t("serviceSections.pricingDescription")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {pricing.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all hover:bg-white/5",
                                plan.popular
                                    ? "border-[#FF4500] bg-[#FF4500]/5 scale-105 z-10"
                                    : "border-white/10 bg-black"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FF4500] px-4 py-1 text-xs font-semibold text-white">
                                    {t("serviceSections.mostPopular")}
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="font-display text-xl font-bold text-white">
                                    {t(plan.nameKey)}
                                </h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-sm text-muted-foreground">
                                            {plan.period}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <ul className="mb-8 flex-1 space-y-4">
                                {/* 
                  Again assuming 4 features per valid array in translation file. 
                  Standardizing on indices [0, 1, 2, 3] 
                */}
                                {[0, 1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="h-5 w-5 shrink-0 text-[#FF4500]" />
                                        {t(`${plan.featuresKey}.${i}`)}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={cn(
                                    "w-full rounded-full py-6 font-semibold transition-all text-white",
                                    plan.popular
                                        ? "bg-[#FF4500] hover:bg-[#FF4500]/90 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]"
                                        : "bg-white/10 hover:bg-white/20"
                                )}
                            >
                                {t("pricing.cta")}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
