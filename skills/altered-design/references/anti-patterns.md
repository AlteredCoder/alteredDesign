# Anti-patterns

Contextual review prompts and concrete failure checks. Read `quality.md` first.
**Load when:** a rendered result needs targeted diagnosis; inspect only relevant prompts.
**Owns:** symptom searches and review prompts, not a blacklist of aesthetics.
**Defaults:** functional or accessibility failures require evidence; visual preferences are
SHOULD guidance. Search hits locate code and never automatically set severity.

## How to use

- **ANTI-01 — Evidence before rejection.** MUST: reject broken behavior and unmet requirements; evaluate visual choices against the selected direction. A stylistic grep hit is not a defect.
- **ANTI-02 — Look before classifying.** MUST: inspect rendered output before classifying visual findings. Source searches help locate causes; they do not establish visual quality.
- **ANTI-03 — Apply contextual advice.** SHOULD: treat visual review prompts as optional design guidance; no explicit exception is needed for an established or selected style.

## Implementation and composition checks

- **ANTI-04 — Accent borders.** SHOULD: use stripes, full borders, tint or icons according to the system. Check: status meaning is not conveyed by color alone.
- **ANTI-05 — Gradient text.** SHOULD: permit gradient text when chosen, with contrast and fallback verification through COL-29.
- **ANTI-06 — Glass surfaces.** SHOULD: use glass where it supports the chosen hierarchy; verify composite contrast and an opaque fallback through COL-30.
- **ANTI-07 — Metric-led hero.** SHOULD: use a metric as the hero when it is sourced and central to the message. Check: the number has context and the next action is clear.
- **ANTI-08 — Repeated cards.** SHOULD: use identical cards for comparable content and varied arrangements for different roles. Check: real content determines the structure, with no filler to complete a grid.
- **ANTI-09 — Eyebrow labels.** SHOULD: use section kickers when they add useful categorization or match the reference. Check: repeated labels do not obscure the main heading.
- **ANTI-10 — Numbered markers.** SHOULD: use numbers for sequence, navigation or an explicit editorial device. Check: numbering does not imply a process where none exists.
- **ANTI-11 — Text overflow.** NEVER: text overflowing or clipped by its container at 375, 768 or 1440. Rewrite: lower the clamp max, `text-wrap: balance`, `overflow-wrap: anywhere` on long tokens, `min-width: 0` on flex children (typography.md).
- **ANTI-12 — Emoji and icons.** SHOULD: use the chosen icon or emoji language when meaning is clear; essential controls need accessible names. Check: meaning survives platform-specific glyph rendering.
- **ANTI-13 — Placeholder as label.** NEVER: an input whose only label is its placeholder. Rewrite: visible label above; placeholder holds a format example or nothing (ellipsis convention: see ux-writing.md).
- **ANTI-14 — outline: none.** NEVER: `outline: none`, `outline: 0` or `outline-none` without a `:focus-visible` replacement. Rewrite: `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px }` (color.md, accessibility.md).
- **ANTI-15 — Arbitrary z-index.** NEVER: `z-index` 999, 9999 or any value outside the DESIGN.md scale. Rewrite: the scale token (layout.md).
- **ANTI-16 — Zoom disabled.** NEVER: `user-scalable=no` or `maximum-scale` below 5 in the viewport meta. Rewrite: `width=device-width, initial-scale=1, viewport-fit=cover`.
- **ANTI-17 — Lorem ipsum.** NEVER: lorem ipsum, "Welcome to our website" or filler in delivered UI. Rewrite: real draft copy in the product's voice; unknown facts as `[PLACEHOLDER: price]`.
- **ANTI-18 — Fabricated proof.** NEVER: invented testimonials, logos, ratings or round metrics (99.99%, "10,000+ users"). Rewrite: proof from the user's material, a marked placeholder, or no proof block.
- **ANTI-19 — Presentation frames.** SHOULD: browser and device frames may be used in presentation mockups. Check: decorative chrome is distinguishable from actual interactive controls.
- **ANTI-20 — Nested cards.** SHOULD: assess nested surfaces through LAY-38; containment is valid when it clarifies hierarchy.
- **ANTI-21 — Hover-only actions.** NEVER: an action reachable only on hover. Rewrite: an always-visible overflow menu, or reveal on `:focus-within` and `:hover`.
- **ANTI-22 — Animation cost.** SHOULD: prefer explicit transitions and inexpensive properties; judge more demanding effects by measured performance and accessibility. Check: motion does not block input or disrupt layout.
- **ANTI-23 — Fake loading delays.** NEVER: `setTimeout` to show a spinner or skeleton for effect. Rewrite: loading only while a request is pending (timing: motion.md).

