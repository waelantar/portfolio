# PF-005 static scaffold handoff

**State:** local build complete; review branch only. No preview or public site has been published.

The root workspace installs the apps/web Next.js App Router application from one lockfile. It exports / as HTML plus static assets, with no server process, database, runtime API call or secret. The page uses the exact approved short employer sentence. Its metadata is noindex until the full reviewed site is ready; PF-021 owns final discoverability checks.

The current image is an original abstract WebP at apps/web/public/images/wael-antar-portrait.webp. It is deliberately a placeholder. The asset and generated copy are hash-pinned in the publication guard. A personal photo is a final-release option, and replacement requires a fresh media and alt-text review.

The locale registry names en, fr, de, nl, es and pt as target reading paths. Only en is active. PF-013 owns static localized pages and a translation review from the approved claim registry. Language routing must preserve the same evidence and dates. No page should imply Wael speaks its language.

The page has one route-line entrance and a hover/focus link response. Text is present without script or motion. Reduced-motion users receive the final line immediately. PF-006 owns complete theme, mobile, contrast and keyboard review.

## Local acceptance record

- npm ci: clean install succeeded.
- npm run format:check: passed.
- npm run typecheck: passed.
- npm run build: generated static /, /_not-found and /icon.svg.
- npm audit over HTTPS for all locked dependencies: zero advisories at review time.
- Publication guard: no obvious findings in source or generated output. Six unit tests passed, including a changed-portrait rejection.
- Generated HTML: exact approved sentence, en language tag, noindex, portrait path and icon verified; the static output totals 661,196 bytes.

The first-release SEO gate remains open by design. Remove noindex only after complete approved HTML CV, proof pages, metadata and publication review are ready.
A graphical browser pass remains for PF-006. The local browser asked for remote-debugging permission and isolated headless attempts failed in this environment; the local server did return the HTML, image, CSS and JavaScript assets.
