# Tierra Viva Public Website — Step-by-Step Development Plan

**Date:** February 4, 2026  
**Inputs:** implementation-plan.md, technical-specification.md  
**Principle:** Each phase produces a shippable state; no half-built sections or broken journeys.

**Priority:** Testing, validation, and linting come first. Phase 0 (Quality gate) must be complete before any scaffold, themes, or feature work. Every commit must pass the quality gate via pre-commit hooks. See technical-specification.md §1.1 (Quality gate) and reference projects arielperez.io and the-adaptive-alchemist for setup patterns.

---

## Phase 0 — Quality gate (testing, validation, linting)

**Goal:** Every commit is type-checked, linted, and formatted. Pre-commit hooks block bad commits. All tools runnable via pnpm scripts.

**Implementation note:** Type-check and ESLint require a minimal project (e.g. `package.json`, `tsconfig.json`, and at least one source file). Either create a minimal Astro app first (`pnpm create astro`) then add all quality tooling in Phase 0, or add a minimal skeleton in Phase 0 (e.g. package.json, tsconfig, one `.ts` or `.astro` file) so checks have a target; reference projects use the former.

### Steps

1. **TypeScript type-checking (TSC / astro check)**
   - Add `pnpm check` (e.g. `astro check`) or `pnpm type-check` (`tsc --noEmit`). Ensure `tsconfig.json` strict mode. Run on pre-commit for staged TS/JS/Astro.

2. **Husky and lint-staged**
   - Install `husky`, `lint-staged`. `pnpm prepare` → `husky`. `.husky/pre-commit` runs `npx lint-staged`. Configure `lint-staged.config.js`: when any TS/JS/Astro file is staged, run **full-project** type-check (e.g. `pnpm check`) so the whole codebase stays type-clean; run ESLint fix, Prettier fix, MarkdownLint fix on staged files. Commit blocked if any check fails.

3. **ESLint (TypeScript, React/JSX, Astro)**
   - Flat config `eslint.config.js`. Plugins: `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-astro`, `astro-eslint-parser`. Type-aware rules for `src/**/*.{ts,tsx}`; React/JSX for `**/*.{jsx,tsx}`; Astro for `**/*.astro`. `pnpm lint` and `pnpm lint:fix`; lint runs in pre-commit.

4. **Prettier**
   - Config for JS/TS/JSX/TSX, Astro, CSS, MD. `pnpm lint:format` (check), `pnpm lint:format:fix` (write). Pre-commit formats staged files.

5. **MarkdownLint**
   - `markdownlint-cli`, `.markdownlint.json` / `.markdownlintignore`. `pnpm lint:md` and `pnpm lint:md:fix`. Pre-commit on staged `*.md`.

6. **Stylelint (CSS and styles, Tailwind-aware)**
   - Stylelint for `src/**/*.css` and other style files. Config Tailwind-aware (e.g. `postcss-lit` or `stylelint-plugin-tailwindcss`) so `@tailwind`, `@apply`, and Tailwind at-rules are valid. Use `stylelint-config-prettier` to avoid conflicts with Prettier. `pnpm lint:css` and `pnpm lint:css:fix`; pre-commit on staged `*.css`.

7. **A11y linting (eslint-plugin-jsx-a11y)**
   - Add `eslint-plugin-jsx-a11y` to ESLint; recommended rules for React/JSX (and Astro client scripts as applicable). Part of `pnpm lint` and pre-commit.

8. **Lighthouse (a11y, SEO, performance)**
   - Script (e.g. `pnpm lighthouse`) to run Lighthouse against preview/build. Document in README; optional CI step. Not on pre-commit (too slow).

**Exit criteria:** All eight tools configured; `pnpm check`, `pnpm lint`, `pnpm lint:md`, `pnpm lint:css` (and fix variants) pass; pre-commit runs and blocks on failure; README documents scripts.

---

## Phase 1 — Project Scaffold and Design Tokens

**Goal:** Repo ready for feature work. Astro + Tailwind + React, design tokens, base layout, and GitHub Pages deploy.

### Steps

1. **Initialize Astro** (static output, TypeScript strict).
   - `pnpm create astro@latest` or manual: `package.json`, `astro.config.mjs`, `tsconfig.json`.
   - Add integrations: `astro add tailwind`, `astro add react`.
   - Set `site` (and `base` if project-site GitHub Pages).

2. **Tailwind theme** (see technical-spec §3).
   - Custom colors: forest `#2E6E30`, forest-dark `#1E4A1F`, lime `#68B62C`, neutral `#262626`.
   - Optional: typography plugin, `global.css` with `@import tailwind` and base layer.

3. **Project structure** (see technical-spec §2).
   - Create `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/consts.ts`, `src/pages/index.astro` (placeholder).
   - Add `public/favicon.ico` (or SVG) and optional `public/CNAME` placeholder.

4. **GitHub Pages workflow**.
   - `.github/workflows/deploy.yml`: checkout → pnpm install → build → upload-pages-artifact → deploy-pages.
   - Ensure `astro.config.mjs` `output: 'static'` and correct `site`/`base`.

