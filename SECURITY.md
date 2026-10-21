# Security policy and release gate

**Status:** PF-026 threat model reviewed against the current static source and a clean local build on 20 October 2026. PF-027 adds local source/artifact audit, a read-only pinned CI workflow and generated static response headers on a review branch. Initial CI passed; a separate read-only reviewer found an inline-script bypass that was fixed and rechecked locally. CI for that fix and deployed response-header verification are pending. Backup hosting, monitoring and live-agent controls remain planned. There is no externally deployed site, API or security certification.

## Assets and trust boundaries

| Asset | Boundary | Main failure to prevent |
| --- | --- | --- |
| Professional claims and public evidence | Reviewed content enters the public repo through an allowlist and human approval. | Private employer/customer facts or inflated claims become public. |
| Source, build output and Git history | Public repository and deployed static files are permanently shareable. | A secret, local path, private source or unapproved trace survives in history or generated HTML. |
| OpenRouter credential and local agent data | Local/server-side only; absent from V1 browser and hosting configuration. | Key theft, unapproved provider disclosure or quota abuse. |
| Visitor experience | V1 serves static pages and genuine replay data; no visitor prompt storage or public agent API. | XSS, broken proof links, fabricated execution or dependence on an unstable model. |
| Future live assistant | Public input, model output and retrieved evidence are untrusted. | Prompt injection, unauthorized tool use, data exfiltration, unbounded cost or unsafe answer. |

## PF-026 data classification and publication boundary

The public Git repository is itself a publication surface. A claim can be absent from the rendered page yet still be readable in source, pull-request diffs and Git history. Approval for display and approval to store text in this repository are therefore separate checks.

| Class | Examples | Allowed destination and rule |
| --- | --- | --- |
| Reviewed public | Approved statements, scopes, public source links, original diagrams and the current placeholder portrait. | May enter tracked source and static output after evidence, wording and asset review. A direct link proves context only when the linked source actually supports the sentence. |
| Public intake metadata | Claim review state, provenance labels and editorial notes already committed to the public registry. | Treat as public text even when the website selects only statement and scope. Never put a confidential quotation or private identifier in a held or draft entry. |
| Restricted original | Employer/customer records, contracts, compensation, internal metrics, screenshots, personal records and private workspaces. | Stay outside this repository, Git history, CI, build inputs, fixtures, previews and generated artifacts. Only a separately approved privacy-safe summary may cross the boundary. |
| Secret or operator-only | Model credentials, deploy tokens, recovery access, raw provider errors and future restricted diagnostics. | No browser bundle, public repository, public PR log, static host or trace. A later runtime needs a separate secret and logging review. |
| Visitor-local | The current light/dark theme preference. | Stored as one local browser preference; no account, form, analytics or visitor prompt is implemented. Future visitor input requires a new threat review. |
| Trace pending review | Future agent events, evidence text, citations and timings. | No trace is public today. Only genuine evaluated, redacted and approved trace data may enter the V1 static replay. |

### Current trust transitions

1. A human verifies source and privacy-safe wording before adding a claim to the public registry. The validator checks structure, approved state, provenance label, dates and HTTPS link syntax; it cannot decide whether the sentence is true or the destination is trustworthy.
2. The app selects approved claim fields for static rendering. React text rendering escapes content. The current source contains no raw HTML insertion, browser fetch, public API route, runtime provider call or environment-variable read. These observations describe this revision, not a permanent guarantee.
3. Next.js builds static HTML, JavaScript and assets. The entire output, metadata and source history are treated as public. The current theme script reads a fixed localStorage key and does not send it to a service.
4. A future evaluated agent is a separate trust domain: public evidence, retrieved text and model output remain untrusted data. The V1 site must retain its approved static reading path when no model is available.

### Threat scenarios and gates

