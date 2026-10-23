"use client";

import { useEffect, useState } from "react";
import type { ActiveLocale } from "@/lib/locales";

type Theme = "dark" | "light";

function currentTheme(): Theme {
  const selected = document.documentElement.dataset.theme;
  if (selected === "dark" || selected === "light") {
    return selected;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeToggle({ locale = "en" }: { locale?: ActiveLocale }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncTheme = () => setTheme(currentTheme());
    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";
  const themeLabel =
    locale === "fr"
      ? theme === null
        ? "Changer le thème"
        : `Passer au thème ${nextTheme === "light" ? "clair" : "sombre"}`
      : theme
        ? `Switch to ${nextTheme} theme`
        : "Change color theme";
  const buttonText =
    locale === "fr"
      ? theme === null
        ? "Thème"
        : `Thème ${nextTheme === "light" ? "clair" : "sombre"}`
      : theme
        ? `${nextTheme} theme`
        : "Theme";

  function toggleTheme() {
    const next = currentTheme() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      window.localStorage.setItem("wael-portfolio-theme", next);
    } catch {
      // The current-page choice still works if storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={themeLabel}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
      <span>{buttonText}</span>
    </button>
  );
}
