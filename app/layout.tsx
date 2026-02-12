import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "DKAPTURE | AI-Powered Digital Marketing Agency",
    template: "%s | DKAPTURE",
  },
  description:
    "AI-powered digital marketing agency for Brazilian entrepreneurs in the USA. We build your digital empire with visual storytelling, performance ads, and intelligent automation.",
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
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}/en`,
      pt: `${siteUrl}/pt`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    url: siteUrl,
    siteName: "DKAPTURE",
    title: "DKAPTURE | AI-Powered Digital Marketing Agency",
    description:
      "We build your digital empire with visual storytelling, performance ads, and AI-powered automation. For Brazilian entrepreneurs conquering the American market.",
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
    title: "DKAPTURE | AI-Powered Digital Marketing Agency",
    description:
      "AI-powered marketing ecosystem for Brazilian entrepreneurs conquering the American market.",
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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground grain-overlay">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
