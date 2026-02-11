---
initiative: I01-VR
initiative_name: Tierra Viva Website Visual Redesign
type: backlog
status: active
owner: Ramon Marmolejos
created: 2026-02-11
updated: 2026-02-11
---

# Product Backlog: Tierra Viva Website Visual Redesign

## Personas

| Persona              | Description                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| Prospective Investor | LP or family office evaluating Tierra Viva as a real estate investment opportunity             |
| Potential Partner    | Developer, school operator, or broker exploring collaboration with Tierra Viva                 |
| Site Visitor         | General visitor discovering Tierra Viva through search, referral, or social for the first time |

## Priority Key

| Priority | Meaning                                   | Phase Target |
| -------- | ----------------------------------------- | ------------ |
| P0       | Must-have -- blocks launch                | Phase 1      |
| P1       | Should-have -- important but not blocking | Phase 2      |
| P2       | Nice-to-have -- enhances but can defer    | Phase 3      |

## Effort Key

| Size | Meaning                                                 |
| ---- | ------------------------------------------------------- |
| S    | Small -- under 2 hours, single file or token change     |
| M    | Medium -- 2-6 hours, one component or section           |
| L    | Large -- 6+ hours, multiple components or cross-cutting |

---

## Epic 1: Design Foundation (Typography + Colors + Tokens)

Foundation work that every other epic depends on. Must be completed first.

### I01-VR-B01 -- Load DM Serif Display for headlines

**Story:** As a Site Visitor, I want to see elegant serif headlines so that the site immediately communicates institutional sophistication.

**Acceptance Criteria:**

- DM Serif Display (weight 400) is loaded from Google Fonts
- A `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` are present in `BaseLayout.astro` `<head>`
- `font-display: swap` is specified in the Google Fonts URL
- All `<h1>` and `<h2>` elements render in DM Serif Display
- Fallback font stack is `Georgia, "Times New Roman", serif`
- CLS remains < 0.1 on mobile (3G throttle test)

**Priority:** P0
**Effort:** S
**Dependencies:** None

---

### I01-VR-B02 -- Load Inter for body and UI text

**Story:** As a Site Visitor, I want body text rendered in a clean, professional sans-serif so that content is easy to read and feels polished.

**Acceptance Criteria:**

- Inter (weights 400, 500, 600) is loaded from Google Fonts
- The `body` font-family in `global.css` is updated from system font stack to `"Inter", system-ui, -apple-system, sans-serif`
- All paragraph, navigation, button, and label text renders in Inter
- Existing font-weight utilities (`font-medium`, `font-semibold`) map to Inter weights 500 and 600

**Priority:** P0
**Effort:** S
**Dependencies:** None

---

### I01-VR-B03 -- Load IBM Plex Mono for statistics and data

**Story:** As a Prospective Investor, I want financial figures displayed in a monospace typeface so that numerical data stands out and feels precise.

**Acceptance Criteria:**

- IBM Plex Mono (weights 500, 700) is loaded from Google Fonts
- A Tailwind utility class `font-mono` resolves to `"IBM Plex Mono", ui-monospace, monospace`
- The font is only used in the Stats Strip section and any future data-display contexts
- Total combined font payload for all three font families is under 150 KB (woff2)

**Priority:** P0
**Effort:** S
**Dependencies:** None

---

### I01-VR-B04 -- Add warm neutral color tokens to Tailwind theme

**Story:** As a Site Visitor, I want the site to use warm, layered background tones so that the experience feels premium rather than flat.

**Acceptance Criteria:**

- The following tokens are added to the `@theme` block in `src/styles/global.css`:
  - `--color-tierra-cream: #faf8f5`
  - `--color-tierra-sand: #f0ebe3`
  - `--color-tierra-stone: #d4cdc4`
  - `--color-tierra-graphite: #3d3833`
  - `--color-tierra-ink: #1a1714`
