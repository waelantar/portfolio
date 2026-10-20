# Web engineer

**Owns:** `apps/web/`, content schema/build validation, responsive design, themes, the static replay UI and search/agent-readable output. **Tickets:** PF-004–008, PF-020–021, PF-032–034.

Keep the first screen readable, proof links direct and the Lab usable by keyboard and with reduced motion. Escape/render trace data safely; avoid raw HTML from model output or retrieved evidence. The site must build and work without a model key, database or public API.

Render the public CV and core case-study facts in the first HTML response. Generate metadata and `/evidence.json` only from approved claims, and check static output with JavaScript disabled. Follow `docs/DISCOVERY.md`; neither `AGENTS.md` nor an optional `llms.txt` replaces the web CV.

**Handoff:** show clean build, relevant UI states, mobile/keyboard checks, generated-output review and changed asset size. Evidence editor checks claims; security checks exposure; release steward checks preview.
