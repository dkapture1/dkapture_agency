"use client";

import { useTranslations } from "next-intl";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
    Palette,
    Globe,
    Video,
    TrendingUp,
    Cpu,
    Layers,
    ShoppingBag,
    Search,
    Camera,
    Plane,
    Megaphone,
    BarChart,
    MessageSquare,
    Zap
} from "lucide-react";
import { Service } from "@/types/service";

// Map icons roughly to what we might expect based on service types
const iconMap: Record<string, any> = {
    logo: Palette,
    guidelines: Layers,
    stationery: MessageSquare,
    webDesign: Globe,
    ecommerce: ShoppingBag,
    seo: Search,
    videoProd: Video,
    photography: Camera,
    drone: Plane,
    ads: Megaphone,
    crm: MessageSquare,
    chatbots: MessageSquare,
    automation: Zap,
    analytics: BarChart,
};

interface WhatsIncludedProps {
    included: Service["included"];
}

export function WhatsIncluded({ included }: WhatsIncludedProps) {
    const t = useTranslations();

    return (
        <section className="py-24 bg-white/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                        {/* Hardcoded title or translated? Let's use hardcoded for section header or add to common later. 
                For now using English as placeholder or assuming standard section title. */}
                        {t("serviceSections.whatsIncluded")}
                    </h2>
                </motion.div>

                <div className="mx-auto max-w-3xl">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {included.map((item, index) => {
                            // Extract the key part to guess the icon (e.g. "brandIdentity.included.logo.title" -> "logo")
                            const parts = item.titleKey.split('.');
                            const iconKey = parts[parts.length - 2];
                            const Icon = iconMap[iconKey] || Layers;

                            return (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="rounded-xl border border-white/10 bg-black px-6 data-[state=open]:border-[#FF4500]/50"
                                >
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF4500]/10 text-[#FF4500]">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-display text-lg font-bold text-white">
                                                    {t(item.titleKey)}
                                                </h3>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-0 pb-6 pl-[3.5rem]">
                                        <p className="text-muted-foreground mb-4">
                                            {t(item.descriptionKey)}
                                        </p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {/* 
                         Iterating up to 4 potential features.
                         We use a safe access check logic or just render empty if key missing?
                         t() will return the key if missing, which is ugly.
                         Ideally we check if translation exists, but no easy way in client component without overhead.
                         So we assume 4 features for now as standardized in data.
                       */}
                                            {[0, 1, 2, 3].map((i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-[#FF4500]" />
                                                    {t(`${item.featuresKey}.${i}`)}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