- All five existing green tokens remain unchanged
- Tailwind classes `bg-tierra-cream`, `bg-tierra-sand`, `text-tierra-graphite`, `text-tierra-ink`, `border-tierra-stone` all work correctly
- Contrast ratio of `tierra-ink` on `tierra-cream` is >= 7:1 (AAA)
- Contrast ratio of `tierra-graphite` on `tierra-cream` is >= 4.5:1 (AA)

**Priority:** P0
**Effort:** S
**Dependencies:** None

---

### I01-VR-B05 -- Define heading typography utility classes

**Story:** As a Site Visitor, I want a consistent typographic hierarchy across all pages so that headings, subheadings, and body text are clearly distinguished.

**Acceptance Criteria:**

- `h1` elements use DM Serif Display, `text-tierra-ink`, with size responsive from `text-3xl` to `text-5xl`
- `h2` elements use DM Serif Display, `text-tierra-ink`, with size responsive from `text-2xl` to `text-3xl`
- `h3` elements use Inter semibold (600), `text-tierra-graphite`
- Body paragraphs use Inter regular (400), `text-tierra-graphite`
- The hierarchy is visually distinct at every breakpoint (mobile, tablet, desktop)
- No existing heading content or semantics are altered

**Priority:** P0
**Effort:** S
**Dependencies:** I01-VR-B01, I01-VR-B02

---

## Epic 2: Hero Redesign

Transform the hero from centered text on dark green to an asymmetric, editorial layout.

### I01-VR-B06 -- Asymmetric hero layout with serif headline

**Story:** As a Site Visitor, I want to see an impactful, asymmetric hero section when I land on the homepage so that I immediately understand this is a serious institutional platform.

**Acceptance Criteria:**

- Hero background changes from `bg-tierra-forest-dark` to `bg-tierra-cream`
- Layout is two-column on desktop (lg+): headline and copy on the left (~60%), visual element on the right (~40%)
- Layout stacks to single column on mobile with headline above visual
- Headline "Living Capital for Living Places" renders in DM Serif Display, `text-tierra-ink`
- Subtext renders in Inter, `text-tierra-graphite`
- Left column contains headline, two paragraphs of copy, and the CTA buttons
- The existing text content is preserved exactly

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B01, I01-VR-B02, I01-VR-B04

---

### I01-VR-B07 -- CSS geometric art element for hero

**Story:** As a Site Visitor, I want to see an abstract visual element in the hero so that the section has visual weight even without photography.

**Acceptance Criteria:**

- Right column of hero contains a CSS-generated geometric composition using brand greens and warm neutrals
- Composition uses only CSS (gradients, `border-radius`, `clip-path`, absolute positioning) -- no raster images, no external SVGs
- Element is decorative only (`aria-hidden="true"`)
- Renders consistently in Chrome, Safari, and Firefox (latest versions)
- On mobile, the element scales down proportionally or is hidden if it compromises readability
- `prefers-reduced-motion` has no effect (element is static)

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B04, I01-VR-B06

---

### I01-VR-B08 -- Hero CTA button upgrades

**Story:** As a Prospective Investor, I want clear, prominent call-to-action buttons in the hero so that I can immediately start a conversation or explore the thesis.

**Acceptance Criteria:**

- "Start an Introductory Conversation" button has: `bg-tierra-forest`, white text, `rounded-lg`, `px-6 py-3.5`, `shadow-md`, hover state with `shadow-lg` + slight darken
- "Explore Our Thesis" button has: transparent bg, `border-2 border-tierra-forest`, `text-tierra-forest`, `rounded-lg`, `px-6 py-3.5`, hover state with `bg-tierra-forest/5`
- Both buttons have `transition-all duration-200`
- Focus ring styles are preserved for accessibility
- Buttons stack vertically on mobile, sit side by side on sm+

**Priority:** P0
**Effort:** S
**Dependencies:** I01-VR-B06

---

## Epic 3: Homepage Section Upgrades

Redesign each homepage section to have distinct layout, background, and visual character.

### I01-VR-B09 -- Stats Strip section (new)

**Story:** As a Prospective Investor, I want to see key fund metrics (fund size, units, land area, target IRR) prominently displayed so that I can quickly assess the scale and ambition of the platform.

**Acceptance Criteria:**

