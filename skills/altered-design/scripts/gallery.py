#!/usr/bin/env python3
"""Show, validate, or rebuild the bundled reference gallery. No network or dependencies."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "visual-references"


def read_catalog(path=ASSETS / "catalog.json"):
    data = json.loads(path.read_text(encoding="utf-8"))
    validate(data, path.parent)
    return data


def validate(data, assets=ASSETS):
    if data.get("schema_version") != 1 or not data.get("directions"):
        raise ValueError("Expected a version 1 catalog with directions")
    ids, aliases, files, example_ids = set(), set(), set(), set()
    for direction in data["directions"]:
        key = direction["id"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", key) or key in ids:
            raise ValueError(f"Invalid or duplicate direction: {key}")
        ids.add(key)
        for alias in [key, *direction["aliases"]]:
            normalized = alias.strip().lower()
            if not normalized or normalized in aliases:
                raise ValueError(f"Duplicate or empty alias: {alias}")
            aliases.add(normalized)
        for field in ("title", "summary", "watch_for"):
            if not direction.get(field):
                raise ValueError(f"Missing {field}: {key}")
        examples = direction["examples"]
        if not 2 <= len(examples) <= 3:
            raise ValueError(f"Expected 2 or 3 examples: {key}")
        for example in examples:
            for field in ("id", "title", "credit", "kind", "note", "alt", "checked_at"):
                if not example.get(field):
                    raise ValueError(f"Missing example {field}: {key}")
            if example["id"] in example_ids:
                raise ValueError(f"Duplicate example ID: {example['id']}")
            example_ids.add(example["id"])
            for field in ("source_url", "image_url"):
                url = urlsplit(example[field])
                if url.scheme != "https" or not url.netloc or url.username or url.password:
                    raise ValueError(f"Invalid public source URL: {key}/{field}")
            project = example.get("project_url")
            if project and (urlsplit(project).scheme != "https" or not urlsplit(project).netloc):
                raise ValueError(f"Invalid project URL: {key}")
            path = (assets / example["file"]).resolve()
            if path.parent != assets.resolve() or path in files:
                raise ValueError(f"Invalid or duplicate local image: {path}")
            files.add(path)
            content = path.read_bytes()
            if hashlib.sha256(content).hexdigest() != example["sha256"]:
                raise ValueError(f"Image checksum mismatch: {path.name}")
            if not (content.startswith((b"\x89PNG\r\n\x1a\n", b"\xff\xd8\xff"))
                    or (content.startswith(b"RIFF") and content[8:12] == b"WEBP")):
                raise ValueError(f"Unsupported image content: {path.name}")
            if any(type(example.get(d)) is not int or example[d] < 1 for d in ("width", "height")):
                raise ValueError(f"Invalid dimensions: {path.name}")


def select(data, queries):
    if not queries:
        return data["directions"]
    found = []
    for query in queries:
        query = query.strip().lower()
        match = next((d for d in data["directions"] if query in
                      [d["id"], *(a.lower() for a in d["aliases"])]), None)
        if match is None:
            raise ValueError(f"Unknown direction '{query}'; use --list")
        if match not in found:
            found.append(match)
    return found


def markdown(directions, assets=ASSETS):
    parts = []
    for direction in directions:
        parts.extend([f"## {direction['title']}", "", direction["summary"], ""])
        for example in direction["examples"]:
            # The host can display these local files with its image viewer if Markdown
            # embedding is unsupported. Paths are absolute for installation portability.
            path = assets / example["file"]
            alt = example["alt"].replace("[", "(").replace("]", ")")
            parts.extend([f"![{alt}](<{path}>)", "",
                          f"**{example['title']}** · {example['kind']}", "",
                          example["note"], "",
                          f"[Source]({example['source_url']}) · {example['credit']}", ""])
        parts.extend([f"When applying this direction: {direction['watch_for']}", ""])
    return "\n".join(parts)


def build(data, output, assets=ASSETS):
    from board import build_board
    return build_board(data, output, assets)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    action = parser.add_mutually_exclusive_group()
    action.add_argument("--list", action="store_true", help="List direction names and aliases")
    action.add_argument("--check", action="store_true", help="Validate metadata and bundled image integrity")
    action.add_argument("--build", type=Path, nargs="?", const=Path("__catalog_gallery__"), metavar="OUTPUT")
    parser.add_argument("--direction", action="append", help="Direction ID or alias; repeat to compare")
    parser.add_argument("--format", choices=("markdown", "json"), default="markdown")
    parser.add_argument("--catalog", type=Path, default=ASSETS / "catalog.json")
    args = parser.parse_args()
    try:
        data = read_catalog(args.catalog.resolve())
        directions = select(data, args.direction)
        if args.list:
            for d in directions:
                print(f"{d['id']}: {d['title']} ({', '.join(d['aliases'])})")
        elif args.check:
            print(f"OK: {len(data['directions'])} directions; "
                  f"{sum(len(d['examples']) for d in data['directions'])} verified local files")
        elif args.build:
            output = args.catalog.parent / "gallery.html" if args.build == Path("__catalog_gallery__") else args.build
            print(build({**data, "directions": directions}, output.resolve(), args.catalog.resolve().parent))
        elif args.format == "json":
            print(json.dumps(directions, indent=2, ensure_ascii=False))
        else:
            print(markdown(directions, args.catalog.resolve().parent))
    except (ValueError, OSError, KeyError, TypeError) as exc:
        parser.exit(1, f"Gallery error: {exc}\n")


if __name__ == "__main__":
    main()
