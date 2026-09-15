# xdex — new direction, fresh mockup

- Request: retry altered-design from scratch with a non-minimalist direction.
- Mode: new. Register: product. Output: local interactive responsive prototype.
- Product source: xdex README and existing data semantics. This is a redesign;
  the earlier quiet-minimal mockup is not a layout or styling template.
- Audience and core task: Kevin’s personal bookmark triage and retrieval.
- Required content: pending, kept, archived resources; search and source/topic
  filters; summaries and cross-references; connected sources and illustrative costs.
- Content language: French, matching xdex. Clearly labeled fictional sample data.
- Direction: I — visual / canvas, explicitly chosen by the user on 2026-09-09.
  The catalog remains open to a custom direction or combination.
- Preserve the previous mockup in xdex/mockups/xdex-dashboard. Build separately;
  choose a direction-specific sibling folder after selection.
- Interaction scope: search, filters, details, keep/archive/restore, Undo, coherent
  counts and relevant empty states. Simulated sync and source/cost information only.
- Verification: desktop 1440, tablet 768, mobile 375 and reflow 320; keyboard/focus,
  contrast samples, affected automated accessibility checks and primary task flows.
- Reference ledger: references/sources.json. All eighteen included style images opened and
  visually inspected. Images are inspiration, not implementation assets.
- Selection rationale: nine visually distinct proposals, with two examples each:
  A graphic neo-brutalism, B expressive, C Liquid Glass, D editorial, E organic and
  illustrated, F tactile relief, G retro pixel, H technical cockpit, I visual canvas.
  Existing A–C labels remain stable. Native apps, UI kits, concepts and historic images
  are explicitly identified; style references are not dated as 2026 UX guidance.
  Amie and Sera were inspected and excluded because their restrained appearance did
  not sufficiently depart from the prior direction. Geist and Evie replace Sera as
  editorial examples. ZenFlow is labeled as a partial reference for illustration,
  curves and palette; its original creator describes its composition as minimalist.
  Tactile and cockpit references require contrast and text-size corrections in xdex.
  Kosmik is explicitly historical: its official site announces closure in May 2026.
- Quality basis: altered-design/references/quality.md and its checked decisions.
  Style references are not usability evidence. No new general UX rule is introduced.

## Product semantics rechecked

`Card.ID` identifies a source bookmark joined to its primary resource. The triage
state belongs to that bookmark (`source_item`), not to the canonical resource.
`Overview.resources` counts canonical resources; pending and kept count bookmarks;
crossed counts resources referenced by more than one distinct bookmark. The new
fixtures and labels must keep these counts separate. No read/unread state exists.
`CostSummary` includes today, the last 30 days, a projection from the last seven days,
a configured budget and provider/day breakdowns. Any values shown are demo fixtures.

The expanded board was rendered at 1440 px: eighteen style images loaded. The overview,
editorial detail and mobile render were visually inspected. Filtering, reset and image
enlargement work; 768, 375 and 320 px produce no horizontal page overflow. An automated
axe scan returned zero violations in the selected WCAG A/AA rule sets; this is not a
complete accessibility certification. No browser script errors were observed.
Evidence: /private/tmp/xdex-directions-expanded-check.json and desktop, editorial and
mobile PNGs with the same prefix. Rebuild the offline page with build_directions.py.

## Required interaction — workspace tabs

The user explicitly likes the tab system in the current xdex HTML dashboard.
Preserve this behavior in the fresh mockup regardless of aesthetic direction:
Dashboard, Library and several resource views can stay open at once; switching
views must preserve each view’s local state. Keep a stable dashboard tab, close
controls for other tabs, and a + entry for opening a view. Resource details belong
in workspace tabs rather than only temporary modal dialogs.
User screenshot saved as references/xdex-user-tabs.png and visually inspected.
Use it as the interaction reference; the tab appearance can follow the chosen style.
Verify opening, activation, duplicate handling, closing active/inactive tabs, retained
search/filter/scroll state, keyboard access and overflow on small screens.

The user asked for more than three directions: the expanded board now contains nine.
The earlier three-option question is superseded by the A–I choice. The user selected I — visual / canvas. Build at ../xdex-canvas; do not repeat the
direction question or modify the prior quiet mockup. The user also authorized integrating
the board format into the skill as a reusable capability.
