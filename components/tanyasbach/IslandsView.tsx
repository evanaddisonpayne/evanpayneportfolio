"use client";

import Link from "next/link";
import { BASE, DESTS } from "@/lib/tanyasbach";
import { Hibiscus } from "./Art";
import { Marquee, Neon, Postcard } from "./Breaks";

export default function IslandsView() {
  return (
    <>
      <section className="section light tb-pagehead tb-bg-sky">
        <div className="pattern pattern-sunrise" aria-hidden />
        <div className="wrap">
          <p className="eyebrow">Los destinos</p>
          <h1 className="h1">
            Four dossiers. <span className="italic">Read before you vote.</span>
          </h1>
          <p className="lede">May weather, getting in, money, and the one thing to know about each. Costs are our rough read, not quotes.</p>
          <div className="tb-jump">
            {DESTS.map((d) => (
              <a key={d.id} href={`#${d.id}`}>
                {d.name.split(",")[0].split(" /")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Marquee a={["Punta Cana", "Cartagena", "Tulum", "Grace Bay"]} b={["Agua turquesa", "Arena blanca", "Ron", "Ritmo"]} />

      <section className="section light tb-compare-sec">
        <div className="wrap">
          <p className="eyebrow">At a glance</p>
          <div className="tb-compare" role="region" aria-label="Destinations compared" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Destination</th>
                  <th scope="col">Speak</th>
                  <th scope="col">Spend</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Best for</th>
                </tr>
              </thead>
              <tbody>
                {DESTS.map((d) => (
                  <tr key={d.id}>
                    <th scope="row">
                      <a href={`#${d.id}`}>{d.name}</a>
                    </th>
                    <td>{d.lang}</td>
                    <td>{d.money.split(";")[0]}</td>
                    <td className="tb-compare-cost">{d.cost}</td>
                    <td>{d.bestFor.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {DESTS.map((d, i) => (
        <section key={d.id} id={d.id} className={`section light tb-dossier tb-bg-${["blush", "sun", "sea", "sky"][i % 4]}`}>
          <div className="pattern pattern-passport" aria-hidden />
          <div className="wrap tb-dossier-grid">
            <div className="tb-dossier-main">
              <p className="tb-dossier-n">
                ({String(i + 1).padStart(2, "0")}) · {d.coords}
              </p>
              <h2 className="h2">{d.name}</h2>
              <p className="tb-dossier-place">{d.place}</p>
              <p className="tb-dossier-tag italic">{d.tagline}</p>
              <p className="body">{d.pitch}</p>
              {d.oddOne && <p className="tb-odd">{d.oddOne}</p>}
              <p className="chips tb-dossier-chips">
                {d.bestFor.map((b, k) => (
                  <span key={b} style={{ display: "contents" }}>
                    {k > 0 && (
                      <span className="pipe" aria-hidden>
                        |
                      </span>
                    )}
                    <span>{b}</span>
                  </span>
                ))}
              </p>
            </div>
            <div className="card tb-dossier-card">
              <dl className="tb-facts">
                <div>
                  <dt>May</dt>
                  <dd>{d.may}</dd>
                </div>
                <div>
                  <dt>Getting in</dt>
                  <dd>
                    <ul className="tb-facts-list">
                      {d.entry.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Money</dt>
                  <dd>{d.money}</dd>
                </div>
                <div>
                  <dt>Cost</dt>
                  <dd>
                    <strong className="tb-cost">{d.cost}</strong> {d.costNote}
                  </dd>
                </div>
              </dl>
              <p className="tb-watch">
                <span>Heads up</span>
                {d.watch}
              </p>
            </div>
          </div>
        </section>
      ))}

      <Postcard />
      <Neon kicker="Elige bien" line="Choose wisely. She only gets one of these." />

      <section className="section orange tb-cta">
        <Hibiscus className="tb-cta-flower" />
        <div className="wrap">
          <h2 className="h2">Made up your mind?</h2>
          <div className="btns">
            <Link className="btn btn-dark" href={`${BASE}/vote#destination`}>
              Rank the four
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
