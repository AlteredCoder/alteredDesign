# Components

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs anatomy, states and behavior of controls and content blocks: buttons, forms, navigation, tables, overlays, feedback, empty/loading/error states, icons, images.
**Load when:** `new`, `add`, `improve` touch any control or data block; `review` for the state audit; `system` to seed the component vocabulary in DESIGN.md.
**Owns:** anatomy, state matrix, buttons, forms, navigation, tables/lists, overlays, feedback, empty/loading/error state design, skeleton-vs-spinner choice, icons, images. Spacing, radius, z-index: layout.md. Target size, keyboard, ARIA: accessibility.md. Durations: motion.md. Wording: ux-writing.md. State colors: color.md.
**Defaults:** control height 32 / 36 / 40 px for compact / default / comfortable density and 44 px on touch surfaces (density table with row heights: see layout.md), one per surface. Control radius: the project's control radius token (see layout.md). Icons 16 px inline with text and inside controls ≤ 36 px, 20 px inside controls ≥ 40 px, 24 px standalone, one stroke strategy per surface (craft.md CRAFT-06). Component states: default, hover, focus-visible, active, disabled, loading, error, selected. Container states: empty, loading, error, partial, offline. Dialog widths sm 400 / md 560 / lg 720 px.

## Vocabulary and consistency

- **CMP-01 — Consistent component roles.** SHOULD: equivalent roles share established geometry, typography and behavior; variants may have different shapes or materials. Check: compare equivalent controls across screens.
- **CMP-02 — Reuse and record.** SHOULD: inspect existing components before adding new ones; record reusable changes in existing DESIGN.md where applicable. Check: no redundant component is created for the same role.
- **CMP-03 — Predictable actions.** SHOULD: equivalent actions use consistent terminology and placement in equivalent contexts. Check: navigation and outcomes remain predictable across related screens.
- **CMP-04 — Recognizable controls.** SHOULD: prefer native or established components for robust behavior; custom controls are permitted when task needs justify them. Check: keyboard, pointer and assistive-technology behavior match the intended control pattern.

## State matrix

- **CMP-05 — Relevant state matrix.** MUST: implement only states applicable to the component and requested fidelity; async data and actions need their actual pending and outcome states. Check: the brief lists which states are exercised or remain unverified.
- **CMP-06 — Feedback styling.** SHOULD: use selected visual treatments for hover, press and selection, with equivalent keyboard and touch access. Check: state changes remain perceivable and motion has a reduced alternative.
- **CMP-07 — Unavailable actions.** MUST: when an action is disabled, expose its unavailable state and explain any non-obvious prerequisite. Use native disabled semantics where supported; a focusable aria-disabled control needs activation blocked in code. Do not rely on a hover-only explanation. Check: keyboard and pointer cannot trigger an unavailable action, and its reason remains discoverable.
- **CMP-08 — Loading feedback.** SHOULD: choose status text, progress, skeletons or retained content according to the operation and expected delay; preserve stable geometry where practical. Check: users can distinguish pending work from empty or completed results without unnecessary flicker.
## Buttons and actions

- **CMP-09 — Action hierarchy.** SHOULD: emphasize the next task action within each group; multiple filled buttons may serve independent groups or repeated destinations. Check: labels and placement make action priority clear.
- **CMP-10 — Control size and hit area.** SHOULD: use the project density and type scale for visible controls; apply A11Y-20 to actual hit areas. Defaults are candidate dimensions, not a universal size table. Check: adjacent targets can be activated independently at intended input modes and equivalent controls remain consistent.
- **CMP-11 — Action placement.** SHOULD: dialog actions right-aligned, primary rightmost (LTR); form submit under the last field, left-aligned, or in a sticky bar past one viewport; destructive ≥ 16 px from the primary or at the opposite end. Check: same primary slot in every dialog.
- **CMP-12 — Pending action.** MUST: show perceivable pending feedback, prevent duplicate effects and retain a recovery path after failure; permit cancellation when the task supports it. A spinner is optional and repeated actions may be valid when explicitly designed. Check: rapid activation does not create unintended duplicate records or payments.
- **CMP-13 — Button vs link.** MUST: `<a href>` for navigation, `<button>` for actions, `type="button"` on non-submit buttons in forms (labels: see ux-writing.md). Check: grep `<button` without `type=` inside `<form>`.

