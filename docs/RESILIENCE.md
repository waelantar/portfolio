# Availability, supervision and recovery

**Status:** design and release gates, not an operating uptime claim. V1 is a static site with pre-recorded genuine traces. It has no runtime dependency on OpenRouter, PostgreSQL or a live API.

## Failure modes

| Scenario | What a visitor should see | Detection and operator response |
| --- | --- | --- |
| Bad Netlify deploy | Last approved Cloudflare Pages backup remains readable through its separate URL. | Post-deploy smoke check fails; stop promotion and restore the previous successful Netlify deploy. Netlify's rollback republishes an earlier deploy, but a later Git-triggered deploy can overwrite it, so stop/repair the bad change too. [Netlify rollback](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/). |
| Netlify provider outage or Free-plan pause | Backup site, GitHub project links and contact path remain reachable through independent links. | Independent HTTP check and manual verification of Netlify status/usage; point public-facing links to the backup while investigating. Netlify says a Free site can show `Site not available` when its credit limit is reached. [Netlify billing FAQ](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/). |
| Cloudflare backup outage | Netlify primary remains the preferred route; direct public proof links remain available. | Check both URLs separately, never assume the backup is healthy because a build succeeded. |
| Broken link or stale claim | Visitor still sees the case-study explanation and direct contact. | Weekly link/claim review and immediate correction of material errors; a failed link is a release defect. |
| OpenRouter free model removed (`404`) | V1 is unaffected. A future live panel stops and offers the verified replay and source links. | Mark the model unavailable; select a replacement model/provider and rerun tool, privacy, citation and failure evaluations before promotion. OpenRouter documents deprecation as `404`. [OpenRouter pricing FAQ](https://openrouter.ai/pricing). |
| Free quota/rate limit (`429`), timeout or provider error | No invented answer; show a short service-unavailable state and the replay. | Stop retry storms, record a safe error code, cool down the live path, inspect quota/provider status and re-enable only after a health/eval check. The free plan currently caps model calls at 50/day and 20/minute. [OpenRouter pricing](https://openrouter.ai/pricing). |
| Malformed tool call, missing citation or unsafe model output | The run abstains or fails with a clear status; direct evidence links remain available. | Preserve a redacted diagnostic, fix the adapter/prompt/tool boundary and rerun the fixed eval before release. |

The future live assistant starts behind a server-side `LIVE_ASSISTANT_ENABLED=false` switch. Only an evaluated release can turn it on. A model change, repeated provider failure or boundary violation turns it off; the UI keeps the verified replay and does not ask visitors to retry indefinitely. This switch is a requirement, not an implemented feature today.

## Independent static backup

Deploy the **same approved static artifact** to Netlify Free as primary and a separate Cloudflare Pages **Direct Upload** project as backup. Cloudflare advertises a no-card Free start, and Direct Upload accepts prebuilt static assets. [Cloudflare Pages](https://www.cloudflare.com/products/pages/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

Keep the backup on the **last known good release**, not an automatic mirror of an unreviewed `main` commit. Direct Upload has no Git push trigger for this backup project. Before publication, record the proposed build's SHA-256 artifact manifest and rehearse that a bad `main` change does not alter the backup. After Wael approves the exact artifact for external publication and the Netlify production smoke check passes, upload that artifact to Cloudflare manually, record both deploy IDs and the source commit, and verify Home, a case-study deep link, Systems Lab replay, static assets and contact from both hosts. Publish both URLs in durable public-facing places only when real and checked. Without a custom domain, visitors do not switch hosts automatically; the secondary link must be easy to find.

Do not claim this backup exists until a Cloudflare account, project, deploy and independent smoke test are complete. If Cloudflare cannot be used without a card or account access, record the blocker and evaluate GitHub Pages as the no-card secondary host before V1.

## Supervision and release checks

- **Before each release:** validate claims and traces, run build/security/accessibility checks, inspect the local artifact, get Wael's approval before any externally accessible preview, then inspect that preview. Obtain separate approval of the exact production artifact; verify the last known good host remains available.
- **After each deploy:** request Home plus at least one case-study deep link and Lab page, confirm expected release marker/content and a static asset, and verify contact and proof links. Activate/test the independent alert after both hosts exist. A `200` alone is insufficient.
- **Ongoing:** use an independent no-card monitor for both public URLs with alerts to Wael, chosen and tested before launch. Check Netlify usage before it approaches the Free cap. Manually review link health and claim freshness weekly, and run a monthly recovery drill.
- **Monitor limitation:** a scheduled GitHub Actions check may be delayed and public-repo schedules can be disabled after 60 days without activity; it is supplemental, not the only alert path. [GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows).
- **Model review:** for trace regeneration or future live inference, record model ID, provider, date, tool support and evaluation result. Keep the previous approved trace available. Never auto-promote `openrouter/free` or another unevaluated model to preserve availability.

## Runbook

1. **Confirm:** reproduce from a second network/device if possible; compare primary, backup and direct public proof links. Capture time, affected URL, release ID and safe error category. Do not store private visitor prompts.
2. **Contain:** for a broken deploy, stop further promotion and roll back Netlify; the Cloudflare Direct Upload backup remains on its last good artifact. For a provider outage or paused account, use the backup link. For a live-model fault, disable live inference and serve the replay. For a leak, follow `SECURITY.md` first.
3. **Communicate:** update the public repository's availability note and public-facing backup links only with verified facts. Do not promise an ETA without evidence or send messages to third parties without Wael's instruction.
4. **Recover:** restore the last good release or release a tested fix. Verify both hosts, deep links, replay and contact. Re-enable live inference only after the fixed eval passes.
5. **Learn:** record trigger, detection delay, impact, recovery and one corrective action in a redacted incident note. Update the backlog and rehearse the failed path in the next drill.
