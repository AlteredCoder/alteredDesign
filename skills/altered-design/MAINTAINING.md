# Maintaining altered-design

Improve the reliability of the workflow and the quality of its evidence. Rule count is
not a success metric. Read `SKILL.md` for precedence and `references/quality.md` for
the distinction between requirements, contextual heuristics and visual choices.

## Structure

| File | Role |
|---|---|
| `SKILL.md` | Routing, precedence, core commitments and reference map |
| `modes/*.md` | Procedures and selective reading; no new rule definitions |
| `references/*.md` | Topic guidance with stable IDs |
| `references/quality.md` | Evidence admission, applicability and checked source comparisons |
| `references/craft.md` | Polish defaults imported from better-ui and emil-design-eng, calm product recipe |
| `assets/visual-references/catalog.json` | Image provenance, style grouping and local file ledger |
| `assets/visual-references/gallery.html` | Generated offline gallery |
| `scripts/gallery.py` | Select, validate and render image references |
| `scripts/board.py` | Generate a comparison board with optional project context |
| `assets/app-references/` | Inspected app examples, catalog and generated board |
| `assets/direction-board/` | Shared board presentation and interaction assets |
| `scripts/lint.py` | Mechanical consistency check |
| `CHANGELOG.md` | Changes and validation, newest first |

Keep each topic in its owning reference. Point to an existing rule instead of repeating
it. Load references when needed rather than requiring the entire library on every task.

## Evidence before rules

1. State the observed problem, audience, app platform and task. A different aesthetic,
   partial grid row or intentional blank area is not inherently a defect.
2. Search with `rg` for existing coverage. Fix a misleading rule or workflow before
   adding another rule. Do not promote a missed preference into a universal ban.
3. Classify the proposed guidance: specification requirement, corroborated usability
   heuristic, platform convention, project convention, or visual preference.
4. Read current primary documentation. Verify the version, applicability and published
   update date where available; a recent article date is not proof of current advice.
5. Cross-check a general recommendation with an independent maintained design system or
   applicable standard. Do not count syndicated summaries as independent evidence.
   For normative requirements, the applicable specification is authoritative; preserve
   its exceptions and distinguish informative techniques from requirements.
6. Record exact source links, date checked, context, disagreements and the decision in
   the owning reference or quality evidence table. Keep platform units distinct. Reject
   outdated guidance and unsupported absolutes; mark unverified recipes optional.
7. Verify the proposed change on the actual task. Explain the measurable behavior or
   observed composition problem it improves. Do not claim that lint proves usability.

When sources disagree, resolve the difference by scope, standard authority and task
evidence. Do not average their numbers or declare the newest source universally right.
Inspiration websites and trend roundups supply visual references, not UX requirements.

## Rule format and IDs

```text
- **LAY-04 — Example title.** SHOULD: state a contextual recommendation. Check: describe an observable result.
```

Use the owning prefix from `scripts/lint.py`. Keep IDs stable; do not renumber them.
New IDs use the next free number. If removing a rule, record its ID and reason in the
changelog and update the sequence check to recognize retired IDs before removal.

`MUST` and `NEVER` require a supported requirement or explicit project constraint.
`SHOULD` is contextual advice. `AVOID` needs the condition that makes the practice
undesirable. Old severity words do not bypass QLT-09 through QLT-11.

State conditions and an observable check. Numeric thresholds need a source or an explicit
label as a project recipe. Do not replace useful context with arbitrary numbers just
to satisfy the linter. Avoid vague adjectives, second person and filler in rules.

Keep the core list at most 20 entries and the entry point below about 2,500 words.
Size budgets: SKILL 16 KB; layout 20 KB; components 22 KB; other references 16 KB;
modes 6 KB. Update the reference map and linter when adding a topic file.

## Maintaining the visual gallery

Keep two or three inspected examples per direction. Confirm each image actually shows
the named direction. Record the original page and image URLs, creator or publisher,
example type, useful visual details, descriptive alt text and date checked. Distinguish
published apps/sites, native platform samples, templates and concepts.

Store originals with a supported image extension, real dimensions and SHA-256 checksum
in the catalog. Keep credits with images. Reference inclusion does not grant production
reuse rights. Do not describe an image as an audited UX example without auditing it.

Run `scripts/gallery.py --check`, then `--build`. Inspect the HTML at narrow, intermediate
and wide widths; verify images, filter, full-image links and keyboard access. Do not edit
generated HTML directly. Refresh broken or misattributed references; do not silently
substitute generated images for real examples. The checker verifies local integrity,
not external URL availability or the correctness of visual descriptions.

Validate both catalogs after shared renderer changes. Rebuild the app board with
`scripts/board.py --output assets/app-references/gallery.html --lang fr`. Check custom
context escaping, relative image paths from another cwd, filtering and full-image links.
Keep project-specific constraints in context JSON, not universal skill instructions.

## Validation and changelog

From the repository root:

```sh
python3 skills/altered-design/scripts/lint.py
python3 skills/altered-design/scripts/gallery.py --check
```

Review affected workflows using realistic requests: show styles without editing a
project; recreate a website without inventing a new identity; honor a chosen direction;
review without edits; make a small fix without a full design-system interview.

For every batch, inspect conflicting advice, broken references and unsupported claims.
Run behavior checks for changed scripts and browser checks for changed gallery behavior.
Report limits honestly: source review is not user testing, format checks are not an
execution evaluation, and automated accessibility scans are not full conformance audits.

Log the touched IDs, resulting behavior, supporting evidence and actual validation in
`CHANGELOG.md`. Preserve historical entries as history, not current instructions.
Semantic versions: patch for wording and checks; minor for compatible additions; major
for changed precedence, routing or removed behavior.
