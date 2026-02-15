import { defineRouting } from "next-intl/routing";


export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/ecosystem": {
      en: "/ecosystem",
      pt: "/ecossistema",
    },
    "/ecosystem/brand-identity": {
      en: "/ecosystem/brand-identity",
      pt: "/ecossistema/identidade-visual",
    },
    "/ecosystem/digital-platforms": {
      en: "/ecosystem/digital-platforms",
      pt: "/ecossistema/plataformas-digitais",
    },
    "/ecosystem/visual-storytelling": {
      en: "/ecosystem/visual-storytelling",
      pt: "/ecossistema/storytelling-visual",
    },
    "/ecosystem/growth-performance": {
      en: "/ecosystem/growth-performance",
      pt: "/ecossistema/crescimento-performance",
    },
    "/ecosystem/ai-lab": {
      en: "/ecosystem/ai-lab",
      pt: "/ecossistema/laboratorio-ia",
    },
    "/contact": {
      en: "/contact",
      pt: "/contato",
    },
    "/portfolio": {
      en: "/portfolio",
      pt: "/portfolio",
    },
    "/portfolio/[slug]": {
      en: "/portfolio/[slug]",
      pt: "/portfolio/[slug]",
    },
    "/ai-lab": {
      en: "/ai-lab",
      pt: "/laboratorio-ia",
    },
    "/insights": {
      en: "/insights",
      pt: "/insights",
    },
    "/insights/[slug]": {
      en: "/insights/[slug]",
      pt: "/insights/[slug]",
    },
  },
});
