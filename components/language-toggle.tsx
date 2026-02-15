"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "en" | "pt") {
    // Cast pathname to any to avoid strict typing issues with dynamic routes when switching locales
    router.replace(pathname as any, { locale: newLocale });
  }

  return (
    <div className="flex items-center rounded-full border border-foreground/10 bg-foreground/5 p-0.5">
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
          locale === "en"
            ? "bg-foreground/10 text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLocale("pt")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
          locale === "pt"
            ? "bg-foreground/10 text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        PT
      </button>
    </div>
  );
}
