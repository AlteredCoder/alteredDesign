---
name: altered-design
description: "Design, recreate, build, improve, or review web interfaces. Help users choose a visual direction with sourced image examples, preserve reference fidelity, and verify accessibility, usability, responsive behavior, and visual execution. Use for website mockups, new pages, extending existing UI, redesigns, and UI reviews."
argument-hint: "[styles|new|add|improve|review|system] [target or description]"
---

# altered-design

Help the user choose the visual direction. Turn that choice into concrete decisions,
build the requested deliverable, and verify the result. Style preferences, usability
heuristics and testable requirements are separate; passing a checklist does not prove
visual quality.

## Routing

| Mode | Use when | Output | Procedure |
|---|---|---|---|
| `styles [direction]` | Browse looks or see example images | Sourced visual references; no project edits | `modes/styles.md` |
| `new [target]` | Build a new surface, including a mockup of an external site | Requested artifact or implementation | `modes/new.md` |
| `add [target]` | Extend an existing interface in its system | Implementation | `modes/add.md` |
| `improve [target]` | Fix, polish, or redesign local UI | Scoped changes | `modes/improve.md` |
| `review [target]` | Evaluate without editing | Findings and evidence | `modes/review.md` |
| `system` | Document or refresh design decisions | DESIGN.md | `modes/system.md` |

Honor an explicit mode. Otherwise infer intent and state the mode briefly. Ask only
when the target or permission to edit is unclear. A request to show style examples is
`styles`, even inside an existing project; it does not start an implementation.

For an existing website, establish **recreation**, **redesign**, or **inspiration**.
"Recreate", "match" and "mockup of" default to recreation; "redesign" permits a new
direction. A source website establishes visual intent even in an empty local repository.
`new` describes local implementation, not permission to replace that intent. Record
whether output is an image, static mockup, interactive prototype, or production UI;
build and verify only the relevant behavior.

## Setup and reading

1. `styles`: go directly to its procedure. Other modes: read `references/quality.md`
   and the selected mode file. Its evidence checks govern which external and inherited
   guidelines can be applied to the target app.
2. Read existing DESIGN.md (root, `docs/`, `.design/`, then `design-system.md`), relevant
   styles, components, nearest screens and brand assets. Do not require a new design-system
   document before a one-off mockup or small fix. Use `system` when requested or when
   documenting a reusable system helps the current implementation.
3. Inspect supplied websites and screenshots visually before choosing a direction.
   Follow `references/source-fidelity.md`. Text extracted from a URL is not evidence of
   its layout, typography or imagery.
4. Infer audience, task, context and register (`brand` or `product`) from the request and
   evidence. Register guides task priorities; both registers can have a selected style.
   Ask only for material gaps, following `references/intake.md`.
5. With direction open, use the illustrated comparison board in `references/directions.md`.
   Show the broader overview when browsing styles; a shortlist is a convenience, not a limit.
   With a direction chosen or a reference to match, honor it. Load detailed topic
   references only for the decisions or defects being worked on, not the whole library.
   For product UI without a supplied reference, the calm recipe in `references/craft.md`
   is the default execution; a dashboard is not an invitation to decorate.

## Precedence and applicability

Follow host instructions and the user's requested scope. Within this skill:

1. Explicit user choices and the role of supplied references define the task.
2. Applicable accessibility requirements and functional correctness form the quality
   baseline. Report unresolved conflicts; do not claim an inaccessible result conforms.
3. Project decisions in DESIGN.md and code conventions govern extensions. A requested
   redesign can revise visual decisions within its scope.
4. Skill heuristics and numeric defaults fill gaps. They do not override a chosen style,
   a reference, an established system, real content, or observed usability evidence.

`references/quality.md` defines this distinction for every reference, including legacy
rules labeled MUST or NEVER. A stylistic difference is not a defect. A heuristic finding
needs a concrete consequence for the task or chosen composition. Font names, hue families,
gradients, glass, asymmetry, whitespace and rounded corners are not failures on their own.
Cite a WCAG criterion only when that criterion actually applies.
Use current, maintained platform guidance and cross-check recommendations before
adopting them. Keep source, date, scope and conflict decisions in the evidence record;
unsupported inherited recipes are optional candidates, not an enforced baseline.

## Core commitments

