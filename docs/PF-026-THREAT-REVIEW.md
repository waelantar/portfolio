# PF-026 threat-model and publication-boundary review

**Reviewed revision:** portfolio main at 134b0b3, 20 October 2026. **Result:** local threat model and data classification updated; no high or medium confidentiality finding in this revision. No site, API, preview, security header or monitor is claimed as operating.

## Review scope

The public repository, reachable Git history, tracked imports, workspace package scripts, lockfile, current static app and exported files were inspected. The review focused on private-source dependencies, accidental publication, unsafe content paths and the separation between the static V1 and a future live agent. The wider release and adversarial gates remain in SECURITY.md and the backlog.

## Evidence and independent check

- A tracked-file archive of commit 134b0b3 was extracted into an isolated directory. npm ci --offline used the committed lockfile. npm run check passed formatting, TypeScript, seven claim tests and a static export without mounting or reading a private source workspace.
- The archive's repository-root publication guard and six Python guard tests passed. The output contained 38 files and six HTML pages, with no source maps. A focused scan found no registry-internal editorial note, private workspace marker, provider credential name or runtime provider endpoint in exported text assets.
- An independent read-only reviewer inspected 222 reachable Git objects, including 118 blob versions and 60 unique paths, and found no tested private-path, private-workflow or credential-shape marker. Twelve tracked relative imports resolve inside this repository. There are no tracked symlinks, local environment files, root/workspace npm lifecycle hooks or lockfile file/link/absolute-local dependency references.
- Actual app source uses static export and selected claim projections. It has no browser fetch, raw HTML insertion, public API route or provider call. The only current visitor-side state is the light/dark choice in browser localStorage.
- The public claim registry itself is readable in Git even if selected output omits notes or held entries. Human editorial review is required for every tracked field, not just the visible page text.

## Findings and release impact

| Severity | Finding | Action |
| --- | --- | --- |
| Low | Running the publication guard from apps/web/out flags the approved portrait because its binary allowlist is keyed to paths relative to the repository root. The root invocation after build scans output successfully. | PF-027: support artifact-root scans and prove synthetic private-path/secret rejection in both source and generated output. Keep manual artifact review. |
| Release gate | CI, a tested CSP and other deployed response headers do not exist. The Netlify preview, backup and independent monitor are also not operating. | PF-027 adds CI/security gates; PF-010 configures a preview only after its dependencies; PF-022/023 inspect and approve deployment; PF-029/030 verify recovery and alerts. |
| Future system gate | No real trace player, public agent API or model fallback is implemented. | PF-014 through PF-020 and PF-028/031 must establish bounded tools, evaluated genuine traces, adversarial tests and failure behaviour before making runtime claims. |

The clean archive build supports the conclusion that this revision requires no private-source path. It does not certify that all future changes are safe or that the heuristic guard catches every secret. The site remains noindex and unpublished; neither property is a confidentiality boundary for files already in this public repository.
