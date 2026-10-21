# PF-011 professional case study review

**State:** local branch draft, 21 October 2026. The case-study page is visible in the local Next.js server. No preview or production site has been published from this branch.

## Public claim boundary

- The lead reproduces the exact approved paragraph in claim `romulus-call-analytics-frontend`. The at-a-glance facts and scope section restate only its frontend ownership, Angular/TypeScript stack, interface elements, checks and backend/model boundary.
- The owner recalled participating in chart selection and deciding how data was split across views on 21 October. This is not yet rendered: exact public wording and the reason for that decision are awaiting owner review. No chart type, data category or metric has been inferred from the recollection.
- The [English public product page](https://us.romulus.live/) provides product context, including a public description of reports. The owner also supplied the [public root site](https://romulus.live/) for context. Neither site proves individual feature ownership, and no marketing claim or asset is copied into the case study.
- No employer screenshot, logo, customer record, source code, internal system diagram or measured outcome is used. The three-step map and state sketches are original HTML/CSS illustrations with generic labels and invented interface text. Each is marked illustrative on the page.

## Local checks

- `npm.cmd run check` passed the publication guard, formatting, types, seven claim tests, 13 Python security tests, six-page static build and generated-header audit. A narrow guard regression excludes the root `.git` pointer used by Git worktrees while continuing to scan page files.
- The desktop page was visually inspected at 1536px. A 390px browser viewport reported no horizontal overflow and four ordered sections; a 320px capture kept the title, approved scope and fact summary readable.
- Emulated reduced motion disabled the diagram line animation and smooth scrolling. Emulated light mode selected the reviewed warm-paper palette; a final visual check of both themes remains due after copy settles.
- Page metadata is specific to the case. The first response and static export contain the approved paragraph, headings, diagram labels and public-context disclaimer without visitor inference.

## Remaining review

- Confirm one real decision and its reason in publication-safe wording before presenting it as an owned design choice. Keep any local employer-project review read-only and outside this repository.
- Inspect both themes, keyboard focus and reduced-motion behaviour after the final wording and diagram pass. Review the final diff and generated artifact for privacy before any public push.
- PF-010 owns an approved hosted preview; this local page does not satisfy deployed header or browser release gates.
