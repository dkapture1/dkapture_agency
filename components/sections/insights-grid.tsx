"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlogPostMetadata } from "@/lib/mdx";

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.3 + i * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

interface InsightsGridProps {
    posts: BlogPostMetadata[];
}

export function InsightsGrid({ posts }: InsightsGridProps) {
    const t = useTranslations('insights');
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="insights"
            className="relative py-32 lg:py-40"
        >
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF4500]/[0.03] blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div>
                        <div className="flex items-center gap-6 mb-4">
                            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground">
                                {t("title")}
                            </h2>
                            <span className="hidden sm:block h-px flex-1 bg-[#FF4500]" />
                        </div>
                        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                            {t("subtitle")}
                        </p>
                    </div>
                    <Link
                        href="/insights"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#FF4500]"
                    >
                        {t("viewAll")}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>

                {/* Insights cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.slug}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            <Link
                                href={{ pathname: "/insights/[slug]", params: { slug: post.slug } }}
                                className="group relative flex flex-col h-full rounded-2xl border border-foreground/5 bg-[#111111]/50 p-8 transition-all duration-500 hover:border-[#FF4500]/20 hover:bg-[#111111]"
                            >
                                {/* Tag */}
                                <span className="inline-flex self-start rounded-full border border-[#FF4500]/20 bg-[#FF4500]/5 px-3 py-1 text-xs font-medium text-[#FF4500] mb-6 capitalize">
                                    {post.category}
                                </span>

                                {/* Title */}
                                <h3 className="font-display text-xl font-bold tracking-wide text-foreground mb-4 leading-snug transition-colors duration-300 group-hover:text-[#FF4500]">
                                    {post.title}
                                </h3>

                                <p className="mb-auto text-sm text-muted-foreground line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-foreground/5">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.date).toLocaleDateString(post.locale === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric" })}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {t("readTime", { minutes: post.readTime })}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
