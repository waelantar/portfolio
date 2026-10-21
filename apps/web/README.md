# Static web scaffold

PF-005 provides a Next.js App Router application with a static export. PF-008 adds Home and concise evidence routes. PF-009 expands EvalGate into a source-backed case study. PF-011 adds the professional case study, and PF-012 adds reviewed OSS and supporting-source links. This is not the finished portfolio or a published site. Pages remain noindex until complete proof pages and release review pass.

Run from the repository root:

- npm ci
- npm run format:check
- npm run typecheck
- npm run test:claims
- npm run build

The output is apps/web/out. Root `netlify.toml` prepares this static export for a future Netlify preview and reruns the publication checks. No server, database, API key or visitor inference is part of this build.

## Portrait replacement contract

The abstract placeholder lives at public/images/wael-antar-portrait.webp. Replace that exact file with Wael's own cropped portrait near final release; use a 6:7 composition, at least 960 by 1120 pixels, and strip location/device metadata. The replacement needs a publication review, an updated alt description and an updated binary hash in the publication guard. The image is optional for credibility; clear proof and readable text remain primary.

## Languages

The locale registry lists English, French, German, Dutch, Spanish and Portuguese as target-country reading paths. English is the default and sole active route today. PF-013 will add reviewed static localized routes, starting with French. Only the root entrance may later use Netlify's IP-country hint; unknown countries stay on English, while direct locale URLs and manual choice remain available. See docs/PF-013-LOCALE-ROUTING.md. Localized content does not imply spoken-language proficiency.

## Motion

PF-006 implements the shared ink and warm-paper themes, a persistent light/dark switch, responsive spacing and the original route motion. The route draws once over 0.9 seconds. Text is present before animation; reduced-motion users see the complete route immediately. The theme follows system preference when there is no saved choice, and the page remains readable without JavaScript. See docs/PF-006-THEME-REVIEW.md for contrast and browser checks.

## Content gate

Home reads its approved professional sentence and evidence URL from `content/claims.json` through `lib/public-claims.ts`. The typed validator refuses incomplete approved claims and held featured claims during the static build. See `../../docs/PF-007-CLAIM-VALIDATION.md` for the contract and verification.

## Home and evidence routes

The first screen shows approved professional scope, links to three proof categories and a direct email action. The professional route describes the approved frontend epic, and `/work/open-source/` links to five merged PRs plus two public source explorations. The EvalGate route covers architecture, evaluation and release limits. See `../../docs/PF-008-HOME-REVIEW.md`, `../../docs/PF-009-EVALGATE-REVIEW.md`, `../../docs/PF-011-PROFESSIONAL-CASE-REVIEW.md` and `../../docs/PF-012-OSS-REVIEW.md` for content boundaries and checks.
