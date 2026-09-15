# Patterns

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs per-surface anatomy: which blocks a surface contains, in which order, and the rules that keep it honest.
**Load when:** `new` and `add` after the brief is confirmed; `improve` and `review` when the target is a whole page or flow.
**Owns:** page-type anatomy for every surface in the sections below. Everything else is referenced by topic or ID.
**Defaults:**
- Pattern chosen from the task cue (PAT-01); one primary action per surface (PAT-02).
- Check for every anatomy rule: each listed element is present on the screenshot at 1440 and 375, or named under "Out of scope" in the brief (PAT-04).
- Register by surface: landing, pricing, docs marketing = brand; every other surface = product.
- Content width when DESIGN.md is silent (page container and grid: layout.md):

| Surface | Content width |
|---|---|
| Landing, pricing | 1200–1280, full-bleed sections |
| Dashboard, table | full app-shell width, 24px page padding |
| Detail | 1040–1200 |
| Form, settings | 640–720 |
| Auth card | 400–440 |
| Docs article | 60–75ch + 240–280 nav + 200–240 TOC |
| Checkout | 560–640 |

## Choosing the pattern

- **PAT-01 — Pattern from the cue.** MUST: map the cue to one pattern: home, launch → landing; plans → pricing; overview, analytics → dashboard; list, "all X", index → table; record, profile → detail; settings, create, edit → form; login, signup, reset → auth; welcome, first run → onboarding; results, filter → search; guide, article, blog → docs; product, cart → e-commerce; 404, 500, 403 → error; setup, import → wizard; confirm, picker → modal flow. Ambiguous cue: ask (intake.md).
- **PAT-02 — Task priority.** SHOULD: make the next action clear within each task group. Repeated primary actions can be valid on a long page or independent panels. Check: actions do not compete ambiguously.
- **PAT-03 — Product personality.** SHOULD: retain task clarity while allowing the selected visual direction on product surfaces. Check: imagery and display type do not hide data, navigation or controls.
- **PAT-04 — Anatomy as a candidate.** SHOULD: select only pattern elements needed by actual content and task; preserve source anatomy for recreations. Check: no invented sections or features are added merely to complete a template.

## Landing / marketing page

```
[nav: logo · 3-5 links · primary CTA]
[hero: h1 offer · sub · primary CTA + 1 secondary · proof · visual]
[problem → solution] [benefits 3-5] [how it works] [proof] [pricing] [FAQ] [final CTA] [footer]
```

- **PAT-05 — Hero intent.** SHOULD: communicate the subject and next action using the chosen composition; a visual, proof strip or subheading is optional. Check: retain supplied content and avoid fabricated proof.
- **PAT-06 — Hero composition.** SHOULD: balance text, imagery and whitespace according to the reference or selected direction. Check: missing assets and broken layout are distinguished from intentional openness.
- **PAT-07 — Section order.** SHOULD: hero → problem/solution → benefits (3 to 5, each an outcome) → how it works (3 steps; the one earned numbering) → social proof → pricing teaser → FAQ (6 to 12) → final CTA → footer. Drop a section without content; no two consecutive sections use the same block arrangement (two card grids in a row), while every section sits on the page grid (LAY-02).
- **PAT-08 — Proof beside the claim.** MUST: each proof element sits beside the claim it supports; logos once, ≤ 8, monochrome, equal height; numbers, names and quotes from the user's material or marked placeholders (ANTI-18).
- **PAT-09 — Final CTA and footer.** MUST: the final CTA repeats the hero CTA label and destination; footer holds logo, ≤ 4 link groups and legal links; nav, hero and final CTA carry the same primary action.

## Pricing page

- **PAT-10 — Tier columns.** MUST: 2 to 4 equal-width tier columns; the recommended tier marked by color and weight, not height; feature lists start at one y (fixed-height name and price block). Check: a horizontal line through the first feature row touches every column's first feature.
- **PAT-11 — Price block.** MUST: price, period and a monthly/annual toggle above the CTA; every tier's CTA at one height and position; enterprise tiers read "Contact sales", no invented number.
- **PAT-12 — Below the tiers.** SHOULD: comparison table (sticky first column, grouped after 25 rows), FAQ, one final CTA; no testimonial carousel.

