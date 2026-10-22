# PF-010 static CI and Netlify preview setup

**Checked:** 2026-10-21. **State:** repository configuration ready for local and PR review. No Netlify project or hosted preview has been verified for this repository, and the site remains `noindex`.

## Build contract

The existing read-only, SHA-pinned GitHub workflow runs on pull requests and `main`. It installs the lockfile without dependency lifecycle scripts, then runs formatting, type, claim and security checks, a static Next.js export, exported-artifact scanning and generated-header validation. The PF-012 PR's `verify` check passed on 2026-10-21.

Root `netlify.toml` uses the same checks, then scans `apps/web/out` as its own publication tree. Netlify publishes only that directory. Node 22 and Python 3.12 match CI; the Next.js runtime plugin is skipped because this app uses `output: "export"`. Dependency lifecycle scripts are disabled both for Netlify's install and the explicit locked install in the build command. No API, function, build secret or model endpoint is needed.

Netlify's [build configuration](https://docs.netlify.com/build/configure-builds/overview/), [framework guidance](https://docs.netlify.com/build/frameworks/overview/) and [dependency settings](https://docs.netlify.com/build/configure-builds/manage-dependencies/) support these settings. The generated `_headers` file is included in the static export; its presence is a local check, not evidence that Netlify serves those headers.

Local verification installed the lockfile offline with scripts disabled, parsed `netlify.toml`, ran `npm run check` and scanned `apps/web/out` as a separate tree. The checks passed with eight claim tests, 13 security tests and seven audited HTML files; the export includes deep-link HTML and `_headers`. The local toolchain is Node 24/Python 3.14, while the already passing GitHub workflow uses Node 22/Python 3.12. This branch still needs its own CI run and a hosted build before the Netlify settings can be called verified.

## Activation after approval

1. In Wael's Netlify Free account, connect the public portfolio repository. Keep the base directory at the repository root; let `netlify.toml` supply the command and publish path. Keep the project private while unfinished. Connecting a Git repository can trigger an initial production-context deploy, so inspect project visibility and publishing controls before linking it. A first build is a deployment action, separate from approving this source branch.
2. Enable PR Deploy Previews for `main`. Open a review PR from the inspected branch and record its exact preview URL, deploy ID, commit and build result. The new Free plan says projects start private until published; access to a private preview depends on Netlify team permissions. Do not make it public just to simplify review without a separate publication decision.
3. Fetch the preview with JavaScript disabled and open Home, all case-study deep links and an asset. Check HTTP response headers against `apps/web/out/_headers`, especially CSP and `X-Robots-Tag`; inspect theme, navigation, keyboard focus and reduced motion in a browser. Check the page and build log for private paths, credentials or unexpected functions. Keep the preview `noindex`.
4. Record any mismatch and repair it before changing this ticket to done. Production publication, backup host and monitoring remain PF-022/PF-023 work.

Netlify documents [Git connected Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) and adds `X-Robots-Tag: noindex` to them, while warning that a URL alone is not access control. Its [Free plan](https://www.netlify.com/pricing/) has hard limits; [Deploy Previews use zero deployment credits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/), although preview traffic still consumes the Free allowance. No hosted URL, privacy setting or response-header behavior is claimed until tested.
