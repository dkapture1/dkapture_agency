# Prompt para Gemini — Sprint 7: Polish, Performance & Launch

> Copie o bloco abaixo e cole no Gemini

---

```
Você é o desenvolvedor principal do site da Dkapture Agency. Todas as sprints de funcionalidade (2-6) foram finalizadas e validadas. A Sprint 7 é a sprint final de polimento, performance e preparação para launch.

## Localização do projeto
/Users/renandkt/Sites/dkapture_agency/dkapture-agency-website/

## Documentação de referência
1. `docs/AI-DEVELOPMENT-GUIDE.md` — Arquitetura e regras do projeto
2. `docs/sprints/SPRINT-7.md` — Especificação completa desta sprint (LEIA INTEIRO)

## Stack do projeto
- Next.js 16.1.6 (App Router)
- next-intl 4.8.2
- Tailwind CSS 3.4 + shadcn/ui
- Framer Motion 11
- TypeScript strict
- pnpm (NÃO usar npm)

## Estado atual do projeto
- Todas as páginas funcionam: `/`, `/ecosystem/*`, `/portfolio/*`, `/ai-lab`, `/insights/*`
- i18n completo (EN/PT) em todas as páginas
- Sitemap com todas as rotas
- `robots.txt` existe em `/public/`
- NÃO existem: `not-found.tsx`, `error.tsx`, `global-error.tsx`, `manifest.json`

---

## PARTE 1: Tarefas que você deve implementar via código

### 1. Custom Error Pages (bilíngue)

**a) `app/not-found.tsx`** — Página 404 customizada
- Design alinhado com o visual do site (dark theme, fonte display)
- Mensagem bilíngue "Page not found" / "Página não encontrada"
- Link para homepage
- Sugestão de páginas populares (Ecosystem, Portfolio, AI Lab, Insights)
- Usar `@/i18n/navigation` para links

**b) `app/[locale]/not-found.tsx`** — 404 locale-aware (se necessário para next-intl)

**c) `app/error.tsx`** — Página 500 customizada
- `"use client"` (error boundaries são client components)
- Mensagem "Something went wrong" / "Algo deu errado"
- Botão "Try again" que chama `reset()`
- Link para homepage

**d) `app/global-error.tsx`** — Fallback global
- `"use client"`
- Layout HTML mínimo (pois o layout pode ter falhado)
- Botão de retry

### 2. PWA Manifest & Icons

**a) `public/manifest.json`:**
```json
{
  "name": "Dkapture Agency",
  "short_name": "Dkapture",
  "theme_color": "#FF4500",
  "background_color": "#000000",
  "display": "standalone",
  "start_url": "/",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**b)** Referenciar o manifest no `app/layout.tsx` (ou layout raiz):
```tsx
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#FF4500" />
```

**c)** Garantir que existam em `/public/`:
- `favicon.ico` (16x16 e 32x32)
- `apple-touch-icon.png` (180x180)
- Placeholder icons em `/public/icons/` (192x192, 512x512)

### 3. Schema Markup (JSON-LD)

**a) Organization schema** — em todas as páginas (no layout root ou em cada page):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dkapture Agency",
  "url": "https://dkapture.com",
  "logo": "https://dkapture.com/images/logo.svg",
  "sameAs": ["https://instagram.com/dkapture", "https://linkedin.com/company/dkapture"]
}
```

**b) LocalBusiness schema** — na homepage:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dkapture Agency",
  "address": [
    { "@type": "PostalAddress", "addressLocality": "Miami", "addressRegion": "FL", "addressCountry": "US" },
    { "@type": "PostalAddress", "addressLocality": "Orlando", "addressRegion": "FL", "addressCountry": "US" }
  ],
  "url": "https://dkapture.com"
}
```

**c) WebSite schema** com SearchAction (no layout):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dkapture Agency",
  "url": "https://dkapture.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dkapture.com/insights?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 4. Performance Optimization

**a) Imagens:**
- Verificar que TODAS as imagens usam `next/image` com `sizes` adequado
- Hero images com `priority={true}`
- Below-fold images com lazy loading (padrão do next/image)
- Adicionar `placeholder="blur"` onde possível (requer blurDataURL)

**b) Fonts:**
- Verificar `display: "swap"` no carregamento de fontes
- Preconnect para Google Fonts (se usado)

**c) Código:**
- Remover TODOS os `console.log` restantes (já verificado — nenhum encontrado em components)
- Verificar se há em `app/`, `lib/`, `content/`
- Remover imports não utilizados

### 5. Accessibility Quick Wins

**a)** Verificar contraste de cores — especialmente textos cinza em fundo escuro (`text-neutral-400` em `bg-neutral-950`)
**b)** Garantir `aria-label` em todos os botões de ícone (vários já têm, verificar os que faltam)
**c)** Adicionar skip navigation link no layout:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-white">
  Skip to main content
</a>
```
**d)** Garantir que todas as `<main>` tenham `id="main-content"`

### 6. Sitemap dinâmico (blog posts)

O `app/sitemap.ts` atual é estático. Atualizar para incluir dynamicamente os artigos do blog:
```tsx
import { getAllPosts, getBlogPost } from "@/lib/mdx";

// Dentro da função sitemap(), adicionar entries para cada post:
const posts = await getAllPosts();
const blogEntries = posts.flatMap((slug) => [
  {
    url: `${siteUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
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
    changeFrequency: "weekly" as const,
    priority: 0.7,
  },
]);
```

---

## PARTE 2: Tarefas que NÃO são do Gemini (apenas listar como TODO no código)

Estas tarefas serão feitas manualmente pelo owner do projeto:
- Lighthouse audit e otimizações baseadas nos resultados
- Configuração DNS (Cloudflare + Vercel)
- Google Analytics 4 setup (requer measurement ID)
- Google Search Console verification
- Cross-browser testing real
- Mobile testing em devices reais
- Substituir conteúdo placeholder por conteúdo real
- Deploy em produção

**NÃO implemente estas** — apenas adicione um `TODO` comment onde relevante.

---

## Padrões obrigatórios (mesmos de sempre)

```typescript
// params SEMPRE é Promise (Next.js 16)
interface PageProps {
    params: Promise<{ locale: string }>;
}
// SEMPRE await params
const { locale } = await params;
// SEMPRE setRequestLocale
setRequestLocale(locale);
```

## i18n nas error pages
- Error pages (`not-found.tsx`, `error.tsx`) podem não ter acesso ao locale via params
- Usar detecção simples (ex: `window.location.pathname.startsWith("/pt")`) ou mostrar ambos os idiomas
- `error.tsx` é client component — pode usar `useTranslations` se `NextIntlClientProvider` estiver no layout

## Verificação pós-implementação

1. `pnpm build` — deve passar sem erros
2. `pnpm dev` — testar:
   - Navegar para URL inexistente (ex: `/xyz`) → 404 customizado carrega
   - `/pt/xyz` → 404 customizado em PT
   - Todas as páginas existentes continuam funcionando
   - Verificar `view-source:` da homepage → JSON-LD presente
   - Verificar `/sitemap.xml` → inclui artigos do blog
   - Verificar `/manifest.json` → acessível

## Apresente o plano de implementação ANTES de começar a codar. O plano será revisado pelo Claude.

## Regras críticas (sempre válidas)
- Strings SEMPRE via `useTranslations()` — zero hardcode de texto visível
- Links internos SEMPRE via `@/i18n/navigation`, nunca `next/link`
- `params` é `Promise<>` no Next.js 16 — SEMPRE usar `await params`
- `pnpm build` deve passar sem erros
- Deploy em produção APENAS com OK explícito do usuário
- **NÃO fazer deploy** — esta sprint prepara para launch, o deploy será manual
```
