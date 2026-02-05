# Tierra Viva Public Website — Backlog

**Date:** February 4, 2026  
**Source:** implementation-plan.md, development-plan.md, technical-specification.md  
**Use:** Single-file backlog for development; can be split into issues/boards later.  
**Format:** Title | Phase | Description | Acceptance criteria.

**Priority:** Testing, validation, and linting are the highest priority. Phase 0 (Quality gate) must be complete before any scaffold, themes, or feature work. Every commit must pass the quality gate via pre-commit hooks.

---

## Phase 0 — Quality gate (testing, validation, linting)

_Must be done first. All tools runnable via pnpm scripts; pre-commit runs type-check, lint, format, and markdown lint. Lighthouse runs as script (and optionally CI) for a11y/SEO/performance._

### TV-0.1 — TypeScript type-checking (TSC / astro check) - DONE ✅

**Phase:** 0  
**Description:** Configure TypeScript strict mode and type-check script. Use `astro check` (or `tsc --noEmit`) so every commit is type-safe.

**Acceptance criteria:**

- [x] `pnpm type-check` or `pnpm check` runs TypeScript validation (e.g. `astro check` or `tsc --noEmit`).
- [x] `tsconfig.json` uses strict mode; no `any` in codebase.
- [x] Script documented in README and runs in pre-commit (via lint-staged or husky).

---

### TV-0.2 — Husky and lint-staged pre-commit hooks - DONE ✅

**Phase:** 0  
**Description:** Install and configure Husky for Git hooks and lint-staged to run quality checks. When any TS/JS/Astro file is staged, run **full-project** type-check (so the whole codebase stays type-clean); run ESLint fix, Prettier fix, and MarkdownLint fix on staged files. Ensures every commit passes before push.

**Acceptance criteria:**

- [x] `husky` and `lint-staged` installed; `pnpm prepare` runs `husky`.
- [x] `.husky/pre-commit` runs `npx lint-staged` (or `pnpm pre-commit`).
- [x] `lint-staged.config.ts` (or equivalent): when any `*.{ts,tsx,js,jsx,astro}` is staged, run full-project type-check (e.g. `pnpm check`); run ESLint fix, Prettier fix, MarkdownLint fix on staged files. Uses function form so staged filenames are passed to each fix command.
- [x] Pre-commit blocks commit if any check fails.

**Notes:** Configs use TypeScript where supported (`astro.config.ts`, `eslint.config.ts`, `lint-staged.config.ts`, `prettier.config.ts`). ESLint flat config uses array export (no deprecated `tseslint.config`).

---

### TV-0.3 — ESLint (TypeScript, React/JSX, Astro) - DONE ✅

**Phase:** 0  
**Description:** Configure ESLint with TypeScript, React/JSX, and Astro plugins. Flat config (eslint.config.ts). Code lint runs on every pre-commit for staged source files.

**Acceptance criteria:**

- [x] `eslint.config.ts` (flat config) with `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-astro` (and `astro-eslint-parser`).
- [x] Type-aware rules for `src/**/*.{ts,tsx}`; React and JSX rules for `**/*.{jsx,tsx}`; Astro rules for `**/*.astro`.
- [x] `pnpm lint` (and `pnpm lint:fix`) run ESLint; lint runs in pre-commit for staged code.

**Notes:** TypeScript ESLint is already in place (from TV-0.2). Remaining: add `eslint-plugin-react`, `eslint-plugin-astro`, `astro-eslint-parser`, and the corresponding rules for React/JSX and Astro.

---

### TV-0.4 — Prettier for formatting - DONE ✅

**Phase:** 0  
**Description:** Prettier for consistent formatting of JS/TS/JSX/TSX, Astro, CSS, and Markdown. Format check and fix runnable via pnpm; Prettier runs in pre-commit for staged files.

**Acceptance criteria:**

- [x] Prettier installed; config (e.g. `prettier.config.ts`) for code, CSS, Astro, and MD.
- [x] `pnpm lint:format` (check) and `pnpm lint:format:fix` (write) run Prettier on project paths.
- [x] Pre-commit formats staged files (via lint-staged).

