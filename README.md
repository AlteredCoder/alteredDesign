# altered-design

A web design skill that helps users choose a visual direction, builds to that direction,
and checks usability and implementation quality separately from taste.

## Choose with images

The skill includes two reference packs and a reusable comparison board:

- [App and dashboard board](skills/altered-design/assets/app-references/gallery.html):
  nine alternatives to minimalism, eighteen images, thumbnail overview, enlarged views,
  application ideas and tradeoffs.
- [General website gallery](skills/altered-design/assets/visual-references/gallery.html):
  nine directions, including quiet / minimalist, with eighteen images.

Both work offline after cloning. The board format can be personalized with project copy,
retained interactions and an explanation of what each direction means for the target app.
On GitHub, download or open the local HTML file; GitHub's code viewer does not run it.

| Direction | Examples |
|---|---|
| Quiet / minimalist | Ruul, Laurenz Marsau |
| Liquid Glass | Apple Music, Apple lock-screen material |
| Warm / organic | Gormley & Gamble, Anthropic |
| Editorial / typography-led | Vertical by Tamas Bodo, CASA NERO by Elux Space |
| Expressive / playful | Google Material 3 Expressive, Tesoro |
| Tactile / handcrafted | Dopple Press, Rootly |
| Brutalist / utilitarian | Pencil, Isshī |
| Retro / nostalgic | Ryan Haskins, Wix's VayCay visual concept |
| Immersive / spatial | Lennnie, Flim |

These are broad, overlapping directions. Glass is a material, bento is a layout pattern,
and light/dark, density and motion are independent choices. Custom references and keeping
an existing site's identity are always options.

```
/altered-design styles
/altered-design styles liquid glass
/altered-design styles compare warm and editorial
/altered-design new recreate this website as an HTML mockup: <URL>
/altered-design improve redesign the dashboard with a quiet visual direction
/altered-design add a Team members screen next to Billing
/altered-design improve the companies table reads loud and busy, make it calm
/altered-design review /orders
/altered-design system
```

For broad browsing, the skill shows an illustrated overview. A focused shortlist is a
convenience, not a limit; users can explore more directions or combinations. For a
named direction, it shows that direction's examples. Each image has a source link,
creator or publisher credit, a type label, and an explanation of what to borrow.
Images can appear in chat when the host supports them; otherwise the skill provides the
local gallery and source links and states that inline display is unavailable.

The [catalog ledger](skills/altered-design/assets/visual-references/catalog.json) records
sources, local files, dimensions, checksums and the date checked. Examples were checked
on September 9, 2026; not every design originated in 2026. Templates, concepts and platform
examples are labeled. Images are for reference viewing with attribution; their inclusion
does not grant a license to use another creator's assets in a production website.

## What quality means

The skill distinguishes three kinds of guidance:

- **Testable requirements:** applicable accessibility criteria, working interactions,
  readable content, no unintended clipping, and relevant error and recovery behavior.
- **Contextual usability principles:** hierarchy, grouping, density, navigation and
  consistency, judged against the audience and task.
- **Visual choices:** fonts, colors, materials, radii, imagery and composition, governed
  by the user's selected direction or reference.

There is no banned-font list or blanket ban on gradients, glass, textures, asymmetry or
intentional whitespace. Numeric recipes are defaults, not universal quality tests.
A partial grid row does not justify removing real records or inventing content.

Internet advice passes an evidence check before becoming a rule: current primary
documentation, an independent cross-check for general recommendations, and an explicit
decision about conflicts and platform scope. The [checked decisions](skills/altered-design/references/quality.md)
cover target sizes, disabled actions, notification timing, glass and browser support.
Older principles are retained only when still applicable to current apps. Unverified
inherited recipes remain optional and require validation before enforcement.

