# Mode: improve

Diagnose and fix an existing surface within the requested scope. Read
`references/intake.md` and `references/verification.md`; load topic references only for
observed issues. DESIGN.md is optional. For a source website or screenshot, also read
`references/source-fidelity.md`.

## Scope

- Targeted: fix the named element or symptom; include a parent adjustment only when
  necessary to fix that symptom, and explain it.
- Surface: improve the named page while preserving its established identity and behavior.
- Full: a requested redesign permits new visual decisions within the named scope.

Infer scope from the request. For a full redesign with direction open, follow
`references/directions.md` and show image examples before selection. An already chosen
style does not need another question.

## Diagnose and implement

Capture the current render. Identify concrete problems with task completion, accessibility,
layout integrity, hierarchy, assets or execution of the chosen direction. Group findings
by cause; do not classify familiar fonts, decorative materials or intentional whitespace
as defects. When the complaint is that a screen reads as loud, busy or unfinished rather
than broken, diagnose with `references/craft.md` (CRAFT-19, CRAFT-20) and MOT-33 before
adding anything. Explain the main changes briefly and proceed within the authorized scope.

Fix blockers first, then the largest composition or reference mismatches, then smaller
details. Use existing components where suitable. Preserve behavior unless its correction
is requested or necessary to resolve the reported issue; expose changes beyond the scope
as follow-ups. Remove patch stacks introduced by the fix rather than adding competing CSS.

## Verify and deliver

Compare before and after at equivalent viewports. Exercise relevant interactions and
states and run appropriate project checks. Recheck affected output after fixes. Update
existing reusable design documentation when needed; report changed files, observed
improvements, evidence and unresolved findings.
