import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { services, servicesList } from "@/content/services";
import { ServiceHero } from "@/components/sections/service-hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { WhatsIncluded } from "@/components/sections/whats-included";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { ServiceCTA } from "@/components/sections/service-cta";
import { RelatedCase } from "@/components/sections/related-case";
import { Metadata } from "next";

interface ServicePageProps {
    params: Promise<{
        locale: string;
        service: string;
    }>;
}

export function generateStaticParams() {
    const locales = ["en", "pt"];
    const params: { locale: string; service: string }[] = [];

    for (const locale of locales) {
        for (const service of servicesList) {
            params.push({ locale, service: service.slug });
        }
    }
    return params;
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const { locale, service } = await params;
    // We need to access translations server-side for metadata
    // dynamic import of messages or using getTranslations
    const { getTranslations } = await import("next-intl/server");
    const t = await getTranslations({ locale, namespace: "" }); // root namespace to access nested keys manually

    const serviceData = services[service as keyof typeof services];

    if (!serviceData) {
        return {
            title: "Service Not Found",
        };
    }

    // We can't easily dynamically access keys like t(serviceData.titleKey) in metadata 
    // without the full path or namespace properly set.
    // But t() takes a string.
    // serviceData.titleKey e.g. "brandIdentity.title"

    return {
        title: `${t(serviceData.titleKey as any)} | Dkapture Agency`,
        description: t(serviceData.descriptionKey as any),
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { locale, service } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    const serviceData = services[service as keyof typeof services];

    if (!serviceData) {
        notFound();
    }

    return (
        <main id="main-content" className="bg-black text-white">
            <ServiceHero
                titleKey={serviceData.titleKey}
                descriptionKey={serviceData.descriptionKey}
            />

            <ProblemSolution
                challengesKey={serviceData.challengesKey}
                solutionsKey={serviceData.solutionsKey}
            />

            <WhatsIncluded included={serviceData.included} />

            <ProcessTimeline process={serviceData.process} />

            <PricingPreview pricing={serviceData.pricing} />

            <RelatedCase slug={serviceData.relatedCaseSlug} />

            <FAQAccordion faqs={serviceData.faqs} />

            <ServiceCTA />
        </main>
    );
}
