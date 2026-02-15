import React from "react";
import type { Viewport, Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

export const metadata: Metadata = {
  manifest: "/manifest.json",
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
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dkapture Agency",
    "url": "https://dkapture.com",
    "logo": "https://dkapture.com/images/logo.svg",
    "sameAs": ["https://instagram.com/dkapture", "https://linkedin.com/company/dkapture"]
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dkapture Agency",
    "url": "https://dkapture.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dkapture.com/insights?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      {children}
      <GoogleAnalytics gaId="G-KVQBMVPGJY" />
    </>
  );
}

