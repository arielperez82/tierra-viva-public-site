---
initiative: I01-VR
initiative_name: Tierra Viva Website Visual Redesign
type: charter
status: approved
owner: Ramon Marmolejos
created: 2026-02-11
updated: 2026-02-11
---

# Project Charter: Tierra Viva Website Visual Redesign

## 1. Initiative Overview

| Field             | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| Initiative ID     | I01-VR                                                 |
| Initiative Name   | Tierra Viva Website Visual Redesign                    |
| Design Direction  | Proposal A -- Institutional Elegance                   |
| Owner             | Ramon Marmolejos, Managing Partner                     |
| Charter Date      | 2026-02-11                                             |
| Target Completion | Phase 1 (Foundation + Homepage): 3 weeks from start    |
| Target Completion | Phase 2 (Components + Navigation): 2 weeks after Ph. 1 |

## 2. Problem Statement

An expert design audit of the current Tierra Viva public website identified six systemic deficiencies that undermine the site's ability to communicate institutional credibility to prospective investors and partners:

**2.1 Typography relies entirely on system fonts.** The body uses `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` (see `src/styles/global.css`). No display or serif typeface is loaded. Headlines are rendered in the same sans-serif stack as body text, producing a flat visual hierarchy with no typographic distinction between headings, body copy, and data.

**2.2 No imagery, illustration, or visual media of any kind.** Every section is text-only. The "Where We're Focused" section explicitly renders a placeholder box reading "Visual coming soon" (`src/components/sections/WhereFocused.astro`, line 40-42). No SVGs, icons, maps, photographs, or diagrams appear anywhere on the site.

**2.3 Monotonous section layout.** All eight homepage sections follow the same structural template: centered heading, centered paragraph(s), optional centered list, optional centered link. There is no asymmetry, no card grids with visual weight, no alternating content/visual columns, and no variation in background treatment beyond subtle `bg-tierra-sage/10` alternation.

**2.4 No motion or interaction design.** The site has zero scroll-triggered animations, no hover state elevation changes on cards, no transition effects on section entry, and no micro-interactions. The only interactive behavior is the mobile menu toggle.

**2.5 No social proof or quantitative impact.** The homepage does not surface any fund statistics, project metrics, or quantitative credibility indicators. Numbers like the $30M fund target, 150 residential units, 250K sqm site area, and 26% target IRR -- all public-safe figures -- are absent from the homepage experience.

**2.6 Narrow color palette limits visual depth.** The current theme defines only greens (`tierra-lime`, `tierra-mid`, `tierra-forest`, `tierra-forest-dark`, `tierra-sage`) plus a single white (`tierra-white`). There are no warm neutrals, no dark editorial tones, and no data-accent colors, resulting in a site that reads as monochromatic.

These deficiencies combine to produce a site that, while functionally correct and accessible, fails to project the institutional sophistication expected by family offices, LPs, and development partners evaluating a $30M real estate fund.

## 3. Goals and Success Metrics

### 3.1 Goals

| #   | Goal                                                                                      |
| --- | ----------------------------------------------------------------------------------------- |
| G1  | Establish a typographic hierarchy that communicates institutional credibility at a glance |
| G2  | Introduce visual variety through layout asymmetry, SVG illustration, and card design      |
| G3  | Surface public-safe fund statistics prominently on the homepage                           |
| G4  | Add tasteful motion design that guides attention without distracting                      |
| G5  | Expand the color palette with warm neutrals and dark editorial tones                      |
| G6  | Upgrade components (cards, buttons, footer) to a cohesive design system                   |
| G7  | Maintain or improve current Lighthouse performance, accessibility, and SEO scores         |

### 3.2 Success Metrics

