# Sprint 1 — Backend & Conversion

**Duration:** 3-4 days
**Git Tag:** `v0.3.0-sprint-1`
**Depends on:** Sprint 0
**Status:** Pending

## Objective

Make the website generate real leads. Connect the CTA form and newsletter to a working backend using Resend for emails and WhatsApp API for instant communication.

## New Files to Create

| File | Purpose |
|------|---------|
| `app/api/contact/route.ts` | API endpoint for CTA form |
| `app/api/newsletter/route.ts` | API endpoint for newsletter |
| `lib/resend.ts` | Resend client configuration |
| `lib/validations.ts` | Zod schemas for form validation |
| `emails/contact-notification.tsx` | Email template: new lead notification |
| `emails/contact-confirmation.tsx` | Email template: confirmation to lead |
| `emails/welcome-subscriber.tsx` | Email template: newsletter welcome |

## Files to Modify

| File | Changes |
|------|---------|
| `components/cta-section.tsx` | Connect form to API, add loading/success/error states |
| `components/footer.tsx` | Connect newsletter form to API |
| `package.json` | Add resend, @react-email/components, zod |

## Tasks

### 1. Setup Resend
- [ ] `pnpm add resend @react-email/components`
- [ ] Create `lib/resend.ts` with Resend client
- [ ] Add `RESEND_API_KEY` to `.env.local` and Vercel env vars
- [ ] Add Dkapture sender email domain in Resend dashboard

### 2. Create Contact API Route
- [ ] Create `/api/contact/route.ts`
- [ ] Validate input with Zod schema:
  - name (required, min 2 chars)
  - email (required, valid email)
  - businessType (required, enum)
  - revenue (optional)
  - goals (optional, max 1000 chars)
- [ ] Send notification email to `hello@dkapture.com`
- [ ] Send confirmation email to the lead
- [ ] Return WhatsApp link in response (wa.me/13055550123?text=...)
- [ ] Add basic rate limiting (5 requests per IP per hour)

### 3. Create Newsletter API Route
- [ ] Create `/api/newsletter/route.ts`
- [ ] Validate email with Zod
- [ ] Send welcome email via Resend
- [ ] Store subscriber (Resend Audiences or simple list)
- [ ] Rate limit (3 per IP per hour)

### 4. Design Email Templates
- [ ] `emails/contact-notification.tsx` — branded email with lead details
- [ ] `emails/contact-confirmation.tsx` — thank you email with next steps
- [ ] `emails/welcome-subscriber.tsx` — newsletter welcome with brand styling
- [ ] All emails use Dkapture brand colors (#FF4500, dark theme)

### 5. Update CTA Form Component
- [ ] Add form validation with error messages
- [ ] Add loading state (spinner on submit button)
- [ ] Add success state (thank you message + WhatsApp CTA)
- [ ] Add error state (retry button)
- [ ] Add "Prefer WhatsApp?" button that opens wa.me link
- [ ] Disable submit while loading

### 6. Update Footer Newsletter
- [ ] Connect to `/api/newsletter` endpoint
- [ ] Add loading/success/error states
- [ ] Show toast notification on success

### 7. Mobile Form UX
- [ ] Add correct `inputMode` attributes (email, tel, numeric)
- [ ] Auto-scroll to active field when keyboard opens
- [ ] Sticky submit button at bottom on mobile
- [ ] Use native select dropdowns on mobile (better UX than custom)

## Environment Variables

```env
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=hello@dkapture.com
WHATSAPP_NUMBER=13055550123
```

## Verification

```bash
pnpm build
# Submit test form — check email arrives
# Submit newsletter — check welcome email
# Test WhatsApp link opens correctly
# Test rate limiting (submit 6 times rapidly)
# Test on mobile (form UX, keyboard behavior)
# Test error states (disconnect internet, submit)
```

## Rollback

```bash
git checkout v0.2.0-sprint-0
```
