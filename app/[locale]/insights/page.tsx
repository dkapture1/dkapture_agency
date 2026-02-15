import { BlogPostMetadata, getAllOneLocalePosts } from "@/lib/mdx";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BlogHero } from "@/components/sections/blog-hero";
import { BlogSidebar } from "@/components/sections/blog-sidebar";
import { BlogCard } from "@/components/sections/blog-card";
import { Metadata } from "next";

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "insights" });

    return {
        title: `${t("title")} | Dkapture Agency`,
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            type: "website",
        },
    };
}

export default async function InsightsPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { category, q } = await searchParams;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "insights" });
    const allPosts = await getAllOneLocalePosts(locale);

    // Filter posts based on category and search query
    const filteredPosts = allPosts.filter((post) => {
        const matchesCategory = category
            ? post.category?.toLowerCase() === (category as string).toLowerCase()
            : true;

        // Simple search implementation
        const query = (q as string)?.toLowerCase();
        const matchesSearch = query
            ? post.title?.toLowerCase().includes(query) || post.excerpt?.toLowerCase().includes(query)
            : true;

        return matchesCategory && matchesSearch;
    });

    const uniqueCategories = Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)));

    return (
        <main id="main-content" className="min-h-screen bg-neutral-950">
            <BlogHero />

            <section className="container px-4 pb-24">
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Main Content - Grid of Cards */}
                    <div className="lg:col-span-8">
                        {filteredPosts.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2">
                                {filteredPosts.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 text-center">
                                <p className="text-xl text-neutral-400">{t("noResults")}</p>
                                {category || q ? (
                                    <p className="mt-2 text-sm text-neutral-500">
                                        {t("noResultsDescription")}
                                    </p>
                                ) : null}
                            </div>
                        )}

                        {/* Pagination Placeholder - Sprint 6 MVP just lists all (filtered) */}
                        {/* If we had pagination, strict implementation would go here */}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <BlogSidebar
                                activeCategory={category as string}
                                categories={uniqueCategories}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
