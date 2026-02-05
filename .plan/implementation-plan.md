# Tierra Viva Public Website — Implementation Plan

**Date:** February 4, 2026  
**Inputs:** website-proposal.md, tierra-viva.md, wireframe.md, competitive-research.md  
**Perspectives:** Senior PM (scope, iterations, stakeholders), Product Analyst (offer, jobs, prioritization), UI Designer (structure, flow), Content Creator (copy per phase), SEO Strategist (discoverability, IA)

**Scope of this document:** What pages the site will have, in what order they are built, and what copy/content each iteration includes. No technical specifications—those follow once this plan is agreed. **Execution order** (quality gate, scaffold, then Iterations 1–5) is defined in `.plan/development-plan.md` and `.plan/backlog.md`.

**Revisions (post SEO & Content review):** Iteration 1 copy and structure tightened; About vs. Home intent split; Projects & Focus label fixed; Research = hub + one URL per article; Team/Contact/voice and Content & SEO handoff added. See implementation-plan-review-seo-content.md.

---

## Core Entity (Reference)

**Tierra Viva** is the entity this site represents: a real estate investment platform building education-anchored, purpose-driven communities in Latin America, starting in the Dominican Republic. The public site’s job is **credibility + lead quality** (investors and partners), not deal closure. No fund terms, pricing, or IRR on the public site; those live behind “Start a Conversation.” All copy and structure must stay **informational only** and compliant with the disclaimer in the proposal.

---

## Implementation Principle

- **First delivery:** One coherent single-page site with the most critical elements.
- **Later deliveries:** Add pages and depth incrementally so that at every release the site is **complete, consistent, and shippable**—no half-built sections or broken journeys.
- **Copy and content** are defined per iteration so content/design can be produced in parallel with structure.

---

## Iteration 1 — Single-Page Site (First Ship)

**Goal:** One scrollable page that establishes who Tierra Viva is, what they do, where they’re focused, why to trust them, and two clear next steps (investors vs. partners). No multi-page navigation yet.

**Deliverable:** A single page that can go live and serve both “just learning” and “ready to talk” visitors. Footer includes Purpose & Disclaimer, Privacy, Jurisdiction; no offer language anywhere.

### Sections (in order)

| # | Section name | Purpose | Copy / content intent |
|---|--------------|---------|------------------------|
| 1 | **Hero** | Identity + primary CTA | Headline: “Living Capital for Living Places.” Subhead: education-anchored communities across Latin America; one line on regenerative platform + institutional discipline. Primary CTA: “Start an Introductory Conversation.” Secondary: “Explore Our Thesis” (anchor to Strategy section). |
| 2 | **Why + Model** | Purpose and how they build | **Why:** Either 2–3 sentences (families returning, prosperity and belonging, Tierra Viva exists to make that return possible) with four pillars at one sentence each, **or** one sentence for Why and **one** pillar (e.g. Learning) at two sentences as anchor; rest of pillars one sentence. Avoid generic compression; keep one clear narrative hook. **Our Model:** four pillars as tiles—Learning, Homes, Enterprise, Stewardship (from wireframe). No fund numbers. |
| 3 | **Where We’re Focused** | Geography + proof | DR as first focus; Santiago; one line on demographics/diaspora. **First-project teaser (exact copy intent):** “Altos de Gurabo is our first flagship community in Santiago—an integrated neighborhood anchored by an international school, with homes, green space, and daily conveniences in one place.” Optional second sentence; no unit counts, no pricing. Optional: single image or “Coming soon” placeholder. |
| 4 | **Value & Governance** | Why trust the platform | Short “platform built for enduring value”: phased development, multiple value streams, clear governance, transparent reporting. Bullets only. Link/CTA: “Learn About Our Strategy” (for later: will go to Strategy page; in Iteration 1 can be anchor or same-page). |
| 5 | **Responsible Investment** | ESG / responsibility | Snapshot only: governance, environmental resilience, social foundations, stewardship. One short paragraph + 4 bullet lines. CTA: “Our Responsible Investment Principles” (later → dedicated page; Iteration 1 = anchor or in-page). |
| 6 | **Team** | Credibility | Founder highlight: Ramon Marmolejos, title, one-line credential (e.g. Wharton, IE, 20+ years learning/impact). One line: “Supported by advisors and partners in capital markets, development, and governance.” CTA: “Meet the Team” (later → Team page; Iteration 1 = anchor). |
| 7 | **Research** | Conviction + SEO hook | “Research-led conviction”: one sentence. Three **featured insight titles** only (e.g. “Why Education Anchors Long-Term Community Value,” “Dominican Republic: Demographics, Diaspora, and Demand,” “Responsible Development and Long-Term Asset Performance”). CTA: “Explore Research & Insights” (later → Research page; Iteration 1 = anchor or “Coming soon”). |
| 8 | **Partner With Us** | Conversion | Two audience-specific CTAs: **“For Investors: Start an Introductory Conversation”** and **“For Partners: Explore Partnership Opportunities.”** Short line: invite those seeking long-term alignment. Same destination for now (e.g. contact form or email); later can branch. |
| 9 | **Footer** | Legal + trust | Purpose & Disclaimer (informational only, no offer/solicitation). Links: Responsible Investment (anchor or placeholder), Privacy Policy, Jurisdiction Notice. |

