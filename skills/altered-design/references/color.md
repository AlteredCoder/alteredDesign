# Color

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs how a palette is chosen, built, named, checked for contrast and adapted to states, dark mode and charts.
**Load when:** `new`, `add`, `improve`, `review` on any surface; `system` when seeding color tokens.
**Owns:** palette strategy, tokens, contrast ratios, dark mode, state colors, gradients, focus ring color, data-viz palettes. Everything else is referenced by ID.
**Defaults** (when DESIGN.md is silent): strategy Restrained in product, Committed in brand; OKLCH everywhere; light bg L 0.98–1.0, dark bg L 0.13–0.18; neutrals tinted C 0.005–0.015 toward the brand hue; text 4.5:1, large text and UI parts 3:1; hover ΔL 0.04, active ΔL 0.08, disabled 40% opacity.

| Token | Light (OKLCH L) | Dark (OKLCH L) | Role |
|---|---|---|---|
| `--color-bg` | 0.98–1.0, C ≤ 0.01 | 0.13–0.18, C ≤ 0.02 | page |
| `--color-surface` | 1.0, or bg −0.02 | bg +0.03 | cards, panels |
| `--color-surface-raised` | 1.0 plus shadow | bg +0.06 | popovers, modals |
| `--color-border` | 0.88–0.92, or black at 6–10 % alpha | 0.28–0.32, or white at 8–13 % alpha | 1px card edges, dividers; alpha hairlines adapt over mixed surfaces (craft.md) |
| `--color-border-strong` | ≤ 0.62 (3:1 on bg) | ≥ 0.58 (3:1 on bg) | input and control outlines (COL-15) |
| `--color-ink` | 0.15–0.25 | 0.93–0.97 | primary text |
| `--color-ink-muted` | ≤ 0.50 (4.5:1 on bg) | ≥ 0.70 | secondary text |
| `--color-accent` | brand hue, 0.40–0.55 with white ink; ≤ 0.62 only with dark ink | +0.08, C −15% | primary action, selection, links |
| `--color-accent-ink` | ≥ 4.5:1 on accent | same | text on accent |
| `--color-success` / `-warning` / `-error` / `-info` | hues 150 / 80 / 25 / 250, 0.50–0.60 | +0.10, C −15% | status, paired with icon or text |
| `--color-focus` | accent or ink, ≥ 3:1 on bg and on controls | same rule | focus ring (COL-16) |
| `--color-scrim` | ink hue at 40–60% alpha | same | modal backdrops, image scrims (COL-31) |

## Strategy first

- **COL-01 — Palette strategy.** SHOULD: choose restrained, committed, full palette or drenched from the selected direction and context. Both registers may use any strategy. Check: role assignments keep content and actions distinguishable.
- **COL-02 — Theme choice.** SHOULD: honor brand, user preference and usage context when choosing light, dark or both. A fictional physical scene is not required. Check: each shipped theme is verified separately.
- **COL-03 — Hue follows identity.** SHOULD: derive color from the chosen direction, reference or brand; blue, orange and previously used colors remain valid. Check: record the actual source of the palette.
- **COL-04 — Background freedom.** SHOULD: choose backgrounds from the reference or selected direction, including warm neutrals, pure white, black or saturated colors. Check: foreground pairs meet applicable contrast requirements.

## Palette construction

- **COL-05 — Color notation.** SHOULD: preserve project notation; OKLCH helps build perceptual ramps but hex, RGB and HSL are valid. Check: target browsers render the chosen syntax or its fallback.
- **COL-06 — Build only needed ramps.** SHOULD: create palette steps required by actual roles and states; avoid generating unused ramps for a mockup. Check: each used pair is measured, not assumed accessible from lightness alone.
- **COL-07 — Neutral palette.** SHOULD: use neutral or tinted grays according to the selected direction. Check: equivalent surfaces use coherent role tokens.
- **COL-08 — Accent hierarchy.** SHOULD: assign accents consistently to action, state or brand roles; area percentages are guidance rather than a pass/fail test. Check: primary tasks and selected states remain identifiable.
- **COL-09 — Semantic consistency.** SHOULD: use consistent status colors within the established system and pair them with text or marks. Fixed hue bands and distances are not accessibility criteria. Check: statuses remain identifiable without color alone.
- **COL-10 — Second neutral layer.** SHOULD: Product: sidebars, toolbars and panels sit on a surface ΔL 0.02–0.04 from the content surface, same hue. Check: panel and content surface tokens differ by ΔL 0.02–0.04.

## Tokens

- **COL-11 — Role names.** MUST: components reference role tokens (`--color-bg`, `--color-ink-muted`, `--color-accent`), never primitives such as `--blue-500` or literals. Check: grep -E `--[a-z]+-[0-9]{3}\b|#[0-9a-f]{6}` in component CSS.
- **COL-12 — Two layers.** MUST: primitives (ramps) feed semantic roles; dark mode and themes redefine only the semantic layer under `[data-theme]` or `prefers-color-scheme`. Check: the dark block contains only `--color-*` role tokens.
- **COL-13 — Paired tokens.** MUST: every colored surface token ships with its on-color (`--color-accent` with `--color-accent-ink`, `--color-error` with `--color-error-ink`); text sits only on a token it is paired with. Check: each pair passes COL-14.

## Contrast

