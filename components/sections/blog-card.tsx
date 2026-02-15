import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { BlogPostMetadata } from "@/lib/mdx";

interface BlogCardProps {
    post: BlogPostMetadata;
}

export function BlogCard({ post }: BlogCardProps) {
    const t = useTranslations("insights");

    // Format date nicely (assuming YYYY-MM-DD input)
    const formattedDate = new Date(post.date).toLocaleDateString(post.locale === "pt" ? "pt-BR" : "en-US", {
        month: "long",
        year: "numeric"
    });

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 transition-colors hover:border-neutral-700 hover:bg-neutral-900">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                {/* Fallback image if featuredImage fails or is missing, but strict typing suggests it's there. */}
                <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 rounded-full bg-neutral-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-neutral-700 capitalize">
                    {post.category}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center gap-4 text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{t("readTime", { minutes: post.readTime })}</span>
                    </div>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-orange-500">
                    <Link href={{ pathname: "/insights/[slug]", params: { slug: post.slug } }}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.title}
                    </Link>
                </h3>

                <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-400">
                    {post.excerpt}
                </p>

                <div className="flex items-center text-sm font-bold text-orange-500">
                    {t("readMore")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </article>
    );
}
