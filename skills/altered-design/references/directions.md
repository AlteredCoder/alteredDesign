# Visual directions and sourced examples

**Load when:** the user asks to see looks, compare styles or choose an open direction.
**Owns:** style catalog, visual presentation, attribution and reference maintenance.
**Defaults:** two examples per direction; illustrated overview for browsing, a relevant
shortlist for a focused comparison. This is a curated vocabulary, not an exhaustive taxonomy or a claim that all
examples were designed in 2026. Grouping overlapping styles is an editorial judgment.

## Catalog

The ledger is `assets/visual-references/catalog.json`, relative to the skill root. It
contains stable IDs, aliases, source-page and image URLs, credits, example type, local
files, dimensions, checksums and the date checked. The complete offline gallery is
[gallery.html](../assets/visual-references/gallery.html). The images are real sourced
examples; they are not newly generated mockups. A concept or template is labeled as such.

| Direction ID | Name | Examples | Distinguishing properties |
|---|---|---|---|
| `quiet-minimal` | Quiet / minimalist | Ruul; Laurenz Marsau | Restrained decoration, strong type, open space |
| `liquid-glass` | Liquid Glass | Apple Music; Apple lock screen | Translucent controls, reflected edges, layered materials |
| `warm-organic` | Warm / organic | Gormley & Gamble; Anthropic | Earthy neutrals, soft shapes, human visual character |
| `editorial` | Editorial / typography-led | Vertical by Tamas Bodo; CASA NERO by Elux Space | Type contrast, directed photography, varied section rhythm |
| `expressive` | Expressive / playful | Material 3 Expressive; Tesoro | Confident color, distinctive shapes, visible emphasis |
| `tactile` | Tactile / handcrafted | Dopple Press; Rootly | Print texture, illustration, painted or handmade treatment |
| `brutalist` | Brutalist / utilitarian | Pencil; Isshī | Raw type and unconventional structure; includes anti-design variants |
| `retro` | Retro / nostalgic | Ryan Haskins; Wix's VayCay concept | Period lettering, early-web references, nostalgic palettes |
| `immersive` | Immersive / spatial | Lennnie; Flim | Scene navigation and expansive image canvases |

Quiet and minimalist are grouped for discovery, not treated as synonyms. Liquid Glass
is a material that can coexist with a minimalist composition. Bento is a layout pattern;
light/dark is a theme; density and motion are separate decisions. Mix these dimensions
when the user asks, and keep the resulting direction coherent. Custom references and
preserving the existing identity remain available outside the catalog.

## Show the images

- **DIR-01 — Visual comparison.** MUST: when direction is open, show relevant directions with actual images before asking for a choice. Use the illustrated overview for broad browsing and expand it when requested; a shortlist is not a capability limit. For a named style, show its examples directly. Check: users can view and enlarge images, not only names or search links.
- **DIR-02 — Match the context.** SHOULD: select references relevant to the surface and task; explicitly identify native platform examples when adapting their appearance to the web. Check: do not promise that web CSS reproduces native Liquid Glass behavior.
- **DIR-03 — Inspect before presenting.** MUST: open selected local images with the available image viewer and check their visual fit; a search label or thumbnail caption is not verification. Check: descriptions reflect the actual image and identify concepts, templates and platform examples honestly.
- **DIR-04 — Present with provenance.** MUST: show each image with its title, source-page link, creator or publisher credit, and a short description of the properties worth borrowing. Use the host's image display, Markdown images or the offline gallery. If inline images are unavailable, state the limitation and supply working gallery and source links. Check: do not claim images were displayed when only URLs were emitted.
- **DIR-05 — Translate the choice.** MUST: after selection, record the direction and example IDs or URLs, plus concrete type, color, composition, density, material and motion decisions. References guide visual execution; they do not certify usability or accessibility. Check: a style name alone is not the implementation brief.
- **DIR-06 — Refresh broken references.** MUST: prefer bundled images for reliable presentation. When files or metadata fail validation, inspect the linked source and find a replacement of the same direction if needed. Verify image content, attribution and local decoding before adding it. Check: use real current URLs; do not invent image paths, claim unavailable images were seen or misdate old examples from article titles.
- **DIR-07 — Keep inspiration scoped.** MUST: retain credits and treat gallery images as references, without silently reusing their brands, copy or imagery as production assets. Check: source-fidelity.md governs asset selection for the actual project.
- **DIR-08 — Choice without repeated gates.** MUST: honor a chosen style or source immediately. A styles-only request does not edit the project. For an already requested build, resume after selection without repeating the question. Check: preserve prior answers and any pending choice; lack of response is not a selection.

