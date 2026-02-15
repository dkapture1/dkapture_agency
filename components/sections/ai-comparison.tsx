"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

export function AiComparison() {
    const t = useTranslations("aiLab.comparison");
    const features = ["response", "availability", "scaling", "data"];

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="mb-16 text-center">
                <h2 className="font-display text-3xl font-bold uppercase text-white md:text-5xl">
                    {t("title")}
                </h2>
            </div>

            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-white/5">
                                <th className="p-6 text-sm font-medium uppercase tracking-wider text-neutral-400">
                                    {t("headers.feature")}
                                </th>
                                <th className="p-6 text-sm font-medium uppercase tracking-wider text-neutral-400">
                                    {t("headers.traditional")}
                                </th>
                                <th className="bg-orange-500/10 p-6 text-sm font-bold uppercase tracking-wider text-orange-500">
                                    {t("headers.dkapture")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {features.map((feature) => (
                                <tr key={feature} className="group transition-colors hover:bg-white/5">
                                    <td className="p-6 font-medium text-white">
                                        {t(`rows.${feature}.feature`)}
                                    </td>
                                    <td className="p-6 text-neutral-400">
                                        <div className="flex items-center gap-2">
                                            <X className="h-4 w-4 text-red-500/50" />
                                            {t(`rows.${feature}.traditional`)}
                                        </div>
                                    </td>
                                    <td className="bg-orange-500/5 p-6 font-bold text-white group-hover:bg-orange-500/10">
                                        <div className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-orange-500" />
                                            {t(`rows.${feature}.dkapture`)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
