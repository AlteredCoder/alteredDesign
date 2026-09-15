# Motion

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs when to animate, durations, easing, animatable properties, reduced motion, hover motion, entrances, scroll-driven motion, loading timing and view transitions.
**Load when:** any mode adds or changes a transition, animation, loading indicator or hover effect; `review` for the motion audit.
**Owns:** purpose, frequency budget, durations, easing, what to animate, reduced motion, hover motion, entrances, scroll motion, skeleton and spinner timing, view transitions. Skeleton-vs-spinner choice: components.md. Flashing limits, pause controls: accessibility.md. Motion tells and bans: anti-patterns.md. Press feedback, icon cross-fades, entrance scale floor and gesture details: craft.md.
**Defaults:** this table is the source for every duration quoted in other files. Ranges were cross-checked on 2026-09-14 against Carbon's motion tokens (70–700 ms) and Material 3 duration tokens (50–600 ms); see quality.md.

| Token | Value | Use |
|---|---|---|
| `--dur-micro` | 80–150 ms | hover color, press, toggle, checkbox, tooltip fade |
| `--dur-small` | 150–250 ms | menu, tooltip, tab indicator, accordion, dialog, toast |
| `--dur-medium` | 250–400 ms | drawer, sheet, route crossfade, one section reveal |
| `--dur-large` | ≤ 500 ms | one brand entrance |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | entering, feedback and in-place exits |
| `--ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | only an element leaving the viewport permanently (MOT-06) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | moving on screen |
| `--ease-icon` | `cubic-bezier(0.2, 0, 0, 1)` | icon cross-fades without a motion library (craft.md) |

These durations are candidate project tokens. Longer motion needs a task or visual reason and applicable pause, stop and reduced-motion behavior (MOT-16, MOT-24, MOT-25, MOT-30).

## Purpose

- **MOT-01 — Motion purpose.** SHOULD: motion may express the chosen identity, communicate state or preserve orientation in either register. Check: content and tasks stay accessible while motion runs.
- **MOT-02 — Product entrances.** SHOULD: keep product content immediately usable; entrances are allowed if they neither hide information nor delay interaction. Check: reload and begin the main task without waiting.
- **MOT-03 — Register budget.** SHOULD: Product: ≤ 2 animated elements per view beyond control feedback. Brand: one signature moment plus control feedback. Check: count animated elements per view.
- **MOT-33 — Frequency budget.** SHOULD: decide whether to animate by how often the user triggers it: hundreds of times a day (keyboard shortcuts, command palette, tab switches in a work tool) gets no animation; tens of times a day (hover, list navigation) gets instant feedback or ≤ 150 ms on color and opacity; occasional overlays get standard motion; rare first-run, success and empty states may carry delight. Keyboard-initiated actions in a work tool never animate. Why: a custom animation charges its attention cost on every trigger. Check: list each animation in a view with its trigger frequency.
- **MOT-34 — Match motion to the mood.** SHOULD: choose easing, duration and bounce from the personality of the surface: crisp and fast in a work tool, slower or softer where the chosen direction is playful or editorial; one coherent motion language per surface. Check: durations and curves on one surface come from one token set (MOT-07).

## Durations and easing

- **MOT-04 — Duration by size.** MUST: pick from Defaults by the size of the change; nothing the user waits on exceeds 500 ms; only loops and the one celebration (MOT-30) run longer. Check: list every `ms` and `s` value in CSS and JS animation code; every value above 500 ms belongs to a loop or the celebration.
- **MOT-05 — Easing by intent.** SHOULD: use custom curves from the token table rather than the built-in keywords, which read as weak; entrances, hover and press feedback use ease-out; springs serve drag, gestures and interruptible movement, with bounce 0 for product feedback and icon swaps and 0.1–0.3 only for drag-to-dismiss or a playful direction; overshoot is permitted when controlled. Never ease-in for an entrance or for feedback. Check: feedback settles predictably and respects reduced motion.
- **MOT-06 — Exit shorter than enter.** SHOULD: exit 50–70 % of the enter duration of the same element, as a fade plus a small translate with `--ease-out` when the element leaves in place; an accelerating `--ease-in` only when it leaves the viewport permanently; an element that parks nearby, such as a side panel, decelerates. Check: a dialog closes faster than it opens; a toast does not accelerate away.
- **MOT-07 — One token set.** MUST: durations and easings come from tokens in DESIGN.md; no literal `ms` in component styles, no `duration-[0-9]+` utilities outside the theme config. Check: grep component CSS for `[0-9]+ms` and templates for `duration-[0-9]`.

## Properties and performance

- **MOT-08 — Measure animation cost.** SHOULD: prefer transform and opacity; `filter: blur()` stays ≤ 20 px; other properties are valid when measured performance supports them. A motion library's shorthand `x`, `y` and `scale` props run on the main thread; pass a full `transform` string, or use CSS or the Web Animations API when the page is busy. Drive drag through `transform` on the element, not through a CSS variable on a container that recalculates every child. Check: inspect layout, paint and input responsiveness on the intended device class.
- **MOT-09 — Explicit transition list.** MUST: list the transitioned properties. NEVER `transition: all`. Check: grep `transition: all|transition-all`.
- **MOT-10 — Transform origin.** SHOULD: `transform-origin` at the trigger side (menu from its button edge); modals keep a centered origin because nothing anchors them; SVG: transform a `<g>` with `transform-box: fill-box; transform-origin: center`. Check: a menu scales from its button corner; a dialog scales from the viewport center.
- **MOT-11 — will-change and containment.** SHOULD: `will-change` only on the element about to animate, removed after; `contain: layout paint` on continuously animated blocks; animated blur and shadow areas ≤ 400 × 400 px. Check: no `will-change` in base styles.
- **MOT-12 — Responsive motion.** SHOULD: aim for smooth motion on target devices; use efficient scroll-driven APIs or passive listeners where suitable. Check: record performance and investigate sustained jank or blocked input instead of assuming a single frame proves failure.
- **MOT-13 — No layout shift from motion.** MUST: entering elements occupy their final space before animating; CLS below 0.1. Check: Lighthouse CLS.
- **MOT-14 — Interruptible.** MUST: user input cancels or redirects an animation in progress; interactive state changes use CSS transitions or springs, which retarget mid-flight, and keyframes serve only one-shot staged sequences; the final state is set explicitly by a class or attribute, never dependent on `animationend`. Check: click a toggle twice fast; it lands correctly without restarting.

## Reduced motion

- **MOT-15 — Reduced motion.** MUST: entrances, scroll-driven motion, parallax and scale live inside `@media (prefers-reduced-motion: no-preference)` (opt-in, so the default is static); under `reduce` the remaining change is a crossfade ≤ 150 ms or instant; functional feedback stays (focus ring, progress, loading text); a global `animation-duration: 0.01ms` rule is the safety net, not the design. Check: emulate reduced motion; nothing moves; loading is still indicated.
- **MOT-16 — Loops stop.** MUST: decorative loops pause under reduced motion and expose a pause control after 5 s (see accessibility.md). Check: emulate reduced motion; the loop is static.

## Hover motion

- **MOT-17 — Hover changes color, not geometry.** SHOULD: transition background, border or text color over `--dur-micro`; no lift, no shadow growth, no scale by default; `scale(1.02)` at most, only when the brief asks; hover transitions inside `@media (hover: hover)` (see components.md). Check: hover a card; its box does not move.
- **MOT-18 — Image hover motion.** SHOULD: permit zoom or translation where it communicates interaction and matches the direction. Check: important content remains visible and hover is not the only route to an action.

## Entrances and scroll

- **MOT-19 — Content access without optional effects.** MUST: make decorative motion an enhancement; an unavailable animation API or skipped reveal cannot leave rendered content invisibly waiting for an effect. JavaScript-dependent applications follow their actual rendering architecture; this rule does not require every app to implement a separate no-JavaScript interface. Check: disable optional effects and simulate an interrupted reveal while preserving task access.
- **MOT-20 — Stagger limits.** SHOULD: stagger list siblings at 30–50 ms per item, ≤ 8 items; stagger the 2–4 semantic chunks of an infrequent staged entrance (title, description, actions) at 80–100 ms; total ≤ 400 ms; items past 8 appear together; never stagger routine interactions, and never block input while a stagger plays. Check: the last of 20 items appears within 400 ms; a row hover does not replay an entrance.
- **MOT-21 — Entrance coherence.** SHOULD: coordinate entrance effects without delaying reading or interaction. Check: inspect the full page and reduced-motion alternative.
- **MOT-22 — Scroll effects.** SHOULD: allow scroll effects in either register when selected and usable. Check: keyboard, touch, native scrolling and reduced-motion access remain intact.
- **MOT-32 — Animated text and values.** SHOULD: allow counters or text treatments when selected, with actual values available immediately to assistive technology and under reduced motion. Check: no important content depends on waiting through an animation.

## Loading

- **MOT-23 — Spinner delay.** MUST: show a spinner only after 300 ms of waiting. Check: a 200 ms request never flashes a spinner.
- **MOT-24 — Skeleton shimmer.** SHOULD: shimmer or pulse loops every 1.2–1.6 s, linear, one lightness step of contrast; static under reduced motion. Check: shimmer period in DevTools.
- **MOT-25 — Progress transitions.** SHOULD: determinate bars animate value changes over 200–300 ms ease-out, never backwards; indeterminate bars loop every 1.5–2 s. Check: value jumps are smoothed.

## Transitions and overlays

- **MOT-26 — Optional view transitions.** SHOULD: use view transitions only when they clarify continuity or serve the chosen direction. Check API and browser support against the target matrix, preserve navigation without the effect, and use reduced or instant motion according to user settings. Check: unsupported and reduced-motion paths complete the same navigation.
- **MOT-27 — Overlay transitions.** SHOULD: animate dialogs and popovers only when motion serves the interaction or selected direction. Verify support before using starting styles or discrete transitions, retain an immediate fallback, and keep focus and dismissal behavior independent of animation completion. Check: overlays open and close with optional effects disabled.
- **MOT-28 — Toasts.** SHOULD: enter with an 8–16 px translate from the edge plus fade over 200 ms; exit fade 150 ms; stacked toasts shift with a transform, not a re-layout. Check: a toast entrance pushes no content.

## Micro-interactions

- **MOT-29 — Control feedback timings.** SHOULD: button press 100–160 ms with the scale from craft.md, checkbox and radio 100–150 ms, toggle thumb 150 ms, tab indicator 200 ms, accordion 200–250 ms via `grid-template-rows`, tooltip fade 100–125 ms after its show delay and instant for adjacent tooltips (see components.md); product transitions stay ≤ 300 ms except drawers, sheets and modals up to 500 ms. Check: each within ± 50 ms; no product value above 300 ms outside overlays and loops.
- **MOT-30 — Success and error feedback.** SHOULD: success = check icon fade or stroke draw over 200 ms; error = color change plus icon, no shake; celebration effects only at flow completion on brand or consumer surfaces, ≤ 1 s. Check: no shake in product forms.

## Libraries

- **MOT-31 — CSS first.** SHOULD: CSS transitions and `@keyframes` for single-element motion; a library only for timelines, springs, layout FLIP or scroll orchestration. Check: motion library imports ≤ 1, justified in the design note.

## Quick check

- MOT-01 · Motion purpose
- MOT-02 · Product entrances
- MOT-33 · Frequency budget
- MOT-04 · Duration by size
- MOT-05 · Easing by intent
- MOT-08 · Measure animation cost
- MOT-09 · Explicit transition list
- MOT-12 · Responsive motion
- MOT-15 · Reduced motion
- MOT-17 · Hover changes color, not geometry
- MOT-18 · Image hover motion
- MOT-19 · Visible by default
- MOT-21 · Entrance coherence
- MOT-23 · Spinner delay
- MOT-32 · Animated text and values
