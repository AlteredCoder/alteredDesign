# Quality independent of style

**Load when:** any build, improvement or review, before detailed topic references.
**Owns:** applicability, objective requirements, contextual heuristics and evidence.
**Defaults:** WCAG 2.2 AA for implemented web UI; checks proportionate to requested fidelity.

## Apply the right kind of rule

- **QLT-01 — Separate three categories.** MUST: distinguish testable requirements, contextual heuristics and visual choices before applying a topic rule. MUST and NEVER wording in a legacy reference does not turn a preference into an accessibility standard. Check: every failure states an observable consequence or a violated explicit design requirement.
- **QLT-02 — Testable baseline.** MUST: check implemented controls for names, semantics, keyboard operation, visible and unobscured focus, readable contrast, errors and recovery; check layout for unintended overlap and clipping, and the primary task for completion. Check: record the action, expected outcome and observed result for tested behavior.
- **QLT-03 — Contextual heuristics.** SHOULD: assess grouping, hierarchy, density, navigation, action priority and spacing against audience, content and task. Numeric recipes for type, columns, padding, radii, CTA counts and screen positions are starting points unless the project adopts them. Check: a proposed change explains what becomes easier to understand or do.
- **QLT-04 — Visual freedom.** MUST: permit selected fonts, palettes, gradients, glass, textures, asymmetry and intentional whitespace while applying the same quality baseline. Check: a style option does not fail solely for using its defining visual features.
- **QLT-05 — Scope by deliverable.** MUST: for a static mockup, inspect composition, content and requested viewports; for a prototype, also exercise represented interactions; for production UI, verify real behavior and relevant edge states. Check: do not fabricate asynchronous states or imply that an image proves keyboard accessibility.

## Evidence and limits

- **QLT-06 — Use authoritative criteria.** MUST: use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for conformance claims, including its conditions and exceptions; use [usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) to guide task review. Automated scans and spot-checks do not certify full compliance or prove usability for real users. Check: reports distinguish measurements, heuristic judgments and untested requirements.
- **QLT-07 — Exercise realistic content.** MUST: where implemented, check long text, no results, loading, failure, repeated actions and validation without losing user work. Choose cases relevant to the task. Check: record scenarios exercised and those needing fixtures or user testing.
- **QLT-08 — Judge rendered execution.** MUST: inspect composition, type metrics, image quality and crop, material legibility and component details against selected references; fix observed mismatches in that order. Check: keep a short evidence-based list of mismatches fixed and unresolved.

## Admit guidance only after cross-checking

- **QLT-09 — Corroborate recommendations.** MUST: before adopting internet advice as a general UX rule, read the original source and compare it with an independent maintained design system or applicable standard. Two articles repeating one source are one source. A normative requirement derives authority from its specification, not a vote among blogs. Check: record sources, agreement or conflict, scope, and the resulting decision.
- **QLT-10 — Verify current applicability.** MUST: use the current standard or maintained guidance for the target app platform, interaction model and supported browsers; inspect version, update date and deprecation status where published. An older principle can remain current; a recent trend article is not evidence of usability. Check: record the verification date separately from the publication date, and recheck changed, deprecated or uncertain guidance before using it.
- **QLT-11 — Keep unsupported recipes optional.** MUST: treat inherited rules without verified support as candidate project conventions, even when their wording says MUST or NEVER. Validate them on demand before using them to prescribe a new design or report a defect; omit unsupported claims. Do not silently combine conflicting platform conventions or units. Check: each enforced rule traces to an applicable standard, an explicit project requirement, or documented corroboration plus task evidence.

## Checked decisions for app UI

Checked 2026-09-09 and 2026-09-14. This is a focused evidence record, not a claim that every inherited
topic rule has been independently validated. Recheck sources when their status or the
target platform changes. These decisions summarize the comparison; recommendations
remain scoped to the described context.

