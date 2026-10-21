# PF-027 security-gate implementation review

**State:** merged through PR #13 on 21 October 2026. Independent read-only source review found an inline-script-prefix bypass; the fix passed local re-review and CI. Hosted response checks remain pending. No preview or site has been published.

## Implemented

- The existing lockfile remains the install source. The proposed PR workflow uses a read-only token, full-SHA pinned checkout/setup actions, no persisted checkout credential, no repository secrets and an install with dependency lifecycle scripts disabled.
- `npm run check` now scans the source tree, runs formatting, types, claim tests and Python security tests, builds a static export, audits that export and verifies the generated headers.
- The publication guard recognizes the reviewed portrait hash from either the repository root or the export root. Unknown binaries and changed images still fail.
- The export audit rejects event-handler attributes, unsafe URLs, active HTML/SVG elements, external scripts, unexpected inline scripts, raw HTML insertion and dynamic code execution in web source. Inline Next.js scripts must match complete JSON data payload shapes; an accepted prefix alone cannot authorize appended code. The audit reports rule names and paths without echoing matched content.
- The build generates `apps/web/out/_headers` with script hashes derived from the exact exported inline scripts, `script-src-attr 'none'`, frame and object restrictions, a strict base/form policy, and basic browser response headers. It retains `unsafe-inline` for styles in the current static output; the script policy does not use it.

## Local acceptance evidence

1. `npm ci --offline --ignore-scripts --no-audit --no-fund` installed the locked dependencies locally.
2. `npm run check` passed formatting, TypeScript, seven claim tests, 12 Python security tests and a six-page static export after the follow-up fix.
3. `python scripts/publication_guard.py --tree apps/web/out` returned no obvious findings. The artifact audit found six unique inline-script hashes; an independent raw-body calculation matched all six. The generated header file is 869 bytes.
4. Synthetic tests plant a credential pattern, restricted path, unsafe HTML/URL, active SVG, raw HTML insertion and dynamic code in temporary trees; the relevant scanners reject them without printing the synthetic value. A regression test appends executable code to a valid data-script prefix and confirms it is rejected without minting a CSP hash.
5. A separate read-only reviewer reproduced the original bypass, confirmed the fix against both inline-script forms and a modified current export, and found no further release-blocking source issue. The review checked 28 reachable commits from a full local history and found no tested credential prefix, local-home path, restricted workflow phrase or suspicious sensitive path. This is an independent local audit, not a GitHub approval or deployed-site test.

## Remaining release gates

- The revised commit passed CI before merge. The read-only local reviewer did not approve a deployment; future changes still need source, history and artifact review.
- PF-010 configures the host to execute the full `npm run check` gate and publish `apps/web/out`. Inspect the approved preview in a browser for CSP violations, theme, navigation and essential content. Verify the actual HTTP response headers; a generated `_headers` file alone does not prove host behaviour.
- Keep source/history and media review on every later PR. Heuristic scans cannot establish that prose is true or that every credential format is detected.
