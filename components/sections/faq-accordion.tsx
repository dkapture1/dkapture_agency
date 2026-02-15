"use client";

import { useTranslations } from "next-intl";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Service } from "@/types/service";

interface FAQAccordionProps {
    faqs: Service["faqs"];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
    const t = useTranslations();

    return (
        <section className="py-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                        {t("serviceSections.faq")}
                    </h2>
                </motion.div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="rounded-xl border border-white/10 bg-white/5 px-6"
                        >
                            <AccordionTrigger className="hover:no-underline py-6">
                                <span className="text-left font-display text-lg font-medium text-white">
                                    {t(faq.questionKey)}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6 text-base text-gray-400">
                                {t(faq.answerKey)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
