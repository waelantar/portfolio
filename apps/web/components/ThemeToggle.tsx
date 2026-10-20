"use client";

import { useEffect, useState } from "react";

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

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncTheme = () => setTheme(currentTheme());
    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";

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
      aria-label={
        theme ? "Switch to " + nextTheme + " theme" : "Change color theme"
      }
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
      <span>{theme ? nextTheme + " theme" : "Theme"}</span>
    </button>
  );
}
