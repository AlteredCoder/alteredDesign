# Typography

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs which fonts are used and how text is sized, spaced, weighted, wrapped and loaded.
**Load when:** `new`, `add`, `improve`, `review` on any surface with text; `system` when seeding the type scale.
**Owns:** font choice, pairing, scale, sizes, line-height, measure, weights, tracking, wrapping, truncation, font loading, hierarchy via type. Everything else is referenced by ID.
**Defaults** (when DESIGN.md is silent): body 1rem/1.5 at weight 400; Product: one sans family, fixed `rem` scale, ratio 1.2; dense work surfaces (tables, sidebars, toolbars) 13px body and 12px metadata with inputs ≥ 16px on touch (craft.md CRAFT-19); Brand: 1–2 families, `clamp()` headings, ratio 1.25–1.333; measure `max-width: 65ch`; weights 400/500/600 or 400/700; `font-display: swap` with a metric-matched fallback.

| Role | Size product / brand | Line-height | Weight | Tracking |
|---|---|---|---|---|
| display | 3rem / `clamp(2.5rem, 6vw, 6rem)` | 1.0–1.1 | 600–700 | −0.02 to −0.04em |
| h1 | 2rem / `clamp(2rem, 4vw, 3.5rem)` | 1.1–1.2 | 600–700 | −0.02em |
| h2 | 1.5rem / 2rem | 1.2 | 600 | −0.01em |
| h3 | 1.25rem / 1.5rem | 1.3 | 600 | 0 |
| h4 | 1.125rem / 1.25rem | 1.4 | 600 | 0 |
| body | 1rem | 1.5–1.6 | 400 | 0 |
| small | 0.875rem | 1.45 | 400–500 | 0 |
| caption | 0.75rem | 1.4 | 400–500 | +0.01em |
| label (uppercase) | 0.75rem | 1.2 | 500–600 | +0.06em |

## Font selection

- **TYP-01 — Font follows direction.** SHOULD: use the actual brand font or a family matching the selected reference; there is no banned-font list. Check: compare letterforms, width and line breaks after loading.
- **TYP-02 — Font family roles.** SHOULD: use a small coherent set of families; additional families may be justified by language coverage or selected art direction. Check: each family has an identifiable role.
- **TYP-03 — Pair by role.** SHOULD: pair fonts when their roles improve hierarchy or reference fidelity; closely related families can be valid. Check: roles remain distinguishable in the rendered output.
- **TYP-04 — Readable display roles.** SHOULD: expressive fonts may appear in controls if legibility and recognition survive actual sizes and content. Check: inspect long labels and narrow layouts.
- **TYP-05 — Responsive type strategy.** SHOULD: choose fixed or fluid sizing from the source and layout needs in either register. Check: type remains readable and hierarchy survives the requested widths.

## Loading

