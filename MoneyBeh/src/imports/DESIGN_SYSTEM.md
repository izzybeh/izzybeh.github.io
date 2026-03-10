# MoneyBeh Design System

**Version:** 2.0 (Ocean Palette)  
**Philosophy:** Calm, Timeless, Human-First  
**Target Audience:** Ages 18-45+ (timeless, not trendy)  
**Core Emotion:** Supportive wellness, not cold fintech

---

## The MoneyBeh Manifesto

Most financial tools only show you half the picture. Budgeting apps tell you whether this month is working. Wealth trackers show you where you stand. But almost none of them connect the two — so you can do everything right and still have no idea when you'll actually be free.

MoneyBeh closes that gap. It gives you a clear picture of your life today *and* where it's headed — so the calm isn't just about this month. It's about the whole thing.

This isn't a budgeting tool. It's not a wealth tracker. It's the connection between the two: a way to fund the life you want now, and see exactly when the future you want arrives.

> **Joy today. Freedom tomorrow.**  
> **MoneyBeh: Clear decisions. Less stress. More freedom.**

### Core Beliefs

- Budgeting apps and wealth trackers both exist — what's missing is the connection between them
- The calm came before the money. Clarity is what creates calm, not a higher salary
- You're not behind. You just can't see the full picture yet
- Joy is not a reward for reaching your number — it's part of the plan from day one
- Freedom is measured in years, not dollars
- Wealth is measured by the depth of a moment, not the height of a balance

---

## Where MoneyBeh Came From

MoneyBeh was built by Izzy Beh — a mix of his family name and the word *Behavior*, because that's what this is really about.

Izzy grew up feeling the gap between what his family had and what his friends' families had. That feeling followed him into his career and his relationships. When he discovered zero-based budgeting, money became something he could actually control. He and his wife made a deliberate decision: save her entire salary and live on his. They pre-paid annual expenses. They kept a guilt-free spending fund. Day to day, they felt calm.

But there was a question he couldn't shake: *Was any of this actually on track? Was he saving enough? Would retirement actually happen?* The day-to-day was clear. The future was a black box.

A financial advisor told him: "Izzy, you have money. But you don't have a plan." He found Mr. Money Mustache. He built a spreadsheet. For the first time, he could see both halves — the life he was living and the timeline to his freedom. When he could see it clearly, it stopped being scary.

Friends asked for the spreadsheet. They found the same thing. That spreadsheet became MoneyBeh.

**This origin story is the brand.** Every design decision, every word choice, every feature should serve the person who is doing everything right but can't see whether it's working.

---

## Brand Pillars

These are design principles, not marketing claims. They govern how the product behaves — not what we say about it.

### 1. Calm Over Flashy
No disruptive notifications. No anxiety-inducing alerts. A quiet, focused interface that respects your attention. No dopamine loops.

### 2. Clarity Over Complexity
One primary action per screen. Clear hierarchy. What matters most is always obvious. If a pixel doesn't teach or calm, remove it.

### 3. Progress Over Perfection
All forward movement is celebrated. No failure states — only recalibrations. The language is always "rebalancing," never "behind."

### 4. Plain Language Over Jargon
Financial concepts in clear, everyday language. No terminology barriers. The user should never need to Google a word we used.

### 5. Today And Tomorrow
Every feature should serve both halves. A spending decision has a lifestyle implication and a freedom implication. Show both.

### 6. Joy Is Not Optional
Building a life you can maintain and enjoy — now, not just at retirement. Joy is a budget category, not an afterthought.

---

## The Behavioral Translator

We translate finance jargon into human reality. When a term must be used, it gets translated immediately.

