# Verification

Read `quality.md` first. Verification follows the deliverable and selected references.
**Load when:** inspecting work before delivery; core procedure for review.
**Owns:** capture procedure, evidence, findings and completion claims.
**Defaults:** reference viewport first; responsive UI also at 375, 768 and 1440 unless
scope suggests different widths. Use any available browser automation and image viewer;
names such as Playwright browser tools are examples, not required dependencies.

## When to verify

- **VER-01 — Verify applicable output.** MUST: inspect each touched surface at the agreed fidelity before reporting verification. A browser fallback can support code claims only. Check: evidence and limitations appear in the handover.
- **VER-02 — Review scope.** MUST: review the requested scope and relevant states; do not mutate the project during review. Check: evidence is stored in scratch space.
- **VER-03 — Recheck affected work.** MUST: after fixes, recheck affected surfaces and states; broaden checks when shared changes create regression risk. Check: final evidence corresponds to final output.
- **VER-04 — Inspect each capture.** MUST: visually open captured screenshots using the host's image viewer and record observations. Check: capture alone is not described as visual inspection.

## Browser procedure

- **VER-05 — Run the surface.** MUST: use an existing server or the documented local dev command; serve static HTML when needed. Record any server started and its stop procedure; do not stop a server that predates the session. Check: the expected route loads.
- **VER-06 — Settle assets and state.** MUST: wait for the intended content, fonts and images to load before capturing a default state. Check: no loading placeholder or fallback font is mistaken for the final render.
- **VER-07 — Viewport selection.** MUST: match a supplied reference viewport first. For responsive UI, also inspect narrow, intermediate and wide layouts; default widths are 375, 768 and 1440, adjusted to the task. A fixed-size image uses its requested canvas. Check: record actual dimensions.
- **VER-08 — Shipped themes.** MUST: verify each theme actually in scope. Check: theme-specific contrast, controls and assets remain readable.
- **VER-09 — Semantic checks.** MUST: for implemented UI, inspect document structure, accessible names, landmarks and control roles. Check: record actual issues and applicable accessibility criteria, not a presumed universal heading-count rule.
- **VER-10 — Runtime failures.** MUST: inspect console and failed requests relevant to the surface; classify by actual effect on the task. Check: identify owned failures and distinguish unrelated external noise.
- **VER-11 — Unintended overflow.** MUST: check page scroll width, clipped visible text and overlapping controls at tested widths; inspect candidates visually. Hidden menus, offscreen accessible text, intentional media crops and internal scrollers are not automatic failures. Check: no unintended loss of visible content or task access.


- **VER-12 — Keyboard task walk.** MUST: for interactive output, navigate the scoped task with Tab, Shift+Tab, Enter, Space and component-specific keys; check visible focus, activation, dismissal and focus return. A fixed number of Tab presses is not proof of coverage. Check: record the controls exercised and any unreachable action or trap.
- **VER-13 — Contrast evidence.** MUST: measure representative text and required control boundaries over actual composited backgrounds, including relevant states and themes. Check: use applicable WCAG thresholds and exceptions; note that samples do not establish full conformance.
- **VER-14 — Reduced motion.** MUST: when motion is implemented, inspect the reduced-motion alternative and continued access to content and feedback. Check: state whether behavior was emulated or only source-inspected.
- **VER-37 — Slow-motion polish pass.** SHOULD: replay implemented motion at about 10 % speed in the browser's animation panel, or with temporarily multiplied durations, and look for two overlapping states, a wrong transform origin, an abrupt start and properties out of sync; without a browser, read durations, curves and origins from the code and mark them as not replayed. Check: record which interactions were replayed; write "Not verified" for motion that was not.
- **VER-15 — Relevant states.** MUST: exercise states in the brief that the implementation represents, using fixtures where needed. Do not demand loading or keyboard tests of a static image. Check: record exercised, untested and inapplicable states separately.
- **VER-16 — Evidence storage.** MUST: use session scratch space or an existing project evidence location; review never edits .gitignore. Check: record paths and avoid committing captures unless requested.

## What to look for in a screenshot