| Metric                               | Current State            | Target                              | Measurement Method              |
| ------------------------------------ | ------------------------ | ----------------------------------- | ------------------------------- |
| Lighthouse Performance               | Baseline (to measure)    | >= 90                               | Lighthouse CI                   |
| Lighthouse Accessibility             | Baseline (to measure)    | >= 95                               | Lighthouse CI                   |
| Cumulative Layout Shift (CLS)        | Near 0 (no web fonts)    | < 0.1 (with web fonts loaded)       | Lighthouse / Web Vitals         |
| Largest Contentful Paint (LCP)       | Baseline (to measure)    | < 2.5s                              | Lighthouse / Web Vitals         |
| Font file payload                    | 0 KB                     | < 150 KB total (woff2, all 3 fonts) | Build output audit              |
| Visual placeholder count             | 1 ("Visual coming soon") | 0                                   | Manual audit                    |
| Homepage sections w/ distinct layout | 0 (all centered text)    | >= 5 of 8 sections                  | Design review                   |
| Homepage statistics displayed        | 0                        | 4 key metrics visible               | Manual audit                    |
| Card hover interaction               | None                     | Shadow elevation + subtle transform | Manual QA                       |
| Scroll-reveal animations             | 0 sections               | All below-fold sections             | Manual QA + reduced-motion test |

## 4. Scope

### 4.1 In Scope

- **Typography system**: Load DM Serif Display (headlines), Inter (body/UI), IBM Plex Mono (statistics/data) via Google Fonts with `font-display: swap` and preconnect hints
- **Color token expansion**: Add `tierra-cream`, `tierra-sand`, `tierra-stone`, `tierra-graphite`, `tierra-ink` to the Tailwind CSS `@theme` block in `global.css`
- **Homepage redesign** (all 8 sections):
  - Hero: Asymmetric layout with serif headline left, CSS geometric art right, cream background
  - Stats Strip (new section): Dark forest background, lime mono numbers, 4 public-safe metrics
  - Why + Model: Content left, 2x2 pillar card grid right, SVG icons, shadows, hover elevation
  - Where We're Focused: SVG map replacing "Visual coming soon" placeholder
  - Value & Governance: Centered editorial, icon bullets, links to Strategy and Responsible Investment
  - Team: Photo-ready card layout with placeholder avatar, Ramon highlight
  - Research: Article list style with title, date, and description for 3 featured articles
  - Partner With Us: Dark forest background, serif headline, two distinct CTAs
- **Component system**: Cards (rounded-xl, shadows, hover), buttons (generous padding, shadow, hover), scroll-reveal animation utility
- **Header upgrade**: Scroll-triggered transparency/backdrop-blur behavior
- **Footer upgrade**: Multi-column layout with logo, location ("Santiago, Dominican Republic"), navigation groups
- **Inner page typography**: Apply new type hierarchy (serif headings, Inter body) to all existing inner pages (About, Strategy, Platform, Projects, Responsible Investment, Team, Research, Contact, Privacy, Jurisdiction)
- **Accessibility preservation**: All animations respect `prefers-reduced-motion`, color contrast ratios meet WCAG 2.1 AA, focus styles preserved

### 4.2 Explicitly Out of Scope

- **Photography or raster imagery**: No photographs will be added in this initiative (no team headshots, no project photos, no aerial views). Photo-ready card layouts will use placeholder treatments.
- **New pages or routes**: No new URLs will be created. The homepage section consolidation (removing the separate "Responsible Investment" homepage section, folding key content into "Value & Governance") does not affect the `/responsible-investment` inner page.
- **Content rewriting**: All copy remains as currently defined. Typography and layout changes only.
- **CMS or content management**: No content management system integration.
- **Backend or API changes**: The site remains a fully static Astro build.
- **Fund financial terms**: No LP terms, commitment minimums, fee structures, or fund legal details will appear on any public page. Statistics are limited to: $30M target fund, 150 units, 250K sqm, 26% target IRR.
- **Internationalization / Spanish version**: English only for this initiative.
- **Third-party analytics or tracking**: No analytics integration in this scope.
- **Framework migration**: The site remains on Astro + Tailwind CSS v4. No React/Vue/Svelte islands.

## 5. Design Direction: Institutional Elegance

### 5.1 Typography

| Role         | Typeface         | Source       | Weight(s)     | Usage                                  |
| ------------ | ---------------- | ------------ | ------------- | -------------------------------------- |
| Headlines    | DM Serif Display | Google Fonts | 400           | h1, h2, hero text, section titles      |
| Body / UI    | Inter            | Google Fonts | 400, 500, 600 | Paragraphs, nav, buttons, labels       |
| Data / Stats | IBM Plex Mono    | Google Fonts | 500, 700      | Statistics strip, numerical highlights |

