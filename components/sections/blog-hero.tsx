import { useTranslations } from "next-intl";

export function BlogHero() {
    const t = useTranslations("insights");

    return (
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-24">
            <div className="container px-4">
                <div className="max-w-3xl">
                    <h1 className="mb-6 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl">
                        {t("title")}
                    </h1>
                    <p className="text-xl leading-relaxed text-neutral-400 md:text-2xl">
                        {t("subtitle")}
                    </p>
                    <div className="mt-8 h-1 w-20 bg-orange-500" />
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
        </section>
    );
}