---

### TV-0.5 — MarkdownLint for Markdown - DONE ✅

**Phase:** 0  
**Description:** MarkdownLint for all `.md` files (plan docs, README, content). Run on pre-commit for staged Markdown.

**Acceptance criteria:**

- [x] `markdownlint-cli` installed; `.markdownlint.json` (or `.markdownlintrc`) and `.markdownlintignore` as needed.
- [x] `pnpm lint:md` (check) and `pnpm lint:md:fix` (fix) run markdownlint.
- [x] Pre-commit runs markdown lint/fix on staged `*.md`.

---

### TV-0.6 — Stylelint for CSS and styles (Tailwind-aware) - DONE ✅

**Phase:** 0  
**Description:** Stylelint for all CSS and style files. Config must be Tailwind-aware (e.g. `postcss-lit` or `stylelint-plugin-tailwindcss`) so Tailwind directives and utilities are valid. Ensures style consistency and catches invalid/unknown at-rules and properties on every commit.

**Acceptance criteria:**

- [x] Stylelint installed; config (e.g. `stylelint.config.ts`) with Tailwind compatibility (e.g. `postcss-lit`, or `stylelint-config-standard` + `stylelint-plugin-tailwindcss`).
- [x] Config disables rules that conflict with Prettier (e.g. `stylelint-config-prettier`).
- [x] `pnpm lint:css` (check) and `pnpm lint:css:fix` (fix) run Stylelint on `src/**/*.css` (and any other style files in use).
- [x] Pre-commit runs Stylelint on staged `*.css` (and staged style files) via lint-staged.
- [x] README documents the scripts.

**Notes:** Tailwind uses `@tailwind`, `@apply`, and custom at-rules; Stylelint must either understand them (plugin) or allow them (e.g. `postcss-lit` or rule overrides) so the build and lint both pass. Implemented with `stylelint-config-standard` + `stylelint-config-tailwindcss`. `stylelint-config-prettier` is not used (incompatible with Stylelint 17); Prettier runs after Stylelint in lint-staged so formatting is consistent.

---

### TV-0.7 — Axe / a11y linting (ESLint jsx-a11y) - DONE ✅

**Phase:** 0  
**Description:** Accessibility linting via `eslint-plugin-jsx-a11y` for React/JSX. Ensures a11y rules are enforced on every commit for component code.

**Acceptance criteria:**

- [x] `eslint-plugin-jsx-a11y` in ESLint config; recommended rules applied for `**/*.{jsx,tsx}` (and Astro client scripts if applicable).
- [x] A11y violations fail lint; run as part of `pnpm lint` and pre-commit.

---

### TV-0.8 — Lighthouse (a11y, SEO, performance) - DONE ✅

**Phase:** 0  
**Description:** Lighthouse script for a11y, SEO, and performance. Runnable via pnpm (e.g. against preview build); optional CI step. Not required on every pre-commit (too slow) but part of the quality toolkit. **CI recommendation:** run `pnpm check` and `pnpm lint` (and optionally `pnpm lint:md`) on push/PR to protect main; optionally add Lighthouse to CI on main or PR.

**Acceptance criteria:**

- [x] `pnpm lighthouse` (or similar) runs Lighthouse (e.g. against `pnpm preview` or built `dist/`) for a11y, SEO, performance.
- [x] Documented in README; optionally run in GitHub Actions on main or PR.
- [x] (Recommended) CI job runs `pnpm check` and `pnpm lint` (and optionally `pnpm lint:md`) on push or PR; Lighthouse in CI optional.
- [ ] No critical a11y/SEO/performance regressions before release.

---

## Phase 1 — Scaffold

### TV-1.1 — Initialize Astro project with static output and TypeScript - DONE ✅

**Phase:** 1  
**Description:** Create Astro app with static output, TypeScript (strict), and base config. Add Tailwind and React via official integrations.

**Acceptance criteria:**

- [x] `pnpm dev` and `pnpm build` succeed.
- [x] `astro.config.mjs` has `output: 'static'`, `site` set; `base` set if GitHub Pages project site.
- [x] Tailwind and React integrations installed and working.
- [x] `tsconfig.json` extends strict template.

