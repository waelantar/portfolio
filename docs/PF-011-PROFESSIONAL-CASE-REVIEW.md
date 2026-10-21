# PF-011 professional case study review

**State:** branch draft updated, 21 October 2026. The case-study page is visible in the local Next.js server, and PR review remains pending. No preview or production site has been published from this branch.

## Public claim boundary

- The lead reproduces the exact approved paragraph in claim `romulus-call-analytics-frontend`. The at-a-glance facts and scope section restate only its frontend ownership, Angular/TypeScript stack, interface elements, checks and backend/model boundary.
- Claim `romulus-call-analytics-chart-decision` records the owner's 21 October approval of the exact shared-decision sentence and the general aim of easier overview-to-detail reading. The page renders that claim without implying sole design ownership. No chart type, data category or metric has been inferred from the recollection.
- Claim `romulus-call-analytics-epic` records the owner's confirmation of end-to-end frontend epic implementation and his approval of the exact generalized engineering paragraph on 21 October. It keeps chart decisions shared and backend/API/runtime ownership outside the claim. The privately reviewed source write-up is not imported, and no implementation example or benchmark is copied from it.
- The [English public product page](https://us.romulus.live/) provides product context, including a public description of reports. The owner also supplied the [public root site](https://romulus.live/) for context. Neither site proves individual feature ownership, and no marketing claim or asset is copied into the case study.
- No employer screenshot, logo, customer record, source code, internal system diagram or measured outcome is used. The three-step map, four-question engineering map and state sketches are original HTML/CSS illustrations with generic labels and invented interface text. Each is marked illustrative on the page.

## Local checks

- `npm.cmd run check` passed the publication guard, formatting, types, seven claim tests, 13 Python security tests, six-page static build and generated-header audit. A narrow guard regression excludes the root `.git` pointer used by Git worktrees while continuing to scan page files.
- The desktop page was visually inspected at 1536px. A 390px browser viewport reported no horizontal overflow; a 320px capture kept the title, approved scope and fact summary readable.
- Emulated reduced motion disabled the diagram line animation and smooth scrolling. Emulated light mode selected the reviewed warm-paper palette. Both themes were visually checked after the engineering extension.
- Page metadata is specific to the case. The first response and static export contain the approved paragraph, headings, diagram labels and public-context disclaimer without visitor inference.
- After the epic extension, `npm.cmd run check` passed the publication guard, formatting, types, seven claim tests, 13 Python security tests, six-page static build and export/header audit. The local route responded `200` with the approved epic wording and engineering map in the HTML.
- The updated engineering section was visually inspected in dark desktop and 390px mobile views and in a 320px light/reduced-motion view. No horizontal overflow appeared; the four questions formed one column on mobile, and the existing route animation was disabled under reduced motion.
- Keyboard navigation still exposes a visible solid focus outline on the page's links; the new question map adds no interactive controls.

## Remaining review

- Recheck both approved paragraphs against the final rendered page and inspect the source, generated artifact and branch history for privacy before any public push. Any further local employer-project review stays read-only and outside this repository.
- Recheck keyboard flow on the eventual hosted preview; the local check covers a visible link focus state only.
- PF-010 owns an approved hosted preview; this local page does not satisfy deployed header or browser release gates.
