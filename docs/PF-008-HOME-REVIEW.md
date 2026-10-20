# PF-008 Home review

**State:** local implementation for PR review, 20 October 2026. No external site or preview has been published.

## Content and link boundary

Home leads with Wael's name, software-engineer role, and the exact approved short Romulus sentence from `content/claims.json`. The professional card uses only the first sentence of the separately approved call-analytics paragraph. EvalGate and Twenty card statements come directly from approved claim records. The three first-screen proof links point to visible sections, and both internal case links resolve to static pages.

The professional route renders the exact approved paragraph and scope. Its Romulus link is explicitly labelled as product context, not proof of individual contribution. The EvalGate route identifies a v1.0.0 source release and local validation, with no hosted-service claim. These are concise evidence entries; PF-009 and PF-011 own the detailed architecture and decision narratives.

The email CTA uses the address already listed on [Wael's public GitHub profile](https://github.com/waelantar/waelantar/blob/main/README.md) and previously cleared as a contact source in PF-002. No contact form, message storage, model endpoint, external font, analytics, employer media or portfolio PDF was added.

## Local acceptance checks

- Static export built Home plus `/work/evalgate/` and `/work/romulus-call-analytics/`.
- At 1440 × 900 and 390 × 844, the first screen showed name, professional scope, contact and all three proof categories. At 320 × 720, the proof index ended above y=700 with no horizontal overflow.
- Dark and warm light themes were visually inspected. The original portrait placeholder stays at its reserved path.
- Keyboard Tab reached the home link and theme button with solid focus outlines. With reduced motion, the route animation was `none` and new card transitions were `0s`.
- With JavaScript disabled, the accessibility tree still exposed name, professional scope, email action and EvalGate proof.
- The two case routes and their direct public links were opened locally. The full build, claim tests and publication guard passed.

The site remains noindex. PF-009, PF-011, PF-032 and PF-033 will complete deeper case studies, the public CV and search metadata before publication review.
