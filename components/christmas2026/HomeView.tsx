"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { PEOPLE, TRIP_START, checklist, crew, days, type Person } from "@/lib/christmas2026";
import { useXm } from "./XmProvider";
import { BASE, forYou, sbNow, stopHref, toMins } from "./util";

const NOTES: Record<Person, string> = {
  Debbie: "Main-floor bedroom with Brad. Sunday morning is yours: sleep in, coffee, maybe a massage.",
  Brad: "Every group plan works seated or on flat, cleared ground, and the car drops you at every door. Pack the ice cleats.",
  Brannen: "You're on the kid crew Sunday morning: tubing at Howelsen, maybe a dog-sled ride.",
  Whitney: "You're on the kid crew Sunday morning: tubing at Howelsen, maybe a dog-sled ride.",
  Addie: "Santa on Saturday, the hot springs, a sleigh ride to dinner, and tubing on Sunday.",
  Prosper: "Santa on Saturday, the hot springs, a sleigh ride to dinner, and tubing on Sunday with Addie.",
  Evan: "You land first and grab the SUV. After the trip, Christmas in Arkansas, then home to Chicago on the 28th.",
};

export default function HomeView() {
  const { now, me, pickMe, sweater, tapOrnament, ornamentTapped, checks } = useXm();
  const mine = me ? crew.find((c) => c.name === me) : null;
  const myStops = me ? days.flatMap((d) => d.stops.filter((s) => s.who?.includes(me)).map((s) => ({ d, s }))) : [];
  const musts = days.flatMap((d) => d.stops.filter((s) => s.must && !s.vibes?.includes("travel")).map((s) => ({ d, s })));
  const allItems = checklist.flatMap((g) => g.items);
  const done = allItems.filter((i) => checks[i.id]).length;

  return (
    <>
      <section className="section dark xm-hero">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="xm-tape xm-tape-top" aria-hidden>
          {"STEAMBOAT SPRINGS   ·   40.4850° N   ·   106.8317° W   ·   DEC 18 — 21, 2026   ·   ".repeat(10)}
        </div>
        <div className="wrap xm-hero-grid">
          <div className="xm-hero-copy">
            <p className="eyebrow">
              Christmas 2026<span className="dot" aria-hidden>·</span>Family trip site
            </p>
            <h1 className="h1">
              Steamboat, <span className="italic">all seven of us.</span>
            </h1>
            <p className="lede">
              Three nights in a snowy cattle town turned ski town. Santa on the courthouse lawn, a warm soak downtown, a sleigh ride to
              dinner, the gondola at sunset, and everyone home in time for Christmas.
            </p>
            <Countdown now={now} sweater={sweater} />
          </div>
          <div className="xm-stamp-wrap">
            <div
              className={`xm-stamp${ornamentTapped ? " is-tapped" : ""}`}
              role="button"
              tabIndex={0}
              aria-label="Ornament"
              onClick={tapOrnament}
              onKeyDown={(e: { key: string }) => e.key === "Enter" && tapOrnament()}
            >
              <span className="xm-stamp-hook" aria-hidden />
              <span className="xm-stamp-top">Steamboat Springs</span>
              <span className="xm-stamp-xxx">{sweater ? "🧶 🧶 🧶" : "❄ ❄ ❄"}</span>
              <span className="xm-stamp-date">18 · XII · 2026</span>
              <span className="xm-stamp-bottom">Yampa Valley · CO</span>
            </div>
          </div>
        </div>

        <div className="wrap xm-who">
          <p className="eyebrow">Who&apos;s looking?</p>
          <div className="xm-who-row" role="group" aria-label="Pick yourself to highlight your plans">
            {PEOPLE.map((p) => (
              <button key={p} className="xm-pill" aria-pressed={me === p} onClick={() => pickMe(p)}>
                {p}
              </button>
            ))}
          </div>
          <p className="xm-hint">
            {me
              ? `Showing ${me}'s trip. Plans you're not in are dimmed, and your packing list is ready.`
              : "Tap your name to see your flights and your plans, dim the plans you're not part of, and get your own packing list."}
          </p>

          {me && mine && (
            <div className="xm-profile">
              <div className="xm-profile-main">
                <p className="xm-profile-src">{mine.role}</p>
                <p className="xm-profile-head">{NOTES[me]}</p>
                <dl className="xm-profile-facts">
                  {mine.legs.map((l) => (
                    <div key={l.label}>
                      <dt>{l.label}</dt>
                      <dd>
                        <strong>{l.when}</strong> · {l.detail}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt>Room</dt>
                    <dd>{mine.room}</dd>
                  </div>
                </dl>
                <p className="xm-profile-extra">Flights are the plan, not booked yet.</p>
              </div>
              <div className="xm-profile-picks">
                <p className="xm-profile-src">
                  ★ Just for {me} · {myStops.length}
                </p>
                {myStops.length > 0 ? (
                  <ul className="xm-card-stops">
                    {myStops.map(({ d, s }) => (
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
                ) : (
                  <p className="body">Everything on the plan is with the whole family.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <NextUp />

      <section className="section orange xm-musts">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Non-negotiables</p>
            <h2 className="h2">The {musts.length === 5 ? "five" : musts.length} things we&apos;re not missing.</h2>
          </div>
          <ul className="xm-must-grid">
            {musts.map(({ d, s }, i) => (
              <li key={s.title}>
                <Link className="xm-must" style={{ "--tilt": `${(i % 3) - 1}deg` } as CSSProperties} href={stopHref(d, s)}>
                  <span className="xm-must-day">
                    {d.dow} {d.num} · {s.time}
                  </span>
                  <span className="xm-must-title">{s.title}</span>
                  <span className="xm-must-go">See the plan →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section light xm-tiles-sec">
        <div className="wrap">
          <ul className="xm-tiles">
            <li>
              <Link href={`${BASE}/plan`}>
                <span className="xm-tile-k">Plan</span>
                <strong>Day by day, with the map</strong>
                <span>Four days plus a spare, filters, snow plans, and who&apos;s doing what.</span>
              </Link>
            </li>
            <li>
              <Link href={`${BASE}/prep`}>
                <span className="xm-tile-k">Prep</span>
                <strong>
                  Checklist {done}/{allItems.length}
                </strong>
                <span>Bookings, the budget, and a packing list for {me ?? "your"} trip.</span>
              </Link>
            </li>
            <li>
              <Link href={`${BASE}/guide`}>
                <span className="xm-tile-k">Guide</span>
                <strong>Who lands when, and what to know</strong>
                <span>Flights, the house, altitude, Brad&apos;s hip, and a little local lingo.</span>
              </Link>
            </li>
            <li>
              <Link href={`${BASE}/fun`}>
                <span className="xm-tile-k">Fun</span>
                <strong>The silly part</strong>
                <span>The Snow Globe of Fate, cowboy names, road-trip bingo, and one button you shouldn&apos;t press.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

/** Before the trip: what to do next. During it: what's on now and next. */
function NextUp() {
  const { now, me, checks, todayId } = useXm();
  if (!now) return null;
  const sb = sbNow(now);
  const today = days.find((d) => d.id === todayId);

  if (today) {
    const stops = today.stops.filter((s) => forYou(s, me));
    const nowIdx = stops.reduce((acc, s, i) => (toMins(s.start) <= sb.mins ? i : acc), -1);
    const current = nowIdx >= 0 ? stops[nowIdx] : null;
    const next = stops[nowIdx + 1] ?? null;
    return (
      <section className="section dark xm-next">
        <div className="wrap">
          <p className="eyebrow">
            Today · {today.dow} {today.num} — {today.title}
          </p>
          <div className="xm-next-grid">
            {current && (
              <Link className="xm-next-card is-now" href={stopHref(today, current)}>
                <span className="xm-live">Now</span>
                <strong>{current.title}</strong>
                <span>{current.time}</span>
              </Link>
            )}
            {next ? (
              <Link className="xm-next-card" href={stopHref(today, next)}>
                <span className="xm-next-k">Next</span>
                <strong>{next.title}</strong>
                <span>{next.time}</span>
              </Link>
            ) : (
              <div className="xm-next-card">
                <span className="xm-next-k">Next</span>
                <strong>Nothing left. Cocoa and bed.</strong>
              </div>
            )}
          </div>
          <Link className="btn btn-signal" href={`${BASE}/plan/${today.id}`}>
            Today&apos;s full plan
          </Link>
        </div>
      </section>
    );
  }

  if (now.getTime() < new Date(TRIP_START).getTime()) {
    const todo = checklist.flatMap((g) => g.items).filter((i) => !checks[i.id]).slice(0, 3);
    return (
      <section className="section dark xm-next">
        <div className="wrap">
          <p className="eyebrow">Next up</p>
          {todo.length ? (
            <ul className="xm-next-todo">
              {todo.map((i) => (
                <li key={i.id}>{i.label}</li>
              ))}
            </ul>
          ) : (
            <p className="body">Every box on the checklist is ticked. Nicely done.</p>
          )}
          <Link className="btn btn-signal" href={`${BASE}/prep`}>
            Open the checklist
          </Link>
        </div>
      </section>
    );
  }
  return null;
}

function Countdown({ now, sweater }: { now: Date | null; sweater?: boolean }) {
  if (!now) return <div className="xm-count" aria-hidden />;
  const start = new Date(TRIP_START).getTime();
  const diff = start - now.getTime();
  const sb = sbNow(now);
  const live = days.find((d) => d.date === sb.date);

  if (live) {
    const n = days.indexOf(live) + 1;
    return (
      <div className="xm-count">
        <p className="xm-count-live">
          Day {n} of {days.length} · {live.dow} {live.num} — {live.title}
        </p>
        <Link className="btn btn-signal" href={`${BASE}/plan/${live.id}`}>
          Today&apos;s plan
        </Link>
      </div>
    );
  }
  if (diff <= 0) {
    return (
      <div className="xm-count">
        <p className="xm-count-live">Merry Christmas. Same time next year?</p>
      </div>
    );
  }
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return (
    <div className="xm-count">
      <div className="xm-count-row" role="timer" aria-label={`${d} days, ${h} hours, ${m} minutes until the first wheels touch down`}>
        {[
          [d, "days"],
          [h, "hours"],
          [m, "min"],
        ].map(([v, l]) => (
          <div key={l as string} className="xm-count-cell">
            <span className="xm-count-num">{v}</span>
            <span className="xm-count-label">{l}</span>
          </div>
        ))}
      </div>
      <p className="xm-hint">
        {sweater
          ? "Until we're all in matching sweaters on a sleigh. (Technically: Evan lands at Hayden, Fri Dec 18, 12:01 pm.)"
          : "Until the first wheels touch down at Hayden, Fri Dec 18, 12:01 pm."}
      </p>
    </div>
  );
}
