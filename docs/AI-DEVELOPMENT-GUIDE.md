# Guia Tecnico de Continuidade - Dkapture Agency Website

> **Documento para IAs continuarem o desenvolvimento das proximas sprints.**
> Ultima atualizacao: 13 de Fevereiro de 2026
> Autor: Claude (Anthropic) em colaboracao com o proprietario do projeto.

---

## 1. VISAO GERAL DO PROJETO

### O Que E
Website institucional da **Dkapture**, uma agencia de marketing digital potencializada por IA, focada em empreendedores brasileiros nos EUA. O site e bilingue (EN/PT), com foco em conversao de leads atraves de formularios e WhatsApp.

### Stack Tecnologico

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Next.js | 16.1.6 | Framework (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | 5.7.3 | Tipagem |
| next-intl | 4.8.2 | Internacionalizacao (EN/PT) |
| Tailwind CSS | 3.4.17 | Styling |
| shadcn/ui | - | Componentes UI (Radix UI) |
| Framer Motion | 11.15.0 | Animacoes |
| React Hook Form | 7.54.1 | Formularios |
| Zod | 3.24.1 | Validacao |
| Resend | 6.9.2 | Envio de emails |
| Vercel | - | Hospedagem/Deploy |
| pnpm | - | Package Manager |

### Comandos Essenciais

```bash
pnpm dev          # Inicia dev server com Turbopack (http://localhost:3000)
pnpm build        # Build de producao
pnpm start        # Inicia server de producao
pnpm lint         # Roda ESLint
```

---

## 2. ARQUITETURA DO PROJETO

### Estrutura de Diretorios

```
dkapture-agency-website/
├── app/
│   ├── layout.tsx                  # Root layout MINIMO (apenas viewport + globals.css)
│   ├── globals.css                 # Estilos globais (Tailwind + custom)
│   ├── sitemap.ts                  # Sitemap dinamico
│   ├── [locale]/
│   │   ├── layout.tsx              # Layout principal (html, body, fonts, metadata, i18n provider)
│   │   └── page.tsx                # Homepage (renderiza todas as sections)
│   └── api/
│       ├── contact/route.ts        # POST endpoint - formulario de contato
│       └── newsletter/route.ts     # POST endpoint - newsletter
├── components/
│   ├── navigation.tsx              # ✅ i18n OK
│   ├── hero-section.tsx            # ✅ i18n OK
│   ├── services-section.tsx        # ✅ i18n OK
│   ├── ai-lab-section.tsx          # ✅ i18n OK
│   ├── portfolio-section.tsx       # ✅ i18n OK
│   ├── insights-section.tsx        # ✅ i18n OK
│   ├── cta-section.tsx             # ✅ i18n OK
│   ├── footer.tsx                  # ⚠️  i18n PENDENTE (strings hardcoded)
│   ├── language-toggle.tsx         # ✅ Funcional com next-intl
│   ├── shutter-icon.tsx            # Componente SVG da marca
│   ├── theme-provider.tsx          # Provider de tema
│   ├── animations/                 # Componentes de animacao reutilizaveis
│   └── ui/                         # 65+ componentes shadcn/ui
├── i18n/
│   ├── routing.ts                  # Configuracao de locales e prefixo
│   ├── request.ts                  # Configuracao de request do next-intl
│   └── navigation.ts              # Hooks de navegacao (Link, useRouter, usePathname)
├── messages/
│   ├── en.json                     # 211 linhas - Traducoes EN completas
│   └── pt.json                     # 211 linhas - Traducoes PT completas
├── lib/
│   ├── utils.ts                    # cn() helper (clsx + tailwind-merge)
│   ├── resend.ts                   # Cliente Resend configurado
│   ├── validations.ts              # Schemas Zod (contato, newsletter)
│   └── animations.ts              # Variants de animacao Framer Motion
├── hooks/
│   ├── use-mobile.tsx              # Hook para detectar mobile
│   └── use-toast.ts               # Hook para toasts
├── docs/
│   └── sprints/
│       ├── SPRINT-0.md             # ✅ Concluido
│       ├── SPRINT-1.md             # ✅ Concluido
│       ├── SPRINT-2.md             # 🔄 ~90% concluido (falta footer + sitemap)
│       ├── SPRINT-3.md             # ⏳ Pendente
│       ├── SPRINT-4.md             # ⏳ Pendente
│       ├── SPRINT-5.md             # ⏳ Pendente
│       ├── SPRINT-6.md             # ⏳ Pendente
│       └── SPRINT-7.md             # ⏳ Pendente
├── public/
│   ├── images/                     # Logo, OG images
│   ├── portfolio/                  # 6 imagens de portfolio
│   └── robots.txt                  # Configuracao de crawlers
├── middleware.ts                    # Middleware next-intl (locale detection)
├── next.config.mjs                 # Config Next.js com plugin next-intl
├── tailwind.config.ts              # Tema customizado (cores, fontes, animacoes)
├── tsconfig.json                   # TypeScript strict, path alias @/*
└── package.json                    # Scripts e dependencias
```

### Decisoes Arquiteturais Importantes

#### 1. Roteamento de Locales
```
localePrefix: "as-needed"
```
- Ingles (default): servido em `/` (SEM prefixo `/en`)
- Portugues: servido em `/pt`
- O middleware detecta o idioma do navegador e redireciona automaticamente

#### 2. Layout Split
O `<html>` e `<body>` estao em `app/[locale]/layout.tsx`, NAO no root layout.
- **`app/layout.tsx`**: Apenas `viewport` export e importa `globals.css`. Retorna `children` direto.
- **`app/[locale]/layout.tsx`**: Contem `<html lang={locale}>`, fonts (Inter + Oswald), `<body>`, `NextIntlClientProvider`, Analytics, SpeedInsights, e `generateMetadata()` com SEO bilingue.

**IMPORTANTE**: Ao criar novas paginas, SEMPRE crie dentro de `app/[locale]/`. Nunca diretamente em `app/`.

#### 3. Padrao de Internacionalizacao nos Componentes

Todos os componentes client-side seguem este padrao:

```typescript
"use client";

import { useTranslations } from "next-intl";

export function MeuComponente() {
  const t = useTranslations('namespace');     // namespace = chave raiz no JSON
  const tc = useTranslations('common');       // para strings comuns (opcional)

  // Arrays de dados devem ser definidos DENTRO do componente
  // para poder usar t() nos valores
  const items = [
    { label: t("item1"), value: "..." },
    { label: t("item2"), value: "..." },
  ];

  return <div>{t("titulo")}</div>;
}
```

Para Server Components:
```typescript
import { getTranslations } from "next-intl/server";

export default async function MinhaPage() {
  const t = await getTranslations('namespace');
  return <div>{t("titulo")}</div>;
}
```

#### 4. Navegacao Entre Locales

Usar SEMPRE os hooks de `@/i18n/navigation` (NAO de `next/navigation`):

```typescript
import { Link, useRouter, usePathname } from "@/i18n/navigation";

// Link com locale automatico
<Link href="/portfolio">...</Link>

// Trocar locale mantendo a pagina atual
const router = useRouter();
const pathname = usePathname();
router.replace(pathname, { locale: "pt" });
```

#### 5. Design System

- **Cor primaria**: `#FF4500` (laranja "Flame")
- **Background**: Preto puro (`#000000`)
- **Texto**: Branco com variantes de opacidade
- **Fontes**: Inter (corpo) + Oswald (display/titulos)
- **Animacoes**: Framer Motion com reducao automatica em mobile
- **Touch targets**: Minimo 44x44px em todos os botoes
- **Tipografia fluida**: `clamp()` para responsividade

---

## 3. STATUS ATUAL (Sprint 2 - ~90% concluido)

### O Que Ja Foi Feito

| Item | Status | Detalhes |
|------|--------|----------|
| Infraestrutura i18n | ✅ | next-intl, middleware, routing, provider |
| Root layout refatorado | ✅ | `lang={locale}` dinamico |
| Translation files | ✅ | en.json + pt.json com 211 linhas cada |
| Language Toggle | ✅ | Funcional com next-intl routing |
| Navigation | ✅ | useTranslations('navigation') |
| Hero Section | ✅ | useTranslations('hero') - headlines, stats, CTAs |
| Services Section | ✅ | useTranslations('services') + common - titulo, descricoes, 20 bullets |
| AI Lab Section | ✅ | useTranslations('aiLab') - 6 capabilities |
| Portfolio Section | ✅ | useTranslations('portfolio') - 6 projetos, filtros, labels |
| Insights Section | ✅ | useTranslations('insights') - 3 artigos, labels |
| CTA Section | ✅ | useTranslations('cta') - form completo, feedback states |
| Metadata SEO | ✅ | generateMetadata() com hreflang, OG locale |

### O Que Falta na Sprint 2

| Item | Status | O Que Fazer |
|------|--------|-------------|
| **Footer** | ⚠️ PENDENTE | Adicionar `useTranslations('footer')`, trocar strings hardcoded. Chaves JA existem em en.json/pt.json |
| **Sitemap bilingue** | ⚠️ PENDENTE | Atualizar `app/sitemap.ts` para incluir `/pt` |
| **Build + Testes** | ⚠️ PENDENTE | `pnpm build`, testar visualmente EN e PT no localhost |
| **Git tag** | ⏳ | Criar tag `v0.4.0-sprint-2` apos aprovacao do usuario |

### Como Finalizar a Sprint 2

#### 1. Footer (5 minutos)

O arquivo `components/footer.tsx` tem strings hardcoded. As chaves de traducao JA existem nos JSONs.

Mudancas necessarias:
```typescript
// Adicionar no topo:
import { useTranslations } from "next-intl";

// Dentro de Footer():
const t = useTranslations('footer');

// Mover ecosystemLinks e companyLinks para DENTRO do componente:
const ecosystemLinks = [
  { label: t("brandIdentity"), href: "#" },
  { label: t("digitalPlatforms"), href: "#" },
  { label: t("visualStorytelling"), href: "#" },
  { label: t("growthPerformance"), href: "#" },
  { label: t("aiIntelligenceLab"), href: "#" },
];

const companyLinks = [
  { label: t("aboutUs"), href: "#" },
  { label: t("careers"), href: "#" },
  { label: t("insightsBlog"), href: "#" },
  { label: t("contact"), href: "#" },
  { label: t("privacyPolicy"), href: "#" },
];

// Substituir strings hardcoded:
// "Get AI marketing insights weekly" → t("newsletterTitle")
// "your@email.com" (placeholder) → t("newsletterPlaceholder")
// "Subscribe" → t("newsletterButton")
// "Capturing Vision. Accelerating Growth." → t("tagline")
// "Ecosystem" (titulo) → t("ecosystemTitle")
// "Company" (titulo) → t("companyTitle")
// "Contact" (titulo) → t("contactTitle")
// "Miami, FL | Orlando, FL" → t("location")
// "© 2026 Dkapture. All rights reserved." → t("copyright")
// "Made with AI & Human Creativity" → t("madeWith")
```

#### 2. Sitemap Bilingue (2 minutos)

Atualizar `app/sitemap.ts`:
```typescript
import type { MetadataRoute } from "next";

const siteUrl = "https://dkapture.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: siteUrl,
          pt: `${siteUrl}/pt`,
        },
      },
    },
    {
      url: `${siteUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

#### 3. Build e Testes

```bash
pnpm build                    # Deve compilar sem erros
pnpm dev                      # Iniciar dev server

# Testar manualmente:
# http://localhost:3000        → Versao EN (default)
# http://localhost:3000/pt     → Versao PT
# Clicar no toggle EN/PT      → Deve trocar sem reload
# Verificar que TODAS as strings mudam de idioma
# Testar formulario CTA em ambos idiomas
# Testar newsletter no footer em ambos idiomas
```

---

## 4. ROADMAP DAS PROXIMAS SPRINTS

### Sprint 3 — Service Pages (5-6 dias)

**Objetivo**: Criar 5 paginas individuais de servico com template reutilizavel.

**URLs planejadas**:
| Servico | URL EN | URL PT |
|---------|--------|--------|
| Brand Identity | `/ecosystem/brand-identity` | `/pt/ecossistema/identidade-visual` |
| Digital Platforms | `/ecosystem/digital-platforms` | `/pt/ecossistema/plataformas-digitais` |
| Visual Storytelling | `/ecosystem/visual-storytelling` | `/pt/ecossistema/storytelling-visual` |
| Growth & Performance | `/ecosystem/growth-performance` | `/pt/ecossistema/crescimento-performance` |
| AI Intelligence Lab | `/ecosystem/ai-lab` | `/pt/ecossistema/laboratorio-ia` |

**Novos arquivos a criar**:
```
app/[locale]/ecosystem/page.tsx              # Overview dos servicos
app/[locale]/ecosystem/[service]/page.tsx    # Pagina dinamica por servico
components/sections/service-hero.tsx          # Hero com gradient laranja
components/sections/problem-solution.tsx      # Desafio vs Solucao
components/sections/whats-included.tsx        # Accordion com o que esta incluso
components/sections/pricing-preview.tsx       # Cards de 3 tiers
components/sections/process-timeline.tsx      # Timeline horizontal/vertical
components/sections/faq-accordion.tsx         # FAQ animado
components/sections/service-cta.tsx           # CTA no final
components/sections/related-case.tsx          # Case study relacionado
content/services/*.ts                         # Dados de cada servico
```

**Dados de pricing existentes na documentacao**:
- Growth & Performance: Starter $1,500/mo | Growth $3,500/mo | Enterprise Custom
- Digital Platforms: Essential $5,000 | Professional $12,000 | Enterprise $25,000+

**Padrao de pagina**:
1. Service Hero → 2. Problem vs Solution → 3. What's Included → 4. Pricing → 5. Process Timeline → 6. Related Case → 7. FAQ → 8. CTA

**Requisitos mobile**: Pricing cards em carrossel swipe, timeline vertical, touch targets 48px+.

**Internacionalizacao**: Todas as strings devem estar nos JSONs de traducao. Criar novos namespaces por servico ou agrupar sob `services.*`.

**SEO por pagina**: Titulo unico, descricao, JSON-LD `ServiceOffering`, breadcrumbs.

---

### Sprint 4 — Portfolio & Case Studies (4-5 dias)

**Objetivo**: Paginas detalhadas de case study com dados, galeria e resultados animados.

**Novos arquivos a criar**:
```
app/[locale]/portfolio/page.tsx              # Grid filtravel
app/[locale]/portfolio/[slug]/page.tsx       # Case study individual
components/sections/case-hero.tsx             # Imagem full-width
components/sections/case-stats.tsx            # Barra de metricas
components/sections/case-challenge.tsx        # Narrativa + citacao
components/sections/case-approach.tsx         # Passos da solucao
components/sections/case-gallery.tsx          # Masonry + lightbox
components/sections/case-results.tsx          # Counters animados
components/sections/case-services.tsx         # Cards de servicos usados
components/sections/case-navigation.tsx       # Prev/next
content/portfolio/*.ts                        # Dados dos cases
```

**6 Case Studies planejados**:
1. Sabor Brasileiro (Gastronomia) - +340% ROAS
2. Elite Home Pros (Home Services) - 3x Leads
3. Marina Bay Realty (Real Estate) - $4.2M em vendas
4. Gala Productions (Eventos) - 2M+ Views
5. Bella Vida Spa (Beleza) - +180% Receita
6. Churrasco & Co (Gastronomia) - 520K Seguidores

**Interface TypeScript definida**:
```typescript
interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: 'home-services' | 'gastronomy' | 'real-estate' | 'events' | 'beauty-wellness';
  duration: string;
  servicesUsed: string[];
  heroImage: string;
  challenge: { description, clientQuote, clientName, clientTitle, painPoints[] };
  approach: { steps: { title, description, icon }[] };
  gallery: { src, alt, type: 'image' | 'video' }[];
  results: { metrics: { label, before, after }[], testimonial };
  keyMetric: { value, label };
}
```

**Atualizar homepage**: Linkar "View Case" buttons aos case studies reais.

---

### Sprint 5 — AI Lab Page & ROI Calculator (4-5 dias)

**Objetivo**: Pagina interativa do AI Lab — diferencial competitivo da Dkapture.

**Novos arquivos a criar**:
```
app/[locale]/ai-lab/page.tsx
components/sections/ai-hero.tsx              # Hero com efeito matrix
components/sections/ai-tools-grid.tsx        # Bento grid de automacoes
components/sections/ai-flow-diagram.tsx      # Diagrama animado
components/sections/ai-comparison.tsx        # Tabela comparativa
components/sections/ai-demo.tsx              # Preview interativo
components/sections/ai-integrations.tsx      # Logos de parceiros
components/ui/roi-calculator.tsx             # CALCULADORA ROI INTERATIVA
```

**Logica da Calculadora ROI**:
```typescript
// Inputs: monthlyAdSpend, currentLeads, conversionRate, averageDealValue
// Fatores de melhoria com IA:
const AI_LEAD_INCREASE = 0.25;        // +25% leads
const AI_CONVERSION_BOOST = 0.15;     // +15% conversao
const AI_COST_REDUCTION = 0.20;       // -20% custo operacional
```

**5 Cards de Automacao**:
1. Instant Lead Responder (85% faster response)
2. Bilingual AI Chat (zero missed inquiries)
3. Review Booster (+200% review volume)
4. Content Repurposer (10x content from 1 shoot)
5. Predictive Lead Scoring (focus on hot leads)

**Tabela Comparativa**: Traditional Agency vs Dkapture AI (response time, 24/7 support, content volume, cost, personalization, reporting)

---

### Sprint 6 — Blog/Insights & SEO (4-5 dias)

**Objetivo**: Blog bilingue com MDX para captura de trafego organico.

**Novos arquivos a criar**:
```
app/[locale]/insights/page.tsx               # Listagem
app/[locale]/insights/[slug]/page.tsx        # Artigo individual
app/[locale]/insights/rss.xml/route.ts       # RSS feed
components/sections/blog-hero.tsx
components/sections/blog-card.tsx
components/sections/blog-sidebar.tsx
components/sections/blog-content.tsx          # Renderer MDX
components/ui/breadcrumbs.tsx
components/ui/share-buttons.tsx
components/ui/reading-progress.tsx
lib/mdx.ts                                   # Parser MDX
content/blog/*.mdx                           # Artigos
```

**5 Artigos iniciais**:
1. "How Brazilian Entrepreneurs Can Win the American Market with AI"
2. "Google Ads for Home Services in Florida: Complete Guide"
3. "Why Your Business Needs Bilingual Marketing in 2026"
4. "ROI of Professional Video in Facebook Ads"
5. "5 AI Automations Every Small Business Owner Should Use"

**Componentes MDX customizados**: `<Callout>`, `<StatCard>`, `<ComparisonTable>`, `<CTABanner>`, `<VideoEmbed>`, `<ImageGallery>`

**Dependencias novas**: `@next/mdx`, `gray-matter`, `next-mdx-remote` (ou equivalente)

---

### Sprint 7 — Polish, Performance & Launch (3-4 dias)

**Objetivo**: Otimizacao final, testes extensivos, deploy em producao.

**Quality Gates**:
| Metrica | Alvo |
|---------|------|
| Lighthouse Performance (Mobile) | > 90 |
| Lighthouse Accessibility | > 90 |
| Lighthouse SEO | > 90 |
| LCP (Mobile) | < 2.5s |
| CLS (Mobile) | < 0.1 |
| INP (Mobile) | < 200ms |

**Tarefas principais**:
- Otimizacao de imagens com `next/image`
- Bundle analysis
- Custom error pages (404, 500)
- Domain config (Cloudflare + Vercel)
- GA4 + Google Search Console
- PWA manifest + favicons
- Testes cross-browser e mobile extensivos
- Remover console.logs e TODOs

**Tag final**: `v1.0.0`

---

## 5. PADROES E CONVENCOES

### Estrutura de Namespaces de Traducao

```json
{
  "metadata": {},      // SEO (title, description, OG)
  "navigation": {},    // Menu de navegacao
  "hero": {},          // Hero section
  "services": {},      // Secao de servicos
  "aiLab": {},         // Secao AI Lab
  "portfolio": {},     // Secao portfolio
  "insights": {},      // Secao insights
  "cta": {},           // Formulario CTA
  "footer": {},        // Footer
  "common": {}         // Strings reutilizaveis (Learn More, Get Started, etc.)
}
```

Ao criar novas paginas, adicionar novos namespaces (ex: `"ecosystem"`, `"blog"`, `"caseStudy"`).

### Padrao de Componentes de Secao

```typescript
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export function NovaSeccao() {
  const t = useTranslations('namespace');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="section-id"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Conteudo com motion.div para animacoes */}
      </div>
    </section>
  );
}
```

### Padrao de API Routes

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ /* ... */ });

