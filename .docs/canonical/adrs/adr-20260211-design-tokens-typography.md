---
type: adr
endeavor: tierra-viva-public-site
status: proposed
date: 2026-02-11
supersedes: []
superseded_by: null
---

# ADR-0002: Design token system and custom typography for Institutional Elegance redesign

**Status**: Proposed

**Date**: 2026-02-11

**Decision Makers**: Engineering, Design

**Tags**: design-tokens, typography, performance, tailwind, fonts, css

## Context

The Tierra Viva public site currently operates with a minimal design system: seven color tokens defined in a Tailwind CSS v4 `@theme` block and a system font stack. There are no shadow tokens, no animation tokens, and no custom typography. The site loads zero external font resources.

An approved visual redesign ("Institutional Elegance") requires:

1. **Custom typography** -- three font families to establish a visual hierarchy appropriate for an institutional investment platform operating in Latin America.
2. **Expanded color palette** -- warm neutral tones to complement the existing brand greens and convey the warmth associated with the Tierra Viva brand and Latin American context.
3. **Shadow tokens** -- a card elevation system for interactive surfaces.
4. **Animation tokens** -- scroll-reveal and hover interaction timing.

The current token surface (`src/styles/global.css`) is:

```css
@theme {
  --color-tierra-white: #fffffe;
  --color-tierra-lime: #98e22e;
  --color-tierra-mid: #4e9c3d;
  --color-tierra-forest: #0f7335;
  --color-tierra-forest-dark: #0b3212;
  --color-tierra-sage: #bcd69a;
  --color-tierra-neutral: #0b3212; /* duplicate of forest-dark */
}
```

The body font is set via a `system-ui` stack in the `@layer base` block. The site is statically built with Astro 5.17.1, all CSS is inlined into HTML per ADR-0001, and the site currently achieves strong Core Web Vitals scores with zero external font requests.

### Key tensions

- **Brand expression vs. performance**: Custom fonts add network requests and introduce layout shift risk (CLS) to a site that currently has neither.
- **Token granularity vs. complexity**: A full design token pipeline (Style Dictionary, Figma Tokens) adds tooling overhead; Tailwind's `@theme` block may suffice at this scale.
- **`tierra-neutral` duplication**: The existing `--color-tierra-neutral: #0b3212` is identical to `--color-tierra-forest-dark`. This creates confusion and should be addressed as part of the token expansion.

## Decision

We will expand the Tailwind CSS v4 `@theme` block in `src/styles/global.css` with the following additions:

### 1. Typography: Three Google Fonts families via CDN

| Token            | Font             | Role                       | Weight(s)     |
| ---------------- | ---------------- | -------------------------- | ------------- |
| `--font-display` | DM Serif Display | Headlines, hero text       | 400           |
| `--font-body`    | Inter            | Body copy, UI text         | 400, 500, 600 |
| `--font-mono`    | IBM Plex Mono    | Data tables, metrics, code | 400, 500      |

Font definitions with fallback stacks:

```css
--font-display: "DM Serif Display", Georgia, "Times New Roman", serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "IBM Plex Mono", "JetBrains Mono", monospace;
```

### 2. Font loading strategy

Fonts will be loaded from Google Fonts CDN with the following performance mitigations applied in `BaseLayout.astro`:

