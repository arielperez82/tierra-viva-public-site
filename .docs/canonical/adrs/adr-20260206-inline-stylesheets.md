---
type: adr
endeavor: tierra-viva-public-site
status: accepted
date: 2026-02-06
supersedes: []
superseded_by: null
---

# ADR-0001: Inline stylesheets to eliminate render-blocking CSS

**Status**: Accepted

**Date**: 2026-02-06

**Decision Makers**: Engineering

**Tags**: performance, css, build, astro, lighthouse

## Context

The site is a static Astro build with Tailwind; a single global CSS entry produces one bundled stylesheet (~5 KB). Lighthouse reported that this stylesheet was render-blocking, with an estimated ~120 ms savings if removed from the critical path. The site has ~12 pages sharing the same layout and styles.

We needed to choose how to deliver CSS:

- Current situation: One external CSS file, blocking first paint.
- Problem: Render-blocking resources delay LCP and FCP.
- Constraints: Keep build simple; avoid heavy tooling.
- Requirements: No critical a11y/performance regressions; clear path to revisit if assumptions change.

## Decision

We will use Astro `build.inlineStylesheets: "always"` so all project CSS is inlined into each page's HTML. No separate CSS file is emitted for layout/global styles.

## Alternatives Considered

### Alternative 1: Keep external stylesheet (default Astro behavior)

**Pros:**

- CSS cacheable across pages (one download, reused on navigation).
- Smaller HTML per page.
- Single source of truth in one asset.

**Cons:**

- Stylesheet blocks first paint; adds a round-trip to the critical path.
- Lighthouse flags it as an opportunity (~120 ms estimated savings if removed).

**Why Rejected**: At ~5 KB CSS and ~12 pages, eliminating the blocking request outweighs the cache benefit. We can revisit if CSS or page count grows (see Implementation Notes).

### Alternative 2: Critical CSS inline + full CSS loaded asynchronously

**Pros:**

- No render-blocking; critical path stays short.
- Full CSS can be cached once loaded (e.g. via `media="print"` + `onload="this.media='all'"`).
- Best of both metrics and caching for larger sites.

**Cons:**

- Requires critical-CSS extraction (e.g. tooling or manual maintenance).
- More complex build and maintenance.
- Overkill for current CSS size.

**Why Rejected**: Deferred for simplicity. Current total CSS is small; inlining everything is sufficient. If monitoring shows we should revisit (e.g. CSS > ~14 KB), we can adopt this approach then.

## Consequences

### Positive

- No render-blocking stylesheet; Lighthouse performance and related diagnostics pass.
- Simpler critical path (document only).
- No extra network request for CSS on first load.
- Easy to revert (set `inlineStylesheets` to `"auto"` or `"never"`).

### Negative

- HTML size increases per page by roughly the size of the inlined CSS (~5 KB today).
- Same CSS is repeated on every page (no shared CSS cache across navigations).
- If CSS grows significantly, inlining everything could make HTML too large and hurt performance.

### Neutral

- Monitoring (see Implementation Notes) is intended to trigger a revisit before negative consequences dominate.

## Implementation Notes

- **Config**: `astro.config.ts` — `build.inlineStylesheets: "always"`.
- **Verification**: `pnpm lighthouse:audit`; see `test-reports/lighthouse-improvements.md` for any new opportunities.

**When to revisit:** Revisit this decision when any of the following become true:

| What to monitor        | Revisit if                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bundled CSS size**   | Total built CSS (e.g. from `pnpm build` output or `dist/` inspection) exceeds **~14 KB**. Above that, cross-page caching of an external file usually wins over inlining.                                |
| **Lighthouse**         | `pnpm lighthouse:audit` again reports render-blocking resources after we have switched to external CSS (e.g. after a future change). That would justify re-evaluating inlining or critical-CSS + async. |
| **HTML size**          | Median or p95 HTML transfer size grows to a point where it's a concern (e.g. > ~50 KB per page) and a significant share is inlined CSS.                                                                 |
| **Page count / scope** | Site grows to many more pages (e.g. 50+) with the same global CSS; the benefit of a single cached stylesheet may outweigh the blocking cost.                                                            |

**Suggested cadence:** Check the above as part of routine performance reviews (e.g. when touching the build, adding major new sections, or after a Lighthouse run). No fixed schedule is required while the site stays small.

## Related Decisions

- None yet.

## References

- [Astro `build.inlineStylesheets`](https://docs.astro.build/en/reference/configuration-reference/#buildinlinestylesheets)
- [Lighthouse: Render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/)
- Project: `astro.config.ts` (`build.inlineStylesheets: "always"`), `test-reports/lighthouse-improvements.md`
