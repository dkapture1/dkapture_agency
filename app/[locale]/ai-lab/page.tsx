import { setRequestLocale, getTranslations } from "next-intl/server";
import { AiHero } from "@/components/sections/ai-hero";
import { RoiCalculator } from "@/components/ui/roi-calculator";
import { AiToolsGrid } from "@/components/sections/ai-tools-grid";
import { AiFlowDiagram } from "@/components/sections/ai-flow-diagram";
import { AiComparison } from "@/components/sections/ai-comparison";
import { AiIntegrations } from "@/components/sections/ai-integrations";
import { AiCta } from "@/components/sections/ai-cta";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "aiLab" });

    return {
        title: `${t("metaTitle")} | Dkapture Agency`,
        description: t("metaDescription"),
        alternates: {
            languages: {
                en: "https://dkapture.com/ai-lab",
                pt: "https://dkapture.com/pt/laboratorio-ia",
            },
        },
    };
}

export default async function AiLabPage({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main id="main-content" className="bg-black text-white">
            <AiHero />
            <RoiCalculator />
            <AiToolsGrid />
            <AiFlowDiagram />
            <AiComparison />
            <AiIntegrations />
            <AiCta />
        </main>
    );
}
