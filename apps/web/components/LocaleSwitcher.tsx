"use client";

import { homePath, type ActiveLocale } from "@/lib/locales";

const languageNames = { en: "English", fr: "Français" } as const;

function rememberChoice(locale: ActiveLocale) {
  // Netlify documents nf_country as an override for a country redirect.
  // The cookie is a site preference, not evidence of the visitor's location.
  const country = locale === "fr" ? "fr" : "gb";
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `nf_country=${country}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function LocaleSwitcher({ locale }: { locale: ActiveLocale }) {
  return (
    <nav
      className="locale-switcher"
      aria-label={locale === "fr" ? "Choisir la langue" : "Choose language"}
    >
      {(["en", "fr"] as const).map((option) => (
        <a
          key={option}
          href={homePath(option)}
          hrefLang={option}
          lang={option}
          aria-label={languageNames[option]}
          aria-current={locale === option ? "true" : undefined}
          onClick={() => rememberChoice(option)}
        >
          {option.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
