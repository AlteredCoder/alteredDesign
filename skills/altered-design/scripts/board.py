#!/usr/bin/env python3
"""Build a project-aware, offline direction board from a validated reference catalog."""
import argparse
from html import escape
import json
import os
from pathlib import Path
from urllib.parse import quote

from gallery import ROOT, read_catalog, select

APP_CATALOG = ROOT / 'assets/app-references/catalog.json'
TEMPLATE = ROOT / 'assets/direction-board'


def build_board(data, output, assets, context=None, lang='en'):
    context = context or {}
    words = {
        'en': ['Visual directions', 'Find a visual direction.', 'Explore the references, then choose the details to carry into the design.', 'directions', 'sourced images', 'Combinations welcome', 'See the references', 'Back to all directions', 'Source', 'Open image', 'Example application', 'What to watch', 'Show', 'All directions', 'Click an image to open it at full size in a new tab.', 'These are visual references, not audited usability examples. Concepts, kits, native apps and historic images are labeled. The catalog is open-ended.', 'Checked', 'Original design dates vary. Rights remain with the credited creators.', 'Skip to directions'],
        'fr': ['Directions visuelles', 'Une autre personnalité pour votre interface.', 'Explore les références, puis choisis les détails à reprendre dans le design.', 'directions', 'images sourcées', 'Combinaisons possibles', 'Voir les références', 'Toutes les directions', 'Source', 'Agrandir', 'Exemple d’application', 'Point à maîtriser', 'Afficher', 'Toutes les directions', 'Cliquer sur une image l’ouvre en grand dans un nouvel onglet.', 'Ces images sont des références visuelles, pas des exemples UX audités. Concepts, kits, applications natives et références historiques sont identifiés. Le catalogue reste ouvert.', 'Vérifié le', 'Les dates des créations varient. Les droits restent aux créateurs crédités.', 'Aller aux directions']
    }[lang]
    esc = lambda s: escape(str(s), quote=True)
    path = lambda f: quote(os.path.relpath(assets / f, output.parent), safe='/')
    overview, sections, options = [], [], []
    for index, d in enumerate(data['directions']):
        letter = chr(65 + index) if index < 26 else str(index + 1)
        ident, title = esc(d['id']), esc(d['title'])
        overview.append(f'<a class="option" href="#{ident}" data-jump="{ident}"><div class="thumb"><img src="{path(d["examples"][0]["file"])}" alt=""></div><div class="option-copy"><span class="letter">{letter}</span><div><strong>{title}</strong><span>{esc(d.get("tag", d["summary"]))}</span></div><span class="arrow" aria-hidden="true">↗</span></div><span class="sr-only">{words[6]}</span></a>')
        options.append(f'<option value="{ident}">{letter} · {title}</option>')
        figures = []
        for e in d['examples']:
            figures.append(f'<figure><a class="image-link" href="{path(e["file"])}" target="_blank" rel="noopener" aria-label="{words[9]}: {esc(e["title"])}"><img data-example src="{path(e["file"])}" alt="{esc(e["alt"])}"><span class="zoom">{words[9]} ↗</span></a><figcaption><span class="kind">{esc(e["kind"])}</span><h3>{esc(e["title"])}</h3><p class="credit">{esc(e["credit"])} · <a href="{esc(e["source_url"])}" target="_blank" rel="noopener noreferrer">{words[8]} ↗</a></p><p>{esc(e["note"])}</p></figcaption></figure>')
        application = context.get('applications', {}).get(d['id'], d.get('application'))
        translation = f'<div><h3>{esc(context.get("application_label", words[10]))}</h3><p>{esc(application)}</p></div>' if application else ''
        sections.append(f'<section class="direction" id="{ident}" aria-labelledby="title-{ident}"><header class="direction-head"><div><span class="eyebrow">{letter} · {esc(d.get("tag", ""))}</span><h2 id="title-{ident}" tabindex="-1">{title}</h2><p>{esc(d["summary"])}</p></div><a class="back" href="#overview">{words[7]} ↑</a></header><div class="examples">{"".join(figures)}</div><div class="translation">{translation}<div><h3>{words[11]}</h3><p>{esc(d["watch_for"])}</p></div></div></section>')
    retained = ''.join(f'<aside class="tabs-note"><h2>{esc(item["title"])}</h2><p>{esc(item["description"])}</p></aside>' for item in context.get('retained', []))
    count = sum(len(d['examples']) for d in data['directions'])
    css, js = (TEMPLATE / 'board.css').read_text(), (TEMPLATE / 'board.js').read_text()
    project = esc(context.get('project', 'altered-design'))
    title = esc(context.get('title', words[1]))
    intro = esc(context.get('intro', words[2]))
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{project} — {words[0]}</title><style>{css}</style></head><body>
<a class="skip" href="#overview">{words[18]}</a><main class="wrap"><div class="masthead"><span class="brand">{project}</span><span>{words[0]} · {esc(data['checked_at'])}</span></div>
<header class="intro"><span class="eyebrow">{esc(context.get('eyebrow', words[0]))}</span><h1>{title}</h1><p>{intro}</p><div class="facts"><span>{len(data['directions'])} {words[3]}</span><span>{count} {words[4]}</span><span>{words[5]}</span></div></header>
<nav class="overview" id="overview" aria-label="{words[0]}">{''.join(overview)}</nav>{retained}
<div class="board-tools"><label for="direction-filter">{words[12]}</label><select id="direction-filter"><option value="all">{words[13]}</option>{''.join(options)}</select><p>{words[14]}</p></div>
<div id="references">{''.join(sections)}</div><footer><p>{words[15]}</p><p>{words[16]} {esc(data['checked_at'])}. {words[17]}</p><p>{esc(context.get('closing', ''))}</p></footer></main><script>{js}</script></body></html>''', encoding='utf-8')
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--catalog', type=Path, default=APP_CATALOG)
    parser.add_argument('--context', type=Path, help='JSON with project copy, retained constraints and applications by direction ID')
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--direction', action='append')
    parser.add_argument('--lang', choices=['en', 'fr'], default='en')
    args = parser.parse_args()
    try:
        data = read_catalog(args.catalog.resolve())
        data['directions'] = select(data, args.direction)
        context = json.loads(args.context.read_text()) if args.context else {}
        print(build_board(data, args.output.resolve(), args.catalog.resolve().parent, context, args.lang))
    except (ValueError, OSError, KeyError, TypeError) as exc:
        parser.exit(1, f'Board error: {exc}\n')


if __name__ == '__main__':
    main()
