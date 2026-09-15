# Intake

Governs what to ask the user, when and how, and the Design Brief written before any code.
**Load when:** the start of `new`, `add`, `improve` and `review`; the qualitative batch of `system`; any moment a question to the user is about to be asked.
**Owns:** what to ask the user, when, how; the Design Brief format; direction options; handover format. Everything else is referenced by topic or ID.
**Defaults:**
- ≤ 4 questions per batch; 1 batch by default, 2 at most.
- AskUserQuestion when available: 2 to 4 options per question, recommended option first, labeled "(recommended)".
- Hypotheses drawn from the repo before open questions; ask only what is missing AND material.
- Honor existing design decisions unless the user requests a new direction.
- Unable to ask: commit to one direction, continue, list every assumption in the handover.
- Check for every rule in this file: the transcript shows the question batch, the brief and the handover block in that order, each within the limits stated.

## Asking rules

- **INT-01 — Batch size.** MUST: ask at most 4 questions per batch; run one batch by default and a second only when a first-batch answer leaves a gap that changes a design decision, or for the visual direction choice (INT-17). Check: count questions per AskUserQuestion call.
- **INT-02 — Available question tool.** SHOULD: use the host's question tool when available, respecting its limits; otherwise ask a concise question in chat. Keep independent work moving while a material choice is pending.
- **INT-03 — Hypothesis over blank.** SHOULD: phrase each question as a hypothesis from the repo ("Reads as product register, 3 surfaces under /app. Confirm?") rather than an open field. Why: a confirmation costs one word; an open question returns adjectives.
- **INT-04 — Material gaps only.** MUST: ask only about facts that are (a) absent from the repo, the prompt and DESIGN.md and (b) flip a design decision. Check: name the decision that changes with each answer; no decision, no question.
- **INT-05 — Reuse settled decisions.** MUST: read existing design decisions instead of asking again. A requested redesign may revisit them; the existence of DESIGN.md does not prohibit a new direction.
- **INT-06 — Commit when asking is impossible.** MUST: with no human in the loop, or an instruction not to ask, choose one direction from the available signals (brand assets, nearest screens, task cue, register), proceed, and list each assumption in the handover (INT-27).
- **INT-07 — No re-asking.** MUST: once register, direction or brief is confirmed, never ask again in the session; treat later corrections as overrides.

## Infer before asking

- **INT-08 — Inspect available evidence.** MUST: read relevant project context, styles, nearest screens and assets before asking; visually inspect supplied sites or screenshots using source-fidelity.md. Check: name actual sources without inventing missing files or claiming a URL text scrape was visual inspection.
- **INT-09 — Register hypothesis.** MUST: form a register hypothesis before asking. Brand signals: `/`, `/pricing`, `/about`, `/blog/*`, hero sections, display type, scroll-driven sections. Product signals: `/app/*`, `/dashboard`, `/settings`, `(auth)`, tables, forms, sidebar or app shell. Decide by first match: task cue ("landing page" vs "dashboard"), then the surface in focus, then the DESIGN.md Register line. Split signal: ask which register the target surface is.
- **INT-10 — Name what must match.** MUST: in additions and polish, name the nearest screen and reuse its values; in recreation, the supplied source is the contract; in redesign, name retained and changed properties.
- **INT-11 — Content inventory.** SHOULD: before asking about content, list what exists in the repo (copy, fixtures, images, API shapes) so the question reads "real data exists for X; placeholders needed for Y. Confirm?".

## Question bank by mode

Tags: [required] ask unless inferred; [missing] ask only when the repo and prompt leave it open.