---

### TV-1.2 — Define Tailwind theme and Tierra Viva design tokens - DONE ✅

**Phase:** 1  
**Description:** Add custom colors (forest, forest-dark, lime, neutral) and any typography/spacing to Tailwind theme. Create or update `src/styles/global.css` with base layer.

**Acceptance criteria:**

- [x] Theme includes: forest `#2E6E30`, forest-dark `#1E4A1F`, lime `#68B62C`, neutral `#262626`.
- [x] Utilities (e.g. `bg-tierra-forest`, `text-tierra-lime`) work in components.
- [x] Global base styles (e.g. font, scroll-behavior) applied.

---

### TV-1.3 — Create project folder structure and base layout

**Phase:** 1  
**Description:** Add `src/layouts/BaseLayout.astro`, `src/consts.ts`, `src/pages/index.astro` (minimal placeholder). Create `src/components` and `src/components/sections`. Add `public` assets (favicon; optional CNAME).

**Acceptance criteria:**

- [ ] BaseLayout wraps content with `<html>`, `<head>`, `<body>`; imports global CSS.
- [ ] consts export at least `SITE_TITLE` (or equivalent).
- [ ] Index page uses BaseLayout and renders a simple placeholder.
- [ ] Favicon (or SVG) present in `public`.

---

### TV-1.4 — Add GitHub Pages deploy workflow

**Phase:** 1  
**Description:** Add `.github/workflows/deploy.yml`: checkout, pnpm setup, install, build, upload-pages-artifact, deploy-pages. Configure for main branch and relevant paths.

**Acceptance criteria:**

- [ ] Workflow runs on push to main (and optionally workflow_dispatch).
- [ ] Build produces `dist/`; artifact uploaded; deploy-pages step runs.
- [ ] Repo Settings → Pages uses “GitHub Actions” as source.
- [ ] No secrets required for static build (or document any needed for analytics later).

---

## Phase 2 — Iteration 1 (Single-page)

### TV-2.1 — Header with logo and optional CTA

**Phase:** 2  
**Description:** Implement site header with Tierra Viva logo (asset from project). Optional “Start a Conversation” or “Contact” link. Mobile-friendly (e.g. hamburger if needed).

**Acceptance criteria:**

- [ ] Logo displays and links to top of page or home.
- [ ] Header is responsive; no horizontal overflow on small viewports.
- [ ] Accessible (focus order, contrast).

---

### TV-2.2 — Hero section (headline, subhead, CTAs)

**Phase:** 2  
**Description:** Hero with “Living Capital for Living Places,” subhead and supporting line per wireframe. Primary CTA “Start an Introductory Conversation” → mailto:info@tierravivainvest.com; secondary “Explore Our Thesis” (anchor to strategy section).

**Acceptance criteria:**

- [ ] Single H1 = hero headline.
- [ ] Primary CTA = mailto:info@tierravivainvest.com; secondary scrolls to #value-governance or #strategy anchor.
- [ ] Copy matches implementation-plan intent (no fund terms).

---

### TV-2.3 — Why + Model section (four pillars)

**Phase:** 2  
**Description:** “Why Tierra Viva” short copy plus four pillar tiles: Learning, Homes, Enterprise, Stewardship. Copy from wireframe; no fund numbers.

**Acceptance criteria:**

- [ ] Section has id for anchor (e.g. `id="why-model"`).
- [ ] Four pillars visible as tiles/cards with titles and one sentence each.
- [ ] H2 (or equivalent) for section; no duplicate H1.

---

### TV-2.4 — Where We’re Focused section

**Phase:** 2  
**Description:** Geography (DR, Santiago) and first-project teaser: Altos de Gurabo one-line (and optional second sentence). Optional image or “Coming soon” placeholder.

**Acceptance criteria:**

- [ ] Section id (e.g. `id="where-focused"`).
- [ ] Altos de Gurabo teaser copy per implementation-plan; no unit counts or pricing.
- [ ] Optional image or placeholder present.