- New section inserted between Hero and Why + Model in `index.astro`
- Background is `bg-tierra-forest-dark`, full-width
- Displays exactly 4 metrics in a horizontal row (2x2 grid on mobile):
  - "$30M" with label "Target Fund"
  - "150" with label "Residential Units"
  - "250K sqm" with label "Site Area"
  - "26%" with label "Target IRR"
- Numbers render in IBM Plex Mono bold (700), `text-tierra-lime`, responsive from `text-3xl` to `text-5xl`
- Labels render in Inter, `text-white/80`, `text-sm`
- Section has `aria-label="Key metrics"` for screen readers
- No fund financial terms beyond these four public-safe figures

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B03, I01-VR-B04

---

### I01-VR-B10 -- Why + Model section with asymmetric card grid

**Story:** As a Site Visitor, I want to understand Tierra Viva's four pillars through visually distinct cards so that the model is immediately clear and memorable.

**Acceptance Criteria:**

- Section background changes from `bg-tierra-white` to `bg-tierra-cream`
- Layout becomes two-column on desktop: narrative text on the left, 2x2 pillar card grid on the right
- Stacks to single column on mobile: text above, then card grid
- "Why Tierra Viva" heading and introductory paragraphs appear in the left column
- The four pillar cards from `PILLARS` data are rendered in a 2x2 grid
- Each card has: `rounded-xl`, `bg-white`, `shadow-sm`, `border border-tierra-stone/30`
- Each card has a hover state: `shadow-md` + `translate-y` of -2px, with `transition-all duration-200`
- Each card displays an SVG line-art icon (see I01-VR-B18) above the title
- Existing pillar text content is preserved exactly

**Priority:** P0
**Effort:** L
**Dependencies:** I01-VR-B04, I01-VR-B05, I01-VR-B18

---

### I01-VR-B11 -- Where We're Focused section with SVG map

**Story:** As a Prospective Investor, I want to see a visual map showing where Tierra Viva operates so that I can immediately understand the geographic focus.

**Acceptance Criteria:**

- The "Visual coming soon" placeholder div is removed entirely
- An inline SVG map of Hispaniola / Dominican Republic replaces it, with Santiago marked
- SVG uses brand colors: land in `tierra-sage/30`, border in `tierra-forest`, Santiago pin in `tierra-lime`
- SVG is responsive and scales within a `max-w-2xl` container
- SVG includes `role="img"` and `aria-label="Map of the Dominican Republic highlighting Santiago"` for accessibility
- Section background changes to `bg-tierra-sand`
- "Altos de Gurabo" label is visible near the Santiago marker
- Text content is preserved exactly

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B04

---

### I01-VR-B12 -- Value & Governance section with icon bullets

**Story:** As a Prospective Investor, I want to see Tierra Viva's governance principles presented with visual icons so that I can quickly scan and trust the governance approach.

**Acceptance Criteria:**

- Section layout becomes centered editorial with max-width prose container
- Background is `bg-tierra-cream`
- Heading renders in DM Serif Display
- The bullet list items are replaced with icon-bullet pairs: each item has a small inline SVG icon (check, shield, or similar) in `tierra-forest` to the left of the text
- List uses `space-y-4` with `flex items-start gap-3` per item instead of `list-disc`
- Links to Strategy and Responsible Investment pages are preserved
- Existing content is preserved exactly; only the "Responsible Investment" homepage section content is merged here if the section consolidation is pursued (see charter scope note)

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B04, I01-VR-B05

---

### I01-VR-B13 -- Team section with card layout

**Story:** As a Prospective Investor, I want to see the team presented in a professional card layout so that I have confidence in the people behind the platform.

**Acceptance Criteria:**

- Section background changes to `bg-tierra-sand`
- Ramon Marmolejos is displayed in a highlighted card: `bg-white`, `rounded-xl`, `shadow-sm`, `border border-tierra-stone/30`
- Card includes a circular placeholder avatar area (80x80px, `bg-tierra-sage/30`, `rounded-full`) that can later accept a photo
- Name in Inter semibold, title in Inter regular `text-tierra-graphite`, bio text below
- "Supported by advisors and partners..." text appears below the card
- "Meet the Team" link is preserved
- Card has the same hover behavior as pillar cards (shadow-md, slight elevation)
- Layout centers the card on desktop with `max-w-lg mx-auto`

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B04, I01-VR-B05