## Commands

### Reusable comparison board

Use the format in [app gallery](../assets/app-references/gallery.html) for app direction
discovery: thumbnail overview, full-image links, provenance, application ideas and
tradeoffs. The app pack has nine non-minimalist proposals and eighteen inspected
references. The general pack above remains available, including quiet / minimalist.
App-pack groupings differ from the general vocabulary: a spatial resource canvas and
an immersive website are related ideas, not interchangeable interaction models.

```sh
python3 <skill-dir>/scripts/board.py --output <scratch>/directions.html --lang fr
python3 <skill-dir>/scripts/board.py --catalog <catalog.json> --context <context.json> --output <scratch>/directions.html
python3 <skill-dir>/scripts/gallery.py --catalog <skill-dir>/assets/app-references/catalog.json --check
```

`--catalog` defaults to the app pack; it accepts the same validated version-1 schema as
`gallery.py`. Use the general pack path for websites or a curated project catalog.
The generated HTML embeds its CSS/JS and references images relative to the catalog;
keep the catalog images available when moving or sharing a board. It works from any cwd.
Use `--lang en` or `fr`; customize project copy through optional JSON context:

```json
{
  "project": "Project name",
  "title": "Choose a direction for this workspace",
  "intro": "Compare the references and their implications for your project.",
  "application_label": "What this means for our app",
  "applications": {"spatial": "Group resources on a canvas, with a searchable list."},
  "retained": [{"title": "Keep the document tabs", "description": "Views stay open and preserve their state."}],
  "closing": "Choose a direction or describe a combination."
}
```

Context is optional. Populate retained constraints from the user's actual requirements;
document tabs are an example, not a default requirement for every app. Bundled application
ideas illustrate a resource workspace: rewrite them for a different product using
`applications`. Do not silently impose bookmark triage, tabs or a canvas on other briefs.
Generate exploratory boards in scratch space for styles-only requests; place them in an
authorized artifact directory when they are part of a requested build. This visual format
does not authorize implementation until the style is selected or the user delegates it.

### Selector and integrity checks

Resolve the skill directory from the installation location, not the user's project cwd.
The helper is Python standard-library only, makes no network requests, and supports
repeated `--direction` arguments for comparisons. Local image files ship with the skill.

```sh
python3 <skill-dir>/scripts/gallery.py --list
python3 <skill-dir>/scripts/gallery.py --direction liquid-glass
python3 <skill-dir>/scripts/gallery.py --direction warm --direction editorial
python3 <skill-dir>/scripts/gallery.py --direction minimalist --format json
python3 <skill-dir>/scripts/gallery.py --check
python3 <skill-dir>/scripts/gallery.py --build
```

Default output contains Markdown image embeds and source credits. JSON gives the ledger
entries for hosts with image tools. `--build` regenerates the bundled HTML gallery; it is
not needed merely to show it. The gallery opens directly in a browser without a server
and has a style filter and full-image links. For chat, display only selected examples
rather than flooding the conversation with all eighteen images.

## Research basis

The September 2026 collection draws on [Webflow's 2026 design coverage](https://webflow.com/blog/web-design-trends-2026),
[Wix's 2026 coverage](https://www.wix.com/blog/web-design-trends),
[Apple's Liquid Glass introduction](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/),
[Google's expressive-design research](https://design.google/library/expressive-material-design-google-research),
and the credited designers' original preview pages. Article publication dates and
example design dates are separate; Apple and Google's cited platform work predates 2026.
For applying glass, consult [Apple's material guidance](https://developer.apple.com/design/human-interface-guidelines/materials).
The style catalog is open-ended: research additional directions when requested instead
of forcing every brief into one of these nine groups.

## Quick check

- DIR-01 · actual images available before a choice
- DIR-03 · examples inspected and labeled
- DIR-04 · source credits and a usable display path
- DIR-05 · selected look translated into concrete decisions
- DIR-06 · broken references handled honestly
- DIR-08 · no project edits for a styles-only request
