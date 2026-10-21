# PF-012 open-source and supporting-source review

**Checked:** 2026-10-21. **State:** local implementation for PR review; the site is not deployed and remains noindex.

The `/work/open-source/` page selects approved entries from `content/claims.json`. Home links to that page and directly to two supporting repositories. No employer code, private evidence or external image was imported.

| Public artifact | Verification and displayed scope |
| --- | --- |
| [Twenty #26787](https://github.com/twentyhq/twenty/pull/26787) | Authored by waelantar, merged 2026-09-29. TypeScript groupBy validation, service/schema and tests; one contribution, not product ownership. |
| [Twenty #26969](https://github.com/twentyhq/twenty/pull/26969) | Authored by waelantar, merged 2026-10-09. Rich-text selection after image autosave, with focused tests. |
| [Twenty #27041](https://github.com/twentyhq/twenty/pull/27041) | Authored by waelantar, merged 2026-10-09. Multi-record selection across frontend side-panel and SDK code, with tests. |
| [nanobot #4352](https://github.com/HKUDS/nanobot/pull/4352) | Authored by waelantar, merged 2026-06-16. Python history-digest token cap and tests. |
| [nanobot #4433](https://github.com/HKUDS/nanobot/pull/4433) | Authored by waelantar, merged 2026-06-24. Python pairing sender-ID normalization and tests. |
| [Polyglot Engine](https://github.com/waelantar/polyglot-engine) | Public, non-archived personal source repository; its public description identifies a terminal-first research agent. No release or deployment inferred. |
| [Telco Troubleshooting Agent](https://github.com/waelantar/telco-troubleshooting-agent) | Public, non-archived personal source repository; its public description identifies evidence-backed troubleshooting and a synthetic lab. No release or deployment inferred. |

The five PR checks used the host repositories' public GitHub pull-request metadata and changed-file lists. The two supporting checks used their public GitHub repository metadata. These are point-in-time checks; the direct links remain the reader's inspection path. The page does not turn the Python nanobot contributions into Node.js experience, or the supporting repositories into released products.

## Acceptance and release boundary

The site page has one direct link per merged PR and one per supporting repository. Claim validation requires a category-specific provenance marker and a public HTTPS URL. Local `npm run check` passed with eight claim tests, 13 security tests, seven generated HTML files and the response-header audit. The exported page contains five PR links, two supporting-repository links and `noindex`. A headless browser render at 1440 px and a CDP-emulated 390 px viewport showed the page without horizontal overflow; the 390 px check reported `scrollWidth === innerWidth`. The page remains noindex until the full site release review.
