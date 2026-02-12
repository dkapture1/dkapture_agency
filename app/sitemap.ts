import type { MetadataRoute } from "next";

const siteUrl = "https://dkapture.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Future pages will be added here as they are built:
    // { url: `${siteUrl}/ecosystem`, ... },
    // { url: `${siteUrl}/portfolio`, ... },
    // { url: `${siteUrl}/ai-lab`, ... },
    // { url: `${siteUrl}/insights`, ... },
  ];
}
