# PF-013 French entrance copy review

**State:** exact French page and five claim translations approved by Wael on 2026-10-23. The page and its country redirect have not been pushed or verified on Netlify.

Review the complete page at `http://127.0.0.1:3001/fr/`, including headings, navigation, contact text and the light and dark themes. The French entrance links to three English case studies and labels those links as English. It does not claim French fluency.

## Claims translated from the approved English registry

| Approved claim ID | Exact French text proposed for the entrance page |
| --- | --- |
| `romulus-product-frontend` | Wael travaille sur des interfaces produit en TypeScript et des parcours connectés aux API pour le produit d’IA vocale de Romulus. |
| `romulus-call-analytics-frontend` | J’ai pris en charge le frontend Angular/TypeScript d’une expérience d’analyse d’appels dans le produit d’IA vocale de Romulus. |
| `evalgate-source-release` | Wael a publié EvalGate v1.0.0 : le code source d’un projet personnel open source d’évaluation RAG. |
| `polyglot-engine-public-source` | Polyglot Engine explore un flux de recherche assistée par agent, centré sur le terminal, dans un dépôt public. |
| `telco-agent-public-source` | Telco Troubleshooting Agent explore un diagnostic étayé par des preuves dans un dépôt public doté d’un laboratoire synthétique. |

The professional card translates only the first sentence of its longer approved English claim, matching the scope of the English home card. The English case study supplies the detailed ownership and backend boundary. Source of these translations: `content/claims.json` and `apps/web/lib/french-home-copy.ts`.

## Routing proposed after copy approval

- `/` stays English by default. A Netlify root-only, temporary country redirect suggests `/fr/` when the request country is France.
- `/en/` and `/fr/` remain direct static paths. The visible selector writes a language-preference cookie for later visits to `/` and works as a direct link without JavaScript.
- Other countries, including Belgium and Switzerland, stay on English until the visitor chooses. German, Dutch, Spanish and Portuguese remain inactive until their exact copy is reviewed.
- The site retains `noindex` until the separate public release gate. A French sitemap entry and `hreflang` alternates are prepared, subject to artifact and hosted-preview checks.

## Review record

- [x] Wael approved the exact French page and five translations on 2026-10-23.
- [ ] Production build, static artifact/privacy check and local interaction checks pass.
- [ ] Wael approves the inspected commit before a public branch push.
- [ ] Country redirect and manual preference are verified on the approved private Netlify preview.
