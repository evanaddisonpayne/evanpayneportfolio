import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Globe from "@/components/Globe";
import { Eyebrow, Pattern } from "@/components/ui";

export const metadata: Metadata = { title: "About" };

const stops: [string, string, string][] = [
  ["2017", "Intercut", "Productions"],
  ["2020", "Bentonville", "Chamber"],
  ["2021", "The Starr", "Conspiracy"],
  ["2023", "SF AIDS", "Foundation"],
  ["2024", "hireEZ", ""],
  ["2025", "The Starr", "Conspiracy"],
  ["NOW", "Director,", "Brand & Growth"],
];

const chapters = [
  {
    n: "I", title: "The room", meta: "2017 to 2020   ·   Production",
    body: "Three years as Chief of Staff at Intercut Productions, running accounts and turning Fortune 500 initiatives into stories people would actually sit through. Most of what I know about getting and keeping a room’s attention, I learned there.",
    chips: ["Fortune 500 clients", "Emmy-nominated show"],
  },
  {
    n: "II", title: "The mission", meta: "2020 to 2024   ·   Civic and nonprofit",
    body: "A chamber of commerce competing nationally for talent, then a $10M nonprofit program where every dollar had to show up for the mission. The work had to make sense to the people it was for, not just the people approving it.",
    chips: ["+78% impressions", "$10M budget"],
  },
  {
    n: "III", title: "The number", meta: "2021 to now   ·   B2B SaaS and HR tech",
    body: "Marketing strategy at The Starr Conspiracy, a $2.2M monthly number at hireEZ, then back to TSC to lead brand and growth. Everything I touch now gets measured against pipeline and\u00a0revenue.",
    chips: ["$1.72M ARR", "+15–20% over target"],
  },
];

const habits = [
  { title: "Wrong out loud", body: "I’ll put a clear point of view on the table early, even if it turns out to be wrong. A team can react to something specific. It can’t do much with a deck that’s careful enough to agree with everyone." },
  { title: "Diagnose, then spend", body: "Before we add budget, I want to know what’s actually broken. Soft pipeline is often a positioning problem, and spending more on a message nobody remembers just makes it more\u00a0expensive." },
  { title: "I make the thing", body: "I can open Figma and build it myself, so the idea you approve is the one that ships. Nothing gets lost between the strategy deck and the designer." },
];

function Segs({ text }: { text: string }) {
  return (
    <span className="ey-in">
      {text.split(/\s+·\s+/).map((p, i) => (
        <span className="ey-seg" key={i}>
          <span className="ey-sep" aria-hidden>{"   ·   "}</span>
          <span className="ey-txt">{p}</span>
        </span>
      ))}
    </span>
  );
}

