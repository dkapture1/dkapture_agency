import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://dkapture.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: "%s | DKAPTURE",
    },
    description: t("description"),
    keywords: [
      "digital marketing agency",
      "AI marketing",
      "brazilian business usa",
      "marketing for brazilian entrepreneurs",
      "google ads agency florida",
      "bilingual marketing agency",
      "video marketing",
      "drone photography",
      "web design agency",
    ],
    authors: [{ name: "Dkapture" }],
    creator: "Dkapture",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: locale === "en" ? siteUrl : `${siteUrl}/pt`,
      languages: {
        en: siteUrl,
        pt: `${siteUrl}/pt`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      url: locale === "en" ? siteUrl : `${siteUrl}/pt`,
      siteName: "DKAPTURE",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: `${siteUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: "DKAPTURE - AI-Powered Digital Marketing Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${siteUrl}/images/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground grain-overlay">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