// Rate limiting simples (Map em memoria)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  // 1. Rate limit check
  // 2. Zod validation
  // 3. Business logic
  // 4. Return NextResponse.json()
}
```

### Cores do Design System

```css
--flame-500: #FF4500;      /* Cor primaria */
--background: #000000;      /* Fundo preto puro */
--foreground: #FFFFFF;       /* Texto branco */
--muted: #666666;           /* Texto secundario */
--border: rgba(255,255,255,0.05); /* Bordas sutis */
```

### Animacoes (Framer Motion)

- **Entrance**: `opacity: 0, y: 30` → `opacity: 1, y: 0` com `duration: 0.7`
- **Stagger**: `delay: 0.1 * index`
- **useInView**: `once: true, margin: "-100px"` para trigger no scroll
- **Mobile**: Desativar parallax e animacoes pesadas via hook `useIsMobile()`

---

## 6. VARIAVEIS DE AMBIENTE

```env
# Obrigatorias
RESEND_API_KEY=re_xxxxx                    # Chave da API Resend
CONTACT_EMAIL=hello@dkapture.com            # Email para notificacoes
WHATSAPP_NUMBER=13055550123                 # Numero WhatsApp (sem +)

# Futuras (Sprint 7)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX    # Google Analytics 4
```

NAO existe `.env.example` no projeto. Se criar, nao incluir valores reais.

---

## 7. REGRAS CRITICAS DE DESENVOLVIMENTO

### DO (Faca)
1. **SEMPRE** rode `pnpm build` antes de considerar uma tarefa concluida
2. **SEMPRE** teste ambos os idiomas (EN e PT)
3. **SEMPRE** crie paginas dentro de `app/[locale]/`
4. **SEMPRE** use `useTranslations()` para qualquer texto visivel ao usuario
5. **SEMPRE** use os hooks de `@/i18n/navigation` ao invez de `next/navigation`
6. **SEMPRE** adicione traducoes em AMBOS os JSONs (en.json E pt.json)
7. **SEMPRE** siga o padrao de `localePrefix: "as-needed"` (EN sem prefixo, PT com `/pt`)
8. **SEMPRE** use `motion.div` com `useInView` para animacoes de entrada
9. **SEMPRE** mantenha touch targets >= 44x44px

### DON'T (Nao faca)
1. **NUNCA** coloque `<html>` ou `<body>` no root layout (`app/layout.tsx`)
2. **NUNCA** use `next/navigation` diretamente — use `@/i18n/navigation`
3. **NUNCA** hardcode strings de UI — sempre use traducoes
4. **NUNCA** ignore erros de TypeScript no build
5. **NUNCA** faca deploy sem a aprovacao explicita do usuario
6. **NUNCA** modifique `.env.local` ou exponha chaves de API
7. **NUNCA** remova Analytics ou SpeedInsights do layout
8. **NUNCA** altere o middleware.ts sem testar a deteccao de locale
9. **NUNCA** use animacoes pesadas de JS no mobile (CSS preferred)

---

## 8. GIT E DEPLOY

### Estrategia de Tags

| Tag | Sprint | Status |
|-----|--------|--------|
| `v0.1.0-baseline` | Baseline | ✅ |
| `v0.2.0-sprint-0` | Sprint 0 | ✅ |
| `v0.3.0-sprint-1` | Sprint 1 | ✅ |
| `v0.4.0-sprint-2` | Sprint 2 | 🔄 Em andamento |
| `v0.5.0-sprint-3` | Sprint 3 | ⏳ |
| `v0.6.0-sprint-4` | Sprint 4 | ⏳ |
| `v0.7.0-sprint-5` | Sprint 5 | ⏳ |
| `v0.8.0-sprint-6` | Sprint 6 | ⏳ |
| `v1.0.0` | Sprint 7 (Launch) | ⏳ |

### Processo de Deploy

1. Finalizar desenvolvimento da sprint
2. Rodar `pnpm build` sem erros
3. Testar visualmente no localhost (EN + PT)
4. Apresentar ao usuario para teste
5. **SOMENTE** deployar em producao com OK explicito do usuario
6. Criar git tag
7. Push para Vercel (deploy automatico via git push)

### Debitos Tecnicos Conhecidos

1. **Email templates** (Sprint 1): Os templates de email estao usando HTML inline no route.ts ao inves de componentes React Email separados. O usuario planejou resolver isso no final de semana.
2. **Sitemap**: Atualmente so tem a homepage. Precisa incluir `/pt` e todas as paginas futuras.
3. **Portfolio images**: Usando imagens placeholder. Precisam ser substituidas por imagens reais.
4. **Localized URLs (Sprint 2 opcional)**: URLs como `/pt/ecossistema` nao foram implementadas ainda. O padrao atual usa o mesmo path em ambos idiomas. Isso pode ser implementado na Sprint 3 quando as service pages forem criadas.

---

## 9. COMO COMECAR UMA NOVA SPRINT

### Checklist Pre-Sprint

```bash
# 1. Garantir que o build esta limpo
pnpm build

