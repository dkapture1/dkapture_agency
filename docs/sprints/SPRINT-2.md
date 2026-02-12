# Sprint 2 — Full Internationalization (EN/PT)

**Duration:** 4-5 days
**Git Tag:** `v0.4.0-sprint-2`
**Depends on:** Sprint 0 (i18n base), Sprint 1 (form labels)
**Status:** Pending

## Objective

Make the entire website fully bilingual (English/Portuguese) with automatic language detection, localized URLs, and bilingual SEO. This is the core competitive advantage for serving Brazilian entrepreneurs in the USA.

## New Files to Create

| File | Purpose |
|------|---------|
| `i18n/request.ts` | next-intl request config |
| `i18n/routing.ts` | Locale routing config |
| `messages/en.json` | All English strings |
| `messages/pt.json` | All Portuguese strings |
| `app/[locale]/layout.tsx` | Localized root layout |
| `app/[locale]/page.tsx` | Localized homepage |
| `middleware.ts` | Locale detection & redirect |

## Files to Modify

| File | Changes |
|------|---------|
| `components/language-toggle.tsx` | Connect to next-intl router |
| `components/navigation.tsx` | Use `useTranslations()` |
| `components/hero-section.tsx` | Use `useTranslations()` |
| `components/services-section.tsx` | Use `useTranslations()` |
| `components/portfolio-section.tsx` | Use `useTranslations()` |
| `components/cta-section.tsx` | Use `useTranslations()` |
| `components/footer.tsx` | Use `useTranslations()` |
| `components/ai-lab-section.tsx` | Use `useTranslations()` |
| `components/insights-section.tsx` | Use `useTranslations()` |

## Tasks

### 1. Configure next-intl
- [ ] Create `i18n/request.ts` with locale config
- [ ] Create `i18n/routing.ts` with pathnames mapping
- [ ] Set default locale: `en`
- [ ] Supported locales: `['en', 'pt']`

### 2. Restructure App Routes
- [ ] Move `app/page.tsx` to `app/[locale]/page.tsx`
- [ ] Move `app/layout.tsx` content to `app/[locale]/layout.tsx`
- [ ] Keep root `app/layout.tsx` minimal (just html/body)
- [ ] Update all future routes to be under `[locale]/`

### 3. Create Middleware
- [ ] Create `middleware.ts` in project root
- [ ] Detect browser language (`Accept-Language` header)
- [ ] Redirect to appropriate locale
- [ ] Persist preference in cookie
- [ ] Handle locale-less URLs (redirect `/` to `/en` or `/pt`)

### 4. Create Message Files
- [ ] `messages/en.json` — structured by section:
  ```json
  {
    "navigation": { ... },
    "hero": { ... },
    "services": { ... },
    "portfolio": { ... },
    "aiLab": { ... },
    "cta": { ... },
    "footer": { ... },
    "common": { ... }
  }
  ```
- [ ] `messages/pt.json` — complete Portuguese translation
- [ ] Review translations for cultural accuracy (not just literal)

### 5. Update All Components
- [ ] Replace ALL hardcoded strings with `useTranslations()` calls
- [ ] Handle pluralization where needed
- [ ] Handle formatted numbers/dates per locale
- [ ] Test each component in both languages

### 6. Update Language Toggle
- [ ] Connect to `useRouter()` from next-intl
- [ ] Switch locale and preserve current page
- [ ] Persist language preference
- [ ] Show active language visually

### 7. Bilingual SEO
- [ ] Add `<link rel="alternate" hreflang="en">` and `hreflang="pt"` tags
- [ ] Add `hreflang="x-default"` pointing to English
- [ ] Localized meta titles and descriptions
- [ ] Localized Open Graph tags
- [ ] Update sitemap to include both language versions

### 8. Localized URLs (Optional Enhancement)
- [ ] `/en/ecosystem` / `/pt/ecossistema`
- [ ] `/en/portfolio` / `/pt/portfolio`
- [ ] `/en/ai-lab` / `/pt/laboratorio-ia`
- [ ] `/en/insights` / `/pt/insights`
- [ ] `/en/start` / `/pt/comecar`

## Translation Guidelines

- Portuguese should feel natural for Brazilians in the USA
- Mix of PT-BR and English tech terms is acceptable (e.g., "Marketing Digital" not "Mercadologia")
- CTAs should be action-oriented in both languages
- Numbers and currency: always USD format

## Verification

```bash
pnpm build
# Visit /en — English version loads
# Visit /pt — Portuguese version loads
# Visit / — redirects based on browser language
# Toggle language — preserves current page
# Check meta tags in both languages
# Verify hreflang tags in page source
# Test on mobile (toggle works correctly)
```

## Rollback

```bash
git checkout v0.3.0-sprint-1
```