## Forms and inputs

- **CMP-14 — Label anatomy.** MUST: visible `<label>` above the input (gap one scale step, 4–8 px, left-aligned); a fixed-width label column beside the input only on compact settings tables, one convention per surface; label and control one hit target for checkboxes and radios; mark the minority ("(optional)" or `*`, explained once). NEVER placeholder as the only label. Check: clicking the label focuses or toggles the control.
- **CMP-15 — Help and error slot.** MUST: one slot under the input for help (≤ 1 sentence, muted token); an error replaces the help text (or follows it when the help states the format) with error border + icon + message linked by `aria-describedby`; never border alone. Check: grayscale screenshot still names the error.
- **CMP-16 — Validation timing.** SHOULD: avoid interrupting initial entry with premature errors; choose submit, blur or input feedback to fit the field and established flow. After an error, update feedback as it is resolved; make submit errors reachable through a summary or field focus. Check: required omissions and invalid values are explained, and correction preserves other input.
- **CMP-17 — Input attributes.** MUST: matching `type` and `inputmode` (`type="email"`, `type="tel"`, `type="url"`; `type="text" inputmode="numeric"` for codes, card and account numbers; `type="number"` only for quantities); `autocomplete` tokens (name, email, tel, postal-code, cc-number, one-time-code, new-password, current-password); meaningful `name`; `spellcheck="false"` and `autocapitalize="off"` on emails, codes, usernames; password fields ship a Show/Hide toggle. NEVER block paste. Check: a password manager fills the login form; grep `type="number"` on non-quantity fields.
- **CMP-18 — Sizing and layout.** SHOULD: height from Defaults, padding-inline 12 px, font size per typography.md and ≥ 16 px on touch (iOS zooms on focus below 16 px); width matches content (postal code 8 ch, email one column, address full row); one column, pairs side by side only when they read as one unit; `<fieldset>` + `<legend>` for groups; textarea `resize: vertical`, min 3 rows, `field-sizing: content` where supported. Check: no full-width 5-digit field; no 3-field row.
- **CMP-19 — Choice controls.** SHOULD: radios for 2–5 options, select for 6–15, searchable combobox above 15; checkbox group ≤ 7; toggle only when the change applies immediately, checkbox in forms saved by a button. Check: no select with 3 options; no toggle beside Save.
- **CMP-20 — Submit behavior.** SHOULD: let incomplete forms submit into actionable validation rather than leaving an unexplained disabled action. Disable or guard submission while an operation is pending or unavailable when needed; explain the state. Preserve expected Enter behavior for native single-line fields and line breaks in textareas. Check: users can discover what prevents submission and recover.
- **CMP-21 — Date, time and file inputs.** SHOULD: native `type="date|time|datetime-local"` on product surfaces, custom picker only for ranges or availability, always with typed entry; file upload = drop zone + "Choose file" + accepted types and max size + per-file name, progress, remove. Check: dates accept typed input.
- **CMP-22 — Multi-step forms.** SHOULD: "Step n of N" with names, lossless Back, progress saved per step, each step validated on Continue, one "Continue" per step. Check: Back restores entered values.
- **CMP-23 — Unsaved-changes guard.** MUST: warn before leaving a form, dialog or drawer with unsaved edits (`beforeunload` or router guard): Save, Discard, Cancel. Check: edit, click a nav link, expect a prompt.

## Navigation

