import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";
import { Chips, Eyebrow, Pattern, Stats } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Resume" };

type Role = { title: string; dates?: string; summary: string; bullets: string[]; chips: string[] };
type Employer = { n: string; name: string; when: string; where: string; tour?: string; roles: Role[] };

const employers: Employer[] = [
  {
    n: "I", name: "The Starr Conspiracy", when: "Feb 2025 to now", where: "Chicago, IL",
    roles: [
      {
        title: "Director of Brand & Growth Strategy", dates: "April 2026 to now",
        summary: "Brand and growth strategy for B2B SaaS and HR tech clients. Cross-functional team across content, design, digital, analytics, and client strategy.",
        bullets: [
          "Lead category positioning and messaging aimed at client win rates and executive engagement.",
          "Build multi-channel campaigns across paid, organic, email, social, events, and partner ecosystems.",
          "Run executive thought leadership programs that grow share of voice in HR tech media and on LinkedIn.",
          "Own attribution, reporting, and KPI dashboards used to optimize CAC and conversion.",
        ],
        chips: ["Win rates", "Share of voice", "CAC and conversion"],
      },
      {
        title: "Marketing & Brand Strategist", dates: "Feb 2025 to April 2026   ·   San Francisco, CA and Chicago, IL",
        summary: "Enterprise B2B tech accounts. AI-integrated growth and Answer Engine Optimization.",
        bullets: [
          "Moved enterprise clients from traditional search to Answer Engine Optimization to increase qualified lead velocity.",
          "Turned AI performance data into executive-ready frameworks for high-growth SaaS leaders.",
          "Ran in-person client events across North America, EMEA, and APAC that generated qualified leads.",
          "Flagged at-risk accounts early and ran interventions that protected long-term revenue.",
        ],
        chips: ["9.5 NPS", "3 regions", "AEO programs"],
      },
    ],
  },
  {
    n: "II", name: "hireEZ", when: "Aug 2024 to Jan 2025", where: "Mountain View, CA",
    roles: [
      {
        title: "Sr. Manager, Digital Marketing",
        summary: "HR tech. Team of SEO, paid media, and content specialists against a $2.2M monthly revenue target.",
        bullets: [
          "Beat the $2.2M monthly revenue target by 15 to 20 percent, consistently.",
          "Directed the cross-functional SEO, paid media, and content team and built a culture of ownership.",
          "Introduced agile workflows and weekly performance sprints to find and scale winning campaigns.",
        ],
        chips: ["$2.2M monthly target", "+15–20%"],
      },
    ],
  },
  {
    n: "III", name: "San Francisco AIDS Foundation, AIDS/LifeCycle", when: "Feb 2023 to Aug 2024", where: "San Francisco, CA",
    roles: [
      {
        title: "Director of Marketing, Communications & Digital Engagement",
        summary: "$10M event and marketing budget. About $200K a year in paid media. Led the marketing department.",
        bullets: [
          "Aligned multi-channel digital engagement with long-term revenue goals across a $10M program.",
          "Built integrated plans for MQL and SQL conversion and brand awareness.",
          "Partnered with senior leadership on growth plans, and ran rollout and change management for third-party and custom platforms.",
          "Online store launches averaged more than $125K in revenue in the first 24 hours.",
        ],
        chips: ["$10M budget", "$125K in 24 hours"],
      },
    ],
  },
  {
    n: "IV", name: "The Starr Conspiracy", when: "April 2021 to Nov 2022", where: "Bentonville, AR", tour: "First tour",
    roles: [
      {
        title: "Marketing Strategist, Key Accounts",
        summary: "Product marketing and go-to-market for new software products across a key-account portfolio.",
        bullets: [
          "Oversaw $1.72M in recurring annual revenue with a 9.75 NPS.",
          "Led design sprints and go-to-market strategy for new software products.",
          "Found upsell and cross-sell openings with sales directors that added $600K in revenue.",
          "Built the sales decks, investor and analyst decks, websites, and collateral myself.",
        ],
        chips: ["$1.72M ARR", "9.75 NPS", "+$600K"],
      },
    ],
  },
  {
    n: "V", name: "Greater Bentonville Area Chamber of Commerce", when: "March 2020 to April 2021", where: "Bentonville, AR",
    roles: [
      {
        title: "Director of Marketing & Communications",
        summary: "Brand, PR, social, and email for a regional chamber competing nationally for talent.",
        bullets: [
          "Rebuilt the brand so the Chamber could compete nationally for remote workers and relocating companies.",
          "Grew social impressions 78 percent and engagement 22.5 percent in under six months.",
          "Beat industry email open and click rates by 6 and 3 percent with no paid push.",
          "Led PR from day-to-day programs through high-profile launches and partnerships.",
        ],
        chips: ["+78% impressions", "+22.5% engagement"],
      },
    ],
  },
  {
    n: "VI", name: "Intercut Productions", when: "July 2017 to March 2020", where: "Bentonville, AR",
    roles: [
      {
        title: "Chief of Staff",
        summary: "Fortune 500 clients. Account management, creative, and the crew behind it.",
        bullets: [
          "Steered creative concepts and content that told Fortune 500 clients’ brand innovation and CSR stories.",
          "Protected brand positioning across every piece of content and customer touchpoint.",
          "Hired and oversaw the photographers, cinematographers, editors, and designers, and ran budgets and roadmaps.",
          "Helped make an Emmy-nominated TV show.",
        ],
        chips: ["Fortune 500 clients", "Emmy-nominated show"],
      },
    ],
  },
];