```html
<!-- Preconnect to Google Fonts origins (DNS + TLS handshake in parallel) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Font stylesheet with display=swap -->
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**`font-display: swap`** is selected over `font-display: optional` for the following reasons:

- `swap` renders text immediately in the fallback font, then swaps when the custom font arrives. This guarantees text is always visible (no FOIT -- Flash of Invisible Text).
- `optional` may never show the custom font if the network is slow (the browser gives up after ~100ms). On a Latin American audience with variable connectivity, this could mean many users never see the intended typography.
- The tradeoff is that `swap` can cause a Flash of Unstyled Text (FOUT) and a small CLS shift when the swap occurs. We mitigate this with fallback font metrics matching (see below).

**Fallback font metrics matching**: To minimize CLS during the swap, the `@layer base` block will include `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` on `@font-face` declarations for the local fallback fonts. This adjusts the fallback font metrics to closely match each custom font, reducing visible layout shift to near-zero. Tooling such as [Fontaine](https://github.com/unjs/fontaine) or [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) metric tables can generate these values. Example for DM Serif Display against Georgia:

```css
@font-face {
  font-family: "DM Serif Display Fallback";
  src: local("Georgia");
  size-adjust: 104.6%;
  ascent-override: 95%;
  descent-override: 24%;
  line-gap-override: 0%;
}
```

Exact values will be calibrated during implementation using font metric comparison tools.

### 3. Warm neutral color palette

Five new warm neutral tokens replace the conventional gray scale:

| Token                     | Hex       | Role                          |
| ------------------------- | --------- | ----------------------------- |
| `--color-tierra-cream`    | `#faf8f5` | Page backgrounds, cards       |
| `--color-tierra-sand`     | `#f0ebe3` | Section backgrounds, dividers |
| `--color-tierra-stone`    | `#d4cdc4` | Borders, muted elements       |
| `--color-tierra-graphite` | `#3d3833` | Secondary text, captions      |
| `--color-tierra-ink`      | `#1a1714` | Primary text, headings        |