- **CMP-24 — Navigation pattern.** SHOULD: Product: side nav for ≥ 6 top-level destinations or nesting, top bar for ≤ 5; below `lg` (1024 px) the side nav becomes a drawer (breakpoint structure: see layout.md); below 768 px a bottom bar with ≤ 5 labeled items may replace the drawer. Brand: top bar, ≤ 5 items plus one CTA, drawer below 768 px. NEVER an icon-only bottom bar. Check: every bottom-bar item has a text label; at 900 px the side nav is a drawer.
- **CMP-25 — Visible active state.** MUST: persistent cue (fill, bar or weight) plus `aria-current="page"` on the current destination (it stays a link); never hover-only. Check: on reload the current item stands out without a pointer.
- **CMP-26 — Titles and location.** SHOULD: keep titles and wayfinding consistent within a surface family while allowing task-specific templates. Check: the current location and route back are clear.
- **CMP-27 — Tabs.** SHOULD: ≤ 7 tabs on one line (overflow scrolls, or a select below 640 px), one Tab stop with arrow keys (see accessibility.md), active tab in the URL. Check: at 375 px tabs do not wrap.
- **CMP-28 — Sticky header.** SHOULD: ≤ 64 px, shadow or border only once `scrollY > 0`, `scroll-padding-top` on `html` equal to its height (focus obscuring: see accessibility.md). Check: anchor jump leaves the heading visible.
- **CMP-29 — Navigation and recoverable state.** SHOULD: put shareable navigation state such as search, filters and pagination in the URL when useful; preserve drafts and private state through suitable application storage. Do not serialize sensitive field values merely to satisfy a URL convention. Check: Back and refresh restore the state promised by the task without exposing private input.
## Tables, lists, and data

- **CMP-30 — Column alignment.** MUST: text left, numbers right with `tabular-nums` (see typography.md), headers aligned with their column, one date format per table (formats: see ux-writing.md). Check: decimal points line up.
- **CMP-31 — Rows.** SHOULD: height 32 / 40 / 48 px by density (see layout.md), cell content vertically centered, 1 px dividers, hover = one lightness step, sticky opaque header row on tables taller than one viewport, density toggle on primary work tables. AVOID zebra striping. Check: all rows share one height.
- **CMP-32 — Row actions.** MUST: row actions stay in the DOM and focusable (revealed on `:hover` and `:focus-within`, always visible under `@media (hover: none)`); ≤ 2 inline as labeled icon buttons, ≥ 3 in an overflow menu. Check: Tab reaches row actions without hovering; a touch emulator shows them at rest.
- **CMP-33 — Selection and sorting.** SHOULD: 40 px leading checkbox column, header checkbox selects the page plus "Select all N" across pages, bulk actions bar with the count at ≥ 1 selected; sortable headers are buttons with a visible sort icon on the active column and `aria-sort`. Check: selection shows a count; active sort visible at rest.
- **CMP-34 — Pagination vs infinite scroll.** SHOULD: paginate tables (page size 10 / 25 / 50 / 100 persisted per user, "1–25 of 340"); infinite scroll only for feeds, with a "Load more" fallback and a reachable footer. NEVER infinite-scroll a table with a footer or bulk actions. Check: table shows a total count.
- **CMP-35 — Responsive tables.** SHOULD: pick the small-screen strategy per layout.md LAY-47; the stacked form shows each column header as a label before its value; a scroll strip carries an affordance (CMP-53); table text ≥ 12 px (see typography.md). Check: at 375 px no horizontal page scroll; each stacked value shows its header.

## Overlays

