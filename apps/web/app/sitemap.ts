import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl("/en/"),
      alternates: {
        languages: {
          en: siteUrl("/en/"),
          fr: siteUrl("/fr/"),
          "x-default": siteUrl("/"),
        },
      },
    },
    {
      url: siteUrl("/fr/"),
      alternates: {
        languages: {
          en: siteUrl("/en/"),
          fr: siteUrl("/fr/"),
          "x-default": siteUrl("/"),
        },
      },
    },
    { url: siteUrl("/work/romulus-call-analytics/") },
    { url: siteUrl("/work/evalgate/") },
    { url: siteUrl("/work/open-source/") },
  ];
}
