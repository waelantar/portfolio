import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { evalgateClaim } from "../../../lib/public-claims";

export default function EvalGateCasePage() {
  return (
    <main className="shell">
      <SiteHeader />
      <article className="detail-page" aria-labelledby="case-title">
        <a className="back-link" href="/#work">
          ← Selected work
        </a>
        <p className="eyebrow">Personal project / Source release</p>
        <h1 id="case-title">EvalGate v1.0.0</h1>
        <p className="detail-lead">{evalgateClaim.statement}</p>
        <div className="detail-panel">
          <h2>Release boundary</h2>
          <p>{evalgateClaim.scope}</p>
          <a href={evalgateClaim.evidenceUrl}>
            Inspect the v1.0.0 source release <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="detail-note">
          This page records the public release and its scope. The evaluation and
          architecture walkthrough is being prepared for this portfolio.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
