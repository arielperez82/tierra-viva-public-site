# Tierra Viva Public Website — Technical Specification

**Date:** February 4, 2026  
**Inputs:** implementation-plan.md, website-proposal.md, wireframe.md  
**Stack:** Astro, Tailwind CSS, React, TypeScript. Deploy: GitHub Pages.  
**Layout exemplar:** [Bexer-Astro](https://bexer-astro.vercel.app/?aff=ab). **Code/structure reference:** arielperez.io, the-adaptive-alchemist (external).

**Priority:** Testing, validation, and linting are set up first and run on every commit. No scaffold, themes, or feature work until the quality gate is in place. See §1.1 and reference arielperez.io and the-adaptive-alchemist for Husky, lint-staged, ESLint, Prettier, and MarkdownLint patterns.

---

## 1. Stack and Tooling

### 1.1 Quality gate (testing, validation, linting) — first priority

Configured and run **before** any scaffold or feature work. Every commit must pass pre-commit checks. All runnable via pnpm scripts.

| Tool                       | Purpose                | Pre-commit                    | Notes                                                                                                                                                        |
| -------------------------- | ---------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **TSC / astro check**      | Type-checking          | Yes (when TS/JS/Astro staged) | `pnpm check` or `pnpm type-check`; strict mode. When any TS/JS/Astro file is staged, run **full-project** type-check so the whole codebase stays type-clean. |
| **Husky + lint-staged**    | Pre-commit hooks       | —                             | When TS/JS/Astro staged → full-project type-check; ESLint/Prettier/MarkdownLint on staged files; blocks commit on failure.                                   |
| **ESLint**                 | Code linting           | Yes                           | TypeScript, React/JSX, Astro plugins; flat config (`eslint.config.js`).                                                                                      |
| **Prettier**               | Formatting             | Yes                           | JS/TS/JSX/TSX, Astro, CSS, MD.                                                                                                                               |
| **MarkdownLint**           | Markdown linting       | Yes                           | `.md` in repo and content; `markdownlint-cli`.                                                                                                               |
| **eslint-plugin-jsx-a11y** | A11y lint (axe-style)  | Yes                           | React/JSX (and Astro client scripts as applicable).                                                                                                          |
| **Lighthouse**             | A11y, SEO, performance | No (script + optional CI)     | `pnpm lighthouse` against preview/build; too slow for pre-commit.                                                                                            |

**CI (recommended):** Run `pnpm check` and `pnpm lint` (and optionally `pnpm lint:md`) on push or PR to protect main; Lighthouse in CI optional. **Security (optional):** Consider `pnpm audit` or audit in CI for dependency vulnerabilities.

**Reference:** `$HOME/projects/arielperez.io` and `$HOME/projects/the-adaptive-alchemist` for `package.json` scripts, `lint-staged.config.js`, `.husky/pre-commit`, and `eslint.config.js` (TypeScript, React, Astro, jsx-a11y).

---

### 1.2 Framework and hosting

| Layer               | Choice               | Notes                                                                                |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------ |
| **Framework**       | Astro 5.x            | Static output (`output: 'static'`). Content-driven; minimal client JS.               |
| **Styling**         | Tailwind CSS 4.x     | Via `@tailwindcss/vite`. Custom theme for Tierra Viva palette.                       |
| **Components**      | React 19.x (islands) | Where interactivity needed: nav, forms, carousels. Prefer Astro for static sections. |
| **Language**        | TypeScript           | Strict mode. No `any`.                                                               |
| **Package manager** | pnpm                 | Lockfile and scripts aligned with arielperez.io.                                     |
| **Hosting**         | GitHub Pages         | Actions build + deploy (artifact → Pages). Custom domain optional (CNAME).           |

**Reference:** Astro [framework guide (Tailwind)](https://tailwindcss.com/docs/installation/framework-guides/astro), [install and setup](https://docs.astro.build/en/install-and-setup/). Prefer `astro add tailwind` / `astro add react` for integrations.

---

## 2. Repository and Project Structure

Mirror the exemplar (arielperez.io) where applicable:

```
tierra-viva-public-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build + upload artifact → GitHub Pages
├── public/
│   ├── favicon.ico, favicon.svg
│   ├── favicon/                # Optional: 16, 32, 180, 192, 512, webmanifest
│   ├── CNAME                   # If custom domain (e.g. tierravivainvestments.com)
│   └── assets/                 # Logo, images (no content in repo that must be secret)
├── src/
│   ├── assets/                 # Images referenced by components (or use public)
│   ├── components/             # Shared UI
│   │   ├── Header.tsx | .astro
│   │   ├── Footer.tsx | .astro
│   │   └── sections/           # Hero, WhyModel, WhereFocused, ValueGovernance, etc.
│   ├── content/                # Optional: content collections for Research (I4)
│   │   └── config.ts
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML shell, meta, fonts, <slot />
│   ├── pages/
│   │   ├── index.astro         # Home (I1: single page; I2+: hub with sections + links)
│   │   ├── about.astro         # I2
│   │   ├── strategy.astro      # I2
│   │   ├── platform.astro      # I2
│   │   ├── responsible-investment.astro  # I2
│   │   ├── team.astro          # I2
│   │   ├── contact.astro        # I2
│   │   ├── projects/           # I3
│   │   │   └── index.astro     # Projects & Focus (Altos de Gurabo)
│   │   └── research/           # I4
│   │       ├── index.astro     # Hub
│   │       └── [...slug].astro or content collection routes
│   ├── styles/
│   │   └── global.css          # @import tailwind; @config; base layer
│   ├── consts.ts               # SITE_TITLE, CONTACT_EMAIL, site URL, default meta, nav items
│   └── types/                  # As needed
├── astro.config.mjs
├── tailwind.config.mjs         # Or @theme in global.css (Tailwind v4)
├── tsconfig.json
├── package.json
└── .plan/                      # Planning docs (this spec, implementation-plan, backlog)
```

**Routing:** File-based. One logical page per route. No dynamic routes until Research articles (I4); then use content collection or `getStaticPaths` for one URL per article.

---

## 3. Design System and Theming

### 3.1 Brand Colors (from logo)

| Role                 | Hex                      | Usage                                                          |
| -------------------- | ------------------------ | -------------------------------------------------------------- |
| **Forest (primary)** | `#2E6E30`                | Headings, nav, primary buttons, key accents.                   |
| **Forest dark**      | `#1E4A1F`                | Headers, footer background, hover states (professional depth). |
| **Lime (accent)**    | `#68B62C`                | CTAs, links, highlights, “VIVA” emphasis. Use sparingly.       |
| **Neutral / body**   | `#262626` (or `#333333`) | Body text, footer text, “INVESTMENTS” tone.                    |
| **Background**       | `#FFFFFF`, `#FAFAFA`     | Page and section backgrounds (Bexer-style clean).              |

**Principle:** Lead with forest and neutral for trust; use lime for CTAs and key emphasis only.

### 3.2 Tailwind Theme

- Extend theme with custom colors (e.g. `tierra-forest`, `tierra-forest-dark`, `tierra-lime`, `tierra-neutral`).
- Typography: sans-serif stack (e.g. system-ui or a single webfont like Inter/Plus Jakarta) for clarity and professionalism.
- Spacing and breakpoints: Tailwind defaults; match Bexer-Astro section padding and max-width for readability.

### 3.3 Layout Exemplar (Bexer-Astro)

- **Hero:** Full-width, strong headline + subhead, primary/secondary CTA.
- **Sections:** Clear H2s, alternating or card-based blocks (e.g. four pillars as tiles).
- **Footer:** Multi-column (brand, links, contact, optional newsletter), disclaimer prominent.
- **Nav:** Sticky or fixed header; mobile menu; nav order per implementation-plan (About → Strategy → Platform → Projects & Focus → Responsible Investment → Team & Governance → Research & Insights → Contact).

Implement layout and section patterns in Astro/React to achieve the same “business agency” feel without copying Bexer content.

---

## 4. SEO and Meta

### 4.1 Iteration 1 (single page)

- **Canonical:** One URL (e.g. `https://<org>.github.io/tierra-viva-public-site/` or custom domain root).
- **H1:** One per page — hero headline: “Living Capital for Living Places.”
- **H2s:** Section titles (Why Tierra Viva, An Education-Anchored Development Model, Where We’re Focused, etc.). Each H2 maps to a future URL so that when splitting in I2, headings and URLs stay aligned:

| Section (I1 H2)             | Intended URL (I2+)                        |
| --------------------------- | ----------------------------------------- |
| Why Tierra Viva / Our Model | /platform (pillars) + /about (who we are) |
| Where We’re Focused         | /projects                                 |
| Value & Governance          | /strategy                                 |
| Responsible Investment      | /responsible-investment                   |
| Team                        | /team                                     |
| Research                    | /research                                 |
| Partner With Us             | /contact                                  |

- **Target phrases (I1):** e.g. “Tierra Viva,” “education-anchored communities Latin America,” “Dominican Republic real estate investment.” One clear answer-style sentence near the top (what Tierra Viva is and where it operates) for AEO.

### 4.2 Technical SEO

- **Meta:** Per-page `title` and `description` (from consts or frontmatter). Open Graph and Twitter card where useful.
- **Sitemap:** `@astrojs/sitemap` with `site` and `base` set correctly; exclude 404.
- **Structured data:** Organization (and optionally LocalBusiness or Place for Projects) as needed; no offer/solicitation in schema.
- **Base URL:** For now (GitHub Pages project site): `base: '/tierra-viva-public-site/'` and `site: 'https://<org>.github.io'`. When moving to custom domain: set `site: 'https://www.tierravivainvest.com'`, remove `base`, add `public/CNAME` with `www.tierravivainvest.com`.

---

## 5. Accessibility

- **Semantics:** One H1 per page; heading hierarchy (H2 → H3) no skips.
- **Focus and keyboard:** All interactive elements focusable; visible focus style; skip link optional but recommended.
- **Images:** Alt text for all meaningful images; decorative images with empty alt or role.
- **Color:** Contrast ratios ≥ 4.5:1 for body, ≥ 3:1 for large text and UI (WCAG 2.1).
- **Motion:** Respect `prefers-reduced-motion` for carousels/animations.

---

## 6. Content Model

- **No CMS** for I1–I3. Copy lives in:
  - **Consts / frontmatter:** Nav labels, site title, default meta.
  - **Page/section components:** Section copy as props or in Astro frontmatter.
- **I4 (Research):** Content collection for articles (`src/content/research/`) with frontmatter (title, description, slug, date). One Markdown/MDX file per article → one URL via a single **templated article layout** (e.g. `src/pages/research/[...slug].astro` with `getStaticPaths` from the collection). Hub page lists entries.

No fund terms, IRR, MOIC, or pricing in any content or schema.

**Site constants (for implementation):**

- **Contact email (mailto for now):** `info@tierravivainvest.com`. Use for “Start an Introductory Conversation” and “Explore Partnership Opportunities” until a form or backend exists.
- **Future canonical site:** `https://www.tierravivainvest.com`.

---

## 7. Deployment (GitHub Pages)

- **Build:** `pnpm build` → `dist/` (Astro static).
- **Deploy:** GitHub Actions workflow:
  - Trigger: push to `main` (and optionally `workflow_dispatch`) for paths: `src/**`, `public/**`, config files.
  - Job: install (pnpm), build, upload artifact with `actions/upload-pages-artifact@v3` (`path: dist`).
  - Deploy: `actions/deploy-pages@v4`. Use “GitHub Actions” as source in repo Settings → Pages.
- **Custom domain (later):** When switching to **www.tierravivainvest.com**: add `public/CNAME` with `www.tierravivainvest.com`; set `site: 'https://www.tierravivainvest.com'` and remove `base` in `astro.config.mjs`; configure DNS per GitHub docs.

---

## 8. Out of Scope (This Spec)

- Backend or auth.
- Fund terms, offering materials, or investor portal.
- Blog beyond “Research & Insights” (I4) as a static content hub.

---

## 9. References

- Implementation plan: `.plan/implementation-plan.md`
- Development plan and backlog: `.plan/development-plan.md`, `.plan/backlog.md` (execution order: quality gate → scaffold → iterations).
- Wireframe and copy intent: `.plan/wireframe.md`, `.plan/website-proposal.md`
- Brand/source content: `.plan/tierra-viva.md`
- Layout exemplar: https://bexer-astro.vercel.app/?aff=ab
- Structure/tooling reference: arielperez.io (Astro, Tailwind, React, GitHub Pages deploy)