## Dashboard / overview

```
[title · time range · primary action]
[KPI × 3-6, equal width, one row]
[primary chart 2/3]  [companion panel 1/3, equal height]
[recent activity / table]
```

- **PAT-13 — KPI relevance.** SHOULD: display metrics relevant to the task with labels, context and real data; any count is valid, including a partial last row. Check: no metric is invented, removed or distorted to fill a grid.
- **PAT-14 — One time range.** MUST: one time-range control in the title row governs every block; a per-block range only when its header says so.
- **PAT-15 — Chart hierarchy.** SHOULD: emphasize the chart answering the main question, with companion views where useful. Check: chart sizes and arrangement follow the task, not divisibility of the chart count.
- **PAT-16 — First-run dashboard.** MUST: with no data each block shows its own empty state (what will appear, the action that produces it); KPI values read "–", never 0 or an unresolved skeleton (components.md).

## Data table / list view

```
[title · count · primary action]
[search · filter chips · sort · columns]   [bulk bar on selection]
[☐ | key column → detail | 3-7 columns | row actions]
[pagination: page size · total]
```

- **PAT-17 — Toolbar.** MUST: one row: search left, filters as removable chips with "Clear all", primary action right; filter, sort and page state live in the URL (CMP-29).
- **PAT-18 — Columns.** MUST: first column is the record name, linked to the detail view; ≤ 7 columns at 1440; column alignment per CMP-30; row actions last, as an overflow menu; density from DESIGN.md.
- **PAT-19 — Selection and bulk.** MUST: checkbox column first; selecting ≥ 1 row shows a bulk bar (count · actions · clear) over the toolbar without shifting the table.
- **PAT-20 — Table states and paging.** MUST: empty (no records → primary action), filtered-empty (no matches → clear filters), loading (skeleton rows matching the columns), error (retry); pagination with page size and total, or "Load more" for feeds, never both.
- **PAT-21 — Table at 375.** MUST: below 768 apply one CMP-35 strategy; the card transform shows the key column as title, 2 to 3 meta fields and actions in a menu; the page never scrolls horizontally (LAY-45).

## Detail / record view

- **PAT-22 — Header row.** MUST: breadcrumb or back link above; title, status badge, primary action and overflow menu in one row; the row is sticky when the page exceeds 2 viewports.
- **PAT-23 — Body split.** SHOULD: main content 2/3, metadata sidebar 1/3 (label left, value right, grouped after 10 rows); tabs at ≥ 3 content groups, headed sections otherwise; below 768 the sidebar stacks under the header.
- **PAT-24 — Activity last.** SHOULD: activity, comments and history close the main column, newest first, composer at the top.

## Form / settings page

- **PAT-25 — Single column.** MUST: one column, labels above, content width 640–720px; side-by-side fields only for pairs read as one value (first/last name, min/max). Field anatomy: components.md.
- **PAT-26 — Grouped sections.** MUST: sections of 2 to 6 fields with a heading and ≤ 1 description line; ≥ 4 sections get a sticky left section nav or tabs.
- **PAT-27 — Save model.** MUST: one model: a sticky bottom bar (shown when dirty; Cancel + Save; unsaved-changes guard) or per-section Save (each section its own panel); never both. Auto-save shows "Saved" with a time near the group.
- **PAT-28 — Danger zone.** MUST: destructive actions (delete, transfer, reset) form the last section, visually separated, destructive-secondary button, confirmation by typed name or an undo window (copy: ux-writing.md).

## Auth

- **PAT-29 — Single card.** MUST: one centered column 400–440px wide: logo, heading, one form, one full-width primary button, one switch link (Sign in ↔ Create account); no marketing copy in the card. Brand: a split layout (brand panel + form) collapses to the card below 1024. Product: card only.
- **PAT-30 — Fields and rules.** MUST: email + password (show/hide toggle) or magic link; password rules visible before the first error, with live checkmarks; social buttons above the divider at the primary button's height, labeled "Continue with X"; autocomplete attributes set (accessibility.md).
- **PAT-31 — Auth errors and reset.** MUST: field errors inline under the field; a failed sign-in shows one message above the primary button, not naming which field failed; "Forgot password" beside the password label; reset: email → sent (resend) → new password → success + sign-in link.

