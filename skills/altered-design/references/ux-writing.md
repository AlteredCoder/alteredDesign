# UX writing

**Applicability:** read `quality.md` first; numeric recipes and visual conventions are contextual defaults, not universal conformance criteria.
Governs the words in the interface: voice, labels, buttons, headings, help text, placeholders, errors, empty states, confirmations, success messages, number and date formatting, which strings may truncate, capitalization, content honesty and i18n text.
**Load when:** any mode writes or changes visible text; `review` for the copy audit.
**Owns:** voice, labels, button wording, heading copy, placeholder vs label wording, error wording, empty/confirmation/success copy, number/date/unit formatting, which text may truncate, capitalization, i18n text. State design: components.md. Alt text, link semantics, text in images: accessibility.md. Truncation mechanics, typographic characters, tabular figures: typography.md. Slop word lists, template chrome: anti-patterns.md.
**Defaults:** sentence case everywhere, capitalized names excepted. Button = verb + object, ≤ 3 words. Heading: hero ≤ 8 words, section ≤ 5. Error = what happened + how to fix, ≤ 20 words. Success = past tense, ≤ 6 words. Placeholder = example value (SHOULD end with "…"), never the label. Dates relative ≤ 7 days via `Intl.RelativeTimeFormat`, then absolute via `Intl.DateTimeFormat`.

## Voice

- **COPY-01 — Plain, specific, active.** MUST: plain words, specific nouns, active voice ("Install the CLI", not "The CLI will be installed"); no jargon the audience does not use; numerals for counts ("8 files"). Check: a new user understands each string without context.
- **COPY-02 — Interface voice, not a person.** MUST: Product: the interface speaks as the interface: no "we", no "I", no apology, no "Oops", no exclamation marks. Brand: first person plural allowed when the brief's voice uses it; still no "Oops", no apology, ≤ 1 exclamation mark per page. Check: grep copy for `!`, "Oops", "sorry".
- **COPY-03 — Tone by register.** SHOULD: Brand: a voice with personality matched to the brief, consistent across the page. Product: neutral and instructional, the same tone in success and failure; errors carry no personality in either register. Check: any product string pastes into a support ticket unchanged.

| Moment | Product | Brand |
|---|---|---|
| Success | "Changes saved" | "Saved. On to the next one" |
| Empty | "No projects yet" + action | "Nothing here yet" + action, in the brand voice |
| Error | "Couldn't save. Check the connection and retry" | same as product |

- **COPY-04 — User's words, not the system's.** MUST: name things by what the user does ("Notifications", "Members"), not by implementation ("Webhook config", "Entities"). Check: no database, API or internal term in visible text.

## Labels and buttons

- **COPY-05 — Verb + object.** MUST: buttons name the outcome: "Save changes", "Delete project", "Create account"; ≤ 3 words. NEVER "Submit", "OK", "Yes", "No", "Click here" or "Learn more" alone. Check: grep button text for the banned words.
- **COPY-06 — Same word through the flow.** MUST: the verb on the button, the toast and the menu item match ("Publish" → "Published"); one term per concept (Delete = permanent, Remove = out of a group, Archive = reversible; Sign in, never mixed with Log in). Check: grep for two terms of one pair.
- **COPY-07 — Navigation labels and punctuation.** SHOULD: nouns for destinations ("Projects", "Settings"), ≤ 2 words, no generic "Items" or "More"; no period on labels, buttons, headings or one-sentence help; periods on multi-sentence text. Check: every nav item is a noun; grep `.</button>`.
- **COPY-31 — Field labels.** MUST: field labels are nouns or noun phrases ≤ 3 words without a trailing colon ("Email", "Company name"); a checkbox label is the statement being agreed to ("Send me weekly updates"); a toggle names the setting, never its state ("Notifications", not "Enabled"). Check: grep `:</label>`; no toggle labeled On/Off/Enabled.

## Headings

