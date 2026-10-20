/**
 * Locale routing contract. Only reviewed translations become active routes.
 * Adding a locale never implies that Wael speaks or works in that language.
 */
export const targetLocales = ["en", "fr", "de", "nl", "es", "pt"] as const;
export type TargetLocale = (typeof targetLocales)[number];

export const activeLocales = ["en"] as const satisfies readonly TargetLocale[];

export const localeNames: Record<TargetLocale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  nl: "Nederlands",
  es: "Español",
  pt: "Português",
};
