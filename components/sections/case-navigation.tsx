"use client";

import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CaseNavigationProps {
    prevStudy?: CaseStudy;
    nextStudy?: CaseStudy;
}

export function CaseNavigation({ prevStudy, nextStudy }: CaseNavigationProps) {
    const t = useTranslations();

    return (
        <section className="border-t border-white/10 bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                    {/* Previous Project */}
                    <div className="flex-1">
                        {prevStudy ? (
                            <Link
                                href={{ pathname: '/portfolio/[slug]', params: { slug: prevStudy.slug } }}
                                className="group flex flex-col items-start gap-1"
                            >
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                                    <ArrowLeft size={14} />
                                    {t("caseStudies.sections.prevProject") || "Previous Project"}
                                </span>
                                <span className="text-lg font-bold text-white transition-colors group-hover:text-primary">
                                    {t(prevStudy.titleKey)}
                                </span>
                            </Link>
                        ) : (
                            <div /> // Spacer
                        )}
                    </div>

                    {/* Grid Link - Center */}
                    <div className="text-center">
                        <Link
                            href="/portfolio"
                            className="text-2xl opacity-50 transition-opacity hover:opacity-100"
                            aria-label="Back to Portfolio"
                        >
                            ⋮
                        </Link>
                    </div>

                    {/* Next Project */}
                    <div className="flex flex-1 justify-end text-right">
                        {nextStudy ? (
                            <Link
                                href={{ pathname: '/portfolio/[slug]', params: { slug: nextStudy.slug } }}
                                className="group flex flex-col items-end gap-1"
                            >
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                                    {t("caseStudies.sections.nextProject") || "Next Project"}
                                    <ArrowRight size={14} />
                                </span>
                                <span className="text-lg font-bold text-white transition-colors group-hover:text-primary">
                                    {t(nextStudy.titleKey)}
                                </span>
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
