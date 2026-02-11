"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const [lang, setLang] = useState<"EN" | "PT">("EN");

  return (
    <div className="flex items-center rounded-full border border-foreground/10 bg-foreground/5 p-0.5">
      <button
        type="button"
        onClick={() => setLang("EN")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
          lang === "EN"
            ? "bg-foreground/10 text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("PT")}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
          lang === "PT"
            ? "bg-foreground/10 text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        PT
      </button>
    </div>
  );
}