**Copy ownership (for content creator):** All section copy derived from wireframe + tierra-viva.md; no fund numbers, no IRR/MOIC, no deal terms. “Altos de Gurabo” or “first project” = place, school, sustainability, connectivity only.

**SEO (for this iteration):** One page = one primary focus (Tierra Viva, education-anchored communities, Latin America / Dominican Republic). H1 = hero headline; H2s = section titles. One clear “answer-style” sentence near top (e.g. what Tierra Viva is and where they operate) for AEO. **Technical spec (when written) must:** (a) define one canonical H1 and 2–3 primary target phrases for this URL; (b) map each H2/section to intended future URL (e.g. /strategy, /platform) so the single page is built with the Iteration 2 split in mind and signals can be preserved.

**Product/PM:** Single journey; everyone sees the same sequence. Two CTAs at the end give a light audience split without a separate “Investors / Partners” landing.

---

## Iteration 2 — Add Core Pages (Multi-Page, Same Nav)

**Goal:** Introduce real navigation. Add the pages that carry the heaviest “trust and clarity” load so the homepage can stay short and point to depth.

**New pages:**

| Page | Purpose | Copy / content intent |
|------|---------|------------------------|
| **About** | Who Tierra Viva is | **Intent:** “Who we are, mission, backstory, why this team.” Mission (unlock potential of Latin America’s promising places). Who we are and why we exist in 1–2 paragraphs. **Do not** repeat the full education-anchored model here; link to Strategy and Platform for “how we invest” and “how we build.” No fund size or returns. |
| **Strategy** | Thesis and capital approach | Investment thesis: where urban expansion, education, and affluent demand converge. Strategy: early entry, perimeter zones, phased community development. No deal terms. One primary keyword intent: e.g. “education-anchored real estate Latin America.” Clear answer block in first 1–2 paragraphs. |
| **Platform** | How they build | Development model: four pillars (Learning, Homes, Enterprise, Stewardship) with short expansion each. Execution: phased, community-led; partnerships, governance. Optional: one diagram or visual. No financials. |
| **Responsible Investment** | ESG and governance | Full content from wireframe Section 5: governance, environmental resilience, social foundations, stewardship. “Substance over signaling” line. No fund specifics. |
| **Team & Governance** | Full team for trust | **GP (Ramon, Henry, Leslie):** 2–3 sentences each (role + relevant experience + value to fund). **IC (Ranjan, Jose Luis, Carlos, Ariel):** one sentence each (role + one credential or domain). **Key development partner:** Espejo y Asociados (name, one sentence). Source: tierra-viva.md appendix bios; trim for web, do not invent. Links to LinkedIn where appropriate. |
| **Contact** | Conversion | **Intent sentence:** e.g. “Whether you’re exploring an investment conversation or a development or operating partnership, we’d like to hear from you.” **What happens next:** 1–2 lines (e.g. “We’ll respond within [X] to schedule a conversation.”). Single contact path (form or email). Optional: “For investors” / “For partners” as form dropdown or two buttons. |

