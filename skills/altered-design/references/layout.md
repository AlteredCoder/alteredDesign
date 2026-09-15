# Layout

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs where every block sits and how much space surrounds it.
**Load when:** `new`, `add`, `improve`, `review` on any surface; `system` when seeding scales.
**Owns:** spacing scale, gaps, margins, padding, section spacing, alignment, grid, gutters, containers, breakpoints, responsive, whitespace, block placement, row balance, equal heights, cards, nesting, dividers, borders vs shadows, elevation, z-index, density, hierarchy via space. Everything else is referenced by ID.
**Defaults** (when DESIGN.md is silent):

| Spacing (4pt) | `--space-1` | `-2` | `-3` | `-4` | `-6` | `-8` | `-12` | `-16` | `-24` | `-32` |
|---|---|---|---|---|---|---|---|---|---|---|
| px | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96 | 128 |

Breakpoints (`min-width`): `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 (Tailwind's set: utilities and DESIGN.md agree).

| Register | Container | Section `padding-block` | Card padding | Gutter |
|---|---|---|---|---|
| Product | 1440px, fluid below; prose 65–75ch | 24–32px | 16–24px | 16 `sm`, 24 `lg` |
| Brand | 1200–1280px; prose 65–75ch | `clamp(64px, 10vw, 128px)` | 24–32px | 24 `sm`, 32 `lg` |

| Scale | Values |
|---|---|
| Radius | `--radius-sm` 4 (chips, nested), `-md` 8 (controls), `-lg` 12 (cards), `-xl` 16 (sheets, modals), `-full` 9999 (pills) |
| Shadow | `--shadow-1` `0 1px 2px / .06` resting, `-2` `0 4px 12px / .08` raised, `-3` `0 12px 32px / .12` popover, `-4` `0 24px 64px / .16` modal; color `oklch(0 0 0 / a)`; `--shadow-ring` draws the 1px edge plus lift in one token, single light ring in dark mode (values: craft.md) |
| Z-index | `--z-base` 0, `--z-dropdown` 10, `--z-sticky` 20, `--z-overlay` 30, `--z-modal` 40, `--z-toast` 50, `--z-tooltip` 60 |

## Structure before styling

- **LAY-01 — Anatomy before CSS.** MUST: list the page regions (header, nav, main sections in order, aside, footer) and their content first; anatomy per surface: see patterns.md. Check: each region maps to a landmark or `<section>`.
- **LAY-02 — Deliberate layout structure.** SHOULD: use grids, flex or positioned layers according to the composition. Multiple grids and overlaps are valid when reading order and reflow remain intact. Check: compare rendered regions with the source or brief.
- **LAY-03 — Flex for 1D, grid for 2D.** SHOULD: flex for one row or column of unequal items (toolbar, chip list, button row); grid for any set of equal blocks that wraps (cards, KPI rows, form grids) so columns align across rows; `minmax(0, 1fr)`, not `1fr`, so long content cannot widen a track. AVOID `flex-wrap` on a set of ≥ 3 equal blocks. Why: wrapped flex items do not align into columns and the last row stretches or shrinks. Check: grep `flex-wrap`; no hit on a parent of ≥ 3 equal blocks.
- **LAY-04 — Page templates.** SHOULD: start from one of these and note the choice.
```
Sidebar + main       Top nav + content     Centered narrow      Split hero
+-----+----------+   +----------------+    +----------------+   +-------+-------+
| nav | title [a]|   | nav      [act] |    |     title      |   | title | media |
|     | content  |   | title, content |    | prose <= 65ch  |   | copy  | 16:10 |
+-----+----------+   +----------------+    +----------------+   +-------+-------+
```

## Grid and alignment

- **LAY-05 — Containers by role.** SHOULD: reuse containers for equivalent regions; narrow prose, full-bleed media and split sections may have different widths. Check: the layout follows its declared composition.
- **LAY-06 — Alignment anchors.** SHOULD: align related content to shared anchors; intentional asymmetric or inset regions can use different edges. Check: visible grouping matches the source or brief.
- **LAY-07 — Gutters by relationship.** SHOULD: equal relationships use equal gaps, while dense controls and broad page sections may use different gutters. Check: compare equivalent groups.
- **LAY-08 — Alignment within groups.** SHOULD: use shared edges to associate related content; icon columns, centered titles and different text roles may have separate anchors. Check: hierarchy and reading order remain clear.
- **LAY-09 — Mixed alignment with purpose.** SHOULD: choose text alignment for readability and composition; centered headings can coexist with left-aligned body text. Check: long passages remain scannable and the grouping is clear.
- **LAY-10 — Icon and text alignment.** MUST: an inline icon centers on the x-height: 1em–1.25em with `vertical-align: -0.125em`, or a flex row `align-items: center` with an icon box equal to the line box; optical nudges only after a screenshot shows a defect, ≤ 2px (asymmetric glyphs and icon-side padding: craft.md CRAFT-02). Check: at 200% zoom the icon center is within 1px of the x-height center.
- **LAY-11 — Row and cell alignment.** SHOULD: `align-items: baseline` when a row mixes font sizes, `center` when items share a height; numeric table columns right-aligned with tabular figures (see typography.md), text left. AVOID `flex-start` on mixed text rows. Check: column digits share a right edge.
- **LAY-12 — Consistent shared templates.** SHOULD: equivalent screens reuse navigation and action placement; different tasks can use different templates. Check: compare shared components in equivalent viewports.

## Spacing system

- **LAY-13 — Reuse spacing decisions.** SHOULD: use project spacing tokens for repeated relationships; source matching and optical corrections may require additional values. Check: equivalent relationships remain consistent.
- **LAY-14 — Choose spacing mechanism.** SHOULD: use gap for sibling spacing when it fits; margins remain valid for flow, breakout and component composition. Check: no duplicated spacing causes accidental gaps.
- **LAY-15 — Readable separation.** SHOULD: use proximity, borders or surfaces to distinguish groups. No universal gap-to-padding ratio applies to every density. Check: related elements are easier to associate than unrelated ones.
- **LAY-16 — Grouping by proximity.** SHOULD: keep related content visually closer than unrelated groups, accounting for borders, color and alignment; ratios are starting points. Check: a rendered form associates each label and help text with its field.
- **LAY-17 — Section rhythm.** SHOULD: repeat spacing for equivalent sections and vary it to support hierarchy or the selected composition. Check: transitions between sections feel intentional against the reference.
- **LAY-18 — Padding by composition.** SHOULD: consistent component roles use consistent padding; asymmetric padding can support alignment, imagery or optical balance. Check: compare equivalent components.
- **LAY-19 — One card padding per page.** MUST: cards of one kind share one padding value across the page and screens (16 compact, 24 default, 32 brand). Check: grep card padding; one value per kind.
- **LAY-20 — Avoid compensating patch stacks.** SHOULD: fix root layout causes instead of piling on offsets; deliberate overlaps and optical adjustments may use negative margins. Check: intended relationships survive reflow and long content.
- **LAY-21 — Values serve the design.** SHOULD: tokenise repeated values; arbitrary utilities are valid for one-off geometry or reference matching. Check: review unexplained inconsistency, not the presence of bracket syntax.

## Whitespace and block placement

- **LAY-22 — Intentional whitespace.** SHOULD: preserve whitespace supporting hierarchy, pacing or source fidelity; fix empty space caused by missing assets or broken layout. Check: judge the full composition rather than a blank-rectangle threshold.
- **LAY-23 — Incomplete grid rows.** SHOULD: allow a partial last row when real item counts require it; use deliberate alignment or spans when they improve the composition. Never remove records or invent content to fill a row. Check: test 0, 1 and non-divisible item counts without clipping or lost items.
- **LAY-24 — Unequal columns.** SHOULD: let column heights follow content unless the composition requires equalization. Check: avoid missing content, clipped text or unexplained fixed-height gaps.
- **LAY-25 — Hero whitespace.** SHOULD: preserve an intentionally open hero region; repair a missing visual rather than filling it with invented content. Check: compare the hero with the chosen source or direction.
- **LAY-26 — Content-safe section sizing.** SHOULD: use content-driven section heights; fixed or viewport-based sizing is valid when required by a mockup or interaction and overflow is handled. Check: long text and zoom do not hide content.
- **LAY-27 — Card heights.** SHOULD: equalize cards when comparison benefits; variable-height cards and masonry are valid compositions. Check: content and controls remain visible across item lengths.
- **LAY-28 — Cap text, not the block.** MUST: `max-width` in `ch` goes on the text element, never on the block carrying a background or border; the block spans its column. Check: no bordered or tinted block narrower than its column.
- **LAY-29 — Sticky elements fit the viewport.** MUST: sticky asides and toolbars set `top: var(--header-h)`, `max-height: calc(100dvh - var(--header-h))`, `overflow: auto`. Check: at 768×1024 the whole aside is reachable in place.
- **LAY-30 — Full-height shells.** MUST: an app shell that scrolls inside uses `height: 100dvh; display: grid; grid-template-rows: auto minmax(0, 1fr) auto` with `overflow: auto; min-height: 0` on the middle row; a document page with a footer uses `min-height: 100svh` on the body wrapper and lets the page scroll; `100vh` only as a fallback line before an `svh` or `dvh` value; no absolute footers. Why: `dvh` on `min-height` re-lays out as mobile browser chrome shows and hides. Check: a 3-line page shows the footer at the bottom; every grep hit of `100vh` is followed by an `svh` or `dvh` declaration.
- **LAY-31 — Distribution follows content.** SHOULD: choose gap and justify-content for the actual grouping; space-between is valid for more than two items. Check: spacing remains usable when labels wrap or items change.
- **LAY-32 — Dynamic counts.** MUST: for any data-fed list or grid, define the layout at 0 (empty state: see components.md), 1, 2, 5 and 20 items, including wrap and truncation. Check: no count produces an orphan row, a single card wider than 600px, or overflow.
- **LAY-33 — Balance.** SHOULD: neither half of a section (left/right, top/bottom) is more than 60% empty; accepted asymmetries: 40/60 hero splits, 8/4 and 7/5 column splits whose content fills both sides; a 50/50 split requires equal heights. Check: no section half over 60% blank at 1440.

## Hierarchy and density

- **LAY-34 — Focal hierarchy.** SHOULD: the intended focal subject is clear and the main task discoverable. An image may dominate a marketing page; a chart or data value may dominate a dashboard. Check: the first viewport communicates its intended subject without requiring the title to be largest.
- **LAY-35 — Density by register.** MUST: one density per surface, applied to rows, cells and controls together: compact = row 32, control 32, cell padding 8; default = row 40, control 36, cell padding 12; comfortable = row 48, control 40, cell padding 16; touch surfaces use 44px controls at any density (control anatomy: see components.md). Brand: comfortable. Product: default, or compact when the chosen reference or the audience's work pattern calls for it (calm dense surfaces: craft.md CRAFT-19); offer a density toggle when audiences differ. Check: all rows of a list share one height and all controls in a row share one height.
- **LAY-36 — Three grouping levels max.** MUST: no more than 3 visible nesting levels at once (page > section > block); a 4th level flattens into spacing or a divider, never another box. Check: count nested borders and backgrounds at any point; ≤ 3.

## Surfaces, cards, borders, elevation

- **LAY-37 — Card only for a unit.** SHOULD: a card only for a self-contained, repeatable or actionable unit; other groups use space, a heading and at most a 1px divider spanning the content column. AVOID cards on more than 60% of the blocks in a view (see anti-patterns.md). Check: cards ≤ 60% of blocks.
- **LAY-38 — Nested surfaces.** SHOULD: nest cards only when containment communicates a real hierarchy; use lighter separators when they communicate the hierarchy. Check: nested surfaces do not obscure relationships or reduce usable content width.
- **LAY-39 — Border or shadow.** MUST: a resting surface is defined by a 1px border (`--color-border`: see color.md), by one shadow from the scale, or by `--shadow-ring`, whose first layer draws the 1px edge (craft.md CRAFT-03); never two of these as decoration. Dividers, table cells and input outlines stay borders. AVOID borders above 1px except focus rings. Check: grep elements with both `border:` and `box-shadow:` at rest.
- **LAY-40 — Radius scale and nesting.** MUST: radius from the scale by role (controls 8, cards 12, sheets 16, pills full); inner radius = outer radius minus the padding between them (0 when the result is below 2px); above 24px of padding the two radii are independent (craft.md CRAFT-01). AVOID radius above 16px on cards and inputs. Check: grep -E `border-radius: ?(2[0-9]|[3-9][0-9])px|rounded-\[`.
- **LAY-41 — Elevation roles.** MUST: level 0 page and inline blocks, 1 resting cards, 2 dropdowns and popovers, 3 drawers and modals; one shadow token per level; dark mode raises by surface lightness (see color.md). Check: grep `box-shadow:` values not from the scale.
- **LAY-42 — Semantic z-index.** MUST: only z-index tokens from the scale; overlay components use `isolation: isolate`. NEVER `z-index: 999` or `9999`. Check: grep -E `z-index: ?[0-9]{3,}|z-\[`.

## Responsive

- **LAY-43 — Query strategy.** MUST: base styles target 320–639px, structure added with `min-width` queries; components adapt with `@container` (`container-type: inline-size` on the parent). AVOID `max-width` queries; hover styles sit under `@media (hover: hover)`. Check: grep `@media (max-width`; 0 hits.
- **LAY-44 — Structure per breakpoint.** MUST: base and `sm` 1 column, drawer nav, tables per CMP-35; `md` 2 columns, aside below main; `lg` full grid, sidebar and aside visible; `xl`+ the container caps, no new columns. Check: each breakpoint changes structure, not only font size.
- **LAY-45 — No horizontal scroll.** MUST: the page never scrolls sideways; carousels scroll inside an `overflow-x: auto` container. Check: `document.scrollingElement.scrollWidth <= window.innerWidth` at 375, 768 and 1440, plus 320 and 1920 when screenshotted (verification.md).
- **LAY-46 — Media never overflow.** MUST: `img, video { max-width: 100%; height: auto }` plus `width`/`height` attributes or `aspect-ratio` on every media box. Check: no layout shift on image load.
- **LAY-47 — Tables on small screens.** MUST: one responsive strategy per table, chosen from components.md (CMP-35) and applied below `md`; the page itself never scrolls sideways (LAY-45). Check: at 375 the table reads without sideways page scroll.
- **LAY-48 — Long text fits.** MUST: the longest real heading fits at 320px (lower the clamp max or cut copy); user content gets `overflow-wrap: anywhere`; flex and grid text children get `min-width: 0`. Check: render the longest string at 320 and 375 (see anti-patterns.md).
- **LAY-49 — Sidebar collapse.** MUST: below `lg` the sidebar becomes a drawer or bottom nav; above `lg` toggling it changes the content width, never the content's left edge. Check: toggle at 1280; the page title's x does not move.
- **LAY-50 — Fixed chrome offsets.** MUST: fixed bars pad with `env(safe-area-inset-*)` (`padding-bottom: max(var(--space-4), env(safe-area-inset-bottom))`; meta `viewport-fit=cover`); content below a fixed header starts at `padding-top: var(--header-h)`; anchors set `scroll-margin-top: var(--header-h)`. Check: no content hidden under fixed bars at 375.
- **LAY-51 — Touch and hover.** MUST: adjacent interactive elements keep ≥ 8px between hit areas (target size: see accessibility.md); hover-only affordances: see components.md (CMP-52). Check: gaps between adjacent targets ≥ 8px.

## Register differences

- **LAY-52 — Register defaults.** SHOULD: Brand: fluid section spacing with `clamp()`, asymmetric splits, one grid break per page, full-bleed media, one idea per viewport. Product: fixed steps, symmetric grids, contained content, structural responsiveness (collapse, stack, scroll); consistency outranks variety.

## Quick check
- LAY-06 · Alignment anchors
- LAY-07 · Gutters by relationship
- LAY-12 · Consistent shared templates
- LAY-13 · Reuse spacing decisions
- LAY-15 · Readable separation
- LAY-17 · Section rhythm
- LAY-23 · Incomplete grid rows
- LAY-24 · Unequal columns
- LAY-25 · Hero whitespace
- LAY-26 · Content-safe section sizing
- LAY-27 · Card heights
- LAY-32 · Dynamic counts
- LAY-38 · Nested surfaces
- LAY-45 · No horizontal scroll
