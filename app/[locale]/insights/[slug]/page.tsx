import { getAllOneLocalePosts, getBlogPost, getAllPosts } from "@/lib/mdx";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BlogContent } from "@/components/sections/blog-content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ShareButtons } from "@/components/ui/share-buttons";
import { BlogCard } from "@/components/sections/blog-card";
import { Metadata } from "next";
import { Calendar, Clock, User } from "lucide-react";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const posts = await getAllPosts();
    const locales = ["en", "pt"];

    return locales.flatMap((locale) =>
        posts.map((slug) => ({
            locale,
            slug,
        }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = await getBlogPost(slug, locale);

    if (!post) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: "insights" });
    const siteUrl = "https://dkapture.com"; // Should ideally be env var
    const url = `${siteUrl}/${locale === "en" ? "insights" : "pt/insights"}/${slug}`;
    const ogImage = post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/images/og-default.jpg`;

    return {
        title: `${post.title} | Dkapture Agency`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            url,
            images: [{ url: ogImage, width: 1200, height: 630 }],
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
        alternates: {
            languages: {
                en: `${siteUrl}/insights/${slug}`,
                pt: `${siteUrl}/pt/insights/${slug}`,
            }
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = await getBlogPost(slug, locale);

    if (!post) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "insights" });
    const allPosts = await getAllOneLocalePosts(locale);

    // Related posts logic: Same category, exclude current, take 3
    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug && p.category === post.category)
        .slice(0, 3);

    // If not enough related posts by category, fill with remaining recent posts
    if (relatedPosts.length < 3) {
        const remaining = allPosts
            .filter(p => p.slug !== slug && !relatedPosts.find(rp => rp.slug === p.slug))
            .slice(0, 3 - relatedPosts.length);
        relatedPosts.push(...remaining);
    }

    // JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage ? `https://dkapture.com${post.featuredImage}` : undefined,
        datePublished: post.date,
        author: {
            "@type": "Organization",
            name: post.author,
        },
        url: `https://dkapture.com/${locale === "en" ? "insights" : "pt/insights"}/${slug}`,
    };

    const formattedDate = new Date(post.date).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return (
        <>
            <ReadingProgress />

            {/* JSON-LD Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="min-h-screen bg-neutral-950 pb-24 pt-32 md:pt-40">
                {/* Header */}
                <div className="container px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8">
                            <Breadcrumbs
                                items={[
                                    { label: t("title"), href: "/insights" },
                                    { label: post.title },
                                ]}
                            />
                        </div>

                        <div className="mb-6 flex flex-wrap gap-4 text-sm text-neutral-400">
                            <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-500 capitalize">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {formattedDate}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {t("readTime", { minutes: post.readTime })}
                            </div>
                        </div>

                        <h1 className="mb-8 font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 border-l-2 border-orange-500 pl-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-800">
                                {/* Author Avatar Placeholder or Generic Icon */}
                                <div className="flex h-full w-full items-center justify-center text-neutral-500">
                                    <User className="h-5 w-5" />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{t("writtenBy")}</div>
                                <div className="text-sm text-neutral-400">{post.author}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="container my-12 px-4 md:my-16">
                    <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-2xl border border-neutral-800">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="container px-4">
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="hidden lg:col-span-2 lg:block">
                            <div className="sticky top-32">
                                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                                    {t("share")}
                                </p>
                                <ShareButtons title={post.title} url={`https://dkapture.com/${locale === "en" ? "insights" : "pt/insights"}/${slug}`} />
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <BlogContent content={post.content} />

                            {/* Mobile Share */}
                            <div className="mt-12 lg:hidden">
                                <ShareButtons title={post.title} url={`https://dkapture.com/${locale === "en" ? "insights" : "pt/insights"}/${slug}`} />
                            </div>
                        </div>

                        <div className="hidden lg:col-span-2 lg:block">
                            {/* Future TOC or Ads */}
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="container mt-24 px-4">
                        <h2 className="mb-12 border-t border-neutral-800 pt-12 font-display text-3xl font-bold uppercase text-white">
                            {t("relatedArticles")}
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {relatedPosts.map(post => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </>
    );
}