- **VER-17 — Alignment intent.** SHOULD: compare related alignment anchors with the reference and system. Multiple section widths and deliberate asymmetry are permitted. Check: fix accidental displacement that disrupts grouping or fidelity.
- **VER-18 — Spacing consistency.** SHOULD: compare gaps between equivalent relationships, allowing different density and hierarchy. Check: fix inconsistent spacing with an observed consequence.
- **VER-19 — Real item counts.** MUST: retain real content when grids end with partial rows; test changing item counts when dynamic. Check: no invented or removed items just to fill rows.
- **VER-20 — Whitespace and rhythm.** SHOULD: compare whitespace with the selected composition; distinguish deliberate pauses from missing assets or broken sizing. Check: fix unexplained gaps without filling intentional negative space.
- **VER-21 — Equivalent components.** SHOULD: compare padding, control geometry and icon placement for equivalent roles. Check: investigate unexplained differences rather than forcing all variants to one size.
- **VER-22 — Text integrity.** MUST: inspect long labels, headings, data and narrow layouts for unintended clipping. A one-word last line is a typographic judgment, not an automatic failure. Check: content remains readable and complete or has an accessible full-text route.
- **VER-23 — Focal hierarchy.** SHOULD: assess whether the intended subject and task are clear; imagery or data may dominate instead of the title. Check: compare visual emphasis against source or selected examples.
- **VER-24 — Composition fidelity.** SHOULD: compare regional proportions, type metrics, image quality, crop and materials with the intended reference. Check: identify concrete discrepancies rather than banning mixed alignment.
- **VER-25 — Shared UI consistency.** SHOULD: compare common components with their established counterparts at equivalent widths and states. Check: new variants have an intentional role.
- **VER-26 — Narrow-screen access.** MUST: for responsive UI, retain essential tasks on narrow screens, allow internal scrolling for wide tables or explicit carousels and keep focused controls unobscured. Check: exercise navigation, forms and overlays where present.

## Fallback without a browser

- **VER-27 — Honest fallback.** MUST: when no usable browser is available, state "Screenshots not taken: <reason>" and run applicable source checks. Do not claim visual verification.
- **VER-28 — Source checks.** MUST: inspect relevant semantics, state handling, assets and responsive rules; run relevant existing build, type and interaction checks. Search hits need contextual review. Check: report what was inspected and executed.
- **VER-29 — Static reasoning limits.** SHOULD: reason through layout at relevant widths when rendering is unavailable, marking results as predictions. Check: no predicted appearance is described as observed.

## Severities

- **VER-30 — Impact-based severity.** MUST: P0 blocks the core task or access; P1 materially breaks usability, accessibility or an explicit visual requirement; P2 impairs clarity or visual execution; P3 is minor polish. Style preference alone receives no severity. HIGH, MEDIUM and LOW from imported polish references map to P1, P2 and P3. Check: state the actual consequence for each finding.
- **VER-31 — Completion evidence.** MUST: resolve observed P0/P1 issues within scope before claiming the surface complete; explicitly identify blockers that remain. Include major visual mismatches, not only functional failures. Check: no unresolved major mismatch is hidden behind passing code checks.
- **VER-32 — Explain uncertain severity.** SHOULD: when impact is uncertain, record the assumption or missing task evidence instead of using the presence of an effect as a severity proxy.

## Report format

- **VER-33 — Report context.** MUST: report scope, fidelity, reference role, dimensions, themes and checks actually run. Check: readers can distinguish visual, code and interaction evidence.
- **VER-34 — Actionable findings.** MUST: findings identify location, impact, evidence and a proposed fix; cite the owning rule or criterion where useful. Use selector and viewport when source lines are unavailable. Code-level polish findings use a `Severity | Location | Before | After | Why` table grouped by root cause, one row per cause listing each location. Check: no fabricated file locations.
- **VER-35 — Useful report.** SHOULD: state what works and prioritize fixes by root cause and impact, keeping the report proportional to the task.
- **VER-36 — Avoid noise.** SHOULD: merge repeated findings and omit unsupported preferences. Check: every reported issue contributes to a decision or fix.

## Definition of done

- Requested output is delivered at its agreed fidelity.
- Actual rendering has been inspected, or visual verification is explicitly unavailable.
- Selected references have been compared at equivalent dimensions and states.
- Applicable task, accessibility, state and responsive checks are reported with evidence.
- Observed major failures or fidelity mismatches are fixed or reported as incomplete.
- Reusable project documentation is updated when relevant.

## Quick check

- VER-04 · captures visually inspected
- VER-07 · reference viewport and relevant widths
- VER-11 · no unintended content loss
- VER-12 · keyboard task exercised when implemented
- VER-13 · measured contrast distinguished from full conformance
- VER-15 · applicable states checked
- VER-37 · motion replayed slowly or marked not verified
- VER-24 · rendered result compared with references
- VER-27 · fallback declared honestly
- VER-31 · major unresolved issues disclosed
- VER-34 · findings carry evidence and a fix
