"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: Props) {
    const t = useTranslations("error");

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main id="main-content" className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                <h1 className="text-6xl font-bold text-red-500">500</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{t("title")}</h2>
                    <p className="text-neutral-400">{t("description")}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <button
                        onClick={reset}
                        className="px-6 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium"
                    >
                        {t("retry")}
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors font-medium"
                    >
                        {t("goHome")}
                    </Link>
                </div>
            </div>
        </main>
    );
}
