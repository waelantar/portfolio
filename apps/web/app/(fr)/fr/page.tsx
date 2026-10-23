import Image from "next/image";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { frenchClaim } from "@/lib/french-home-copy";
import {
  evalgateClaim,
  homeIntroClaim,
  professionalCaseClaim,
  supportingRepositoryClaims,
} from "@/lib/public-claims";

export const metadata: Metadata = {
  alternates: {
    canonical: "/fr/",
    languages: { en: "/en/", fr: "/fr/", "x-default": "/" },
  },
};

export default function FrenchHomePage() {
  return (
    <main className="shell">
      <SiteHeader locale="fr" />

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Wael Antar / Ingénieur logiciel</p>
          <h1 id="page-title">
            Des systèmes précis.
            <br />
            <span className="spark">Une touche d’élan.</span>
          </h1>
          <p className="intro">{frenchClaim(homeIntroClaim)}</p>
          <div className="hero-actions">
            <a className="proof-link" href="#work">
              Découvrir le travail <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="mailto:antarwael@ieee.org">
              Écrire à Wael <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav className="proof-index" aria-label="Travaux présentés">
            <a href="#professional">
              <span>01 / Professionnel</span>
              <strong>Frontend pour l’IA vocale</strong>
            </a>
            <a href="#personal">
              <span>02 / Personnel</span>
              <strong>Code source d’EvalGate</strong>
            </a>
            <a href="#open-source">
              <span>03 / Open source</span>
              <strong>Contributions fusionnées</strong>
            </a>
          </nav>
        </div>

        <div className="portrait-card">
          <Image
            src="/images/wael-antar-portrait.webp"
            alt="Image abstraite temporaire à la place du futur portrait de Wael Antar"
            width={480}
            height={560}
            priority
          />
          <span>Portrait réservé · photo originale à venir</span>
        </div>
      </section>

      <div className="route" aria-hidden="true">
        <span className="route-line" />
        <span className="route-node" />
        <span className="route-label">01 / Travaux choisis</span>
      </div>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Travaux choisis / Trois pistes à explorer</p>
          <h2 id="work-title">Suivre les preuves.</h2>
          <p>
            Le travail en entreprise, un projet personnel publié et des
            contributions open source fusionnées sont présentés chacun à leur
            juste échelle.
          </p>
          <p className="language-note">
            Les études de cas détaillées sont actuellement en anglais.
          </p>
        </div>

        <div className="work-grid">
          <article className="work-card" id="professional">
            <span className="card-number">01 / Travail professionnel</span>
            <h3>Frontend d’analyse d’appels</h3>
            <p>{frenchClaim(professionalCaseClaim)}</p>
            <a href="/work/romulus-call-analytics/" hrefLang="en">
              Lire l’étude de cas en anglais <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="work-card" id="personal">
            <span className="card-number">
              02 / Code source personnel publié
            </span>
            <h3>EvalGate v1.0.0</h3>
            <p>{frenchClaim(evalgateClaim)}</p>
            <a href="/work/evalgate/" hrefLang="en">
              Lire l’étude de cas en anglais <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="work-card" id="open-source">
            <span className="card-number">03 / Open source fusionné</span>
            <h3>Cinq contributions fusionnées</h3>
            <p>
              Trois corrections dans Twenty et deux dans nanobot, chacune liée à
              sa pull request fusionnée.
            </p>
            <a href="/work/open-source/" hrefLang="en">
              Voir les cinq PR en anglais <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>

        <aside
          className="supporting-work"
          aria-labelledby="supporting-work-title"
        >
          <div>
            <p className="card-number">Autres dépôts publics</p>
            <h3 id="supporting-work-title">Deux autres dépôts à explorer.</h3>
            <p>
              Des explorations personnelles de code source, présentées
              séparément des projets publiés et des PR fusionnées.
            </p>
          </div>
          <ul>
            {supportingRepositoryClaims.map((claim) => (
              <li key={claim.id}>
                <a href={claim.evidenceUrl}>
                  {frenchClaim(claim)} <span aria-hidden="true">↗</span>
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
          <p className="eyebrow">Un contact direct</p>
          <h2 id="contact-title">Parlons des détails.</h2>
          <p>
            Une question sur mon travail ou un projet d’ingénierie ? Écrivez-moi
            directement.
          </p>
        </div>
        <div className="contact-actions">
          <a className="proof-link" href="mailto:antarwael@ieee.org">
            Écrire à Wael <span aria-hidden="true">↗</span>
          </a>
          <span>antarwael@ieee.org</span>
        </div>
      </section>

      <SiteFooter locale="fr" />
    </main>
  );
}
