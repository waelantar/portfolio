import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  openSourceClaims,
  supportingRepositoryClaims,
} from "@/lib/public-claims";

export const metadata: Metadata = {
  title: "Merged open-source contributions | Wael Antar",
  description:
    "Five merged TypeScript and Python open-source pull requests by Wael Antar, with direct links and exact contribution scope.",
};

const twentyContributions = [
  {
    number: "26787",
    title: "Grouping by each selected value",
    claim: openSourceClaims.twenty[0],
  },
  {
    number: "26969",
    title: "Selection after image autosave",
    claim: openSourceClaims.twenty[1],
  },
  {
    number: "27041",
    title: "Multi-record selection in side panels",
    claim: openSourceClaims.twenty[2],
  },
] as const;

const nanobotContributions = [
  {
    number: "4352",
    title: "A token-bounded history digest",
    claim: openSourceClaims.nanobot[0],
  },
  {
    number: "4433",
    title: "Consistent sender IDs at pairing boundaries",
    claim: openSourceClaims.nanobot[1],
  },
] as const;

const supportingRepositories = [
  { title: "Polyglot Engine", claim: supportingRepositoryClaims[0] },
  {
    title: "Telco Troubleshooting Agent",
    claim: supportingRepositoryClaims[1],
  },
] as const;

function ContributionList({
  items,
}: {
  items: readonly {
    number: string;
    title: string;
    claim:
      | (typeof twentyContributions)[number]["claim"]
      | (typeof nanobotContributions)[number]["claim"];
  }[];
}) {
  return (
    <ol className="oss-contribution-list">
      {items.map(({ number, title, claim }) => (
        <li className="oss-contribution" key={claim.id}>
          <div className="oss-contribution-topline">
            <span>PR #{number}</span>
            <span>Merged open source</span>
          </div>
          <h3>{title}</h3>
          <p>{claim.statement}</p>
          <p className="oss-scope">{claim.scope}</p>
          <a className="case-source" href={claim.evidenceUrl}>
            Inspect merged PR #{number}{" "}
            <span aria-hidden="true">{"\u2197"}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function OpenSourcePage() {
  const mergedCount = twentyContributions.length + nanobotContributions.length;

  return (
    <main className="shell">
      <SiteHeader />
      <article className="detail-page oss-page" aria-labelledby="oss-title">
        <a className="back-link" href="/#work">
          <span aria-hidden="true">&larr;</span> Selected work
        </a>

        <header className="case-hero oss-hero">
          <p className="eyebrow">Open source / Direct proof</p>
          <h1 id="oss-title">Small fixes. Visible evidence.</h1>
          <p className="detail-lead">
            {mergedCount} merged pull requests across TypeScript product code
            and a Python agent project. Each link goes to the contribution
            itself.
          </p>
          <div className="oss-facts" aria-label="Open-source work at a glance">
            <div>
              <strong>{mergedCount}</strong>
              <span>Merged PRs</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Host projects</span>
            </div>
            <div>
              <strong>{supportingRepositories.length}</strong>
              <span>Public source explorations</span>
            </div>
          </div>
        </header>

        <nav className="case-jump" aria-label="On this evidence page">
          <a href="#twenty">01 / Twenty</a>
          <a href="#nanobot">02 / nanobot</a>
          <a href="#supporting">03 / Supporting</a>
          <a href="#scope">04 / Scope</a>
        </nav>

        <section
          className="case-section"
          id="twenty"
          aria-labelledby="twenty-title"
        >
          <p className="case-kicker">01 / TypeScript and React</p>
          <h2 id="twenty-title">Three changes in Twenty.</h2>
          <p className="case-copy">
            Grouping behaviour, rich-text editing and side-panel selection each
            have a separate merged change to inspect.
          </p>
          <ContributionList items={twentyContributions} />
        </section>

        <section
          className="case-section"
          id="nanobot"
          aria-labelledby="nanobot-title"
        >
          <p className="case-kicker">02 / Python</p>
          <h2 id="nanobot-title">Two focused agent fixes.</h2>
          <p className="case-copy">
            These are Python contributions to the host project, with their own
            merged PRs and tests.
          </p>
          <ContributionList items={nanobotContributions} />
        </section>

        <section
          className="case-section"
          id="supporting"
          aria-labelledby="supporting-title"
        >
          <p className="case-kicker">03 / Supporting work</p>
          <h2 id="supporting-title">More public source to inspect.</h2>
          <p className="case-copy">
            These personal repositories are source explorations. The links do
            not imply a tagged release, hosted service or production adoption.
          </p>
          <div className="oss-supporting-grid">
            {supportingRepositories.map(({ title, claim }) => (
              <div className="oss-supporting-card" key={claim.id}>
                <span>Public personal repository</span>
                <h3>{title}</h3>
                <p>{claim.statement}</p>
                <a className="case-source" href={claim.evidenceUrl}>
                  Browse source <span aria-hidden="true">{"\u2197"}</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          className="case-section case-limits"
          id="scope"
          aria-labelledby="scope-title"
        >
          <p className="case-kicker">04 / Evidence boundary</p>
          <h2 id="scope-title">Each link proves its own slice.</h2>
          <p>
            A merged PR supports the change linked above; it does not make me
            the owner of Twenty or nanobot. The Python PRs are open-source work,
            not Node.js experience or a shipped personal agent. The two other
            repositories are public code, not deployment evidence.
          </p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
