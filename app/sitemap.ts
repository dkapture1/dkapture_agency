import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const siteUrl = "https://dkapture.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((slug) => [
    {
      url: `${siteUrl}/insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/insights/${slug}`,
          pt: `${siteUrl}/pt/insights/${slug}`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          pt: `${siteUrl}/pt`,
        },
      },
    },
    {
      url: `${siteUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/ecosystem`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/ecosystem`,
          pt: `${siteUrl}/pt/ecossistema`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/ecossistema`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ecosystem/brand-identity`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/ecosystem/brand-identity`,
          pt: `${siteUrl}/pt/ecossistema/identidade-visual`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/ecossistema/identidade-visual`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ecosystem/digital-platforms`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/ecosystem/digital-platforms`,
          pt: `${siteUrl}/pt/ecossistema/plataformas-digitais`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/ecossistema/plataformas-digitais`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ecosystem/visual-storytelling`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/ecosystem/visual-storytelling`,
          pt: `${siteUrl}/pt/ecossistema/storytelling-visual`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/ecossistema/storytelling-visual`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ecosystem/growth-performance`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/ecosystem/growth-performance`,
          pt: `${siteUrl}/pt/ecossistema/crescimento-performance`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/ecossistema/crescimento-performance`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ecosystem/ai-lab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/ecosystem/ai-lab`,
          pt: `${siteUrl}/pt/ecossistema/laboratorio-ia`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/ecossistema/laboratorio-ia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/portfolio`,
          pt: `${siteUrl}/pt/portfolio`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ai-lab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteUrl}/ai-lab`,
          pt: `${siteUrl}/pt/laboratorio-ia`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/laboratorio-ia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/insights`,
          pt: `${siteUrl}/pt/insights`,
        },
      },
    },
    {
      url: `${siteUrl}/pt/insights`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...blogEntries];
}
