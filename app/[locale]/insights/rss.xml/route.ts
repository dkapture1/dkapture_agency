import { getAllOneLocalePosts } from "@/lib/mdx";

const siteUrl = "https://dkapture.com";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const posts = await getAllOneLocalePosts(locale);

  const title = locale === "en" ? "Dkapture Insights" : "Insights Dkapture";
  const description =
    locale === "en"
      ? "Dispatches from the frontier of AI-powered marketing."
      : "Despachos da fronteira do marketing com IA.";
  const link = `${siteUrl}/${locale === "en" ? "insights" : "pt/insights"}`;

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <language>${locale}</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${link}/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts
      .map((post) => {
        const postUrl = `${link}/${post.slug}`;
        return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.excerpt}]]></description>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <author>hello@dkapture.com (${post.author})</author>
          <category>${post.category}</category>
        </item>`;
      })
      .join("")}
    </channel>
  </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
