import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DKAPTURE | AI-Powered Digital Marketing Agency",
  description:
    "AI-powered digital marketing agency for Brazilian entrepreneurs in the USA. We capture your vision and amplify it.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
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
      </body>
    </html>
  );
}
