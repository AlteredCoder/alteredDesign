# Changelog

Newest first. Every entry lists the rule IDs added, changed or removed.

## 2.2.0 — 2026-09-14

### Resulting behavior

- Add `references/craft.md` (CRAFT-01..22): polish defaults imported from
  [better-ui](https://github.com/jakubkrehel/skills/tree/main/skills/better-ui) by
  Jakub Krehel and [emil-design-eng](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng)
  by Emil Kowalski, both MIT. Covers concentric radii, optical alignment, ring shadows
  for depth with borders for structure, image outlines, icon stroke matched to text
  weight, outline-default and fill-active icons, icon cross-fades with exact values,
  press feedback, entrance scale floor, skipped entrances on first paint, origin-aware
  popovers, instant adjacent tooltips, blur-bridged cross-fades, theme switch without a
  transition smear, momentum dismissal and hold-to-confirm timing, plus clip-path and
  transform recipes.
- Add a calm product recipe (CRAFT-19, CRAFT-20) so a dashboard request without a
  reference defaults to a dense, quiet execution: 13/12 px type with tabular figures,
  hairline alpha separators, one accent, tinted pills, no resting shadows on tables, no
  entrances, and removal of visual devices before addition. Written after inspecting a
  user-supplied dark CRM screenshot; the image has no known creator and is not added to
  the gallery.
- Add a motion frequency budget (MOT-33) and mood matching (MOT-34): actions triggered
  hundreds of times a day get no animation; keyboard-initiated actions in work tools
  never animate; product transitions stay ≤ 300 ms outside overlays.
- SKILL.md gains CORE-20 (polish compounds), a polish step in the build loop, the
  craft reference in the map, and a setup note that product UI without a reference
  defaults to the calm recipe. Modes `new`, `add`, `improve` and `review` load the
  craft reference for the polish pass; `review` reports code-level polish findings in a
  Before / After / Why table (VER-34) after a slow-motion replay (VER-37).
- Not imported: emil-design-eng's fixed initial greeting and course promotion, the
  Sonner library-authoring principles (naming, documentation site), and better-ui's
  Block / Approve verdict, which is replaced by the existing P0–P3 completion rules.

### Rules

Added CORE-20, CRAFT-01..22, MOT-33, MOT-34, VER-37. Changed wording of MOT-03,
MOT-05, MOT-06, MOT-08, MOT-10, MOT-14, MOT-20, MOT-29, LAY-10, LAY-35, LAY-39, LAY-40,
CMP-41, CMP-50, CMP-51, CMP-55, CMP-56, COL-28, VER-30, VER-34, plus the motion, layout,
color, typography and components Defaults. No IDs removed.

### Decisions where sources disagreed (and what won)

- Exit easing: better-ui and emil-design-eng use ease-out for exits; Carbon uses an
  accelerating exit with an exception for elements that park nearby. Resolved by scope:
  ease-out for entrances, feedback and in-place exits; acceleration only when an element
  leaves the viewport permanently; ease-in never for an entrance (MOT-05, MOT-06).
- Press feedback: better-ui 0.96 at 150 ms, emil-design-eng 0.97 at 100–160 ms, the
  previous MOT-29 80–100 ms. Resolved to 100–160 ms and one of 0.96 / 0.97 per project,
  inside Carbon's and Material 3's short-duration tokens (MOT-29, CRAFT-10).
- Stagger: better-ui about 100 ms between semantic chunks; emil-design-eng 30–80 ms per
  item; previous MOT-20 ≤ 50 ms per item. Resolved: items 30–50 ms, chunks 80–100 ms,
  total ≤ 400 ms, never on routine interactions (MOT-20).
- Entrance scale: emil-design-eng never below 0.9; better-ui icon cross-fade from 0.25
  with blur. Scoped by element size (CRAFT-08, CRAFT-12).
- Spring bounce: better-ui always 0 for icons; emil-design-eng 0.1–0.3 when used.
  Resolved: 0 for product feedback and icon swaps; 0.1–0.3 for drag-to-dismiss or a
  playful direction (MOT-05).
- Icon stroke: previous "one stroke width" versus better-ui's stroke matched to text
  weight. Resolved: one strategy per surface, matched stroke permitted (CMP-50, CRAFT-06).
- Density: previous "compact only with a user toggle" blocked the calm dense look that
  work-tool references use. Resolved: compact is valid when the reference or audience
  calls for it; a toggle is recommended when audiences differ (LAY-35).
- Badge text: previous "tint background with ink text" now also permits same-hue text
  at ≥ 4.5:1, which is how calm status pills are usually built (CMP-56).
- Review format: HIGH / MEDIUM / LOW map to P1 / P2 / P3; the Before / After / Why table
  is adopted for code-level polish findings; verdict words are not adopted (VER-30, VER-34).

### Verification

- Repository lint: 528 rules, zero problems; `references/craft.md` registered with the
  `CRAFT` prefix. Size budgets respected: components 20.8 KB of 22, layout 17.2 KB of 20,
  every other reference and SKILL.md under 16 KB, modes under 6 KB.
- Sources read in full on 2026-09-14: both skills' SKILL.md files and better-ui's
  surfaces, animations, enter-exit, icon-transitions, icons and performance references.
  Cross-checks: Carbon motion overview (duration tokens, entrance and exit easing with
  its side-panel exception) and Material 3 motion tokens (duration values). Material 3
  easing values were not retrieved and are not cited.
- This release changes instructions only. No generated UI was rebuilt; whether the
  calm recipe produces the intended result on a real dashboard request remains to be
  checked on the next build.

## 2.1.0 — 2026-09-09

### Resulting behavior

- Integrate the approved comparison-board format into the skill: thumbnail
  overview, two examples per direction, image enlargement, credits, application ideas
  and tradeoffs. Both general and app galleries use the shared renderer.
- Add an app reference pack with nine alternatives to minimalism and eighteen
  inspected images. Keep native apps, historic images, UI kits and concepts labeled.
- Add `scripts/board.py` with custom catalog, project context, retained constraints,
  per-direction translations and English/French interface copy. Output works offline
  with relative references to catalog images. No project-specific tab requirement is
  imposed on other apps.
- Extend `gallery.py` with `--catalog`; default build output follows the selected
  catalog. A focused shortlist is a convenience, not a capability limit. A selected
  direction resumes an already requested build without another approval question.

### Rules

Changed DIR-01 presentation; clarified SKILL.md setup, mode/styles, direction discovery,
README and maintenance procedures. No rule IDs added or removed. CORE rule wording is
unchanged; SKILL.md setup now points to the broader board.

### Verification

- Repository lint: 502 rules, zero problems. Both catalogs pass integrity validation:
  nine directions and eighteen image files each.
- Shared renderer exercised with app, general and custom-context catalogs. Chromium
  checks cover decoded images, overview/detail navigation, filtering and reset,
  enlargement, literal HTML escaping, no script errors and reflow at 768/375/320 px.
  Selected A/AA axe checks report zero violations. Generated renders were inspected.
- CLI verified from another working directory, direction subset, custom context,
  JSON selection and default output placement beside a custom catalog.
- Skill Creator validator accepts a temporary copy excluding the pre-existing
  Claude-specific `argument-hint`. The shipped field is retained; strict Codex
  frontmatter validation still rejects it. This is an existing cross-host limitation.
- Applied the updated workflow to the user's selected visual/canvas prototype.
  Twenty interaction scenarios passed, including workspace tabs, triage/Undo, group
  movement, search, responsive layouts and reduced motion. This is task-specific
  evidence, not a claim of universal design quality or full accessibility conformance.

## 2.0.0 — 2026-09-09

### Resulting behavior

- Add `styles`: nine overlapping visual directions, two inspected sourced images each,
  with a credited offline gallery and a portable Python selector/validator. Styles-only
  requests do not edit the target project. Open choices show a relevant image shortlist;
  selected directions and supplied references are honored.
- Separate testable requirements, contextual heuristics and aesthetic choices. Remove
  blanket taste bans and arbitrary composition requirements that overrode real content
  or the chosen direction. Existing numeric recipes are optional project conventions.
- Cross-check internet guidance against current standards or independent maintained
  design systems. Record applicability, source links, check date and conflict decisions.
  Correct disabled-action, target-size and notification advice after source comparison.
  Unverified inherited rules require validation before enforcement; this release does
  not claim that every historical rule has been independently sourced or user-tested.
- Establish recreation, redesign or inspiration before changing an existing website.
  Inspect actual visuals and compare output at the reference viewport. Verify according
  to requested fidelity: image, static mockup, prototype or implemented application.
- Replace mandatory full-library reading with relevant references, and remove repeated
  permission/brief interviews for already authorized work. DESIGN.md is optional for
  one-off mockups and small fixes. Reviews remain read-only.
- Update all mode procedures, README, maintenance instructions and plugin metadata.

### Rules

Added QLT-01..11, DIR-01..08 and SRC-01..08. All previous IDs are retained; wording and
applicability changed in the following rules:

- `SKILL.md`: CORE-01..19.
- `accessibility.md`: A11Y-01..03, A11Y-08..09, A11Y-20, A11Y-24, A11Y-30, A11Y-32, A11Y-34, A11Y-37.
- `anti-patterns.md`: ANTI-01..10, ANTI-12, ANTI-19..20, ANTI-22, ANTI-24..41, ANTI-43..52.
- `color.md`: COL-01..09, COL-18..22, COL-24..27, COL-29..31.
- `components.md`: CMP-01..10, CMP-12, CMP-16, CMP-20, CMP-26, CMP-29, CMP-37, CMP-42, CMP-45.
- `design-md-template.md`: SYS-02, SYS-13, SYS-15, SYS-18, SYS-21.
- `intake.md`: INT-01..02, INT-05, INT-08, INT-10, INT-12, INT-14, INT-16..20, INT-22..25, INT-27, INT-29.
- `layout.md`: LAY-02, LAY-05..09, LAY-12..18, LAY-20..27, LAY-31, LAY-34, LAY-38.
- `motion.md`: MOT-01..02, MOT-05, MOT-08, MOT-12, MOT-18..19, MOT-21..22, MOT-26..27, MOT-32.
- `patterns.md`: PAT-02..06, PAT-13, PAT-15.
- `typography.md`: TYP-01..05, TYP-09..11, TYP-13..16, TYP-18..22.
- `verification.md`: VER-01..36.

Topic applicability notes, defaults and quick checks were aligned with the new
precedence. Historical decisions below describe 1.0.0 and do not override this release.

### Verification

- Mechanical lint: 502 defined rules; zero reported problems.
- Catalog integrity: nine directions, eighteen local files with source metadata and
  matching hashes. All eighteen originals were visually inspected before inclusion.
- Gallery helper: alias selection, multi-direction comparison, Markdown images and
  credits, JSON output, invalid input, tampered hash, path escape, unsupported URL,
  subset HTML rendering and metadata escaping checked successfully.
- Local Chromium gallery checks at 375, 768 and 1440 CSS px: all images decode, no
  horizontal page overflow, filtering and keyboard focus work, hash selection restores,
  and no page errors. Gallery screenshots were visually inspected.
- Mode procedures reviewed for style-only browsing, source recreation, honoring a
  selected direction, scoped improvements and reviews without edits. This is a workflow
  inspection, not an end-to-end evaluation of a new generated website.
- The Codex skill validator accepts a temporary copy with the Claude-specific
  `argument-hint` omitted. The shipped Claude skill retains that existing field, which
  the strict Codex validator does not accept. No full cross-host execution claim.

## 1.0.0 — 2026-09-07

Initial release: 475 rules across 13 files, two independent review passes, lint clean.

### Structure

- Modes: `new`, `add`, `improve`, `review`, `system`.
- `SKILL.md`: routing, setup, precedence, CORE-01 to CORE-19, build workflow, reference map.
- References: `intake` (INT-01..29), `layout` (LAY-01..52), `typography` (TYP-01..28),
  `color` (COL-01..34), `components` (CMP-01..56), `accessibility` (A11Y-01..39),
  `motion` (MOT-01..32), `ux-writing` (COPY-01..31), `patterns` (PAT-01..45),
  `anti-patterns` (ANTI-01..52), `verification` (VER-01..36),
  `design-md-template` (SYS-01..22).
- `scripts/lint.py`: mechanical consistency check (IDs, severities, Checks,
  cross-references, sizes, vocabulary).

### Sources merged

Anthropic `frontend-design`, the craft guidance of Claude Code's built-in `/design`,
impeccable (sub-command references), gstack design consultation and review, Vercel Web
Interface Guidelines, ui-ux-pro-max quick reference, redesign-existing-projects,
landing-page-design, plus WCAG 2.2 and current CSS practice.

### Decisions where sources disagreed (and what won)

- Italic: AVOID in product, one deliberate device in brand (ANTI-31, TYP-20).
- Fonts: no mandatory list; reflex-reject list applies to greenfield brand work only,
  product may use system or Inter-class stacks, existing brand fonts are never
  second-guessed (ANTI-43, TYP-01).
- Gradient text: NEVER (ANTI-05); background gradients AVOID with a two-stop same-hue
  allowance (COL-29).
- Glass, grain, stripes: NEVER decorative blur (ANTI-06), AVOID grain and stripes (ANTI-40).
- Scroll reveals: AVOID uniform fade-up (ANTI-34), `transition: all` banned (ANTI-22),
  content visible without JS (MOT-19), reduced motion opt-in (MOT-15).
- Spacing: 4pt scale 4 to 128 (layout Defaults); section spacing uniform, rhythm from the
  within-group ≤ 1/2 between-group ratio (LAY-16, LAY-17); equal card heights per row
  (LAY-27), masonry never a default.
- Breakpoints: Tailwind's 640/768/1024/1280/1536 so utilities and DESIGN.md agree.
- Contrast: WCAG 2.2 numbers (4.5:1, 3:1 at ≥ 24px or ≥ 18.66px bold, 3:1 UI parts),
  target size 24 minimum, 44 on touch, 8px between targets (COL-14, COL-15, A11Y-20).
- Letter case: sentence case everywhere (COPY-22, TYP-19).
- Validation: on blur when the field holds a value, re-validate on input after the first
  error, summary on submit (CMP-16); submit stays enabled (CMP-20).
- Modals: last resort with three allowed cases (CMP-36, PAT-44); native `<dialog>` (CMP-37).
- Toasts: ≤ 5 s, 8 to 10 s when carrying Undo, never the only copy of an error (CMP-42).
- Severities: P0 to P3 with concrete definitions (VER-30); report lines as
  `file:line · severity · rule · finding · fix` (VER-34).
- DESIGN.md: nine fixed sections, tokens in OKLCH and hex, append-only decisions log;
  strategic context folded into section 1 instead of a separate PRODUCT.md (SYS-05..08).
- Interview: ≤ 4 questions per batch, hypotheses before open questions, brand direction
  choice is the one permitted second batch (INT-01, INT-12, INT-17).
- Widths: 375, 768, 1440 mandatory; 320 and 1920 on brand surfaces or request (VER Defaults).

### Review pass A (SKILL.md, modes, layout, typography, color, intake, patterns, anti-patterns, verification, design-md-template)

- Wrong or outdated fixed: `repeat(auto-fit)` removed as an orphan fix (LAY-23, VER-19);
  `min-height: 100dvh` replaced by `height: 100dvh` for scrolling shells and `100svh` for
  documents (LAY-26, LAY-30); `\d`/`\s` greps rewritten for `grep -E` (LAY-20, LAY-21,
  LAY-26, LAY-40, LAY-42, TYP-09, TYP-18, COL-11, COL-30); font preload needs
  `crossorigin` (TYP-06); accent lightness range corrected for white ink (color Defaults);
  `--color-border-strong` added for 3:1 control outlines (COL-15, SYS template);
  `browser_wait_for` and `browser_evaluate` usage corrected (VER-06, VER-11); focus walk
  reduced to one logger (VER-12).
- Bad practice fixed: `flex-wrap` on ≥ 3 equal blocks now AVOID, grid for anything that
  wraps (LAY-03); gap ≥ padding relaxed to SHOULD with a 16px floor (LAY-15); 12px floor
  without a legal-text exemption (TYP-10).
- Contradictions resolved: seed interview size (modes/system.md vs SYS-15, INT-16);
  targeted scope touches the element only (modes/improve.md vs CORE-12); check widths
  aligned to 1440/375 (LAY-06, LAY-12, LAY-25, LAY-33, LAY-45); label-to-input gap 4 to 8
  (LAY-16 vs CMP-14); type ratio, weight pairs, tracking floor and link underline rules
  aligned with the type table (TYP-12, TYP-16, TYP-18, TYP-25); dark body backgrounds
  added to COL-04; near-black tell scoped to untinted hex (ANTI-28); improve scopes
  aligned (INT-14); PAT-07 keeps every section on the page grid.
- Detail added: grid tiers per breakpoint (LAY-02), blank-rectangle causes (LAY-22),
  measurable hierarchy criteria instead of "blur the screenshot" (LAY-34, VER-23), item
  count × column count per width in the plan (SKILL.md workflow, modes/new.md, INT-24).
- Ownership: restated table strategies and hover rules replaced by pointers (LAY-47,
  LAY-51, PAT-17, PAT-18, PAT-21, TYP-27, COL-16).

### Review pass B (components, accessibility, motion, ux-writing)

- Added: CMP-56 (status badges), A11Y-39 (forced-colors boundaries), MOT-32 (count-up,
  typewriter and word-carousel effects), COPY-31 (field label grammar).
- Severity changes: A11Y-07 positive `tabindex` AVOID → NEVER; A11Y-22 pointer
  cancellation and A11Y-34 consistent help SHOULD → MUST (level A criteria inside the AA
  floor); COPY-25 NEVER → MUST pointing to ANTI-42; MOT-18 NEVER → AVOID to match ANTI-36.
- Wrong or outdated fixed: `aria-current="page"` stays on a link (CMP-25); body scroll
  lock via `:root:has(dialog:modal)` (CMP-37); `100vw` includes the scrollbar (CMP-39);
  tooltips need WCAG 1.4.13 behavior and never sit on disabled elements (CMP-41);
  `aria-activedescendant`, Home/End for composites (A11Y-12); CAPTCHA rule matches 3.3.8
  (A11Y-30); `filter`/`clip-path` are paint, `box-shadow` animation banned, `0fr` trick
  needs `overflow: hidden; min-height: 0` (MOT-08); `overlay` added to `allow-discrete`
  and dialog timings aligned to the table (MOT-27); `Intl.RelativeTimeFormat` for relative
  dates (COPY-18); RTL mirroring scoped to directional icons (COPY-29).
- Bad practice fixed: blur validation only on fields holding a value (CMP-16); toast
  lifetime with Undo (CMP-42); `:hover` inside `@media (hover: hover)` (CMP-54, MOT-17);
  reduced motion opt-in (MOT-15); library names removed from MOT-31.
- Detail and Checks: control heights measured with `offsetHeight` on two screens (CMP-01,
  CMP-10); every state forced and compared with the brief (CMP-05); hover-only actions
  grepped and tested in a touch emulator (CMP-32, CMP-52); `srcset`/`sizes` (CMP-51);
  criteria numbers on A11Y-08..11, A11Y-23..26.
- Ownership: responsive tables point to LAY-47 (CMP-35); typographic characters,
  truncation mechanics and text-in-images point to typography.md and accessibility.md
  (COPY-19, COPY-20, COPY-21, COPY-28).

### Integrator alignments

- CORE-19 added: skill defaults are structural, identity is per project.
- Density vocabulary unified to compact / default / comfortable with one table (LAY-35,
  components Defaults, SYS template).
- Sidebar becomes a drawer below `lg` everywhere (CMP-24, LAY-44, LAY-49).
- `--color-focus` and `--color-scrim` tokens defined (color Defaults, COL-31, ANTI-14,
  SYS template).
- Placeholder ellipsis is a SHOULD convention owned by ux-writing (COPY-09, ANTI-13).
- Zoom ban covers `maximum-scale` below 5 (ANTI-16, A11Y-23).
- KPI counts must divide by the column count at every breakpoint (PAT-13).
- Brief confirmation ends the turn only for an open brand direction, ≥ 2 surfaces or a
  structural assumption (INT-22).
