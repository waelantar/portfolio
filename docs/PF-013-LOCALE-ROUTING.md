# PF-013 locale routing contract

**State:** English and owner-reviewed French paths are implemented locally; the root-only France redirect is configured but has not been verified on Netlify. No new public deployment is claimed. German, Dutch, Spanish and Portuguese remain future copy-review work.

## First visit and manual choice

The primary Netlify host will use its CDN country condition on the root path only. The default is English. The reviewed rule suggests French for an IP country of FR. Future reviewed paths may suggest German for DE or AT, Dutch for NL, Spanish for ES and Portuguese for PT. Countries without an enabled rule, including multilingual BE and CH, stay on English until the visitor chooses. A country hint is imperfect and says nothing about Wael's own language ability.

The configured root response is a temporary 302 to the reviewed French path for country FR. A forced rule is needed because the root already has a static index file. English and French each have a stable direct path, `/en/` and `/fr/`; direct locale paths never redirect by IP. The selector on every page lets a visitor override the hint. On Netlify, a manual choice uses the documented `nf_country` cookie override so revisiting the root honors that choice; the cookie is a site preference, not a statement of actual residence and must never be used for identity, authorization or legal decisions. Verify this behavior on an approved preview before merging.

The independent backup remains usable if its host does not support equivalent country rules: its root serves English and every approved locale has a direct link. No browser-side IP lookup, third-party geolocation service, Edge Function or Next.js runtime middleware is required for the initial design.

## Search and accessibility gates

Google warns that IP-based redirects can hide versions from crawlers and users. Before activation, ensure each translated page has a direct URL, visible language links, matching approved facts, language-specific metadata and hreflang alternates; publish a sitemap and an x-default path. Test direct URL access from another country and with JavaScript disabled. Search indexing must not depend on guessing a crawler's country. Keep the current noindex setting until the full release gate.

## Activation sequence

1. PF-007 supplies one approved fact registry for all languages.
2. PF-013 adds English and approved French static paths plus the visible language selector. Other target locales remain inactive until their exact translations are reviewed.
3. Test the Netlify root-only French country rule and the manual override. Unknown or unavailable country data must resolve to English. If the rule fails, leave the redirect disabled.
4. Verify metadata, hreflang, sitemap, explicit paths, backup fallback and preview behavior before release approval.

Sources: [Netlify country redirects and cookie override](https://docs.netlify.com/manage/routing/redirects/redirect-options/), [Google multilingual guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [Google locale-adaptive crawling](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages), [Next.js static export limits](https://nextjs.org/docs/app/guides/static-exports).