## Onboarding / first run / empty app

- **PAT-32 — Checklist onboarding.** SHOULD: first run shows a 3 to 5 step checklist with progress ("2 of 5"), each step a real product action (create, connect, invite), dismissable, persisted until complete; never a forced modal tour.
- **PAT-33 — Empty app teaches.** MUST: an empty surface names what will live here, offers the one action that fills it and, where useful, a sample-data toggle; a blank panel or "No data" alone is a defect (components.md, ux-writing.md).

## Search & results

- **PAT-34 — Results page.** MUST: input with the query preserved; count and echo ("142 results for X"); filters as a left rail ≥ 1024, a sheet below; sort; results as a list (title, snippet with the match highlighted, meta line); pagination; zero results offer spelling and filter suggestions plus "Clear all".
- **PAT-35 — Typeahead.** SHOULD: ≤ 8 grouped results with keyboard navigation and a "See all results" row; Enter opens the results page.

## Docs / content / blog

- **PAT-36 — Reading layout.** MUST: article measure 60–75ch (typography.md); docs get a 240–280px left nav and a 200–240px sticky TOC with the current heading highlighted, both hidden below 1024 (TOC collapses to the top); `scroll-margin-top` on heading anchors.
- **PAT-37 — Article furniture.** MUST: title, meta line (date, reading time, author), lead paragraph, code blocks with language label and copy button, callouts with full borders or tints (ANTI-04), prev/next links, "Edit this page" or feedback for docs.

## E-commerce product + checkout

- **PAT-38 — Product page.** MUST: gallery left (main image + thumbnails, 1:1 or 4:5); buy box right, sticky (name, price, variants, quantity, "Add to cart" primary, stock and delivery line, trust line); details, reviews, related below; below 768 the gallery is a swipeable strip and "Add to cart" sticks to the bottom.
- **PAT-39 — Checkout.** MUST: single column 560–640px; step indicator (Information → Shipping → Payment); order summary sticky right ≥ 1024, collapsible above the form below; header reduced to logo and secure badge; one primary button per step labeled with the next step; guest checkout available.
- **PAT-40 — Cart.** SHOULD: line items (image, name, variant, quantity stepper, remove), subtotal, shipping estimate, one primary "Checkout"; empty cart links to the catalog.

## Error pages

- **PAT-41 — Error page anatomy.** MUST: status code as a small label, one plain sentence on what happened, one primary way back (home or previous page), a search box or 3 to 4 links, site header and footer kept; 403 names whom to contact; 500 offers retry; fits one viewport, no page-filling illustration.

## Wizard / multi-step

- **PAT-42 — Wizard frame.** MUST: step indicator with names and the current step; one topic per step (2 to 6 fields); Back left, Next/Finish right in a fixed footer; progress persisted (URL or draft) so refresh returns to the step; a review step before completion; Cancel with an unsaved-changes guard.
- **PAT-43 — Save draft.** SHOULD: wizards with ≥ 3 steps offer "Save and exit" and resume from the list view with a "Draft" badge.

## Modal flows

- **PAT-44 — Modal as last resort.** SHOULD: prefer inline edit, an expandable row or a side panel; a modal only for a confirmation, a short create (≤ 5 fields) or a picker; never tabs, a table or a second modal inside one. Anatomy, focus, sizes: components.md.

## Notification center / inbox

- **PAT-45 — Inbox anatomy.** SHOULD: items with unread marker, actor, action, object and relative time, grouped by day; filter tabs (All · Unread); "Mark all read"; a click opens the object, not a detail modal; empty state "All caught up", nothing added.

## Quick check

- PAT-01 · Pattern from the cue
- PAT-02 · Task priority
- PAT-03 · Product personality
- PAT-05 · Hero intent
- PAT-06 · Hero composition
- PAT-08 · Proof beside the claim
- PAT-10 · Tier columns
- PAT-13 · KPI relevance
- PAT-20 · Table states and paging
- PAT-25 · Single column
