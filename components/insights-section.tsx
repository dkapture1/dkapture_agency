import { getAllOneLocalePosts } from "@/lib/mdx";
import { getLocale } from "next-intl/server";
import { InsightsGrid } from "@/components/sections/insights-grid";

export async function InsightsSection() {
  const locale = await getLocale();
  const allPosts = await getAllOneLocalePosts(locale);

  // Take the 3 most recent posts
  const recentPosts = allPosts.slice(0, 3);

  return <InsightsGrid posts={recentPosts} />;
}
