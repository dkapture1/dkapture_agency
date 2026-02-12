# Sprint 7 — Polish, Performance, Mobile QA & Launch

**Duration:** 3-4 days
**Git Tag:** `v1.0.0`
**Depends on:** All previous sprints
**Status:** Pending

## Objective

Final polish pass for production launch. Performance optimization, accessibility audit, extensive mobile testing, custom error pages, domain configuration, and analytics setup.

## Tasks

### 1. Performance Optimization
- [ ] Lighthouse audit on ALL pages (target: >90 on all metrics)
- [ ] Optimize all images with `next/image`:
  - WebP format
  - Proper `sizes` attribute
  - Lazy loading for below-fold images
  - Priority loading for hero images
  - Blur placeholder for LCP images
- [ ] Bundle analysis (`@next/bundle-analyzer`)
- [ ] Remove unused dependencies
- [ ] Verify code splitting works correctly
- [ ] Check and optimize font loading (display: swap)

### 2. Core Web Vitals Targets (Mobile)
- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay): < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1
- [ ] **INP** (Interaction to Next Paint): < 200ms
- [ ] Test with Chrome DevTools Performance tab
- [ ] Test with PageSpeed Insights

### 3. Accessibility Audit (WCAG 2.1 AA)
- [ ] Color contrast ratios (especially gray text on dark backgrounds)
- [ ] Keyboard navigation works on all interactive elements
- [ ] Screen reader compatibility (aria labels, roles)
- [ ] Focus indicators visible on all focusable elements
- [ ] Image alt texts on all images
- [ ] Form labels properly associated with inputs
- [ ] Skip navigation link

### 4. Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Samsung Internet (Android)

### 5. Mobile Testing (CRITICAL)
- [ ] **Small screens:** iPhone SE (375px)
- [ ] **Standard:** iPhone 14/15 (390px) — test notch/Dynamic Island
- [ ] **Large:** iPhone 15 Pro Max (430px)
- [ ] **Android Standard:** Samsung Galaxy S23 (360px)
- [ ] **Android Large:** Pixel 7 (412px)
- [ ] **Tablet:** iPad (768px)
- [ ] **Test scenarios:**
  - 3G slow connection (Chrome DevTools throttling)
  - Landscape orientation on all pages
  - With keyboard open (all forms)
  - Safe areas (notch, home indicator)
  - Pull-to-refresh doesn't break layout
  - Scroll bounce effects look correct
  - Touch targets are all >= 44x44px

### 6. Custom Error Pages
- [ ] `app/not-found.tsx` — branded 404 page with:
  - Dkapture branding
  - "Page not found" message (bilingual)
  - Link to homepage
  - Search bar or popular pages
- [ ] `app/error.tsx` — branded 500 page with:
  - Error boundary component
  - "Something went wrong" message
  - Retry button
  - Contact link
- [ ] `app/global-error.tsx` — global fallback

### 7. Replace Placeholder Content
- [ ] Audit all pages for placeholder text
- [ ] Replace with real content where available
- [ ] Flag remaining placeholders with `TODO` comments
- [ ] Ensure all portfolio images are real (or clearly marked as placeholders)

### 8. Domain & SSL Configuration (Vercel + Cloudflare)
- [ ] In Cloudflare DNS:
  - CNAME record: `@` -> `cname.vercel-dns.com`
  - Proxy: **DNS Only** (gray cloud)
  - SSL mode: `Full (Strict)` if using proxy, any if DNS Only
- [ ] In Vercel Dashboard:
  - Add custom domain in Settings > Domains
  - Wait for green checkmark
  - Add both `dkapture.com` and `www.dkapture.com`
- [ ] Verify with `curl -I https://dkapture.com`
- [ ] Verify SSL certificate (should be Let's Encrypt or Cloudflare)

### 9. Analytics & Tracking
- [ ] Verify Vercel Analytics is working (added in Sprint 0)
- [ ] Setup Google Analytics 4 (GA4):
  - Create GA4 property
  - Add measurement ID to env vars
  - Install `@next/third-parties` for Google Tag
- [ ] Setup Google Search Console:
  - Verify domain ownership
  - Submit sitemap
  - Check for crawl errors
- [ ] Setup conversion tracking:
  - Form submission events
  - CTA button clicks
  - Phone/WhatsApp clicks
  - Newsletter signups

### 10. Schema Markup (Final)
- [ ] `Organization` schema on all pages
- [ ] `LocalBusiness` schema on homepage (Miami + Orlando)
- [ ] `WebSite` schema with search action
- [ ] Verify all existing schemas (Article, Service, etc.)
- [ ] Test with Google Rich Results Test

### 11. End-to-End Testing
- [ ] Test CTA form submission (desktop + mobile)
- [ ] Test newsletter signup (desktop + mobile)
- [ ] Test WhatsApp link opens correctly
- [ ] Test all navigation links
- [ ] Test language toggle on every page
- [ ] Test all internal links (no 404s)
- [ ] Test external links open in new tab

### 12. PWA & Icons
- [ ] Favicon (16x16, 32x32) in `/public/`
- [ ] Apple Touch Icon (180x180) in `/public/`
- [ ] `manifest.json` for "Add to Home Screen":
  ```json
  {
    "name": "Dkapture",
    "short_name": "Dkapture",
    "theme_color": "#FF4500",
    "background_color": "#000000",
    "display": "standalone",
    "start_url": "/",
    "icons": [...]
  }
  ```
- [ ] Open Graph default image (1200x630)
- [ ] Twitter Card image

### 13. Pre-Launch Checklist
- [ ] Remove any `console.log` statements
- [ ] Remove any `TODO` comments (or document them)
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Verify all environment variables are set in Vercel
- [ ] Test deployment preview on Vercel
- [ ] Test production build locally: `pnpm build && pnpm start`

## Final Quality Gates

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance (Mobile) | > 90 | Chrome DevTools |
| Lighthouse Accessibility | > 90 | Chrome DevTools |
| Lighthouse SEO | > 90 | Chrome DevTools |
| Lighthouse Best Practices | > 90 | Chrome DevTools |
| LCP (Mobile) | < 2.5s | PageSpeed Insights |
| CLS (Mobile) | < 0.1 | PageSpeed Insights |
| INP (Mobile) | < 200ms | PageSpeed Insights |
| HTML Validation | Pass | W3C Validator |
| Rich Results | Pass | Google Rich Results Test |
| Broken Links | 0 | Manual or automated check |

## Verification

```bash
pnpm build          # Clean build, no errors
pnpm start          # Test production server locally
# Run Lighthouse on every page
# Test all forms
# Test language toggle
# Verify domain works: curl -I https://dkapture.com
# Check Google Search Console for issues
# Verify all schemas with Rich Results Test
```

## Post-Launch Monitoring (First Week)

- [ ] Monitor Vercel Analytics for traffic
- [ ] Check Google Search Console for crawl errors
- [ ] Monitor form submissions (are they arriving?)
- [ ] Check Core Web Vitals in Search Console
- [ ] Monitor 404 errors in Vercel logs
- [ ] Test real-world mobile experience (ask 3 people to test)

## Final Git Tag

```bash
git tag -a v1.0.0 -m "Production launch: Full bilingual website with AI Lab, portfolio, blog, and all integrations"
git push origin v1.0.0
```

## Rollback

```bash
git checkout v0.8.0-sprint-6
```