**Homepage changes:** Section CTAs (“Learn About Our Strategy,” “Our Responsible Investment Principles,” “Meet the Team,” “Explore Research & Insights”) become real links to these pages. Hero “Explore Our Thesis” can link to Strategy. No new homepage sections; same 9 sections, now with working nav.

**SEO:** Each new page has one primary intent, one H1, clear H2s, and an answer-style intro where it fits (especially Strategy, Platform, Responsible Investment). **Keyword/intent table** (one primary, optionally 1–2 secondary queries per page) to be produced before or alongside Iteration 2 copywriting—Content and SEO single source of truth (see Content & SEO handoff below).

**Content:** About, Strategy, Platform, Responsible Investment, Team copy sourced from wireframe + tierra-viva.md; no offer content. **Before Iteration 2 copywriting:** produce a **voice one-pager** (3–5 voice traits, e.g. “aspirational but grounded,” “institutional but human,” “no jargon,” “no hype”; 2–3 do/don’t examples; regulatory rule: no offer language). All pages and contractors use it for consistency.

---

## Iteration 3 — Projects & Focus (First Project Page)

**Goal:** Add the “proof” page: one concrete project so the site shows “we’re building,” not only “we’re raising.”

**New page:**

| Page | Purpose | Copy / content intent |
|------|---------|------------------------|
| **Projects & Focus** | First project as proof | **Label and URL:** Use **“Projects & Focus”** consistently in nav, URLs, and internal links (SEO and brand clarity). **Featured project: Altos de Gurabo.** Content from tierra-viva.md “The Offer” / Altos de Gurabo only: location (Santiago, Gurabo), integrated community (residential, school, commercial, recreational), world-class international school (e.g. Alpha partnership, no financials), walkable master plan, residential options (townhomes/apartments—formats only, no prices), strategic connectivity (Northern Bypass, 5 min FTZ, 15 min airport), amenities (wellness, parks, security), sustainability (energy, water, climate-adapted envelope), mixed commercial (daily essentials, zero-commute). Optional: masterplan image, school or amenity visuals. **No unit counts, no pricing, no IRR, no fund terms.** |

**Nav:** Add “Projects & Focus.” Homepage “Where We’re Focused” teaser links to this page.

**SEO:** Page intent = “sustainable community Dominican Republic,” “Santiago development,” “education-anchored community Gurabo.” One clear answer block at top (what Altos de Gurabo is and where it is).

**Product:** Satisfies “show me something real” for both investors and partners without crossing into offering.

---

## Iteration 4 — Research & Insights (Content Engine)

**Goal:** Turn Research from a teaser into a real content hub for credibility and SEO.

**Structure:** **Hub page** (e.g. /research or /research-insights) that lists and links to **one URL per article**. Each article has its own URL (e.g. /research/why-education-anchors-community-value, /research/dominican-republic-demographics-diaspora-demand) so each piece can target one primary query and rank. No single long page with multiple intents.

**New pages:**

| Page | Purpose | Copy / content intent |
|------|---------|------------------------|
| **Research & Insights (hub)** | List and link to articles | Intro: strategy informed by research; we publish select insights for transparency and dialogue. List of articles with titles and short descriptions; each links to its article URL. Hub never launches empty (see below). |
| **Individual articles** | One per primary query | **At least one full article at launch** (e.g. “Why Education Anchors Long-Term Community Value”) with full text, clear H1/H2s, answer-style opening. Other featured titles (“Dominican Republic: Demographics, Diaspora, and Demand,” “Responsible Development and Long-Term Asset Performance”) get their own URLs when published. If the first full article isn’t ready by I4: ship hub with a **short, permanent overview piece** (e.g. “How We Use Research”) plus one full insight article when ready. **Production:** Start drafting the first article in parallel with Iteration 2 so it’s ready for I4. Structure each article for one primary query and AEO-style answer near top. No fund or offer content. |

**Homepage:** “Explore Research & Insights” links to hub; featured insight titles link to hub or directly to article URLs when live.

**SEO:** Research is the main content engine; one URL per article; each targets a specific keyword/intent. New articles added over time without changing site structure.

**Content:** One substantive article (or overview + one article) at I4 launch; more added incrementally.

---

## Iteration 5 — Polish and Optional Additions

**Goal:** Refinements and optional scope without changing the core page set.

**Optional additions:**

