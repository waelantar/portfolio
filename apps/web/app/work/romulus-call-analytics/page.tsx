import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import {
  professionalCaseClaim,
  professionalDecisionClaim,
} from "../../../lib/public-claims";

export const metadata: Metadata = {
  title: "Call analytics frontend | Wael Antar",
  description:
    "An approved account of Angular and TypeScript frontend ownership for a call analytics experience, with an original illustrative interaction map.",
};

const experienceSteps = [
  {
    number: "01",
    label: "Summary",
    heading: "Start with an overview",
    description: "Illustrative summary cards",
  },
  {
    number: "02",
    label: "Filter",
    heading: "Narrow the view",
    description: "Illustrative filter controls",
  },
  {
    number: "03",
    label: "Detail",
    heading: "Inspect a result",
    description: "Illustrative drill-down panel",
  },
] as const;

const dataStates = [
  {
    label: "Loading",
    heading: "The result is on its way",
    description: "A visible waiting state for an in-progress request.",
    className: "state-loading",
  },
  {
    label: "Empty",
    heading: "Nothing matches this view",
    description: "A distinct state when there is no result to show.",
    className: "state-empty",
  },
  {
    label: "Error",
    heading: "This result could not load",
    description: "A distinct failure state rather than a blank screen.",
    className: "state-error",
  },
] as const;

export default function ProfessionalCasePage() {
  return (
    <main className="shell">
      <SiteHeader />
      <article
        className="detail-page professional-case"
        aria-labelledby="case-title"
      >
        <a className="back-link" href="/#work">
          <span aria-hidden="true">&larr;</span> Selected work
        </a>

        <header className="case-hero professional-hero">
          <p className="eyebrow">Professional work / Frontend ownership</p>
          <h1 id="case-title">From call summary to detail.</h1>
          <p className="detail-lead">{professionalCaseClaim.statement}</p>
          <div
            className="professional-facts"
            aria-label="Case study at a glance"
          >
            <div>
              <span>My scope</span>
              <strong>Angular / TypeScript frontend</strong>
            </div>
            <div>
              <span>Experience</span>
              <strong>Call analytics</strong>
            </div>
            <div>
              <span>Ownership limit</span>
              <strong>No backend API or AI runtime</strong>
            </div>
          </div>
        </header>

        <nav className="case-jump" aria-label="On this case study">
          <a href="#scope">01 / Scope</a>
          <a href="#journey">02 / Journey</a>
          <a href="#states">03 / States</a>
          <a href="#evidence">04 / Evidence</a>
        </nav>

        <section
          className="case-section"
          id="scope"
          aria-labelledby="scope-title"
        >
          <p className="case-kicker">01 / What I owned</p>
          <h2 id="scope-title">The frontend experience.</h2>
          <p className="case-copy">{professionalCaseClaim.scope}</p>
          <p className="case-copy">
            The approved account covers summary views, filters and drill-downs,
            plus loading, empty and error states. It also covers responsive and
            accessible checks and release feedback. I did not own the backend
            data APIs or AI model runtime.
          </p>
        </section>

        <section
          className="case-section"
          id="journey"
          aria-labelledby="journey-title"
        >
          <p className="case-kicker">02 / Interaction map</p>
          <h2 id="journey-title">A readable route through results.</h2>
          <p className="case-copy">
            Summary, filter and detail are three levels of the frontend
            experience described above. The map below explains that sequence; it
            is not a capture of the product.
          </p>
          <div className="case-decision">
            <p className="case-decision-label">A shared frontend decision</p>
            <p>{professionalDecisionClaim.statement}</p>
          </div>
          <figure className="professional-map">
            <figcaption>
              Original illustrative diagram. Generic labels and layout; no
              employer screen, customer data or internal architecture.
            </figcaption>
            <ol className="professional-steps">
              {experienceSteps.map((step) => (
                <li key={step.number}>
                  <span className="professional-step-number">
                    {step.number}
                  </span>
                  <span
                    className={`professional-mini mini-${step.number}`}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="professional-step-label">{step.label}</span>
                  <strong>{step.heading}</strong>
                  <span>{step.description}</span>
                </li>
              ))}
            </ol>
          </figure>
        </section>

        <section
          className="case-section"
          id="states"
          aria-labelledby="states-title"
        >
          <p className="case-kicker">03 / Data conditions</p>
          <h2 id="states-title">
            Different conditions need different signals.
          </h2>
          <p className="case-copy">
            The approved scope includes loading, empty and error states. These
            sketches show the distinction, using invented interface text.
          </p>
          <div className="professional-states" aria-label="Illustrative states">
            {dataStates.map((state) => (
              <div className="professional-state" key={state.label}>
                <span
                  className={`professional-state-mark ${state.className}`}
                  aria-hidden="true"
                />
                <span className="professional-state-label">{state.label}</span>
                <strong>{state.heading}</strong>
                <p>{state.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="case-section professional-evidence"
          id="evidence"
          aria-labelledby="evidence-title"
        >
          <p className="case-kicker">04 / Verification and limits</p>
          <h2 id="evidence-title">Care in the details.</h2>
          <p className="case-copy">
            I checked responsive and accessible behaviour and addressed release
            feedback. This account does not claim a particular accessibility
            certification, a measured customer outcome or ownership of the data
            services behind the interface.
          </p>
          <div className="professional-source-note">
            <div>
              <span className="case-decision-label">Source boundary</span>
              <p>
                This contribution is supported by privately reviewed work
                records and my approval of the exact public wording. The linked
                product page provides context; it does not verify my individual
                feature work. No employer screenshot, logo, customer data,
                internal diagram or private metric is shown.
              </p>
            </div>
            {professionalCaseClaim.publicContextUrl && (
              <a
                className="case-source"
                href={professionalCaseClaim.publicContextUrl}
              >
                View public product context{" "}
                <span aria-hidden="true">{"\u2197"}</span>
              </a>
            )}
          </div>
          <a className="text-link" href="mailto:antarwael@ieee.org">
            Ask me about the work <span aria-hidden="true">{"\u2197"}</span>
          </a>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