| Finance Term | MoneyBeh Translation | Mental Model |
|--------------|---------------------|--------------|
| Compound Interest | Growth momentum | Your money grows faster over time. Like a snowball rolling downhill. |
| Inflation | Purchasing power decline | A dollar today buys more than a dollar next year. Timing matters. |
| Budget | Spending plan | Decide how to allocate your money before you spend it. |
| Overspending | Rebalance needed | When spending exceeds your plan, adjust to realign. |
| Emergency Fund | Safety reserve | Money set aside for unexpected expenses. Reduces financial stress. |
| Financial Independence | Full Freedom | The age when work becomes completely optional. |
| FI Number | Freedom Number | The amount your investments need to reach to cover your life. |

### Product Vocabulary (Canonical Terms)

These are the terms MoneyBeh uses. Use these exactly — never swap in finance jargon equivalents.

- **Essentials** — The non-negotiable costs of your life (rent, groceries, utilities, insurance)
- **Joy** — The spending that makes life worth living. A budget category, not a luxury.
- **Savings** — Your freedom fund + retirement investments
- **Freedom Timeline** — The visual path from now to financial independence, measured in ages not dollars
- **Essentials Covered** — The first milestone: when investments can pay for your core life and you only need to work for joy
- **Full Freedom** — The second milestone: when work becomes completely optional
- **Time Banked** — How many years of freedom your current savings have already secured, even if you never save again

---

## Color System

### Philosophy: Monochromatic 80/20 Approach

MoneyBeh uses an **80/20 monochromatic design** where most of the UI is monochromatic (Paper + Ink) to eliminate emotional noise. Color is used sparingly as **semantic signals** for behavioral "Pulse Checks."

### Ocean: Calm & Natural (Default Palette)

A breath of fresh air. Seafoam green for action, deep teal for intelligence, sand for celebration. This palette reduces anxiety and creates a sanctuary for financial clarity.

#### Primary Colors

```css
/* Paper - Cool, breathable background with ocean mist quality */
--paper: #F7FAFA;
--paper-dark: #EEF5F5;

/* Ink - Absolute clarity for primary text */
--ink: #1A1A1B;
--ink-light: #4A4540;
--ink-lighter: #6F6760;
```

#### Seafoam (Primary — "Do This")
Refreshing, natural green for primary actions and progress.

```css
--seafoam-50: #F3F9F8;   /* Light backgrounds */
--seafoam-100: #E0F2EE;  /* Subtle fills */
--seafoam-200: #C5E6DF;  /* Borders */
--seafoam-300: #9DD4C8;  /* Disabled states */
--seafoam-400: #75C1B1;  /* Lighter actions */
--seafoam-500: #5FA696;  /* Primary buttons, CTAs, progress */
--seafoam-600: #4A8979;  /* Button hover */
--seafoam-700: #3B6F62;  /* Text on light backgrounds */
--seafoam-800: #2E574D;  /* Dark text */
--seafoam-900: #1F3A34;  /* Darkest */
```

**Usage:** Primary actions, "on track" status, success states, progress indicators

#### Deep Teal (Secondary — "Learn This")
Intelligent blue-green for insights, learning, and clarity.

```css
--deep-teal-50: #F1F7F9;   /* Light backgrounds */
--deep-teal-100: #D9ECF0;  /* Subtle fills */
--deep-teal-200: #B3D9E2;  /* Borders */
--deep-teal-300: #7FBFD0;  /* Lighter states */
--deep-teal-400: #5BA2B5;  /* Lighter insights */
--deep-teal-500: #3D7A8A;  /* Intelligence & insights */
--deep-teal-600: #306270;  /* Hover states */
--deep-teal-700: #264F5A;  /* Text on light backgrounds */
--deep-teal-800: #1D3C45;  /* Dark text */
--deep-teal-900: #13282F;  /* Darkest */
```

**Usage:** Educational content, insights, recommendations, "learn this" moments

#### Sand (Tertiary — "You Did It!")
Warm, celebratory tone for achievements and milestones.

