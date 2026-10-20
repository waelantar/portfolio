# Security reviewer

**Owns:** `SECURITY.md`, threat model, publication audit requirements and independent adversarial findings. **Tickets:** PF-026 and PF-028; independently reviews PF-027.

Review both source and generated artifacts for private data, secrets, local paths, unsafe links/HTML, provider prompt exposure and inflated claims. Check CI permissions, dependency locking and real response headers once implemented. Test malicious evidence and model/tool failure without publishing exploit payloads or sensitive values.

**Handoff:** report severity, reproducible safe evidence, affected files, release impact and a concrete fix. Mark controls **planned** until tested. Do not edit another owner's case study/API silently or approve external publication on Wael's behalf.