- **TYP-06 — Loading strategy.** MUST: `@font-face` with `font-display: swap` (`optional` when zero layout shift matters more than the branded face); self-host WOFF2, or Google Fonts with `<link rel="preconnect">`; `<link rel="preload" as="font" crossorigin>` only for the above-the-fold weight. Check: no invisible text during load; ≤ 1 preloaded font file.
- **TYP-07 — Metric-matched fallback.** MUST: a fallback `@font-face` on a local font with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` (Fontaine or Capsize values) listed after the web font. Check: layout shift on font swap < 0.02 CLS.
- **TYP-08 — Load what is used.** MUST: subset with `unicode-range` to the scripts in use and load only the weights in use; one variable font when ≥ 3 weights or styles are needed. Check: every loaded weight appears in the CSS.

## Scale and sizes

- **TYP-09 — Reusable type roles.** SHOULD: use consistent type roles and project units; source fidelity may require additional sizes. Check: equivalent roles render consistently and text remains resizable.
- **TYP-10 — Readable sizing.** SHOULD: begin with 16px body and mobile-input text, then adjust for font metrics, context and density. This is a design default, not a WCAG minimum font-size criterion. Check: inspect reading size, mobile focus behavior and text resizing.
- **TYP-11 — Display scale.** SHOULD: size display text for the composition and reference rather than a fixed maximum. Check: render requested widths and text expansion without unintended clipping.
- **TYP-12 — Sizes per surface.** SHOULD: 5–7 distinct sizes per surface; adjacent roles in use differ by ≥ 1.125× (one row of the table) or by weight plus one row; page title (h1) to body ≥ 1.5× in product, ≥ 2.5× in brand at 1440. Check: list the distinct computed sizes and their ratios.
- **TYP-13 — Line-height by font.** SHOULD: use the table as a starting point, then tune leading for actual metrics, language and composition. Check: lines and diacritics do not collide and paragraphs remain readable.
- **TYP-14 — Readable line length.** SHOULD: start prose near 45–75 characters per line; adapt to font, viewport and content rather than enforcing an absolute measure. Check: avoid tiring long lines and excessively fragmented narrow columns.
- **TYP-15 — Paragraph rhythm.** SHOULD: use spacing, indentation or both where the content and selected editorial convention support them. Check: paragraph boundaries remain easy to recognize.

## Weights and tracking

- **TYP-16 — Weight hierarchy.** SHOULD: use enough weights to express chosen roles; hierarchy need not use a fixed weight difference. Check: emphasis remains clear with actual content.
- **TYP-17 — No faux styles.** NEVER: a weight or italic that is not loaded (the browser synthesizes it); set `font-synthesis: none` on `:root`. Check: every `font-weight` and `font-style` in use has a matching `@font-face`.
- **TYP-18 — Tracking.** SHOULD: tune tracking to the font and reference; fixed ranges are starting points. Check: inspect readability, word separation and wrapping at rendered sizes.
- **TYP-19 — Letter case.** SHOULD: follow brand and content roles; uppercase labels and headings are valid when readable. Check: long prose and control labels remain easy to read.
- **TYP-20 — Italic.** SHOULD: use loaded italic faces when the direction or content calls for them. Check: small text and control labels remain legible.
- **TYP-21 — Hierarchy via type.** SHOULD: distinguish roles through size, weight, spacing, case or color as needed; no fixed count of differing dimensions is required. Check: the rendered reading order matches the intended hierarchy.

## Wrapping, truncation, details

- **TYP-22 — Text wrapping.** SHOULD: balance or tune wrapping when it improves the chosen composition; preserve source line breaks where practical. Check: no unintended clipping, and headings remain readable at target widths.
- **TYP-23 — Truncation.** MUST: wrap by default; when truncating, single-line `text-overflow: ellipsis` with the full text in a tooltip or `title`, or `-webkit-line-clamp` ≤ 3 lines with an expand control; flex children get `min-width: 0`. NEVER truncate button labels or page titles. Check: the longest real string renders without clipping.
- **TYP-24 — Tabular figures.** MUST: `font-variant-numeric: tabular-nums` on tables, prices, timers, counters and any column of numbers. Check: digits align vertically in columns.
- **TYP-25 — Links.** MUST: prose links underlined (`text-decoration-thickness: 1px; text-underline-offset: 0.15em`) in accent or ink (see color.md); links in nav bars, menus, cards and lists drop the underline because their position identifies them, and show it on hover and focus; a link inside running text is always underlined. NEVER a link in running text distinguished by color alone (see accessibility.md). Check: prose links show an underline at rest.
- **TYP-26 — Semantic vs visual heading.** MUST: heading level follows the document outline (one h1, no skipped levels: see accessibility.md); visual size comes from a role class, so an h3 may wear the h1 style. Check: the DevTools outline is ordered; size classes are separate from tags.
- **TYP-27 — Typographic characters.** SHOULD: characters in copy (ellipsis, curly quotes, no-break spaces, number and date formatting) follow ux-writing.md (COPY-20); where the source cannot carry `&nbsp;`, wrap number + unit in a span with `white-space: nowrap`. Check: at 375 no unit wraps away from its number.
- **TYP-28 — OpenType.** SHOULD: `font-kerning: normal`, `font-optical-sizing: auto`; `font-variant-ligatures: none` in code; `font-variant-caps: all-small-caps` for abbreviations when the face ships small caps. Check: `font-kerning` and `font-optical-sizing` declared on `body`.

## Quick check
- TYP-01 · Font follows direction
- TYP-02 · Font family roles
- TYP-05 · Responsive type strategy
- TYP-07 · Metric-matched fallback
- TYP-09 · Reusable type roles
- TYP-10 · Readable sizing
- TYP-11 · Display scale
- TYP-13 · Line-height by font
- TYP-14 · Readable line length
- TYP-16 · Weight hierarchy
- TYP-18 · Tracking
- TYP-19 · Letter case
- TYP-22 · Text wrapping
- TYP-23 · Truncation
- TYP-24 · Tabular figures
