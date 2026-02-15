import { useTranslations } from "next-intl";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { caseStudies } from "@/content/portfolio";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "portfolio" });
    return {
        title: `${t("title")} | Dkapture Agency`,
        description: t("subtitle"),
        alternates: {
            canonical: "https://dkapture.com/portfolio",
            languages: {
                en: "https://dkapture.com/portfolio",
                pt: "https://dkapture.com/pt/portfolio",
            },
        },
    };
}

export default function PortfolioPage() {
    const t = useTranslations("portfolio");

    return (
        <main id="main-content" className="min-h-screen bg-background pt-24">
            {/* Header */}
            <section className="container mx-auto px-4 pb-12 text-center md:pb-20">
                <h1 className="mb-6 font-display text-4xl font-bold uppercase text-white md:text-6xl">
                    {t("title")}
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                    {t("subtitle")}
                </p>
            </section>

            {/* Grid Client Component */}
            <PortfolioGrid items={caseStudies} />
        </main>
    );
}