---

### I01-VR-B14 -- Research section with article list style

**Story:** As a Prospective Investor, I want to browse research articles in a scannable list format so that I can quickly find topics relevant to my due diligence.

**Acceptance Criteria:**

- Section background is `bg-tierra-cream`
- The three research links are restyled as article list items, each containing:
  - Article title in Inter semibold, `text-tierra-ink`, as a link
  - A date line (placeholder: "2026") in `text-sm text-tierra-graphite/60`
  - A one-line description in Inter regular, `text-tierra-graphite`
- Items are separated by `border-b border-tierra-stone/30` dividers
- Each item has `py-5` vertical padding
- Hover state on each item: slight background tint `bg-tierra-sand/50`
- "Explore Research & Insights" link is preserved at the bottom
- Article titles and links point to the same URLs as current

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B04, I01-VR-B05

---

### I01-VR-B15 -- Partner With Us section with dark background and dual CTAs

**Story:** As a Prospective Investor or Potential Partner, I want a clear final call-to-action that distinguishes between investor and partner paths so that I can take the appropriate next step.

**Acceptance Criteria:**

- Section background changes from `bg-tierra-white` to `bg-tierra-forest-dark`
- Headline "Partner With Us" renders in DM Serif Display, `text-white`
- Description text renders in Inter, `text-white/90`
- Two CTAs are displayed side by side (stacking on mobile):
  - "For Investors" button: `bg-tierra-lime`, `text-tierra-forest-dark`, `rounded-lg`, `px-6 py-3.5`, `shadow-md`
  - "For Partners" button: transparent bg, `border-2 border-white/80`, `text-white`, `rounded-lg`, `px-6 py-3.5`
- Both buttons link to `mailto:info@tierravivainvest.com`
- Hover states and focus rings are preserved
- Text content is preserved exactly

**Priority:** P0
**Effort:** M
**Dependencies:** I01-VR-B04, I01-VR-B05

---

### I01-VR-B16 -- Remove ResponsibleInvestment homepage section

**Story:** As a Site Visitor, I want a focused homepage without redundant sections so that I can absorb the key messages without information overload.

**Acceptance Criteria:**

- The `<ResponsibleInvestment />` component is removed from `index.astro`
- The homepage renders 8 sections (Hero, Stats Strip, Why+Model, Where, Value & Governance, Team, Research, Partner With Us)
- The `/responsible-investment` inner page is completely unaffected
- The "Value & Governance" section (I01-VR-B12) includes a link to the Responsible Investment page
- The footer link to Responsible Investment is preserved

**Priority:** P0
**Effort:** S
**Dependencies:** I01-VR-B12

---

## Epic 4: Component System (Cards, Buttons, Animations)

Establish reusable components that apply across the homepage and inner pages.

### I01-VR-B17 -- Reusable card component with hover elevation

**Story:** As a Site Visitor, I want interactive cards that respond to my hover so that the site feels modern and engaging.

**Acceptance Criteria:**

- A reusable card pattern is established (can be CSS-only or an Astro component)
- Default card styles: `rounded-xl`, `bg-white`, `shadow-sm`, `border border-tierra-stone/30`, `p-6`
- Hover state: `shadow-md`, `transform: translateY(-2px)`, `transition-all duration-200`
- Cards respect `prefers-reduced-motion: reduce` by disabling the translateY transform
- Card pattern is used consistently in: pillar cards (Why+Model), team card, and any future card contexts
- Focus-within state shows a ring for keyboard navigation

**Priority:** P1
**Effort:** M
**Dependencies:** I01-VR-B04

---

### I01-VR-B18 -- SVG line-art icons for four pillars

**Story:** As a Site Visitor, I want each pillar card to have a distinctive icon so that I can visually distinguish the four pillars at a glance.