| Entry or actor | Failure path | Current control and remaining gate |
| --- | --- | --- |
| Accidental editor or malicious source | Confidential text or an inflated claim is placed in registry prose, notes, media or metadata. | Human source/wording approval and reviewed PR; typed validator and heuristic guard help catch mistakes. PF-027 must test source and artifact scans. PF-033/034 must test future JSON, CV and search surfaces. |
| Contributor with a syntactically valid HTTPS link | An approved-looking claim links to irrelevant, changed or hostile content. | HTTPS validation blocks unsafe schemes; evidence relevance and destination still require human review before merge and periodic link checks after release. |
| Untrusted text rendered on a page | Script execution or unsafe navigation from claim text or future imported evidence. | Current React text output is escaped and no raw HTML insertion exists. PF-027 must test unsafe rendered content and deployed CSP/headers; future trace components need their own adversarial tests. |
| Dependency, workflow or build compromise | PR code or a package reads secrets, mutates the repo or inserts content into exported files. | A lockfile exists and root/workspace npm scripts have no lifecycle hooks. There is no CI yet. PF-027 must add read-only, pinned, secret-free PR checks and inspect the exact static artifact. |
| Local credential or private path | A key, private file, local path or opaque media reaches Git history or a build. | The root publication guard blocks selected patterns and unknown binaries, and the placeholder image has a reviewed hash. It is heuristic; manual history/source/output review remains mandatory. |
| Provider or host outage | Visitor loses proof, sees a raw error or receives an invented model answer. | The current site is static and has no provider call. Independent backup, monitoring and live-model fail-closed behaviour remain PF-029/030/031 and later release gates. |

### Verified baseline and known gaps

The PF-026 review inspected tracked imports, scripts, lockfile references, Git history and generated output. An archive containing only tracked public files installed locked dependencies offline and passed formatting, type checks, seven claim tests and static export. The resulting 38-file artifact has six HTML files, no source maps and no detected registry-internal notes, private workspace markers or provider credential names. Six publication-guard tests and a repository-root guard pass. A second read-only reviewer found no private-source dependency or sensitive-history marker in the reachable repository objects.

This establishes a local source/build boundary for the reviewed revision. It does not prove every possible secret pattern is detected, that linked pages remain safe, or that deployment headers operate. PF-027 now checks the reviewed portrait hash when the export is scanned as its own tree and runs synthetic active-content checks. Its generated `_headers` file is derived from the exact inline scripts in the static HTML. No preview or production response header has been tested; the response check remains a release blocker. See `docs/PF-027-SECURITY-GATES.md`.

## Controls to implement before V1

1. **Content provenance:** each featured claim has a status, evidence source, last check and privacy approval. The build rejects missing fields. Professional work may use reviewed prose where code cannot be shared; no internal screenshots or metrics are inferred.
2. **Publication boundary:** review tracked files, generated HTML/assets, metadata, trace JSON, previews and Git history. Run the repository-root publication guard before the build and the artifact-root guard after it. The guard fails on unknown binary/encoding and large files, so assets need explicit human review. PF-027 adds a reviewed portrait hash for artifact-root scans and source/export checks for active content. Human source, history and exported-asset review remains mandatory.
3. **Secret hygiene:** keep local keys outside Git; do not put model keys in `NEXT_PUBLIC_*`, static JavaScript, CI logs, previews, traces or error messages. Use separate least-privileged credentials only if a future server is deployed. Rotate a key immediately if exposed.
   OpenRouter's current Free plan does not include preferred-vendor or data-policy-based routing, so only approved public evidence may be sent through it; verify the actual model/provider policy before each trace release. [OpenRouter pricing](https://openrouter.ai/pricing), [privacy policy](https://openrouter.ai/privacy/).
4. **Browser safety:** avoid raw HTML insertion; render reviewed text and escaped data. PF-027's build writes `apps/web/out/_headers` with a hash-based script CSP and conservative browser headers; the export audit rejects unexpected inline scripts, active HTML/SVG elements and unsafe URLs. CSS still uses `unsafe-inline` for the current Next.js output; a browser and response check on an approved preview must verify the exact policy. [Netlify custom headers](https://docs.netlify.com/manage/routing/headers/), [CSP guide](https://docs.netlify.com/manage/security/content-security-policy/).
5. **Supply chain and CI:** lock dependencies, review updates, use a read-only `GITHUB_TOKEN` unless a workflow task needs more, pin external Actions to full commit SHAs, and never run untrusted PR code with privileged secrets. PF-027's proposed PR workflow uses read-only permissions, pinned Actions and `npm ci --ignore-scripts`; it has not run remotely yet. GitHub recommends least privilege and warns about `pull_request_target`. [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use), [pull request target guidance](https://docs.github.com/en/actions/reference/security/securely-using-pull_request_target).
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
