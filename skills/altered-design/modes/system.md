# Mode: system

Create or refresh DESIGN.md from actual source and chosen design decisions. Read
`references/design-md-template.md` and relevant parts of `references/intake.md`.
An authorized refresh does not require a second permission request.

1. Locate existing design documentation. Preserve unrelated decisions and the existing
   log during a refresh; do not create a competing document.
2. Scan tokens, global styles, component variants, page templates and state conventions.
   Inspect computed styles and renders where helpful. Distinguish evidence from estimates.
3. With no source system, seed from the selected direction. If direction is open, use
   `references/directions.md` to show image options. Ask only for material missing context,
   without requiring metaphors or multiple interview rounds.
4. Record direction, example IDs or URLs, visual anchors, reusable tokens and components.
   Mark proposed defaults and unknowns; do not invent existing components or measured values.
5. Deliver the file and a short account of extracted, chosen and unresolved decisions.
   When this supports an ongoing authorized build, resume that build without another gate.
