import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { professionalCaseClaim } from "../../../lib/public-claims";

export default function ProfessionalCasePage() {
  return (
    <main className="shell">
      <SiteHeader />
      <article className="detail-page" aria-labelledby="case-title">
        <a className="back-link" href="/#work">
          ← Selected work
        </a>
        <p className="eyebrow">Professional work / Frontend ownership</p>
        <h1 id="case-title">A call analytics experience</h1>
        <p className="detail-lead">{professionalCaseClaim.statement}</p>
        <div className="detail-panel">
          <h2>Scope and source boundary</h2>
          <p>{professionalCaseClaim.scope}</p>
          <p>
            This is an approved account of my contribution. No employer
            screenshot, customer data, internal architecture or private metric
            appears here.
          </p>
          {professionalCaseClaim.publicContextUrl && (
            <a href={professionalCaseClaim.publicContextUrl}>
              Romulus product context — not individual contribution proof
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>
        <a className="text-link" href="mailto:antarwael@ieee.org">
          Ask me about the work <span aria-hidden="true">↗</span>
        </a>
      </article>
      <SiteFooter />
    </main>
  );
}
