# PF-007 claim validation

**Status:** local implementation for PR review, 20 October 2026.

`content/claims.json` is the approved wording and review record. The server-rendered Home page now reads its professional sentence and evidence link through `apps/web/lib/public-claims.ts`. The rendered claim is selected by ID; the page no longer keeps a second copy of that sentence. Home's source CTA also requires a real evidence URL.

`apps/web/lib/claim-validation.ts` checks registry version, dates, unique stable IDs, category, publication and review states, HTTPS links, and provenance that matches the claim category. An approved entry needs an evidence URL or, for professional work only, the approved confidential-work explanation with its owner-confirmed review marker. A product context URL alone does not count as proof. The public projection excludes intake notes and explanation text.

A held entry may remain in the registry, but `selectPublicClaims` refuses to render it. Any page that features a claim must select it through this function. The Home page imports and validates the registry during static generation, so an invalid approved record fails `next build`.

## Verification

- `npm run test:claims`: seven claim-gate tests passed with positive and synthetic negative cases.
- `npm run typecheck` and `npm run build`: passed with the unmodified registry.
- A controlled missing-provenance mutation made `next build` fail during page data collection; the registry was restored byte for byte afterward.
- The exported HTML contains the approved sentence and its evidence link. Intake note and confidential review explanation text are absent.
- The existing publication guard and its tests passed.

PF-027 still owns broader content safety and CI gates. PF-033 will create the filtered public evidence index; this task does not publish one. The full site remains noindex until release review.

## PF-012 category extension

`public_personal_repository` requires `public_repository_verified` provenance. This separates a public source repository from a tagged personal release and from a merged third-party PR. A claim using release provenance for this category fails validation. See `docs/PF-012-OSS-REVIEW.md` for the current supporting-source checks.
