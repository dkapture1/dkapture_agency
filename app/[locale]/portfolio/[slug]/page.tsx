import { notFound } from "next/navigation";
import { caseStudies } from "@/content/portfolio";
import { CaseHero } from "@/components/sections/case-hero";
import { CaseStats } from "@/components/sections/case-stats";
import { CaseChallenge } from "@/components/sections/case-challenge";
import { CaseApproach } from "@/components/sections/case-approach";
import { CaseGallery } from "@/components/sections/case-gallery";
import { CaseResults } from "@/components/sections/case-results";
import { CaseServices } from "@/components/sections/case-services";
import { CaseNavigation } from "@/components/sections/case-navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface PageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export function generateStaticParams() {
    const locales = ["en", "pt"];
    const params: { locale: string; slug: string }[] = [];

    for (const locale of locales) {
        for (const study of caseStudies) {
            params.push({ locale, slug: study.slug });
        }
    }
    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const study = caseStudies.find((s) => s.slug === slug);
    if (!study) return {};

    const t = await getTranslations({ locale, namespace: '' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const title = t(study.titleKey as any);

    return {
        title: `${title} | Dkapture Agency`,
        description: `Case study for ${title}`,
        alternates: {
            languages: {
                en: `https://dkapture.com/portfolio/${slug}`,
                pt: `https://dkapture.com/pt/portfolio/${slug}`,
            },
        },
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug, locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    const studyIndex = caseStudies.findIndex((s) => s.slug === slug);
    const study = caseStudies[studyIndex];

    if (!study) {
        notFound();
    }

    const prevStudy = studyIndex > 0 ? caseStudies[studyIndex - 1] : undefined;
    const nextStudy = studyIndex < caseStudies.length - 1 ? caseStudies[studyIndex + 1] : undefined;

    return (
        <main id="main-content">
            <CaseHero study={study} />
            <CaseStats study={study} />
            <CaseChallenge study={study} />
            <CaseApproach study={study} />
            <CaseGallery study={study} />
            <CaseResults study={study} />
            <CaseServices study={study} />
            <CaseNavigation prevStudy={prevStudy} nextStudy={nextStudy} />
        </main>
    );
}