```css
--sand-50: #FBF8F4;    /* Light backgrounds */
--sand-100: #F5EFE3;   /* Subtle fills */
--sand-200: #EBE0C9;   /* Borders */
--sand-300: #DFCCA5;   /* Lighter states */
--sand-400: #D9C087;   /* Lighter celebrations */
--sand-500: #D4AF6A;   /* Celebration & achievements */
--sand-600: #B89454;   /* Hover states */
--sand-700: #967842;   /* Text on light backgrounds */
--sand-800: #745C32;   /* Dark text */
--sand-900: #4F3E22;   /* Darkest */
```

**Usage:** Celebration moments, achievements, positive reinforcement (use sparingly)

#### Warm Gray (Neutral)
Supporting neutral tones for text and UI elements.

```css
--warm-gray-50: #FAF9F8;   /* Subtle backgrounds */
--warm-gray-100: #F2F0EE;  /* Card backgrounds */
--warm-gray-200: #E7E4E0;  /* Borders */
--warm-gray-300: #D4CFC8;  /* Disabled states */
--warm-gray-400: #B8B1A8;  /* Placeholder text */
--warm-gray-500: #938A7E;  /* Tertiary text */
--warm-gray-600: #6F6760;  /* Secondary text */
--warm-gray-700: #4A4540;  /* Body text */
--warm-gray-800: #2D2926;  /* Dark headings */
--warm-gray-900: #1A1715;  /* Darkest headings */
```

#### Critical Red (Error States — Use Sparingly)
Only for true errors or destructive actions. **Never** for financial setbacks.

```css
--critical: #D64242;
--critical-subtle: #FFF3F3;
```

### Jakob's Law: Predictable Color Psychology

MoneyBeh follows established color conventions to reduce cognitive load and prevent anxiety:

- **Green (Seafoam)** = Action, success, growth, "do this"
- **Blue-Green (Deep Teal)** = Intelligence, learning, clarity, "learn this"
- **Warm Gold/Sand** = Celebration, achievement, milestone, "you did it!"
- **Red (Critical)** = Error, danger (use sparingly, never for financial setbacks)

### Legacy & Alternative Colors

Additional colors available for theme variations (see `/color-exploration` page):

```css
/* Sage - Legacy primary green */
--sage-500: #5F9C76;
--sage-600: #4A7D5D;
--sage-700: #3A6B4D;

/* Amber - Support/course-correction */
--amber: #FFD0A5;
--amber-dark: #FFB87A;
--amber-subtle: #FFF5EB;

/* Lavender - Joy & celebration (alternative) */
--lavender: #9B8FE8;
--lavender-subtle: #F3F1FE;

/* Synapse - Intelligence (alternative) */
--synapse: #5D5FEF;
--synapse-light: #8B8DF2;
--synapse-subtle: #EEEFFE;

/* Warm Gold - Rich celebration (alternative) */
--warm-gold: #C9941A;
--warm-gold-subtle: #FFF9E6;

/* Deep Blue - Fintech premium (alternative) */
--deep-blue: #3B5FCC;
--deep-blue-subtle: #EEF2FD;
```

---

## Typography