export default function About() {
  return (
    <>
      <section className="ab-hero dark">
        <div className="color-bar" aria-hidden />
        <div className="wrap ab-hero-row">
          <div className="ab-hero-copy">
            <Eyebrow className="off">About</Eyebrow>
            <h1 className="ab-h1">I’m the one in the strategy meeting who asks the question everyone hoped to skip. Then I stay and do the&nbsp;work.</h1>
            <p className="ab-lede off">
              I’m Evan Addison Payne, Director of Brand & Growth Strategy at The Starr Conspiracy, an AI-native B2B agency. I’m based in Chicago.
              Most of my work is with Work Tech, HR tech, and SaaS companies that have a real product and a market that can’t tell them apart from the
              next vendor. I help them figure out why, then fix&nbsp;it.
            </p>
            <div className="btns off">
              <Link href="/contact" className="btn btn-signal">Let’s talk</Link>
              <Link href="/resume" className="btn btn-ghost">See the resume</Link>
            </div>
          </div>
          <div className="ab-art">
            <img src="/art/desk.webp" alt="Engraved line drawing of a desk at night: lamp, open notebook, record player, and the Chicago skyline through the window" width={920} height={1240} />
          </div>
        </div>
      </section>

      <section className="ab-long light" aria-labelledby="long-way">
        <Pattern kind="passport" />
        <div className="wrap ab-long-stack">
          <div className="ab-long-head">
            <div className="ab-long-title">
              <Eyebrow>The long way here</Eyebrow>
              <h2 className="ab-h2" id="long-way">Arkansas, then straight into the&nbsp;work.</h2>
            </div>
            <p className="ab-long-lede">
              I went from the University of Arkansas straight into a production company, then into civic and nonprofit marketing, then B2B tech.
              Every one of those jobs answered to a number, and every one taught me something I still&nbsp;use.
            </p>
          </div>

          <ol className="career-strip" aria-label="Career">
            {stops.map(([y, a, b], i) => (
              <li key={y + a} style={{ ["--i" as string]: i }}>
                <span className={`dot${i === stops.length - 1 ? " now" : ""}`} />
                <span className="year">{y}</span>
                <span className="label">{a}{b && <br />}{b}</span>
              </li>
            ))}
          </ol>
          <ol className="career-list" aria-label="Career">
            {stops.map(([y, a, b], i) => (
              <li key={y + a}>
                <span className={`dot${i === stops.length - 1 ? " now" : ""}`} />
                <span className="year">{y}</span>
                <span className="label">{a} {b}</span>
              </li>
            ))}
          </ol>

          <div className="ab-chapters">
            {chapters.map((c) => (
              <article className="ab-chapter" key={c.n}>
                <p className="row"><span className="num">({c.n})</span> <span className="t">{c.title}</span></p>
                <p className="meta"><Segs text={c.meta} /></p>
                <p className="body">{c.body}</p>
                <p className="proof">{c.chips[0]}<span className="pipe" aria-hidden>{"   |   "}</span>{c.chips[1]}</p>
              </article>
            ))}
          </div>

          <div className="ab-long-foot">
            <p className="italic">University of Arkansas, B.S. in Business Administration, marketing and&nbsp;economics.</p>
            <Link href="/resume" className="ab-resume-link">See the full resume&nbsp;&nbsp;→</Link>
          </div>
        </div>
      </section>

      <section className="ab-how dark" aria-labelledby="how">
        <div className="wrap ab-how-stack">
          <Eyebrow className="off">How I work</Eyebrow>
          <h2 className="ab-how-h2" id="how">What it’s like to work with&nbsp;me.</h2>
          <div className="ab-habits off">
            {habits.map((h, i) => (
              <article className="ab-habit" key={h.title}>
                <p className="num">({["I", "II", "III"][i]})</p>
                <h3 className="t">{h.title}</h3>
                <p className="b">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-otc light" aria-labelledby="otc">
        <Pattern kind="passport" />
        <div className="wrap ab-otc-cols">
          <div className="ab-otc-copy">
            <Eyebrow className="off">Outside of work</Eyebrow>
            <h2 className="ab-h2" id="otc">I’m usually somewhere&nbsp;else.</h2>
            <div className="ab-otc-text off">
              <p>
                Most of my time off goes to getting somewhere new. Twelve countries so far, and I’m nowhere near done. Every new city starts the same
                way. I find the good bar, then I walk until I’m lost. If you ask me where to go next, I’ll say&nbsp;Prague.
              </p>
              <p>
                Back in Chicago, my favorite nights are the ones I host. A long table, a big dinner, and friends who stay a lot later than they
                planned. Lollapalooza is my festival. Industry is my show right now. And late at night it’s Charli XCX, John Summit or Slayyyter,
                usually while I’m working on something I couldn’t crack during the&nbsp;day.
              </p>
            </div>
          </div>
          <dl className="otc-list off">
            <div><dt>On repeat</dt><dd>Charli XCX, John Summit, Slayyyter.</dd></div>
            <div><dt>Watching</dt><dd>Industry, on HBO.</dd></div>
            <div><dt>Send a friend to</dt><dd>Prague.</dd></div>
            <div><dt>Someday</dt><dd>A canal house in Amsterdam.</dd></div>
          </dl>
        </div>
        <div className="wrap ab-globe">
          <Globe />
        </div>
      </section>

      <Footer />
    </>
  );
}