**Acceptance Criteria:**

- Four inline SVG icons are created, one for each pillar:
  - Learning as the Catalyst: book or graduation cap motif
  - Homes that Regenerate Place: house or leaf motif
  - Enterprise that Multiplies Opportunity: growth or handshake motif
  - Stewardship for the Long Term: shield or tree motif
- Each SVG is monochrome, using `currentColor` for stroke, sized at 32x32px
- Icons are line-art style (stroke only, no fill), stroke-width of 1.5-2
- Icons have `aria-hidden="true"` (decorative; card title provides meaning)
- Icons are placed above the card title in each pillar card

**Priority:** P0
**Effort:** M
**Dependencies:** None

---

### I01-VR-B19 -- Button component system with generous sizing

**Story:** As a Prospective Investor, I want buttons that are easy to tap and visually prominent so that I never miss a call to action.

**Acceptance Criteria:**

- Primary button style: `bg-tierra-forest`, `text-white`, `rounded-lg`, `px-6 py-3.5`, `font-medium`, `shadow-md`, hover `shadow-lg` + slight darken
- Secondary button style: transparent bg, `border-2 border-tierra-forest`, `text-tierra-forest`, `rounded-lg`, `px-6 py-3.5`, hover `bg-tierra-forest/5`
- Dark-bg primary variant: `bg-tierra-lime`, `text-tierra-forest-dark`, hover slight darken
- Dark-bg secondary variant: `border-2 border-white/80`, `text-white`, hover `bg-white/10`
- All buttons have `transition-all duration-200`
- All buttons preserve existing focus ring accessibility styles
- Minimum touch target is 44x44px

**Priority:** P1
**Effort:** M
**Dependencies:** I01-VR-B04

---

### I01-VR-B20 -- Scroll-reveal fade-up animation utility

**Story:** As a Site Visitor, I want sections to gently fade in as I scroll so that the page feels alive and guides my attention downward.

**Acceptance Criteria:**

- An `IntersectionObserver`-based script adds a `data-revealed` attribute to elements with a `data-reveal` attribute when they enter the viewport
- CSS transition: elements start with `opacity: 0` and `translateY(24px)`, animate to `opacity: 1` and `translateY(0)` over 600ms with an ease-out curve
- Animation triggers once per element (no re-animation on scroll up)
- `prefers-reduced-motion: reduce` disables the animation entirely: elements appear immediately with no opacity or transform change
- The utility is applied to all below-fold homepage sections (Stats Strip through Partner With Us)
- Script is minimal (< 30 lines), loaded with `defer`, and does not import any external libraries
- Stagger: sequential elements within a section can accept a `data-reveal-delay` attribute for 100ms increments

**Priority:** P1
**Effort:** M
**Dependencies:** None

---

### I01-VR-B21 -- Icon bullet component for lists

**Story:** As a Site Visitor, I want bullet lists to use small icons instead of plain dots so that the content feels more designed and scannable.

**Acceptance Criteria:**

- A reusable icon-bullet list pattern replaces `list-disc` in the Value & Governance section
- Each list item is a `flex items-start gap-3` container with a small SVG icon (16x16px) and the text
- Icon options: checkmark circle, shield, or chevron-right, all in `text-tierra-forest`
- Icons have `aria-hidden="true"` and `flex-shrink-0`
- Pattern can be reused on inner pages

**Priority:** P1
**Effort:** S
**Dependencies:** I01-VR-B04

---

## Epic 5: Navigation & Footer

Upgrade the header and footer to match the new design language.

### I01-VR-B22 -- Header scroll-triggered transparency

**Story:** As a Site Visitor, I want the header to become translucent with a blur effect as I scroll so that more of the page content is visible while navigation remains accessible.

**Acceptance Criteria:**

- Header starts with `bg-white` when scroll position is at top (scrollY === 0)
- After scrolling past a threshold (e.g., 50px), header transitions to `bg-white/80 backdrop-blur-md`
- Transition is smooth: `transition-all duration-300`
- `prefers-reduced-motion: reduce` disables the transition (instant switch)
- Header remains `sticky top-0 z-100` throughout
- The mobile menu continues to function correctly in both states
- Border-bottom becomes `border-tierra-stone/20` to match new neutral palette