**Rationale for warm neutrals over a standard gray scale**: Pure grays (e.g., Tailwind's `gray-*`) feel clinical and detached. The Tierra Viva brand centers on community, land, and Latin American warmth. A warm neutral palette -- tinted toward yellow/brown undertones -- reinforces this identity at the most fundamental visual level (background and text colors that every visitor sees).

### 4. Shadow tokens

```css
--shadow-card:
  0 1px 3px rgba(26, 23, 20, 0.06), 0 1px 2px rgba(26, 23, 20, 0.04);
--shadow-card-hover:
  0 10px 25px rgba(26, 23, 20, 0.08), 0 4px 10px rgba(26, 23, 20, 0.04);
```

Shadow colors use the `tierra-ink` RGB values (`26, 23, 20`) rather than pure black to maintain warmth in elevation effects.

### 5. Deprecation of `tierra-neutral`

`--color-tierra-neutral: #0b3212` is identical to `--color-tierra-forest-dark` and will be removed. Any references in the codebase will be migrated to `--color-tierra-forest-dark`. This is a breaking change for any downstream consumer referencing the `tierra-neutral` class, but since the site is a static build with no external consumers, the risk is limited to internal template updates.

### 6. Token system scope: Tailwind `@theme` only (no Style Dictionary)

Design tokens will continue to live exclusively in the Tailwind CSS v4 `@theme` block. We will not introduce Style Dictionary, Figma Tokens, or any external token pipeline.

### Proposed `@theme` block (complete)

```css
@theme {
  /* Brand colors (existing, unchanged) */
  --color-tierra-white: #fffffe;
  --color-tierra-lime: #98e22e;
  --color-tierra-mid: #4e9c3d;
  --color-tierra-forest: #0f7335;
  --color-tierra-forest-dark: #0b3212;
  --color-tierra-sage: #bcd69a;

  /* Warm neutrals (new) */
  --color-tierra-cream: #faf8f5;
  --color-tierra-sand: #f0ebe3;
  --color-tierra-stone: #d4cdc4;
  --color-tierra-graphite: #3d3833;
  --color-tierra-ink: #1a1714;

  /* Font families (new) */
  --font-display: "DM Serif Display", Georgia, "Times New Roman", serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", monospace;

  /* Shadows (new) */
  --shadow-card:
    0 1px 3px rgba(26, 23, 20, 0.06), 0 1px 2px rgba(26, 23, 20, 0.04);
  --shadow-card-hover:
    0 10px 25px rgba(26, 23, 20, 0.08), 0 4px 10px rgba(26, 23, 20, 0.04);
}
```

## Alternatives Considered

### Alternative 1: Self-hosted fonts instead of Google Fonts CDN

**Pros:**

- Full control over font-display behavior and subsetting.
- No third-party DNS resolution or TLS handshake (fonts.googleapis.com + fonts.gstatic.com).
- Avoids GDPR/privacy concerns for EU visitors (Google Fonts CDN logs IP addresses).
- Fonts served from same origin, benefiting from existing HTTP/2 connection.
- Compatible with ADR-0001's inlining strategy: `@font-face` CSS would be inlined along with all other styles.

**Cons:**

- Requires manual font file management: downloading, subsetting (latin + latin-ext), and placing WOFF2 files in `public/fonts/`.
- Loses the geo-distributed CDN edge benefit. Google Fonts are served from a globally distributed CDN, and while cross-site caching was eliminated in 2020 by browser cache partitioning, the geo-distributed edge servers still provide faster delivery to Latin American users than GitHub Pages.
- Increases build artifact size (WOFF2 files checked into repo or fetched at build time).
- Must manually keep fonts updated if foundry publishes improvements.

**Why Rejected**: At this project's scale (static site on GitHub Pages, ~12 pages), the operational simplicity of Google Fonts CDN outweighs the self-hosting benefits. The preconnect hints eliminate the DNS/TLS cost, and `display=swap` with fallback metric matching addresses the FOUT/CLS concern. If privacy regulations require it or if the site moves to a CDN with edge caching (Cloudflare, Vercel), we should revisit this decision and self-host.

### Alternative 2: DM Serif Display alternatives -- Playfair Display, Lora, Libre Baskerville

All four are high-quality serif fonts suitable for institutional typography. Evaluation:

| Font                 | x-height | Weight range | Latin-ext | Personality                      | File size (WOFF2, 400) |
| -------------------- | -------- | ------------ | --------- | -------------------------------- | ---------------------- |
| **DM Serif Display** | Medium   | 400 only     | Yes       | Modern editorial, high contrast  | ~18 KB                 |
| Playfair Display     | Tall     | 400-900      | Yes       | High contrast, fashion editorial | ~25 KB                 |
| Lora                 | Tall     | 400-700      | Yes       | Calligraphic, bookish            | ~22 KB                 |
| Libre Baskerville    | Tall     | 400, 700     | Yes       | Classic, conservative, newspaper | ~28 KB                 |

**Why DM Serif Display was selected:**

- **Smallest file size**: ~18 KB for the single weight needed (headlines only use 400). Playfair and Libre Baskerville are 30-55% larger.
- **Single weight is sufficient**: Display type (headlines, hero text) does not require bold or italic variants. DM Serif Display's single weight is a feature, not a limitation -- it keeps the download minimal.
- **Modern editorial tone**: Strikes the right balance between institutional authority and contemporary warmth. Playfair skews fashion/luxury; Libre Baskerville skews newspaper/legal; Lora skews literary/academic.
- **Excellent pairing with Inter**: DM Serif Display's geometric skeleton complements Inter's geometric sans-serif construction. Both share a rationalist design philosophy while providing strong serif/sans contrast.
- **Latin-extended support**: Full coverage for Spanish, Portuguese, and other Latin American languages used in Tierra Viva's markets.

### Alternative 3: Full design token system (Style Dictionary / Figma Tokens)

**Pros:**

- Single source of truth for tokens across platforms (web, mobile, email).
- Automated token transformation to CSS custom properties, JavaScript, iOS, Android.
- Integrates with Figma for designer-developer handoff.
- Industry standard for design systems at scale.

**Cons:**

- Significant tooling overhead: build step, configuration, CI integration.
- Overkill for a single-platform static site with ~20 tokens total.
- Adds a build dependency and maintenance burden.
- Tailwind CSS v4's `@theme` block already generates CSS custom properties that are consumable throughout the codebase via `var()` or Tailwind utility classes.

**Why Rejected**: The site is a single-platform (web), single-framework (Astro + Tailwind) project with fewer than 25 tokens. Tailwind's `@theme` block provides native CSS custom property generation, type-safe utility class integration, and zero additional tooling. Style Dictionary would be appropriate if/when Tierra Viva expands to a multi-platform design system (e.g., React Native app, email templates).

### Alternative 4: `font-display: optional` instead of `font-display: swap`

**Pros:**

- Zero CLS. The browser uses the fallback font if the custom font does not load within ~100ms, never swapping.
- Better Lighthouse CLS scores by definition (no layout shift from font swap).
- Simpler implementation (no need for fallback font metrics matching).

**Cons:**

- On slow connections (common in Latin American rural areas), many users would never see the custom typography. The entire visual redesign could be invisible to a significant portion of the target audience.
- Inconsistent brand experience: some visitors see DM Serif Display, others see Georgia. The brand team approved a specific typographic identity.
- Wastes the font download bandwidth when the font loads after the 100ms window -- the bytes are transferred but never displayed.

**Why Rejected**: The Tierra Viva audience includes users in Latin America with variable network conditions. `font-display: optional` would effectively make the typography redesign invisible to the users who may need the most visual trust signals (institutional investors in emerging markets). The small CLS risk from `swap` is preferable and can be mitigated with fallback font metrics matching.

### Alternative 5: Keep `tierra-neutral` alongside `tierra-forest-dark`

**Pros:**

- No migration needed for existing references.
- Semantic intent differs: "neutral" implies a general-purpose dark color, "forest-dark" implies a specific brand green.

**Cons:**

- Both map to the identical hex value `#0b3212`, which is clearly a brand green, not a neutral.
- The new warm neutral palette (`cream`, `sand`, `stone`, `graphite`, `ink`) provides the true neutral scale. Keeping `tierra-neutral` as a green value would be semantically confusing.
- Duplicate tokens increase cognitive load for developers choosing between them.

**Why Rejected**: The name `tierra-neutral` is misleading for a dark green value, especially now that genuine neutral tokens are being introduced. The migration effort is minimal (grep and replace across ~12 templates).

## Consequences

### Positive

- **Established visual identity**: Custom typography and warm neutrals create the "Institutional Elegance" brand expression that the redesign requires. Headlines in DM Serif Display convey authority; Inter body text ensures readability; warm neutrals reinforce Latin American warmth.
- **Comprehensive token vocabulary**: Developers can express the full design intent using Tailwind utilities (`font-display`, `text-tierra-ink`, `shadow-card`, `bg-tierra-cream`) without writing custom CSS.
- **Reduced token ambiguity**: Removing the duplicate `tierra-neutral` and introducing semantically clear neutral tokens (`cream` through `ink`) eliminates confusion in color selection.
- **Zero tooling overhead**: All tokens remain in Tailwind's `@theme` block with no additional build dependencies, token pipelines, or configuration files.
- **Shadow tokens enable elevation system**: Cards and interactive surfaces can now express depth consistently across the site using `shadow-card` and `shadow-card-hover`.

### Negative

- **Performance regression from external fonts**: The site moves from zero external font requests to three font families loaded from Google Fonts CDN. Estimated impact:
  - **Additional DNS lookup + TLS handshake**: ~50-150ms for `fonts.googleapis.com` and `fonts.gstatic.com` (mitigated by preconnect, but not eliminated).
  - **Font CSS download**: ~1-2 KB (the Google Fonts CSS with `@font-face` declarations).
  - **Font file downloads**: ~55-70 KB total WOFF2 across three families (DM Serif Display 400: ~18 KB, Inter 400+500+600: ~25 KB, IBM Plex Mono 400+500: ~15 KB). These are render-blocking for text using those font families until `swap` triggers.
  - **CLS risk**: `font-display: swap` introduces a layout shift when custom fonts replace fallbacks. Without fallback metrics matching, CLS could be 0.05-0.15 (enough to fail "Good" threshold of 0.1). With metrics matching, expected CLS is < 0.02.
  - **LCP impact**: If the LCP element is a headline using `font-display`, LCP timing depends on DM Serif Display arrival. With preconnect and CDN delivery, expected added latency is 100-300ms on broadband, 300-800ms on 3G.
  - **Interaction with ADR-0001 (inlined CSS)**: The inlined stylesheet will now include the `@font-face` fallback declarations and font metric overrides, increasing per-page HTML size by ~500 bytes. The Google Fonts CSS itself is external (not inlined), which introduces one external CSS request that is partially at odds with ADR-0001's goal of zero external CSS. However, this external CSS is non-render-blocking when `display=swap` is used, so it does not re-introduce the render-blocking problem that ADR-0001 solved.
- **Third-party dependency**: Google Fonts CDN is a third-party service. If it experiences downtime, font loading fails silently (fallback fonts render, but brand typography is absent). Google Fonts has historically excellent uptime, but it is a dependency outside our control.
- **Privacy consideration**: Google Fonts CDN serves fonts from `fonts.gstatic.com`, which receives the visitor's IP address. This may have GDPR implications for EU visitors. The site's current audience is primarily Latin American, so this is low risk today but should be monitored if the audience expands to the EU.

### Neutral

- **Token count grows from 7 to ~18**: This is a manageable increase. The `@theme` block remains readable and maintainable at this scale. If token count exceeds ~40, consider organizing into separate files or adopting a token pipeline.
- **Fallback font metrics matching requires calibration**: The `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` values need to be measured against each custom/fallback font pair. This is a one-time implementation cost (~1-2 hours) with tooling assistance.
- **IBM Plex Mono may be underutilized initially**: The monospace font is included for data tables and metrics displays. If these components are not built in the near term, the font download is wasted bytes. Consider lazy-loading it (removing from the initial Google Fonts request and loading on-demand when data components mount) if it is not needed on the landing pages.

## Implementation Notes

### Font loading in BaseLayout.astro

Add the following to the `<head>` in `src/layouts/BaseLayout.astro`, before the `<title>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### Migration of `tierra-neutral` references

Search and replace across all `.astro` files:

- `tierra-neutral` --> `tierra-forest-dark` (for any remaining references to the brand green)
- Verify no regressions with `pnpm build && pnpm test`

### Verification

- **Performance**: Run `pnpm lighthouse:audit` after implementation. Compare LCP, CLS, and FCP against pre-change baseline. Acceptable thresholds:
  - LCP: < 2.5s (Good)
  - CLS: < 0.1 (Good), target < 0.05 with metrics matching
  - FCP: < 1.8s (Good)
- **Visual**: Verify DM Serif Display renders on headlines, Inter on body, IBM Plex Mono on data elements across all ~12 pages.
- **Fallback**: Disable network access to `fonts.googleapis.com` in DevTools and verify the site remains fully readable with fallback fonts (Georgia, system-ui, JetBrains Mono / monospace).
- **Accessibility**: Verify color contrast ratios for all new neutral token combinations against WCAG 2.1 AA:
  - `tierra-ink` on `tierra-cream`: expected ratio ~15:1 (passes AAA)
  - `tierra-graphite` on `tierra-cream`: expected ratio ~7:1 (passes AA)
  - `tierra-graphite` on `tierra-sand`: expected ratio ~5.5:1 (passes AA for normal text)

**When to revisit:**

| What to monitor               | Revisit if                                                                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Font file size**            | Total WOFF2 download exceeds 100 KB (e.g., if additional weights are added). Consider subsetting or self-hosting.                                                           |
| **CLS score**                 | Post-implementation CLS exceeds 0.1 despite fallback metrics matching. Consider `font-display: optional` for non-critical fonts (mono) or self-hosting for faster delivery. |
| **Audience geography**        | Significant EU audience emerges. Self-host fonts to avoid GDPR concerns with Google Fonts CDN.                                                                              |
| **Token count**               | Token count exceeds ~40. Consider organizing tokens into categorized files or evaluating Style Dictionary.                                                                  |
| **IBM Plex Mono usage**       | Monospace font is not used on any landing page after 3 months. Remove from initial font request and lazy-load on-demand.                                                    |
| **Google Fonts availability** | Any observed downtime or performance degradation from Google Fonts CDN. Migrate to self-hosted WOFF2 files.                                                                 |

## Related Decisions

- [ADR-0001: Inline stylesheets to eliminate render-blocking CSS](adr-20260206-inline-stylesheets.md) -- The Google Fonts external CSS request partially conflicts with the zero-external-CSS goal, but `display=swap` ensures it is non-render-blocking. The inlined stylesheet will grow by ~500 bytes for fallback font metric declarations.

## References

- [Google Fonts: DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display)
- [Google Fonts: Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts: IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- [Tailwind CSS v4: Theme configuration](https://tailwindcss.com/docs/theme)
- [web.dev: Best practices for fonts](https://web.dev/articles/font-best-practices)
- [web.dev: CSS font-display](https://web.dev/articles/font-display)
- [Fontaine: Automatic font fallback metrics](https://github.com/unjs/fontaine)
- [CLS and font loading](https://web.dev/articles/optimize-cls#web-fonts)
- Project: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `astro.config.ts`
