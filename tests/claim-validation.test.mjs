import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  selectPublicClaims,
  validateClaimRegistry,
} from "../apps/web/lib/claim-validation.ts";

const original = JSON.parse(
  readFileSync(new URL("../content/claims.json", import.meta.url), "utf8"),
);

function changedClaim(id, changes) {
  const fixture = structuredClone(original);
  const claim = fixture.claims.find((item) => item.id === id);
  assert.ok(claim, `Fixture is missing ${id}`);
  Object.assign(claim, changes);
  return fixture;
}

test("approved claims expose only a public projection", () => {
  const registry = validateClaimRegistry(original);
  const [intro, employer] = selectPublicClaims(registry, [
    "romulus-product-frontend",
    "romulus-call-analytics-frontend",
  ]);
  assert.equal(intro.statement, original.claims[0].statement);
  assert.equal(intro.proofKind, "public-link");
  assert.equal(employer.proofKind, "approved-confidential-summary");
  assert.equal(employer.evidenceUrl, null);
  assert.equal("note" in intro, false);
  assert.equal("privacySafeExplanation" in employer, false);
});

test("a featured claim needs recognized provenance and review dates", () => {
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("romulus-product-frontend", { sourceCheck: null }),
      ),
    /recognized provenance and review dates/,
  );
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("romulus-product-frontend", { verifiedAt: null }),
      ),
    /recognized provenance and review dates/,
  );
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("evalgate-source-release", {
          sourceCheck: "public_merged_pr_verified",
        }),
      ),
    /recognized provenance and review dates/,
  );
});

test("a published claim needs an approved review state", () => {
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("romulus-product-frontend", { reviewState: "held" }),
      ),
    /cannot be published without approved review state/,
  );
});

test("a context URL cannot stand in for proof", () => {
  const fixture = changedClaim("romulus-product-frontend", {
    evidenceUrl: null,
    publicContextUrl: "https://example.org/context",
  });
  assert.throws(
    () => validateClaimRegistry(fixture),
    /public proof link or an approved confidential-work explanation/,
  );
});

test("confidential work needs its exact approved explanation", () => {
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("romulus-call-analytics-frontend", {
          privacySafeExplanation: null,
        }),
      ),
    /public proof link or an approved confidential-work explanation/,
  );
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("romulus-call-analytics-frontend", {
          sourceCheck: "public_profile_self_reported",
        }),
      ),
    /public proof link or an approved confidential-work explanation/,
  );
});

test("held and unknown claims cannot be featured", () => {
  const registry = validateClaimRegistry(
    changedClaim("romulus-product-frontend", {
      reviewState: "held",
      publication: "held",
    }),
  );
  assert.throws(
    () => selectPublicClaims(registry, ["romulus-product-frontend"]),
    /not approved for publication/,
  );
  assert.throws(
    () => selectPublicClaims(registry, ["missing-claim"]),
    /does not exist/,
  );
});

test("unsafe links and duplicate IDs fail validation", () => {
  assert.throws(
    () =>
      validateClaimRegistry(
        changedClaim("romulus-product-frontend", {
          evidenceUrl: "javascript:alert(1)",
        }),
      ),
    /must be an HTTPS URL/,
  );
  const fixture = structuredClone(original);
  fixture.claims[1].id = fixture.claims[0].id;
  assert.throws(() => validateClaimRegistry(fixture), /duplicate ID/);
});
