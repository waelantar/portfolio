import rawRegistry from "../../../content/claims.json";
import {
  selectPublicClaims,
  validateClaimRegistry,
  type PublicClaim,
} from "./claim-validation";

const registry = validateClaimRegistry(rawRegistry);

// Featured page content is explicitly selected from the approved registry.
const [intro, professional, professionalDecision, evalgate, openSource] =
  selectPublicClaims(registry, [
    "romulus-product-frontend",
    "romulus-call-analytics-frontend",
    "romulus-call-analytics-chart-decision",
    "evalgate-source-release",
    "twenty-pr-26787",
  ]);

function withEvidenceUrl(
  claim: PublicClaim,
  label: string,
): PublicClaim & { evidenceUrl: string } {
  if (!claim.evidenceUrl) {
    throw new Error(`${label} requires a public evidence URL`);
  }
  return { ...claim, evidenceUrl: claim.evidenceUrl };
}

export const homeIntroClaim = withEvidenceUrl(intro, "Home intro");
export const professionalCaseClaim = professional;
export const professionalDecisionClaim = professionalDecision;
export const evalgateClaim = withEvidenceUrl(evalgate, "EvalGate");
export const openSourceClaim = withEvidenceUrl(openSource, "Open source");

const [
  problem,
  retrievalDesign,
  citationBoundary,
  evaluationLayers,
  retrievalGate,
] = selectPublicClaims(registry, [
  "evalgate-problem",
  "evalgate-retrieval-design",
  "evalgate-citation-boundary",
  "evalgate-evaluation-layers",
  "evalgate-retrieval-gate",
]);

export const evalgateCaseClaims = {
  problem: withEvidenceUrl(problem, "EvalGate problem"),
  retrievalDesign: withEvidenceUrl(
    retrievalDesign,
    "EvalGate retrieval design",
  ),
  citationBoundary: withEvidenceUrl(
    citationBoundary,
    "EvalGate citation boundary",
  ),
  evaluationLayers: withEvidenceUrl(
    evaluationLayers,
    "EvalGate evaluation layers",
  ),
  retrievalGate: withEvidenceUrl(retrievalGate, "EvalGate retrieval gate"),
};