### 5.2 Color Palette

Existing brand colors (retained without modification):

| Token                | Hex       | Role                 |
| -------------------- | --------- | -------------------- |
| `tierra-lime`        | `#98e22e` | Primary accent       |
| `tierra-mid`         | `#4e9c3d` | Secondary green      |
| `tierra-forest`      | `#0f7335` | Primary brand green  |
| `tierra-forest-dark` | `#0b3212` | Deep green / dark bg |
| `tierra-sage`        | `#bcd69a` | Soft green accent    |

New additions:

| Token             | Hex       | Role                  |
| ----------------- | --------- | --------------------- |
| `tierra-cream`    | `#faf8f5` | Warm light background |
| `tierra-sand`     | `#f0ebe3` | Card/surface bg       |
| `tierra-stone`    | `#d4cdc4` | Borders, dividers     |
| `tierra-graphite` | `#3d3833` | Dark UI text          |
| `tierra-ink`      | `#1a1714` | Deepest text color    |

### 5.3 Homepage Section Plan

| #   | Section             | Background           | Layout                                         |
| --- | ------------------- | -------------------- | ---------------------------------------------- |
| 1   | Hero                | `tierra-cream`       | Asymmetric: serif headline left, CSS art right |
| 2   | Stats Strip         | `tierra-forest-dark` | Horizontal 4-stat bar, mono numbers            |
| 3   | Why + Model         | `tierra-cream`       | Content left, 2x2 card grid right              |
| 4   | Where We're Focused | `tierra-sand`        | Text + SVG map of DR / Santiago                |
| 5   | Value & Governance  | `tierra-cream`       | Centered editorial, icon bullet list           |
| 6   | Team                | `tierra-sand`        | Photo-ready card grid, Ramon highlight         |
| 7   | Research            | `tierra-cream`       | Article list: title + date + description       |
| 8   | Partner With Us     | `tierra-forest-dark` | Serif headline, two CTAs side by side          |

## 6. Key Constraints

| Constraint                   | Detail                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Technology stack             | Astro + Tailwind CSS v4. No framework additions (no React, Vue, or Svelte islands for this work). |
| No photography               | No raster images available yet. All visuals must be CSS-generated or inline SVG.                  |
| Brand color preservation     | All five existing green tokens must remain exactly as defined. New colors are additive only.      |
| Regulatory compliance        | Fund disclaimer must remain in footer. No fund financial terms on public pages.                   |
| Performance budget           | Web font payload must stay under 150 KB total (woff2). LCP must remain under 2.5s.                |
| Accessibility                | WCAG 2.1 AA compliance. All new animations must respect `prefers-reduced-motion: reduce`.         |
| Existing URL structure       | No routes added, removed, or renamed.                                                             |
| Existing test infrastructure | Vitest + existing lint pipeline must continue to pass.                                            |

## 7. Stakeholders and RACI

| Activity                     | Ramon Marmolejos (Owner) | Design/Dev Lead | Content Reviewer | Legal/Compliance |
| ---------------------------- | :----------------------: | :-------------: | :--------------: | :--------------: |
| Approve design direction     |            A             |        R        |        C         |        I         |
| Define color/type tokens     |            C             |      R, A       |        I         |        I         |
| Build homepage sections      |            I             |      R, A       |        C         |        I         |
| Build component library      |            I             |      R, A       |        I         |        I         |
| Review/approve copy accuracy |            A             |        I        |        R         |        C         |
| Verify regulatory compliance |            I             |        I        |        C         |       R, A       |
| Approve final homepage       |            A             |        R        |        C         |        C         |
| Performance/accessibility QA |            I             |      R, A       |        I         |        I         |
| Approve inner page updates   |            A             |        R        |        C         |        I         |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed

## 8. Risks and Mitigations

