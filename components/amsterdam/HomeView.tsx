"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { PEOPLE, TRIP_START, checklist, days, profiles } from "@/lib/amsterdam";
import { useAms } from "./AmsProvider";
import { amsNow, forYou, stopHref, toMins } from "./util";

export default function HomeView() {
  const { now, me, pickMe, nasty, tapStamp, stampTapped, checks } = useAms();
  const profile = me ? profiles[me] : null;
  const myPicks = me ? days.flatMap((d) => d.stops.filter((s) => s.picks?.includes(me)).map((s) => ({ d, s }))) : [];
  const musts = days.flatMap((d) => d.stops.filter((s) => s.must).map((s) => ({ d, s })));
  const allItems = checklist.flatMap((g) => g.items);
  const done = allItems.filter((i) => checks[i.id]).length;

  return (
    <>
      <section className="section dark ams-hero">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="ams-tape ams-tape-top" aria-hidden>
          {"AMSTERDAM   ·   52.3676° N   ·   4.9041° E   ·   NOV 24 — 29, 2026   ·   ".repeat(10)}
        </div>
        <div className="wrap ams-hero-grid">
          <div className="ams-hero-copy">
            <p className="eyebrow">
              Thanksgiving 2026<span className="dot" aria-hidden>·</span>Private trip site
            </p>
            <h1 className="h1">
              Amsterdam, <span className="italic">the four of us.</span>
            </h1>
            <p className="lede">
              Five nights in Noord, two canal cruises through the light art, one Indonesian feast, and a club in our own
              building. Slow mornings, late nights, and every evening has a way out.
            </p>
            <Countdown now={now} nasty={nasty} />
          </div>
          <div className="ams-stamp-wrap">
            <div
              className={`ams-stamp${stampTapped ? " is-tapped" : ""}`}
              role="button"
              tabIndex={0}
              aria-label="Passport stamp"
              onClick={tapStamp}
              onKeyDown={(e: { key: string }) => e.key === "Enter" && tapStamp()}
            >
              <span className="ams-stamp-top">Gemeente Amsterdam</span>
              <span className="ams-stamp-xxx">{nasty ? "🍆 🍆 🍆" : "✕ ✕ ✕"}</span>
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
              ? `Showing ${me}'s trip. Plans you're not in are dimmed, and your packing list is ready.`
              : "Tap your name to see your profile and picks, dim the plans you're not part of, and get your own packing list."}
          </p>

          {me && profile && (
            <div className="ams-profile">
              <div className="ams-profile-main">
                <p className="ams-profile-src">{profile.sourceNote}</p>
                <p className="ams-profile-head">{profile.headline}</p>
                <ul className="ams-profile-loves">
                  {profile.loves.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <dl className="ams-profile-facts">
                  <div>
                    <dt>Budget</dt>
                    <dd>{profile.budget}</dd>
                  </div>
                  <div>
                    <dt>Pace</dt>
                    <dd>{profile.pace}</dd>
                  </div>
                </dl>
                {profile.extra && (
                  <ul className="ams-profile-extra">
                    {profile.extra.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="ams-profile-picks">
                <p className="ams-profile-src">
                  ★ Made for {me} · {myPicks.length}
                </p>
                {myPicks.length > 0 ? (
                  <ul className="ams-card-stops">
                    {myPicks.map(({ d, s }) => (
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
                  <p className="body">No picks yet. Once {me} answers the vibe questions, the stops that fit get starred.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <NextUp />

      <section className="section orange ams-musts">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Non-negotiables</p>
            <h2 className="h2">The six things we&apos;re not leaving without.</h2>
          </div>
          <ul className="ams-must-grid">
            {musts.map(({ d, s }, i) => (
              <li key={s.title}>
                <Link className="ams-must" style={{ "--tilt": `${(i % 3) - 1}deg` } as CSSProperties} href={stopHref(d, s)}>
                  <span className="ams-must-day">
                    {d.dow} {d.num} · {s.time}
                  </span>
                  <span className="ams-must-title">{s.title.replace(/^Dinner at /, "")}</span>
                  <span className="ams-must-go">See the plan →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section light ams-tiles-sec">
        <div className="wrap">
          <ul className="ams-tiles">
            <li>
              <Link href="/amsterdam/plan">
                <span className="ams-tile-k">Plan</span>
                <strong>Day by day, with the map</strong>
                <span>Six days, filters by vibe, rain plans, and your own picks.</span>
              </Link>
            </li>
            <li>
              <Link href="/amsterdam/prep">
                <span className="ams-tile-k">Prep</span>
                <strong>
                  Checklist {done}/{allItems.length}
                </strong>
                <span>Bookings, the I amsterdam card, and a packing list for {me ?? "your"} trip.</span>
              </Link>
            </li>
            <li>
              <Link href="/amsterdam/guide">
                <span className="ams-tile-k">Guide</span>
                <strong>Who lands when, and what to know</strong>
                <span>Flights, the hotel, local know-how and a few Dutch words.</span>
              </Link>
            </li>
            <li>
              <Link href="/amsterdam/fun">
                <span className="ams-tile-k">Fun</span>
                <strong>The weird part</strong>
                <span>Roommate complaints, the Windmill of Fate, and one button you shouldn&apos;t press.</span>
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
  const { now, me, checks, todayId } = useAms();
  if (!now) return null;
  const ams = amsNow(now);
  const today = days.find((d) => d.id === todayId);

  if (today) {
    const stops = today.stops.filter((s) => forYou(s, me));
    const nowIdx = stops.reduce((acc, s, i) => (toMins(s.start) <= ams.mins ? i : acc), -1);
    const current = nowIdx >= 0 ? stops[nowIdx] : null;
    const next = stops[nowIdx + 1] ?? null;
    return (
      <section className="section dark ams-next">
        <div className="wrap">
          <p className="eyebrow">
            Today · {today.dow} {today.num} — {today.title}
          </p>
          <div className="ams-next-grid">
            {current && (
              <Link className="ams-next-card is-now" href={stopHref(today, current)}>
                <span className="ams-live">Now</span>
                <strong>{current.title}</strong>
                <span>{current.time}</span>
              </Link>
            )}
            {next ? (
              <Link className="ams-next-card" href={stopHref(today, next)}>
                <span className="ams-next-k">Next</span>
                <strong>{next.title}</strong>
                <span>{next.time}</span>
              </Link>
            ) : (
              <div className="ams-next-card">
                <span className="ams-next-k">Next</span>
                <strong>Nothing left. Go to bed.</strong>
              </div>
            )}
          </div>
          <Link className="btn btn-signal" href={`/amsterdam/plan/${today.id}`}>
            Today&apos;s full plan
          </Link>
        </div>
      </section>
    );
  }

  if (now.getTime() < new Date(TRIP_START).getTime()) {
    const todo = checklist.flatMap((g) => g.items).filter((i) => !checks[i.id]).slice(0, 3);
    return (
      <section className="section dark ams-next">
        <div className="wrap">
          <p className="eyebrow">Next up</p>
          {todo.length ? (
            <ul className="ams-next-todo">
              {todo.map((i) => (
                <li key={i.id}>{i.label}</li>
              ))}
            </ul>
          ) : (
            <p className="body">Every box on the checklist is ticked. Nicely done.</p>
          )}
          <Link className="btn btn-signal" href="/amsterdam/prep">
            Open the checklist
          </Link>
        </div>
      </section>
    );
  }
  return null;
}

function Countdown({ now, nasty }: { now: Date | null; nasty?: boolean }) {
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
        <Link className="btn btn-signal" href={`/amsterdam/plan/${live.id}`}>
          Today&apos;s plan
        </Link>
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
      <p className="ams-hint">
        {nasty
          ? "Until we're legally high on a boat. (Technically: first wheels down at Schiphol, Tue Nov 24, 10:40 am.)"
          : "Until the first wheels touch down at Schiphol, Tue Nov 24, 10:40 am."}
      </p>
    </div>
  );
}
