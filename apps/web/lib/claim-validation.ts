export const claimCategories = [
  "professional",
  "released_personal_project",
  "merged_open_source",
] as const;

export type ClaimCategory = (typeof claimCategories)[number];
export type ReviewState = "approved" | "held" | "draft";
export type PublicationState = "approved" | "held";

export type ClaimRecord = {
  id: string;
  category: ClaimCategory;
  statement: string;
  contributionOwner: string;
  scope: string;
  evidenceUrl: string | null;
  privacySafeExplanation: string | null;
  publicContextUrl: string | null;
  reviewState: ReviewState;
  publication: PublicationState;
  sourceCheck: string | null;
  lastCheckedAt: string | null;
  verifiedAt: string | null;
};

export type ClaimRegistry = {
  schemaVersion: 1;
  updatedAt: string;
  claims: ClaimRecord[];
};

export type PublicClaim = Pick<
  ClaimRecord,
  | "id"
  | "category"
  | "statement"
  | "contributionOwner"
  | "scope"
  | "evidenceUrl"
  | "publicContextUrl"
  | "verifiedAt"
> & { proofKind: "public-link" | "approved-confidential-summary" };

const provenanceByCategory: Record<ClaimCategory, readonly string[]> = {
  professional: [
    "public_profile_self_reported",
    "owner_confirmed_confidential_work_review",
  ],
  released_personal_project: ["public_release_verified"],
  merged_open_source: ["public_merged_pr_verified"],
};

function fail(path: string, reason: string): never {
  throw new Error(`Claim registry: ${path} ${reason}`);
}

function objectAt(value: unknown, path: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(path, "must be an object");
  }
  return value as Record<string, unknown>;
}

function nonEmptyString(
  value: unknown,
  path: string,
  required = true,
): string | null {
  if ((value === undefined || value === null) && !required) return null;
  if (typeof value !== "string" || value.trim() === "") {
    fail(path, "must be a non-empty string");
  }
  return value.trim();
}

function dateAt(value: unknown, path: string, required = true): string | null {
  const date = nonEmptyString(value, path, required);
  if (date === null) return null;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  ) {
    fail(path, "must be an ISO calendar date");
  }
  return date;
}

function httpsUrl(value: unknown, path: string): string | null {
  const url = nonEmptyString(value, path, false);
  if (url === null) return null;
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol === "https:" &&
      parsed.hostname &&
      !parsed.username &&
      !parsed.password
    ) {
      return parsed.href;
    }
  } catch {
    // The error below identifies the field without echoing its value.
  }
  return fail(path, "must be an HTTPS URL without credentials");
}

function choice<T extends string>(
  value: unknown,
  options: readonly T[],
  path: string,
): T {
  if (typeof value !== "string" || !options.includes(value as T)) {
    fail(path, `must be one of: ${options.join(", ")}`);
  }
  return value as T;
}

function parseClaim(value: unknown, index: number): ClaimRecord {
  const path = `claims[${index}]`;
  const raw = objectAt(value, path);
  if (!Object.hasOwn(raw, "evidenceUrl")) {
    fail(`${path}.evidenceUrl`, "must be present (use null when absent)");
  }

  const claim: ClaimRecord = {
    id: nonEmptyString(raw.id, `${path}.id`)!,
    category: choice(raw.category, claimCategories, `${path}.category`),
    statement: nonEmptyString(raw.statement, `${path}.statement`)!,
    contributionOwner: nonEmptyString(
      raw.contributionOwner,
      `${path}.contributionOwner`,
    )!,
    scope: nonEmptyString(raw.scope, `${path}.scope`)!,
    evidenceUrl: httpsUrl(raw.evidenceUrl, `${path}.evidenceUrl`),
    privacySafeExplanation: nonEmptyString(
      raw.privacySafeExplanation,
      `${path}.privacySafeExplanation`,
      false,
    ),
    publicContextUrl: httpsUrl(
      raw.publicContextUrl,
      `${path}.publicContextUrl`,
    ),
    reviewState: choice(
      raw.reviewState,
      ["approved", "held", "draft"] as const,
      `${path}.reviewState`,
    ),
    publication: choice(
      raw.publication,
      ["approved", "held"] as const,
      `${path}.publication`,
    ),
    sourceCheck: nonEmptyString(raw.sourceCheck, `${path}.sourceCheck`, false),
    lastCheckedAt: dateAt(raw.lastCheckedAt, `${path}.lastCheckedAt`, false),
    verifiedAt: dateAt(raw.verifiedAt, `${path}.verifiedAt`, false),
  };

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(claim.id)) {
    fail(`${path}.id`, "must be a stable lowercase slug");
  }
  if (claim.publication === "approved") {
    if (claim.reviewState !== "approved") {
      fail(path, "cannot be published without approved review state");
    }
    if (
      !claim.sourceCheck ||
      !provenanceByCategory[claim.category].includes(claim.sourceCheck) ||
      !claim.lastCheckedAt ||
      !claim.verifiedAt
    ) {
      fail(path, "needs recognized provenance and review dates");
    }
    if (!claim.evidenceUrl) {
      if (
        claim.sourceCheck !== "owner_confirmed_confidential_work_review" ||
        claim.category !== "professional" ||
        !claim.privacySafeExplanation
      ) {
        fail(
          path,
          "needs a public proof link or an approved confidential-work explanation",
        );
      }
    }
  }
  return claim;
}

export function validateClaimRegistry(input: unknown): ClaimRegistry {
  const raw = objectAt(input, "root");
  if (raw.schemaVersion !== 1) {
    fail("schemaVersion", "must be 1");
  }
  const updatedAt = dateAt(raw.updatedAt, "updatedAt")!;
  if (!Array.isArray(raw.claims)) {
    fail("claims", "must be an array");
  }
  const claims = raw.claims.map(parseClaim);
  if (claims.length === 0) fail("claims", "must contain at least one entry");

  const ids = new Set<string>();
  for (const claim of claims) {
    if (ids.has(claim.id)) fail(`claims.${claim.id}`, "has a duplicate ID");
    ids.add(claim.id);
  }
  return { schemaVersion: 1, updatedAt, claims };
}

export function selectPublicClaims(
  registry: ClaimRegistry,
  ids: readonly string[],
): PublicClaim[] {
  if (new Set(ids).size !== ids.length) {
    fail("featured IDs", "must not contain duplicates");
  }
  return ids.map((id) => {
    const claim = registry.claims.find((candidate) => candidate.id === id);
    if (!claim) fail(`featured claim ${id}`, "does not exist");
    if (claim.reviewState !== "approved" || claim.publication !== "approved") {
      fail(`featured claim ${id}`, "is not approved for publication");
    }
    return {
      id: claim.id,
      category: claim.category,
      statement: claim.statement,
      contributionOwner: claim.contributionOwner,
      scope: claim.scope,
      evidenceUrl: claim.evidenceUrl,
      publicContextUrl: claim.publicContextUrl,
      verifiedAt: claim.verifiedAt,
      proofKind: claim.evidenceUrl
        ? "public-link"
        : "approved-confidential-summary",
    };
  });
}
