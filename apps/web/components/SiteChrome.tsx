import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="masthead">
      <a className="wordmark" href="/" aria-label="Wael Antar, home">
        WAEL ANTAR
        <span className="wordmark-dot" aria-hidden="true">
          .
        </span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="/#work">Work</a>
        <a href="/#contact">Contact</a>
      </nav>
      <ThemeToggle />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <span>Wael Antar · Software engineer</span>
      <a href="https://github.com/waelantar">GitHub ↗</a>
    </footer>
  );
}
