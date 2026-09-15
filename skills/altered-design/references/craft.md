# Craft and polish

**Applicability:** read `quality.md` first; every value here is a contextual default with a named source, not a conformance criterion. A chosen direction, a supplied reference or an established system outranks these defaults.
Governs the small execution details that compound into an interface that reads as calm and finished: nested radii, optical alignment, depth, icon weight and states, press feedback, icon cross-fades, theme switching, staged entrances, dense product surfaces and gesture details.
**Load when:** `new`, `add` and `improve` on product UI once composition and content are right; `review` for the polish pass; any time a result renders correctly yet reads as loud, flat or unfinished.
**Owns:** polish defaults and the calm product recipe. Durations, easing, frequency budget and reduced motion: motion.md. Radius scale and elevation roles: layout.md. Icon anatomy and images: components.md. Contrast: color.md. Type table: typography.md.
**Sources:** [better-ui](https://github.com/jakubkrehel/skills/tree/main/skills/better-ui) by Jakub Krehel (MIT) and [emil-design-eng](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng) by Emil Kowalski (MIT), read 2026-09-14 and cross-checked in `quality.md`. Exact values are quoted where a source insists on them; ranges appear where the sources disagree.
**Defaults** (when DESIGN.md is silent):

| Detail | Value | Source |
|---|---|---|
| Nested radius | outer = inner + padding; independent radii above 24 px of padding | better-ui |
| Icon-side button padding | text-side padding − 2 px | better-ui |
| Ring shadow, light | `0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px 0 oklch(0 0 0 / 0.04)`; hover alphas 0.08 / 0.08 / 0.06 | better-ui |
| Ring shadow, dark | `0 0 0 1px oklch(1 0 0 / 0.08)`; hover 0.13 | better-ui |
| Image outline | `1px solid oklch(0 0 0 / 0.1)` light, `oklch(1 0 0 / 0.1)` dark, `outline-offset: -1px` | better-ui |
| Icon stroke | 1.5 px beside weight 400, 2 px beside 500–600, 2.5 px beside 700 | better-ui |
| Press feedback | `scale(0.96)` or `scale(0.97)`, one value per project, never below 0.95; 100–160 ms ease-out | both, see quality.md |
| Icon cross-fade | scale 0.25 to 1, opacity 0 to 1, blur 4 px to 0; spring duration 0.3 s with bounce 0, or CSS `cubic-bezier(0.2, 0, 0, 1)` over 300 ms | better-ui |
| Entrance scale floor | containers and overlays start at scale ≥ 0.9 with opacity 0; never `scale(0)` | emil-design-eng |
| Staged entrance | 2–4 semantic chunks 80–100 ms apart; list items 30–50 ms apart; total ≤ 400 ms | reconciled in motion.md (MOT-20) |
| Exit | opacity 0 plus an 8–12 px translate over 150 ms, shorter than the enter | both |
| Transition blur | 2–4 px for cross-fades; never above 20 px | emil-design-eng |

## Surfaces

- **CRAFT-01 — Concentric radius.** SHOULD: when a rounded element sits inside another with a visible even inset, outer radius = inner radius + padding (inner 0 when the result is below 2 px); above 24 px of padding choose each radius independently; keep an established component token where the inset is asymmetric. Why: mismatched nested radii are the most frequent source of visual tension in cards, inputs and image frames. Check: at 200 % zoom the inner and outer corners share one center.
- **CRAFT-02 — Optical alignment.** SHOULD: nudge an asymmetric glyph (play triangle, arrow, caret, star) or an icon-plus-text button by ≤ 2 px when a render shows the geometric center off; fix the SVG before adding margins; icon-side padding = text-side padding − 2 px (LAY-10). Check: compare a screenshot before and after the nudge.
- **CRAFT-03 — Ring shadow for depth, border for structure.** SHOULD: where a border exists only to lift a card, container, button or popover, replace it with the ring shadow token; keep real borders for dividers, table cells, input outlines (COL-15) and selected or focus states; never both a border and a ring on one resting surface (LAY-39). Check: dividers stay `border-*`; cards carry one `box-shadow` token.
- **CRAFT-04 — Image outline.** SHOULD: give raster images and avatars a 1 px inside outline at 10 % alpha, pure black in light and pure white in dark; never a tinted neutral or the accent, which picks up the surface and reads as dirt on the edge. Check: the outline rule uses `oklch(0 0 0 / 0.1)` or `oklch(1 0 0 / 0.1)` with `outline-offset: -1px`.
- **CRAFT-05 — Depth adapts to dark mode.** SHOULD: collapse layered lift shadows to a single light ring on dark surfaces where depth shadows are invisible, and separate surfaces by lightness (COL-25). Check: dark-theme cards show a visible edge at 1:1 zoom.

## Icons

- **CRAFT-06 — Stroke matches text weight.** SHOULD: where the icon set ships stroke variants, use 1.5 px beside regular text, 2 px beside medium or semibold and 2.5 px beside bold; otherwise keep the set's native stroke and use size or color for emphasis; one library and one optical strategy per surface (CMP-50). Check: no hairline icon beside a bold label.
- **CRAFT-07 — One SVG per icon, states by CSS.** SHOULD: icons use `currentColor`; hover, selected and disabled come from color and opacity rather than separate assets; outline is the default variant and fill marks the active state. Check: grep icon markup for hardcoded `fill="#`.
- **CRAFT-08 — Icon cross-fade.** SHOULD: when an icon changes with state (play to pause, like to liked, hover-revealed actions), cross-fade with the Defaults values; without a motion library keep both icons in the DOM with one absolutely positioned; never add a dependency for this; static navigation and decorative icons do not animate. Check: the swap shows scale, opacity and blur together; `bounce` is 0.
- **CRAFT-09 — Design at render size.** SHOULD: test each icon at its smallest rendered size, usually 16 px, on the set's native grid (16 / 20 / 24); prefer simplified glyphs to scaled-down detail. Check: 16 px icons stay recognizable in a 1:1 screenshot.

## Feedback and motion details

- **CRAFT-10 — Press feedback.** SHOULD: pressable elements scale down on `:active` with the Defaults value over 100–160 ms ease-out through a transition, so a release mid-press returns smoothly; a `static` variant switches it off where motion would distract, such as submit buttons in dense forms and list rows. Check: hold and release a button; it returns without a snap.
- **CRAFT-11 — Frequency decides.** SHOULD: decide by trigger frequency (MOT-33): actions repeated hundreds of times a day get no animation; hover and list navigation get instant feedback or ≤ 150 ms on color and opacity; occasional overlays get standard motion; rare first-run and success moments may carry delight. Check: keyboard-initiated actions complete with no transition.
- **CRAFT-12 — Entrances start visible.** SHOULD: elements enter from scale ≥ 0.9 plus opacity 0, or from a small fixed translate, never from `scale(0)`; drawers and sheets that arrive from an edge use `translate` by their own size in percent; exits are softer than enters. Check: no `scale(0)` in enter keyframes or `initial` props.
- **CRAFT-13 — Skip entrance on first paint.** SHOULD: state-driven enter animations (icon swaps, tabs, toggles, segmented controls) do not play on page load; with a motion library set `initial={false}` on the presence wrapper; keep an intentional page hero entrance intact. Check: reload; only the designed hero moves.
- **CRAFT-14 — Origin-aware popovers.** SHOULD: popovers, menus and tooltips scale from their trigger edge using the positioning library's origin variable; modals keep a centered origin because nothing anchors them (MOT-10). Check: a menu grows from its button corner; a dialog grows from the viewport center.
- **CRAFT-15 — Instant adjacent tooltips.** SHOULD: after the first tooltip in a toolbar opens, adjacent tooltips open with no delay and no animation while the pointer keeps moving; the first one keeps its show delay (CMP-41). Check: hover along a toolbar; only the first tooltip waits.
- **CRAFT-16 — Blur bridges a cross-fade.** SHOULD: when two overlapping states read as two objects, add `filter: blur()` of 2–4 px during the swap; keep blur under 20 px and animated blur areas small (MOT-11). Check: replay the swap at 10 % speed; one object transforms instead of two overlapping.
- **CRAFT-17 — Theme switch without a smear.** SHOULD: during a theme flip, inject `*,*::before,*::after{transition:none !important}`, force a reflow, then remove the rule after the next frame; `next-themes` exposes this as `disableTransitionOnChange`. Check: toggle the theme; colors snap, and a later hover still transitions.
- **CRAFT-18 — Static cue beside every motion cue.** MUST: each animated state change also shows a color, icon or label change that survives reduced motion and a missed frame (MOT-15). Check: emulate reduced motion; every state remains identifiable.

## Calm product surfaces

Recipe for the dense, quiet work UI that users describe as calm: CRM tables, admin consoles, pipelines, inboxes. Values are defaults to tune against the chosen direction; pair them with the density table in layout.md and the type table in typography.md. The recipe was written after inspecting a user-supplied dark CRM screenshot on 2026-09-14; the image has no known creator and is not part of the gallery.

- **CRAFT-19 — Calm surface recipe.** SHOULD: one neutral family with hairline separators at 6–10 % alpha; body 13 px and metadata 12 px with `tabular-nums` in every numeric column; compact rows of 32–36 px; one accent reserved for the primary action, selection and links; status as tinted pills (8–15 % alpha tint, same-hue text ≥ 4.5:1) rather than filled blocks; no resting shadows on tables and lists; avatars 20–24 px; the sidebar on a surface ΔL 0.02–0.04 from content with muted uppercase group labels of 11–12 px; icons 16 px at 1.5 px stroke; hover as one lightness step; no entrances. Check: at 1440 the only saturated fills are the primary action and selected states.
- **CRAFT-20 — Restraint before decoration.** SHOULD: in product register remove a gradient, glow, texture or entrance before adding one; when a screen reads as loud, first reduce type size steps, saturated area and shadow depth, then re-inspect. Check: the second render carries fewer visual devices than the first for the same information.

## Gestures and drag details

- **CRAFT-21 — Momentum dismissal.** SHOULD: dismiss on a quick flick (velocity = drag distance ÷ elapsed ms, above about 0.11 px/ms) as well as on distance; damp movement past a boundary instead of a hard stop; capture the pointer once a drag starts; ignore extra touch points mid-drag. Check: a short fast swipe dismisses; a slow short drag springs back.
- **CRAFT-22 — Deliberate press, snappy release.** SHOULD: where a hold confirms a destructive action, fill over about 2 s linear and reset in 200 ms ease-out: slow where the user decides, fast where the system responds. Check: releasing early resets within 200 ms.

## Transform and clip-path recipes

Use these when the interaction calls for them; none is a default.

- Tabs with an exact color transition: duplicate the tab list, style the copy as active, clip it with `clip-path: inset()` to the active tab and animate the inset on change.
- Reveal on scroll: start at `clip-path: inset(0 0 100% 0)` and animate to `inset(0)` once in view with an `IntersectionObserver`, inside the reduced-motion opt-in (MOT-15).
- Comparison slider: overlay two images and drive the top one's `inset()` from the drag position; no extra DOM.
- Hold-to-confirm: an overlay clipped to `inset(0 100% 0 0)` fills to `inset(0)` on press (CRAFT-22).
- Percent translates move an element by its own size regardless of content height; `scale()` scales children, which is the intended behavior for press feedback.
- Programmatic motion with CSS performance: the Web Animations API (`element.animate`) is interruptible and needs no library.

## Before delivery

| Symptom | Fix |
|---|---|
| Icons look off-center | Nudge optically or fix the SVG (CRAFT-02) |
| Nested corners fight each other | Recompute the outer radius from inner + padding (CRAFT-01) |
| Cards look boxed and heavy | Ring shadow instead of border and shadow together (CRAFT-03) |
| Theme toggle cross-fades the page | Suppress transitions for the swap (CRAFT-17) |
| `transition: all` | Name the properties (MOT-09) |
| First-frame stutter | `will-change: transform` on that element only (MOT-11) |
| Hairline icon beside bold text | Match the stroke to the text weight (CRAFT-06) |
| Screen reads as loud | Apply the calm recipe and remove devices first (CRAFT-19, CRAFT-20) |
| Entrance replays on every toggle | Skip the entrance on first paint and stop animating frequent actions (CRAFT-13, MOT-33) |

## Quick check

- CRAFT-01 · nested radii concentric
- CRAFT-02 · asymmetric glyphs nudged after inspection
- CRAFT-03 · depth by ring shadow, structure by border
- CRAFT-06 · icon stroke matches text weight
- CRAFT-10 · press feedback present and interruptible
- CRAFT-11 · frequent actions not animated
- CRAFT-12 · no entrance from scale(0)
- CRAFT-14 · popovers grow from their trigger
- CRAFT-18 · static cue beside motion
- CRAFT-19 · calm recipe applied on dense product surfaces
- CRAFT-20 · devices removed before added
