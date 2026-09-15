#!/usr/bin/env python3
"""Mechanical lint for the altered-design skill. Run: python3 scripts/lint.py (exit 1 on problems).
Checks: rule ID format/sequence/duplicates, severity word presence, cross-file ID references,
banned vague words, second person, em-dashes inside prose, file sizes, referenced files exist.
"""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PREFIX_BY_FILE = {
    "SKILL.md": "CORE", "references/intake.md": "INT", "references/layout.md": "LAY",
    "references/typography.md": "TYP", "references/color.md": "COL",
    "references/components.md": "CMP", "references/accessibility.md": "A11Y",
    "references/motion.md": "MOT", "references/ux-writing.md": "COPY",
    "references/patterns.md": "PAT", "references/anti-patterns.md": "ANTI",
    "references/verification.md": "VER", "references/design-md-template.md": "SYS",
    "references/quality.md": "QLT", "references/directions.md": "DIR",
    "references/source-fidelity.md": "SRC", "references/craft.md": "CRAFT",
}
BUDGET_KB = {"SKILL.md": 16, "references/layout.md": 20, "references/components.md": 22}
DEFAULT_BUDGET_KB = 16
RULE_RE = re.compile(r"^- \*\*([A-Z0-9]+)-(\d{2}) — (.+?)\.\*\* (.*)$")
ID_RE = re.compile(r"\b(" + "|".join(PREFIX_BY_FILE.values()) + r")-(\d{2})\b")
SEVERITY = ("MUST", "SHOULD", "AVOID", "NEVER")
VAGUE = re.compile(r"\b(appropriate|proper|properly|nice|nicely|clean|adequate|reasonable|reasonably|good|modern|beautiful|elegant|sufficient)\b", re.I)
SECOND_PERSON = re.compile(r"\b(you|your|you're|yours)\b", re.I)
HEDGE = re.compile(r"\b(consider|maybe|might want|try to|perhaps)\b", re.I)

defined = {}
problems = []
all_text = {}

for rel, prefix in PREFIX_BY_FILE.items():
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        problems.append((rel, 0, "MISSING FILE"))
        continue
    text = open(path, encoding="utf-8").read()
    all_text[rel] = text
    size_kb = len(text.encode()) / 1024
    budget = BUDGET_KB.get(rel, DEFAULT_BUDGET_KB)
    if size_kb > budget:
        problems.append((rel, 0, f"SIZE {size_kb:.1f} KB > budget {budget} KB"))
    nums = []
    in_code = False
    lines = text.splitlines()
    for i, line in enumerate(lines, 1):
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        m = RULE_RE.match(line)
        if m:
            p, n, name, body = m.group(1), int(m.group(2)), m.group(3), m.group(4)
            j = i
            while j < len(lines) and lines[j].startswith("  ") and not lines[j].lstrip().startswith("- **") and lines[j].strip():
                body += " " + lines[j].strip()
                j += 1
            if p != prefix:
                problems.append((rel, i, f"WRONG PREFIX {p}-{n:02d} (expected {prefix})"))
            key = f"{p}-{n:02d}"
            if key in defined:
                problems.append((rel, i, f"DUPLICATE ID {key} (also {defined[key]})"))
            defined[key] = f"{rel}:{i}"
            nums.append(n)
            first = body.split()[0].rstrip(":") if body.split() else ""
            if first not in SEVERITY:
                problems.append((rel, i, f"{key} body does not start with a severity word: '{body[:40]}'"))
            if "Check:" not in body and first in ("MUST", "NEVER") and prefix not in ("ANTI", "INT", "PAT", "SYS", "VER"):
                problems.append((rel, i, f"{key} {first} without Check (verify a check is impossible)"))
        elif line.startswith("- **") and re.match(r"^- \*\*[A-Z0-9]+-\d", line):
            problems.append((rel, i, f"MALFORMED RULE LINE: {line[:70]}"))
        # em-dash inside prose (allowed only in the ID separator of a rule header)
        stripped = line
        if m:
            stripped = line.replace(f"{m.group(1)}-{m.group(2)} — ", "", 1)
        if "—" in stripped and not line.startswith("|") and not line.startswith("#"):
            problems.append((rel, i, "EM-DASH in prose"))
        if SECOND_PERSON.search(line) and not line.startswith("```"):
            problems.append((rel, i, f"SECOND PERSON: {line.strip()[:80]}"))
        vm = VAGUE.search(re.sub(r'"[^"]*"', '', line))
        if vm and (m or line.startswith("- ")):
            problems.append((rel, i, f"VAGUE '{vm.group(0)}': {line.strip()[:90]}"))
        hm = HEDGE.search(line)
        if hm and m:
            problems.append((rel, i, f"HEDGE '{hm.group(0)}': {line.strip()[:90]}"))
    # sequence check: numbers 1..N all present
    if nums:
        expected = set(range(1, max(nums) + 1))
        missing = sorted(expected - set(nums))
        if missing:
            problems.append((rel, 0, f"ID GAPS in {prefix}: {missing}"))
    # Quick check presence
    if rel.startswith("references/") and "## Quick check" not in text:
        problems.append((rel, 0, "NO '## Quick check' section"))

# cross references
for rel, text in all_text.items():
    for i, line in enumerate(text.splitlines(), 1):
        for m in ID_RE.finditer(line):
            key = f"{m.group(1)}-{m.group(2)}"
            if key not in defined:
                problems.append((rel, i, f"UNDEFINED REFERENCE {key}"))
    # referenced files
    for fm in re.finditer(r"`?(references/[a-z-]+\.md|modes/[a-z]+\.md|MAINTAINING\.md|CHANGELOG\.md)`?", text):
        if not os.path.exists(os.path.join(ROOT, fm.group(1))):
            problems.append((rel, 0, f"MISSING REFERENCED FILE {fm.group(1)}"))
    for fm in re.finditer(r"\b([a-z-]+\.md)\b", text):
        name = fm.group(1)
        if name in ("DESIGN.md", "PRODUCT.md", "README.md", "MAINTAINING.md", "CHANGELOG.md", "SKILL.md", "design-system.md", "package.json"):
            continue
        if not os.path.exists(os.path.join(ROOT, "references", name)) and not os.path.exists(os.path.join(ROOT, "modes", name)):
            problems.append((rel, 0, f"UNKNOWN FILE NAME MENTIONED: {name}"))

# mode files: no rule definitions allowed
for mp in glob.glob(os.path.join(ROOT, "modes", "*.md")):
    t = open(mp).read()
    if len(t.encode()) > 6 * 1024:
        problems.append((os.path.relpath(mp, ROOT), 0, "MODE SIZE > 6 KB"))
    for i, line in enumerate(t.splitlines(), 1):
        if RULE_RE.match(line):
            problems.append((os.path.relpath(mp, ROOT), i, "RULE DEFINED IN MODE FILE"))
        for m in ID_RE.finditer(line):
            key = f"{m.group(1)}-{m.group(2)}"
            if key not in defined:
                problems.append((os.path.relpath(mp, ROOT), i, f"UNDEFINED REFERENCE {key}"))

print(f"Defined rules: {len(defined)}")
by_prefix = {}
for k in defined:
    by_prefix.setdefault(k.split('-')[0], 0)
    by_prefix[k.split('-')[0]] += 1
print("Per prefix:", dict(sorted(by_prefix.items())))
print(f"Problems: {len(problems)}")
for rel, i, msg in sorted(problems):
    print(f"{rel}:{i}: {msg}")
sys.exit(1 if problems else 0)
