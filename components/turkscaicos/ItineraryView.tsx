"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { BASE, DAYS, FACTS, GROUP_SIZE, LAND_AT, PINS, type Day } from "@/lib/turkscaicos";
import { Marquee, Neon, Sticker, type StickerKind } from "@/components/tanyasbach/Breaks";
import { Catamaran, Pennants, ProvoMap, Splash, Waves } from "./TcArt";
import { useTc } from "./TcShell";

export default function ItineraryView() {
  return (
    <>
      <Hero />
      <Marquee a={["Tanya takes Turks", "May 27–31, 2027", "Grace Bay", "Boat day", "Scarlet Night", "Fish Fry", "Tan lines optional", "¡Salud!"]} />
      <AtAGlance />
      <DayJump />
      {DAYS.map((d, i) => (
        <DaySection key={d.id} day={d} flip={i % 2 === 1} />
      ))}
      <Neon kicker="Island law" line="Lo que pasa en Turks, se queda en Turks." />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const { steelPan, confetti, flash } = useTc();
  const [splash, setSplash] = useState(0);
  const sail = () => {
    steelPan();
    confetti();
    setSplash((s) => s + 1);
    flash("🛥 Boat day is Friday. Pace yourself.");
  };
  return (
    <section className="section light tb-hero tc-hero">
      <Pennants />
      <div className="tb-tape" aria-hidden>
        {"TANYA × TURKS   ·   PROVIDENCIALES   ·   MAYO 2027   ·   TAN LINES OPTIONAL   ·   ".repeat(10)}
      </div>
      <div className="wrap tb-hero-grid tc-hero-grid">
        <div className="tb-hero-copy">
          <p className="eyebrow">
            If Turks wins<span className="dot" aria-hidden>·</span>Providenciales<span className="dot" aria-hidden>·</span>May 27–31, 2027
          </p>
          <h1 className="h1">
            Tanya takes <span className="italic">Turks.</span>
          </h1>
          <p className="lede">
            Four nights, one villa, {GROUP_SIZE} of us. A private catamaran to the sandbar, a red-hot chef&apos;s dinner, a sunset shoot on Grace Bay, a
            pajama party that gets out of hand, and water so blue it looks edited. <strong>Here&apos;s every day, hour by hour.</strong>
          </p>
          <div className="btns tb-hero-btns">
            <a className="btn btn-signal tb-big-btn" href="#day-thu">
              See the days
            </a>
            <Link className="btn tb-big-btn tc-ghost" href={`${BASE}/packing`}>
              What to pack
            </Link>
          </div>
          <Countdown />
        </div>
        <TripTag />
      </div>
      <div className="tc-horizon">
        <button type="button" className="tc-cat-btn" onClick={sail} aria-label="Tap the catamaran">
          <Catamaran />
          <Splash key={splash} />
        </button>
        <Waves />
      </div>
    </section>
  );
}

function TripTag() {
  const rows: [string, string][] = [
    ["Who", "Tanya + 15"],
    ["Where", "Provo, Turks and Caicos"],
    ["Lands", "Thu, May 27"],
    ["Leaves", "Mon, May 31"],
    ["Bed", "One villa, 8 rooms"],
    ["Dress code", "Less, mostly"],
  ];
  return (
    <div className="tc-tag-wrap">
      <div className="tc-tag">
        <div className="tc-tag-hole" aria-hidden />
        <div className="tc-tag-head">
          <span>Luggage tag</span>
          <span>PLS</span>
        </div>
        <p className="tc-tag-big">
          HOME <span aria-hidden>✈</span> PLS
        </p>
        <dl className="tc-tag-grid">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="tc-tag-foot">Fragile: contains one bride</p>
      </div>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  if (now === null) return <div className="tb-count" aria-hidden />;
  const diff = new Date(LAND_AT).getTime() - now;
  if (diff <= 0) return <p className="tb-count-live">¡Llegamos! Wheels down in Provo.</p>;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const cells: [number, string][] = [
    [d, d === 1 ? "day" : "days"],
    [h, h === 1 ? "hour" : "hours"],
    [m, "min"],
    [s, "sec"],
  ];
  return (
    <div className="tb-count">
      <div className="tb-count-row" role="timer" aria-live="off" aria-label={`${d} days, ${h} hours, ${m} minutes until we land in Provo`}>
        {cells.map(([v, l]) => (
          <div key={l} className="tb-count-cell">
            <span className="tb-count-num">{l.startsWith("day") ? v : String(v).padStart(2, "0")}</span>
            <span className="tb-count-label">{l}</span>
          </div>
        ))}
      </div>
      <p className="tb-count-cap">until wheels down · Thu, May 27 · Provo</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* At a glance: five day tiles, the map, quick facts                    */
/* ------------------------------------------------------------------ */

const DAY_STICKER: Record<string, StickerKind> = { thu: "cocktail", fri: "lips", sat: "disco", sun: "shell", mon: "shades" };

function AtAGlance() {
  const [active, setActive] = useState<string | null>(null);
  const pinNote = active ? PINS.find((p) => p.id === active) : null;
  const daysAt = active ? DAYS.filter((d) => d.stops.some((s) => s.pin === active)).map((d) => d.weekday) : [];
  return (
    <section className="section tb-bg-sky tc-glance" id="glance">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The trip at a glance</p>
          <h2 className="h2">
            Five days. <span className="italic">Five dress codes.</span> Zero alarms before 8.
          </h2>
        </div>
        <ol className="tc-glance-days">
          {DAYS.map((d, i) => (
            <li key={d.id} style={{ "--tone": `var(--${d.tone})`, "--tilt": `${i % 2 ? 1.4 : -1.4}deg` } as CSSProperties}>
              <a href={`#day-${d.id}`}>
                <Sticker kind={DAY_STICKER[d.id]} className="tc-glance-sticker" />
                <span className="tc-k">
                  Day {d.n} · {d.weekday.slice(0, 3)} {d.date}
                </span>
                <span className="tc-glance-name">{d.name}</span>
                <span className="tc-glance-kicker">{d.kicker}</span>
                <span className="tc-glance-dress">Wear: {d.dress.theme}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="tc-glance-grid">
          <figure className="tc-map-frame">
            <ProvoMap active={active ? [active] : PINS.map((p) => p.id)} onPin={(id) => setActive((a) => (a === id ? null : id))} />
            <figcaption className="tb-hint" aria-live="polite">
              {pinNote ? (
                <>
                  <b>{pinNote.label}</b>: {pinNote.note}. {daysAt.length ? `We're there ${daysAt.join(", ")}.` : ""}
                </>
              ) : (
                "Tap a pin to see when we're there. It's a sketch, not a GPS."
              )}
            </figcaption>
          </figure>
          <dl className="tc-facts">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Sticky chips to jump between days. */
function DayJump() {
  return (
    <nav className="tc-jump" aria-label="Jump to a day">
      <div className="wrap tc-jump-inner">
        {DAYS.map((d) => (
          <a key={d.id} href={`#day-${d.id}`} style={{ "--tone": `var(--${d.tone})` } as CSSProperties}>
            <b>{d.weekday.slice(0, 3)}</b> {d.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* One day                                                              */
/* ------------------------------------------------------------------ */

function DaySection({ day, flip }: { day: Day; flip: boolean }) {
  return (
    <section className={`section tc-day tc-day-${day.tone}${flip ? " is-flip" : ""}`} id={`day-${day.id}`} style={{ "--tone": `var(--${day.tone})` } as CSSProperties}>
      <div className="wrap">
        <header className="tc-day-head">
          <div className="tc-day-num" aria-hidden>
            <span>Day</span>
            <b>{day.n}</b>
          </div>
          <div>
            <p className="eyebrow">
              {day.weekday}, {day.date}
              <span className="dot" aria-hidden>
                ·
              </span>
              {day.kicker}
            </p>
            <h2 className="h2">{day.name}</h2>
            <p className="lede">{day.line}</p>
          </div>
        </header>

        <div className="tc-day-grid">
          <ol className="tc-timeline">
            {day.stops.map((s) => (
              <li key={s.title} className={`tc-stop${s.big ? " is-big" : ""}`}>
                <span className="tc-stop-dot" aria-hidden>
                  {s.icon}
                </span>
                <div className="tc-stop-card">
                  <p className="tc-stop-time">{s.time}</p>
                  <h3 className="tc-stop-title">{s.title}</h3>
                  <p className="tc-stop-body">{s.body}</p>
                  {s.tip && (
                    <p className="tc-stop-tip">
                      <b>Good to know:</b> {s.tip}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <aside className="tc-day-side">
            <div className="tc-dress">
              <p className="tc-k">Tonight&apos;s dress code</p>
              <p className="tc-dress-theme">{day.dress.theme}</p>
              <dl>
                <div>
                  <dt>Girls</dt>
                  <dd>{day.dress.girls}</dd>
                </div>
                <div>
                  <dt>Guys</dt>
                  <dd>{day.dress.guys}</dd>
                </div>
              </dl>
            </div>
            <div className="tc-sunset">
              <span className="tc-sunset-sun" aria-hidden />
              <p>
                <span className="tc-k">Sunset</span>
                <b>{day.sunset}</b>
              </p>
            </div>
            <figure className="tc-day-map">
              <ProvoMap active={Array.from(new Set(day.stops.map((s) => s.pin).filter((p): p is string => !!p)))} />
              <figcaption className="tb-hint">Where we are on {day.weekday}.</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