5. **Smoke test.** Run `pnpm build` and `pnpm preview`; confirm deploy (or dry-run) works.

**Exit criteria:** `pnpm dev` and `pnpm build` succeed; one placeholder page renders with theme colors; deploy workflow runs without error.

---

## Phase 2 — Iteration 1: Single-Page Site

**Goal:** One scrollable page with all nine sections, two CTAs (investors / partners), footer with disclaimer and legal links. No multi-page nav yet; CTAs can be anchors or mailto/contact placeholder.

### Steps

1. **BaseLayout and shell**
   - Full HTML document, meta (viewport, charset), one canonical H1 intent.
   - Import `global.css`. Optional: SEO component and sitemap config for single URL.

2. **Header (I1)**
   - Logo (use provided Tierra Viva logo asset).
   - No full nav yet; optional “Contact” or “Start a Conversation” in header.
   - Mobile-friendly (e.g. hamburger if needed for single CTA).

3. **Section 1 — Hero**
   - Headline: “Living Capital for Living Places.”
   - Subhead and supporting line per wireframe.
   - Primary CTA: “Start an Introductory Conversation” → `mailto:info@tierravivainvest.com`.
   - Secondary CTA: “Explore Our Thesis” (anchor to #value-governance or #strategy).

4. **Section 2 — Why + Model**
   - “Why Tierra Viva” short copy + four pillars as tiles: Learning, Homes, Enterprise, Stewardship.
   - Copy from wireframe; no fund numbers.

5. **Section 3 — Where We’re Focused**
   - Geography (DR, Santiago) + first-project teaser (Altos de Gurabo) per implementation-plan.
   - Optional image or “Coming soon” placeholder.

6. **Section 4 — Value & Governance**
   - Short “platform built for enduring value” + bullets.
   - CTA: “Learn About Our Strategy” (anchor for I1).

7. **Section 5 — Responsible Investment**
   - One short paragraph + 4 bullet lines (governance, environmental, social, stewardship).
   - CTA: “Our Responsible Investment Principles” (anchor).

8. **Section 6 — Team**
   - Founder: Ramon Marmolejos, title, one-line credential.
   - Supporting line: advisors and partners.
   - CTA: “Meet the Team” (anchor).

9. **Section 7 — Research**
   - “Research-led conviction” sentence + three featured insight titles (links optional or “Coming soon”).
   - CTA: “Explore Research & Insights” (anchor or placeholder).

10. **Section 8 — Partner With Us**
    - Two CTAs: “For Investors: Start an Introductory Conversation” and “For Partners: Explore Partnership Opportunities.”
    - Same destination for now: `mailto:info@tierravivainvest.com`.

11. **Footer**
    - Purpose & Disclaimer (informational only).
    - Links: Responsible Investment (anchor), Privacy Policy, Jurisdiction Notice.
    - Optional: small nav or repeat CTAs.

12. **IDs and anchors**
    - Add fragment IDs to each section so “Explore Our Thesis” and in-page links work (e.g. `id="why-model"`, `id="where-focused"`, `id="value-governance"`, `id="responsible-investment"`, `id="team"`, `id="research"`, `id="partner-with-us"`).

13. **SEO and a11y pass**
    - Single H1 (hero headline). H2s for each section title. One answer-style sentence near top. Check focus order and contrast.

**Exit criteria:** One page with all nine sections; two distinct CTAs; footer with disclaimer and three links; responsive; `pnpm build` succeeds; no offer/fund language.

---

## Phase 3 — Iteration 2: Core Pages and Navigation

**Goal:** Real navigation; dedicated pages for About, Strategy, Platform, Responsible Investment, Team, Contact. Homepage sections unchanged but section CTAs become real links.

### Steps

1. **Nav component**
   - Nav order: About → Strategy → Platform → Projects & Focus → Responsible Investment → Team & Governance → Research & Insights → Contact.
   - “Projects & Focus” and “Research & Insights” link to placeholders or anchors for now (full pages in I3/I4).
   - Responsive menu (e.g. drawer or dropdown on small screens).

2. **About** (`src/pages/about.astro`)
   - Who we are, mission, backstory. No full pillar repeat; link to Strategy and Platform.
   - Use BaseLayout; one H1, clear H2s.

3. **Strategy** (`src/pages/strategy.astro`)
   - Investment thesis and capital approach (no deal terms). Answer-style intro.
   - Link from homepage “Learn About Our Strategy.”

4. **Platform** (`src/pages/platform.astro`)
   - Four pillars with short expansion; execution (phased, partnerships, governance). Optional diagram.
   - No financials.

5. **Responsible Investment** (`src/pages/responsible-investment.astro`)
   - Full content from wireframe Section 5; “substance over signaling” line.

6. **Team & Governance** (`src/pages/team.astro`)
   - GP (Ramon, Henry, Leslie): 2–3 sentences each. IC (Ranjan, Jose Luis, Carlos, Ariel): one sentence each. Key partner: Espejo y Asociados. Bios from tierra-viva.md; LinkedIn links where appropriate.

7. **Contact** (`src/pages/contact.astro`)
   - Intent sentence; “what happens next” (e.g. response time). Use **mailto:info@tierravivainvest.com** for now (no form). Optional “For investors” / “For partners” as two mailto links or buttons with same address.

8. **Homepage updates**
   - Section CTAs point to `/about`, `/strategy`, `/platform`, `/responsible-investment`, `/team`, `/research` (hub placeholder), `/contact`. “Where We’re Focused” CTA can point to `/projects` placeholder.

9. **Projects & Focus placeholder**
   - Add `src/pages/projects/index.astro` with minimal “Coming soon” or redirect to homepage section until I3.

10. **Research hub placeholder**
    - Add `src/pages/research/index.astro` with “Coming soon” or short intro until I4.

11. **Sitemap and meta**
    - Ensure sitemap includes all new pages; per-page title/description.

**Exit criteria:** Full nav works; all six core pages render with correct content; homepage CTAs go to pages; placeholders for Projects and Research; build and deploy succeed.

---

## Phase 4 — Iteration 3: Projects & Focus (First Project)

**Goal:** “Projects & Focus” page with Altos de Gurabo as flagship. Place, school, sustainability, connectivity, master plan only—no unit counts or pricing.

### Steps

1. **Projects hub** (`src/pages/projects/index.astro`)
   - Title/heading: “Projects & Focus.” Intro line if needed.
   - Featured project: Altos de Gurabo. Content from implementation-plan (location, integrated community, school, walkable master plan, residential options as formats only, connectivity, amenities, sustainability, mixed commercial). Optional: masterplan image, school or amenity visuals.

2. **Homepage “Where We’re Focused”**
   - Teaser links to `/projects` (or anchor to projects section if keeping single-page plus separate page).

3. **Nav**
   - “Projects & Focus” already in nav; ensure it points to `/projects`.

4. **SEO**
   - Page intent: “sustainable community Dominican Republic,” “Santiago development,” “education-anchored community Gurabo.” Answer-style block at top.

**Exit criteria:** Projects page live with full Altos de Gurabo content; no fund terms; homepage links to it; build and deploy succeed.

---

## Phase 5 — Iteration 4: Research & Insights Hub and Articles

**Goal:** Research hub page listing articles; at least one full article (or overview + one article) at launch. One URL per article for SEO.

### Steps

1. **Content collection**
   - `src/content/research/` with schema (title, description, slug, date). One `.md` or `.mdx` per article.

2. **Templated article route**
   - `src/pages/research/[...slug].astro` (or equivalent) with `getStaticPaths` from the collection. Single template renders all articles; one URL per file.

3. **Research hub** (`src/pages/research/index.astro`)
   - Intro: strategy informed by research; we publish select insights.
   - List articles with title, short description, link to `/research/<slug>`.

4. **First article(s)**
   - Add at least one entry in the research collection (e.g. “Why Education Anchors Long-Term Community Value”) with H1/H2, answer-style intro. If only one ready, hub can also show “How We Use Research” as an overview entry or single page plus one insight.

5. **Homepage**
   - “Explore Research & Insights” and featured titles link to hub or direct article URLs.

6. **SEO**
   - Hub and each article: one primary intent, meta, sitemap.

**Exit criteria:** Hub lists at least one article; each article has own URL; no offer content; build and deploy succeed.

---

## Phase 6 — Iteration 5: Polish and Optional Additions

**Goal:** Refinements and optional scope without changing core page set.

### Steps (pick as needed)

1. **News / Press** — Footer or sub-nav link; placeholder or list of press.
2. **Audience entry points** — “For Investors” / “For Partners” in footer or CTA block linking to Contact with context (e.g. query param or form field).
3. **Hero video or imagery** — Replace or augment hero with video or high-quality asset imagery.
4. **Contact branching** — Two paths from “Partner With Us”: separate forms or form dropdown for investors vs. partners.
5. **Performance and a11y** — Lighthouse pass; fix any regressions; ensure reduced-motion and contrast.
6. **Legal pages** — Standalone Privacy Policy and Jurisdiction Notice pages if not already present.

**Exit criteria:** Agreed polish items done; site remains compliant and shippable.

---

## Dependency Summary

| Phase              | Depends on        | Unblocks                  |
| ------------------ | ----------------- | ------------------------- |
| 0 (Quality gate)   | —                 | Phase 1                   |
| 1 (Scaffold)       | 0                 | Phase 2                   |
| 2 (I1 single-page) | 1                 | Phase 3                   |
| 3 (I2 core pages)  | 2                 | Phase 4, 5 (placeholders) |
| 4 (I3 Projects)    | 3                 | —                         |
| 5 (I4 Research)    | 3                 | —                         |
| 6 (Polish)         | 3 (4, 5 optional) | —                         |

Phase 0 (Quality gate) is first and mandatory. Phase 4 and 5 can be parallelized after Phase 3. Phase 6 can start once Phase 3 is stable.
