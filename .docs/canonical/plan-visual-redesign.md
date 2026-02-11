# Plan: Tierra Viva Website Visual Redesign

**Date:** 2026-02-11
**Status:** Draft
**Scope:** Visual redesign of the existing Tierra Viva public site -- new typography, expanded color palette, hero redesign, stats strip, card upgrades, scroll reveal, footer redesign, and inner-page polish.

---

## Table of Contents

- [Phase 1: Design Foundation](#phase-1-design-foundation-fonts--colors--base-styles)
- [Phase 2: Hero Redesign](#phase-2-hero-redesign)
- [Phase 3: Stats Strip](#phase-3-stats-strip)
- [Phase 4: Section Upgrades](#phase-4-section-upgrades)
- [Phase 5: Motion and Interactions](#phase-5-motion-and-interactions)
- [Phase 6: Footer Redesign](#phase-6-footer-redesign)
- [Phase 7: Inner Page Polish](#phase-7-inner-page-polish)

---

## Pre-Flight Checklist

Before starting, confirm the build is green:

```bash
pnpm check && pnpm lint && pnpm test && pnpm build
```

Every phase ends with this same verification.

---

## Phase 1: Design Foundation (Fonts + Colors + Base Styles)

**Goal:** Add Google Fonts, new color tokens, font-family tokens, and update base layer so every subsequent phase inherits the new design system.

### Step 1.1 -- Add Google Font preconnect and stylesheet links

**File to modify:** `src/layouts/BaseLayout.astro`

Add inside `<head>`, after the existing `<meta>` tags and before `<title>`:

```html
<!-- Google Fonts: DM Serif Display, Inter, IBM Plex Mono -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Place them right after the `<meta name="generator" ...>` line, before `<title>`.

The full `<head>` should look like:

```astro
<head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} />
  <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.ico`} />
  <meta name="viewport" content="width=device-width" />
  <meta name="description" content={description} />
  <meta name="generator" content={Astro.generator} />
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <title>{title ?? SITE_TITLE}</title>
</head>
```

### Step 1.2 -- Expand color tokens in global.css

**File to modify:** `src/styles/global.css`

Add the new color tokens inside the existing `@theme` block. The 5 new tokens are additive; existing tokens remain unchanged.

```css
@import "tailwindcss";

@theme {
  /* Existing brand greens */
  --color-tierra-white: #fffffe;
  --color-tierra-lime: #98e22e;
  --color-tierra-mid: #4e9c3d;
  --color-tierra-forest: #0f7335;
  --color-tierra-forest-dark: #0b3212;
  --color-tierra-sage: #bcd69a;
  --color-tierra-neutral: #0b3212;

  /* New warm neutrals */
  --color-tierra-cream: #faf8f5;
  --color-tierra-sand: #f0ebe3;
  --color-tierra-stone: #d4cdc4;
  --color-tierra-graphite: #3d3833;
  --color-tierra-ink: #1a1714;

  /* Font family tokens */
  --font-display: "DM Serif Display", Georgia, "Times New Roman", serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", monospace;
}
```

### Step 1.3 -- Update base layer styles

**File to modify:** `src/styles/global.css`

Replace the existing `@layer base` block with:

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    font-family: var(--font-body);
    background-color: var(--color-tierra-cream);
    color: var(--color-tierra-graphite);
  }

  h1,
  h2,
  h3 {
    font-family: var(--font-display);
    color: var(--color-tierra-ink);
  }
}
```

**Key changes:**

- `body` font-family now uses `--font-body` (Inter) instead of system-ui stack
- `body` background changes from `--color-tierra-white` (#fffffe) to `--color-tierra-cream` (#faf8f5)
- `body` gets default text color `--color-tierra-graphite`
- `h1, h2, h3` get `--font-display` (DM Serif Display) and `--color-tierra-ink`

### Step 1.4 -- Update Header background to match new cream bg

**File to modify:** `src/components/Header.astro`

Change the sticky wrapper div's `bg-white` to `bg-tierra-cream`:

```diff
- <div class="sticky top-0 z-100 isolate bg-white">
+ <div class="sticky top-0 z-100 isolate bg-tierra-cream">
```

Also update the mobile menu bg:

```diff
- class="hidden border-t border-tierra-neutral/10 bg-white px-4 py-3 lg:hidden"
+ class="hidden border-t border-tierra-stone/40 bg-tierra-cream px-4 py-3 lg:hidden"
```

Update header bottom border to use the new stone color:

```diff
- <header class="border-b border-tierra-neutral/10">
+ <header class="border-b border-tierra-stone/40">
```

Nav link text color update (use tierra-ink instead of tierra-forest-dark for better contrast on warm bg):

```diff
- class="rounded px-3 py-2 text-sm font-medium text-tierra-forest-dark hover:bg-tierra-sage/20 ..."
+ class="rounded px-3 py-2 text-sm font-medium text-tierra-ink hover:bg-tierra-sand ..."
```

Apply the same `text-tierra-ink` and `hover:bg-tierra-sand` changes to the mobile nav items.

### Testing (Phase 1)

1. `pnpm build` -- should succeed with no errors
2. `pnpm dev` -- visual check in browser:
   - Page background is warm cream (#faf8f5), not white
   - All headings render in DM Serif Display (serif)
   - Body text renders in Inter (sans-serif)
   - Header background matches page, border is subtle stone color
   - Mobile menu opens with correct bg
3. `pnpm check && pnpm lint` -- no type or lint errors
4. Check DevTools Network tab: Google Fonts CSS loads with all 3 families

### Commit Point (Phase 1)

```text
feat(design): add typography, color tokens, and base style foundation

- Add DM Serif Display, Inter, IBM Plex Mono via Google Fonts
- Add 5 warm-neutral color tokens (cream, sand, stone, graphite, ink)
- Add font-family tokens (--font-display, --font-body, --font-mono)
- Update body bg to cream, text to graphite, headings to display font
- Update Header to match new color system
```

---

## Phase 2: Hero Redesign

**Goal:** Transform dark-bg centered hero into cream-bg asymmetric layout with geometric CSS art.

### Step 2.1 -- Rewrite Hero.astro

**File to modify:** `src/components/sections/Hero.astro`

Replace entire file content with:

```astro
---
import { CONTACT_EMAIL } from "../../consts";
import Link from "../Link.astro";
---

<section class="overflow-hidden bg-tierra-cream px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
  <div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[55%_45%]">
    <!-- Text column -->
    <div>
      <h1 class="text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Living Capital for Living Places
      </h1>
      <p class="mt-6 text-lg leading-relaxed sm:text-xl">
        We build education-anchored communities across Latin America -- where
        learning, enterprise, and long-term investment come together to create
        shared prosperity.
      </p>
      <p class="mt-4 text-base leading-relaxed text-tierra-graphite/80">
        Tierra Viva is a regenerative real-estate development platform, built
        with institutional discipline, focused on transforming land into
        enduring ecosystems for families, talent, and capital.
      </p>
      <div class="mt-10 flex flex-col items-start gap-4 sm:flex-row">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          class="inline-flex items-center justify-center rounded-lg bg-tierra-lime px-8 py-3.5 text-base font-semibold text-tierra-forest-dark shadow-sm transition hover:bg-tierra-lime/90 focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2"
        >
          Start a Conversation
        </a>
        <Link
          href="/strategy"
          class="inline-flex items-center justify-center rounded-lg border-2 border-tierra-stone px-8 py-3.5 text-base font-semibold text-tierra-ink transition hover:border-tierra-forest hover:text-tierra-forest focus:outline-none focus:ring-2 focus:ring-tierra-forest focus:ring-offset-2"
        >
          Explore Our Thesis
        </Link>
      </div>
    </div>
    <!-- Geometric art column -->
    <div class="relative mx-auto aspect-square w-full max-w-md lg:mx-0" aria-hidden="true">
      <!-- Outer ring -->
      <div
        class="absolute inset-0 rounded-full border-[3px] border-tierra-forest/15"
      ></div>
      <!-- Mid ring -->
      <div
        class="absolute inset-[12%] rounded-full border-[3px] border-tierra-mid/25"
      ></div>
      <!-- Inner ring -->
      <div
        class="absolute inset-[24%] rounded-full border-[3px] border-tierra-forest/35"
      ></div>
      <!-- Core circle -->
      <div
        class="absolute inset-[36%] rounded-full bg-tierra-lime/15"
      ></div>
      <!-- Center dot -->
      <div
        class="absolute inset-[45%] rounded-full bg-tierra-forest/20"
      ></div>
      <!-- Accent ring offset -->
      <div
        class="absolute -right-4 -top-4 h-32 w-32 rounded-full border-[2px] border-tierra-sage/40 sm:h-40 sm:w-40"
      ></div>
      <!-- Small accent -->
      <div
        class="absolute -bottom-2 -left-6 h-20 w-20 rounded-full bg-tierra-sage/20 sm:h-24 sm:w-24"
      ></div>
    </div>
  </div>
</section>
```

**Key design decisions:**

- `overflow-hidden` on section prevents accent circles from causing horizontal scroll
- Grid: `lg:grid-cols-[55%_45%]` -- text takes 55%, art takes 45%
- Below `lg` breakpoint the art stacks below text and centers (`mx-auto`)
- Geometric art uses concentric `rounded-full` divs with `inset-[N%]` for spacing
- All art divs have `aria-hidden="true"` on the container (purely decorative)
- Primary CTA: `rounded-lg bg-tierra-lime px-8 py-3.5 shadow-sm`
- Ghost CTA: `rounded-lg border-2 border-tierra-stone` with hover to forest

### Testing (Phase 2)

1. `pnpm build` -- no errors
2. `pnpm dev`:
   - Hero has cream bg, text on left, circles on right at desktop
   - Mobile: text stacks above centered geometric art
   - CTAs render correctly: lime primary, ghost secondary
   - Heading is DM Serif Display (inherits from base)
   - No horizontal scroll from overflow elements
3. Test all breakpoints: 375px, 768px, 1024px, 1440px
4. `pnpm check && pnpm lint`

### Commit Point (Phase 2)

```text
feat(hero): redesign with asymmetric layout and geometric CSS art

- Switch from dark centered layout to cream-bg asymmetric grid
- Add concentric circle geometric art using CSS (no images)
- Update CTAs to rounded-lg with lime primary and ghost secondary
- Responsive: stacks vertically on mobile, 55/45 grid on desktop
```

---

## Phase 3: Stats Strip

**Goal:** Add a new StatsStrip component between Hero and WhyModel with count-up animation.

### Step 3.1 -- Create stats data file

**File to create:** `src/data/stats.ts`

```ts
export type Stat = {
  readonly value: string;
  readonly numericValue: number;
  readonly suffix: string;
  readonly prefix: string;
  readonly label: string;
};

export const STATS: readonly Stat[] = [
  {
    value: "$30M",
    numericValue: 30,
    suffix: "M",
    prefix: "$",
    label: "Target Fund",
  },
  {
    value: "150",
    numericValue: 150,
    suffix: "",
    prefix: "",
    label: "Luxury Homes",
  },
  {
    value: "250K sqm",
    numericValue: 250,
    suffix: "K sqm",
    prefix: "",
    label: "Development Site",
  },
  {
    value: "26%",
    numericValue: 26,
    suffix: "%",
    prefix: "",
    label: "Target IRR",
  },
];
```

### Step 3.2 -- Create the count-up animation script

**File to create:** `src/scripts/count-up.ts`

```ts
function initCountUp(): void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const counters = document.querySelectorAll<HTMLElement>(
    "[data-count-target]"
  );
  if (counters.length === 0) return;

  if (prefersReducedMotion) {
    counters.forEach((el) => {
      const target = el.getAttribute("data-count-target") ?? "";
      el.textContent = target;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);

        const target = Number(el.dataset.countValue ?? "0");
        const prefix = el.dataset.countPrefix ?? "";
        const suffix = el.dataset.countSuffix ?? "";
        const duration = 1500;
        const start = performance.now();

        function update(now: number): void {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = `${prefix}${current}${suffix}`;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => observer.observe(el));
}

initCountUp();
```

### Step 3.3 -- Create StatsStrip component

**File to create:** `src/components/sections/StatsStrip.astro`

```astro
---
import { STATS } from "../../data/stats";
---

<section
  class="bg-tierra-forest-dark px-4 py-12 sm:px-6 sm:py-16"
  aria-label="Key statistics"
>
  <div class="mx-auto max-w-5xl">
    <dl class="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
      {
        STATS.map((stat) => (
          <div class="text-center">
            <dt class="text-sm tracking-wide text-white/60">{stat.label}</dt>
            <dd
              class="mt-2 font-mono text-3xl font-semibold text-tierra-lime sm:text-4xl"
              data-count-target={stat.value}
              data-count-value={String(stat.numericValue)}
              data-count-prefix={stat.prefix}
              data-count-suffix={stat.suffix}
            >
              {stat.value}
            </dd>
          </div>
        ))
      }
    </dl>
  </div>
</section>

<script src="../../scripts/count-up.ts" />
```

**Key design decisions:**

- `bg-tierra-forest-dark` with lime numbers, white/60 labels
- `font-mono` maps to `--font-mono` (IBM Plex Mono) via Tailwind v4
- 2-column grid on mobile, 4-column on lg+
- `<dl>` with `<dt>` (label) and `<dd>` (value) for semantic correctness
- The label is placed above the number (`<dt>` before `<dd>`) because it reads better in screen readers; visually the large number dominates
- Count-up script uses IntersectionObserver + requestAnimationFrame with cubic ease-out
- Reduced-motion: skips animation, shows final values immediately

### Step 3.4 -- Add StatsStrip to index page

**File to modify:** `src/pages/index.astro`

Add import and place between Hero and WhyModel:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { SITE_TITLE } from "../consts";
import Hero from "../components/sections/Hero.astro";
import StatsStrip from "../components/sections/StatsStrip.astro";
import WhyModel from "../components/sections/WhyModel.astro";
import WhereFocused from "../components/sections/WhereFocused.astro";
import ValueGovernance from "../components/sections/ValueGovernance.astro";
import ResponsibleInvestment from "../components/sections/ResponsibleInvestment.astro";
import Team from "../components/sections/Team.astro";
import Research from "../components/sections/Research.astro";
import PartnerWithUs from "../components/sections/PartnerWithUs.astro";
import Footer from "../components/Footer.astro";
---

<BaseLayout title={SITE_TITLE}>
  <Hero />
  <StatsStrip />
  <WhyModel />
  <WhereFocused />
  <ValueGovernance />
  <ResponsibleInvestment />
  <Team />
  <Research />
  <PartnerWithUs />
  <Footer />
</BaseLayout>
```

### Step 3.5 -- Unit test for stats data

**File to create:** `src/data/stats.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { STATS } from "./stats";

describe("STATS", () => {
  it("has exactly 4 entries", () => {
    expect(STATS).toHaveLength(4);
  });

  it("each stat has required fields", () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
      expect(typeof stat.numericValue).toBe("number");
      expect(typeof stat.prefix).toBe("string");
      expect(typeof stat.suffix).toBe("string");
    });
  });

  it("reconstructed value matches value string", () => {
    STATS.forEach((stat) => {
      const reconstructed = `${stat.prefix}${stat.numericValue}${stat.suffix}`;
      expect(stat.value).toBe(reconstructed);
    });
  });
});
```

### Testing (Phase 3)

1. `pnpm test` -- stats data tests pass
2. `pnpm build` -- no errors
3. `pnpm dev`:
   - Dark strip appears between hero and WhyModel
   - 4 stats render in IBM Plex Mono
   - Numbers are tierra-lime, labels are white/60
   - Scroll to trigger count-up animation
   - Test with DevTools: set `prefers-reduced-motion: reduce` -- numbers appear instantly
4. `pnpm check && pnpm lint`

### Commit Point (Phase 3)

```text
feat(stats): add StatsStrip with count-up animation

- Create stats data module with typed stat definitions
- Create count-up script with IntersectionObserver and reduced-motion respect
- Create StatsStrip component with semantic dl/dt/dd markup
- Add StatsStrip between Hero and WhyModel on index page
- Add unit tests for stats data integrity
```

---

## Phase 4: Section Upgrades

**Goal:** Update WhyModel cards (icons + styling), fix WhereFocused placeholder, polish remaining sections.

### Step 4.1 -- Extend pillar data with icon IDs

**File to modify:** `src/data/pillars.ts`

```ts
export type Pillar = {
  readonly title: string;
  readonly description: string;
  readonly icon: "learning" | "homes" | "enterprise" | "stewardship";
};

export const PILLARS: readonly Pillar[] = [
  {
    title: "Learning as the Catalyst",
    description:
      "A high-quality school with an international curriculum anchors each community -- attracting families, cultivating talent, and supporting long-term social mobility.",
    icon: "learning",
  },
  {
    title: "Homes that Regenerate Place",
    description:
      "Thoughtfully designed residences aligned with global sustainability standards, resilient infrastructure, and long-term stewardship of land and resources.",
    icon: "homes",
  },
  {
    title: "Enterprise that Multiplies Opportunity",
    description:
      "Mixed-use and commercial spaces that support entrepreneurship, local businesses, and returning diaspora professionals.",
    icon: "enterprise",
  },
  {
    title: "Stewardship for the Long Term",
    description:
      "Transparent governance, local hiring pathways, and regenerative land management practices that strengthen communities and protect value over time.",
    icon: "stewardship",
  },
];
```

### Step 4.2 -- Create PillarIcon component

**File to create:** `src/components/PillarIcon.astro`

```astro
---
type Props = {
  icon: "learning" | "homes" | "enterprise" | "stewardship";
};

const { icon } = Astro.props;

const paths: Record<string, string> = {
  learning:
    "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z",
  homes:
    "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z",
  enterprise:
    "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
  stewardship:
    "M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z",
};
---

<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-tierra-forest/10 p-3">
  <svg
    class="h-6 w-6 text-tierra-forest"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={paths[icon]} />
  </svg>
</div>
```

### Step 4.3 -- Upgrade WhyModel cards

**File to modify:** `src/components/sections/WhyModel.astro`

Replace entire file:

```astro
---
import { PILLARS } from "../../data/pillars";
import PillarIcon from "../PillarIcon.astro";
---

<section
  id="why-model"
  aria-labelledby="why-model-heading"
  class="bg-tierra-cream px-4 py-16 sm:px-6 sm:py-24"
>
  <div class="mx-auto max-w-5xl">
    <h2
      id="why-model-heading"
      class="text-center text-2xl tracking-tight sm:text-3xl"
    >
      Why Tierra Viva
    </h2>
    <p class="mt-4 text-center text-base leading-relaxed text-tierra-graphite/90">
      We build education-anchored, regenerative communities where learning and
      long-term stewardship create lasting value.
    </p>
    <p class="mt-6 text-center text-lg leading-relaxed">
      Across the Caribbean and Latin America, families who once left in search
      of opportunity are increasingly looking to return -- seeking places that
      offer both prosperity and belonging. Tierra Viva exists to make that
      return possible.
    </p>
    <p class="mt-4 text-center text-base leading-relaxed text-tierra-graphite/90">
      Every Tierra Viva community is designed as an interconnected system of
      social, economic, and environmental value creation -- anchored by
      learning and governed for the long term.
    </p>
    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
      {
        PILLARS.map((pillar) => (
          <li>
            <article class="flex h-full flex-col rounded-xl border border-tierra-stone/40 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <PillarIcon icon={pillar.icon} />
              <h3 class="mt-4 text-lg font-semibold text-tierra-forest">
                {pillar.title}
              </h3>
              <p class="mt-3 grow text-sm leading-relaxed text-tierra-graphite/90">
                {pillar.description}
              </p>
            </article>
          </li>
        ))
      }
    </ul>
  </div>
</section>
```

**Card changes:**

- Old: `rounded-lg border border-tierra-forest/20 bg-tierra-sage/10 p-6 xl:p-8`
- New: `rounded-xl border border-tierra-stone/40 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`
- Added PillarIcon component with 48x48 icon in `bg-tierra-forest/10` container
- Section bg: `bg-tierra-cream` (was `bg-tierra-white`)
- Text colors: `text-tierra-graphite/90` (was `text-tierra-forest-dark/95`)

### Step 4.4 -- Fix WhereFocused placeholder

**File to modify:** `src/components/sections/WhereFocused.astro`

Replace entire file with project summary card replacing the "Visual coming soon" placeholder:

```astro
---
import Link from "../Link.astro";
---

<section
  id="where-focused"
  aria-labelledby="where-focused-heading"
  class="bg-tierra-sand px-4 py-16 sm:px-6 sm:py-24"
>
  <div class="mx-auto max-w-5xl">
    <h2
      id="where-focused-heading"
      class="text-center text-2xl tracking-tight sm:text-3xl"
    >
      Where We're Focused
    </h2>
    <p class="mt-6 text-center text-base leading-relaxed text-tierra-graphite/90 sm:text-lg">
      We are focused first in the Dominican Republic -- one of the
      fastest-growing economies in Latin America, with a vibrant diaspora, an
      expanding professional class, and strong long-term demographic and
      economic fundamentals.
    </p>
    <p class="mt-6 text-center text-base leading-relaxed text-tierra-graphite/90 sm:text-lg">
      Altos de Gurabo is our first flagship community in Santiago -- an
      integrated neighborhood anchored by an international school, with homes,
      green space, and daily conveniences in one place.
    </p>
    <p class="mt-6 text-center">
      <Link
        href="/projects"
        class="inline-flex items-center font-medium text-tierra-forest underline decoration-tierra-mid underline-offset-4 transition hover:decoration-tierra-forest focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2"
      >
        Projects &amp; Focus
      </Link>
    </p>
    <!-- Project summary card replacing "Visual coming soon" -->
    <div class="mx-auto mt-10 max-w-2xl rounded-xl border border-tierra-stone/40 bg-white p-8 shadow-sm">
      <div class="flex items-start gap-4">
        <!-- Location marker icon -->
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tierra-forest/10">
          <svg
            class="h-6 w-6 text-tierra-forest"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-tierra-ink">
            Altos de Gurabo, Santiago
          </h3>
          <p class="mt-1 text-sm text-tierra-graphite/70">
            Dominican Republic
          </p>
        </div>
      </div>
      <ul class="mt-6 grid grid-cols-2 gap-4 text-sm" role="list">
        <li class="flex flex-col">
          <span class="font-mono text-xl font-semibold text-tierra-forest">150</span>
          <span class="text-tierra-graphite/70">Luxury homes planned</span>
        </li>
        <li class="flex flex-col">
          <span class="font-mono text-xl font-semibold text-tierra-forest">250K sqm</span>
          <span class="text-tierra-graphite/70">Development site</span>
        </li>
        <li class="flex flex-col">
          <span class="font-mono text-xl font-semibold text-tierra-forest">1</span>
          <span class="text-tierra-graphite/70">International school</span>
        </li>
        <li class="flex flex-col">
          <span class="font-mono text-xl font-semibold text-tierra-forest">Mixed-use</span>
          <span class="text-tierra-graphite/70">Commercial &amp; amenities</span>
        </li>
      </ul>
    </div>
  </div>
</section>
```

**Changes:**

- Section bg: `bg-tierra-sand` (was `bg-tierra-sage/10`)
- Removed "Visual coming soon" placeholder
- Added project summary card with location icon, stats grid, same card styling as WhyModel
- Text colors updated to tierra-graphite palette

### Step 4.5 -- Update ValueGovernance section

**File to modify:** `src/components/sections/ValueGovernance.astro`

Key class changes:

```diff
- class="bg-tierra-sage/10 px-4 py-16 text-tierra-forest-dark sm:px-6 sm:py-24"
+ class="bg-tierra-sand px-4 py-16 sm:px-6 sm:py-24"
```

Update heading (remove `font-bold`, the display font handles weight):

```diff
- class="text-center text-2xl font-bold tracking-tight sm:text-3xl"
+ class="text-center text-2xl tracking-tight sm:text-3xl"
```

Update body text colors:

```diff
- text-tierra-forest-dark/95
+ text-tierra-graphite/90
```

Update bullet list text:

```diff
- class="mx-auto mt-6 max-w-2xl list-disc space-y-3 pl-6 text-base leading-relaxed text-tierra-forest-dark/95 sm:text-lg"
+ class="mx-auto mt-6 max-w-2xl list-disc space-y-3 pl-6 text-base leading-relaxed text-tierra-graphite/90 sm:text-lg"
```

### Step 4.6 -- Update ResponsibleInvestment section

**File to modify:** `src/components/sections/ResponsibleInvestment.astro`

Key class changes:

```diff
- class="bg-tierra-white px-4 py-16 text-tierra-forest-dark sm:px-6 sm:py-24"
+ class="bg-tierra-cream px-4 py-16 sm:px-6 sm:py-24"
```

Update heading:

```diff
- class="text-center text-2xl font-bold tracking-tight sm:text-3xl"
+ class="text-center text-2xl tracking-tight sm:text-3xl"
```

Update all `text-tierra-forest-dark/95` to `text-tierra-graphite/90`.

### Step 4.7 -- Update Team section

**File to modify:** `src/components/sections/Team.astro`

Key class changes:

```diff
- class="bg-tierra-sage/10 px-4 py-16 text-tierra-forest-dark sm:px-6 sm:py-24"
+ class="bg-tierra-sand px-4 py-16 sm:px-6 sm:py-24"
```

Update heading:

```diff
- class="text-center text-2xl font-bold tracking-tight sm:text-3xl"
+ class="text-center text-2xl tracking-tight sm:text-3xl"
```

Update name text:

```diff
- class="text-lg font-semibold text-tierra-forest-dark"
+ class="text-lg font-semibold text-tierra-ink"
```

Update role and body text:

```diff
- text-tierra-forest-dark/95
+ text-tierra-graphite/90
```

### Step 4.8 -- Update Research section

**File to modify:** `src/components/sections/Research.astro`

Key class changes:

```diff
- class="bg-tierra-sage/10 px-4 py-16 text-tierra-forest-dark sm:px-6 sm:py-24"
+ class="bg-tierra-sand px-4 py-16 sm:px-6 sm:py-24"
```

Update heading:

```diff
- class="text-center text-2xl font-bold tracking-tight sm:text-3xl"
+ class="text-center text-2xl tracking-tight sm:text-3xl"
```

Update `text-tierra-forest-dark/95` to `text-tierra-graphite/90`.

Update research link items:

```diff
- class="text-tierra-forest underline decoration-tierra-mid underline-offset-4 hover:decoration-tierra-forest ..."
+ class="text-tierra-forest underline decoration-tierra-stone underline-offset-4 hover:decoration-tierra-forest ..."
```

### Step 4.9 -- Update PartnerWithUs section

**File to modify:** `src/components/sections/PartnerWithUs.astro`

Key class changes:

```diff
- class="bg-tierra-white px-4 py-16 text-tierra-forest-dark sm:px-6 sm:py-24"
+ class="bg-tierra-cream px-4 py-16 sm:px-6 sm:py-24"
```

Update heading:

```diff
- class="text-center text-2xl font-bold tracking-tight sm:text-3xl"
+ class="text-center text-2xl tracking-tight sm:text-3xl"
```

Update body text:

```diff
- text-tierra-forest-dark/95
+ text-tierra-graphite/90
```

Update primary CTA to match new button style:

```diff
- class="inline-flex items-center justify-center rounded-md bg-tierra-forest px-5 py-2.5 font-medium text-tierra-white transition hover:bg-tierra-forest-dark focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2"
+ class="inline-flex items-center justify-center rounded-lg bg-tierra-lime px-8 py-3.5 font-semibold text-tierra-forest-dark shadow-sm transition hover:bg-tierra-lime/90 focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2"
```

Update ghost CTA:

```diff
- class="inline-flex items-center justify-center rounded-md border border-tierra-forest bg-transparent px-5 py-2.5 font-medium text-tierra-forest transition hover:bg-tierra-sage/20 focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2"
+ class="inline-flex items-center justify-center rounded-lg border-2 border-tierra-stone px-8 py-3.5 font-semibold text-tierra-ink transition hover:border-tierra-forest hover:text-tierra-forest focus:outline-none focus:ring-2 focus:ring-tierra-forest focus:ring-offset-2"
```

### Testing (Phase 4)

1. `pnpm test` -- all existing tests + stats data tests pass
2. `pnpm build` -- no errors
3. `pnpm dev`:
   - WhyModel cards: white bg, rounded-xl, stone border, icons visible, hover lift effect
   - WhereFocused: project summary card, no "Visual coming soon"
   - All sections use correct alternating bg (cream/sand)
   - Text is graphite, headings are ink
   - CTAs are consistent (lime primary, ghost secondary)
4. `pnpm check && pnpm lint`
5. Visual audit: scroll through all homepage sections confirming consistent styling

### Commit Point (Phase 4)

```text
feat(sections): upgrade cards, fix WhereFocused, apply new color system

- Add SVG icons to WhyModel pillar cards with rounded-xl card styling
- Replace WhereFocused placeholder with project summary card
- Update all sections: cream/sand backgrounds, graphite/ink text colors
- Standardize CTA buttons to lime primary + ghost secondary
- Create PillarIcon component for reusable SVG icons
```

---

## Phase 5: Motion and Interactions

**Goal:** Add scroll-reveal system using IntersectionObserver and CSS classes.

### Step 5.1 -- Add reveal CSS classes to global.css

**File to modify:** `src/styles/global.css`

Add after the `@layer base` block:

```css
@layer components {
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### Step 5.2 -- Create scroll-reveal script

**File to create:** `src/scripts/scroll-reveal.ts`

```ts
function initScrollReveal(): void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll(".reveal");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

initScrollReveal();
```

### Step 5.3 -- Add reveal classes to sections

**File to modify:** `src/components/sections/WhyModel.astro`

Add `reveal` class to each card `<article>`:

```diff
- <article class="flex h-full flex-col rounded-xl border ...">
+ <article class="reveal flex h-full flex-col rounded-xl border ...">
```

**File to modify:** `src/components/sections/WhereFocused.astro`

Add `reveal` to the project summary card:

```diff
- <div class="mx-auto mt-10 max-w-2xl rounded-xl border ...">
+ <div class="reveal mx-auto mt-10 max-w-2xl rounded-xl border ...">
```

**File to modify:** `src/components/sections/StatsStrip.astro`

Add `reveal` to each stat item:

```diff
- <div class="text-center">
+ <div class="reveal text-center">
```

**File to modify:** `src/components/sections/ValueGovernance.astro`

Add `reveal` to the bullet list:

```diff
- <ul class="mx-auto mt-6 max-w-2xl list-disc ...">
+ <ul class="reveal mx-auto mt-6 max-w-2xl list-disc ...">
```

**File to modify:** `src/components/sections/ResponsibleInvestment.astro`

Add `reveal` to the bullet list:

```diff
- <ul class="mx-auto mt-6 max-w-2xl list-disc ...">
+ <ul class="reveal mx-auto mt-6 max-w-2xl list-disc ...">
```

**File to modify:** `src/components/sections/PartnerWithUs.astro`

Add `reveal` to the CTA buttons container:

```diff
- <div class="mt-10 flex flex-col items-center ...">
+ <div class="reveal mt-10 flex flex-col items-center ...">
```

### Step 5.4 -- Load scroll-reveal script from BaseLayout

**File to modify:** `src/layouts/BaseLayout.astro`

Add just before the closing `</body>` tag:

```astro
    <script src="../scripts/scroll-reveal.ts" />
  </body>
</html>
```

### Testing (Phase 5)

1. `pnpm build` -- no errors
2. `pnpm dev`:
   - Scroll down the page -- elements fade in and slide up as they enter the viewport
   - Each element only animates once (observer unobserves after)
   - DevTools: set `prefers-reduced-motion: reduce` -- all elements visible immediately, no animation
   - Verify no layout shift (elements occupy space even before reveal)
3. `pnpm check && pnpm lint`
4. Run Lighthouse performance audit -- check for CLS (Cumulative Layout Shift) issues

**Important CLS note:** The `.reveal` class uses `opacity: 0` and `translateY(24px)`. Since `translate` does not affect layout flow, there should be zero CLS. If any CLS is detected, investigate and fix.

### Commit Point (Phase 5)

```text
feat(motion): add scroll-reveal system with reduced-motion respect

- Add .reveal/.visible CSS classes with opacity + translateY transition
- Create IntersectionObserver script (~15 lines) for viewport detection
- Apply reveal to cards, stats, lists, and CTA sections
- Skip all animation when prefers-reduced-motion is enabled
```

---

## Phase 6: Footer Redesign

**Goal:** Replace single-row footer with 3-column layout, logo, location, copyright.

### Step 6.1 -- Rewrite Footer component

**File to modify:** `src/components/Footer.astro`

Replace entire file:

```astro
---
import { Image } from "astro:assets";
import Link from "./Link.astro";
import logoHorizontal from "../assets/tierra-viva-investments-logo-horizontal.png";

const currentYear = new Date().getFullYear();
---

<footer
  class="bg-tierra-forest-dark px-4 py-12 text-white sm:px-6 sm:py-16"
  role="contentinfo"
>
  <div class="mx-auto max-w-5xl">
    <!-- Top: Logo + Location -->
    <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Image
          src={logoHorizontal}
          alt="Tierra Viva Investments"
          width={180}
          height={42}
          class="h-10 w-auto brightness-0 invert"
          decoding="async"
          loading="lazy"
        />
        <p class="mt-3 text-sm text-white/60">Santiago, Dominican Republic</p>
      </div>
    </div>

    <!-- Navigation columns -->
    <div class="mt-10 grid gap-8 sm:grid-cols-3">
      <!-- Company column -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/80">
          Company
        </h3>
        <ul class="mt-4 space-y-3" role="list">
          <li>
            <Link
              href="/about"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/team"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Team
            </Link>
          </li>
        </ul>
      </div>

      <!-- Investors column -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/80">
          Investors
        </h3>
        <ul class="mt-4 space-y-3" role="list">
          <li>
            <Link
              href="/strategy"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Strategy
            </Link>
          </li>
          <li>
            <Link
              href="/platform"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Platform
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <!-- Legal column -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white/80">
          Legal
        </h3>
        <ul class="mt-4 space-y-3" role="list">
          <li>
            <Link
              href="/privacy"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/jurisdiction"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Jurisdiction Notice
            </Link>
          </li>
          <li>
            <Link
              href="/responsible-investment"
              class="text-sm text-white/60 transition hover:text-tierra-lime focus:outline-none focus:ring-2 focus:ring-tierra-lime focus:ring-offset-2 focus:ring-offset-tierra-forest-dark"
            >
              Responsible Investment
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="mt-10 border-t border-white/10 pt-8">
      <p class="text-center text-xs leading-relaxed text-white/40">
        This website is for informational purposes only and does not constitute
        an offer to sell or a solicitation of an offer to buy any securities.
        Any offering, if pursued, will be made only through formal materials
        provided to qualified individuals in compliance with applicable laws.
      </p>
      <p class="mt-4 text-center text-xs text-white/40">
        &copy; {currentYear} Tierra Viva Investments. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

**Key changes:**

- Logo at top with `brightness-0 invert` to make it white on dark bg
- Location text below logo
- 3 columns: Company (About, Team), Investors (Strategy, Platform, Contact), Legal (Privacy, Jurisdiction, Responsible Investment)
- Column headings: uppercase, tracking-wider, white/80
- Links: white/60 base, hover to tierra-lime (no underline)
- Disclaimer moved to bottom with border-t separator
- Dynamic copyright year

### Testing (Phase 6)

1. `pnpm build` -- no errors
2. `pnpm dev`:
   - Footer shows 3 columns at sm+ breakpoint, stacked on mobile
   - Logo renders white on dark bg
   - "Santiago, Dominican Republic" visible below logo
   - All 8 footer links navigate correctly (test each)
   - Disclaimer text is small/muted at bottom
   - Copyright shows current year
   - All links have correct focus styles (ring offset matches dark bg)
3. `pnpm check && pnpm lint`
4. Test footer links: click each to confirm navigation works with base path

### Commit Point (Phase 6)

```text
feat(footer): redesign with 3-column layout, logo, location, copyright

- Add logo with brightness/invert filter for dark background
- Create Company, Investors, Legal navigation columns
- Add location (Santiago, Dominican Republic)
- Move disclaimer to bottom with border separator
- Add dynamic copyright year
```

---

## Phase 7: Inner Page Polish

**Goal:** Apply the new design system (typography, colors, spacing) to all inner pages consistently.

### Step 7.1 -- Update BaseLayout for consistent Footer

**File to modify:** `src/layouts/BaseLayout.astro`

Add Footer import and render it in the layout so inner pages get it automatically:

```astro
---
import "../styles/global.css";
import { SITE_TITLE } from "../consts";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

const DEFAULT_DESCRIPTION =
  "Tierra Viva builds education-anchored communities across Latin America -- where learning, enterprise, and long-term investment create shared prosperity.";

type Props = {
  title?: string;
  description?: string;
};

const { title, description = DEFAULT_DESCRIPTION } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} />
    <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.ico`} />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>{title ?? SITE_TITLE}</title>
  </head>
  <body>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded focus:bg-tierra-lime focus:px-3 focus:py-2 focus:text-tierra-forest-dark focus:outline-none"
    >
      Skip to main content
    </a>
    <Header />
    <main id="main-content" tabindex="-1" class="relative z-0">
      <slot />
    </main>
    <Footer />
    <script src="../scripts/scroll-reveal.ts" />
  </body>
</html>
```

**IMPORTANT:** Since Footer is now in BaseLayout, remove the `<Footer />` import and usage from `src/pages/index.astro`:

**File to modify:** `src/pages/index.astro`

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { SITE_TITLE } from "../consts";
import Hero from "../components/sections/Hero.astro";
import StatsStrip from "../components/sections/StatsStrip.astro";
import WhyModel from "../components/sections/WhyModel.astro";
import WhereFocused from "../components/sections/WhereFocused.astro";
import ValueGovernance from "../components/sections/ValueGovernance.astro";
import ResponsibleInvestment from "../components/sections/ResponsibleInvestment.astro";
import Team from "../components/sections/Team.astro";
import Research from "../components/sections/Research.astro";
import PartnerWithUs from "../components/sections/PartnerWithUs.astro";
---

<BaseLayout title={SITE_TITLE}>
  <Hero />
  <StatsStrip />
  <WhyModel />
  <WhereFocused />
  <ValueGovernance />
  <ResponsibleInvestment />
  <Team />
  <Research />
  <PartnerWithUs />
</BaseLayout>
```

(Removed `import Footer` and `<Footer />` -- it now renders from BaseLayout.)

### Step 7.2 -- Create shared inner page article class pattern

All inner pages follow the same pattern. Below is the class string to use for the `<article>` wrapper on every inner page:

```html
class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24"
```

This is already the pattern used. The updates are purely color/typography.

### Step 7.3 -- Update About page

**File to modify:** `src/pages/about.astro`

Changes:

```diff
- <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">About Tierra Viva</h1>
+ <h1 class="text-2xl tracking-tight sm:text-3xl">About Tierra Viva</h1>
```

Update all body text:

```diff
- text-tierra-forest-dark/95
+ text-tierra-graphite/90
```

Update inline links:

```diff
- class="font-medium text-tierra-forest underline decoration-tierra-mid underline-offset-4 hover:decoration-tierra-forest ..."
+ class="font-medium text-tierra-forest underline decoration-tierra-stone underline-offset-4 hover:decoration-tierra-forest ..."
```

(Change `decoration-tierra-mid` to `decoration-tierra-stone` for subtler default underline.)

### Step 7.4 -- Update Strategy page

**File to modify:** `src/pages/strategy.astro`

Same pattern as About:

- Remove `font-bold` from h1 (display font carries its own weight)
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- Subheadings (`h2`): no change needed (they inherit display font from base)
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.5 -- Update Platform page

**File to modify:** `src/pages/platform.astro`

Same pattern:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- Update pillar card borders: `border-tierra-forest/10` -> `border-tierra-stone/40` and `bg-tierra-sage/5` -> `bg-white`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.6 -- Update Projects page

**File to modify:** `src/pages/projects.astro`

Same color/typography pattern:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.7 -- Update Team page

**File to modify:** `src/pages/team.astro`

Same pattern:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- `text-tierra-forest-dark` (name) -> `text-tierra-ink`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.8 -- Update Contact page

**File to modify:** `src/pages/contact.astro`

Same pattern for text colors plus update CTAs to match new button style:

Primary CTA:

```diff
- class="inline-flex items-center justify-center rounded-md bg-tierra-forest px-5 py-2.5 font-medium text-tierra-white transition hover:bg-tierra-forest-dark ..."
+ class="inline-flex items-center justify-center rounded-lg bg-tierra-lime px-8 py-3.5 font-semibold text-tierra-forest-dark shadow-sm transition hover:bg-tierra-lime/90 ..."
```

Ghost CTA:

```diff
- class="inline-flex items-center justify-center rounded-md border border-tierra-forest bg-transparent px-5 py-2.5 font-medium text-tierra-forest transition hover:bg-tierra-sage/20 ..."
+ class="inline-flex items-center justify-center rounded-lg border-2 border-tierra-stone px-8 py-3.5 font-semibold text-tierra-ink transition hover:border-tierra-forest hover:text-tierra-forest ..."
```

Email link: `decoration-tierra-mid` -> `decoration-tierra-stone`.

### Step 7.9 -- Update Responsible Investment page

**File to modify:** `src/pages/responsible-investment.astro`

Same pattern:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.10 -- Update Privacy page

**File to modify:** `src/pages/privacy.astro`

Same pattern:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.11 -- Update Jurisdiction page

**File to modify:** `src/pages/jurisdiction.astro`

Same pattern:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.12 -- Update Research index page

**File to modify:** `src/pages/research/index.astro`

Same color pattern plus update research cards:

- Remove `font-bold` from h1
- `text-tierra-forest-dark/95` -> `text-tierra-graphite/90`
- `text-tierra-forest-dark/70` -> `text-tierra-graphite/60`
- Card borders: `border-tierra-forest/10` -> `border-tierra-stone/40`
- Card bg: `bg-tierra-sage/5` -> `bg-white`
- Card hover: `hover:border-tierra-forest/20 hover:bg-tierra-sage/10` -> `hover:border-tierra-stone hover:shadow-sm`
- `decoration-tierra-mid` -> `decoration-tierra-stone`

### Step 7.13 -- Check research/[slug].astro

**File to check:** `src/pages/research/[slug].astro`

Apply the same text color and heading font updates if it follows the same pattern.

### Testing (Phase 7)

1. `pnpm build` -- no errors (all pages compile)
2. `pnpm dev`:
   - Navigate to every inner page and verify:
     - Heading renders in DM Serif Display
     - Body text is graphite, not forest-dark
     - Links have stone underline by default, forest on hover
     - CTAs on Contact page match Hero button style
     - Footer appears on all pages (from BaseLayout)
     - No duplicate footers on index page
   - Pages to check: `/about`, `/strategy`, `/platform`, `/projects`, `/team`, `/contact`, `/responsible-investment`, `/privacy`, `/jurisdiction`, `/research`
3. `pnpm check && pnpm lint`
4. `pnpm test` -- all tests still pass

### Commit Point (Phase 7)

```text
feat(pages): apply visual redesign to all inner pages

- Move Footer into BaseLayout for site-wide consistency
- Remove font-bold from headings (display font handles weight)
- Update text colors: graphite for body, ink for headings
- Update link underlines: stone default, forest on hover
- Standardize CTA buttons on Contact page
- Update research cards to use new card styling
```

---

## Summary of All Files Touched

### Files Created (6)

| File                                       | Phase |
| ------------------------------------------ | ----- |
| `src/data/stats.ts`                        | 3     |
| `src/data/stats.test.ts`                   | 3     |
| `src/scripts/count-up.ts`                  | 3     |
| `src/components/sections/StatsStrip.astro` | 3     |
| `src/components/PillarIcon.astro`          | 4     |
| `src/scripts/scroll-reveal.ts`             | 5     |

### Files Modified (25)

| File                                                  | Phases  |
| ----------------------------------------------------- | ------- |
| `src/styles/global.css`                               | 1, 5    |
| `src/layouts/BaseLayout.astro`                        | 1, 5, 7 |
| `src/components/Header.astro`                         | 1       |
| `src/components/Footer.astro`                         | 6       |
| `src/components/sections/Hero.astro`                  | 2       |
| `src/components/sections/WhyModel.astro`              | 4, 5    |
| `src/components/sections/WhereFocused.astro`          | 4, 5    |
| `src/components/sections/ValueGovernance.astro`       | 4, 5    |
| `src/components/sections/ResponsibleInvestment.astro` | 4, 5    |
| `src/components/sections/Team.astro`                  | 4       |
| `src/components/sections/Research.astro`              | 4       |
| `src/components/sections/PartnerWithUs.astro`         | 4, 5    |
| `src/data/pillars.ts`                                 | 4       |
| `src/pages/index.astro`                               | 3, 7    |
| `src/pages/about.astro`                               | 7       |
| `src/pages/strategy.astro`                            | 7       |
| `src/pages/platform.astro`                            | 7       |
| `src/pages/projects.astro`                            | 7       |
| `src/pages/team.astro`                                | 7       |
| `src/pages/contact.astro`                             | 7       |
| `src/pages/responsible-investment.astro`              | 7       |
| `src/pages/privacy.astro`                             | 7       |
| `src/pages/jurisdiction.astro`                        | 7       |
| `src/pages/research/index.astro`                      | 7       |
| `src/pages/research/[slug].astro`                     | 7       |

### Dependencies

- No new npm packages required
- Google Fonts loaded via CDN (no install needed)
- All new features use vanilla CSS + TypeScript (no additional libraries)

### Phase Dependency Graph

```text
Phase 1 (Foundation) --> Phase 2 (Hero)
Phase 1 (Foundation) --> Phase 3 (Stats Strip)
Phase 1 (Foundation) --> Phase 4 (Section Upgrades)
Phase 1 (Foundation) --> Phase 5 (Motion) -- depends on Phase 4 for reveal targets
Phase 1 (Foundation) --> Phase 6 (Footer)
Phase 1 (Foundation) --> Phase 7 (Inner Pages) -- depends on Phase 6 for BaseLayout Footer
```

Phase 1 must go first. Phases 2, 3, 4 can run in any order after Phase 1. Phase 5 depends on Phase 4 (needs the elements to attach `.reveal` to). Phase 6 should come before Phase 7 (so Footer in BaseLayout is ready). Phase 7 is last.

### Risk Mitigation

1. **Google Fonts blocking render:** The `display=swap` parameter in the font URL ensures text renders immediately with fallback fonts while web fonts load. This avoids FOIT (Flash of Invisible Text).

2. **CLS from scroll reveal:** The `.reveal` class uses `transform: translateY()` which does not affect layout. Opacity changes also do not cause CLS. If Lighthouse flags CLS, check for elements that affect layout flow.

3. **Dark-to-cream hero transition:** The header `bg-white` -> `bg-tierra-cream` update in Phase 1 ensures header blends with the new hero. If the header needs to contrast more, add `border-b border-tierra-stone/40`.

4. **Footer duplication:** Phase 7 moves Footer into BaseLayout. The index page must have its `<Footer />` removed to avoid duplication. This is explicitly called out in Step 7.1.

5. **Image invert filter on logo:** The footer logo uses `brightness-0 invert` to convert any colored logo to white. This works for PNG logos with transparency. If the logo has a non-transparent background, a separate white logo variant would be needed (check the asset file).

---

## Post-Implementation Verification Checklist

- [ ] `pnpm check` passes (Astro type checking)
- [ ] `pnpm lint` passes (ESLint + Prettier + Markdownlint + Stylelint)
- [ ] `pnpm test` passes (Vitest)
- [ ] `pnpm build` succeeds (static build)
- [ ] Visual audit: all pages match design spec
- [ ] Mobile responsive: 375px, 768px, 1024px, 1440px
- [ ] Accessibility: keyboard navigation, screen reader, focus rings
- [ ] Reduced motion: animations disabled when preference set
- [ ] Lighthouse: Performance 90+, Accessibility 100, Best Practices 100
- [ ] All links work correctly with base path
- [ ] Footer appears on every page (no duplicates)
- [ ] No horizontal scroll on any viewport size
