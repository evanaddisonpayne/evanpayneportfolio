"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PRICE_KEY, VIBES, days, mapUrl, type Day, type Stop, type Vibe } from "@/lib/amsterdam";
import { TripMap } from "./Fun";
import { useAms } from "./AmsProvider";
import { amsNow, forYou, priceLabel, stopId, toMins, whoLabel } from "./util";

/** `dayId` is the day in the URL. Without it (the /plan index) we show today, or the first day. */
export default function PlanView({ dayId }: { dayId?: string }) {
  const router = useRouter();
  const { now, me, nasty, todayId } = useAms();
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [picksOnly, setPicksOnly] = useState(false);
  const [rain, setRain] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [focusStop, setFocusStop] = useState<string | null>(null);

  const day: Day = days.find((d) => d.id === (dayId ?? todayId)) ?? days[0];
  const ams = now ? amsNow(now) : null;
  const isToday = ams?.date === day.date;

  useEffect(() => {
    setRain(false);
  }, [day.id]);
  useEffect(() => {
    if (!me) setPicksOnly(false);
  }, [me]);

  // Deep links: /amsterdam/plan/thu#<stop id>
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
    if (!ams || !isToday) return -1;
    let idx = -1;
    day.stops.forEach((s, i) => {
      if (toMins(s.start) <= ams.mins) idx = i;
    });
    return idx;
  }, [ams?.mins, isToday, day]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleVibe = (v: Vibe) => setVibes((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  const dayIdx = days.indexOf(day);
  const prev = days[dayIdx - 1];
  const next = days[dayIdx + 1];

  const focusFromMap = (d: Day, s: Stop) => {
    const id = stopId(d, s);
    if (d.id !== day.id) {
      router.push(`/amsterdam/plan/${d.id}#${encodeURIComponent(id)}`);
      return;
    }
    window.location.hash = encodeURIComponent(id);
  };

  return (
    <>
      <section className="section dark ams-pagehead">
        <div className="wrap">
          <p className="eyebrow">Day by day</p>
          <h1 className="h2">The plan</h1>
        </div>
      </section>

      <section className="section light ams-plan" id="plan">
        <div className="wrap">
          <div className="ams-tabs" role="tablist" aria-label="Days">
            {days.map((d) => (
              <Link
                key={d.id}
                href={`/amsterdam/plan/${d.id}`}
                role="tab"
                aria-selected={d.id === day.id}
                aria-controls="day-panel"
                className="ams-tab"
                scroll={false}
              >
                <span className="ams-tab-dow">{d.dow}</span>
                <span className="ams-tab-num">{d.num}</span>
                {todayId === d.id && <span className="ams-tab-today">Today</span>}
                {d.id === "mon" && <span className="ams-tab-tag">Iceland</span>}
              </Link>
            ))}
          </div>

          <div className="ams-viewtoggle" role="group" aria-label="View">
            <button aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
            <button aria-pressed={view === "map"} onClick={() => setView("map")}>Map</button>
          </div>

          <div id="day-panel" role="tabpanel" className="ams-day">
            <div className="ams-day-head">
              <div>
                <p className="ams-day-mood">{day.mood}</p>
                <h2 className="h3">
                  {day.dow} Nov {day.num} — {day.title}
                </h2>
                <p className="body ams-day-intro">{day.intro}</p>
              </div>
              {day.cardDay && (
                <aside className="ams-callout">
                  <span className="ams-badge ams-badge-card">I amsterdam card</span>
                  <p>{day.cardDay}</p>
                </aside>
              )}
            </div>

            {view === "map" ? (
              <div className="ams-map-wrap">
                <TripMap days={days} dayId={day.id} me={me} nasty={nasty} onDay={(id) => router.push(`/amsterdam/plan/${id}`)} onPick={focusFromMap} />
              </div>
            ) : (
              <>
                <div className="ams-controls">
                  <div className="ams-filter" role="group" aria-label="Filter by vibe">
                    {VIBES.map((v) => (
                      <button key={v.id} className="ams-chip" aria-pressed={vibes.includes(v.id)} onClick={() => toggleVibe(v.id)}>
                        {v.label}
                      </button>
                    ))}
                    {me && (
                      <button className="ams-chip ams-chip-star" aria-pressed={picksOnly} onClick={() => setPicksOnly((v) => !v)}>
                        ★ {me}&apos;s picks
                      </button>
                    )}
                    {(vibes.length > 0 || picksOnly) && (
                      <button
                        className="ams-chip ams-chip-clear"
                        onClick={() => {
                          setVibes([]);
                          setPicksOnly(false);
                        }}
                      >
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
                    const id = stopId(day, s);
                    const mine = forYou(s, me);
                    const matches =
                      (vibes.length === 0 || (s.vibes ?? []).some((v) => vibes.includes(v))) &&
                      (!picksOnly || (!!me && !!s.picks?.includes(me)));
                    const mineStar = !!me && !!s.picks?.includes(me);
                    const live = i === liveIndex;
                    const cls = ["ams-stop", !mine && "is-not-me", !matches && "is-filtered", live && "is-live", s.must && "is-must", mineStar && "is-pick", focusStop === id && "is-focus"]
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
                            {s.optional && <span className="ams-badge ams-badge-opt">Optional</span>}
                            {mineStar ? (
                              <span className="ams-badge ams-badge-star">★ Your kind of thing</span>
                            ) : (
                              s.picks && <span className="ams-badge ams-badge-picks">★ {whoLabel(s.picks)}</span>
                            )}
                            {s.card && <span className="ams-badge ams-badge-card">I amsterdam card</span>}
                            {s.book && <span className="ams-badge ams-badge-book">Book</span>}
                            {s.who && <span className="ams-badge ams-badge-who">{whoLabel(s.who)}</span>}
                            {!mine && <span className="ams-badge ams-badge-off">Not you</span>}
                          </div>
                          <h3 className="ams-stop-title">{s.title}</h3>
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
                            <span className="ams-meta">
                              {s.price && (
                                <span
                                  className={`ams-price ams-price-${s.price === "card" || s.price === "free" ? s.price : "eur"}`}
                                  title={PRICE_KEY.find((x) => x.id === s.price)?.label}
                                >
                                  {priceLabel(s.price)}
                                </span>
                              )}
                              {s.vibes && <span className="ams-vibes">{s.vibes.map((v) => VIBES.find((x) => x.id === v)?.label).join(" · ")}</span>}
                            </span>
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
                <p className="ams-legend">
                  Rough cost per person:{" "}
                  {PRICE_KEY.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 && " · "}
                      <strong>{priceLabel(p.id)}</strong>
                      {p.id === "card" ? " = I amsterdam card" : p.id === "free" ? "" : ` ${p.label}`}
                    </span>
                  ))}
                </p>
              </>
            )}

            <nav className="ams-daynav" aria-label="Previous and next day">
              {prev ? (
                <Link href={`/amsterdam/plan/${prev.id}`}>← {prev.dow} {prev.num}</Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/amsterdam/plan/${next.id}`}>{next.dow} {next.num} →</Link>
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
