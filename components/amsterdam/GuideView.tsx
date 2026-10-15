"use client";

import { crew, hotel, knowhow, phrases, profiles } from "@/lib/amsterdam";
import { useState } from "react";
import { useAms } from "./AmsProvider";

export default function GuideView() {
  const { me } = useAms();
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <>
      <section className="section dark ams-pagehead">
        <div className="wrap">
          <p className="eyebrow">Reference</p>
          <h1 className="h2">Guide</h1>
          <nav className="ams-jump" aria-label="On this page">
            <a href="#crew">Who lands when</a>
            <a href="#know">Local know-how</a>
            <a href="#dutch">Dutch</a>
          </nav>
        </div>
      </section>

      <section className="section dark ams-crew-sec" id="crew">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The crew</p>
            <h2 className="h2">Who&apos;s who, and who lands when.</h2>
            <p className="lede">
              Home base is {hotel.name}, {hotel.address}. {hotel.how}
            </p>
          </div>
          <ul className="ams-crew">
            {crew.map((c, i) => (
              <li key={c.name} className={`card ams-person${me === c.name ? " is-me" : ""}`}>
                <span className="card-num">{["I", "II", "III", "IV"][i]}</span>
                <p className="card-title">{c.name}</p>
                <p className="ams-person-vibe">{profiles[c.name].headline}</p>
                <p className="ams-person-src">{profiles[c.name].sourceNote}</p>
                <p className="ams-person-meta">
                  {c.from}
                  <br />
                  {c.room}
                </p>
                <dl className="ams-legs">
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

      <section className="section dark ams-know-sec" id="know">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Local know-how</p>
            <h2 className="h2">What a friend who lives here would tell you.</h2>
          </div>
          <div className="ams-know">
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

      <section className="section orange ams-phrase-sec" id="dutch">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Spreek je Nederlands?</p>
            <h2 className="h2">Six words that get you far.</h2>
            <p className="lede">Tap a card to flip it.</p>
          </div>
          <ul className="ams-phrases">
            {phrases.map((p, i) => (
              <li key={p.nl}>
                <button className={`ams-flip${flipped === i ? " is-flipped" : ""}`} aria-pressed={flipped === i} onClick={() => setFlipped(flipped === i ? null : i)}>
                  <span className="ams-flip-front">
                    <span className="ams-flip-nl">{p.nl}</span>
                    <span className="ams-flip-say">“{p.say}”</span>
                  </span>
                  <span className="ams-flip-back">{p.en}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