---

### TV-2.5 — Value & Governance section

**Phase:** 2  
**Description:** Short “platform built for enduring value” plus bullets (phased development, value streams, governance, reporting). CTA “Learn About Our Strategy” (anchor for I1).

**Acceptance criteria:**

- [ ] Section id (e.g. `id="value-governance"`).
- [ ] Bullets and CTA present; CTA is anchor link for I1.

---

### TV-2.6 — Responsible Investment section

**Phase:** 2  
**Description:** Snapshot: one short paragraph + 4 bullet lines (governance, environmental, social, stewardship). CTA “Our Responsible Investment Principles” (anchor).

**Acceptance criteria:**

- [ ] Section id (e.g. `id="responsible-investment"`).
- [ ] Copy and CTA per wireframe; CTA as anchor for I1.

---

### TV-2.7 — Team section (founder + supporting line)

**Phase:** 2  
**Description:** Founder highlight (Ramon Marmolejos, title, one-line credential). One line on advisors and partners. CTA “Meet the Team” (anchor).

**Acceptance criteria:**

- [ ] Section id (e.g. `id="team"`).
- [ ] Ramon’s name, title, and one-line credential; supporting line; CTA as anchor.

---

### TV-2.8 — Research section (teaser + featured titles)

**Phase:** 2  
**Description:** “Research-led conviction” sentence and three featured insight titles. CTA “Explore Research & Insights” (anchor or “Coming soon”).

**Acceptance criteria:**

- [ ] Section id (e.g. `id="research"`).
- [ ] Three titles present; CTA links to anchor or placeholder.

---

### TV-2.9 — Partner With Us section (two CTAs)

**Phase:** 2  
**Description:** Two audience-specific CTAs: “For Investors: Start an Introductory Conversation” and “For Partners: Explore Partnership Opportunities.” Short invite line. Both use mailto:info@tierravivainvest.com for now.

**Acceptance criteria:**

- [ ] Section id (e.g. `id="partner-with-us"`).
- [ ] Both CTAs visible and distinct; each links to mailto:info@tierravivainvest.com.
- [ ] No offer language.

---

### TV-2.10 — Footer (disclaimer and legal links)

**Phase:** 2  
**Description:** Purpose & Disclaimer (informational only). Links: Responsible Investment (anchor), Privacy Policy, Jurisdiction Notice.

**Acceptance criteria:**

- [ ] Disclaimer text visible; no offer/solicitation language.
- [ ] Three links present; targets can be anchors or placeholder pages.
- [ ] Layout readable and responsive.

---

### TV-2.11 — SEO and accessibility pass (I1)

**Phase:** 2  
**Description:** Verify one H1, H2s per section, answer-style sentence near top. Check focus order, contrast, and optional skip link.

**Acceptance criteria:**

- [ ] Single H1; logical heading hierarchy.
- [ ] One clear “what is Tierra Viva and where” sentence near top.
- [ ] Focus order and contrast meet WCAG 2.1 targets; images have alt.

---

## Phase 3 — Iteration 2 (Core pages + nav)

### TV-3.1 — Navigation component with full nav order

**Phase:** 3  
**Description:** Implement nav: About → Strategy → Platform → Projects & Focus → Responsible Investment → Team & Governance → Research & Insights → Contact. Responsive menu. Projects & Research can link to placeholders.

**Acceptance criteria:**

- [ ] All eight items in order; links work (pages or placeholders).
- [ ] Mobile menu works; no broken layout.
- [ ] Accessible (keyboard, focus).

---

### TV-3.2 — About page

**Phase:** 3  
**Description:** About page: who we are, mission, backstory. No full pillar repeat; link to Strategy and Platform. Copy from implementation-plan.

**Acceptance criteria:**

- [ ] Route `/about` renders full content.
- [ ] One H1; H2s as needed; links to Strategy and Platform.
- [ ] No fund size or returns.

---

### TV-3.3 — Strategy page

**Phase:** 3  
**Description:** Investment thesis and capital approach (no deal terms). Answer-style intro. Copy from wireframe + tierra-viva.md.

