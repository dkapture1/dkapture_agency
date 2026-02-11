"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShutterIcon } from "./shutter-icon";
import { LanguageToggle } from "./language-toggle";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Insights", href: "#insights" },
];

export function Navigation() {
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
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <ShutterIcon className="h-9 w-9 transition-transform duration-500 group-hover:rotate-45" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-foreground">
                DKAPTURE
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-5">
              <LanguageToggle />
              <a
                href="#start"
                className="relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:scale-105"
              >
                <span className="relative z-10">Start Your Project</span>
              </a>
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
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-4 rounded-xl px-4 py-4 text-muted-foreground transition-all duration-300 hover:bg-foreground/5 hover:text-foreground"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="h-px w-6 bg-primary/40 transition-all duration-300 group-hover:w-10 group-hover:bg-primary" />
                <span className="font-display text-2xl font-medium tracking-wide">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-6">
            <LanguageToggle />
            <a
              href="#start"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)]"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
