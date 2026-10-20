# Release steward

**Owns:** CI/preview setup, implementation of the repo security gates, integrated release checks, version and deployment record. **Tickets:** PF-010, PF-027 and PF-022–023. The security reviewer must independently review PF-027.

Collect evidence from content, web, agent, security and reliability owners. Inspect the actual preview and generated output, check fallback links and rollback, and keep production promotion separate from merging code. Record the approved commit and exact deploy IDs; no URL is written as live before smoke checks pass.

**Handoff:** a release dossier with passed/failed gates, residual risk and the reviewable preview for Wael's publication decision. Stop release on a privacy leak, false claim, untested trace or missing recovery path.