**Acceptance criteria:**

- [ ] Route `/strategy` renders; clear answer block in first 1–2 paragraphs.
- [ ] One primary intent (e.g. education-anchored real estate Latin America); no offer content.

---

### TV-3.4 — Platform page

**Phase:** 3  
**Description:** Four pillars with short expansion; execution (phased, partnerships, governance). Optional diagram. No financials.

**Acceptance criteria:**

- [ ] Route `/platform` renders; four pillars and execution described.
- [ ] No fund or pricing content.

---

### TV-3.5 — Responsible Investment page

**Phase:** 3  
**Description:** Full content from wireframe Section 5: governance, environmental, social, stewardship; “substance over signaling.”

**Acceptance criteria:**

- [ ] Route `/responsible-investment` (or `/responsible-investment`) renders full section content.
- [ ] All four bullets and intro present.

---

### TV-3.6 — Team & Governance page

**Phase:** 3  
**Description:** GP (Ramon, Henry, Leslie) 2–3 sentences each; IC (Ranjan, Jose Luis, Carlos, Ariel) one sentence each; key partner Espejo y Asociados. Bios from tierra-viva.md; LinkedIn links where appropriate.

**Acceptance criteria:**

- [ ] Route `/team` renders all GP and IC and partner.
- [ ] Bios trimmed from source only; no invention; LinkedIn links where applicable.

---

### TV-3.7 — Contact page

**Phase:** 3  
**Description:** Intent sentence; “what happens next” (e.g. response time). Use mailto:info@tierravivainvest.com for now (no form). Optional “For investors” / “For partners” as two mailto links or buttons with same address.

**Acceptance criteria:**

- [ ] Route `/contact` renders; clear next step for user.
- [ ] Mailto link(s) to info@tierravivainvest.com; optional audience selector (same mailto).

---

### TV-3.8 — Projects & Focus placeholder page

**Phase:** 3  
**Description:** Add `/projects` page with “Coming soon” or minimal intro so nav link works until I3.

**Acceptance criteria:**

- [ ] Route `/projects` returns 200; nav “Projects & Focus” links here.
- [ ] No broken layout or missing content.

---

### TV-3.9 — Research hub placeholder page

**Phase:** 3  
**Description:** Add `/research` page with “Coming soon” or short intro until I4.

**Acceptance criteria:**

- [ ] Route `/research` returns 200; nav “Research & Insights” links here.
- [ ] Ready to replace with hub content in I4.

---

### TV-3.10 — Homepage section CTAs → real links

**Phase:** 3  
**Description:** Update homepage section CTAs to point to new pages: Strategy, Platform, Responsible Investment, Team, Research (hub), Contact. “Where We’re Focused” can link to `/projects`.

**Acceptance criteria:**

- [ ] Every section CTA that should go to a page does so.
- [ ] No dead anchors unless intentional (e.g. same-page scroll).

---

### TV-3.11 — Sitemap and per-page meta

**Phase:** 3  
**Description:** Ensure sitemap includes all new routes. Per-page title and description for SEO.

**Acceptance criteria:**

- [ ] Sitemap generated (e.g. @astrojs/sitemap); all public pages included.
- [ ] Each page has unique title and description where applicable.

---

## Phase 4 — Iteration 3 (Projects & Focus)

### TV-4.1 — Projects & Focus page with Altos de Gurabo

**Phase:** 4  
**Description:** Replace placeholder with full “Projects & Focus” page. Featured project: Altos de Gurabo—location, integrated community, school, master plan, residential formats (no prices), connectivity, amenities, sustainability, mixed commercial. Optional images.

**Acceptance criteria:**

- [ ] `/projects` shows full Altos de Gurabo content per implementation-plan.
- [ ] No unit counts, pricing, IRR, or fund terms.
- [ ] Optional masterplan/school/amenity imagery.
- [ ] Answer-style intro for SEO (what/where).

---

### TV-4.2 — Homepage “Where We’re Focused” links to Projects

**Phase:** 4  
**Description:** Teaser in “Where We’re Focused” links to `/projects`.

