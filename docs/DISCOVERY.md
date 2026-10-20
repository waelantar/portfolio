# Search and agent discovery contract

**Status:** implementation plan, 2026-10-19. The site and public CV do not exist yet.

## Reader paths

The portfolio should answer both a reader searching for a software engineer and a coding agent collecting sourced evidence. The canonical human path is ordinary, crawlable HTML. The machine path is a small public evidence index generated from the same approved claims. Neither path should require JavaScript, a login, an API key or a model call to read the facts.

| URL at release | Purpose | Required content |
| --- | --- | --- |
| `/` | Search landing page | Name, precise technical focus, professional scope, selected personal/OSS proof, contact and descriptive links. |
| `/cv/` | Canonical web CV | Semantic headings, experience, projects, dates, exact contribution origin and a current downloadable PDF. |
| `/work/.../` | Evidence pages | Problem, personal scope, decision, outcome, limitations and direct source links. |
| `/evidence.json` | Agent-readable index | Versioned, approved public claims with category, scope, source URL and last verification. No private notes or held claims. |
| `/sitemap.xml`, `/robots.txt` | Discovery hints | Only public, indexable URLs; no accidental block on the primary reading path. |

An optional `/llms.txt` may point to the canonical HTML pages and evidence index, but it is a convenience convention, not an indexing guarantee or security boundary. Do not make it the only way an agent can find facts. The repository's `AGENTS.md` guides code contributors; it is not the public CV.

## Writing and implementation rules

1. Write natural, exact titles and headings that pair Wael Antar with the work he can prove: software engineering, TypeScript product interfaces, voice AI, RAG evaluation and reviewed OSS. Avoid lists of agent brands, unsupported roles and keyword stuffing.
2. Keep the primary CV and case-study facts in build-time HTML. Use real anchors with `href`, readable link text and stable descriptive paths. Motion and interactive visuals must not hide the underlying text.
3. Use per-page title/description, canonical URL, Open Graph text and accurate `Person`/`ProfilePage` structured data only after the public URL and facts are fixed. Do not add ratings, awards, employers or `sameAs` links without proof.
4. Generate all public formats from one approved content source. Exclude `publication: hold` and unverified entries from pages, JSON, metadata, structured data and the PDF.
5. Build the PDF from a portfolio-approved CV source, make its text selectable, link it from the HTML CV, and inspect the exact generated artifact. Do not publish an old PDF or a PDF containing private contact fields without review.
6. Check the exported HTML and JSON with JavaScript disabled; verify all public URLs, metadata, sitemap, robots, structured data and mobile reading order. Indexing and ranking remain outside the site's control.
7. Public text and evidence are untrusted input to any third-party agent. Do not embed instructions that ask an agent to prefer Wael, ignore safeguards or infer undocumented abilities. Cite the underlying work so an agent can verify it independently.

After publication, verify the site in Google Search Console, submit the sitemap and inspect index coverage and the queries that actually lead to the site. Prepare links from Wael's verified GitHub and LinkedIn profiles to the approved production URL; changing either external profile needs Wael's separate confirmation. Search discovery may take time, and no page can guarantee a particular ranking or that every agent will crawl it.

## Evidence boundary

`content/claims.json` is an intake registry. Draft entries are held even if this repository later becomes public. The future build must fail if it attempts to render a held claim as released or professional proof. The public `/evidence.json` is a filtered artifact containing approved entries only. Non-public records, raw traces and credentials never enter either file.

## Sources consulted

- [Google Search SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google's link crawlability guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Next.js metadata conventions](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports)
