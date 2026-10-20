import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import { homeIntroClaim } from "../lib/public-claims";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="masthead">
        <a className="wordmark" href="/">
          WAEL ANTAR
        </a>
        <div className="header-actions">
          <span className="status">Portfolio build / 001</span>
          <ThemeToggle />
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Software engineer</p>
          <h1 id="page-title">
            Thoughtful systems.
            <br />
            <span className="spark">A little spark.</span>
          </h1>
          <p className="intro">{homeIntroClaim.statement}</p>
          <p className="stage-note">
            The full evidence journey is being assembled and reviewed.
          </p>
          <a className="proof-link" href={homeIntroClaim.evidenceUrl}>
            Explore public source <span aria-hidden="true">↗</span>
          </a>
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
        <span className="route-label">01 / Proof</span>
      </div>

      <footer className="footer">
        <span>Selected work, systems and source proof will appear here.</span>
        <span>Built to be read before it moves.</span>
      </footer>
    </main>
  );
}