**Acceptance criteria:**

- [ ] At least one clear link from homepage to Projects page.

---

## Phase 5 — Iteration 4 (Research hub + articles)

### TV-5.1 — Research content collection, article template, and hub page

**Phase:** 5  
**Description:** Define content collection `src/content/research/` (title, description, slug, date). Add templated article route (e.g. `src/pages/research/[...slug].astro`) with `getStaticPaths` from collection so one layout renders all articles. Research hub page lists articles with title, description, link to `/research/<slug>`.

**Acceptance criteria:**

- [ ] Content collection with schema; one .md/.mdx per article.
- [ ] Single article template; one URL per collection entry.
- [ ] Hub at `/research` lists all published articles with links.
- [ ] Intro copy per implementation-plan.

---

### TV-5.2 — First full Research article (in collection)

**Phase:** 5  
**Description:** Add at least one entry to the research content collection (e.g. “Why Education Anchors Long-Term Community Value”) with full text, H1/H2, answer-style opening. If only one ready, add “How We Use Research” overview entry plus one insight.

**Acceptance criteria:**

- [ ] At least one collection entry; renders at `/research/<slug>` via template.
- [ ] Clear H1/H2; answer-style intro; no offer content.
- [ ] Hub links to it.

---

### TV-5.3 — Homepage Research links to hub and articles

**Phase:** 5  
**Description:** “Explore Research & Insights” and featured titles link to hub or direct article URLs.

**Acceptance criteria:**

- [ ] Homepage Research CTA and titles point to hub or article URLs.
- [ ] No broken links.

---

## Phase 6 — Iteration 5 (Polish)

### TV-6.1 — Privacy Policy and Jurisdiction pages

**Phase:** 6  
**Description:** Standalone pages for Privacy Policy and Jurisdiction Notice; footer links updated.

**Acceptance criteria:**

- [ ] `/privacy` and `/jurisdiction` (or agreed paths) exist.
- [ ] Footer links point to them.
- [ ] Content approved by legal/owner.

---

### TV-6.2 — Optional: Audience entry points (Investors / Partners)

**Phase:** 6  
**Description:** Footer or CTA block: “For Investors” / “For Partners” linking to Contact with context (query param or form field).

**Acceptance criteria:**

- [ ] Two entry points visible; link to Contact with context.
- [ ] Copy one line each per implementation-plan.

---

### TV-6.3 — Optional: Contact branching (investors vs partners)

**Phase:** 6  
**Description:** Two paths from “Partner With Us”: separate forms or form dropdown for investors vs. partners.

**Acceptance criteria:**

- [ ] User can indicate investor vs. partner; form or backend reflects it (per product decision).
- [ ] No offer language in UI.

---

### TV-6.4 — Performance and accessibility audit

**Phase:** 6  
**Description:** Run Lighthouse (performance, a11y); fix critical issues; verify reduced-motion and contrast.

**Acceptance criteria:**

- [ ] No critical a11y or performance regressions.
- [ ] Contrast and focus order verified; reduced-motion respected where applicable.

---

## Summary by Phase

| Phase | Ticket count | Focus                                                                                      |
| ----- | ------------ | ------------------------------------------------------------------------------------------ |
| 0     | 7            | Quality gate: TSC, Husky/lint-staged, ESLint, Prettier, MarkdownLint, jsx-a11y, Lighthouse |
| 1     | 4            | Scaffold, theme, layout, deploy                                                            |
| 2     | 11           | Single-page, 9 sections, footer, SEO/a11y                                                  |
| 3     | 11           | Nav, 6 core pages, 2 placeholders, homepage CTAs, sitemap                                  |
| 4     | 2            | Projects & Focus page, homepage link                                                       |
| 5     | 3            | Research hub, first article, homepage links                                                |
| 6     | 4            | Legal pages, audience entry, contact branching, audit                                      |

**Total:** 42 tickets. **Phase 0 (Quality gate) is first and non-negotiable;** every commit must pass pre-commit checks. Phase 4 and 5 can be parallelized after Phase 3. Phase 6 items are optional or polish.
