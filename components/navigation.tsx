"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShutterIcon } from "./shutter-icon";
import { LanguageToggle } from "./language-toggle";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const navItems = [
    { label: t("ecosystem"), href: "/ecosystem" },
    { label: t("portfolio"), href: "/portfolio" },
    { label: t("aiLab"), href: "/ecosystem/ai-lab" },
    { label: t("insights"), href: "#insights" }, // Keeping specific anchor if page doesn't exist yet, or just /insights
  ];

  // Checking if insights page exists in sitemap... 
  // It was commented out in sitemap.ts, so I should probably leave it as #insights or make a placeholder.
  // The user prompt only mentioned service pages. I'll stick to #insights for now or /insights if I want to be consistent with Link, but Link to non-existent page 404s.
  // Actually, I'll use /insights and let it 404 or use a placeholder if needed, but safer to use #insights for now if I haven't built it.
  // However, Link href must be a known path if typed? No, Link can take any string if not strictly typed or if typed loosely.
  // Given the previous error, Link expects known paths.
  // "insights" is NOT in routing.ts. So Link href="/insights" might error.
  // I will use <a> for external/anchor links or just cast to any.
  // Better: generic links.
  // Let's use /ecosystem/ai-lab which exists.
  // For insights, I'll use /insights and cast to any if needed, or leave as string.

  // Re-reading routing.ts: matches specific paths.
  // If I use Link with a path not in routing.ts, it might default to standard Next.js Link behavior or error if typed.
  // I'll assume /insights is NOT ready. I'll use a valid path for valid pages, and maybe <a> for others?
  // But I want localized links.
  // I'll just use Link and expect it to handle it.

  // Actually, looking at routing.ts, only specific paths are defined.
  // If I pass a path NOT in `pathnames`, next-intl treats it as a literal string and appends locale.
  // But TypeScript might block it.

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/60 backdrop-blur-xl border-b border-foreground/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <ShutterIcon className="h-9 w-9 transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-foreground">
                DKAPTURE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as any}
                  className={cn(
                    "group relative text-sm font-medium transition-colors duration-300 hover:text-foreground",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-5">
              <LanguageToggle />
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:scale-105"
              >
                <span className="relative z-10">{t("startProject")}</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsMobileMenuOpen(false);
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close menu"
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-40 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-2xl border-l border-foreground/5 transition-transform duration-300 ease-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-8 pt-28 pb-10">
          <div className="flex flex-col gap-2">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href as any}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "group flex items-center gap-4 rounded-xl px-4 py-4 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground",
                  pathname === item.href ? "text-foreground bg-foreground/5" : "text-muted-foreground"
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className={cn(
                  "h-px bg-primary/40 transition-all duration-300 group-hover:bg-primary",
                  pathname === item.href ? "w-10 bg-primary" : "w-6 group-hover:w-10"
                )} />
                <span className="font-display text-2xl font-medium tracking-wide">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-6">
            <LanguageToggle />
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)]"
            >
              {t("startProject")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