- **COL-14 — Text contrast.** MUST: text ≥ 4.5:1 against its actual background; large text (≥ 24px, or ≥ 18.66px bold) ≥ 3:1; placeholder and muted text also ≥ 4.5:1; when within 0.3 of the limit, move the text toward ink. Why: muted gray on tinted white is the most frequent failure. Check: contrast checker on every pair in the token table, both themes.
- **COL-15 — Component contrast.** MUST: input borders, icons, chart marks, toggles and any part needed to identify a control or its state ≥ 3:1 against adjacent colors; decorative dividers exempt; input and control outlines use `--color-border-strong`, `--color-border` serves dividers and card edges only. Check: `--color-border-strong` on `--color-bg` ≥ 3:1 in both themes; no input outlined with `--color-border`.
- **COL-16 — Focus ring color.** MUST: the focus ring ≥ 3:1 against both the control and the page bg (accent or ink); ring size, offset, presence and behavior: see accessibility.md. Check: ring vs control and ring vs bg both ≥ 3:1.
- **COL-17 — Disabled exception.** MUST: disabled text and controls are exempt from the minimums yet stay ≥ 3:1 when the label carries information the user needs. Check: disabled labels that carry information ≥ 3:1.
- **COL-18 — Text over colored surfaces.** MUST: judge gray, tinted, black or white text by actual contrast over the composited background. Check: applicable COL-14 contrast passes; hue matching is not required.
- **COL-19 — Text over variable imagery.** MUST: keep text readable over the least-contrasting supported image or material regions, using a scrim, backing surface or placement when needed. Check: measure the worst relevant foreground/background pairs, including light and dark text.

## State colors

- **COL-20 — Visible interaction feedback.** SHOULD: use distinguishable hover and active treatments from the selected component system; fixed lightness deltas are defaults. Check: feedback is perceptible and text stays readable in each state.
- **COL-21 — Selected states.** SHOULD: use a visible selected treatment consistent with the system, including full fills, tints, borders or marks. Check: selection remains identifiable without color alone.
- **COL-22 — Unavailable state styling.** SHOULD: distinguish unavailable controls with the established state tokens while retaining discoverable labels and reasons. A fixed opacity is not required; inactive controls have specific contrast exceptions that do not apply to unrelated explanatory text. Check: state and prerequisite remain understandable in each theme.
- **COL-23 — Meaning not by color alone.** MUST: every status color pairs with an icon, text or pattern (see accessibility.md). Check: each status token co-occurs with an icon or a text label.

## Dark mode

- **COL-24 — Independent theme verification.** MUST: honor requested and existing themes; verify each theme independently rather than mechanically inverting colors. Check: contrast and state visibility pass in each shipped theme.
- **COL-25 — Dark surface hierarchy.** SHOULD: distinguish dark surfaces by lightness, boundaries or material; pure black is permitted. Check: boundaries needed to identify controls meet COL-15.
- **COL-26 — Dark text and accents.** SHOULD: tune text and accent pairs for dark backgrounds; pure white is permitted. Check: measure COL-14 and COL-15 instead of assuming fixed lightness ranges pass.
- **COL-27 — Preserve image intent.** SHOULD: preserve photographs and brand assets in dark mode unless an explicit treatment is chosen. Check: no automatic dimming obscures image detail.
- **COL-28 — Color scheme and natives.** MUST: `color-scheme` on `:root` declares the shipped schemes; `<meta name="theme-color">` matches the bg per theme; native `<select>`, inputs and scrollbars get explicit `background-color` and `color`; a theme switch suppresses transitions for the swap (craft.md CRAFT-17). Check: form controls in the dark theme show dark chrome; toggling the theme snaps instead of smearing.

## Gradients and transparency

- **COL-29 — Gradients.** SHOULD: permit gradients, including text gradients, when selected or present in the source. Check: text contrast passes across the gradient and a readable fallback exists when the effect is unavailable.
- **COL-30 — Transparent materials.** MUST: when using transparency or glass, verify text and controls against the rendered background and provide a readable opaque fallback for unsupported effects or relevant user settings. Check: inspect bright, dark and visually busy backgrounds plus the fallback.
- **COL-31 — Scrim strength.** SHOULD: choose scrim color and opacity to achieve required legibility without obscuring the intended visual. Check: measure the composite instead of enforcing a fixed alpha range.

## Data visualization

- **COL-32 — Chart palettes.** MUST: categorical ≤ 7 hues at equal L and C, spaced ≥ 40° in hue; sequential ramps single-hue L 0.90 to 0.30; diverging two hues through a neutral midpoint; grid lines ≤ 1.5:1 against bg, marks ≥ 3:1. Check: series count ≤ 7 or grouped into "other".
- **COL-33 — Colorblind-safe.** MUST: never red against green as the only pair; prefer blue against orange; add shape, pattern, direct labels or text for every encoded state (see accessibility.md). Check: DevTools deuteranopia emulation keeps every series distinct.
- **COL-34 — Literal values for libraries.** MUST: when a chart library cannot read CSS variables, pass literal hex or oklch strings resolved from the tokens (`getComputedStyle(root).getPropertyValue('--chart-1')`) or generated at build time; no second hand-typed palette. Check: chart colors equal the token values in both themes.

## Quick check
- COL-01 · Palette strategy
- COL-02 · Theme choice
- COL-04 · Background freedom
- COL-07 · Neutral palette
- COL-08 · Accent hierarchy
- COL-11 · Role names
- COL-14 · Text contrast
- COL-15 · Component contrast
- COL-18 · Text over colored surfaces
- COL-20 · Visible interaction feedback
- COL-25 · Dark surface hierarchy
- COL-29 · Gradients
- COL-33 · Colorblind-safe
