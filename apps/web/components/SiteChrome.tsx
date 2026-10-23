import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { homePath, type ActiveLocale } from "@/lib/locales";

export function SiteHeader({ locale = "en" }: { locale?: ActiveLocale }) {
  const home = homePath(locale);
  return (
    <header className="masthead">
      <a
        className="wordmark"
        href={home}
        aria-label={
          locale === "fr" ? "Wael Antar, accueil" : "Wael Antar, home"
        }
      >
        WAEL ANTAR
        <span className="wordmark-dot" aria-hidden="true">
          .
        </span>
      </a>
      <nav
        className="site-nav"
        aria-label={
          locale === "fr" ? "Navigation principale" : "Primary navigation"
        }
      >
        <a href={`${home}#work`}>{locale === "fr" ? "Projets" : "Work"}</a>
        <a href={`${home}#contact`}>Contact</a>
      </nav>
      <LocaleSwitcher locale={locale} />
      <ThemeToggle locale={locale} />
    </header>
  );
}

export function SiteFooter({ locale = "en" }: { locale?: ActiveLocale }) {
  return (
    <footer className="footer">
      <span>
        Wael Antar ·{" "}
        {locale === "fr" ? "Ingénieur logiciel" : "Software engineer"}
      </span>
      <a href="https://github.com/waelantar">GitHub ↗</a>
    </footer>
  );
}