## Contextual style prompts

- **ANTI-24 — Warm palettes.** SHOULD: allow cream, serif and earth-tone combinations when selected. Check: palette and type execution match the reference and remain readable.
- **ANTI-25 — Dark with vivid accents.** SHOULD: allow dark backgrounds with bright accents when selected. Check: emphasis remains legible without color alone.
- **ANTI-26 — Editorial rules and columns.** SHOULD: use hairlines and newspaper-like columns for the selected composition, including non-publications. Check: narrow layouts preserve reading order.
- **ANTI-27 — Card vocabulary.** SHOULD: choose card geometry and depth by role and direction. Check: repeated content is comparable and nesting does not consume needed space.
- **ANTI-28 — Visual notation.** SHOULD: permit tracked labels, monochrome surfaces, monospace metadata and directional glyphs when they serve the selected vocabulary. Check: labels stay readable and meaning is clear.
- **ANTI-29 — Word emphasis.** SHOULD: emphasize words with type or color when the meaning warrants it. Check: emphasis remains readable and matches the direction.
- **ANTI-30 — Capitalization.** SHOULD: apply casing according to brand and text role. Check: controls and long text remain readable at their actual sizes.
- **ANTI-31 — Italic roles.** SHOULD: permit italic in either register when it matches the selected font roles. Check: small labels remain legible.
- **ANTI-32 — Three-column layouts.** SHOULD: use three columns when they suit the content and viewport. Check: narrow layouts and changing item counts work without hiding items.
- **ANTI-33 — Centered compositions.** SHOULD: center content where it supports the reference; use readable measures for longer prose. Check: text remains easy to scan.
- **ANTI-34 — Entrance effects.** SHOULD: use entrances consistent with the chosen motion direction. Check: they do not delay access and have reduced-motion alternatives.
- **ANTI-35 — Card motion.** SHOULD: card lift and shadow changes may communicate interactivity. Check: keyboard and touch offer equivalent access and motion can be reduced.
- **ANTI-36 — Image hover.** SHOULD: image zoom may accompany an interactive card or image viewer. Check: content and controls remain accessible without hovering.
- **ANTI-37 — Radius system.** SHOULD: use one radius or multiple role-based radii according to the selected system. Check: equivalent components use consistent values.
- **ANTI-38 — Borders and shadows.** SHOULD: combine or separate borders and shadows according to the material. Check: boundaries and hierarchy remain clear.
- **ANTI-39 — Large radii.** SHOULD: permit large radii for expressive, glass or soft surfaces. Check: corners do not clip content or shrink usable control areas.
- **ANTI-40 — Texture and shape.** SHOULD: allow grain, stripes, blobs and wavy dividers when selected. Check: texture does not compromise text contrast or rendering performance.
- **ANTI-41 — Handcrafted imagery.** SHOULD: permit hand-drawn and illustrated imagery with coherent art direction. Check: use inspected assets at resolution that remains sharp at the displayed size without disguising missing content.
- **ANTI-42 — Marketing filler.** AVOID: "modern", "seamless", "powerful", "elevate", "unleash", "next-gen", "game changer", "all-in-one"; state the claim with a number (ux-writing.md).
- **ANTI-43 — Font selection.** SHOULD: permit all fonts, including common families, based on brand, language coverage and reference fidelity. Check: actual loaded letterforms and wrapping match the intended design.
- **ANTI-44 — Editorial direction.** SHOULD: permit editorial typography on any surface where selected. Check: hierarchy supports the actual task and text remains readable.

## Compare with intent

