# Security policy and release gate

**Status:** planning controls. This repository has a local static scaffold but no externally deployed site, API, monitor or security certification yet. Security claims on the eventual portfolio must link to implemented controls and test evidence.

## Assets and trust boundaries

| Asset | Boundary | Main failure to prevent |
| --- | --- | --- |
| Professional claims and public evidence | Reviewed content enters the public repo through an allowlist and human approval. | Private employer/customer facts or inflated claims become public. |
| Source, build output and Git history | Public repository and deployed static files are permanently shareable. | A secret, local path, private source or unapproved trace survives in history or generated HTML. |
| OpenRouter credential and local agent data | Local/server-side only; absent from V1 browser and hosting configuration. | Key theft, unapproved provider disclosure or quota abuse. |
| Visitor experience | V1 serves static pages and genuine replay data; no visitor prompt storage or public agent API. | XSS, broken proof links, fabricated execution or dependence on an unstable model. |
| Future live assistant | Public input, model output and retrieved evidence are untrusted. | Prompt injection, unauthorized tool use, data exfiltration, unbounded cost or unsafe answer. |

## Controls to implement before V1

1. **Content provenance:** each featured claim has a status, evidence source, last check and privacy approval. The build rejects missing fields. Professional work may use reviewed prose where code cannot be shared; no internal screenshots or metrics are inferred.
2. **Publication boundary:** review tracked files, generated HTML/assets, metadata, trace JSON, previews and Git history. Run `python scripts/publication_guard.py` on the source tree and again on the static output after a build; it fails on unknown binary/encoding and large files so assets must receive explicit human review. The heuristic cannot prove confidentiality. CI integration and a reviewed-asset manifest remain PF-027 work.
3. **Secret hygiene:** keep local keys outside Git; do not put model keys in `NEXT_PUBLIC_*`, static JavaScript, CI logs, previews, traces or error messages. Use separate least-privileged credentials only if a future server is deployed. Rotate a key immediately if exposed.
   OpenRouter's current Free plan does not include preferred-vendor or data-policy-based routing, so only approved public evidence may be sent through it; verify the actual model/provider policy before each trace release. [OpenRouter pricing](https://openrouter.ai/pricing), [privacy policy](https://openrouter.ai/privacy/).
4. **Browser safety:** avoid raw HTML insertion; render reviewed text and escaped data. Review external links, content security policy and other static security headers on the actual deployed responses. Netlify supports custom headers and CSP, but they must be configured and tested for this app. [Netlify custom headers](https://docs.netlify.com/manage/routing/headers/), [CSP guide](https://docs.netlify.com/manage/security/content-security-policy/).
5. **Supply chain and CI:** lock dependencies, review updates, use a read-only `GITHUB_TOKEN` unless a workflow task needs more, pin external Actions to full commit SHAs, and never run untrusted PR code with privileged secrets. GitHub recommends least privilege and warns about `pull_request_target`. [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use), [pull request target guidance](https://docs.github.com/en/actions/reference/security/securely-using-pull_request_target).
6. **Trace integrity:** publish only a genuine versioned local run; validate the event schema, citations and timing; strip credentials, headers, private paths and unapproved source text. Show observed tool/status events, never hidden model reasoning or a made-up recovery.
7. **Public-repo protection:** once a GitHub remote exists, enable/review secret scanning and push protection, dependency alerts and private vulnerability reporting if available. These augment the local/publication review; they do not replace it. GitHub documents free secret scanning for public repositories. [GitHub secret scanning](https://docs.github.com/en/code-security/concepts/secret-security/about-alerts).

**Remote checkpoint, 20 October 2026:** the public GitHub repository has secret scanning, push protection, Dependabot vulnerability alerts and private vulnerability reporting enabled. `main` requires a pull request, blocks force pushes and deletion, and requires conversation resolution. No CI checks or external reviewer approval are configured yet; add checks only after they exist and pass.

## Additional controls before any live assistant

- Limit input length, tool steps, run time, simultaneous runs and daily model calls on the server. Tools are read-only and accept allowlisted source IDs, not arbitrary URLs or filesystem paths.
- Treat retrieved text and model output as data, never instructions. Reject or abstain on unsupported claims, malformed tool calls, missing citations or attempts to request private information.
- Validate the exact model/provider and tool-call behaviour with the fixed evaluation set. Do not silently switch to a random free model after a 404 or quota error.
- Return a calm, generic user-visible failure state with the verified replay and direct proof links; keep safe diagnostic codes in a restricted operator log without full visitor prompts by default. See [resilience plan](docs/RESILIENCE.md).
- Perform a separate security review of public endpoint abuse, provider retention, rate limits, logging, deletion and incident response. No live endpoint is approved by V1's static-site review.

## Incident handling

| Incident | Immediate action | Recovery evidence |
| --- | --- | --- |
| Secret or private information exposed | Disable the affected public deployment or endpoint, revoke/rotate credentials, prevent further publication and preserve a **redacted** timeline. Review source and Git history; do not paste the value into an issue or chat. | Secret invalidated, public artifact removed/replaced where possible, affected paths audited, new release inspected. Historical copies may remain outside our control. |
| False or overstated claim | Remove or correct the claim promptly; review all pages, metadata and linked PDFs that repeat it. | Corrected preview and public release, provenance ledger updated. |
| Browser or dependency vulnerability | Disable affected feature if needed, patch on a focused branch and inspect the preview before release. | Reproduction no longer works; dependency/lockfile and deployed headers checked. |
| Model/tool boundary failure | Disable live inference, retain static replay, review the failing run without publishing private inputs. | Fixed evaluation and adversarial cases pass before re-enabling. |

Report a suspected vulnerability through the repository's [private security advisory route](https://github.com/waelantar/portfolio/security/advisories). Do not include secrets in a public GitHub issue.
