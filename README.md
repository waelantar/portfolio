# Wael Antar — portfolio

**Status:** planning repository. No site or public demo has shipped from this repository yet.

This project will present verified software-engineering work through concise case studies and a Systems Lab that replays real, evaluated runs of an evidence assistant. The first public release is a static site on Netlify Free. Live visitor inference is a separate release decision.

## Intended stack

- Next.js, React and TypeScript for the static portfolio site.
- Original CSS/SVG visual system with light/dark themes and reduced-motion support.
- A local-first NestJS and PostgreSQL evidence assistant. OpenRouter Free may be used for local trace generation after model and data-policy checks; a local model is the fallback.
- GitHub Actions for validation once implementation starts. The static site is intended for Netlify Free's provided domain.

These are plans, not claims of shipped features or professional experience.

## Start here

- [Backlog](docs/BACKLOG.md): ordered work, dependencies, acceptance checks and release cuts.
- [Branching strategy](docs/BRANCHING.md): branch, review and release rules.
- [Decision record](docs/DECISIONS.md): the trade-offs behind the initial repository and release shape.
- [Claim intake registry](content/claims.json): approved public-source statements with provenance, exact scope and release-level review rules.
- [Search and agent discovery contract](docs/DISCOVERY.md): web CV, semantic HTML and a future approved evidence index.
- [Security policy](SECURITY.md) and [resilience plan](docs/RESILIENCE.md): release gates, failure behaviour and recovery.
- [Agent roles](agents/README.md) and [repository skills](.agents/skills/): scoped ownership and repeatable workflows.
- [Pull request template](.github/PULL_REQUEST_TEMPLATE.md): checks for code, claims and publication.

## Source boundary

Only reviewed, publishable content belongs here. Keep non-public workspaces, agreements, personal records, internal product material, customer data, secrets and unrelated Git history outside this repository. A case study can explain personal ownership using approved prose and public links without reproducing confidential artifacts.

**Source repository:** [waelantar/portfolio](https://github.com/waelantar/portfolio). The repository is the planning and source baseline. There is no published site URL yet.

Security controls, monitoring and backup hosting are planned and tracked in the backlog. None is represented as operating until its acceptance test and release record exist.

The local `python scripts/publication_guard.py` preflight checks for obvious secrets, private paths and risky files without printing matched content. It is a starter safeguard, not a substitute for the publication review in `SECURITY.md`.
