# PF-002 link and CV publication review

**Checked:** 2026-10-20. **Scope:** public link availability and a private audit build of the current English CV source. This repository contains no CV PDF or site deployment.

## Public links

| Link group | Result | Use |
| --- | --- | --- |
| [GitHub profile](https://github.com/waelantar) | Public profile resolves and identifies Wael Antar. Its README provides a personal email link and a LinkedIn URL. | Approved as a contact and identity source. Recheck at release. |
| [EvalGate repository](https://github.com/waelantar/evalgate) and [v1.0.0 release](https://github.com/waelantar/evalgate/releases/tag/v1.0.0) | Repository is public; the release is published and is neither a draft nor a prerelease. | Approved as a source-release link. Do not imply hosted availability. |
| [Polyglot Engine](https://github.com/waelantar/polyglot-engine) and [Telco Troubleshooting Agent](https://github.com/waelantar/telco-troubleshooting-agent) | Both repositories are public and active. | Available as supporting project links; page copy needs its own scope review. |
| [Twenty #26787](https://github.com/twentyhq/twenty/pull/26787), [#26969](https://github.com/twentyhq/twenty/pull/26969), [#27041](https://github.com/twentyhq/twenty/pull/27041) | Each PR was authored by waelantar and has a merge date. | Approved as direct OSS proof with the PF-001 scope labels. |
| [nanobot #4352](https://github.com/HKUDS/nanobot/pull/4352), [#4433](https://github.com/HKUDS/nanobot/pull/4433) | Both PRs were authored by waelantar and merged. | Approved as Python OSS proof with the PF-001 scope labels. |
| [LinkedIn profile](https://www.linkedin.com/in/wael-antar/) | The URL is listed in Wael's public GitHub profile and is search-visible, but an unauthenticated automated request received HTTP 999. That response does not establish a broken page. | Hold the site link until a normal browser check confirms the exact destination. |
| [ATTS repository](https://github.com/waelantar/ATTS_Complete_Free_Package) | Repository is public. Performance figures were outside this link audit. | Reference only; do not repeat numerical outcomes without separate evidence review. |

A working GitHub URL establishes source availability on the check date. It does not establish every claim in its README or future availability. Recheck selected links during the final release review.

## CV audit and decision

The current English TeX source was compiled in a private temporary directory with the official portable Tectonic 0.17.0 engine in untrusted mode. The generated A4 PDF had selectable text and six link annotations, but the audit output spanned **two pages** and reported missing em-dash glyphs and icon text-mapping warnings. This engine is not the source's stated pdfLaTeX target, so its layout is an audit result, not a claim about every LaTeX engine.

The existing CV contains content outside the approved public-content set. **No PDF was copied or linked from this repository.** PF-032 must produce a portfolio-specific CV from approved facts, then inspect the rendered pages, selectable text, links, metadata and privacy boundary before adding a download link.