- **CMP-36 — Modal last.** AVOID a modal as the first structure; use, in order: inline expansion, side panel or drawer, popover, full page; a modal only when a decision blocks the task. Check: each modal in the diff has a one-line reason.
- **CMP-37 — Modal behavior.** MUST: implemented modal dialogs have an accessible name, deliberate initial focus, contained keyboard navigation, dismissal consistent with the task and a logical focus destination on close. Prefer native dialog or a tested established component; verify actual behavior. Check: keyboard entry, Tab traversal, Escape where supported, background interaction and focus restoration match the intended modal pattern.
- **CMP-38 — Dismissal and nesting.** SHOULD: Escape and scrim click close non-destructive dialogs; unsaved input confirms first (CMP-23); visible close button (top-end) or Cancel on every dialog. NEVER open a modal from a modal; replace content in place. Check: one `<dialog open>` at a time.
- **CMP-39 — Dialog sizes.** SHOULD: `width: min(<size from Defaults>, 100% - 32px)`, `max-height: 85dvh`, fixed header and footer, scrolling body; below 640 px a bottom sheet or full screen. Check: dialog body scrolls, page does not.
- **CMP-40 — Dropdowns in the top layer.** MUST: menus, selects, comboboxes and pickers use the `popover` attribute, `<dialog>`, `position: fixed` or a portal, positioned with CSS anchor positioning (`position-anchor`, `position-try-fallbacks`) or a positioning library; never `position: absolute` inside an `overflow: hidden|auto` ancestor; flip at viewport edges; 4–8 px offset. Check: a menu in the last table row is not clipped.
- **CMP-41 — Tooltip scope.** SHOULD: non-essential hints only, on hover and focus after 300–500 ms, instant for adjacent tooltips while one is open (craft.md CRAFT-15), hidden on Escape, hoverable and persistent while the pointer is over it (WCAG 1.4.13); never on a `disabled` element (it receives no pointer events). NEVER required information or interactive content in a tooltip. Check: task completes with tooltips disabled.

## Feedback

- **CMP-42 — Notifications and time to act.** SHOULD: use transient feedback for non-critical outcomes, persistent feedback for conditions or actions that need attention, and recoverable access to needed information. Select timeouts by content and task; follow applicable WCAG timing requirements and exceptions. Announce status without stealing focus. Check: an essential message or recovery action does not become unavailable solely because a short toast elapsed.
- **CMP-43 — Feedback placement.** SHOULD: page-level banner (dismissible unless blocking) for persistent conditions (offline, plan limit, unsaved draft); inline feedback beside its source for everything local; success in place while the trigger is visible, by toast when not, by a full screen only at the end of a flow. Check: no local error at page top; confirmation visible without scroll.
- **CMP-44 — Confirm destructive.** MUST: irreversible or bulk destructive actions confirm in a dialog naming the object and count, stating the consequence, repeating the verb on the destructive button (wording: see ux-writing.md); Undo instead of a dialog for reversible single deletes. Check: destructive button never reads "OK".
- **CMP-45 — Optimistic updates.** SHOULD: apply optimistic changes when outcomes are predictable and reversibility is supported; use confirmed outcomes for high-impact operations. On failure restore a valid state, preserve user work and keep recovery accessible. Check: an offline or rejected request cannot leave a false success state or an unrecoverable transient error.
- **CMP-46 — Progress.** SHOULD: determinate bar when the total is known, indeterminate otherwise; progress for operations > 1 s; estimate or step count and Cancel > 10 s (spinner delay: see motion.md). Check: a 15 s operation shows an estimate or steps.
- **CMP-56 — Badges and status chips.** SHOULD: one badge size per surface (height 20–24 px, padding-inline 8 px, text ≥ 12 px), tint background with ink or same-hue text at ≥ 4.5:1, meaning carried by wording or an icon as well as color (see color.md, accessibility.md); ≤ 6 status values per product; a badge is never a click target (a removable tag is a button with a labeled remove control). Check: grep badge variants; ≤ 6; no `onClick` on a badge.

## Empty, loading, error states

