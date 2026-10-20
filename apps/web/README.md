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

The locale registry lists English, French, German, Dutch, Spanish and Portuguese as target-country reading paths. Only English is active in this scaffold. PF-013 will add reviewed localized routes, starting with French; translated copy must preserve the approved facts and should be proofread before indexing. Localized content does not imply spoken-language proficiency. Static paths will be generated at build time without middleware or automatic geolocation redirects.

## Motion

The initial orange route draws once over 0.9 seconds. Text is present before animation. Focus is visible and reduced-motion users see the complete route immediately. PF-006 owns the full theme, responsive and interaction review.