- **ANTI-45 — Intent check.** SHOULD: compare palette and composition with selected references. Familiar category conventions are allowed; novelty is not a quality requirement.
- **ANTI-46 — Distinct options.** SHOULD: when proposing alternatives, vary meaningful dimensions such as composition, type and materials. Do not force a new direction after selection.
- **ANTI-47 — Task recognition.** SHOULD: assess whether the primary task, navigation and controls are understandable. An unfamiliar visual treatment alone does not prove a usability failure.
- **ANTI-48 — Specific content.** SHOULD: ensure the page describes the actual product, audience and task instead of generic filler. Competitor similarity alone is not a defect.
- **ANTI-49 — Decoration review.** SHOULD: remove decoration when it obstructs the task or conflicts with the chosen direction; retain it when it carries the selected identity.
- **ANTI-50 — Brief fidelity.** MUST: compare the result with the brief and visual references. Report observed mismatches, not similarity to an imagined unprompted generation.

## Detection greps

Use `rg -n` over html/jsx/tsx/vue/svelte/astro/css/scss of the target; skip `node_modules`, `vendor`, `dist`, `build`, minified and generated files. In the table `\|` is the markdown escape for `|`: type `|` in the shell. `grep -P` is absent on macOS; use `rg` for that row.

| Pattern | Indicates | Rule |
|---|---|---|
| `border-l-[2-9]\|border-left: ?[2-9]px` | accent border; inspect meaning | ANTI-04 |
| `bg-clip-text\|background-clip: ?text` | gradient text | ANTI-05 |
| `backdrop-blur\|backdrop-filter` | glass | ANTI-06 |
| `z-\[?9{3,}\|z-index: ?9{3,}` | arbitrary z-index | ANTI-15 |
| `uppercase.*tracking-wid\|text-transform: ?uppercase` | eyebrow, caps | ANTI-09, ANTI-30 |
| `\b0[1-9] ?[·/]` | numbered markers | ANTI-10 |
| `outline-none\|outline: ?(none\|0)` | focus removed | ANTI-14 |
| `user-scalable=no\|maximum-scale=[1-4]\b` | zoom disabled | ANTI-16 |
| `lorem ipsum\|welcome to (our\|the)` | filler | ANTI-17 |
| `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]` (`grep -P` or `rg`) in markup | emoji icons | ANTI-12 |
| `<input` count > `<label` + `aria-label` count | unlabeled input | ANTI-13 |
| `hover:scale\|group-hover:scale\|:hover[^}]*scale\(` | image zoom | ANTI-36 |
| `hover:-translate-y\|hover:shadow-` | card lift | ANTI-35 |
| `transition: ?all\|transition-all` | transition all | ANTI-22 |
| `repeating-linear-gradient\|feTurbulence` | stripes, grain | ANTI-40 |
| `rounded-3xl\|border-radius: ?(2[4-9]\|[3-9][0-9])px` | large radius; inspect clipping | ANTI-39 |
| `setTimeout\([^)]*\)[^;]*(loading\|spinner\|skeleton)` | fake delay | ANTI-23 |
| `font-family:[^;]*(Inter\|Roboto\|Arial\|Open Sans)` | font declaration; inspect loading | ANTI-43 |
| `\b(seamless\|elevate\|unleash\|next-gen\|game.changer)\b` | filler copy | ANTI-42 |
| `(p\|m\|px\|py\|gap\|w\|h\|text\|rounded)-\[` | arbitrary Tailwind value | ANTI-52 |
| `\b[0-9]{2,3}px\b` outside the scale | value to compare with system | ANTI-52 |

- **ANTI-51 — Search hits need evidence.** MUST: filter source-search hits through scope, selected direction and rendered evidence before reporting. A font, color or effect name alone is not a finding.
- **ANTI-52 — Value consistency.** SHOULD: review unexplained differences between equivalent components. Values outside a default scale and arbitrary utility syntax are not defects by themselves.

## Quick check

- ANTI-01 · evidence before rejection
- ANTI-11 · no unintended text clipping
- ANTI-14 · keyboard focus visible
- ANTI-18 · no fabricated proof
- ANTI-21 · actions accessible without hover
- ANTI-43 · selected and existing fonts permitted
- ANTI-50 · compare with chosen references
- ANTI-51 · search hits are not automatic findings
