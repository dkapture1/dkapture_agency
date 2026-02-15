"use client";

import { useTranslations } from "next-intl";
import { Search, ArrowRight, Tag } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";

interface BlogSidebarProps {
    // We can pass current category or search query if we want to highlight active states
    activeCategory?: string;
    categories: string[];
}

export function BlogSidebar({ activeCategory, categories }: BlogSidebarProps) {
    const t = useTranslations("insights");
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation with search params:
        // router.push(`${pathname}?q=${searchQuery}`);
        // For now, since we don't have full search logic mapped in the plan details, we'll keep it simple.
        // The plan said "Search functionality (client-side)".
        // Let's implement actual URL parameter update to be future proof.
        router.push({ pathname: "/insights", query: { q: searchQuery } });
    };

    return (
        <aside className="space-y-12">
            {/* Search */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 py-3 pl-4 pr-10 text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button
                        type="submit"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-orange-500"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </form>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 className="mb-6 font-display text-lg font-bold uppercase text-white">
                    {t("categories.all")} {/* Using generic headline or specific? "Categories" isn't in namespace explicitly, using "all" as fallback or key */}
                </h3>
                <nav className="space-y-2">
                    {/* Hardcoded 'All' link */}
                    <Link
                        href="/insights"
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${!activeCategory
                            ? "bg-orange-500/10 text-orange-500 font-medium"
                            : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                            }`}
                    >
                        <span>{t("categories.all")}</span>
                    </Link>

                    {/* Dynamic categories from posts */}
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={{ pathname: "/insights", query: { category: cat } }}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${activeCategory === cat
                                ? "bg-orange-500/10 text-orange-500 font-medium"
                                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                }`}
                        >
                            {/* @ts-ignore - dynamic key access for simplicity, strictly should be typed */}
                            <span className="capitalize">{t(`categories.${cat}`)}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6">
                <h3 className="mb-2 font-display text-xl font-bold uppercase text-white">
                    {t("newsletter.title")}
                </h3>
                <p className="mb-6 text-sm text-neutral-400">
                    {t("newsletter.description")}
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder={t("newsletter.placeholder")}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 py-3 px-4 text-sm text-white placeholder-neutral-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold text-black transition-colors hover:bg-neutral-200"
                    >
                        {t("newsletter.button")}
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </aside>
    );
}
