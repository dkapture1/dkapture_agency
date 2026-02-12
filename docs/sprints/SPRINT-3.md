# Sprint 3 — Service Pages

**Duration:** 5-6 days
**Git Tag:** `v0.5.0-sprint-3`
**Depends on:** Sprint 2 (i18n)
**Status:** Pending

## Objective

Create 5 individual service pages that convert visitors into leads and rank on Google. Each page follows a consistent template with sections optimized for both user experience and SEO.

## Services to Build

| # | Service | URL (EN) | URL (PT) |
|---|---------|----------|----------|
| 1 | Brand Identity & Image | `/en/ecosystem/brand-identity` | `/pt/ecossistema/identidade-visual` |
| 2 | Digital Platforms | `/en/ecosystem/digital-platforms` | `/pt/ecossistema/plataformas-digitais` |
| 3 | Visual Storytelling | `/en/ecosystem/visual-storytelling` | `/pt/ecossistema/storytelling-visual` |
| 4 | Growth & Performance | `/en/ecosystem/growth-performance` | `/pt/ecossistema/crescimento-performance` |
| 5 | AI Intelligence Lab | `/en/ecosystem/ai-lab` | `/pt/ecossistema/laboratorio-ia` |

## New Files to Create

| File | Purpose |
|------|---------|
| `app/[locale]/ecosystem/page.tsx` | Ecosystem overview page |
| `app/[locale]/ecosystem/[service]/page.tsx` | Dynamic service page |
| `components/sections/service-hero.tsx` | Service hero with gradient title |
| `components/sections/problem-solution.tsx` | Challenge vs Solution split |
| `components/sections/whats-included.tsx` | Expandable accordion |
| `components/sections/pricing-preview.tsx` | 3-tier pricing cards |
| `components/sections/process-timeline.tsx` | Horizontal/vertical stepper |
| `components/sections/faq-accordion.tsx` | FAQ with smooth animations |
| `components/sections/service-cta.tsx` | Bottom CTA section |
| `components/sections/related-case.tsx` | Related case study card |
| `content/services/brand-identity.ts` | Service data |
| `content/services/digital-platforms.ts` | Service data |
| `content/services/visual-storytelling.ts` | Service data |
| `content/services/growth-performance.ts` | Service data |
| `content/services/ai-lab.ts` | Service data |
| `content/services/index.ts` | Service data aggregator |

## Page Template Structure

Each service page follows this structure:

```
1. Service Hero
   - Service name with orange gradient text
   - Brief description
   - "Get Started" CTA button
   - Radial orange glow background

2. Problem vs Solution
   - Two-column split layout
   - Left: "The Challenge" — pain points with red X icons
   - Right: "Our Solution" — solutions with orange checkmarks
   - Vertical orange gradient divider

3. What's Included
   - Expandable accordion items (3-6 items per service)
   - Dark card, white/5 border, orange accent on expand
   - Each item: icon, title, description, features list

4. Pricing Preview
   - 3 tier cards: Starter / Growth / Enterprise
   - "Most Popular" badge on Growth tier
   - Feature comparison with checkmarks
   - CTA button on each tier

5. Process Timeline
   - Steps: Audit > Strategy > Launch > Optimize > Scale
   - Horizontal on desktop, vertical on mobile
   - Active step highlighted in orange
   - Animated connecting line

6. Related Case Study
   - Featured success story card
   - Image, industry tag, key metric, link

7. FAQ Accordion
   - 5-6 common questions per service
   - Smooth expand/collapse with Framer Motion

8. Service CTA
   - "Ready to [action]?" headline
   - Book strategy call button
   - Reuses CTA patterns from homepage
```

## Service Data Structure

```typescript
interface Service {
  slug: string;
  slugPt: string;
  icon: string;
  challenges: string[];
  solutions: string[];
  included: {
    title: string;
    description: string;
    features: string[];
  }[];
  pricing: {
    name: string;
    price: string;
    period: string;
    features: string[];
    popular?: boolean;
  }[];
  process: {
    step: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedCase?: string; // slug of related portfolio item
}
```

## Mobile-Specific Requirements

- [ ] Pricing cards: horizontal swipe carousel on mobile (not stacked)
- [ ] Process timeline: vertical layout on mobile (horizontal only on desktop)
- [ ] Accordion FAQs: generous touch areas (min 48px tap targets)
- [ ] Service hero: adapted aspect ratio for mobile
- [ ] Problem/Solution: stacked vertically on mobile

## Pricing Data (from strategy document)

### Growth & Performance
| Tier | Price | Features |
|------|-------|----------|
| Starter | $1,500/mo | Google OR Meta Ads, Monthly Report, Basic CRM |
| Growth | $3,500/mo | Google + Meta, Weekly Reports, Full CRM, AI Optimization |
| Enterprise | Custom | Multi-channel, Dedicated Strategist, Custom Automations |

### Digital Platforms
| Tier | Price | Features |
|------|-------|----------|
| Essential | $5,000 | 5-page website, Mobile responsive, Basic SEO |
| Professional | $12,000 | 10+ pages, E-commerce, Advanced SEO, CMS |
| Enterprise | $25,000+ | Custom platform, API integrations, Multi-language |

*Note: Pricing for other services will be determined based on market benchmarks.*

## Tasks

### 1. Create Service Data Layer
- [ ] Create `content/services/` with data for all 5 services
- [ ] Include bilingual content (EN/PT) via i18n message files
- [ ] Create type definitions for service data

### 2. Build Section Components
- [ ] `service-hero.tsx` — reusable hero with gradient text
- [ ] `problem-solution.tsx` — split layout with icons
- [ ] `whats-included.tsx` — accordion with Framer Motion
- [ ] `pricing-preview.tsx` — 3-tier cards with swipe on mobile
- [ ] `process-timeline.tsx` — horizontal/vertical stepper
- [ ] `faq-accordion.tsx` — animated FAQ
- [ ] `service-cta.tsx` — bottom CTA
- [ ] `related-case.tsx` — case study preview card

### 3. Build Page Templates
- [ ] Create ecosystem overview page with all services listed
- [ ] Create dynamic `[service]` page with all sections
- [ ] Add `generateStaticParams()` for static generation
- [ ] Add per-page metadata (title, description, OG tags)

### 4. Update Navigation
- [ ] Update services links in navigation to point to service pages
- [ ] Add breadcrumbs component
- [ ] Update services section CTA links on homepage

### 5. SEO per Service Page
- [ ] Unique meta title and description
- [ ] JSON-LD ServiceOffering schema
- [ ] Breadcrumb schema
- [ ] Internal linking between related services

## Verification

```bash
pnpm build
# Visit /en/ecosystem — overview loads
# Visit /en/ecosystem/growth-performance — service page loads
# Visit /pt/ecossistema/crescimento-performance — PT version loads
# Test pricing carousel swipe on mobile
# Test timeline vertical layout on mobile
# Test all accordions open/close
# Verify SEO meta tags per page
# Check Lighthouse scores
```

## Rollback

```bash
git checkout v0.4.0-sprint-2
```