Polish is treated as a separate pass after composition and content are right. The
[craft reference](skills/altered-design/references/craft.md) imports the execution details
from [better-ui](https://github.com/jakubkrehel/skills/tree/main/skills/better-ui) by Jakub
Krehel and [emil-design-eng](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng)
by Emil Kowalski (both MIT): concentric radii, optical alignment, ring shadows for depth,
icon stroke matched to text weight, press feedback, icon cross-fades, a motion frequency
budget and theme switching without a smear. It also carries a calm product recipe, which
is the default execution for dashboards and work tools when no reference is supplied.
Where the two sources disagree with each other or with Carbon and Material 3, the
resolution and its scope are recorded in the quality reference and the changelog.

The accessibility target defaults to WCAG 2.2 AA. The skill records the checks actually
performed; screenshots, automated scans and spot-checks do not establish full conformance
or replace testing with users.

## Existing websites and mockups

The skill establishes whether a reference is for recreation, redesign or inspiration.
An empty local repository does not make an existing website aesthetically open.

For recreation, it visually inspects the source, identifies defining fonts, imagery,
proportions, colors and components, then compares the output at the same viewport. It
corrects large composition and asset mismatches before smaller details. Missing source
access and substituted assets are reported.

Verification follows the requested deliverable: an image gets visual checks; a prototype
also gets checks of represented interactions; production UI gets relevant real states and
behavior checks. A one-off mockup does not require a DESIGN.md interview.

## Modes

| Mode | Purpose | Changes target project |
|---|---|---|
| `styles` | View examples and choose a direction | No |
| `new` | Build a new local surface or recreate an external site | Requested output |
| `add` | Extend existing UI in its established system | Yes |
| `improve` | Fix or redesign within the requested scope | Yes |
| `review` | Report findings with evidence | No |
| `system` | Create or refresh reusable design documentation | DESIGN.md only |

Existing DESIGN.md decisions are reused and updated when relevant. Missing documentation
alone is not a UI defect. Requested redesigns can revise visual decisions within scope.

## Install

For a single Claude Code project, copy `skills/altered-design` into
`<project>/.claude/skills/altered-design`. For development, link this checkout:

```sh
ln -s /absolute/path/to/alteredDesign/skills/altered-design ~/.claude/skills/altered-design
```

A marketplace manifest is included for packaging. Replace the repository owner placeholder
when publishing a marketplace listing:

```
/plugin marketplace add <owner>/alteredDesign
/plugin install altered-design@altered-design
```

Other agents can read [SKILL.md](skills/altered-design/SKILL.md). Browser verification uses
whatever compatible browser automation and image viewer the host provides. The bundled
gallery helper needs only Python 3 and makes no network requests.

## Gallery helper and checks

Run these from the repository root; from another working directory use absolute paths:

```sh
python3 skills/altered-design/scripts/gallery.py --list
python3 skills/altered-design/scripts/gallery.py --direction glass
python3 skills/altered-design/scripts/gallery.py --direction warm --direction editorial
python3 skills/altered-design/scripts/gallery.py --direction minimalist --format json
python3 skills/altered-design/scripts/gallery.py --check
python3 skills/altered-design/scripts/gallery.py --build
python3 skills/altered-design/scripts/board.py --output /tmp/app-directions.html --lang fr
python3 skills/altered-design/scripts/gallery.py --catalog skills/altered-design/assets/app-references/catalog.json --check
python3 skills/altered-design/scripts/lint.py
```

Default output is Markdown with image embeds and source credits. JSON supports hosts with
image-display tools. The HTML gallery is already built; rebuilding is only needed after
catalog changes. The helper verifies bundled file integrity before use. It does not test
whether external websites are still online.

The [board context format](skills/altered-design/references/directions.md) lets a caller
add project-specific requirements and translations without hardcoding one product into
the skill. Use `--context project.json`, `--catalog catalog.json` and `--lang en|fr`.
Generated boards link to catalog images by relative paths; keep those images available
when moving a board. No server, CDN or JavaScript package installation is needed.

## Structure and maintenance

[SKILL.md](skills/altered-design/SKILL.md) routes work. Mode procedures load only relevant
topic references. [quality.md](skills/altered-design/references/quality.md) separates
requirements from heuristics and preferences; [directions.md](skills/altered-design/references/directions.md)
handles visual choice; [source-fidelity.md](skills/altered-design/references/source-fidelity.md)
handles existing-site comparison. Detailed references cover layout, type, color, components,
accessibility, motion, copy and task patterns.

Follow [MAINTAINING.md](skills/altered-design/MAINTAINING.md) when editing. Rule IDs remain
stable, but the count is not a quality score. Prefer correcting a misleading instruction
or workflow over adding more universal rules. Run the lint and gallery integrity checks,
and visually verify gallery changes in a browser.

## Research and attribution

The gallery sources are [Webflow's 2026 design coverage](https://webflow.com/blog/web-design-trends-2026),
[Wix's 2026 coverage](https://www.wix.com/blog/web-design-trends),
[Apple's Liquid Glass introduction](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/),
[Google's expressive-design research](https://design.google/library/expressive-material-design-google-research),
and the original designer pages credited in the ledger. Style grouping is this skill's
editorial interpretation. Quality guidance uses [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
and [NN/g's usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).
Earlier merged sources and decisions remain documented in the changelog.

## License

Repository license remains to be decided by the owner. Third-party reference images
retain their original rights and credits.
