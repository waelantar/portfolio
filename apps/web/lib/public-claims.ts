import rawRegistry from "../../../content/claims.json";
import { selectPublicClaims, validateClaimRegistry } from "./claim-validation";

const registry = validateClaimRegistry(rawRegistry);

// This list is the publication allowlist for the current page. A new claim
// cannot appear there until its registry entry passes the build-time gate.
const introClaim = selectPublicClaims(registry, [
  "romulus-product-frontend",
])[0];
if (!introClaim.evidenceUrl) {
  throw new Error("Home intro requires a public evidence URL");
}
export const homeIntroClaim = {
  ...introClaim,
  evidenceUrl: introClaim.evidenceUrl,
};