### Font Family
```css
--font-heading: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Jost** is a geometric sans-serif inspired by Futura, used for all typography throughout the app.

#### Why Jost?
- **Geometric clarity:** Clean, Futura-inspired letterforms embody "Clarity Over Complexity"
- **Timeless aesthetic:** Modern but not trendy, avoiding anxiety-inducing stylistic choices
- **Soft Geometry alignment:** The letterforms have approachable-yet-professional balance
- **Excellent readability:** Performs well at all sizes from 12px chart labels to large headings
- **Single font simplicity:** Using one font family with different weights (400, 500, 600, 700) reduces cognitive load

### Font Sizes (Mobile-first)
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Spacing Scale

Generous spacing supports calm, breathable interfaces.

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

---

## Border Radius — "Soft Geometry"

Generous corners (32px primary). Approaches, never attacks.

```css
--radius-sm: 0.5rem;      /* 8px - Small elements */
--radius-md: 1rem;        /* 16px - Medium elements */
--radius-lg: 1.5rem;      /* 24px - Large elements */
--radius-xl: 2rem;        /* 32px - Primary cards and containers */
--radius-2xl: 2.5rem;     /* 40px - Extra large */
--radius-full: 9999px;    /* Fully rounded */
```

---

## Shadows

Subtle depth without harshness.

```css
--shadow-xs: 0 1px 2px rgba(26, 26, 27, 0.05);
--shadow-sm: 0 2px 8px rgba(26, 26, 27, 0.08);
--shadow-md: 0 4px 16px rgba(26, 26, 27, 0.10);
--shadow-lg: 0 8px 24px rgba(26, 26, 27, 0.12);
```

---

## Motion & Animation — "The Exhale"

The app breathes with you. Slow transitions (300–400ms).

### Timing
```css
--transition-fast: 200ms;
--transition-base: 300ms;  /* The Exhale - primary transition */
--transition-slow: 400ms;  /* The Exhale - slower transitions */
--easing: cubic-bezier(0.4, 0.0, 0.2, 1);
```

### Principles
- Subtle, not distracting
- Purposeful (guide attention)
- Smooth (no jarring movements)
- Respectful of reduced-motion preferences

---

## Component Guidelines

### Cards
```css
background: var(--paper) or white;
border: 1px solid var(--warm-gray-200);
border-radius: var(--radius-xl);  /* 32px - Soft Geometry */
box-shadow: var(--shadow-sm);
padding: var(--space-6);  /* 24px mobile, 32px desktop */
```

### Buttons

**Primary:**
```css
background: var(--seafoam-500);
color: white;
padding: var(--space-4) var(--space-6);
border-radius: var(--radius-lg);  /* 24px */
box-shadow: var(--shadow-sm);
transition: all var(--transition-base) var(--easing);

