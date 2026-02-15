"use client";

import { CaseStudy } from "@/types/case-study";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface CaseServicesProps {
    study: CaseStudy;
}

// Helper to convert kebab-case (digital-platforms) to camelCase (digitalPlatforms)
// so we can look up standard service names in translations
function toCamelCase(str: string) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export function CaseServices({ study }: CaseServicesProps) {
    const t = useTranslations();

    return (
        <section className="border-t border-white/5 bg-background py-16">
            <div className="container mx-auto px-4">
                <h3 className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    {t("caseStudies.sections.servicesUsed") || "Services Provided"}
                </h3>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {study.servicesUsed.map((serviceSlug) => {
                        const translationKey = `services.${toCamelCase(serviceSlug)}`;
                        // Fallback to title case if translation key doesn't work perfectly (though strict rules say it should)
                        // We use a basic check. Next-intl specific: t.has() or just try t()

                        return (
                            <div
                                key={serviceSlug}
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-secondary/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-primary/50 hover:bg-primary/10"
                            >
                                <CheckCircle2 size={16} className="text-primary" />
                                <span>{t(translationKey)}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
                    >
                        {t("hero.ctaPrimary")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
