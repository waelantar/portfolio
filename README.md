# Wael Antar — portfolio

**Status:** Home and reviewed evidence pages have PR CI and a private Netlify Deploy Preview. No public site or live API has been released.

This project will present verified software-engineering work through concise case studies and a Systems Lab that replays real, evaluated runs of an evidence assistant. The first public release is a static site on Netlify Free. Live visitor inference is a separate release decision.

## Intended stack

- Next.js, React and TypeScript static export in apps/web. The local scaffold builds without a server or secret.
- Original CSS/SVG visual system with light/dark themes and reduced-motion support.
- A local-first NestJS and PostgreSQL evidence assistant. OpenRouter Free may be used for local trace generation after model and data-policy checks; a local model is the fallback.
- GitHub Actions validates PRs and `main`; `netlify.toml` builds the static export for a verified private Netlify Free preview.

The static Home, theme system, professional case study, EvalGate case study and OSS page are implemented and privately previewed. The evidence assistant and public release features remain planned; none implies professional experience.

## Start here

- [Backlog](docs/BACKLOG.md): ordered work, dependencies, acceptance checks and release cuts.
- [Branching strategy](docs/BRANCHING.md): branch, review and release rules.
- [Decision record](docs/DECISIONS.md): the trade-offs behind the initial repository and release shape.
- [Home review](docs/PF-008-HOME-REVIEW.md), [EvalGate case review](docs/PF-009-EVALGATE-REVIEW.md), [theme and motion review](docs/PF-006-THEME-REVIEW.md) and [locale routing contract](docs/PF-013-LOCALE-ROUTING.md): local UI checks and the English-default country hint planned for reviewed translations.
- [Claim intake registry](content/claims.json): approved public-source statements with provenance, exact scope and release-level review rules.
- [Search and agent discovery contract](docs/DISCOVERY.md): web CV, semantic HTML and a future approved evidence index.
- [Preview setup and verification](docs/PF-010-PREVIEW-SETUP.md): build contract, private deploy record and hosted checks.
- [Security policy](SECURITY.md), [PF-026 source review](docs/PF-026-THREAT-REVIEW.md) and [resilience plan](docs/RESILIENCE.md): release gates, failure behaviour and recovery.
- [Agent roles](agents/README.md) and [repository skills](.agents/skills/): scoped ownership and repeatable workflows.
- [Pull request template](.github/PULL_REQUEST_TEMPLATE.md): checks for code, claims and publication.

## Source boundary

Only reviewed, publishable content belongs here. Keep non-public workspaces, agreements, personal records, internal product material, customer data, secrets and unrelated Git history outside this repository. A case study can explain personal ownership using approved prose and public links without reproducing confidential artifacts.

**Source repository:** [waelantar/portfolio](https://github.com/waelantar/portfolio). The [Netlify preview](https://deploy-preview-17--effortless-wisp-48ab6d.netlify.app/) requires team access; there is no public site URL yet. See [the web scaffold](apps/web/README.md) for local build commands, portrait replacement and language plans.

Further security controls, monitoring and backup hosting are tracked in the backlog. None is represented as operating until its acceptance test and release record exist.

The local `python scripts/publication_guard.py` preflight checks for obvious secrets, private paths and risky files without printing matched content. It is a starter safeguard, not a substitute for the publication review in `SECURITY.md`.