| Topic and affected rules | Sources compared | Decision and scope |
|---|---|---|
| Target size: A11Y-20, CMP-10 | [WCAG 2.2 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Android accessibility](https://developer.android.com/design/ui/mobile/guides/foundations/accessibility) | Web AA uses 24 × 24 CSS px with enumerated exceptions; Android specifies 48 dp. Keep the units and platform scopes separate. Larger touch targets are a usability recommendation for web apps, not a replacement definition of WCAG AA. |
| Disabled actions: CMP-07, CMP-20 | [GOV.UK buttons](https://design-system.service.gov.uk/components/button/), [USWDS buttons](https://designsystem.digital.gov/components/button/), [HTML disabled behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled) | Systems permit disabled states but caution against confusing users. Prefer actionable validation for incomplete forms; explain unavailable actions and prevent duplicate requests. Native disabled controls leave sequential keyboard focus; this does not mean they vanish from every screen reader's reading mode. Reject an absolute ban on disabled buttons. |
| Notification lifetime: CMP-42, MOT-28 | [Carbon notifications](https://carbondesignsystem.com/components/notification/usage/), [WCAG timing adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html) | Carbon distinguishes timed feedback from persistent actionable notifications. Evaluate WCAG timing conditions and exceptions. Preserve access to needed information and recovery actions; reject universal five-second or ten-second deadlines. |
| Glass surfaces: COL-30, ANTI-06 | [Apple's material explanation](https://developer.apple.com/videos/play/wwdc2025/219/), [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Apple describes adaptive native materials and a separate controls layer. A CSS blur does not inherit those behaviors. For a web adaptation, verify composited contrast over changing content, control distinction and fallback states. These web checks are our implementation inference, not an Apple certification. |
| Press feedback and durations: MOT-29, MOT-04, CRAFT-10 | [better-ui](https://github.com/jakubkrehel/skills/tree/main/skills/better-ui) (scale 0.96, 150 ms), [emil-design-eng](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng) (scale 0.97, 100–160 ms, UI ≤ 300 ms), [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/) (tokens 70 / 110 / 150 / 240 / 400 ms; micro-interactions 90–120 ms), [Material 3 motion tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-motion.scss) (short 50–200 ms, medium 250–400 ms) | Press 100–160 ms at scale 0.96 or 0.97, one value per project. The two practitioner skills disagree on the exact number; both sit inside the token ranges of two maintained systems. Product transitions ≤ 300 ms, overlays ≤ 500 ms. |
| Exit easing: MOT-05, MOT-06 | emil-design-eng and better-ui (ease-out for exits; never ease-in), Carbon (accelerating exit curve, with an exception for elements that park nearby) | All sources agree on ease-out for entrances and feedback. In-place exits (fade plus small translate) use ease-out; an element leaving the viewport permanently may accelerate. Ease-in is never used for an entrance or for feedback. |
| Stagger: MOT-20 | better-ui (about 100 ms between semantic chunks), emil-design-eng (30–80 ms between items), Carbon and Material (no stagger token) | Items 30–50 ms, chunks 80–100 ms, total ≤ 400 ms, never on routine interactions and never blocking input. No maintained system corroborates staggering frequent actions. |
| Entrance scale: CRAFT-08, CRAFT-12 | emil-design-eng (never `scale(0)`; start at 0.9 or above), better-ui (icon cross-fade from 0.25 with 4 px blur) | Scoped by element: containers and overlays start ≥ 0.9; a 16–24 px icon swap uses 0.25 with blur because the glyph reads as one object at that size. Not a contradiction once scoped. |
| Icon stroke: CMP-50, CRAFT-06 | better-ui (stroke matched to adjacent text weight, one optical strategy per surface), the previous CMP-50 wording (one stroke width) | One library and one strategy per surface; the strategy may be a matched stroke where the set ships variants. |
| Polish review format: VER-30, VER-34 | better-ui and emil-design-eng (Before / After / Why table; HIGH / MEDIUM / LOW; Block or Approve) | Keep P0–P3 and the impact definitions; use the table for code-level polish findings; map HIGH / MEDIUM / LOW to P1 / P2 / P3. |
| Browser capability: MOT-26, MOT-27 | [MDN Baseline](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility), the feature's linked browser compatibility data and the project's supported browser versions | Baseline is a support summary, not proof of accessibility, performance or support in every webview. Check each used feature on the target matrix; use a working fallback where needed. No blanket claim that a recently introduced feature is safe everywhere. |

For additional topics, repeat this process before elevating a recommendation into a
rule. Trend roundups, inspiration galleries and model-generated lists can suggest an
investigation; they do not establish behavioral requirements. Keep an unverified
recommendation out of the enforced baseline while evidence is missing.

## Quick check

- QLT-01 · requirement, heuristic or style choice identified
- QLT-04 · chosen direction remains permitted
- QLT-05 · verification matches the deliverable
- QLT-06 · no unsupported compliance or usability claim
- QLT-08 · actual output compared visually
- QLT-09 · source comparison and conflict decision recorded
- QLT-10 · current version and target context checked
- QLT-11 · unsupported inherited recipes not enforced
