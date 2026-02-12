# Sprint 0 — Critical Fixes & Foundation

**Duration:** 2-3 days
**Git Tag:** `v0.2.0-sprint-0`
**Status:** Pending

## Objective

Stabilize the codebase, fix known issues, and prepare the foundation for all future sprints (i18n base, analytics, SEO basics, mobile optimization).

## Issues to Fix

| Issue | File | Severity |
|-------|------|----------|
| AI Lab section not rendered | `app/page.tsx` | Critical |
| TypeScript errors ignored | `next.config.mjs` | Critical |
| Duplicate globals.css | `styles/globals.css` | Medium |
| No analytics | - | Medium |
| Basic SEO missing | `app/layout.tsx` | Medium |
| Mobile animations too heavy | `components/hero-section.tsx` | Medium |

## Tasks

### 1. Integrate AI Lab Section into Homepage
- [ ] Import `AILabSection` in `app/page.tsx`
- [ ] Place between `ServicesSection` and `PortfolioSection`
- [ ] Verify navigation link `#ai-lab` works

**Files:** `app/page.tsx`

### 2. Fix TypeScript Build
- [ ] Remove `ignoreBuildErrors: true` from `next.config.mjs`
- [ ] Run `pnpm build` and fix all TypeScript errors
- [ ] Ensure clean build

**Files:** `next.config.mjs`, various components

### 3. Remove Duplicate CSS
- [ ] Delete `/styles/globals.css` (duplicate of `/app/globals.css`)

**Files:** `styles/globals.css` (delete)

### 4. Install & Configure next-intl Base
- [ ] `pnpm add next-intl`
- [ ] Create `i18n.ts` config file
- [ ] Create `messages/en.json` (skeleton)
- [ ] Create `messages/pt.json` (skeleton)
- [ ] Create `middleware.ts` for locale detection
- [ ] Restructure to `app/[locale]/` (move current page.tsx)

**Files:** New files + restructure `app/`

### 5. Configure Vercel Analytics
- [ ] `pnpm add @vercel/analytics`
- [ ] Add `<Analytics />` component to root layout
- [ ] Verify data appears in Vercel dashboard

**Files:** `app/layout.tsx`

### 6. Add Basic SEO
- [ ] Add `robots.txt` in `public/`
- [ ] Add basic `sitemap.xml` or `app/sitemap.ts`
- [ ] Enhance metadata in layout: Open Graph, Twitter Cards
- [ ] Add canonical URLs

**Files:** `public/robots.txt`, `app/sitemap.ts`, `app/layout.tsx`

### 7. Improve SEO Metadata
- [ ] Add Open Graph image (1200x630)
- [ ] Add Twitter Card meta tags
- [ ] Add structured data (Organization schema)

**Files:** `app/layout.tsx`

### 8. Mobile-First Optimizations
- [ ] Disable/simplify parallax & floating elements on mobile using `useMediaQuery` or Framer Motion `reducedMotion`
- [ ] Ensure minimum 44x44px touch targets on all buttons and links
- [ ] Implement fluid typography with `clamp()` instead of fixed breakpoints
- [ ] Add `viewport-fit=cover` to viewport meta for safe areas (notch)
- [ ] Test and improve hamburger menu with swipe gestures

**Files:** `components/hero-section.tsx`, `components/navigation.tsx`, `app/globals.css`, `app/layout.tsx`

## Verification

```bash
pnpm build          # Must compile without errors
pnpm lint           # Must pass
# Navigate to /#ai-lab — section should be visible
# Check Vercel dashboard for analytics
# Run Lighthouse mobile audit
# Test on iPhone Safari and Android Chrome
```

## Rollback

```bash
git checkout v0.1.0-baseline
```