- **INT-12 — New-work context.** MUST: establish audience and task, requested surfaces, output format and fidelity, reference role, content availability and constraints. Infer existing answers; ask only for material gaps. With visual direction open, use INT-17; an anti-reference is optional.
- **INT-13 — `add` questions.** MUST cover, in one batch: (1) where it lives: route, navigation entry, parent screen [required]; (2) flow in and out: what precedes it, where the user goes after [required]; (3) data shown: fields, realistic ranges (0, 1, typical, max), which are editable [required]; (4) screen to match (INT-10), proposed as a hypothesis [required]; (5) states: which of empty, loading, error, success, no-permission apply [missing].
- **INT-14 — Improvement context.** MUST: establish the reported symptom, scope, preservation constraints and success criteria. Infer scope from the request; a requested full redesign permits visual changes. Do not force a targeted scope onto an explicit redesign.
- **INT-15 — `review` questions.** SHOULD cover: (1) scope: surfaces or routes [required when the target is empty]; (2) widths beyond 375/768/1440 (verification.md) [missing]; (3) depth: quick (P0/P1, one surface) or full (all severities, every state); default full [missing]; (4) format: chat report (default) or file [missing]. Skip the batch when the target names one route: assume full depth, default widths, chat.
- **INT-16 — System context.** SHOULD: derive established values from source. Ask only for unresolved product goals or visual choices needed for the requested document; do not require metaphors, voice words or anti-references.

## Direction options

- **INT-17 — Offer visual directions.** MUST: for either register, when the visual direction is open, show two or three relevant options with sourced example images through directions.md. Honor a specified style or reference; do not restart selection. Keep a pending user choice pending unless autonomous selection was authorized.
- **INT-18 — Direction card.** MUST: each option has a stable name, two or three example images, source credits, the specific properties to borrow and one task-relevant tradeoff. Propose options that differ in composition or material as well as palette.
- **INT-19 — Respect choice.** MUST: permit every catalog direction, custom references, combinations and preserving the existing look. Do not reject a palette, font or direction because another project used it.
- **INT-20 — Show visual evidence.** SHOULD: use inspected reference images to choose a direction; words and wireframes supplement images. Do not build multiple full pages merely to ask for a style preference.
- **INT-21 — Stable names.** MUST: keep option names stable across turns and reuse the chosen name on the brief's Direction line.

## The Design Brief

- **INT-22 — Brief before building.** MUST: write a compact brief before implementation, proportional to scope. A material style choice can remain pending while source inspection continues. Do not require an extra approval because multiple surfaces are already authorized.

```
Design Brief
Task and audience: <who does what>
Deliverable: <image | static mockup | prototype | production UI>
Scope: <surfaces and boundaries>
Source role: <recreation | redesign | inspiration | none>
Direction: <selected name; example IDs or source URL>
Keep / change: <defining properties and requested differences>
Composition: <regions, proportions, type roles, assets and materials>
Content: <supplied, draft, unknown facts, substitutions>
States: <only those relevant to the deliverable>
Verify: <reference viewport, responsive widths, tasks and criteria>
Assumptions: <unresolved details>
```

- **INT-23 — Compact brief.** SHOULD: when the prompt and project already establish scope and direction, summarize only source role, direction, deliverable, defining decisions, applicable states and verification targets.
- **INT-24 — Useful layout plan.** SHOULD: describe region proportions, hierarchy and reading order; add a short wireframe when it clarifies structure. For recreation, measurements and source screenshots take priority over a generic grid sketch.
- **INT-25 — Reference check.** MUST: close the brief with the key properties to preserve from the source or chosen examples and the changes requested. Do not force differences from category conventions.
- **INT-26 — Scope stays in the brief.** MUST: fidelity, breadth and time intent live in the brief only; never write them to DESIGN.md.

## Handover format

- **INT-27 — Handover.** MUST: provide the artifact or changed files, key decisions, assumptions, substitutions or placeholders, verification evidence and unresolved findings. Keep the report proportional to the task.
- **INT-28 — Honest verification line.** NEVER: claim a screenshot, width or state was checked unless it was; with the browser fallback write "Screenshots not taken: <reason>".
- **INT-29 — Finish without a ritual question.** SHOULD: end with the delivered result and any material next step. Do not require another question or review mode when authorized work and relevant checks are complete.

## Quick check

- INT-01 · Batch size
- INT-04 · Material gaps only
- INT-05 · Reuse settled decisions
- INT-06 · Commit when asking is impossible
- INT-08 · Inspect available evidence
- INT-09 · Register hypothesis
- INT-10 · Name what must match
- INT-17 · Offer visual directions
- INT-19 · Respect choice
- INT-22 · Brief before building
- INT-24 · Useful layout plan
- INT-25 · Reference check
- INT-27 · Handover
- INT-28 · Honest verification line
