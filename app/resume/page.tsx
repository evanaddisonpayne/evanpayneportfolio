import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";
import { Pattern } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Resume" };

// Every fact on this page comes from Evan (resume, LinkedIn, or confirmed in chat). Don't add numbers or claims without asking.

const scope = [
  { num: "10+", label: "years in brand and growth" },
  { num: "7", label: "direct reports" },
  { num: "75 + 1,000", label: "colleagues and volunteers in cross-functional work" },
  { num: "3", label: "client regions: North America, EMEA, and APAC" },
];

const results = [
  {
    num: "+15–20%",
    text: "Beat a $2.2M monthly revenue target by 15 to 20 percent, consistently, directing the SEO, paid media, and content team.",
    org: "hireEZ",
    year: "2024",
  },
  {
    num: "$10M",
    text: "Ran a $10M event and marketing budget end to end. Online store launches averaged more than $125K in their first 24 hours.",
    org: "San Francisco AIDS Foundation",
    year: "2023–24",
  },
  {
    num: "$1.72M",
    text: "Oversaw $1.72M in recurring annual revenue at a 9.75 NPS, and found $600K in upsell with the sales directors.",
    org: "The Starr Conspiracy",
    year: "2021–22",
  },
];

type Role = { title: string; when?: string; mandate: string; bullets: string[] };
type Job = { org: string; when: string; where: string; note?: string; roles: Role[] };

const jobs: Job[] = [
  {
    org: "The Starr Conspiracy",
    when: "2025 – now",
    where: "Chicago",
    note: "Rejoined in February 2025 and promoted to Director 14 months later.",
    roles: [
      {
        title: "Director of Brand & Growth Strategy",
        when: "April 2026 – now",
        mandate: "Brand and growth strategy for B2B SaaS and HR tech clients, with a cross-functional team across content, design, digital, analytics, and client strategy.",
        bullets: [
          "Lead category positioning and messaging aimed at client win rates and executive engagement.",
          "Run executive thought leadership programs that grow share of voice in HR tech media and on LinkedIn.",
          "Own the attribution, reporting, and KPI dashboards used to optimize CAC and conversion.",
        ],
      },
      {
        title: "Marketing & Brand Strategist",
        when: "Feb 2025 – April 2026",
        mandate: "Enterprise B2B tech accounts, with a focus on AI-integrated growth and Answer Engine Optimization.",
        bullets: [
          "Moved enterprise clients from traditional search to Answer Engine Optimization to increase qualified lead velocity.",
          "Ran in-person client events across North America, EMEA, and APAC that generated qualified leads.",
          "Held a 9.5 NPS across key client accounts, flagging at-risk accounts early and running the interventions that protected long-term revenue.",
        ],
      },
    ],
  },
  {
    org: "hireEZ",
    when: "2024 – 2025",
    where: "Mountain View, CA",
    roles: [
      {
        title: "Senior Manager, Digital Marketing",
        mandate: "HR tech. Led the SEO, paid media, and content team against a $2.2M monthly revenue target.",
        bullets: [
          "Beat the target by 15 to 20 percent, consistently.",
          "Introduced agile workflows and weekly performance sprints to find and scale winning campaigns.",
        ],
      },
    ],
  },
  {
    org: "San Francisco AIDS Foundation, AIDS/​LifeCycle",
    when: "2023 – 2024",
    where: "San Francisco",
    roles: [
      {
        title: "Director of Marketing, Communications & Digital Engagement",
        mandate: "Led the marketing department across a $10M event and marketing budget, including about $200K a year in paid media.",
        bullets: [
          "Aligned multi-channel digital engagement with long-term revenue goals and built integrated plans for MQL and SQL conversion.",
          "Partnered with senior leadership on growth plans, and ran rollout and change management for third-party and custom platforms.",
          "Online store launches averaged more than $125K in revenue in the first 24 hours.",
        ],
      },
    ],
  },
  {
    org: "The Starr Conspiracy",
    when: "2021 – 2022",
    where: "Bentonville, AR",
    roles: [
      {
        title: "Marketing Strategist",
        mandate: "Product marketing and go-to-market for new software products across a key-account portfolio.",
        bullets: [
          "Oversaw $1.72M in recurring annual revenue at a 9.75 NPS, and added $600K in upsell and cross-sell with the sales directors.",
          "Led design sprints and go-to-market strategy for new software products, and built the sales, investor, and analyst decks myself.",
        ],
      },
    ],
  },
  {
    org: "Greater Bentonville Area Chamber of Commerce",
    when: "2020 – 2021",
    where: "Bentonville, AR",
    roles: [
      {
        title: "Director of Marketing & Communications",
        mandate: "Brand, PR, social, and email for a regional chamber competing nationally for talent.",
        bullets: [
          "Rebuilt the brand so the Chamber could compete nationally for remote workers and relocating companies.",
          "Grew social impressions 78 percent in under six months with no paid push.",
        ],
      },
    ],
  },
  {
    org: "Intercut Productions",
    when: "2017 – 2020",
    where: "Bentonville, AR",
    roles: [
      {
        title: "Chief of Staff",
        mandate: "Account management, creative, and production for Fortune 500 clients.",
        bullets: [
          "Hired and oversaw the photographers, cinematographers, editors, and designers, and ran budgets and roadmaps.",
          "Helped make an Emmy-nominated TV show.",
        ],
      },
    ],
  },
];

