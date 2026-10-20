import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { evalgateCaseClaims, evalgateClaim } from "../../../lib/public-claims";

export const metadata: Metadata = {
  title: "EvalGate v1.0.0 | Wael Antar",
  description:
    "A source-backed case study of EvalGate's hybrid retrieval, citation boundary and three-layer evaluation design.",
};

const sourceRepository = "https://github.com/waelantar/evalgate";
const resultsWorkbench =
  "https://github.com/waelantar/evalgate/blob/v1.0.0/docs/evaluation/README.md";

export default function EvalGateCasePage() {
  const {
    problem,
    retrievalDesign,
    citationBoundary,
    evaluationLayers,
    retrievalGate,
  } = evalgateCaseClaims;

  return (
    <main className="shell">
      <SiteHeader />
      <article
        className="detail-page evalgate-case"
        aria-labelledby="case-title"
      >
        <a className="back-link" href="/#work">
          <span aria-hidden="true">&larr;</span> Selected work
        </a>

        <header className="case-hero">
          <p className="eyebrow">Personal project / Source release / v1.0.0</p>
          <h1 id="case-title">An evaluation gate for RAG systems.</h1>
          <p className="detail-lead">{evalgateClaim.statement}</p>
          <div className="case-actions">
            <a className="case-action-primary" href={evalgateClaim.evidenceUrl}>
              Inspect the release <span aria-hidden="true">{"\u2197"}</span>
            </a>
            <a href={sourceRepository}>
              Browse the code <span aria-hidden="true">{"\u2197"}</span>
            </a>
          </div>
          <p className="case-boundary">{evalgateClaim.scope}</p>
        </header>

        <nav className="case-jump" aria-label="On this case study">
          <a href="#challenge">01 / Problem</a>
          <a href="#system">02 / System</a>
          <a href="#evaluation">03 / Evidence</a>
          <a href="#limits">04 / Limits</a>
        </nav>

        <section
          className="case-section"
          id="challenge"
          aria-labelledby="challenge-title"
        >
          <p className="case-kicker">01 / The question</p>
          <h2 id="challenge-title">How do you know what broke?</h2>
          <p className="case-copy">{problem.statement}</p>
          <p className="case-copy">
            A plausible answer can hide a retrieval failure or a citation that
            points nowhere. The design makes the selected index, ranked evidence
            and evaluation result inspectable.
          </p>
          <a className="case-source" href={problem.evidenceUrl}>
            Project goal and release status{" "}
            <span aria-hidden="true">{"\u2197"}</span>
          </a>
        </section>

        <section
          className="case-section"
          id="system"
          aria-labelledby="system-title"
        >
          <p className="case-kicker">02 / Architecture</p>
          <h2 id="system-title">Evidence has a route.</h2>
          <p className="case-copy">{retrievalDesign.statement}</p>
          <ol
            className="case-route"
            aria-label="EvalGate retrieval and answer path"
          >
            <li>
              <span className="case-route-number">01</span>
              <strong>Versioned corpus and index</strong>
              <span>Search selects a stored index identity.</span>
            </li>
            <li>
              <span className="case-route-number">02</span>
              <strong>Two ranked candidate lists</strong>
              <span>
                PostgreSQL full-text ranking and exact pgvector cosine.
              </span>
            </li>
            <li>
              <span className="case-route-number">03</span>
              <strong>Explainable fusion</strong>
              <span>
                Versioned reciprocal-rank fusion with stable tie-breaking.
              </span>
            </li>
            <li>
              <span className="case-route-number">04</span>
              <strong>Bounded answer context</strong>
              <span>
                Returned citation IDs are checked against retrieved evidence.
              </span>
            </li>
          </ol>
          <div className="case-decision">
            <p className="case-decision-label">Decision record</p>
            <p>
              Lexical and vector scores have different scales, so the policy
              combines their ranks. This v1.0.0 path uses exact vector search;
              the release does not claim an approximate index or reranker.
            </p>
            <a className="case-source" href={retrievalDesign.evidenceUrl}>
              Hybrid retrieval ADR <span aria-hidden="true">{"\u2197"}</span>
            </a>
          </div>
          <div className="case-decision">
            <p className="case-decision-label">Trust boundary</p>
            <p>{citationBoundary.statement}</p>
            <a className="case-source" href={citationBoundary.evidenceUrl}>
              Grounded-answer code <span aria-hidden="true">{"\u2197"}</span>
            </a>
          </div>
        </section>

        <section
          className="case-section"
          id="evaluation"
          aria-labelledby="evaluation-title"
        >
          <p className="case-kicker">03 / Evaluation</p>
          <h2 id="evaluation-title">Three layers. Three different claims.</h2>
          <p className="case-copy">{evaluationLayers.statement}</p>
          <div className="case-eval-grid">
            <div>
              <span>01 / Fixture</span>
              <h3>Does the contract work?</h3>
              <p>
                Deterministic cases check software mechanics, not answer
                quality.
              </p>
            </div>
            <div>
              <span>02 / Retrieval</span>
              <h3>Did evidence selection regress?</h3>
              <p>
                Reviewed cases compare a repeatable retrieval run with its
                baseline.
              </p>
            </div>
            <div>
              <span>03 / Live generation</span>
              <h3>How did a provider answer?</h3>
              <p>
                Protected runs record limits and human review; their judge
                metrics remain advisory.
              </p>
            </div>
          </div>
          <a className="case-source" href={evaluationLayers.evidenceUrl}>
            Evaluation-layer ADR <span aria-hidden="true">{"\u2197"}</span>
          </a>
          <div className="case-gate">
            <span className="case-gate-value">36</span>
            <div>
              <h3>Reviewed retrieval cases</h3>
              <p>{retrievalGate.statement}</p>
              <a className="case-source" href={retrievalGate.evidenceUrl}>
                v1.0.0 local readiness record{" "}
                <span aria-hidden="true">{"\u2197"}</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="case-section case-limits"
          id="limits"
          aria-labelledby="limits-title"
        >
          <p className="case-kicker">04 / Release boundary</p>
          <h2 id="limits-title">What this release proves.</h2>
          <p>
            The public artifact is a tagged source release with recorded local
            checks. Its read-only evaluation workbench exposes stored run and
            case results for inspection.
          </p>
          <p>
            The historical live-provider runs are limitation-heavy. Fixture
            answers do not establish generation quality. There is no hosted
            customer product or public model endpoint.
          </p>
          <div className="case-source-list">
            <a className="case-source" href={resultsWorkbench}>
              Evaluation results and limits{" "}
              <span aria-hidden="true">{"\u2197"}</span>
            </a>
            <a className="case-source" href={evalgateClaim.evidenceUrl}>
              Full v1.0.0 release notes{" "}
              <span aria-hidden="true">{"\u2197"}</span>
            </a>
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
