# PF-010 static CI and Netlify preview setup

**Checked:** 2026-10-22. **State:** the Netlify Free project is connected and a private Deploy Preview of `fe892766644b60c26f9c36ae45412936fc24c2f6` passed hosted checks. Draft PR #17 awaits merge. No public release has been approved.

## Build contract

The existing read-only, SHA-pinned GitHub workflow runs on pull requests and `main`. It installs the lockfile without dependency lifecycle scripts, then runs formatting, type, claim and security checks, a static Next.js export, exported-artifact scanning and generated-header validation. The PF-012 PR's `verify` check passed on 2026-10-21.

Root `netlify.toml` uses the same checks, then scans `apps/web/out` as its own publication tree. Netlify publishes only that directory. Node 22 and Python 3.12 match CI; the preview build log explicitly recorded that `NETLIFY_NEXT_PLUGIN_SKIP` skipped the Next.js plugin. Dependency lifecycle scripts are disabled both for Netlify's install and the explicit locked install in the build command. No API, function, build secret or model endpoint is needed.

Netlify's [build configuration](https://docs.netlify.com/build/configure-builds/overview/), [framework guidance](https://docs.netlify.com/build/frameworks/overview/) and [dependency settings](https://docs.netlify.com/build/configure-builds/manage-dependencies/) support these settings. The generated `_headers` file is included in the static export; its presence is a local check, not evidence that Netlify serves those headers.

Local verification installed the lockfile offline with scripts disabled, parsed `netlify.toml`, ran `npm run check` and scanned `apps/web/out` as a separate tree. The checks passed with eight claim tests, 13 security tests and seven audited HTML files; the export includes deep-link HTML and `_headers`. The local toolchain is Node 24/Python 3.14, while GitHub CI uses Node 22/Python 3.12. The PR's read-only `verify` check and the hosted build passed.

## Hosted verification record

| Check | Result |
| --- | --- |
| Host and access | Netlify Free project `effortless-wisp-48ab6d`, linked to the selected `waelantar/portfolio` repository. Project production and Deploy Preview visibility were set to Private. An anonymous request to the preview root returned HTTP 401 with `X-Robots-Tag: noindex`; a signed-in team browser loaded it. No payment method was required. |
| Review revision | [Draft PR #17](https://github.com/waelantar/portfolio/pull/17) from `chore/PF-010-preview-ci` to `main`, commit `fe892766644b60c26f9c36ae45412936fc24c2f6`. PR #16 was closed and replaced without a source change because it predated the Git connection and did not trigger a preview. |
| Deploy | [Private preview](https://deploy-preview-17--effortless-wisp-48ab6d.netlify.app/), Netlify deploy `6ada31d16eb3a410e44a830b`. The build used root `netlify.toml`, deploy-preview context and `apps/web/out`; it passed the locked install, full `npm run check` and exported-artifact guard. Netlify reported seven pages, 20 assets and one processed header rule. |
| Hosted response | Home, all three case-study deep links, the stylesheet and SVG icon returned HTTP 200 for the signed-in browser. HTML had a hash-based script CSP, `X-Content-Type-Options: nosniff`, restrictive permissions and `X-Robots-Tag: noindex`; the Home `meta robots` was also `noindex, nofollow`. The preview is not a public release. |
| Browser path | The professional case study remained readable and linked with JavaScript disabled. The theme button switched between dark and light. Keyboard Tab focus was visible on navigation links. Emulated reduced motion removed the route animation and theme transition. |
| Runtime scope | The build log recorded the Next.js plugin skip. Netlify's Functions and Edge Functions views listed no deployed functions. No public API, model request or visitor-prompt storage is part of this preview. |

The Git connection also produced a private production-context build from `main@d775f74`. It passed and anonymous access returned 401. That build is neither the PF-010 PR preview nor approval to publish. A later commit to PR #17 will update its preview and needs a new hosted check before merge.

## Remaining release boundary

Production publication, backup hosting and monitoring remain PF-022/PF-023 work. A final public artifact needs fresh source/history/output review and hosted checks after approval; the private preview does not prove those future releases.

Netlify documents [Git connected Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) and adds `X-Robots-Tag: noindex` to them; the observed private-project 401 is the access-control check. Its [Free plan](https://www.netlify.com/pricing/) has hard limits; [Deploy Previews use zero deployment credits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/), although preview traffic still consumes the Free allowance.
