# Sprint 4 — Portfolio & Case Studies

**Duration:** 4-5 days
**Git Tag:** `v0.6.0-sprint-4`
**Depends on:** Sprint 2 (i18n), Sprint 3 (service pages for linking)
**Status:** Pending

## Objective

Build detailed case study pages that serve as social proof. Each case shows the problem, the integrated Dkapture approach, and measurable results. Cases are segmented by industry to help visitors identify with their niche.

## New Files to Create

| File | Purpose |
|------|---------|
| `app/[locale]/portfolio/page.tsx` | Portfolio grid with filters |
| `app/[locale]/portfolio/[slug]/page.tsx` | Individual case study |
| `components/sections/case-hero.tsx` | Full-width hero with image |
| `components/sections/case-stats.tsx` | Quick metrics bar |
| `components/sections/case-challenge.tsx` | Challenge + client quote |
| `components/sections/case-approach.tsx` | Step-by-step solution |
| `components/sections/case-gallery.tsx` | Image/video gallery with lightbox |
| `components/sections/case-results.tsx` | Animated counters, before/after |
| `components/sections/case-services.tsx` | Services used (links) |
| `components/sections/case-navigation.tsx` | Prev/next case navigation |
| `content/portfolio/` | Case study data files |

## Case Study Template Structure

```
1. Case Hero
   - Full-width project image with dark gradient overlay (60% black from bottom)
   - Industry tag badge (orange pill)
   - Project title in large white text
   - Client name in gray

2. Quick Stats Bar
   - 4 metrics in horizontal bar:
     - Industry icon + category
     - Calendar icon + duration
     - Tools icon + services used
     - Chart icon + key metric (e.g., "+340% ROAS")
   - Dark card background, orange icons

3. The Challenge
   - Client's initial situation narrative
   - Pull quote from client in large italic text with orange quotation marks
   - Problem bullets with red/gray icons

4. Our Approach
   - Step-by-step solution narrative
   - Icons representing each ecosystem service used
   - Visual diagram of the integrated strategy
   - Timeline of implementation

5. Visual Showcase
   - Image/video gallery in masonry grid
   - Lightbox on click (touch-friendly on mobile)
   - Mix of: campaign screenshots, video thumbnails, before/after
   - Dark background with subtle orange glow accents

6. The Results
   - Large animated counters (Framer Motion):
     - Before: X -> After: Y format
     - Key metrics in orange numbers
   - ROI calculation displayed prominently
   - Client testimonial with photo, name, title

7. Services Used
   - Horizontal scroll of service cards
   - Links to individual service pages (Sprint 3)
   - Orange hover effect

8. Next Project Navigation
   - Prev/next case study navigation
   - Preview image with title
   - Arrow navigation
   - Swipe gesture support on mobile
```

## Case Study Data Structure

```typescript
interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: 'home-services' | 'gastronomy' | 'real-estate' | 'events' | 'beauty-wellness';
  duration: string;
  servicesUsed: string[];
  heroImage: string;
  challenge: {
    description: string;
    clientQuote: string;
    clientName: string;
    clientTitle: string;
    clientPhoto?: string;
    painPoints: string[];
  };
  approach: {
    steps: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  gallery: {
    src: string;
    alt: string;
    type: 'image' | 'video';
  }[];
  results: {
    metrics: {
      label: string;
      before: string;
      after: string;
    }[];
    testimonial: {
      quote: string;
      name: string;
      title: string;
      photo?: string;
    };
  };
  keyMetric: {
    value: string;
    label: string;
  };
}
```

## Portfolio Page Features

- [ ] Filterable grid by industry: All, Home Services, Gastronomy, Real Estate, Events, Beauty & Wellness
- [ ] Active filter tab with #FF4500 background
- [ ] Bento/masonry grid layout (mixed card sizes)
- [ ] Each card shows: thumbnail, industry badge, title, key metric
- [ ] Hover: image zoom, orange border, description overlay
- [ ] Smooth layout transition animations (Framer Motion)
- [ ] "Load More" button or infinite scroll

## Content Strategy

Since content is partially available:
- [ ] Create template data structure that's easy to fill with real data later
- [ ] Use realistic placeholder content that matches actual Dkapture work
- [ ] Flag clearly in code where real content needs to be inserted
- [ ] Support for both real photos and placeholder images

## Mobile-Specific Requirements

- [ ] Portfolio grid: single column with full-width cards on mobile
- [ ] Gallery: swipe gestures with touch-friendly lightbox
- [ ] Metrics/counters visible without horizontal scroll
- [ ] Prev/next navigation with swipe between cases
- [ ] Stats bar: 2x2 grid on mobile (instead of 4 horizontal)

## Tasks

### 1. Create Case Study Data Layer
- [ ] Create `content/portfolio/` with data for 6 case studies
- [ ] Include bilingual content via i18n messages
- [ ] Create TypeScript interfaces
- [ ] Add placeholder images if real ones aren't ready

### 2. Build Section Components
- [ ] `case-hero.tsx` — full-width image hero
- [ ] `case-stats.tsx` — 4-metric bar
- [ ] `case-challenge.tsx` — narrative + quote
- [ ] `case-approach.tsx` — step-by-step with icons
- [ ] `case-gallery.tsx` — masonry grid with lightbox
- [ ] `case-results.tsx` — animated counters + testimonial
- [ ] `case-services.tsx` — linked service cards
- [ ] `case-navigation.tsx` — prev/next with preview

### 3. Build Pages
- [ ] Portfolio grid page with filtering
- [ ] Dynamic case study page
- [ ] `generateStaticParams()` for all cases
- [ ] Per-page SEO metadata

### 4. Update Homepage Portfolio Section
- [ ] Link "View Case" buttons to actual case study pages
- [ ] Ensure filter categories match

### 5. SEO
- [ ] JSON-LD CaseStudy/CreativeWork schema
- [ ] Unique meta per case
- [ ] Image alt tags
- [ ] Breadcrumbs

## Verification

```bash
pnpm build
# Visit /en/portfolio — grid loads with filters
# Click filter tabs — smooth transitions
# Click a case — full case study loads
# Verify animated counters work
# Test gallery lightbox (desktop and mobile)
# Test swipe navigation between cases on mobile
# Check all service links work
# Verify SEO meta tags
```

## Rollback

```bash
git checkout v0.5.0-sprint-3
```