const skills = [
  { title: "Growth & AI", body: "Answer Engine Optimization, AI-integrated growth programs, ABM, category creation, full-funnel optimization" },
  { title: "Design & UX", body: "Figma, Adobe Creative Suite, design sprint facilitation, UI and UX strategy" },
  { title: "Operations", body: "Expert Excel and PowerPoint, Asana, Trello, CRM management, agile marketing workflows" },
  { title: "Leadership", body: "Player-coach, cross-functional team management, and the kind of executive communication that gets a decision made" },
];

export default function Resume() {
  return (
    <>
      <section className="section dark">
        <Pattern kind="rays" />
        <div className="wrap resume-head">
          <div className="hero-copy">
            <Eyebrow>Director, Brand & Growth   ·   The Starr Conspiracy   ·   Chicago, IL</Eyebrow>
            <h1 className="h1">I’ve worked in agencies, startups, and nonprofits, and it has always been the same&nbsp;job.</h1>
            <p className="lede">
              Find the thing that makes a company worth choosing, then build the programs that make the market see it. Ten years across agency,
              in-house, nonprofit, and production, mostly in B2B SaaS and HR tech. I’ve owned revenue targets and an eight-figure budget, led
              cross-functional teams, and I still make a lot of the work&nbsp;myself.
            </p>
            <div className="btns">
              <PrintButton />
              <Link href="/contact" className="btn btn-ghost">Let’s talk</Link>
              {site.linkedin && (
                <a href={site.linkedin} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">LinkedIn&nbsp;→</a>
              )}
            </div>
          </div>
          <dl className="facts">
            <div><dt>Based in</dt><dd>Chicago, IL</dd></div>
            <div><dt>Focus</dt><dd>B2B SaaS, HR tech, Work Tech</dd></div>
            <div><dt>Experience</dt><dd>10+ years in brand and growth</dd></div>
            <div><dt>References</dt><dd>Letters of recommendation on request</dd></div>
          </dl>
        </div>
      </section>

      <section className="section orange">
        <div className="wrap">
          <div className="proof-head">
            <div className="section-head" style={{ margin: 0 }}>
              <Eyebrow>The short version</Eyebrow>
              <h2 className="h2">Six numbers, if you only read&nbsp;six.</h2>
            </div>
            <p className="italic">Every number is real and every one is mine to stand behind.</p>
          </div>
          <Stats
            cols={3}
            stats={[
              { num: "+15–20%", label: "over a $2.2M monthly revenue target, consistently", org: "hireEZ" },
              { num: "$10M", label: "event and marketing budget, run end to end", org: "San Francisco AIDS Foundation" },
              { num: "$1.72M", label: "in recurring annual revenue overseen, plus $600K in upsell", org: "The Starr Conspiracy" },
              { num: "9.75 and 9.5", label: "NPS across key client accounts, in both tours", org: "The Starr Conspiracy" },
              { num: "14 months", label: "from rehire to Director of Brand & Growth", org: "The Starr Conspiracy" },
              { num: "+78%", label: "social impressions in under six months, no paid push", org: "Bentonville Chamber of Commerce" },
            ]}
          />
        </div>
      </section>

      <section className="section light">
        <Pattern kind="passport" />
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>Experience</Eyebrow>
            <h2 className="h2">What I owned, and what came of&nbsp;it.</h2>
          </div>
          <div>
            {employers.map((e) => (
              <article className="employer" key={e.n}>
                <div>
                  <p className="card-num">({e.n})</p>
                  <h3 className="name">{e.name}</h3>
                  <p className="when">{e.when}</p>
                  <p className="where">{e.where}</p>
                  {e.tour && <span className="tour">{e.tour}</span>}
                </div>
                <div>
                  {e.roles.map((r) => (
                    <div className="role" key={r.title}>
                      <h4 className="title">{r.title}</h4>
                      {r.dates && <p className="dates">{r.dates}</p>}
                      <p className="summary">{r.summary}</p>
                      <ul className="bullets">
                        {r.bullets.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                      <Chips items={r.chips} />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>What I bring to the table</Eyebrow>
            <h2 className="h2">A strategist who can also open Figma and make the thing, and a designer who will still ask what it’s supposed to do for&nbsp;revenue.</h2>
          </div>
          <div className="cards c4" style={{ "--gap": "24px" } as CSSProperties}>
            {skills.map((s, i) => (
              <article className="card move-card" key={s.title}>
                <p className="card-num">({["I", "II", "III", "IV"][i]})</p>
                <h3 className="card-title">{s.title}</h3>
                <p className="body">{s.body}</p>
              </article>
            ))}
          </div>
          <div className="skills-foot">
            <div>
              <Eyebrow>Education</Eyebrow>
              <p className="name">University of Arkansas</p>
              <p className="body" style={{ marginTop: 6 }}>B.S. in Business Administration, marketing and economics&nbsp;&nbsp;·&nbsp;&nbsp;Fayetteville, AR</p>
            </div>
            <div>
              <Eyebrow>More on request</Eyebrow>
              <p className="inline-links">
                <Link href="/contact">References and letters</Link>
                <Link href="/contact">Certifications</Link>
                {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
