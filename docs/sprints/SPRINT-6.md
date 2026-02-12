# Sprint 6 — Blog/Insights & SEO

**Duration:** 4-5 days
**Git Tag:** `v0.8.0-sprint-6`
**Depends on:** Sprint 2 (i18n)
**Status:** Pending

## Objective

Build a bilingual blog (Insights) that captures organic traffic, establishes Dkapture as a thought leader, and educates Brazilian entrepreneurs about AI-powered marketing. Content is managed via MDX for easy authoring.

## New Files to Create

| File | Purpose |
|------|---------|
| `app/[locale]/insights/page.tsx` | Blog listing page |
| `app/[locale]/insights/[slug]/page.tsx` | Individual article |
| `components/sections/blog-hero.tsx` | Blog listing hero |
| `components/sections/blog-card.tsx` | Article preview card |
| `components/sections/blog-sidebar.tsx` | Categories, recent posts, newsletter |
| `components/sections/blog-content.tsx` | MDX renderer with custom components |
| `components/ui/breadcrumbs.tsx` | Breadcrumb navigation |
| `components/ui/share-buttons.tsx` | Social share buttons |
| `components/ui/reading-progress.tsx` | Reading progress bar |
| `lib/mdx.ts` | MDX parser and utilities |
| `content/blog/` | MDX blog posts directory |
| `app/sitemap.ts` | Dynamic sitemap |
| `app/[locale]/insights/rss.xml/route.ts` | RSS feed |

## Blog Architecture

### Listing Page (`/insights`)
- Hero with "Insights" title and search bar
- Category filters: All, Marketing, AI, SEO, Business, Video
- Grid of article cards (2 columns desktop, 1 mobile)
- Each card: featured image, category badge, title, excerpt, date, read time
- Pagination or "Load More"
- Sidebar: categories, recent posts, newsletter signup

### Article Page (`/insights/[slug]`)
- Reading progress bar at top (orange, fixed)
- Breadcrumbs: Home > Insights > Article Title
- Article header: title, author, date, read time, category
- Featured image (full width)
- MDX content with custom styled components
- Share buttons (Twitter, LinkedIn, WhatsApp, Copy Link)
- Author bio at bottom
- Related articles (3 cards)
- CTA: "Ready to implement these strategies?"

### MDX Custom Components
Custom styled components available in MDX:
- `<Callout>` — highlighted tip/warning box
- `<StatCard>` — inline stat with large number
- `<ComparisonTable>` — styled comparison
- `<CTABanner>` — inline CTA with button
- `<VideoEmbed>` — responsive video player
- `<ImageGallery>` — multiple images in grid
- Code blocks with syntax highlighting

## Initial Articles (5)

### 1. "How Brazilian Entrepreneurs Can Win the American Market with AI"
- **Category:** AI, Business
- **Target keywords:** "brazilian business usa", "marketing for brazilian entrepreneurs"
- **Audience:** New immigrants starting businesses
- **Angle:** Step-by-step guide using AI tools

### 2. "Google Ads for Home Services in Florida: Complete Guide"
- **Category:** Marketing, SEO
- **Target keywords:** "google ads home services florida", "contractor marketing"
- **Audience:** Home service business owners
- **Angle:** Practical guide with budget recommendations

### 3. "Why Your Business Needs Bilingual Marketing in 2026"
- **Category:** Marketing, Business
- **Target keywords:** "bilingual marketing", "spanish portuguese marketing usa"
- **Audience:** Any bilingual business owner
- **Angle:** Data-driven case for bilingual approach

### 4. "ROI of Professional Video in Facebook Ads"
- **Category:** Video, Marketing
- **Target keywords:** "video ads roi", "facebook video marketing"
- **Audience:** Business owners considering video
- **Angle:** Before/after data comparisons

### 5. "5 AI Automations Every Small Business Owner Should Use"
- **Category:** AI, Business
- **Target keywords:** "ai automation small business", "business automation tools"
- **Audience:** Tech-curious business owners
- **Angle:** Practical, immediately actionable

## MDX Blog Post Structure

```mdx
---
title: "Article Title"
titlePt: "Titulo em Portugues"
slug: "article-slug"
slugPt: "artigo-slug"
date: "2026-02-15"
author: "Dkapture Team"
category: "marketing"
tags: ["ai", "google-ads", "performance"]
excerpt: "Brief description for cards and SEO"
excerptPt: "Descricao breve em portugues"
featuredImage: "/images/blog/article-slug.jpg"
readTime: 8
---

Article content in MDX...
```

## SEO Implementation

### Per-Page SEO
- [ ] Unique `<title>` with keyword + brand: "Article Title | Dkapture Insights"
- [ ] Unique `<meta description>` (150-160 chars)
- [ ] Open Graph tags (title, description, image 1200x630)
- [ ] Twitter Card tags
- [ ] Canonical URL
- [ ] `hreflang` for both language versions

### Structured Data (JSON-LD)
- [ ] `Article` schema on blog posts
- [ ] `BlogPosting` schema
- [ ] `BreadcrumbList` schema
- [ ] `Organization` schema (site-wide)
- [ ] `LocalBusiness` schema (homepage)

### Technical SEO
- [ ] Dynamic `sitemap.xml` including all pages and blog posts
- [ ] `robots.txt` with sitemap reference
- [ ] RSS feed for blog
- [ ] Canonical URLs on all pages
- [ ] Image alt tags everywhere
- [ ] Internal linking strategy (blog <> services <> portfolio)

## Tasks

### 1. MDX Setup
- [ ] Install `@next/mdx`, `gray-matter`, `next-mdx-remote` or equivalent
- [ ] Create `lib/mdx.ts` with parsing utilities
- [ ] Create MDX custom components
- [ ] Setup syntax highlighting for code blocks

### 2. Build Blog Listing Page
- [ ] Category filtering
- [ ] Article cards with hover effects
- [ ] Pagination
- [ ] Search functionality (client-side)
- [ ] Sidebar with newsletter

### 3. Build Article Page
- [ ] MDX content renderer
- [ ] Reading progress bar
- [ ] Share buttons
- [ ] Related articles
- [ ] Author bio
- [ ] Bottom CTA

### 4. Write Initial Articles
- [ ] Write 5 articles in MDX (EN + PT)
- [ ] Create featured images (or placeholders)
- [ ] Internal links between articles and service pages

### 5. SEO Infrastructure
- [ ] Dynamic sitemap (`app/sitemap.ts`)
- [ ] RSS feed route
- [ ] JSON-LD schemas
- [ ] Update `robots.txt`

### 6. Update Homepage Insights Section
- [ ] Link preview cards to actual blog posts
- [ ] Show latest 3 posts dynamically

## Verification

```bash
pnpm build
# Visit /en/insights — listing loads with articles
# Visit /pt/insights — PT version loads
# Click article — full content renders
# Verify MDX custom components render correctly
# Test category filtering
# Test share buttons
# Test reading progress bar
# Validate sitemap.xml (visit /sitemap.xml)
# Validate RSS feed
# Check JSON-LD with Google Rich Results Test
# Test on mobile
```

## Rollback

```bash
git checkout v0.7.0-sprint-5
```
