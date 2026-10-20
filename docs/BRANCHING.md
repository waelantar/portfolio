# Branching and release strategy

## Model

Use **short-lived branches from `main`**. `main` holds reviewed work and becomes deployable once the site exists. There is no permanent `develop` branch. Keep each PR focused on one backlog item or one coherent vertical slice; split work when review becomes difficult.

The public source repository is [waelantar/portfolio](https://github.com/waelantar/portfolio). `main` is protected: changes use pull requests, force pushes and deletion are blocked, and conversations must be resolved. Zero outside approvals are required while Wael is the only maintainer; no CI check is required until it exists and passes. Do not describe manual review as an independent GitHub approval.

## Branch names

Format: `<type>/PF-<id>-<short-slug>`.

| Type | Use | Example |
| --- | --- | --- |
| `feat` | Product behaviour or case-study page | `feat/PF-020-trace-player` |
| `fix` | Defect or false claim correction | `fix/PF-009-release-wording` |
| `docs` | Planning or documentation | `docs/PF-001-claim-registry` |
| `chore` | Build, dependency or CI maintenance | `chore/PF-010-preview-ci` |

For a defect with no existing backlog ID, create a small issue/entry first. Avoid personal names, employer details or secret identifiers in branch names.

## Change flow

1. Pick the next unblocked P0 item and confirm its dependencies. Branch from current `main`.
2. Implement the smallest reviewable change. Keep generated media, claim text and configuration in the same PR when they depend on each other.
3. Open a draft PR early with the backlog ID, scope, evidence and risks. Mark it ready only when its acceptance check is met.
4. Run relevant local checks and let CI/preview run when available. Inspect the rendered preview for claims, metadata, mobile, keyboard and privacy, not just the diff.
5. Review the PR, **squash merge** into `main`, delete the branch and update backlog status. Rebase a stale branch instead of merging `main` repeatedly into it.

Do not force-push `main`. A review branch can be rewritten before merge if collaborators are told. Do not merge incomplete claims behind a visual feature flag that could accidentally appear publicly.

## Required review gates

| Gate | Applies when | Evidence |
| --- | --- | --- |
| Truth and privacy | Every content, data, trace or media PR | Claim provenance, link checks and a review of generated output for private text or secrets. |
| Build | Once PF-005 lands | Clean install, type check and static build. |
| Content validation | Once PF-007 lands | Featured claims have status, provenance and approved proof. |
| UI | Visual or interaction PR | Desktop/mobile, keyboard, contrast and reduced-motion checks. |
| Agent | PF-014 onward | Bounded-tool tests, evaluation record and genuine trace provenance. |
| Security | Every PR; deeper review for content, dependencies, CI, API or traces | No secret/private source; threat-model control and rendered-artifact review recorded. |
| Recovery | Deployment, model adapter or routing changes | Failure mode, offline fallback and rollback drill recorded; backup remains on last known good release. |
| Preview | PF-010 onward | Netlify preview inspected before merging user-visible changes. |

Set GitHub required checks only after those checks exist and pass. Keep the Netlify production deploy restricted to reviewed `main`; previews belong to PRs. A public live API is not part of the first release.

## Releases and urgent corrections

- Tag the first approved public release `v1.0.0` and record its deployed commit, URL, claim review date and rollback path. Use later patch tags for factual/link fixes and minor tags for new public features.
- Creating a remote repository, publishing a preview or production site, and enabling public inference are separate actions. Publication follows an inspected preview and Wael's explicit approval.
- For a false public claim or leaked secret, remove/disable the affected deployment first, then correct the source, rotate exposed credentials if any, and review history. Treat a claim correction as an urgent `fix` PR; use a direct `main` commit only if the review path is unavailable and record why.
