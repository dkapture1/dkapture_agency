"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, MessageSquare, Star, Video, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AiToolsGrid() {
    const t = useTranslations("aiLab.tools.cards");
    const tSection = useTranslations("aiLab.tools");

    const tools = [
        {
            key: "responder",
            icon: Zap,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
        },
        {
            key: "chat",
            icon: MessageSquare,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
        },
        {
            key: "reviews",
            icon: Star,
            color: "text-orange-400",
            bg: "bg-orange-400/10",
        },
        {
            key: "content",
            icon: Video,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
        },
        {
            key: "scoring",
            icon: TrendingUp,
            color: "text-green-400",
            bg: "bg-green-400/10",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="mb-16 text-center">
                <span className="mb-4 inline-block rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400">
                    {tSection("badge")}
                </span>
                <h2 className="mb-4 font-display text-3xl font-bold uppercase text-white md:text-5xl">
                    {tSection("title")}
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-neutral-400">
                    {tSection("subtitle")}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="group relative h-full overflow-hidden border-neutral-800 bg-neutral-900/50 p-8 transition-colors hover:border-orange-500/30">
                            <div className={`mb-6 inline-flex rounded-lg p-3 ${tool.bg} ${tool.color}`}>
                                <tool.icon className="h-6 w-6" />
                            </div>

                            <h3 className="mb-2 text-xl font-bold text-white">
                                {t(`${tool.key}.title`)}
                            </h3>

                            <div className="mb-4 text-sm font-medium text-neutral-500">
                                {t(`${tool.key}.trigger`)} → {t(`${tool.key}.action`)}
                            </div>

                            <div className="mt-auto border-t border-white/5 pt-4">
                                <span className={`text-sm font-bold ${tool.color}`}>
                                    {t(`${tool.key}.result`)}
                                </span>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