| Item | Purpose | Copy / content intent |
|------|---------|------------------------|
| **News / Press** (footer or sub-nav) | Press and announcements | Placeholder or list of press releases / news. No offer language. |
| **Audience entry points** | Light segmentation | Footer or CTA block: “For Investors” / “For Partners” linking to same Contact with pre-set context (e.g. form field or query param). Copy: one line each. |
| **Hero video or asset imagery** | Differentiation and proof | Per competitive research: hero video or high-quality project/place imagery. No copy change. |
| **Contact branching** | Better lead routing | Two paths from “Partner With Us”: investors → one form/email; partners → another, with one sentence of copy each. |

**Copy:** Minimal; mostly links and one-line cues. Disclaimer and legal pages unchanged.

---

## Page Summary (Final State)

| Order | Page | When added | Primary audience |
|-------|------|------------|-------------------|
| — | Home | Iteration 1 | All |
| 1 | About | Iteration 2 | All |
| 2 | Strategy | Iteration 2 | Investors |
| 3 | Platform | Iteration 2 | Investors, Partners |
| 4 | Responsible Investment | Iteration 2 | Investors |
| 5 | Team & Governance | Iteration 2 | All |
| 6 | Research & Insights | Iteration 4 | All (credibility + SEO) |
| 7 | Projects & Focus | Iteration 3 | Investors, Partners |
| 8 | Contact | Iteration 2 | All |

**Nav order (proposal-aligned):** About → Strategy → Platform → Projects & Focus → Responsible Investment → Team & Governance → Research & Insights → Contact.

---

## Copy and Content Checklist (No Technical Specs)

- **All pages:** No fund size, no IRR/MOIC, no pricing, no deal terms, no solicitation. Offer only via formal process after “Start a Conversation.”
- **Tierra Viva voice:** Aspirational but grounded; “living capital,” “regenerative,” “stewardship”; institutional discipline. Enforced via **voice one-pager** before I2 (see Iteration 2).
- **Projects & Focus:** Label “Projects & Focus” used consistently (nav, URLs, internal links). Content: place, school, sustainability, connectivity, master plan only.
- **Team:** GP = 2–3 sentences (role + experience + value); IC = one sentence (role + one credential); source = tierra-viva.md appendix; trim only, no invention.
- **Research:** One URL per article; hub lists them. Keyword- and intent-aligned; answer-style intros; no offer content.
- **Footer:** Purpose & Disclaimer visible; Privacy, Jurisdiction, Responsible Investment linked.
- **CTAs:** Two distinct CTAs in “Partner With Us” (investors vs. partners) from Iteration 1 onward.

---

## RAPID (Plan Ownership)

| Role | Who |
|------|-----|
| **Recommend** | This implementation plan (PM + Product Analyst + UI + Content + SEO view). |
| **Agree** | Tierra Viva leadership (scope, order of iterations, copy boundaries). |
| **Perform** | Content: copy per iteration. Design: layout and flow. Build: technical implementation (separate spec). |
| **Input** | Legal (disclaimer, jurisdiction), SEO (keywords per page), UX (audience cues). |
| **Decide** | Tierra Viva leadership (approve plan before technical spec and build). |

---

## Content & SEO Handoff (Before or With Iteration 2)

Between “plan agreed” and technical spec (or in parallel), produce a **content brief** that SEO and Content use as single source of truth:

- **Keyword/intent table:** One primary (and optionally 1–2 secondary) queries per page.
- **Iteration 1 exact copy:** Hero subhead and supporting line; Altos de Gurabo one-line (and optional second sentence) as in plan.
- **Team and section lengths:** GP = 2–3 sentences, IC = one sentence; “short” and “one-line” defined for any other sections.
- **Research:** One URL per article; hub structure; which article (or overview + one article) is required for Iteration 4 launch.
- **Voice one-pager:** 3–5 traits, 2–3 do/don’t examples, regulatory rule (no offer language).

This keeps the implementation plan high-level while giving Content and SEO a clear, shared spec for execution.

---

## Next Step

Once this plan is agreed: produce **technical specification and technical implementation plan** (stack, hosting, structure, components, content model, SEO implementation including H1/H2→URL mapping for I1, accessibility) with the right engineering and product leads.