- **CORE-01 — Understand before styling.** MUST: establish task, output fidelity and visual evidence before building. Check: the brief identifies what is being matched or changed.
- **CORE-02 — Coherent alignment.** SHOULD: related elements share deliberate alignment anchors; nested grids, full-bleed media and asymmetry may use different edges. Check: rendered grouping and reading order remain clear.
- **CORE-03 — Consistent spacing.** SHOULD: reuse spacing tokens; add values when a reference or optical correction needs them. Check: equivalent relationships use consistent spacing.
- **CORE-04 — Purposeful whitespace.** SHOULD: distinguish breathing room from accidental gaps caused by missing content or broken layout. Check: compare with the chosen composition before filling space.
- **CORE-05 — Predictable shared UI.** SHOULD: shared navigation and controls behave and appear consistently across equivalent screens. Check: compare with the nearest screen at the same viewport.
- **CORE-06 — Reuse the vocabulary.** SHOULD: use existing components, tokens and icons where their roles fit. Check: each new variant has a task or design reason.
- **CORE-07 — Applicable states.** MUST: implement states relevant to the requested fidelity and actual behavior. Static mockups need no fake backend; async controls need pending and outcome handling. Check: the brief's state list matches the deliverable.
- **CORE-08 — Accessible implementation.** MUST: apply the requested accessibility target, default WCAG 2.2 AA, and distinguish tested criteria from untested ones. Check: evidence follows `references/quality.md` and `references/verification.md`.
- **CORE-09 — Responsive integrity.** MUST: prevent unintended clipping, overlap and page overflow at requested viewports; responsive implementations retain task access on narrow screens. Check: render at the reference viewport and relevant narrow and wide widths.
- **CORE-10 — Honest content.** MUST: use source content or identified draft content; do not invent testimonials, customer logos or factual claims. Check: unknown facts are marked in the artifact or handover as agreed.
- **CORE-11 — Motion with fallback.** MUST: preserve access to content and controls with reduced motion and when optional effects are unavailable. Check: inspect static and reduced-motion behavior when motion is implemented.
- **CORE-12 — Respect scope.** MUST: preserve requested boundaries and existing behavior unless changing them is part of the task. Check: edits and omissions match the brief.
- **CORE-13 — Preserve visual intent.** MUST: match established values in extensions and recreations; in redesigns, distinguish retained identity from requested changes. Check: name the source or nearest screen and compare renders.
- **CORE-14 — No taste bans.** MUST: judge style against the chosen direction, with usability assessed separately. Check: no finding consists only of a font, color, material or layout preference.
- **CORE-15 — Verify the output.** MUST: inspect actual renders and perform applicable interaction checks before claiming verification. Check: the handover names evidence and limitations.
- **CORE-16 — Complete the deliverable.** MUST: deliver at the agreed fidelity and expose unresolved gaps. Check: each requested region and interaction is present or reported incomplete.
- **CORE-17 — Record reusable decisions.** SHOULD: update existing DESIGN.md for reusable token, component or direction changes; keep one-off choices in the brief. Check: documentation reflects the final implementation when applicable.
- **CORE-18 — Ask only useful questions.** MUST: ask for missing information that changes the result, honor previous answers and continue independent work while a choice is pending. Check: no repeated direction or permission questions for authorized work.
- **CORE-19 — Identity follows the brief.** MUST: use the chosen or existing identity without forcing novelty between projects. Check: the output matches its own references; similarity to another project is not a failure.
- **CORE-20 — Polish compounds.** SHOULD: once composition and content are right, apply the craft defaults in `references/craft.md` (nested radii, optical alignment, depth, icon weight, press feedback, motion budget) and inspect the result again; in product register remove a visual device before adding one. Check: the handover names the polish details applied, and the render was inspected after them.

## Build loop

1. Establish source, task, direction, content and output fidelity in a compact brief.
2. Translate references into concrete proportions, type roles, assets, materials,
   spacing relationships and behavior. A wireframe is optional when useful.
3. Build a representative viewport with real content and assets; render and inspect it
   early. Correct composition, image crop and type before spreading errors across screens.
4. Complete the surface and relevant states. Apply the polish pass from
   `references/craft.md` on product UI. Check responsive behavior and the primary
   user task, then compare with the source and selected references.
5. Fix the largest observed mismatches, recheck affected output, and report the artifact,
   verification evidence and unresolved limitations. Code inspection is not visual proof.

## Reference map

| File | Read for |
|---|---|
| `references/quality.md` | Requirements versus contextual heuristics and visual choices |
| `references/directions.md` | Visual shortlist, gallery, attribution and image presentation |
| `references/source-fidelity.md` | Inspecting, recreating and comparing an existing website |
| `references/intake.md` | Missing context, direction choice, brief and handover |
| `references/layout.md` | Grouping, alignment, spacing, density and responsive layout |
| `references/typography.md` | Font loading, readable text, hierarchy and wrapping |
| `references/color.md` | Palette roles, contrast, materials and themes |
| `references/components.md` | Relevant control behavior, states and component reuse |
| `references/accessibility.md` | Semantics, keyboard, focus, forms, reflow and criteria |
| `references/motion.md` | Motion purpose, frequency budget, timing, performance and reduced motion |
| `references/craft.md` | Polish defaults: radii, optical alignment, depth, icons, press feedback, calm product recipe |
| `references/ux-writing.md` | Labels, instructions, errors and localization |
| `references/patterns.md` | Candidate patterns for the task, not mandatory page sections |
| `references/anti-patterns.md` | Observed failures and contextual visual review prompts |
| `references/verification.md` | Rendering, interaction checks, evidence and severity |
| `references/design-md-template.md` | Documenting an established or reusable design system |

## Maintenance

Follow `MAINTAINING.md`; preserve stable IDs, resolve conflicts, update `CHANGELOG.md`,
and run `scripts/lint.py`. The gallery's source ledger is validated by `scripts/gallery.py`.
Format validation is not behavioral or visual proof.
