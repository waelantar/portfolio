import rawRegistry from "../../../content/claims.json";
import {
  selectPublicClaims,
  validateClaimRegistry,
  type PublicClaim,
} from "./claim-validation";

const registry = validateClaimRegistry(rawRegistry);

// Featured page content is explicitly selected from the approved registry.
const [intro, professional, evalgate, openSource] = selectPublicClaims(
  registry,
  [
    "romulus-product-frontend",
    "romulus-call-analytics-frontend",
    "evalgate-source-release",
    "twenty-pr-26787",
  ],
);

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
export const evalgateClaim = withEvidenceUrl(evalgate, "EvalGate");
export const openSourceClaim = withEvidenceUrl(openSource, "Open source");