**Priority:** P1
**Effort:** M
**Dependencies:** I01-VR-B04

---

### I01-VR-B23 -- Footer multi-column redesign

**Story:** As a Site Visitor, I want a comprehensive footer with organized navigation, location information, and the company logo so that I can easily find secondary pages and understand where Tierra Viva is based.

**Acceptance Criteria:**

- Footer layout becomes multi-column on desktop (3 or 4 columns), stacking on mobile
- Column 1: Tierra Viva logo (existing horizontal PNG, white version or inverted), location text "Santiago, Dominican Republic"
- Column 2: "Platform" nav group -- links to About, Strategy, Platform, Projects
- Column 3: "Resources" nav group -- links to Research & Insights, Responsible Investment, Team & Governance
- Column 4 (or merged): "Legal" nav group -- links to Privacy Policy, Jurisdiction Notice, Contact
- The regulatory disclaimer text remains at the bottom, full-width, in `text-xs text-white/60`
- Background remains `bg-tierra-forest-dark`, text remains white
- All existing links are preserved; no links are added or removed
- Footer is wrapped in `<footer>` with `role="contentinfo"` (already present)

**Priority:** P1
**Effort:** L
**Dependencies:** I01-VR-B04

---

### I01-VR-B24 -- Header navigation text in Inter

**Story:** As a Site Visitor, I want the navigation to render in the new Inter typeface so that the header is consistent with the rest of the site.

**Acceptance Criteria:**

- All nav links in the header render in Inter
- The "Start a Conversation" CTA button in the header uses the primary button style (I01-VR-B19)
- Nav link hover state changes to `hover:bg-tierra-sand` (warm neutral instead of `hover:bg-tierra-sage/20`)
- Font size and weight remain the same (`text-sm font-medium`)

**Priority:** P1
**Effort:** S
**Dependencies:** I01-VR-B02, I01-VR-B04

---

## Epic 6: Inner Page Upgrades

Apply the new design system to all existing inner pages.

### I01-VR-B25 -- Apply serif headings to all inner pages

**Story:** As a Site Visitor, I want inner pages to use the same serif headings as the homepage so that the entire site feels cohesive.

**Acceptance Criteria:**

- All `<h1>` elements on the 10 inner pages (About, Strategy, Platform, Projects, Responsible Investment, Team, Research, Contact, Privacy, Jurisdiction) render in DM Serif Display
- All `<h2>` elements on inner pages render in DM Serif Display
- Body text on all inner pages renders in Inter
- No content changes -- only font-family and related styling
- Pages are visually reviewed for heading hierarchy consistency

**Priority:** P2
**Effort:** M
**Dependencies:** I01-VR-B01, I01-VR-B02, I01-VR-B05

---

### I01-VR-B26 -- Apply warm neutral backgrounds to inner pages

**Story:** As a Site Visitor, I want inner pages to use the warm cream and sand tones so that navigating from the homepage to a subpage feels seamless.

**Acceptance Criteria:**

- Inner page article backgrounds use `bg-tierra-cream` instead of default white
- Text color updates to `text-tierra-graphite` for body, `text-tierra-ink` for headings
- Link styles update to match new palette where applicable
- The "Back to home" links remain functional and styled consistently

**Priority:** P2
**Effort:** S
**Dependencies:** I01-VR-B04, I01-VR-B25

---

### I01-VR-B27 -- Team inner page card layout

**Story:** As a Prospective Investor, I want the Team & Governance page to display team members in the same card format as the homepage so that the experience is consistent and professional.

**Acceptance Criteria:**

- Ramon Marmolejos is displayed in the same card component used on the homepage (I01-VR-B17)
- Card includes circular placeholder avatar area
- Layout supports future expansion to multiple team member cards in a grid
- Existing content (name, title, bio) is preserved exactly
- Card hover behavior matches homepage pillar cards

