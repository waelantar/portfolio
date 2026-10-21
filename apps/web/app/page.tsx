import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import {
  evalgateClaim,
  homeIntroClaim,
  professionalCaseClaim,
  supportingRepositoryClaims,
} from "../lib/public-claims";

const professionalLead = professionalCaseClaim.statement.split(". ")[0] + ".";

export default function HomePage() {
  return (
    <main className="shell">
      <SiteHeader />

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Wael Antar / Software engineer</p>
          <h1 id="page-title">
            Thoughtful systems.
            <br />
            <span className="spark">A little spark.</span>
          </h1>
          <p className="intro">{homeIntroClaim.statement}</p>
          <div className="hero-actions">
            <a className="proof-link" href="#work">
              Explore the work <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="mailto:antarwael@ieee.org">
              Email Wael <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav className="proof-index" aria-label="Featured proof">
            <a href="#professional">
              <span>01 / Professional</span>
              <strong>Voice AI frontend</strong>
            </a>
            <a href="#personal">
              <span>02 / Personal</span>
              <strong>EvalGate source release</strong>
            </a>
            <a href="#open-source">
              <span>03 / Open source</span>
              <strong>Merged TypeScript work</strong>
            </a>
          </nav>
        </div>

        <div className="portrait-card">
          <Image
            src="/images/wael-antar-portrait.webp"
            alt="Abstract placeholder for Wael Antar's future portrait"
            width={480}
            height={560}
            priority
          />
          <span>Portrait reserved · original image to follow</span>
        </div>
      </section>

      <div className="route" aria-hidden="true">
        <span className="route-line" />
        <span className="route-node" />
        <span className="route-label">01 / Selected work</span>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work / Three proof paths</p>
          <h2 id="work-title">Follow the evidence.</h2>
          <p>
            Professional product work, a released personal project, and a
            reviewed open-source contribution each have their own scope.
          </p>
        </div>

        <div className="work-grid">
          <article className="work-card" id="professional">
            <span className="card-number">01 / Professional work</span>
            <h3>Call analytics frontend</h3>
            <p>{professionalLead}</p>
            <a href="/work/romulus-call-analytics/">
              Read the call analytics case <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="work-card" id="personal">
            <span className="card-number">02 / Personal source release</span>
            <h3>EvalGate v1.0.0</h3>
            <p>{evalgateClaim.statement}</p>
            <a href="/work/evalgate/">
              Read the EvalGate case <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="work-card" id="open-source">
            <span className="card-number">03 / Merged open source</span>
            <h3>Five merged contributions</h3>
            <p>
              Three fixes in Twenty and two in nanobot, each linked to its
              merged pull request.
            </p>
            <a href="/work/open-source/">
              Explore all five PRs <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>

        <aside
          className="supporting-work"
          aria-labelledby="supporting-work-title"
        >
          <div>
            <p className="card-number">Supporting source work</p>
            <h3 id="supporting-work-title">
              Two more repositories to inspect.
            </h3>
            <p>
              Public personal source explorations, presented separately from
              released projects and merged PRs.
            </p>
          </div>
          <ul>
            {supportingRepositoryClaims.map((claim) => (
              <li key={claim.id}>
                <a href={claim.evidenceUrl}>
                  {claim.statement} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div>
          <p className="eyebrow">A direct line</p>
          <h2 id="contact-title">Let&apos;s talk through the details.</h2>
          <p>
            Questions about the work or a new engineering conversation? Reach me
            directly.
          </p>
        </div>
        <div className="contact-actions">
          <a className="proof-link" href="mailto:antarwael@ieee.org">
            Email Wael <span aria-hidden="true">↗</span>
          </a>
          <span>antarwael@ieee.org</span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
