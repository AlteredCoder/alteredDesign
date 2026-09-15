# Mode: review

Evaluate without editing project code, assets, configuration or DESIGN.md. Store any
screenshots in session scratch space. Missing DESIGN.md alone is not a defect.

Read `references/verification.md`; load topic references only for applicable checks or
observed issues. With a visual source to match, read `references/source-fidelity.md`.

1. Establish surfaces, requested depth, fidelity and source role. Infer from the target;
   ask only if the review scope is missing. Default to the complete named surface.
2. Inspect actual renders at relevant widths and exercise the main task and reachable
   states. Use available source inspection when browser access is unavailable and state
   what could not be verified. Never equate an image with an interaction test.
3. Evaluate testable requirements first, then task-based heuristics and fidelity to the
   selected direction. Searches locate code; font names, gradients, glass and asymmetry
   are not automatic findings. Identify actual consequences for each issue.
   For polish, replay motion slowly (VER-37) and check `references/craft.md`; report
   code-level polish findings in the Before / After / Why table (VER-34).
4. Report scope and evidence, findings by impact, what works, and a prioritized fix plan.
   Cite source file and line when available, otherwise selector and viewport. Distinguish
   visual observations, measured failures and untested behavior. Do not apply fixes.
