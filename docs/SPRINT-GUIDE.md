# Dkapture Agency — Sprint Implementation Guide

## Overview

This document serves as the master guide for the Dkapture website evolution from a landing page (~85% complete) to a full-featured, bilingual, AI-first agency website.

**Current State:** Single-page landing with Hero, Services, Portfolio, Insights, CTA, Footer
**Target State:** Multi-page bilingual website with functional backend, SEO, and competitive differentiators

## Git Versioning Strategy

Each sprint creates a git tag for easy rollback:

| Tag | Description |
|-----|-------------|
| `v0.1.0-baseline` | Pre-sprint state (current landing page) |
| `v0.2.0-sprint-0` | After Sprint 0: Critical fixes & foundation |
| `v0.3.0-sprint-1` | After Sprint 1: Backend & conversion |
| `v0.4.0-sprint-2` | After Sprint 2: Full i18n (EN/PT) |
| `v0.5.0-sprint-3` | After Sprint 3: Service pages |
| `v0.6.0-sprint-4` | After Sprint 4: Portfolio & case studies |
| `v0.7.0-sprint-5` | After Sprint 5: AI Lab & differentiators |
| `v0.8.0-sprint-6` | After Sprint 6: Blog & SEO |
| `v1.0.0` | After Sprint 7: Production launch |

### Rollback Commands

```bash
# See all version tags
git tag -l "v*"

# Rollback to a specific sprint
git checkout v0.3.0-sprint-1

# Create a branch from a rollback point
git checkout -b fix/something v0.3.0-sprint-1

# Compare current state with a previous sprint
git diff v0.2.0-sprint-0..HEAD
```

## Sprint Index

| Sprint | Focus | Duration | Status |
|--------|-------|----------|--------|
| [Sprint 0](./sprints/SPRINT-0.md) | Critical Fixes & Foundation | 2-3 days | Pending |
| [Sprint 1](./sprints/SPRINT-1.md) | Backend & Conversion | 3-4 days | Pending |
| [Sprint 2](./sprints/SPRINT-2.md) | Full Internationalization | 4-5 days | Pending |
| [Sprint 3](./sprints/SPRINT-3.md) | Service Pages | 5-6 days | Pending |
| [Sprint 4](./sprints/SPRINT-4.md) | Portfolio & Case Studies | 4-5 days | Pending |
| [Sprint 5](./sprints/SPRINT-5.md) | AI Lab & Differentiators | 4-5 days | Pending |
| [Sprint 6](./sprints/SPRINT-6.md) | Blog & SEO | 4-5 days | Pending |
| [Sprint 7](./sprints/SPRINT-7.md) | Polish, Mobile QA & Launch | 3-4 days | Pending |

**Total Estimated: 6-8 weeks**

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 3.4 + shadcn/ui
- **Animations:** Framer Motion 11
- **Forms:** React Hook Form + Zod
- **Email:** Resend + React Email
- **i18n:** next-intl
- **Content:** MDX
- **Deploy:** Vercel
- **Analytics:** Vercel Analytics

## Brand Reference

```
PRIMARY:     #FF4500 (orange-red)
BACKGROUNDS: #000000 / #0a0a0a / #111111
TEXT:         #FFFFFF / #A0A0A0 / #666666
FONTS:       Oswald (display) + Inter (body)
```

## Verification Checklist (per sprint)

- [ ] `pnpm build` compiles without errors
- [ ] `pnpm lint` passes
- [ ] Lighthouse > 90 (perf, a11y, SEO, best practices)
- [ ] Mobile test (iPhone Safari, Android Chrome)
- [ ] Forms work with real data
- [ ] All routes respond correctly
- [ ] i18n toggle works (EN/PT)
- [ ] Git tag created
