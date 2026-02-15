import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { servicesList } from "@/content/services";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import { Metadata } from "next";


interface EcosystemPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({
    params,
}: EcosystemPageProps): Promise<Metadata> {
    const { locale } = await params;
    const { getTranslations } = await import("next-intl/server");
    const t = await getTranslations({ locale });

    return {
        title: `${t("navigation.ecosystem")} | Dkapture Agency`,
        description: t("services.description"),
    };
}

export default async function EcosystemPage({ params }: EcosystemPageProps) {
    const { locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    // We need to use await getTranslations for async components if we want to be consistent, but useTranslations matches client/server. 
    // Actually, useTranslations works in Server Components too if setup correctly, but for async params unwrapping, getTranslations is often safer or encouraged in new patterns.
    // However, documentation says useTranslations work.
    // BUT since I am awaiting params, I should just use `const t = await getTranslations({locale});` to be safe and avoid "hooks inside async component" issues if any.
    // wait, `useTranslations` is a hook. It might complain in an async component if not used correctly.
    // `Next-intl` docs say `useTranslations` is fine in Server Components.
    // But `params` MUST be awaited.

    // Let's use getTranslations to be safe and consistent with the dynamic page.
    const t = await getTranslations({ locale });

    return (
        <main id="main-content" className="min-h-screen bg-black pt-24 pb-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h1 className="font-display text-4xl font-bold uppercase tracking-wider text-white sm:text-6xl">
                        {t("serviceSections.the")} <span className="text-[#FF4500]">Ecosystem</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        {t("services.description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {servicesList.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/ecosystem/${service.slug}` as any}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-[#FF4500]/50 hover:bg-white/10"
                        >
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FF4500]/0 transition-opacity duration-500 group-hover:from-[#FF4500]/10" />

                            <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#FF4500] transition-colors">
                                {t(service.titleKey as any)}
                            </h3>

                            <p className="mt-4 flex-1 text-base text-gray-400">
                                {t(service.descriptionKey as any)}
                            </p>

                            <div className="mt-8 flex items-center text-sm font-semibold text-white">
                                {t("common.learnMore")}
                                <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