- **COPY-08 — Specific headings.** MUST: state the subject or the outcome ("Cut reporting from 4 hours to 15 minutes"), not a category ("Features") or a pun; hero ≤ 8 words, section ≤ 5, h1 = the noun of the page; an intro line never restates its heading (single-word accent: see anti-patterns.md). Check: each heading survives without its section.

## Help text and placeholders

- **COPY-09 — Placeholders and help text.** MUST: the placeholder shows a value format ("name@example.com"), never the label or an instruction; help text ≤ 1 sentence answering "why" or "what format", never a rephrased label. SHOULD: end the placeholder with "…" so it reads as an example, one convention project-wide. Check: with placeholders removed every field still has its label.

## Errors

- **COPY-10 — Error formula.** MUST: what happened + how to fix, one sentence ≤ 20 words, naming the field ("Email needs an @ sign, for example name@example.com"); no blame ("Enter a date as DD/MM/YYYY", not "Invalid date entered"). Check: every error contains a fix.
- **COPY-11 — No codes, no jargon.** NEVER lead with status codes, stack traces or internal names ("Error 403", "null", "undefined"); translate them: 401 = sign in again, 403 = no access, ask an admin, 429 = wait N seconds, 500 = retry or contact support; a support reference may follow the sentence in muted text ("Ref: 8F3K"). Check: grep copy for "Error [0-9]", "undefined", "null".
- **COPY-12 — System errors offer a path.** MUST: network and server errors end with an action: Retry, Contact support or Save a copy; "Something went wrong" alone is banned. Check: every system error string has a next step.

## Empty states

- **COPY-13 — Empty state copy.** MUST: headline names what belongs here + one sentence of value + one action ("No projects yet" / "Projects keep files and members together" / "Create project"); filtered: "No results for 'x'" + "Clear filters"; error: "Couldn't load projects" + "Retry". NEVER "No data" or "Nothing to see". Check: the headline contains the noun of the block; three empties, three headlines.

## Confirmations and destructive actions

- **COPY-14 — Name the object and consequence.** MUST: title = verb + object ("Delete 'Q3 report'?"), body = consequence ("This removes it for all 4 members and can't be undone"), destructive button repeats the verb with the count ("Delete 3 files"); the other button is "Cancel", never "No". Check: the destructive button text contains the verb.

## Success and progress

- **COPY-15 — Success in past tense.** MUST: ≤ 6 words, past tense, naming the object ("Changes saved", "Invite sent to 3 people"); no exclamation mark; a next step only when one exists. Check: grep toasts for "Success" alone.
- **COPY-16 — Progress wording.** SHOULD: present participle with the object and the ellipsis character ("Saving changes…", not "Loading..."); above 10 s add an estimate ("usually 30 seconds"). Check: grep copy for three dots `\.\.\.`.

## Numbers, dates and units

- **COPY-17 — Locale number formatting.** MUST: every number through `Intl.NumberFormat` (thousands separators, decimals, `style: "percent"`); numerals, not words; large counts abbreviated only in dense UI via `notation: "compact"` ("12.4K") with the full value on hover or focus (tabular figures: see typography.md). Check: grep for `toFixed`, `toLocaleString()` without a locale, or string-built numbers.
- **COPY-18 — Dates and times.** MUST: relative for ≤ 7 days through `Intl.RelativeTimeFormat` ("2 hours ago", "yesterday"), absolute after through `Intl.DateTimeFormat` with `dateStyle: "medium"` (year included by the formatter), every date inside `<time datetime="...">`; time zone shown when the audience spans zones; full timestamp on hover or focus of a relative date. Check: no hard-coded "MM/DD/YYYY" or month arrays.
- **COPY-19 — Units and currency.** SHOULD: unit after the number through `Intl.NumberFormat` `style: "unit"` ("10 MB", "45 min"), one convention project-wide (no-break space: see typography.md); currency via `style: "currency"`, symbol for a single currency, ISO code ("USD") when several appear. Check: grep for mixed "10MB" and "10 MB".
- **COPY-20 — Typographic characters.** MUST: "…", curly quotes and the no-break space before units per typography.md; "×" for dimensions ("1920 × 1080"), never the letter x; shortcut hints as `<kbd>` with a no-break space ("⌘ K"). Check: grep `\.\.\.`, straight quotes, and ` x ` between digits in copy.

