import Link from "next/link";
import Footer from "@/components/Footer";
import { CaseCard, CaseRow, Eyebrow, Pattern, Portrait, SectionHead, Tape, Tarot } from "@/components/ui";
import { cases } from "@/lib/cases";
import { site } from "@/lib/site";

const stances = [
  { n: 1, name: "The Crowd", title: "Sameness is a revenue problem.", body: "When buyers can’t tell you apart, they go with whoever’s cheapest or whoever they heard of first, and you end up paying full price for marketing nobody remembers." },
  { n: 2, name: "The Committee", title: "Consensus kills brands.", body: "Every round of “can we soften this a little” sands off another edge, until you’re left with a message everyone signed off on and nobody can repeat." },
  { n: 3, name: "The Spark", title: "AI is an accelerant, not a substitute.", body: "I use it every day, and it’s brilliant at going faster. It’s useless at deciding where you should be going in the first place, which is still your job." },
  { n: 4, name: "The Compass", title: "Positioning before demand gen.", body: "When pipeline goes soft, the instinct is to spend more. Usually the problem sits upstream, in a story that never gave anyone a reason to pick you." },
  { n: 5, name: "The Ghost", title: "Safe is not low risk.", body: "Playing it safe feels responsible right up until you realize nobody noticed you were in the room." },
];

export default function Home() {
  const [featured, ...rest] = cases;
  return (
    <>
      {/* HERO */}
      <section className="hero home-hero dark">
        <Pattern kind="sunrise" />
        <div className="color-bar" aria-hidden />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Eyebrow>{`${site.title}   ·   ${site.city}`}</Eyebrow>
            <h1 className="h1">Somewhere under all that safe, sanded-down messaging is a company worth&nbsp;remembering.</h1>
            <p className="lede">
              I’m Evan Addison Payne, and I run brand and growth strategy for Work Tech, HR tech, and SaaS companies. I dig through the decks, the
              positioning docs, and the sticky-note walls until I find the thing only you can say. Then I help you say it out loud, like you mean it,
              to buyers who’ve heard every version of “all-in-one platform” there&nbsp;is.
            </p>
            <div className="btns">
              <Link href="/contact" className="btn btn-signal">Let’s talk</Link>
              <Link href="#brand-therapy" className="btn btn-ghost">Read Brand Therapy</Link>
            </div>
          </div>
          <div className="portrait-wrap">
            <Portrait />
          </div>
        </div>
      </section>

      {/* STANCES */}
      <section className="section light" aria-labelledby="stances">
        <Pattern kind="passport" />
        <Tape position="top" />
        <Tape position="bottom" />
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>What I believe</Eyebrow>
            <h2 className="h2" id="stances">Five things I’ll argue about at the bar, at dinner, and in your quarterly planning&nbsp;meeting.</h2>
          </div>
          <div className="stances">
            {stances.map((s) => (
              <div className="stance" key={s.n}>
                <Tarot src={`/art/tarot_${s.n}.webp`} alt={`Tarot card ${s.n}, ${s.name}`} />
                <h3 className="title">{s.title}</h3>
                <p className="body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND THERAPY */}
      <section className="section orange" id="brand-therapy" aria-labelledby="bt">
        <Pattern kind="rays" />
        <div className="wrap therapy-grid">
          <div>
            <Eyebrow>The newsletter   ·   On LinkedIn</Eyebrow>
            <h2 className="h1" id="bt">Brand Therapy</h2>
            <p className="lede">
              A newsletter for anyone who’s sat through one too many messaging workshops. Each issue takes one thing that’s quietly wrong with B2B
              brands, pulls it apart on the table, and tells you what I’d actually do about it. No framework with a cute acronym&nbsp;required.
            </p>
            <figure className="pull">
              <q>You’re not under-marketing. You’re under-differentiating.</q>
              <figcaption>From issue (I)&nbsp;&nbsp;·&nbsp;&nbsp;You all sound the same. It’s costing millions.</figcaption>
            </figure>
            <div className="btns btns-stretch">
              <Link href="/writing/you-all-sound-the-same" className="btn btn-dark">Read issue (I)</Link>
              {site.newsletter && (
                <a href={site.newsletter} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Subscribe on LinkedIn</a>
              )}
            </div>
          </div>
          <Tarot src="/art/tarot_issue.webp" alt="Issue (I) card, You all sound the same" className="therapy-card" />
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="section dark" aria-labelledby="work">
        <div className="wrap">
          <SectionHead eyebrow="Selected work" title={<span id="work">The proof, with names where I’m allowed to use them and honest descriptions where I’m&nbsp;not.</span>} />
          <div className="case-grid">
            <CaseCard c={featured} featured />
            <div className="case-grid two">
              <CaseCard c={rest[0]} />
              <CaseCard c={rest[1]} />
            </div>
            <div className="case-list">
              <CaseRow c={rest[2]} />
              <CaseRow c={rest[3]} />
            </div>
          </div>
          <Link href="/work" className="btn btn-outline-signal see-all">See all work&nbsp;&nbsp;→</Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section light home-about" aria-labelledby="about">
        <Pattern kind="passport" />
        <div className="color-bar" aria-hidden />
        <div className="wrap">
          <div className="about-grid">
            <div className="frame art" style={{ aspectRatio: "460 / 620" }}>
              <img src="/art/desk.webp" alt="Engraved line drawing of a desk at night: lamp, open notebook, record player, and the Chicago skyline through the window" width={920} height={1240} loading="lazy" />
            </div>
            <div className="about-copy">
              <Eyebrow>About</Eyebrow>
              <h2 className="h2" id="about">I’m the one in the strategy meeting who asks the question everyone hoped to skip. Then I stay and do the&nbsp;work.</h2>
              <p className="lede">
                By day I’m Director of Brand & Growth Strategy at The Starr Conspiracy, an AI-native B2B agency. Most of my work is with Work Tech, HR
                tech, and SaaS companies that have a real product and a market that can’t tell them apart from the next vendor. I help them figure out
                why, then fix&nbsp;it.
              </p>
              <p className="habits">
                <span>Wrong out loud</span><span className="diamond" aria-hidden />
                <span>Diagnose, then spend</span><span className="diamond" aria-hidden />
                <span>I make the thing</span>
              </p>
              <p className="italic">
                Most of my time off goes to getting somewhere new. Twelve countries so far, and I’m nowhere near done. Back in Chicago, my favorite
                nights are the ones I&nbsp;host.
              </p>
              <Link href="/about" className="btn btn-ghost">Read the long version</Link>
            </div>
          </div>
          <img className="stamps" src="/art/stamps.webp" alt="Passport stamps: ORD, home base. AMS, someday. PRG, go here." width={720} height={520} loading="lazy" />
        </div>
      </section>

      <Footer />
    </>
  );
}
