# Portfolio product backlog

**Updated:** 2026-10-20. **Current state:** PF-005 local static scaffold is built and awaiting review; PF-004 art direction is selected: Signal Route structure with warm editorial light theme. PF-003 employer copy and the illustrative-media boundary are approved; no case-study media or page has shipped. PF-002 public links were checked and the existing CV PDF was withheld after a private audit; PF-032 owns the portfolio-specific PDF. PF-001's seven registry sentences have verified public sources or owner-confirmed professional wording; their exact future rendering remains subject to release review. `main` is protected. The full site, monitoring, backup hosting and deployment remain pending. This backlog is a plan, so unchecked work is not shipped proof.

## Product goal and release rules

In the first screen, a visitor should understand Wael's verified production scope, his released personal and open-source proof, and how to contact him. The visual tone is analytical, playful and precise: original orange/ink route graphics, cinematic pacing, light/dark themes and accessible motion. The Systems Lab must replay a **real** evaluated agent run with inspectable actions, citations and a failure or abstention case.

The first public release is static, free and usable without a model endpoint. Live visitor inference is a later decision after evaluation, privacy, load, rate and cost gates. Keep the primary reading path shippable if the local agent takes longer; never substitute a fictional trace.

Priority: **P0** is required for the first public release; **P1** improves the release if time permits; **P2** is a separate decision. Items marked `BLOCKED` need source approval or an external account. Estimates are planning ranges, not deadlines.

**PF-000 — DONE (Product steward):** create the separate local repository, backlog, branching rules, role cards, repository skills, security policy and recovery plan. This is documentation/setup proof only; it does not satisfy the runtime or deployment gates below.

## Milestones and work items

### M0 — Claims and design inputs (2–3 h claims; 6–8 h art direction)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-001 | P0; DONE | Build an approved claim registry for professional work, EvalGate and merged OSS; record provenance, status, owner and public link or approved privacy-safe explanation. `content/claims.json` holds approved source copy; `docs/CLAIM-REVIEW.md` records public-source checks and wording approval. | Every featured sentence can be checked; public links and employer wording are approved before any entry changes from hold; planned work has a visible planned label. | — |
| PF-002 | P0; DONE (PDF HELD) | Recheck public project, release, PR and contact links; compile and inspect a current CV PDF before linking it. Public checks and the private audit decision are recorded in `docs/PF-002-LINK-CV-AUDIT.md`; no PDF is linked. | Links and CV reflect current verified facts; stale or unverified claims are withheld. | PF-001 |
| PF-003 | P0; DONE | Review employer case-study wording and media for confidentiality. The exact approved paragraph and illustration boundary are recorded in docs/PF-003-EMPLOYER-CASE-REVIEW.md and content/claims.json. No media asset has been created. | Approved prose has no internal code, screenshots, customer details, compensation or private metrics. | PF-001 |
| PF-004 | P0; DONE (DIRECTION SELECTED) | Design two mood frames, desktop/mobile hero, case-study panel, trace state and reduced-motion storyboard. Wael selected A structure with B light treatment on 2026-10-20; see docs/PF-004-ART-DIRECTION.md and design/. | Wael can recognize the analytical/playful direction; work, proof and contact remain legible at a glance. | PF-001 |

### Security foundation (release blocking)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-026 | P0 | Validate and maintain the threat model, data classification and publication boundary in `SECURITY.md`. | Security reviewer has checked actual source risks and a second reviewer confirms no private-source path is required by the build. | PF-001 |
| PF-027 | P0 | Implement repo/build security gates: dependency lock, least-privilege CI, pinned Actions, secret/private-path scan, content validation and tested static security headers. | CI and a **separate security reviewer** catch a planted synthetic secret/private path and unsafe rendered content; deployed response headers are verified. | PF-005, PF-007, PF-026 |

### M1 — Portfolio vertical slice (6–9 h)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-005 | P0; DONE (LOCAL SCAFFOLD) | Scaffold Next.js App Router, React, TypeScript and static export; add formatting, type check and a clean build. | A fresh checkout builds static pages without a server or secret. | PF-004 |
| PF-006 | P0 | Add design tokens, responsive layout, light/dark theme and motion fallback. | Both themes pass initial contrast review; all essential content works with reduced motion and keyboard input. | PF-005 |
| PF-007 | P0 | Implement typed content and claim validation. | The build rejects a featured item missing provenance, review state and proof link or approved private-work explanation. | PF-001, PF-005 |
| PF-008 | P0 | Build Home with headline, professional/personal proof, clear contact and direct case-study links. | On mobile and desktop, the first screen identifies scope, evidence and contact; no skill inflation or hidden CTA. | PF-003, PF-006, PF-007 |
| PF-009 | P0 | Build the EvalGate case study with release boundary, architecture, evaluation and public code/release links. | A reviewer can distinguish source release and local checks from a hosted customer product. | PF-002, PF-007 |
| PF-010 | P0 | Add CI validation and a Netlify Free preview configuration. | A PR checks type/build/content and a preview can be inspected without paid services or a public API. | PF-005, PF-007, PF-027 |

