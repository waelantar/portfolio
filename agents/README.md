# Portfolio subagent roles

These are **task roles**, not running background agents or autonomous monitors. Use them when parallel work is explicitly authorized and useful. The person coordinating the task remains accountable for integration and Wael's publication approval. Read the relevant card before delegating; give each subagent the ticket ID, expected artifact, source boundary and stop condition.

| Role | Primary ownership | Independent review |
| --- | --- | --- |
| [Product steward](product-steward.md) | Backlog, decisions, scope and handoff | Release scope and priority |
| [Evidence editor](evidence-editor.md) | Claim registry, case-study wording and public links | Web copy and trace source labels |
| [Web engineer](web-engineer.md) | Static site, content schema, design system and replay UI | Accessibility and rendered output |
| [Agent systems engineer](agent-systems.md) | Local API, evidence tools, model adapter, eval and genuine trace export | Bounded run behaviour |
| [Security reviewer](security-reviewer.md) | Threat model, publication checks and adversarial review | Every public content/API/CI change |
| [Reliability engineer](reliability-engineer.md) | Backup host, monitoring, model-failure and recovery drills | Deployment and failure paths |
| [Release steward](release-steward.md) | CI, preview inspection, release record and controlled promotion | Acceptance and rollback evidence |

One role owns each backlog item. Reviewers may report findings and request fixes; they do not silently overwrite another role's canonical file. Only the product steward updates `docs/BACKLOG.md` and `docs/DECISIONS.md` during parallel work. The release steward coordinates final integration, while Wael approves external publication.

Use the ownership map in `docs/BACKLOG.md` to route ticket IDs. A handoff includes changed files, checks and evidence, unresolved risks and the next action. No role may send messages, create public resources or turn on live inference merely because a role card exists.
