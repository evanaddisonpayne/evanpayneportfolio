"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  PEOPLE,
  TRIP_START,
  VIBES,
  checklist,
  crew,
  days,
  hotel,
  iamsterdam,
  knowhow,
  mapUrl,
  phrases,
  sources,
  type Day,
  type Person,
  type Stop,
  type Vibe,
} from "@/lib/amsterdam";

const TZ = "Europe/Amsterdam";
const ME_KEY = "ams26-me";
const CHECK_KEY = "ams26-checks";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: state just won't persist */
  }
}

/** Amsterdam-local date (YYYY-MM-DD) and minutes since midnight. */
function amsNow(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, mins: Number(get("hour")) * 60 + Number(get("minute")) };
}
const toMins = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const forYou = (s: Stop, me: Person | null) => !me || !s.who || s.who.includes(me);
const whoLabel = (who: Person[]) => (who.length === 2 ? `${who[0]} & ${who[1]}` : who.join(", "));

export default function Trip() {
  const [now, setNow] = useState<Date | null>(null);
  const [me, setMe] = useState<Person | null>(null);
  const [dayId, setDayId] = useState<string>(days[0].id);
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [rain, setRain] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [flipped, setFlipped] = useState<number | null>(null);
  const [focusStop, setFocusStop] = useState<string | null>(null);

  // Client-only state: time, saved person, saved checklist, and today's tab during the trip.
  useEffect(() => {
    const d = new Date();
    setNow(d);
    setMe(load<Person | null>(ME_KEY, null));
    setChecks(load<Record<string, boolean>>(CHECK_KEY, {}));
    const today = amsNow(d).date;
    const match = days.find((x) => x.date === today);
    if (match) setDayId(match.id);
    const t = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const day = days.find((d) => d.id === dayId) ?? days[0];
  const ams = now ? amsNow(now) : null;
  const isToday = ams?.date === day.date;

  // The stop happening right now: the last one that has started today.
  const liveIndex = useMemo(() => {
    if (!ams || !isToday) return -1;
    let idx = -1;
    day.stops.forEach((s, i) => {
      if (toMins(s.start) <= ams.mins) idx = i;
    });
    return idx;
  }, [ams?.mins, isToday, day]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickMe = (p: Person) => {
    const next = me === p ? null : p;
    setMe(next);
    save(ME_KEY, next);
  };
  const toggleVibe = (v: Vibe) => setVibes((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  const toggleCheck = (id: string) =>
    setChecks((cur) => {
      const next = { ...cur, [id]: !cur[id] };
      save(CHECK_KEY, next);
      return next;
    });

  const jumpTo = (d: Day, s: Stop) => {
    setDayId(d.id);
    setRain(false);
    setVibes([]);
    const id = `${d.id}-${s.start}-${s.title}`;
    setFocusStop(id);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
    window.setTimeout(() => setFocusStop(null), 2400);
  };

  const musts = days.flatMap((d) => d.stops.filter((s) => s.must).map((s) => ({ d, s })));
  const cardStops = days.flatMap((d) => d.stops.filter((s) => s.card).map((s) => ({ d, s })));
  const allItems = checklist.flatMap((g) => g.items);
  const done = allItems.filter((i) => checks[i.id]).length;

  return (
    <div className="ams">
      {/* ---------- HERO ---------- */}
      <section className="section dark ams-hero">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="ams-tape ams-tape-top" aria-hidden>
          {"AMSTERDAM   ·   52.3676° N   ·   4.9041° E   ·   NOV 24 — 29, 2026   ·   ".repeat(10)}
        </div>
        <div className="wrap ams-hero-grid">
          <div className="ams-hero-copy">
            <p className="eyebrow">
              Thanksgiving 2026<span className="dot" aria-hidden>·</span>Private trip page
            </p>
            <h1 className="h1">
              Amsterdam, <span className="italic">the four of us.</span>
            </h1>
            <p className="lede">
              Five nights in Noord, two canal cruises through the light art, one Indonesian feast, and a club in our own
              building. Slow mornings, late nights, and every evening has a way out.
            </p>
            <Countdown now={now} />
          </div>
          <div className="ams-stamp-wrap" aria-hidden>
            <div className="ams-stamp">
              <span className="ams-stamp-top">Gemeente Amsterdam</span>
              <span className="ams-stamp-xxx">✕ ✕ ✕</span>
              <span className="ams-stamp-date">24 · XI · 2026</span>
              <span className="ams-stamp-bottom">Sir Adam · Noord</span>
            </div>
          </div>
        </div>

        <div className="wrap ams-who">
          <p className="eyebrow">Who&apos;s looking?</p>
          <div className="ams-who-row" role="group" aria-label="Pick yourself to highlight your plans">
            {PEOPLE.map((p) => (
              <button key={p} className="ams-pill" aria-pressed={me === p} onClick={() => pickMe(p)}>
                {p}
              </button>
            ))}
          </div>
          <p className="ams-hint">
            {me
              ? `Showing ${me}'s trip. Plans you're not in are dimmed.`
              : "Tap your name to dim the plans you're not part of."}
          </p>
        </div>
      </section>

      {/* ---------- MUST-DOS ---------- */}
      <section className="section orange ams-musts">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Non-negotiables</p>
            <h2 className="h2">The six things we&apos;re not leaving without.</h2>
          </div>
          <ul className="ams-must-grid">
            {musts.map(({ d, s }, i) => (
              <li key={s.title}>
                <button className="ams-must" style={{ "--tilt": `${(i % 3) - 1}deg` } as CSSProperties} onClick={() => jumpTo(d, s)}>
                  <span className="ams-must-day">
                    {d.dow} {d.num} · {s.time}
                  </span>
                  <span className="ams-must-title">{s.title.replace(/^Dinner at /, "")}</span>
                  <span className="ams-must-go">See the plan →</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- ITINERARY ---------- */}
      <section className="section light ams-plan" id="plan">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Day by day</p>
            <h2 className="h2">The plan</h2>
          </div>

          <div className="ams-tabs" role="tablist" aria-label="Days">
            {days.map((d) => {
              const today = ams?.date === d.date;
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={d.id === day.id}
                  aria-controls="day-panel"
                  className="ams-tab"
                  onClick={() => {
                    setDayId(d.id);
                    setRain(false);
                  }}
                >
                  <span className="ams-tab-dow">{d.dow}</span>
                  <span className="ams-tab-num">{d.num}</span>
                  {today && <span className="ams-tab-today">Today</span>}
                  {d.id === "mon" && <span className="ams-tab-tag">Iceland</span>}
                </button>
              );
            })}
          </div>

          <div id="day-panel" role="tabpanel" className="ams-day">
            <div className="ams-day-head">
              <div>
                <p className="ams-day-mood">{day.mood}</p>
                <h3 className="h3">
                  {day.dow} Nov {day.num} — {day.title}
                </h3>
                <p className="body ams-day-intro">{day.intro}</p>
              </div>
              {day.cardDay && (
                <aside className="ams-callout">
                  <span className="ams-badge ams-badge-card">I amsterdam card</span>
                  <p>{day.cardDay}</p>
                </aside>
              )}
            </div>

            <div className="ams-controls">
              <div className="ams-filter" role="group" aria-label="Filter by vibe">
                {VIBES.map((v) => (
                  <button key={v.id} className="ams-chip" aria-pressed={vibes.includes(v.id)} onClick={() => toggleVibe(v.id)}>
                    {v.label}
                  </button>
                ))}
                {vibes.length > 0 && (
                  <button className="ams-chip ams-chip-clear" onClick={() => setVibes([])}>
                    Clear
                  </button>
                )}
              </div>
              {day.rain && (
                <button className="ams-rain" aria-pressed={rain} onClick={() => setRain((r) => !r)}>
                  <span aria-hidden>☂</span> {rain ? "Hide rain plan" : "Raining?"}
                </button>
              )}
            </div>

            {rain && day.rain && (
              <div className="ams-rain-plan" role="note">
                <strong>Rain plan.</strong> {day.rain}
              </div>
            )}

            <ol className="ams-timeline">
              {day.stops.map((s, i) => {
                const id = `${day.id}-${s.start}-${s.title}`;
                const mine = forYou(s, me);
                const matches = vibes.length === 0 || (s.vibes ?? []).some((v) => vibes.includes(v));
                const live = i === liveIndex;
                const cls = [
                  "ams-stop",
                  !mine && "is-not-me",
                  !matches && "is-filtered",
                  live && "is-live",
                  s.must && "is-must",
                  focusStop === id && "is-focus",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <li key={id} id={id} className={cls}>
                    <div className="ams-time">
                      <span>{s.time}</span>
                      {live && <span className="ams-live">Now</span>}
                    </div>
                    <div className="ams-stop-body">
                      <div className="ams-badges">
                        {s.must && <span className="ams-badge ams-badge-must">Must-do</span>}
                        {s.card && <span className="ams-badge ams-badge-card">I amsterdam card</span>}
                        {s.book && <span className="ams-badge ams-badge-book">Book</span>}
                        {s.who && <span className="ams-badge ams-badge-who">{whoLabel(s.who)}</span>}
                        {!mine && <span className="ams-badge ams-badge-off">Not you</span>}
                      </div>
                      <h4 className="ams-stop-title">{s.title}</h4>
                      <p className="body">{s.why}</p>
                      {s.card && <p className="ams-note">🎟 {s.card}</p>}
                      {s.book && <p className="ams-note">📌 {s.book}</p>}
                      {s.tips && (
                        <ul className="ams-tips">
                          {s.tips.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}
                      <div className="ams-stop-foot">
                        {s.vibes && (
                          <span className="ams-vibes">
                            {s.vibes.map((v) => VIBES.find((x) => x.id === v)?.label).join(" · ")}
                          </span>
                        )}
                        <span className="ams-links">
                          {s.where && (
                            <a href={mapUrl(s.map ?? s.where)} target="_blank" rel="noopener noreferrer">
                              Map ↗
                            </a>
                          )}
                          {s.link && (
                            <a href={s.link.href} target="_blank" rel="noopener noreferrer">
                              {s.link.label} ↗
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- I AMSTERDAM CARD ---------- */}
      <section className="section dark ams-card-sec">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">I amsterdam City Card</p>
            <h2 className="h2">
              {cardStops.length} stops in this plan are on the card.
            </h2>
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
                    <button onClick={() => jumpTo(d, s)}>
                      <span>
                        {d.dow} {s.time}
                      </span>
                      {s.title}
                    </button>
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

      {/* ---------- CREW ---------- */}
      <section className="section dark ams-crew-sec">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The crew</p>
            <h2 className="h2">Who lands when.</h2>
            <p className="lede">
              Home base is {hotel.name}, {hotel.address}. {hotel.how}
            </p>
          </div>
          <ul className="ams-crew">
            {crew.map((c, i) => (
              <li key={c.name} className={`card ams-person${me === c.name ? " is-me" : ""}`}>
                <span className="card-num">{["I", "II", "III", "IV"][i]}</span>
                <p className="card-title">{c.name}</p>
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

      {/* ---------- CHECKLIST ---------- */}
      <section className="section light ams-check-sec" id="checklist">
        <div className="wrap">
          <div className="split-head ams-check-head">
            <div>
              <p className="eyebrow">Before we go</p>
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

      {/* ---------- PHRASES ---------- */}
      <section className="section orange ams-phrase-sec">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Spreek je Nederlands?</p>
            <h2 className="h2">Six words that get you far.</h2>
            <p className="lede">Tap a card to flip it.</p>
          </div>
          <ul className="ams-phrases">
            {phrases.map((p, i) => (
              <li key={p.nl}>
                <button
                  className={`ams-flip${flipped === i ? " is-flipped" : ""}`}
                  aria-pressed={flipped === i}
                  onClick={() => setFlipped(flipped === i ? null : i)}
                >
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

      {/* ---------- KNOW-HOW ---------- */}
      <section className="section dark ams-know-sec">
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

      {/* ---------- FOOTER ---------- */}
      <footer className="footer ams-footer">
        <div className="canal" aria-hidden />
        <div className="wrap ams-foot">
          <div>
            <p className="eyebrow">Sources</p>
            <ul className="ams-sources">
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="ams-hint">
            Facts checked October 9, 2026. Hours and prices change, so reconfirm the week before. This page isn&apos;t
            indexed; share the link with the group only.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Countdown({ now }: { now: Date | null }) {
  if (!now) return <div className="ams-count" aria-hidden />;
  const start = new Date(TRIP_START).getTime();
  const diff = start - now.getTime();
  const ams = amsNow(now);
  const live = days.find((d) => d.date === ams.date);

  if (live) {
    const n = days.indexOf(live) + 1;
    return (
      <div className="ams-count">
        <p className="ams-count-live">
          Day {n} of {days.length} · {live.dow} {live.num} — {live.title}
        </p>
        <a className="btn btn-signal" href="#plan">
          Today&apos;s plan
        </a>
      </div>
    );
  }
  if (diff <= 0) {
    return (
      <div className="ams-count">
        <p className="ams-count-live">Tot de volgende keer. Until next time.</p>
      </div>
    );
  }
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return (
    <div className="ams-count">
      <div className="ams-count-row" role="timer" aria-label={`${d} days, ${h} hours, ${m} minutes until the first wheels touch down`}>
        {[
          [d, "days"],
          [h, "hours"],
          [m, "min"],
        ].map(([v, l]) => (
          <div key={l as string} className="ams-count-cell">
            <span className="ams-count-num">{v}</span>
            <span className="ams-count-label">{l}</span>
          </div>
        ))}
      </div>
      <p className="ams-hint">Until the first wheels touch down at Schiphol, Tue Nov 24, 10:40 am.</p>
    </div>
  );
}