- **CMP-47 — Empty states.** MUST: heading + one sentence + one primary action, centered, illustration optional and ≤ 160 px; first-run (teach + create), filtered-empty (name the filter + Clear filters) and error-empty (what failed + Retry) are three distinct designs (copy: see ux-writing.md). Check: one primary button; each empty shows a different action.
- **CMP-48 — Skeleton mirrors layout.** MUST: skeleton matches the final layout (line count, avatar size, card height; tables 5–10 rows at real height); no centered spinner in place of content (shimmer: see motion.md). Check: swapping skeleton for content moves nothing.
- **CMP-49 — Error, partial, offline.** MUST: a load failure is a block-level state with what failed and Retry; siblings stay alive; partial data shows an inline notice ("3 of 4 loaded", Retry) and stays usable; offline shows a banner and disables network actions. Check: one failed fetch; siblings still render.

## Icons and images

- **CMP-50 — Icons.** MUST: one library, one stroke strategy (the set's native stroke, or matched to the adjacent text weight: craft.md CRAFT-06), `currentColor` with states from CSS and outline-default, fill-active variants (CRAFT-07); 16 / 20 / 24 px on the pixel grid, `flex-shrink: 0`, flex-centered on text, gap 8 px; `aria-hidden="true"` beside a text label (meaningful icons: see accessibility.md). NEVER emoji as icons. Check: grep for > 1 icon package and emoji in markup.
- **CMP-51 — Images and avatars.** MUST: `width` and `height` or `aspect-ratio`, `object-fit`, a surface token while loading, `srcset` + `sizes` on raster images wider than 400 px, `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image (alt: see accessibility.md); avatars 20 / 24 / 32 / 40 / 64 px, one shape, initials fallback; a 1 px inside outline at 10 % alpha on photos and avatars (craft.md CRAFT-04). Check: no `<img>` without dimensions; CLS < 0.1.

## Interaction details

- **CMP-52 — Hover is enhancement.** MUST: every action and every piece of information reachable without hover; touch and keyboard parity. Check: grep `:hover` rules that set `display`, `visibility` or `opacity`; each has a `:focus-within` or `:focus-visible` twin and an always-visible fallback under `@media (hover: none)`; complete the task in a touch emulator.
- **CMP-53 — Scroll areas.** MUST: `overscroll-behavior: contain` on nested scroll areas; horizontal scroll shows an affordance (scrollbar, edge fade via `mask-image`, or a cut-off next item); `scroll-snap` for carousels. Check: at 375 px a scroll strip shows a cut-off item or fade.
- **CMP-54 — Interaction CSS.** SHOULD: one cursor policy (`pointer` on clickable elements, `not-allowed` on disabled, `grab` on handles), `user-select: none` on button labels, tabs and handles, `touch-action: manipulation` on controls, `:hover` rules inside `@media (hover: hover)` so touch gets no stuck hover, `-webkit-tap-highlight-color: transparent` only where an `:active` style exists. Check: double-click on a button selects no text; a tapped card in a touch emulator shows no lingering hover.
- **CMP-55 — Drag and shortcuts.** SHOULD: drag has an explicit handle (target per accessibility.md), a shadow lift, momentum and boundary behavior per craft.md CRAFT-21, and a keyboard or menu alternative (Move up / down); shortcuts listed in a "?" panel, single-key only outside inputs, never overriding browser or system shortcuts. Check: reorder by keyboard; "?" opens the list.

## Quick check

- CMP-01 · Consistent component roles
- CMP-05 · Relevant state matrix
- CMP-08 · Loading feedback
- CMP-09 · Action hierarchy
- CMP-10 · Control size and hit area
- CMP-12 · Pending action
- CMP-14 · Label anatomy
- CMP-16 · Validation timing
- CMP-25 · Visible active state
- CMP-32 · Row actions
- CMP-37 · Modal behavior
- CMP-40 · Dropdowns in the top layer
- CMP-44 · Confirm destructive
- CMP-47 · Empty states
- CMP-50 · Icons
- CMP-51 · Images and avatars
- CMP-52 · Hover is enhancement
