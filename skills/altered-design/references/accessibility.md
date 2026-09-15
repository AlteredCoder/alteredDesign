# Accessibility

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs semantics, keyboard operation, focus behavior, ARIA, target size, pointer alternatives, zoom and reflow, forms, media and the a11y testing procedure.
**Load when:** every mode that writes or reviews markup; `review` runs the testing procedure in full.
**Owns:** semantics, keyboard, focus presence and behavior, ARIA, screen readers, target size, zoom, forms a11y, media, testing. Focus ring color and contrast: color.md. Reduced motion: motion.md. Anatomy: components.md. Error wording: ux-writing.md.
**Defaults:** conformance floor WCAG 2.2 AA. Focus ring: `:focus-visible` outline 2 px solid, `outline-offset: 2px`, focus token (see color.md). Target requirements and exceptions: A11Y-20; 44px is a touch-size recommendation. Live regions: `role="status"` for progress and confirmations, `role="alert"` only for blocking errors. Zoom: 200 % and 320 px reflow without loss, pinch zoom never disabled.

Criteria source: [WCAG 2.2](https://www.w3.org/TR/WCAG22/). See the W3C explanations for [visible focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), and [consistent help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html).

## Floor and semantics

- **A11Y-01 — Accessibility target and evidence.** MUST: apply the requested target, default WCAG 2.2 AA, to implemented UI and report unresolved failures. Automated scans and selected manual checks do not certify full conformance. Check: name criteria tested, evidence, exceptions and checks still required.
- **A11Y-02 — Meaningful landmarks.** SHOULD: identify the main content and existing navigation or complementary regions with native landmarks; do not add empty nav, footer or aside regions just to satisfy a template. Check: the landmark structure represents actual content.
- **A11Y-03 — Semantic headings.** SHOULD: use a coherent heading hierarchy; one page-level h1 is a useful default, not a standalone WCAG conformance test. Check: the outline represents content relationships and headings are not chosen only for visual size.
- **A11Y-04 — Native elements.** MUST: `<button>` for actions, `<a href>` for navigation, `<ul>`/`<ol>` for lists, `<table>` with `<th scope>` and `<caption>` for data. NEVER `<div onClick>` or `role="button"` on a div. Check: grep `onClick` on div/span.
- **A11Y-05 — Form association.** MUST: every control has a `<label for>` or wrapping label; `aria-labelledby` pointing at visible text or `aria-label` only where a visible label is impossible (a search box with a visible icon, inputs inside table cells); related controls in `<fieldset>` + `<legend>`. Check: axe "label" rule 0 violations.

## Keyboard and focus

- **A11Y-06 — Everything by keyboard.** MUST: every action, including drag, hover menus and custom controls, works with Tab, Shift+Tab, Enter, Space, arrows and Escape; no trap outside a modal. Check: keyboard walk (A11Y-35).
- **A11Y-07 — Order matches visual.** MUST: DOM order equals visual order; `tabindex` is `0` or `-1` only. NEVER a positive `tabindex`. AVOID CSS `order`, `flex-direction: *-reverse` and grid placement that move a focusable block before an earlier one in reading order. Check: grep `tabindex="[1-9]`; Tab follows the layout start to end, top to bottom.
- **A11Y-08 — Visible keyboard focus.** MUST: keep a visible focus indicator during keyboard use under WCAG 2.4.7; a 2px outline with offset is a recommended implementation, not a prescribed AA shape. Check: inspect actual focus against its background, including forced colors, without relying on outline syntax alone.
- **A11Y-09 — Unobscured focus.** MUST: ensure focused components are not entirely hidden by author-created content under WCAG 2.4.11; keeping them fully visible is the stronger preferred behavior. Check: walk focus through sticky headers, footers and overlays.
- **A11Y-10 — Skip link.** MUST: first focusable element is "Skip to main content" targeting `<main id tabindex="-1">`, visible on focus. Check: the first Tab press reveals it.
- **A11Y-11 — Focus management.** MUST: modal open moves focus inside, close returns it to the trigger; deleting an item moves focus to the next item or list heading; route change moves focus to the new h1 or `<main>` (target carries `tabindex="-1"`). Check: `document.activeElement` after each action.
- **A11Y-12 — Roving tabindex.** MUST: composite widgets (tabs, menus, radio groups, toolbars, grids, listboxes) are one Tab stop with arrow keys and Home/End: `tabindex="0"` on the active item, `-1` on the rest, or `aria-activedescendant` for listboxes and comboboxes. Check: Tab enters once; arrows move within.
- **A11Y-13 — Escape.** MUST: Escape closes the topmost overlay (dialog, menu, popover, tooltip) and cancels a drag in progress. Check: Escape on each overlay closes only that one.
- **A11Y-14 — Inert background.** MUST: the page behind an open modal is `inert` (native `<dialog>` + `showModal()` does this), neither focusable nor read; off-canvas drawers carry `inert` while closed. Check: Tab never leaves the modal; Tab never enters a closed drawer.

## ARIA

- **A11Y-15 — Semantics first.** MUST: native HTML before ARIA; ARIA only fills a gap (custom combobox, live region); no ARIA beats wrong ARIA. Check: every `role=` in the diff has no native equivalent.
- **A11Y-16 — Accessible names.** MUST: icon-only controls carry `aria-label` or visually hidden text (clip pattern, never `display: none`); the accessible name starts with the visible label (WCAG 2.5.3). Check: axe "button-name" and "link-name" 0 violations.
- **A11Y-17 — State attributes.** MUST: `aria-expanded` + `aria-controls` on disclosures, `aria-haspopup` on menu buttons, `aria-current` on the active nav item, `aria-selected` on tabs, `aria-pressed` on toggle buttons, `aria-checked` on `role="switch"`, `aria-sort` on sorted columns. Check: toggle each; the attribute flips.
- **A11Y-18 — Live regions.** MUST: async results (save status, validation summary, toasts, loaded counts) announce through a live region present before the update: `role="status"` polite, `role="alert"` only for blocking errors; focus never moves for a status. Check: "Saved" is announced without focus moving.
- **A11Y-19 — Hide decoration, name meaning.** MUST: `aria-hidden="true"` on decorative icons, `alt=""` on decorative images; a standalone meaningful icon (a status glyph without text) carries `role="img"` + `aria-label`. NEVER `aria-hidden` on a focusable element or its ancestor. Check: axe "aria-hidden-focus" 0 violations; every icon without adjacent text has a name.

## Targets and pointer input

- **A11Y-20 — Target size with exceptions.** MUST: apply WCAG 2.5.8: targets at least 24 by 24 CSS pixels or a documented spacing, equivalent-control, inline, user-agent or essential exception. A 44px touch target is a stronger design default; there is no universal 8px gap requirement. Check: measure hit areas and apply the actual exception geometry when used.
- **A11Y-21 — No hover-only, no drag-only.** MUST: every hover-revealed action has a focus and touch path; every drag has a single-pointer alternative (WCAG 2.5.7); swipe and pinch have tap equivalents. Check: complete each flow with clicks and keyboard only.
- **A11Y-22 — Pointer cancellation.** MUST: fire actions on `click` or pointer-up, never pointer-down (WCAG 2.5.2). Check: press, drag off, release: nothing fires; grep `onPointerDown|onMouseDown` that call an action.

## Zoom, reflow, text

- **A11Y-23 — Zoom and reflow.** MUST: no loss at 200 % browser zoom (WCAG 1.4.4); at 320 px width content reflows to one column with no horizontal scroll (WCAG 1.4.10; data tables and maps scroll inside their own container). NEVER `user-scalable=no` or `maximum-scale` below 5. Check: grep the viewport meta; test at 320 px and 200 %.
- **A11Y-24 — Text adaptation.** MUST: support text resizing and applicable WCAG 1.4.12 spacing changes without loss; prefer relative font units. Follow WCAG 1.4.5 for images of text, including its customization and essential-presentation exceptions. Check: inspect 1.5 line height, 2em paragraph spacing, 0.12em letter spacing and 0.16em word spacing.
- **A11Y-25 — Color not sole carrier.** MUST: pair every color-coded meaning with an icon, text or pattern (error, success, chart series, required) (WCAG 1.4.1); links in prose underlined (see typography.md). Check: a grayscale screenshot keeps every distinction.
- **A11Y-26 — Flashing and moving content.** MUST: nothing flashes more than 3 times per second (WCAG 2.3.1); auto-moving content longer than 5 s has pause or stop (WCAG 2.2.2); reduced motion per motion.md. Check: carousels and loops have a pause control.
- **A11Y-39 — Forced colors.** SHOULD: under `@media (forced-colors: active)` every custom control keeps a boundary (`border: 1px solid transparent` or `outline`), icons use `currentColor`, selected and current states keep a non-background cue. Check: emulate forced-colors in DevTools; every control and selected item shows a visible boundary or cue.

## Forms

- **A11Y-27 — Errors in text.** MUST: each error identified in text, tied to the field with `aria-describedby` and `aria-invalid="true"`; a failed submit moves focus to the error summary linking each field, or to the field when it is the only error (timing: see components.md; wording: see ux-writing.md). Check: the screen reader reads the error on the field.
- **A11Y-28 — Input purpose.** MUST: `autocomplete` tokens on fields collecting personal data (WCAG 1.3.5; tokens: see components.md). Check: axe "autocomplete-valid" 0 violations.
- **A11Y-29 — No redundant entry.** MUST: information entered earlier in the same process is auto-filled or selectable (shipping = billing) unless re-entry is essential (WCAG 3.3.7). Check: step 2 never asks for step 1 data.
- **A11Y-30 — Accessible authentication.** MUST: assess authentication under WCAG 3.3.8 including its alternatives and exceptions; support password managers and paste where relevant. Do not require unsupported memory or transcription tasks. Check: exercise the available assistive path rather than declaring a CAPTCHA type universally compliant.
- **A11Y-31 — Time limits.** MUST: warn ≥ 20 s before a session timeout with a one-click extension, or allow turning the limit off (WCAG 2.2.1); entered data survives re-authentication. Check: the timeout warning appears and extends.

## Media, language, consistency

- **A11Y-32 — Relevant media alternatives.** MUST: provide alternatives for the media and applicable WCAG criteria: meaningful image text alternatives, captions for relevant speech, audio alternatives and descriptions when required. Check: inspect each media item rather than assuming every video needs the same track.
- **A11Y-33 — Language.** MUST: `<html lang>` matches the page language; `lang` on inline passages in another language; `translate="no"` on brand names and code. Check: `document.documentElement.lang` is set.
- **A11Y-34 — Consistent repeated help.** MUST: preserve the relative order of repeated navigation under WCAG 3.2.3 and repeated help mechanisms covered by WCAG 3.2.6. These do not require adding every kind of help or placing it at identical pixels. Check: compare repeated mechanisms across the pages in scope.

## Testing procedure

- **A11Y-35 — Keyboard walk.** MUST: Tab through the whole surface: every control reached in visual order, focus visible on each, Enter and Space activate, Escape closes, no trap, skip link works. Check: written pass in the report (see verification.md).
- **A11Y-36 — Screen reader smoke.** MUST: with VoiceOver (Cmd+F5) or NVDA, read the landmark list, heading list and form controls; every control announces name, role and state. Check: no "button", "link" or "image" announced without a name.
- **A11Y-37 — Automated scan limits.** MUST: run an available accessibility scanner on relevant implemented states and report uncovered checks. An accessibility-tree snapshot is useful inspection evidence but is not equivalent to an axe scan. Check: identify the actual tool, findings and remaining manual work.
- **A11Y-38 — Zoom and reduced motion pass.** MUST: view at 200 % zoom, at 320 px width, and with `prefers-reduced-motion: reduce` emulated; no loss, no horizontal scroll, no motion beyond crossfades. Check: three screenshots attached to the report.

## Quick check

- A11Y-01 · Accessibility target and evidence
- A11Y-04 · Native elements
- A11Y-05 · Form association
- A11Y-07 · Order matches visual
- A11Y-08 · Visible keyboard focus
- A11Y-09 · Unobscured focus
- A11Y-11 · Focus management
- A11Y-12 · Roving tabindex
- A11Y-16 · Accessible names
- A11Y-18 · Live regions
- A11Y-20 · Target size with exceptions
- A11Y-21 · No hover-only, no drag-only
- A11Y-23 · Zoom and reflow
- A11Y-25 · Color not sole carrier
- A11Y-27 · Errors in text
- A11Y-35 · Keyboard walk