# 2. Verificar status do git
git status
git log --oneline -5

# 3. Ler a documentacao da sprint
cat docs/sprints/SPRINT-X.md

# 4. Entender dependencias
# Sprint 3 depende de: Sprint 2 (i18n completo)
# Sprint 4 depende de: Sprint 2 + Sprint 3
# Sprint 5 depende de: Sprint 2 + Sprint 3
# Sprint 6 depende de: Sprint 2
# Sprint 7 depende de: Todas as anteriores
```

### Checklist Pos-Sprint

```bash
# 1. Build limpo
pnpm build

# 2. Testar EN e PT
pnpm dev
# Navegar por todas as paginas novas em ambos idiomas

# 3. Testar mobile (Chrome DevTools responsive)
# iPhone SE (375px), iPhone 14 (390px), Galaxy S23 (360px)

# 4. Apresentar ao usuario
# "O desenvolvimento da Sprint X esta concluido. Aqui esta o que foi feito: [lista]"
# "Voce pode testar em http://localhost:3000"
# "Posso fazer o deploy em producao?"

# 5. Apos aprovacao
git tag -a vX.X.X-sprint-X -m "Sprint X: [descricao]"
```

---

## 10. MAPA DE TRADUCOES (messages/*.json)

### Namespaces Atuais

| Namespace | Chaves | Descricao |
|-----------|--------|-----------|
| `metadata` | 4 | Title, description, OG title/desc |
| `navigation` | 5 | Menu items + CTA |
| `hero` | 12 | Headlines, subheadline, CTAs, stats |
| `services` | 30 | Tag, desc, 5 servicos x (nome + desc + 4 bullets) + poweredByAi |
| `aiLab` | 14 | Tag, titles, desc, 6 capabilities |
| `portfolio` | 27 | Title, 6 filtros, 6 projetos x (title + desc + metric + metricLabel), viewCase, loadMore |
| `insights` | 13 | Title, desc, viewAll, 3 artigos x (tag + title + date + readTime) |
| `cta` | 27 | Title, desc, form labels, placeholders, feedback, businessTypes (6), revenueRanges (5) |
| `footer` | 21 | Tagline, newsletter, ecosystem links, company links, contact, copyright |
| `common` | 4 | learnMore, getStarted, contactUs, backToTop |

### Ao Adicionar Novas Traducoes

1. Adicionar a chave em `messages/en.json`
2. Adicionar a traducao em `messages/pt.json`
3. Usar `t("chave")` no componente
4. Para chaves aninhadas: `t("businessTypes.homeServices")`
5. Manter traducoes culturalmente adequadas (PT-BR para brasileiros nos EUA, mistura com termos tech em ingles e aceitavel)

---

## 11. APIs EXISTENTES

### POST /api/contact

**Request**:
```json
{
  "name": "string (min 2)",
  "email": "string (email valido)",
  "businessType": "string",
  "revenue": "string (opcional)",
  "goals": "string (max 1000, opcional)"
}
```

**Response (sucesso)**:
```json
{
  "success": true,
  "message": "...",
  "whatsappUrl": "https://wa.me/13055550123?text=..."
}
```

**Rate limit**: 5 requests/IP/hora

### POST /api/newsletter

**Request**:
```json
{
  "email": "string (email valido)"
}
```

**Response (sucesso)**:
```json
{
  "success": true,
  "message": "..."
}
```

**Rate limit**: 3 requests/IP/hora

---

## 12. DEPENDENCIAS SHADCN/UI INSTALADAS

O projeto ja tem 65+ componentes shadcn/ui em `components/ui/`. Para adicionar novos:

```bash
pnpx shadcn@latest add [component-name]
```

Componentes mais usados no projeto: `button`, `input`, `select`, `form`, `dialog`, `accordion`, `tabs`, `card`.

Config em `components.json`:
- Style: "default"
- Alias: `@/components`, `@/lib/utils`

---

## 13. RESUMO EXECUTIVO PARA A IA

Voce esta continuando o desenvolvimento de um website Next.js 16 bilingue (EN/PT) para a agencia Dkapture. O projeto usa App Router, next-intl para i18n, Tailwind + shadcn/ui para styling, e Framer Motion para animacoes.

**Sprint 2 esta ~90% concluida.** Falta:
1. Traduzir o footer (chaves ja existem nos JSONs)
2. Atualizar o sitemap para bilingue
3. Rodar build e testar visualmente

**Proxima sprint**: Sprint 3 (Service Pages) — criar 5 paginas de servico com template reutilizavel.

**Regra de ouro do usuario**: NAO QUEBRE O SITE. Teste tudo, apresente para o usuario validar, e so faca deploy com aprovacao explicita.

Documentacao detalhada de cada sprint esta em `docs/sprints/SPRINT-X.md`.