| #   | Risk                                                    | Likelihood | Impact | Mitigation                                                                                                  |
| --- | ------------------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| R1  | Web font loading causes CLS > 0.1 or LCP regression     | Medium     | High   | Use `font-display: swap`, preconnect hints, subset fonts to Latin character set, measure with Lighthouse CI |
| R2  | New warm neutrals clash with existing brand greens      | Low        | Medium | Test all color combinations against WCAG contrast ratios before implementation; design review checkpoint    |
| R3  | Scroll animations feel heavy or cause jank on mobile    | Medium     | Medium | Use CSS-only `@keyframes` + `IntersectionObserver`; no JS animation libraries; test on throttled devices    |
| R4  | SVG map for Dominican Republic is inaccurate or unclear | Low        | Low    | Use simplified, schematic SVG (not geographic precision); label Santiago clearly; design review             |
| R5  | Scope creep into content changes or new pages           | Medium     | High   | Charter explicitly scopes out content rewrites and new routes; backlog enforces existing copy               |
| R6  | CSS geometric art in hero does not render consistently  | Medium     | Medium | Use well-tested CSS techniques (gradients, clip-path, border-radius); test across Chrome, Safari, Firefox   |
| R7  | Inner page updates take longer than estimated           | Medium     | Low    | Inner pages are lower priority (P1); can be deferred to Phase 3 without blocking homepage launch            |
| R8  | Reduced-motion users get degraded experience            | Low        | High   | Ensure non-animated state is visually complete; animations are enhancement only, not load-bearing           |

## 9. Timeline and Phases

### Phase 1: Design Foundation + Homepage (Weeks 1-3)

| Week | Deliverable                                                                    |
| ---- | ------------------------------------------------------------------------------ |
| 1    | Design tokens: typography system (3 fonts), expanded color palette in Tailwind |
| 1    | Hero section redesign (asymmetric layout, cream bg, CSS geometric art)         |
| 1    | Stats Strip (new section, dark bg, mono numbers)                               |
| 2    | Why + Model section (content + card grid, SVG pillar icons, hover states)      |
| 2    | Where We're Focused (SVG map replacing placeholder)                            |
| 2    | Value & Governance (icon bullets, editorial layout)                            |
| 3    | Team section (photo-ready card layout)                                         |
| 3    | Research section (article list style)                                          |
| 3    | Partner With Us (dark bg, serif headline, dual CTAs)                           |
| 3    | Homepage integration testing, Lighthouse audit, accessibility review           |

### Phase 2: Component System + Navigation (Weeks 4-5)

| Week | Deliverable                                                  |
| ---- | ------------------------------------------------------------ |
| 4    | Card component system (rounded-xl, shadows, hover elevation) |
| 4    | Button component system (generous padding, shadow, hover)    |
| 4    | Scroll-reveal animation utility (IntersectionObserver-based) |
| 4    | Header upgrade (scroll-triggered transparency/blur)          |
| 5    | Footer upgrade (multi-column, logo, location, nav groups)    |
| 5    | Component integration across homepage                        |
| 5    | Cross-browser testing, performance regression check          |

### Phase 3: Inner Page Upgrades (Week 6, optional extension)

| Week | Deliverable                                             |
| ---- | ------------------------------------------------------- |
| 6    | Apply serif headings + Inter body to all 10 inner pages |
| 6    | Consistent card/button styles on inner pages            |
| 6    | Final Lighthouse audit, full-site accessibility sweep   |

## 10. Dependencies

| Dependency                    | Type      | Detail                                                         |
| ----------------------------- | --------- | -------------------------------------------------------------- |
| Google Fonts availability     | External  | DM Serif Display, Inter, IBM Plex Mono must remain available   |
| Tailwind CSS v4 theme syntax  | Technical | Color tokens use `@theme` block in `global.css`                |
| Existing Astro build pipeline | Technical | All changes must work with current `astro build` configuration |
| Content approval              | Process   | Any copy adjustments (even punctuation) require owner sign-off |

## 11. Assumptions

1. The design direction "Institutional Elegance" (Proposal A) has been agreed upon and will not be revisited during execution.
2. No photography will become available during this initiative. If photos arrive, they can be integrated in a follow-up initiative.
3. The four public-safe statistics ($30M, 150 units, 250K sqm, 26% IRR) have been cleared for display on the public website.
4. The existing Astro + Tailwind CSS v4 stack is sufficient for all planned visual changes; no additional frameworks or build tools are needed.
5. All work will be done on feature branches and merged via pull request with review.