### M2 — Complete the evidence journey (part of 8–11 h public-site finish)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-011 | P0 | Write and render the professional case study using approved ownership and synthetic diagrams. | It answers what Wael owned, why decisions were made and how work was verified, without confidential artifacts. | PF-003, PF-007 |
| PF-012 | P0 | Add reviewed OSS contributions and a short supporting-work section. | Each contribution links to its current merged/public artifact; scope is exact. | PF-002, PF-007 |
| PF-013 | P0 | Add reviewed localized entrance paths from the same approved fact registry: French first, then German, Dutch, Spanish and Portuguese after copy review. Generate each path statically; never infer Wael's spoken fluency from a localized page. | Every enabled locale has equivalent role, dates, scope, evidence links, metadata and language tags; unreviewed translations stay unindexed. | PF-007, PF-008 |

### M3 — Local evidence assistant and real traces (10–16 h)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-014 | P0 | Create an allowlisted public evidence seed, source IDs and versioned trace/event contracts. | No private source can enter the seed; every answerable claim maps to a source. | PF-001, PF-003 |
| PF-015 | P0 | Build local NestJS API and PostgreSQL evidence store with migrations and read-only search/open tools. | A fresh local run can search/open only approved sources; API contract and errors are documented. | PF-014 |
| PF-016 | P0 | Add a server-side model adapter, selecting one tested OpenRouter `:free` model or a local runtime. | Tool support, provider data policy, model ID, latency and failure behaviour are recorded; no key appears in browser assets or Git. | PF-014, PF-015 |
| PF-017 | P0 | Implement bounded runs with observable status, citations, timeout, cancellation and concurrency limit. | Automated checks cover max steps, cancel, parallel runs and failure; UI events never claim hidden model thoughts. | PF-015, PF-016 |
| PF-018 | P0 | Run a fixed evaluation set for direct, ambiguous, false-premise, private-data and malicious-source questions. | Expected citations/abstentions, actual results, prompt/model version and failed cases are recorded. | PF-017 |
| PF-028 | P0 | Independently test prompt injection, malformed tool output, citation spoofing, key/PII leakage and trace serialization. | Failures are fixed or explicitly block release; safe adversarial results and the published trace review are recorded. | PF-017, PF-026 |
| PF-019 | P0 | Export one successful and one failure/abstention trace from real runs, then review them for publication. | Trace timings/events are genuine; secrets, private paths and unapproved text are absent. | PF-018, PF-028 |

### M4 — Systems Lab and first public release (remaining public-site finish)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-020 | P0 | Build an accessible trace player with pause, scrub, status, tool lanes, sources and text equivalent. | Both approved traces replay identically without network inference; keyboard and reduced-motion paths work. | PF-006, PF-019 |
| PF-021 | P0 | Add metadata, sitemap, link checks, accessibility and mobile/performance review. | Pages are crawlable; contact/proof links work; keyboard and screen-reader pass is recorded; static assets stay small. | PF-008, PF-009, PF-011, PF-020 |
| PF-032 | P0 | Build `/cv/` as the canonical semantic HTML CV and author a portfolio-specific selectable-text PDF from approved public content. | The first HTML response contains truthful role, experience, project, OSS and contact text without JavaScript; the PDF matches the approved registry and portfolio CV source, passes artifact review, and is linked only then. | PF-002, PF-005, PF-007 |
| PF-033 | P0 | Generate `/evidence.json` from approved claims and add accurate per-page titles, descriptions, canonical links and Person/ProfilePage data where applicable. | Held claims are absent from exported HTML, JSON and metadata; the public index has stable IDs, scope, source and verification date; schema validates. | PF-007, PF-008, PF-032 |
| PF-034 | P0 | Test search and agent reading paths on the static artifact and preview. | No-JavaScript fetch reads CV and proof links; sitemap/robots/canonical URLs are consistent; no private fields or unapproved claims appear in searchable output. | PF-021, PF-032, PF-033 |
| PF-035 | P1 | After launch, verify indexing through Google Search Console and prepare approved links from GitHub and LinkedIn profiles. | Sitemap submission and index coverage are recorded; profile edits happen only after Wael confirms the exact changes; search queries are reviewed without claiming a ranking guarantee. | PF-023 |
| PF-029 | P0 | Prepare a Cloudflare Pages **Direct Upload** backup path for the reviewed static artifact; keep it offline until publication approval. | Build checksum, upload procedure and last-good release record are ready; a local bad-main-change drill shows the backup artifact stays unchanged. No public backup URL is claimed yet. | PF-010, PF-021 |
| PF-030 | P0 | Prepare independent uptime checks, alert route, Netlify usage review and a local recovery drill. | Synthetic failure reaches Wael through the chosen alert route; primary/backup live checks are explicitly reserved for PF-023. No operating monitor is claimed yet. | PF-029 |
| PF-031 | P0 | Drill model removal, free-quota, timeout and malformed-tool states in the local adapter and replay UI. | No raw error or invented answer reaches the visitor; future live mode defaults off, fails to the verified replay and requires reevaluation to change models. | PF-018, PF-020 |
| PF-022 | P0 | Review local build, source/history/HTML and traces; obtain approval for any external preview; inspect that preview and drill rollback. | Security and recovery preflight pass, cost remains $0/no card, and Wael approves the **exact** production artifact for both hosts. | PF-010, PF-021, PF-027–034 |
| PF-023 | P0 | Publish the approved V1 to Netlify and the isolated Cloudflare backup, then activate and test independent monitoring. | Both URLs, deep links, assets, contact, alert and rollback are verified; commit, artifact checksum, deploy IDs and date are recorded. If backup or alert fails, do not claim a resilient V1. | PF-022 |

