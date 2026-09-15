# xdex dashboard mockup

- Task: redesign the dashboard from scratch for a personal bookmark index.
- Source role: product requirements, not visual recreation. Inspected ../xdex/README.md,
  internal/web/assets/index.html and internal/store/store.go; rendered the original UI
  with sample API responses at 1440 px. Source font fell back to the system sans.
- Direction: quiet minimalist, explicitly chosen by the user. The proposed gallery
  examples were rejected and are not visual references for this implementation.
- Composition: compact persistent navigation, a light canvas, clear type hierarchy,
  a short overview, actionable triage list and a smaller supporting column. Recent
  saves remain reachable below the triage list. No marketing imagery or hero artwork.
- Visual decisions: system sans; near-black text; neutral gray secondary text; subtle
  borders; restrained green for positive status and the primary action; comfortable
  spacing around sections with compact metadata inside resource rows.
- Content: French; illustrative bookmarks and costs, clearly labeled as demo data.
  Preserve xdex semantics: pending, kept and archived. No invented unread state.
- Deliverable: responsive HTML/CSS/JavaScript interactive mockup in this directory.
  Browser-only state; no connection to xdex's database, OAuth or paid APIs.
- Interactions: search, source/topic filters, triage and Undo, resource details,
  library/archive navigation, source status, simulated sync and demo reset.
- Checks: real renders at 375, 768 and 1440 px; overflow; keyboard operation and dialog
  focus; search/empty states; triage counters; Undo; reduced motion; sampled contrast.
- Guideline basis: altered-design quality.md, its current evidence decisions and
  verification.md. Numeric layout/type values here are chosen project conventions.
  No conformance claim based on screenshots or automated checks alone.

## Refinement — 9 September 2026

The user accepted the direction and asked for a more modern treatment. Improve the
existing interactive mockup: retain the light palette, restrained green, product
content and all actions. Introduce an inset workspace, larger heading, unboxed inline
metrics, clearer triage priority, simpler topic rows and more legible secondary text.
These are project-specific aesthetic choices, not universal rules of modern design.
Recheck desktop, tablet, mobile, shared dialogs, contrast and the triage/search flow.
The previous desktop capture is saved in session scratch space for comparison.

Spacing guidance was cross-checked on 2026-09-09 against the maintained
[Carbon spacing documentation](https://carbondesignsystem.com/elements/spacing/overview/)
and [USWDS spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/).
Both support a consistent spacing vocabulary; their exact scales belong to their
respective systems. The small shared scale used here is a project convention. The
unboxed metrics, inset frame, green accents and corner radii are aesthetic choices,
not conclusions established by those sources. Apple layout content was unavailable
in the text browser and was not used as evidence for this pass.
