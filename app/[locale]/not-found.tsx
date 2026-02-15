import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
    const t = useTranslations("notFound");

    return (
        <main id="main-content" className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                <h1 className="text-6xl font-bold text-orange-500">404</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{t("title")}</h2>
                    <p className="text-neutral-400">{t("description")}</p>
                </div>
                <div className="pt-6">
                    <Link
                        href="/"
                        className="px-6 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors font-medium inline-block"
                    >
                        {t("goHome")}
                    </Link>
                </div>
            </div>
        </main>
    );
}
