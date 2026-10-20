# Initial decision record

**2026-10-19.** Revisit a decision when evidence changes; record the reason, impact and replacement here. These are product and architecture choices, not claims that their implementation has shipped.

| ID | Decision | Reason and consequence |
| --- | --- | --- |
| D-001 | Maintain this portfolio in a separate, clean repository. | The source material includes non-public operational and employer records. Only reviewed public content crosses into this repo; no history, submodule or build dependency crosses that boundary. |
| D-002 | Lead with verified production work and link released personal/OSS proof, while describing agent architecture as the direction being built. | The site must help a reader understand actual scope before exploring ambitions. Content validation will keep provenance and status visible. |
| D-003 | Build the first public site with Next.js/React/TypeScript as a static export on Netlify Free. | This gives a crawlable, no-card primary reading path and previews. Static export cannot run the NestJS service; that service starts local. |
| D-004 | Make the Systems Lab a replay of evaluated real runs in V1. | Visitors can inspect observable status, tools, citations and failures without a public inference cost or key. A live assistant needs a separate evaluation, privacy and capacity decision. |
| D-005 | Use an explicit tested OpenRouter free model or a local runtime behind a server-side adapter for trace generation. | Free models and provider policies change. Record model/provider and run version; never send private evidence or expose an API key to the browser. |
| D-006 | Use short-lived branches from `main`, reviewed PRs and squash merges. | A small team can keep a readable history and a release-ready main branch without a long-lived integration branch. Add required checks as CI is implemented. |
| D-007 | Use original orange/ink route graphics, light/dark themes and accessible motion. | The interface should express analytical thinking and playful energy while making proof easy to read. Third-party characters, crests, film images and copied UI are outside the design system. |
| D-008 | Make security an explicit product feature with a threat model, claim gate, secret boundary and reviewed failure states. | A portfolio that leaks private material or invents agent behaviour undermines the proof it is meant to provide. Controls must be implemented and tested before being claimed. |
| D-009 | Prepare a second static host on Cloudflare Pages using controlled Direct Upload of the last approved build, with a separate public URL. | A Netlify outage or free-plan pause should leave a reachable primary reading path. Direct Upload avoids mirroring an unreviewed `main` change. Without a paid/custom domain there is no automatic transparent failover; backup links and supervision are required. |
| D-010 | Keep the verified trace as the safe fallback for every model failure. | The first site has no runtime model dependency. A later live assistant will pin/evaluate a model and stop live answers on model removal, quota, timeout or unsafe output rather than silently changing behaviour. |
| D-011 | Make the HTML CV and evidence pages the canonical public reading path; generate a filtered JSON evidence index from the same approved claims. | Readers and heterogeneous agents can read stable text and direct proof without executing JavaScript. PDF, sitemap, metadata and optional `llms.txt` are supporting paths. These files improve discoverability but cannot guarantee search ranking or bot indexing. |
| D-012 | Use Signal Route as the shared page structure and Editorial Chapters as the warm light-theme reference. | Wael selected this blend on 2026-10-20. Both themes retain the same semantic markup, proof order, contact placement and one-shot route behaviour; the light mode changes palette and treatment, not the story layout. The chapter board remains an exploration, not a second site architecture. |

| D-013 | Reserve one original portrait asset at apps/web/public/images/wael-antar-portrait.webp; replace it only with Wael's reviewed photo near release. | The page can show a human image without a stock or generated likeness. The current abstract placeholder is hash-pinned so an unreviewed image change fails publication preflight. |
| D-014 | Build localized routes only for reviewed copy, starting with French and extending to German, Dutch, Spanish and Portuguese. | Static build-time paths preserve the free-hosting model and let each market read the same approved facts. Localized UI does not claim language proficiency. |
| D-015 | Use Netlify country hints on the root URL only after localized static paths are approved; default to English and keep explicit language URLs plus a manual override. | Country hints satisfy first-visit convenience without an API. Direct paths, hreflang and an English fallback keep content reachable when IP mapping is wrong or the backup host has no matching rule. The cookie override is a preference, never country or legal evidence. |

## Open decisions

- The exact free model/provider, after tool-call, latency, data-policy and evaluation checks.
- Whether any live public assistant can meet no-card capacity and abuse-control needs.
- The repository license, when source is ready for publication.
- The independent no-card uptime monitor and alert route, to be verified before launch; scheduled GitHub Actions alone do not provide an uptime guarantee.
