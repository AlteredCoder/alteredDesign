# xdex — visual canvas prototype

Chosen 2026-09-09: direction I, visual / canvas. The user explicitly approved this
choice; no further direction approval is needed. Fresh interactive HTML prototype,
separate from the earlier quiet-minimal mockup. French interface and fictional fixtures.

## Visual translation

References: Kosmik resource canvas and Integrity project canvas in the approved
direction I comparison board.
- https://techcrunch.com/2023/12/21/meet-kosmik-a-visual-canvas-with-an-in-built-pdf-reader-and-a-web-browser/
- https://integrity.sh/
 Borrow image/text cards, tinted spatial groups, visible
connections and local tools. Use a warm dotted workspace, ink navigation, periwinkle,
apricot and sage topic groups, a violet primary action and distinct reading surfaces.
The composition is a personal research board, not an analytics dashboard. Typography:
system sans for controls and titles; serif for the short editorial note. No reference
images, brands or copy are reused as implementation assets.

## Interactions

Persistent-in-session workspace tabs: pinned dashboard, library and resource details,
plus new-view launcher. Deduplicate resources, close active/inactive tabs, restore per-view
search/filter/scroll. Arrow/Home/End navigation and Delete to close tabs; avoid overriding
browser Cmd/Ctrl+T or W. On small screens, the strip scrolls internally and retains access
to active tabs and the + button.

Canvas groups by topic. Resource cards open document tabs. Canvas navigation includes
zoom, reset/fit and ordinary scrolling, with an equivalent searchable list on narrow
screens or by choice. If cards are movable, provide click controls as well as dragging.
Search, source and triage filters; pending/kept/archived bookmark states, Undo, resource
reading and cross-source provenance. Sources and costs are clearly illustrative.
No read/unread status or invented resource counters; canonical resources and source
bookmarks are separate data structures, with triage on source bookmarks.

## Quality evidence

Guidance checked 2026-09-09: WAI-ARIA APG Tabs pattern (keyboard, tab/panel relationships,
focus after closing) and WCAG 2.2 SC 2.5.7 (dragging has a single-pointer alternative).
The user-provided xdex tab screenshot defines retained behavior. This is a prototype,
not a claim of full WCAG conformance or validated user research.

- https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html

Verify 1440, 768, 375 and 320 px; visual comparison, keyboard and tab lifecycle,
search/triage/Undo, canvas and list access, reduced motion, representative contrast,
errors, image decoding and automated accessibility findings. Store evidence in scratch.

## Canvas usability revision — 2026-09-09

User feedback: the canvas felt unintuitive and too small inside its enclosing block.
The canvas now fills the workspace beneath a compact workbar, with no inset card frame.
A window expansion control retains the workspace tabs while hiding the sidebar and
upper toolbar. Navigation controls live in a separate footer, never over the cards.
Background dragging, native scroll and keyboard scroll are complemented by a collection
jump menu. Overview fits both scene dimensions and recenters the scene; choosing a
collection restores 100% for reading. Normal navigation keeps a stable scene origin so
group dragging follows the pointer. Zoom preserves the viewing center within scroll
limits. Expanded mode belongs to the canvas: library and resource tabs show normal chrome.
Escape reduces it when no dialog is open. The mobile list remains the default.