### M5 — Optional live assistant (separate 12–20 h decision)

| ID | Priority | Work | Done when | Depends on |
| --- | --- | --- | --- | --- |
| PF-024 | P2 | Evaluate a no-card public runtime, abuse controls, quota, privacy and fallback using measured runs. | A written go/no-go decision demonstrates capacity, cost ceiling and visitor-data handling. | PF-018, PF-023 |
| PF-025 | P2 | Release a bounded live assistant only if the decision passes; otherwise keep the replay. | Public eval, rate/load, timeout, monitoring and rollback gates pass with a working static fallback. | PF-024 |

## Critical path and cuts

1. Claims: PF-001 → PF-003 → PF-007 → PF-008/PF-011.
2. Real Lab: PF-014 → PF-015 → PF-016 → PF-017 → PF-018 → PF-019 → PF-020.
3. Security/recovery: PF-026 → PF-027/PF-028; PF-010 + PF-021 → PF-029 → PF-030; PF-018 + PF-020 → PF-031.
4. Discovery: PF-001 + PF-002 + PF-007 → PF-032 → PF-033 → PF-034.
5. Release: PF-010 + PF-020 + PF-021 + PF-027–034 → PF-022 → PF-023.

The first public release includes the real replay. If the local agent is delayed, a public-facing preview can progress through M1/M2, but the Lab must say **in progress** until real traces exist. PF-024/025 never block V1. Any cut to P0 scope needs a recorded decision before publication.

## Ownership and handoffs

The cards in `agents/` define the work. They are scoped subagent roles, not active background services. A single role writes each ticket's canonical artifact; reviewers return findings. The product steward owns this backlog and the decision record during parallel work.

| Owner | Tickets | Deliverable and required handoff |
| --- | --- | --- |
| Product steward | PF-000; cross-ticket scope | Ordered ready queue, dependency and decision updates; record any P0 cut. |
| Evidence editor | PF-001–003, PF-009, PF-011–013; factual review of PF-032–033 | Reviewed public claim registry, CV copy and verified links; security receives publication-sensitive material. |
| Web engineer | PF-004–008, PF-020–021, PF-032–034 | Static pages, typed content, themes, replay and discovery outputs; evidence checks words, security checks rendered output. |
| Agent systems engineer | PF-014–019, PF-024–025 | Local bounded API, model adapter, eval and genuine trace; security reviews data/tool boundaries, reliability reviews failures. |
| Security reviewer | PF-026, PF-028; independent review of PF-027 and every PR | Threat model, publication review and safe adversarial findings; can block a release. |
| Reliability engineer | PF-029–031 | Backup release, independent monitoring/alert and failure drills; release steward receives tested recovery evidence. |
| Release steward | PF-010, PF-027, PF-022–023, PF-035 | CI/security-gate implementation, preview, integrated release dossier, deployment IDs, rollback and post-launch indexing checks; security independently reviews PF-027 and Wael gives final publication approval. |

## Definition of done for each item

- Acceptance check above is demonstrated in the PR, with a screenshot/recording or command output where useful.
- Claims and links have provenance; planned work is not styled as shipped.
- No private source data or secret is committed; generated output and metadata are included in the review.
- Relevant accessibility, failure and mobile states are checked for UI work.
- The PR updates this backlog when scope or status changes.
