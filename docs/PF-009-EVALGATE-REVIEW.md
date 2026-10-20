# PF-009 EvalGate case-study review

**State:** local implementation for PR review, 20 October 2026. The portfolio site remains unpublished and no external preview was created.

## Publication and evidence boundary

The page presents EvalGate v1.0.0 as Wael's personal open-source **source release**. It links to the public tag and repository. The 36-case result is expressly attributed to the release's local readiness record; this portfolio did not rerun EvalGate. Historical live-provider artifacts remain limitation-heavy and do not establish generation quality. No hosted service, customer deployment, public model endpoint, image publication or professional backend tenure is claimed.

Five page claims were added to the approved public registry. Their exact source mapping is:

| Claim ID | Tagged public evidence | What was checked |
| --- | --- | --- |
| evalgate-problem | [v1.0.0 README](https://github.com/waelantar/evalgate/blob/v1.0.0/README.md) | Project goal and source-release status. |
| evalgate-retrieval-design | [hybrid retrieval ADR](https://github.com/waelantar/evalgate/blob/v1.0.0/docs/adr/0003-hybrid-retrieval.md), [PostgreSQL adapter](https://github.com/waelantar/evalgate/blob/v1.0.0/apps/api/src/evalgate/adapters/postgres_search.py), [fusion implementation](https://github.com/waelantar/evalgate/blob/v1.0.0/apps/api/src/evalgate/domain/search.py) | PostgreSQL full-text rank, exact pgvector cosine, versioned RRF and stable tie-break. It is not BM25 or an approximate vector index. |
| evalgate-citation-boundary | [grounded-answer implementation](https://github.com/waelantar/evalgate/blob/v1.0.0/apps/api/src/evalgate/application/answer.py) | Bounded evidence context and citation IDs resolved against retrieved evidence. A validated citation ID does not prove the answer is true. |
| evalgate-evaluation-layers | [evaluation-layer ADR](https://github.com/waelantar/evalgate/blob/v1.0.0/docs/adr/0006-evaluation-layers.md) | Fixture mechanics, repeatable retrieval checks and protected live-generation evidence have separate purposes. |
| evalgate-retrieval-gate | [release readiness record](https://github.com/waelantar/evalgate/blob/v1.0.0/docs/release/READINESS.md), [v1.0.0 release](https://github.com/waelantar/evalgate/releases/tag/v1.0.0) | The unchanged 36-case Northstar retrieval baseline passed in the recorded local release checks. |

The [evaluation documentation](https://github.com/waelantar/evalgate/blob/v1.0.0/docs/evaluation/README.md) supports the read-only results-workbench wording and the limits on historical live-provider evidence. The architecture route is an original CSS/HTML explanation of tagged public source, with no copied screenshots, dataset values or private source.

## Local acceptance checks

- npm.cmd run check passed Prettier, TypeScript, seven claim tests and a static export of /work/evalgate/. A rebuild after correcting the link glyph also passed.
- python scripts/publication_guard.py reported no obvious findings; six Python guard tests passed. The guard is a starter check and does not replace source/artifact review.
- Generated HTML includes the case text and source links without JavaScript and retains noindex, nofollow. The static artifact contains no embedded provider key or remote call.
- At 1440 x 900 and 390 x 844, the route, evaluation cards and release boundary were visually reviewed. The mobile page has no horizontal overflow; the four-section jump and route cards collapse to one column.
- Light and dark themes were inspected. With reduced motion requested, document scrolling is immediate and the theme button transition is disabled. The accessibility tree exposes the title, sections, links and theme control. With JavaScript disabled, the title, links and 36-case evidence remain in the first HTML response.
- A text scan of 37 generated assets found no private workspace marker, provider endpoint or credential pattern. Two broad 'sk-' matches were part of CSS mask-property names, not credentials.
- The generated external-link arrow was initially a question mark due to shell encoding. It was changed to an ASCII source escape and the rebuilt DOM shows the intended glyph on all nine case links.

The final PR still needs an exact diff and generated-output review before merge. The site stays unpublished pending later security, content, accessibility, preview and release gates.