## Truncation and capitalization

- **COPY-21 — What may truncate.** MUST: only user content truncates (titles, names, descriptions); never labels, buttons, headings, help or error text (mechanics: see typography.md); file names and IDs truncate in the middle so the extension or the last 4 characters stay. Check: a 120-character title neither breaks the layout nor hides the extension.
- **COPY-22 — Sentence case.** MUST: sentence case on headings, buttons, labels, nav and tabs; capitals only for names of people, places and products. AVOID all caps for labels (tracked eyebrow: see anti-patterns.md). Check: grep `text-transform: uppercase` and Title Case button labels.

## Content honesty

- **COPY-23 — Real copy or bracketed placeholders.** MUST: real draft copy, never lorem ipsum; an unknown fact (price, date, address, name) becomes a bracketed placeholder ("[PRICE]", "[FOUNDER NAME]") that is visibly unfinished. Check: grep "lorem", "ipsum"; every unknown appears in brackets.
- **COPY-24 — Never fabricate.** NEVER invent testimonials, customer logos, metrics, ratings, team members or press quotes; use the user's material or a bracketed placeholder. Check: every number and quote traces to the brief or wears brackets.
- **COPY-25 — Concrete claims, no filler.** MUST: every claim states a number, a noun or a verb the user performs ("Reports in 15 minutes", not "Powerful reporting"); filler adjectives and "Welcome to" openers are rewritten (word list: see ANTI-42). Check: grep the ANTI-42 list; each heading and CTA names a concrete thing.

## Internationalization

- **COPY-26 — Room to expand.** MUST: text containers accept +30–50 % length (no fixed widths on buttons, nav, labels; `min-width` at most). Check: a label at 1.5× length neither overflows nor wraps a button to two lines.
- **COPY-27 — Whole strings.** MUST: one full sentence per string with named variables; plurals through ICU or `Intl.PluralRules`. NEVER concatenate fragments ("Deleted " + n + " files") or hard-code plurals with "(s)". Check: grep for `+ "` in copy and for "(s)".
- **COPY-28 — Language names, no flags.** MUST: language selectors show each language in its own name ("Deutsch", "日本語"), never flags; text in images and `translate="no"`: see accessibility.md. Check: the language menu contains no flag icons.
- **COPY-29 — RTL-safe.** MUST: logical properties (`margin-inline-start`, `padding-inline`, `text-align: start`); under `[dir="rtl"]` mirror arrows, chevrons, back/forward and progress direction; never mirror checkmarks, clocks, media controls or logos. Check: set `dir="rtl"` on `<html>`; layout mirrors, chevrons flip, the checkmark does not.

## Text accessibility

- **COPY-30 — Meaningful link text.** MUST: link text describes the destination ("View pricing plans", "Download the PDF (2 MB)"); never "click here", "here" or "read more" alone; identical link text never points to two targets on one page (alt text: see accessibility.md). Check: list all links on a page out of context; each makes sense alone.

## Quick check

- COPY-01 · Plain, specific, active
- COPY-02 · Interface voice, not a person
- COPY-05 · Verb + object
- COPY-06 · Same word through the flow
- COPY-08 · Specific headings
- COPY-09 · Placeholders and help text
- COPY-10 · Error formula
- COPY-11 · No codes, no jargon
- COPY-13 · Empty state copy
- COPY-14 · Name the object and consequence
- COPY-15 · Success in past tense
- COPY-18 · Dates and times
- COPY-21 · What may truncate
- COPY-22 · Sentence case
- COPY-23 · Real copy or bracketed placeholders
- COPY-25 · Concrete claims, no filler
- COPY-27 · Whole strings
- COPY-30 · Meaningful link text
- COPY-31 · Field labels
