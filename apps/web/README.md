# Static web scaffold

PF-005 provides a Next.js App Router application with a static export. The root page is a reviewed implementation scaffold, not the finished portfolio or a published site. Its page is intentionally marked noindex until claim validation, complete proof pages and release review pass.

Run from the repository root:

- npm ci
- npm run format:check
- npm run typecheck
- npm run build

The output is apps/web/out. It needs only a static file host. No server, database, API key or visitor inference is part of this build.

## Portrait replacement contract

The abstract placeholder lives at public/images/wael-antar-portrait.webp. Replace that exact file with Wael's own cropped portrait near final release; use a 6:7 composition, at least 960 by 1120 pixels, and strip location/device metadata. The replacement needs a publication review, an updated alt description and an updated binary hash in the publication guard. The image is optional for credibility; clear proof and readable text remain primary.

## Languages

The locale registry lists English, French, German, Dutch, Spanish and Portuguese as target-country reading paths. English is the default and sole active route today. PF-013 will add reviewed static localized routes, starting with French. Only the root entrance may later use Netlify's IP-country hint; unknown countries stay on English, while direct locale URLs and manual choice remain available. See docs/PF-013-LOCALE-ROUTING.md. Localized content does not imply spoken-language proficiency.

## Motion

PF-006 implements the shared ink and warm-paper themes, a persistent light/dark switch, responsive spacing and the original route motion. The route draws once over 0.9 seconds. Text is present before animation; reduced-motion users see the complete route immediately. The theme follows system preference when there is no saved choice, and the page remains readable without JavaScript. See docs/PF-006-THEME-REVIEW.md for contrast and browser checks.
