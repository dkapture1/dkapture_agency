"use client";

import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

const partners = [
    "Zapier", "HubSpot", "Meta", "Google", "WhatsApp", "OpenAI", "Salesforce", "Shopify"
];

export function AiIntegrations() {
    const t = useTranslations("aiLab");
    return (
        <section className="border-t border-neutral-800 bg-black py-12">
            <div className="container mx-auto px-4">
                <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-neutral-500">
                    {t("integrations.title")}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-xl font-bold text-neutral-400 hover:text-white"
                        >
                            {partner}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
