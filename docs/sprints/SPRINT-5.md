# Sprint 5 — AI Lab Page & Competitive Differentiators

**Duration:** 4-5 days
**Git Tag:** `v0.7.0-sprint-5`
**Depends on:** Sprint 2 (i18n), Sprint 3 (service pages)
**Status:** Pending

## Objective

Build the AI Lab page — Dkapture's key differentiator. Instead of just talking about AI, this page DEMONSTRATES it with an interactive ROI calculator, live automation previews, and a comparison table that no competitor can match.

## Competitive Differentiators

### 1. Interactive ROI Calculator (unique)
No Brazilian-owned agency in the USA offers this. The visitor inputs their current marketing data and sees projected results with AI optimization.

### 2. Live Automation Previews
Instead of describing automations, show them with animated flow diagrams.

### 3. Traditional vs. AI Comparison Table
Clear, visual comparison that educates and converts simultaneously.

## New Files to Create

| File | Purpose |
|------|---------|
| `app/[locale]/ai-lab/page.tsx` | Dedicated AI Lab page |
| `components/sections/ai-hero.tsx` | Hero with matrix/code rain effect |
| `components/sections/ai-tools-grid.tsx` | Bento grid of 5 automations |
| `components/sections/ai-flow-diagram.tsx` | Animated workflow diagram |
| `components/sections/ai-comparison.tsx` | Traditional vs AI table |
| `components/sections/ai-demo.tsx` | Interactive preview/chatbot |
| `components/sections/ai-integrations.tsx` | Partner logo row |
| `components/ui/roi-calculator.tsx` | Interactive ROI calculator |

## Page Structure

```
1. AI Hero
   - Headline: "Where Artificial Intelligence Meets Brazilian Hustle"
   - Animated camera shutter icon that transforms into AI circuit pattern
   - Subtext about AI automation
   - Background: Matrix-style subtle code rain in orange (very faint)

2. ROI Calculator (DIFFERENTIATOR)
   - Interactive inputs:
     - Monthly ad spend (slider: $1K - $50K)
     - Current number of leads/month (slider: 10 - 500)
     - Current conversion rate (slider: 1% - 20%)
     - Average deal value (slider: $500 - $50K)
   - Real-time output:
     - Current monthly revenue (calculated)
     - Projected revenue with AI (+30-50% improvement)
     - Projected annual savings
     - ROI percentage
   - Animated numbers with Framer Motion
   - CTA: "Want these results? Book a call"
   - Optional: capture email to send detailed report

3. AI Tools Grid (Bento Layout)
   5 automation cards:

   Card 1: "Instant Lead Responder"
   - Icon: Lightning bolt
   - Trigger: "New lead on Facebook Ads"
   - Action: "SMS + Auto-schedule in 3 seconds"
   - Result: "85% faster response time"

   Card 2: "Bilingual AI Chat"
   - Icon: Chat bubbles with flags
   - Trigger: "Website visitor"
   - Action: "Detects language, answers FAQs 24/7"
   - Result: "Zero missed inquiries"

   Card 3: "Review Booster"
   - Icon: Star
   - Trigger: "Service marked as paid"
   - Action: "Auto-sends Google review request"
   - Result: "+200% review volume"

   Card 4: "Content Repurposer"
   - Icon: Video/split
   - Trigger: "Drone footage delivered"
   - Action: "AI generates 10 Reels scripts + Blog"
   - Result: "10x content from 1 shoot"

   Card 5: "Predictive Lead Scoring"
   - Icon: Brain/chart
   - Trigger: "Lead enters CRM"
   - Action: "AI scores conversion probability"
   - Result: "Focus on hot leads only"

4. How It Works Diagram
   - Animated flow: Lead > AI Processing > Human Handoff > Conversion
   - Connecting lines with data flow animation
   - Orange accent nodes
   - Vertical on mobile, horizontal on desktop

5. Integration Partners
   - Logo row: Zapier, HubSpot, Meta, Google, WhatsApp
   - Grayscale by default, orange on hover
   - Subtle scroll animation

6. Comparison Table
   "Traditional Agency vs Dkapture AI"
   | Category | Traditional | Dkapture AI |
   |----------|-------------|-------------|
   | Response Time | Hours/Days | 3 seconds |
   | 24/7 Support | No | Yes |
   | Content Volume | 4 posts/week | 40+ posts/week |
   | Cost Efficiency | $$ | $ |
   | Personalization | Generic | Hyper-targeted |
   | Reporting | Monthly PDF | Real-time dashboard |

7. CTA
   - "Ready to Automate Your Growth?"
   - Large orange button with circuit pattern animation on hover
```

## ROI Calculator Logic

```typescript
interface ROIInput {
  monthlyAdSpend: number;      // $1,000 - $50,000
  currentLeads: number;        // 10 - 500
  conversionRate: number;      // 1% - 20%
  averageDealValue: number;    // $500 - $50,000
}

interface ROIOutput {
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;  // +35% improvement factor
  annualSavings: number;            // operational efficiency
  roiPercentage: number;
  additionalLeads: number;
  additionalRevenue: number;
}

// Improvement factors (conservative estimates):
const AI_LEAD_INCREASE = 0.25;        // 25% more leads
const AI_CONVERSION_BOOST = 0.15;     // 15% better conversion
const AI_COST_REDUCTION = 0.20;       // 20% operational savings
```

## Mobile-Specific Requirements

- [ ] ROI Calculator: sliders (range inputs) instead of text fields on mobile
- [ ] Flow diagram: simplified vertical layout on mobile
- [ ] Comparison table: horizontally scrollable with visual indicator
- [ ] Cards: single column stack on mobile
- [ ] All animations reduced/simplified on mobile for performance

## Tasks

### 1. Build ROI Calculator Component
- [ ] Create `roi-calculator.tsx` with slider inputs
- [ ] Implement calculation logic
- [ ] Add Framer Motion animated number output
- [ ] Add "Book a Call" CTA with pre-filled context
- [ ] Make fully responsive (sliders on mobile)
- [ ] Add bilingual labels (EN/PT)

### 2. Build AI Hero
- [ ] Create matrix/code rain background effect (CSS animation, not JS for performance)
- [ ] Shutter-to-circuit morphing animation
- [ ] Responsive for all screen sizes

### 3. Build Automation Cards
- [ ] Create 5 cards with trigger/action/result format
- [ ] Animated orange border on hover
- [ ] Icon animations (subtle)
- [ ] Bento grid layout

### 4. Build Flow Diagram
- [ ] SVG-based animated flow
- [ ] Framer Motion for data flow animation along paths
- [ ] Horizontal on desktop, vertical on mobile

### 5. Build Comparison Table
- [ ] Styled table with brand colors
- [ ] Red X for traditional, orange check for Dkapture
- [ ] Horizontally scrollable on mobile
- [ ] Animated row reveal on scroll

### 6. Integration Logos
- [ ] Logo row with grayscale/color hover
- [ ] Use SVG logos (Zapier, HubSpot, Meta, Google, WhatsApp)

### 7. Update Homepage AI Lab Section
- [ ] Add "Explore Our AI Lab" link pointing to full page
- [ ] Keep homepage section as teaser

## Verification

```bash
pnpm build
# Visit /en/ai-lab — full page loads
# Visit /pt/laboratorio-ia — PT version loads
# Test ROI calculator with various inputs
# Verify animated numbers update smoothly
# Test on mobile (sliders, scroll table)
# Check performance (animations shouldn't lag)
# Verify all CTAs work
```

## Rollback

```bash
git checkout v0.6.0-sprint-4
```