**Priority:** P2
**Effort:** M
**Dependencies:** I01-VR-B17, I01-VR-B25

---

### I01-VR-B28 -- Strategy page with icon bullet lists

**Story:** As a Prospective Investor, I want the Strategy page to use icon bullets so that the thesis and execution details are easy to scan.

**Acceptance Criteria:**

- Any bullet lists on the Strategy page use the icon-bullet pattern (I01-VR-B21) instead of `list-disc`
- Headings use DM Serif Display
- Body text uses Inter
- Content is preserved exactly

**Priority:** P2
**Effort:** S
**Dependencies:** I01-VR-B21, I01-VR-B25

---

### I01-VR-B29 -- Responsible Investment page with icon bullets

**Story:** As a Prospective Investor, I want the Responsible Investment page to visually highlight the four responsibility pillars so that the governance approach is clearly communicated.

**Acceptance Criteria:**

- The four bullet items (Governance & Transparency, Environmental Resilience, Social Foundations, Stewardship Orientation) use icon-bullet styling
- Each pillar's `<strong>` label is in Inter semibold, `text-tierra-ink`
- Heading uses DM Serif Display
- Content is preserved exactly

**Priority:** P2
**Effort:** S
**Dependencies:** I01-VR-B21, I01-VR-B25

---

### I01-VR-B30 -- Research inner page article list style

**Story:** As a Prospective Investor, I want the Research index page to use the same article list format as the homepage research section so that browsing articles is consistent.

**Acceptance Criteria:**

- Research articles are displayed in the list format defined in I01-VR-B14 (title, date, description, dividers)
- Heading uses DM Serif Display
- Body text uses Inter
- Existing links and content are preserved exactly

**Priority:** P2
**Effort:** S
**Dependencies:** I01-VR-B14, I01-VR-B25

---

## Epic Summary and Dependency Graph

### Story Count by Epic

| Epic      | Name                      | Stories | P0     | P1    | P2    |
| --------- | ------------------------- | ------- | ------ | ----- | ----- |
| 1         | Design Foundation         | 5       | 5      | 0     | 0     |
| 2         | Hero Redesign             | 3       | 3      | 0     | 0     |
| 3         | Homepage Section Upgrades | 8       | 8      | 0     | 0     |
| 4         | Component System          | 5       | 1      | 4     | 0     |
| 5         | Navigation & Footer       | 3       | 0      | 3     | 0     |
| 6         | Inner Page Upgrades       | 6       | 0      | 0     | 6     |
| **Total** |                           | **30**  | **17** | **7** | **6** |

### Critical Path

```text
B01 (Serif Font) ──┐
B02 (Sans Font) ───┤
B03 (Mono Font) ───┤
B04 (Color Tokens) ┤
                   ├── B05 (Type Hierarchy) ──┬── B06 (Hero Layout) ── B07 (Hero Art)
                   │                          │                        B08 (Hero CTAs)
                   │                          ├── B10 (Why+Model) ──── requires B18 (Icons)
                   │                          ├── B12 (Value/Gov) ──── B16 (Remove RI section)
                   │                          ├── B13 (Team cards)
                   │                          ├── B14 (Research list)
                   │                          └── B15 (Partner CTA)
                   │
                   ├── B09 (Stats Strip) ──── requires B03 (Mono Font)
                   ├── B11 (SVG Map) ──────── standalone after B04
                   ├── B17 (Card component)
                   ├── B19 (Button component)
                   ├── B22 (Header blur)
                   └── B23 (Footer redesign)
```

### Suggested Sprint Mapping

**Sprint 1 (Week 1-2):** I01-VR-B01 through I01-VR-B09 -- Foundation tokens + Hero + Stats Strip
**Sprint 2 (Week 2-3):** I01-VR-B10 through I01-VR-B16, I01-VR-B18 -- All remaining homepage sections + pillar icons
**Sprint 3 (Week 4-5):** I01-VR-B17, I01-VR-B19 through I01-VR-B24 -- Component system + navigation
**Sprint 4 (Week 6):** I01-VR-B25 through I01-VR-B30 -- Inner page upgrades
