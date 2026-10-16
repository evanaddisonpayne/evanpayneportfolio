"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PRICE_KEY, VIBES, days, mapUrl, type Day, type Stop, type Vibe } from "@/lib/christmas2026";
import { TripMap } from "./Map";
import { useXm } from "./XmProvider";
import { BASE, forYou, priceLabel, sbNow, stopId, toMins, whoLabel } from "./util";

/** `dayId` is the day in the URL. Without it (the /plan index) we show today, or the first day. */
export default function PlanView({ dayId }: { dayId?: string }) {
  const router = useRouter();
  const { now, me, todayId } = useXm();
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [mineOnly, setMineOnly] = useState(false);
  const [storm, setStorm] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [focusStop, setFocusStop] = useState<string | null>(null);

  const day: Day = days.find((d) => d.id === (dayId ?? todayId)) ?? days[0];
  const sb = now ? sbNow(now) : null;
  const isToday = sb?.date === day.date;

  useEffect(() => {
    setStorm(false);
  }, [day.id]);
  useEffect(() => {
    if (!me) setMineOnly(false);
  }, [me]);

  // Deep links: /christmas2026/plan/sat#<stop id>
  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      setView("list");
      setFocusStop(id);
      window.setTimeout(() => {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" })),
        );
      }, 120);
      window.setTimeout(() => setFocusStop(null), 2600);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [day.id]);

  const liveIndex = useMemo(() => {
    if (!sb || !isToday) return -1;
    let idx = -1;
    day.stops.forEach((s, i) => {
      if (toMins(s.start) <= sb.mins) idx = i;
    });
    return idx;
  }, [sb?.mins, isToday, day]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleVibe = (v: Vibe) => setVibes((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  const dayIdx = days.indexOf(day);
  const prev = days[dayIdx - 1];
  const next = days[dayIdx + 1];

  const focusFromMap = (d: Day, s: Stop) => {
    const id = stopId(d, s);
    if (d.id !== day.id) {
      router.push(`${BASE}/plan/${d.id}#${encodeURIComponent(id)}`);
      return;
    }
    window.location.hash = encodeURIComponent(id);
  };

  return (
    <>
      <section className="section dark xm-pagehead">
        <div className="wrap">
          <p className="eyebrow">Day by day</p>
          <h1 className="h2">The plan</h1>
        </div>
      </section>

      <section className="section light xm-plan" id="plan">
        <div className="wrap">
          <div className="xm-tabs" role="tablist" aria-label="Days">
            {days.map((d) => (
              <Link
                key={d.id}
                href={`${BASE}/plan/${d.id}`}
                role="tab"
                aria-selected={d.id === day.id}
                aria-controls="day-panel"
                className="xm-tab"
                scroll={false}
              >
                <span className="xm-tab-dow">{d.dow}</span>
                <span className="xm-tab-num">{d.num}</span>
                {todayId === d.id ? <span className="xm-tab-today">Today</span> : d.tag && <span className="xm-tab-tag">{d.tag}</span>}
              </Link>
            ))}
          </div>

          <div className="xm-viewtoggle" role="group" aria-label="View">
            <button aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
            <button aria-pressed={view === "map"} onClick={() => setView("map")}>Map</button>
          </div>

          <div id="day-panel" role="tabpanel" className="xm-day">
            <div className="xm-day-head">
              <div>
                <p className="xm-day-mood">{day.mood}</p>
                <h2 className="h3">
                  {day.dow} Dec {day.num} — {day.title}
                </h2>
                <p className="body xm-day-intro">{day.intro}</p>
              </div>
              {day.callout && (
                <aside className="xm-callout">
                  <span className="xm-badge xm-badge-alt">Altitude</span>
                  <p>{day.callout}</p>
                </aside>
              )}
            </div>

            {view === "map" ? (
              <TripMap days={days} dayId={day.id} me={me} onDay={(id) => router.push(`${BASE}/plan/${id}`)} onPick={focusFromMap} />
            ) : (
              <>
                <div className="xm-controls">
                  <div className="xm-filter" role="group" aria-label="Filter by type">
                    {VIBES.map((v) => (
                      <button key={v.id} className="xm-chip" aria-pressed={vibes.includes(v.id)} onClick={() => toggleVibe(v.id)}>
                        {v.label}
                      </button>
                    ))}
                    {me && (
                      <button className="xm-chip xm-chip-star" aria-pressed={mineOnly} onClick={() => setMineOnly((v) => !v)}>
                        ★ {me}&apos;s plans
                      </button>
                    )}
                    {(vibes.length > 0 || mineOnly) && (
                      <button
                        className="xm-chip xm-chip-clear"
                        onClick={() => {
                          setVibes([]);
                          setMineOnly(false);
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {day.storm && (
                    <button className="xm-rain" aria-pressed={storm} onClick={() => setStorm((r) => !r)}>
                      <span aria-hidden>❄</span> {storm ? "Hide snow plan" : "Snowing hard?"}
                    </button>
                  )}
                </div>

                {storm && day.storm && (
                  <div className="xm-rain-plan" role="note">
                    <strong>Snow plan.</strong> {day.storm}
                  </div>
                )}

                <ol className="xm-timeline">
                  {day.stops.map((s, i) => {
                    const id = stopId(day, s);
                    const mine = forYou(s, me);
                    const matches =
                      (vibes.length === 0 || (s.vibes ?? []).some((v) => vibes.includes(v))) && (!mineOnly || (!!me && mine));
                    const live = i === liveIndex;
                    const cls = ["xm-stop", !mine && "is-not-me", !matches && "is-filtered", live && "is-live", s.must && "is-must", focusStop === id && "is-focus"]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <li key={id} id={id} className={cls}>
                        <div className="xm-time">
                          <span>{s.time}</span>
                          {live && <span className="xm-live">Now</span>}
                        </div>
                        <div className="xm-stop-body">
                          <div className="xm-badges">
                            {s.must && <span className="xm-badge xm-badge-must">Must-do</span>}
                            {s.optional && <span className="xm-badge xm-badge-opt">Optional</span>}
                            {s.vibes?.includes("gentle") && <span className="xm-badge xm-badge-gentle">Seated or flat</span>}
                            {s.book && <span className="xm-badge xm-badge-book">Book</span>}
                            {s.who && <span className="xm-badge xm-badge-who">{whoLabel(s.who)}</span>}
                            {!mine && <span className="xm-badge xm-badge-off">Not you</span>}
                          </div>
                          <h3 className="xm-stop-title">{s.title}</h3>
                          <p className="body">{s.why}</p>
                          {s.book && <p className="xm-note">📌 {s.book}</p>}
                          {s.tips && (
                            <ul className="xm-tips">
                              {s.tips.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          )}
                          <div className="xm-stop-foot">
                            <span className="xm-meta">
                              {s.price && (
                                <span className={`xm-price xm-price-${s.price === "free" ? "free" : "usd"}`} title={PRICE_KEY.find((x) => x.id === s.price)?.label}>
                                  {priceLabel(s.price)}
                                </span>
                              )}
                              {s.vibes && (
                                <span className="xm-vibes">
                                  {s.vibes
                                    .filter((v) => v !== "gentle")
                                    .map((v) => VIBES.find((x) => x.id === v)?.label)
                                    .join(" · ")}
                                </span>
                              )}
                            </span>
                            <span className="xm-links">
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
                <p className="xm-legend">
                  Rough cost per person:{" "}
                  {PRICE_KEY.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 && " · "}
                      <strong>{priceLabel(p.id)}</strong>
                      {p.id === "free" ? "" : ` ${p.label}`}
                    </span>
                  ))}
                </p>
              </>
            )}

            <nav className="xm-daynav" aria-label="Previous and next day">
              {prev ? (
                <Link href={`${BASE}/plan/${prev.id}`}>
                  ← {prev.dow} {prev.num}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`${BASE}/plan/${next.id}`}>
                  {next.dow} {next.num} →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