/* Hover */
background: var(--seafoam-600);
```

**Secondary:**
```css
background: var(--warm-gray-100);
color: var(--warm-gray-800);
border: 1px solid var(--warm-gray-300);
padding: var(--space-4) var(--space-6);
border-radius: var(--radius-lg);
```

### Progress Bars
```css
height: 8px;
background: var(--warm-gray-200);
fill: var(--seafoam-500); /* or gradient from --seafoam-400 to --seafoam-500 */
border-radius: var(--radius-full);
transition: width var(--transition-slow) var(--easing);
```

### Status Indicators

**On Track:**
```css
background: var(--seafoam-50);
color: var(--seafoam-700);
border: 1px solid var(--seafoam-200);
border-radius: var(--radius-md);
```

**Learning / Insights:**
```css
background: var(--deep-teal-50);
color: var(--deep-teal-600);
border: 1px solid var(--deep-teal-200);
border-radius: var(--radius-md);
```

**Celebration:**
```css
background: var(--sand-50);
color: var(--sand-700);
border: 1px solid var(--sand-200);
border-radius: var(--radius-md);
```

---

## Design Principles

### 1. Calm Over Flashy
- Soft shadows (not dramatic)
- Muted colors (not saturated)
- Gentle transitions (300-400ms)
- Breathing room (generous padding)

### 2. Clarity Over Complexity
- One primary action per screen
- Clear hierarchy (what matters most?)
- Minimal cognitive load
- Obvious next steps

### 3. Human Over Mathematical
- Time-based metrics (years, months)
- Real-world language ("freedom" not "FI")
- Tangible outcomes (lifestyle, age)
- Emotional connection to future self

### 4. Minimalist Design
If a pixel doesn't teach or calm, delete it.

### 5. Real-World Match
Use the language of time and energy, not finance jargon.

---

## Tone & Voice

**Tone:** Calm and direct. No exclamation points. No hype. No urgency manufactured to make you act.

**Voice:** The calm friend who's already walked this road — and is telling you what they wish they'd known earlier.

This friend isn't a financial advisor performing authority. They're not a wellness app performing positivity. They're someone who felt behind, figured it out, and wants to show you the path clearly so you don't have to guess.

### Writing Principles

- No anxiety-inducing language
- No guilt or shame — ever
- Never imply the user is behind, broken, or failing
- Use second person ("you," "your")
- Active voice
- Short sentences. One idea at a time.
- Name the problem before offering the solution
- "Rebalancing" not "overspending." "Adjust" not "fix." "Recalibrate" not "fail."

### Tone Examples

| Don't say | Say instead |
|-----------|-------------|
| "You're losing money to inflation" | "A dollar today buys more than a dollar next year. Timing matters." |
| "You're behind on retirement" | "You just can't see the full picture yet." |
| "Budget" | "Spending plan" |
| "Get your finances under control" | "See where you stand. See where you're headed." |
| "Start saving now" | "Find your starting point" |
| "Financial independence" | "Full Freedom" |

---

## Geometric Patterns

### Shapes for Illustrations
- **Circles** — Completion, wholeness
- **Rounded rectangles** — Stability, progress
- **Arcs** — Growth, trajectory
- **Dots** — Accumulation, building

### Usage
- Background patterns (10% opacity)
- Icon containers
- Data visualization
- Decorative elements (minimal)

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Large text meets WCAG AAA standards (7:1)
- Seafoam and Deep Teal are visually distinct for colorblind users

### Motion
- Respect `prefers-reduced-motion` settings
- Disable animations when requested

### Focus States
- Clear keyboard focus indicators
- Focus ring uses `--ring` color (Synapse blue)

---

## Mobile-First Approach

MoneyBeh is designed mobile-first, optimized for one-handed use on smartphones.

### Touch Targets
- Minimum 44×44px for all interactive elements
- Generous spacing between tappable areas

### Layout
- Single column on mobile
- Progressive enhancement for tablets and desktop
- Bottom navigation for core actions

---

## Key Differentiators

What makes MoneyBeh different — stated plainly, for anyone building on or contributing to this product.

1. **The connection, not just one half.** Budgeting apps exist. Wealth trackers exist. MoneyBeh is the only tool that connects your spending plan today to your freedom timeline tomorrow.
2. **Freedom measured in years, not dollars.** Two milestones — Essentials Covered and Full Freedom — both expressed as ages, not account balances. Tangible. Human. Motivating.
3. **Joy is part of the plan from day one.** Joy is a budget category. Not a reward. Not guilt. An allocation.
4. **Time Banked.** Showing users what they've already secured — even if they never save another dollar — reframes progress entirely. You're further along than you think.
5. **No anxiety-inducing elements.** No red alerts, no shame spirals, no comparison to others. The emotional register is calm and steady throughout.
6. **Monochromatic 80/20.** Most of the UI is Paper + Ink. Color signals meaning: seafoam for action, deep teal for learning, sand for celebration.
7. **Soft Geometry.** 32px corners. Breathing room. The interface approaches, never attacks.
8. **The Exhale.** 300–400ms transitions that move with you, not at you.

---

## Resources

- **Font:** [Google Fonts - Jost](https://fonts.google.com/specimen/Jost)
- **CSS Variables:** `/styles/globals.css`
- **Component Examples:** `/pages/DesignSystem.tsx`
- **Color Exploration:** `/pages/ColorExploration.tsx`
- **Alternative Palettes:** 6 options available (Ocean is default)

---

## Version History

**v2.0** — Ocean: Calm & Natural palette (Current)
- Default: Seafoam/Deep Teal/Sand
- Monochromatic 80/20 approach
- "The Exhale" and "Soft Geometry" design language

**v1.0** — Sage/Mint/Sky palette (Legacy)
- Theme modes: Minimal/Balanced/Vibrant
- Retired in favor of Ocean palette

---

**MoneyBeh Design System** • Designed for humans, not calculators • Clear decisions. Less stress. More freedom.