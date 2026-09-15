# DESIGN.md template

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs the per-project DESIGN.md: its location, its template, how `system` fills it from code (scan) or from an interview (seed), and how every mode keeps it current.
**Load when:** `system` mode; any mode that adds a token, component or pattern; `review` when checking drift.
**Owns:** the DESIGN.md template, scan and seed procedures, the decisions log. Everything else is referenced by topic or ID.
**Defaults:**
- Location: `<project root>/DESIGN.md`; read fallbacks in order: `docs/DESIGN.md`, `.design/DESIGN.md`, `design-system.md`.
- ≤ 300 lines; tokens as tables; ≤ 2 prose lines per item; tokens are normative, prose explains.
- Preserve unrelated decisions during an authorized refresh; decisions log append-only.
- Seed files start with `<!-- SEED: refresh with /altered-design system once code exists -->`.
- Check for every rule in this file: read DESIGN.md back after writing; the nine headers, the token tables and the log row are present and every value traces to code or an answer.

## Location and lifecycle

- **SYS-01 — One file.** MUST: exactly one DESIGN.md per project, at the root; when a fallback location holds one, read it and offer to move it; never create a second.
- **SYS-02 — Preserve existing decisions.** MUST: honor an explicit request to refresh or revise DESIGN.md without asking again; preserve unrelated decisions and the log. Ask only if an unrequested destructive replacement would be necessary.
- **SYS-03 — Length cap.** MUST: ≤ 300 lines; when over, move component snippets into the code and keep only the vocabulary list with file paths. Check: `wc -l DESIGN.md`.
- **SYS-04 — Tokens normative.** MUST: every value in section 3 is a table row with a role name and a value; prose never restates a value with a different number.
- **SYS-05 — Fixed structure.** MUST: keep the nine section headers verbatim and in order; a section with nothing to record holds the line "None yet." Why: modes and greps address sections by name.

## The template

- **SYS-06 — Fill from evidence.** MUST: every token comes from code (scan) or the interview (seed); an unknown value is written `TBD` and listed as an open item in the Decisions log; never invent.
- **SYS-07 — Colors in two notations.** MUST: color rows carry OKLCH and hex; when the code uses one, compute the other; the table caption names the source of truth.
- **SYS-08 — Register line bare.** MUST: the Register line holds `brand`, `product`, or `brand+product` with the primary named first; nothing else.

```markdown
# Design system: <project>
<!-- SEED: refresh with /altered-design system once code exists -->   <- seed files only

## 1 Context
- Product: <one line: what it is>
- Users: <who, in what context>
- Job: <the task the UI serves>
- Register: product              <!-- brand | product | brand+product (primary first) -->
- Personality: <3 words>         <!-- physical-object words, not "modern" -->
- References: <source URLs or gallery example IDs; properties to preserve>
- Anti-references: <1+ named>
- Accessibility: WCAG 2.2 AA     <!-- level + known user needs -->
- Stack: <framework · styling method · component library · icon set>

## 2 Direction
- Direction: <selected name; optional modifiers>
- Visual anchors: <example IDs or sources; type, proportions, materials, assets>
- Color strategy: restrained | committed | full palette | drenched · <hue anchor> · light | dark default
- Type roles: display <family> · body <family> · mono <family | none>
- Motion energy: restrained | responsive | choreographed
- Density: compact | default | comfortable   <!-- vocabulary from layout.md -->

## 3 Tokens                        <!-- normative; source of truth: <path> -->
### Colors
| Role | OKLCH | Hex | Use |
|---|---|---|---|
| bg | | | page background |
| surface | | | cards, panels |
| ink | | | body text |
| muted | | | secondary text |
| border | | | dividers, card edges |
| border-strong | | | input and control outlines |
| accent | | | primary action, selection |
| success · warning · danger · info | | | states |
| focus | | | focus ring |
| scrim | | | modal backdrops, image scrims |
### Type scale
| Step | Size / line-height | Weight | Use |
### Spacing scale
| Token | px |
### Radius · Shadows · Z-index
| Token | Value | Use |
### Breakpoints · Containers
| Name | Width |
### Motion
| Token | Duration / easing | Use |

## 4 Layout
- Grid: <columns · gutter · margin per breakpoint>
- Page templates: <app shell · content page · marketing · auth> with container and section spacing
- Alignment rules: <project-specific, e.g. "sidebar content starts at x=280">

## 5 Components                    <!-- vocabulary; where it lives -->
- Button: <variants · sizes · height> → <path>
- Input: <anatomy · height · error treatment> → <path>
- Card: <when allowed · padding · radius> → <path>
- Icons: <set · sizes>   Table: <density · row height>

## 6 Patterns & states
- Empty / loading / error: <conventions>
- Forms: <label position · save model · validation timing>
- Navigation: <shell · active state · breadcrumbs>

## 7 Voice
- <copy rules specific to this product: tone, terms, casing, formats>

## 8 Do / Don't                    <!-- ≤ 10 each, project-specific, exact values -->
- Do: …
- Don't: …

## 9 Decisions log                 <!-- append-only -->
| Date | Decision | Rationale |
|---|---|---|
| YYYY-MM-DD | Initial DESIGN.md (scan | seed) | … |
```

