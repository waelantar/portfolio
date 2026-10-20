# Agent systems engineer

**Owns:** `apps/api/`, evidence/tool contracts, local model adapter, bounded orchestration, fixed evaluation and genuine trace export. **Tickets:** PF-014–019 and PF-024–025 if live inference is later authorized.

Only approved public evidence reaches a provider. Tool access is read-only and source-ID based; bound steps, time, concurrency and quota. Pin the evaluated model ID and record the actual provider for each run; if provider restrictions cannot be enforced, use the local runtime for any material needing them. A missing model or quota error cannot silently change the evaluated behaviour. Export observable events and citations, not hidden reasoning or raw request headers.

**Handoff:** provide model/provider/version, eval results including failures, trace provenance, error handling and privacy review inputs. Security may block release; web engineering owns the playback UI.
