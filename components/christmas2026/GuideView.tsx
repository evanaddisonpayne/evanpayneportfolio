"use client";

import { useState } from "react";
import { crew, house, knowhow, lingo } from "@/lib/christmas2026";
import { useXm } from "./XmProvider";

const NUMS = ["I", "II", "III", "IV", "V", "VI", "VII"];

export default function GuideView() {
  const { me } = useXm();
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <>
      <section className="section dark xm-pagehead">
        <div className="wrap">
          <p className="eyebrow">Reference</p>
          <h1 className="h2">Guide</h1>
          <nav className="xm-jump" aria-label="On this page">
            <a href="#crew">Who lands when</a>
            <a href="#house">The house</a>
            <a href="#know">Know-how</a>
            <a href="#lingo">Local lingo</a>
          </nav>
        </div>
      </section>

      <section className="section dark xm-crew-sec" id="crew">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The crew</p>
            <h2 className="h2">Who&apos;s who, and who lands when.</h2>
            <p className="lede">
              Everyone lands at Yampa Valley Regional Airport in Hayden, 40 minutes apart, and flies home together on Monday. These are the
              planned flights; none are booked yet.
            </p>
          </div>
          <ul className="xm-crew">
            {crew.map((c, i) => (
              <li key={c.name} className={`card xm-person${me === c.name ? " is-me" : ""}`}>
                <span className="card-num">{NUMS[i]}</span>
                <p className="card-title">{c.name}</p>
                <p className="xm-person-vibe">{c.role}</p>
                <p className="xm-person-meta">
                  {c.from}
                  <br />
                  {c.room}
                </p>
                <dl className="xm-legs">
                  {c.legs.map((l) => (
                    <div key={l.label}>
                      <dt>{l.label}</dt>
                      <dd>
                        <strong>{l.when}</strong>
                        <span>{l.detail}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section light xm-house-sec" id="house">
        <div className="wrap">
          <div className="split-head">
            <div>
              <p className="eyebrow">Home base · {house.status}</p>
              <h2 className="h2">One house, all seven, close to town.</h2>
            </div>
            <p className="lede">{house.target}</p>
          </div>
          <div className="xm-card-grid">
            <div className="card">
              <p className="card-title">Must have</p>
              <ul className="xm-list xm-list-yes">
                {house.musts.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <p className="card-title">Nice to have</p>
              <ul className="xm-list xm-list-star">
                {house.nice.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className="body">
                Search Vrbo and Airbnb for &quot;main level primary&quot;, or call a local manager who can confirm stairs by phone. Fees add
                25–35%.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark xm-know-sec" id="know">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Know-how</p>
            <h2 className="h2">What a friend who lives here would tell you.</h2>
          </div>
          <div className="xm-know">
            {knowhow.map((k, i) => (
              <details key={k.title} open={i === 0}>
                <summary>
                  <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                  {k.title}
                </summary>
                <ul>
                  {k.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section orange xm-phrase-sec" id="lingo">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Talk like a local</p>
            <h2 className="h2">Six words for Ski Town, USA.</h2>
            <p className="lede">Tap a card to flip it.</p>
          </div>
          <ul className="xm-phrases">
            {lingo.map((p, i) => (
              <li key={p.word}>
                <button className={`xm-flip${flipped === i ? " is-flipped" : ""}`} aria-pressed={flipped === i} onClick={() => setFlipped(flipped === i ? null : i)}>
                  <span className="xm-flip-front">
                    <span className="xm-flip-nl">{p.word}</span>
                    <span className="xm-flip-say">{p.say}</span>
                  </span>
                  <span className="xm-flip-back">{p.means}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
