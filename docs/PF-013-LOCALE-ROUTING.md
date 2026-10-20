# PF-013 locale routing contract

**State:** design only. English is the sole active route today. No IP redirect or translated page is live.

## First visit and manual choice

After translated content is approved, the primary Netlify host will use its CDN country condition on the root path only. The default is English. An IP country of FR suggests French; DE or AT suggests German; NL suggests Dutch; ES suggests Spanish; and PT suggests Portuguese. Countries not in that list, including multilingual BE and CH, stay on English until the visitor chooses. A country hint is imperfect and says nothing about Wael's own language ability.

The planned root response is a temporary 302 to a reviewed locale path. A forced rule is needed because the root already has a static index file. Each language also has a stable direct path such as `/en/` or `/fr/`. Direct locale paths never redirect by IP. The selector on every localized page lets a visitor override the hint. On Netlify, a manual choice will use the documented `nf_country` cookie override so revisiting the root honors that choice; the cookie is a site preference, not a statement of actual residence and must never be used for identity, authorization or legal decisions. Verify this behavior on an approved preview before enabling it.

The independent backup remains usable if its host does not support equivalent country rules: its root serves English and every approved locale has a direct link. No browser-side IP lookup, third-party geolocation service, Edge Function or Next.js runtime middleware is required for the initial design.

## Search and accessibility gates

Google warns that IP-based redirects can hide versions from crawlers and users. Before activation, ensure each translated page has a direct URL, visible language links, matching approved facts, language-specific metadata and hreflang alternates; publish a sitemap and an x-default path. Test direct URL access from another country and with JavaScript disabled. Search indexing must not depend on guessing a crawler's country. Keep the current noindex setting until the full release gate.

## Activation sequence

1. PF-007 supplies one approved fact registry for all languages.
2. PF-013 adds English and reviewed translated static paths plus the visible language selector.
3. Add and test Netlify root-only country rules and the manual override. Unknown or unavailable country data must resolve to English. If any rule fails or a locale is not ready, leave its redirect disabled.
4. Verify metadata, hreflang, sitemap, explicit paths, backup fallback and preview behavior before release approval.

Sources: [Netlify country redirects and cookie override](https://docs.netlify.com/manage/routing/redirects/redirect-options/), [Google multilingual guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [Google locale-adaptive crawling](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages), [Next.js static export limits](https://nextjs.org/docs/app/guides/static-exports).