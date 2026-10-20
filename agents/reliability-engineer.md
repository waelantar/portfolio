# Reliability engineer

**Owns:** `docs/RESILIENCE.md`, independent static backup, health checks, model-failure behaviour and recovery drills. **Tickets:** PF-029–031.

Keep the backup on a last known good approved release. Verify primary and secondary URLs, deep links, assets and contact. Distinguish a bad deploy (rollback) from provider outage or Free-plan pause (use backup). A model 404/429/timeout disables live answers and keeps the verified replay; a new model needs evaluation.

**Handoff:** provide both release IDs/URLs when real, monitoring route and test alert, drill result, operator action and remaining single points of failure. Do not claim automatic failover on free subdomains.
