import rawRegistry from "../../../content/claims.json";
import {
  selectPublicClaims,
  validateClaimRegistry,
  type PublicClaim,
} from "./claim-validation";

const registry = validateClaimRegistry(rawRegistry);

// Featured page content is explicitly selected from the approved registry.
const [intro, professional, professionalEpic, professionalDecision, evalgate] =
  selectPublicClaims(registry, [
    "romulus-product-frontend",
    "romulus-call-analytics-frontend",
    "romulus-call-analytics-epic",
    "romulus-call-analytics-chart-decision",
    "evalgate-source-release",
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
export const professionalEpicClaim = professionalEpic;
export const professionalDecisionClaim = professionalDecision;
export const evalgateClaim = withEvidenceUrl(evalgate, "EvalGate");

const [
  twentyGrouping,
  twentyAutosave,
  twentySelection,
  nanobotDigest,
  nanobotPairing,
  polyglotSource,
  telcoSource,
] = selectPublicClaims(registry, [
  "twenty-pr-26787",
  "twenty-pr-26969",
  "twenty-pr-27041",
  "nanobot-pr-4352",
  "nanobot-pr-4433",
  "polyglot-engine-public-source",
  "telco-agent-public-source",
]);

export const openSourceClaims = {
  twenty: [
    withEvidenceUrl(twentyGrouping, "Twenty grouping"),
    withEvidenceUrl(twentyAutosave, "Twenty autosave"),
    withEvidenceUrl(twentySelection, "Twenty selection"),
  ],
  nanobot: [
    withEvidenceUrl(nanobotDigest, "nanobot digest"),
    withEvidenceUrl(nanobotPairing, "nanobot pairing"),
  ],
} as const;

export const supportingRepositoryClaims = [
  withEvidenceUrl(polyglotSource, "Polyglot Engine"),
  withEvidenceUrl(telcoSource, "Telco Troubleshooting Agent"),
] as const;

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
