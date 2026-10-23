import type { PublicClaim } from "./claim-validation";

/** Translations of approved English claims, approved by Wael on 2026-10-23. */
export const frenchHomeCopy = {
  reviewState: "approved" as "draft" | "approved",
  claims: {
    "romulus-product-frontend":
      "Wael travaille sur des interfaces produit en TypeScript et des parcours connectés aux API pour le produit d’IA vocale de Romulus.",
    "romulus-call-analytics-frontend":
      "J’ai pris en charge le frontend Angular/TypeScript d’une expérience d’analyse d’appels dans le produit d’IA vocale de Romulus.",
    "evalgate-source-release":
      "Wael a publié EvalGate v1.0.0 : le code source d’un projet personnel open source d’évaluation RAG.",
    "polyglot-engine-public-source":
      "Polyglot Engine explore un flux de recherche assistée par agent, centré sur le terminal, dans un dépôt public.",
    "telco-agent-public-source":
      "Telco Troubleshooting Agent explore un diagnostic étayé par des preuves dans un dépôt public doté d’un laboratoire synthétique.",
  },
} as const;

export function frenchClaim(claim: PublicClaim): string {
  if (
    process.env.NODE_ENV === "production" &&
    frenchHomeCopy.reviewState !== "approved"
  ) {
    throw new Error(
      "French home copy needs exact owner approval before export",
    );
  }

  const text =
    frenchHomeCopy.claims[claim.id as keyof typeof frenchHomeCopy.claims];
  if (!text) {
    throw new Error(`No French translation for approved claim ${claim.id}`);
  }
  return text;
}
