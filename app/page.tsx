import Link from "next/link";
import Footer from "@/components/Footer";
import { CaseCard, CaseRow, Eyebrow, Pattern, Portrait, Tape, Tarot } from "@/components/ui";
import { cases } from "@/lib/cases";
import { site } from "@/lib/site";

const stances = [
  { n: 1, name: "The Crowd", title: "Sameness is a revenue problem.", body: "When buyers can’t tell you apart, they go with whoever’s cheapest or whoever they heard of first, and you end up paying full price for marketing nobody remembers." },
  { n: 2, name: "The Committee", title: "Consensus kills\u00a0brands.", body: "Every round of “can we soften this a little” sands off another edge, until you’re left with a message everyone signed off on and nobody can repeat." },
  { n: 3, name: "The Spark", title: "AI is an accelerant, not a substitute.", body: "I use it every day, and it’s brilliant at going faster. It’s useless at deciding where you should be going in the first place, which is still your job." },
  { n: 4, name: "The Compass", title: "Positioning before demand\u00a0gen.", body: "When pipeline goes soft, the instinct is to spend more. Usually the problem sits upstream, in a story that never gave anyone a reason to pick you." },
  { n: 5, name: "The Ghost", title: "Safe is not low\u00a0risk.", body: "Playing it safe feels responsible right up until you realize nobody noticed you were in the room." },
];

export default function Home() {
  const [featured, ...rest] = cases;
  return (
    <>
      {/* HERO */}
      <section className="hh dark">
        <Pattern kind="sunrise" />
        <div className="color-bar" aria-hidden />
        <div className="wrap hh-stack">
          <div className="hh-row">
            <div className="hh-copy">
              <Eyebrow className="off">{`${site.title}   ·   ${site.city}`}</Eyebrow>
              <h1 className="hh-h1">Somewhere under all that safe, sanded-down messaging is a company worth&nbsp;remembering.</h1>
              <p className="hh-lede off">
                I’m Evan Addison Payne, and I run brand and growth strategy for Work Tech, HR tech, and SaaS companies. I dig through the decks, the
                positioning docs, and the sticky-note walls until I find the thing only you can say. Then I help you say it out loud, like you mean it,
                to buyers who’ve heard every version of “all-in-one platform” there&nbsp;is.
              </p>
            </div>
            <div className="hh-portrait">
              <Portrait />
            </div>
          </div>
          <div className="btns off">
            <Link href="/contact" className="btn btn-signal">Let’s talk</Link>
            <Link href="#brand-therapy" className="btn btn-ghost">Read Brand Therapy</Link>
          </div>
        </div>
      </section>

      {/* STANCES */}
      <section className="hs light" aria-labelledby="stances">
        <Pattern kind="passport" />
        <Tape position="top" />
        <Tape position="bottom" />
        <div className="wrap hs-stack">
          <Eyebrow className="off">What I believe</Eyebrow>
          <h2 className="hs-h2" id="stances">Five things I’ll argue about at the bar, at dinner, and in your quarterly planning&nbsp;meeting.</h2>
          <div className="stances off">
            {stances.map((s) => (
              <div className="stance" key={s.n}>
                <Tarot src={`/art/tarot_${s.n}.webp`} alt={`Tarot card ${s.n}, ${s.name}`} />
                <h3 className="st-title">{s.title}</h3>
                <p className="st-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND THERAPY */}
      <section className="hb orange" id="brand-therapy" aria-labelledby="bt">
        <Pattern kind="rays" />
        <div className="wrap hb-wrap">
          <div className="hb-stack">
            <Eyebrow className="off">The newsletter   ·   On LinkedIn</Eyebrow>
            <h2 className="hb-h" id="bt">Brand Therapy</h2>
            <p className="hb-lede off">
              A newsletter for anyone who’s sat through one too many messaging workshops. Each issue takes one thing that’s quietly wrong with B2B
              brands, pulls it apart on the table, and tells you what I’d actually do about it. No framework with a cute acronym&nbsp;required.
            </p>
            <figure className="pull off">
              <span className="pull-rule" aria-hidden />
              <span className="pull-text">
                <q>You’re not under-marketing. You’re under-differentiating.</q>
                <figcaption>
                  <span className="ey-in">
                    <span className="ey-seg"><span className="ey-sep" aria-hidden>{"   ·   "}</span><span className="ey-txt">From issue (I)</span></span>
                    <span className="ey-seg"><span className="ey-sep" aria-hidden>{"   ·   "}</span><span className="ey-txt">You all sound the same. It’s costing millions.</span></span>
                  </span>
                </figcaption>
              </span>
            </figure>
            <div className="btns off">
              <Link href="/writing/you-all-sound-the-same" className="btn btn-dark">Read issue (I)</Link>
              {site.newsletter && (
                <a href={site.newsletter} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Subscribe on LinkedIn</a>
              )}
            </div>
          </div>
          <div className="hb-card">
            <Tarot src="/art/tarot_issue.webp" alt="Issue (I) card, You all sound the same" />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="hw dark" aria-labelledby="work">
        <div className="wrap hw-stack">
          <Eyebrow className="off">Selected work</Eyebrow>
          <h2 className="hw-h2" id="work">The proof, with names where I’m allowed to use them and honest descriptions where I’m&nbsp;not.</h2>
          <div className="cases">
            <CaseCard c={featured} featured />
            <div className="cases-row">
              <CaseCard c={rest[0]} />
              <CaseCard c={rest[1]} />
            </div>
            <div className="case-list">
              <CaseRow c={rest[2]} />
              <CaseRow c={rest[3]} />
              <div className="see-all">
                <Link href="/work" className="btn btn-outline-signal">See all work&nbsp;&nbsp;→</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="ha light" aria-labelledby="about">
        <Pattern kind="passport" />
        <div className="color-bar" aria-hidden />
        <div className="wrap ha-stack">
          <div className="ha-row">
            <div className="ha-art">
              <img src="/art/desk.webp" alt="Engraved line drawing of a desk at night: lamp, open notebook, record player, and the Chicago skyline through the window" width={920} height={1240} loading="lazy" />
            </div>
            <div className="ha-copy">
              <Eyebrow className="off">About</Eyebrow>
              <h2 className="ha-h2" id="about">I’m the one in the strategy meeting who asks the question everyone hoped to skip. Then I stay and do the&nbsp;work.</h2>
              <p className="ha-lede off">
                By day I’m Director of Brand & Growth Strategy at The Starr Conspiracy, an AI-native B2B agency. Most of my work is with Work Tech, HR
                tech, and SaaS companies that have a real product and a market that can’t tell them apart from the next vendor. I help them figure out
                why, then fix&nbsp;it.
              </p>
              <p className="habits off">
                <span>Wrong out loud</span><span className="diamond" aria-hidden />
                <span>Diagnose, then spend</span><span className="diamond" aria-hidden />
                <span>I make the thing</span>
              </p>
              <p className="ha-italic off">
                Most of my time off goes to getting somewhere new. Twelve countries so far, and I’m nowhere near done. Back in Chicago, my favorite
                nights are the ones I&nbsp;host.
              </p>
            </div>
          </div>
          <div className="ha-btn">
            <Link href="/about" className="btn btn-ghost">Read the long version</Link>
          </div>
          <img className="stamps" src="/art/stamps.webp" alt="Passport stamps: ORD, home base. AMS, someday. PRG, go here." width={720} height={520} loading="lazy" />
        </div>
      </section>

      <Footer />
    </>
  );
}
