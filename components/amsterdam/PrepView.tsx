"use client";

import Link from "next/link";
import { checklist, days, iamsterdam } from "@/lib/amsterdam";
import { useAms } from "./AmsProvider";
import Packing from "./Packing";
import { stopHref } from "./util";

export default function PrepView() {
  const { me, checks, toggleCheck } = useAms();
  const cardStops = days.flatMap((d) => d.stops.filter((s) => s.card).map((s) => ({ d, s })));
  const allItems = checklist.flatMap((g) => g.items);
  const done = allItems.filter((i) => checks[i.id]).length;

  return (
    <>
      <section className="section dark ams-pagehead">
        <div className="wrap">
          <p className="eyebrow">Before we go</p>
          <h1 className="h2">Prep</h1>
          <nav className="ams-jump" aria-label="On this page">
            <a href="#checklist">Booking checklist</a>
            <a href="#packing">Packing list</a>
            <a href="#card">I amsterdam card</a>
          </nav>
        </div>
      </section>

      <section className="section light ams-check-sec" id="checklist">
        <div className="wrap">
          <div className="split-head ams-check-head">
            <div>
              <p className="eyebrow">Book it</p>
              <h2 className="h2">Booking checklist</h2>
            </div>
            <div className="ams-progress" aria-label={`${done} of ${allItems.length} done`}>
              <div className="ams-progress-num">
                {done}
                <span>/{allItems.length}</span>
              </div>
              <div className="ams-progress-bar">
                <span style={{ width: `${(done / allItems.length) * 100}%` }} />
              </div>
              <p className="ams-hint">Ticks save on this device only.</p>
            </div>
          </div>
          <div className="ams-check-grid">
            {checklist.map((g) => (
              <div key={g.group}>
                <p className="ams-check-group">{g.group}</p>
                <ul className="ams-checks">
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <label className={checks[it.id] ? "is-done" : undefined}>
                        <input type="checkbox" checked={!!checks[it.id]} onChange={() => toggleCheck(it.id)} />
                        <span>{it.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark ams-pack-sec" id="packing">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Pack like you mean it</p>
            <h2 className="h2">
              Four guys, <span className="italic">no laundry.</span>
            </h2>
            <p className="lede">Late-November Amsterdam is cold, damp and cobbled. Pick your name for your own list, with quantities for your trip length. Your ticks save on this device.</p>
          </div>
          <Packing me={me} />
        </div>
      </section>

      <section className="section dark ams-card-sec" id="card">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">I amsterdam City Card</p>
            <h2 className="h2">{cardStops.length} stops in this plan are on the card.</h2>
            <p className="lede">{iamsterdam.summary}</p>
          </div>
          <div className="ams-card-grid">
            <div className="card">
              <p className="card-title">Covered</p>
              <ul className="ams-list ams-list-yes">
                {iamsterdam.covered.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <p className="card-title">Not covered</p>
              <ul className="ams-list ams-list-no">
                {iamsterdam.notCovered.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="card ams-card-when">
              <p className="card-title">When to start it</p>
              <p className="body">{iamsterdam.activation}</p>
              <ul className="ams-card-stops">
                {cardStops.map(({ d, s }) => (
                  <li key={d.id + s.title}>
                    <Link href={stopHref(d, s)}>
                      <span>
                        {d.dow} {s.time}
                      </span>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <a className="link-arrow ams-src" href={iamsterdam.source.href} target="_blank" rel="noopener noreferrer">
                Source: {iamsterdam.source.label} ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
