import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Globe from "@/components/Globe";
import { Chips, Eyebrow, Pattern } from "@/components/ui";

export const metadata: Metadata = { title: "About" };

const stops = [
  ["2017", "Intercut Productions"],
  ["2020", "Bentonville Chamber"],
  ["2021", "The Starr Conspiracy"],
  ["2023", "SF AIDS Foundation"],
  ["2024", "hireEZ"],
  ["2025", "The Starr Conspiracy"],
  ["Now", "Director, Brand & Growth"],
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
    body: "Key accounts at The Starr Conspiracy, a $2.2M monthly number at hireEZ, then back to TSC to lead brand and growth. Everything I touch now gets measured against pipeline and revenue.",
    chips: ["$1.72M ARR", "+15–20% over target"],
  },
];

const habits = [
  { title: "Wrong out loud", body: "I’ll put a clear point of view on the table early, even if it turns out to be wrong. A team can react to something specific. It can’t do much with a deck that’s careful enough to agree with everyone." },
  { title: "Diagnose, then spend", body: "Before we add budget, I want to know what’s actually broken. Soft pipeline is often a positioning problem, and spending more on a message nobody remembers just makes it more expensive." },
  { title: "I make the thing", body: "I can open Figma and build it myself, so the idea you approve is the one that ships. Nothing gets lost between the strategy deck and the designer." },
];

export default function About() {
  return (
    <>
      <section className="hero about-hero dark">
        <Pattern kind="sunrise" />
        <div className="color-bar" aria-hidden />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Eyebrow>About</Eyebrow>
            <h1 className="h1">I’m the one in the strategy meeting who asks the question everyone hoped to skip. Then I stay and do the&nbsp;work.</h1>
            <p className="lede">
              I’m Evan Addison Payne, Director of Brand & Growth Strategy at The Starr Conspiracy, an AI-native B2B agency. I’m based in Chicago.
              Most of my work is with Work Tech, HR tech, and SaaS companies that have a real product and a market that can’t tell them apart from the
              next vendor. I help them figure out why, then fix&nbsp;it.
            </p>
            <div className="btns">
              <Link href="/contact" className="btn btn-signal">Let’s talk</Link>
              <Link href="/resume" className="btn btn-ghost">See the resume</Link>
            </div>
          </div>
          <div className="frame art" style={{ aspectRatio: "460 / 620" }}>
            <img src="/art/desk.webp" alt="Engraved line drawing of a desk at night: lamp, open notebook, record player, and the Chicago skyline through the window" width={920} height={1240} />
          </div>
        </div>
      </section>

      <section className="section light" aria-labelledby="long-way">
        <Pattern kind="passport" />
        <div className="wrap">
          <div className="split-head">
            <div className="section-head" style={{ margin: 0 }}>
              <Eyebrow>The long way here</Eyebrow>
              <h2 className="h2" id="long-way">Arkansas, then straight into the&nbsp;work.</h2>
            </div>
            <p className="lede">
              I went from the University of Arkansas straight into a production company, then into civic and nonprofit marketing, then B2B tech.
              Every one of those jobs answered to a number, and every one taught me something I still&nbsp;use.
            </p>
          </div>

          <div className="career">
            <ol className="career-strip">
              {stops.map(([y, l], i) => (
                <li key={y + l}>
                  <span className={`dot${i === stops.length - 1 ? " now" : ""}`} />
                  <span className="year">{y}</span>
                  <span className="label">{l}</span>
                </li>
              ))}
            </ol>
            <ol className="career-list">
              {stops.map(([y, l], i) => (
                <li key={y + l}>
                  <span className={`dot${i === stops.length - 1 ? " now" : ""}`} />
                  <span className="year">{y}</span>
                  <span className="label">{l}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="cards c3">
            {chapters.map((c) => (
              <article className="card chapter" key={c.n}>
                <p className="card-num">({c.n})</p>
                <h3 className="card-title">{c.title}</h3>
                <p className="meta">{c.meta.replace("   ·   ", "  ·  ")}</p>
                <p className="body">{c.body}</p>
                <Chips items={c.chips} />
              </article>
            ))}
          </div>

          <div className="career-foot">
            <p className="italic">University of Arkansas, B.S. in Business Administration, marketing and economics.</p>
            <Link href="/resume" className="link-arrow">See the full resume <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section dark" aria-labelledby="how">
        <div className="wrap">
          <div className="section-head">
            <Eyebrow>How I work</Eyebrow>
            <h2 className="h2" id="how">What it’s like to work with&nbsp;me.</h2>
          </div>
          <div className="cards c3">
            {habits.map((h, i) => (
              <article className="card move-card" key={h.title}>
                <p className="card-num">({["I", "II", "III"][i]})</p>
                <h3 className="card-title">{h.title}</h3>
                <p className="body">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section light" aria-labelledby="otc">
        <Pattern kind="passport" />
        <div className="wrap">
          <div className="otc-grid">
            <div className="otc-copy">
              <Eyebrow>Outside of work</Eyebrow>
              <h2 className="h2" id="otc">I’m usually somewhere&nbsp;else.</h2>
              <p className="lede">
                Most of my time off goes to getting somewhere new. Twelve countries so far, and I’m nowhere near done. Every new city starts the same
                way. I find the good bar, then I walk until I’m lost. If you ask me where to go next, I’ll say&nbsp;Prague.
              </p>
              <p className="lede">
                Back in Chicago, my favorite nights are the ones I host. A long table, a big dinner, and friends who stay a lot later than they
                planned. Lollapalooza is my festival. Industry is my show right now. And late at night it’s Charli XCX, John Summit or Slayyyter,
                usually while I’m working on something I couldn’t crack during the&nbsp;day.
              </p>
            </div>
            <dl className="otc-list">
              <div><dt>On repeat</dt><dd>Charli XCX, John Summit, Slayyyter.</dd></div>
              <div><dt>Watching</dt><dd>Industry, on HBO.</dd></div>
              <div><dt>Send a friend to</dt><dd>Prague.</dd></div>
              <div><dt>Someday</dt><dd>A canal house in Amsterdam.</dd></div>
            </dl>
          </div>
          <Globe />
        </div>
      </section>

      <Footer />
    </>
  );
}