const capabilities = [
  { t: "Brand and category strategy", b: "Category positioning, messaging, and the executive thought leadership that carries it into the market." },
  { t: "Growth programs", b: "Multi-channel go-to-market across paid, organic, email, social, events, and partners, with the attribution to show what worked." },
  { t: "AI-era search and growth", b: "Answer Engine Optimization and AI-integrated growth programs for enterprise B2B." },
  { t: "Teams and budgets", b: "Player-coach for cross-functional teams, owner of revenue targets and an eight-figure budget, and the executive communication that gets a decision made." },
  { t: "Hands on the work", b: "Figma, Adobe Creative Suite, and design sprints. I still build the decks, sites, and collateral myself." },
];

export default function Resume() {
  return (
    <>
      <section className="rx-head dark" aria-labelledby="rx-name">
        <div className="pattern-corner tall" aria-hidden />
        <div className="wrap">
          <p className="rx-kicker">Resume</p>
          <h1 className="rx-name" id="rx-name">Evan Addison Payne</h1>
          <p className="rx-role"><span>Director of Brand & Growth Strategy</span><span className="rx-dot" aria-hidden>·</span><span>The Starr Conspiracy</span><span className="rx-dot" aria-hidden>·</span><span>Chicago</span></p>
          <p className="rx-pos">
            I lead brand and growth strategy for B2B SaaS and HR tech companies, from the positioning decision to the pipeline it has
            to&nbsp;produce.
          </p>
          <div className="rx-btns">
            <PrintButton />
            {site.linkedin && (
              <a href={site.linkedin} className="rx-link" target="_blank" rel="noopener noreferrer">LinkedIn&nbsp;&nbsp;→</a>
            )}
          </div>
          <dl className="rx-scope">
            {scope.map((s) => (
              <div key={s.label}>
                <dt>{s.num}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rx-body light">
        <Pattern kind="passport" />
        <div className="wrap">
          <section className="rx-block" aria-labelledby="rx-results">
            <h2 className="rx-label" id="rx-results">Results</h2>
            <ol className="rx-results">
              {results.map((r) => (
                <li key={r.num}>
                  <p className="rx-num">{r.num}</p>
                  <p className="rx-text">{r.text}</p>
                  <p className="rx-src">{r.org}<span>{r.year}</span></p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rx-block" aria-labelledby="rx-exp">
            <h2 className="rx-label" id="rx-exp">Experience</h2>
            <div className="rx-jobs">
              {jobs.map((j) => (
                <article className="rx-job" key={j.org + j.when}>
                  <div className="rx-when">
                    <p className="yrs">{j.when}</p>
                    <p className="loc">{j.where}</p>
                  </div>
                  <div className="rx-what">
                    <h3 className="org">{j.org}</h3>
                    {j.note && <p className="note">{j.note}</p>}
                    {j.roles.map((r) => (
                      <div className="rx-role-block" key={r.title}>
                        <h4 className="title">
                          {r.title}
                          {r.when && <span className="dates">{r.when}</span>}
                        </h4>
                        <p className="mandate">{r.mandate}</p>
                        {r.bullets.length > 0 && (
                          <ul className="rx-bullets">
                            {r.bullets.map((b) => <li key={b}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rx-cap dark">
        <div className="wrap">
          <section className="rx-block" aria-labelledby="rx-capabilities">
            <h2 className="rx-label" id="rx-capabilities">Capabilities</h2>
            <dl className="rx-caps">
              {capabilities.map((c) => (
                <div key={c.t}>
                  <dt>{c.t}</dt>
                  <dd>{c.b}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="rx-block rx-edu" aria-labelledby="rx-education">
            <h2 className="rx-label" id="rx-education">Education</h2>
            <div className="rx-edu-row">
              <p className="loc">Fayetteville, AR</p>
              <div>
                <p className="school">University of Arkansas</p>
                <p className="degree">B.S. in Business Administration, marketing and economics</p>
              </div>
              <p className="rx-more">
                References, letters, and certifications on request.&nbsp;&nbsp;<Link href="/contact">Get in touch&nbsp;→</Link>
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
}
