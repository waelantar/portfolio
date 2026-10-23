const defaultOrigin = "https://effortless-wisp-48ab6d.netlify.app";

/** Replace SITE_ORIGIN when the reviewed public domain is chosen. */
export const siteOrigin = new URL(
  process.env.SITE_ORIGIN ?? process.env.URL ?? defaultOrigin,
);

export function siteUrl(path: string): string {
  return new URL(path, siteOrigin).href;
}