## Scan mode procedure

- **SYS-09 — Token sources in order.** MUST: search (1) CSS custom properties (`--color-`, `--font-`, `--space-`, `--radius-`, `--shadow-`, `--z-`, `--duration-`, `--ease-`) in global styles; (2) `tailwind.config.*` `theme` and `theme.extend` (v3) and `@theme` blocks in CSS (v4); (3) CSS-in-JS theme files (`theme.ts`, `tokens.ts`, stitches or vanilla-extract configs); (4) `tokens.json`, Style Dictionary, W3C DTCG files; (5) the component library (button, input, card, dialog, nav, table sources); (6) the global stylesheet base rules; (7) computed styles from the running app via `browser_evaluate` (font families, colors, heading sizes, control heights). Record file:line per token.
- **SYS-10 — Extract per class.** MUST: colors grouped by role (bg, surface, ink, muted, border, accent, states) under the project's own names; type: families, sizes with line-heights, weights in use, step ratio; spacing: every distinct value in the codebase mapped to the scale, values used once listed as one-offs and not tokenized; radius, shadows, z-index, breakpoints, containers, durations and easings the same way.
- **SYS-11 — Component vocabulary.** MUST: list each component that exists with its variants and file path (button variants and sizes; input anatomy; card usage; icon set and sizes; table density); never list a component the code lacks.
- **SYS-12 — Page templates.** MUST: derive the templates in use from routes and layouts (app shell with sidebar, centered content page, marketing page, auth) and record grid, container and section spacing per template.
- **SYS-13 — Unresolved system choices.** SHOULD: ask only for missing goals or visual decisions needed by the requested system. Existing evidence and prior user choices take priority; no mandatory metaphor interview.
- **SYS-14 — Write and show.** MUST: write the file, show the sections holding non-obvious choices (role names, north star, Do/Don't), offer one revision round; the written file is the freshest source for the rest of the session.

## Seed mode procedure

- **SYS-15 — Seed from direction.** SHOULD: use the selected visual direction and context to seed a system; show image options through directions.md only if direction is open. Ask only for material gaps.
- **SYS-16 — Seed defaults.** MUST: fill Tokens with the skill defaults (spacing, type scale, radius, shadows, z-index, breakpoints, containers from layout.md and typography.md; durations and easings from motion.md; state colors from color.md) marked "default"; leave palette and font families as `TBD` with strategy and direction recorded; put the SEED marker on line 1.
- **SYS-17 — Seed is honest.** NEVER: invent hex values, font names or components in a seed; the seed records decisions, not a fabricated system.

## Keeping it current

- **SYS-18 — Record reusable changes.** SHOULD: append reusable token, component and direction changes to existing DESIGN.md. One-off mockups can keep decisions in their brief; missing DESIGN.md alone is not a UI defect.
- **SYS-19 — Log deviations.** SHOULD: every deviation from a skill SHOULD or a DESIGN.md rule gets a Decisions log row (date · decision · rationale) in the same change.
- **SYS-20 — Append-only log.** NEVER: edit or delete a Decisions log row; supersede with a new row that names the old decision.
- **SYS-21 — Drift with consequences.** SHOULD: compare documented reusable decisions with the implementation. Report stale or contradictory guidance that affects work; unused tokens and missing documents alone do not set severity. Check: each finding states its actual consequence.
- **SYS-22 — Refresh scope.** SHOULD: a refresh rewrites Tokens, Components and Patterns from a new scan, keeps Context, Direction, Voice and Do/Don't unless the user changes them, and appends a "Refreshed" log row.

## Quick check

- SYS-01 · One file
- SYS-02 · Preserve existing decisions
- SYS-03 · Length cap
- SYS-04 · Tokens normative
- SYS-05 · Fixed structure
- SYS-06 · Fill from evidence
- SYS-09 · Token sources in order
- SYS-11 · Component vocabulary
- SYS-13 · Unresolved system choices
- SYS-16 · Seed defaults
- SYS-18 · Record reusable changes
- SYS-20 · Append-only log
- SYS-21 · Drift with consequences
