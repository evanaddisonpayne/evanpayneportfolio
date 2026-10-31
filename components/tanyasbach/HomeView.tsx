"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { BASE, FINAL_OPTIONS, GROUP_SIZE, TRIP_TARGET, TRIP_TARGET_LABEL, VOTE_DEADLINE_LABEL, usd } from "@/lib/tanyasbach";
import { Hibiscus, Palm, PapelPicado } from "./Art";
import { Marquee, Neon, Postcard } from "./Breaks";
import PackingList from "./PackingList";
import { Rules, VoteClock } from "./Deadline";
import { useTb } from "./TbProvider";
import { firstName } from "./util";

export default function HomeView() {
  const { fiesta, tapStamp, stampTapped } = useTb();

  return (
    <>
      <section className="section light tb-hero">
        <div className="pattern pattern-sunrise" aria-hidden />
        <PapelPicado />
        <Palm className="tb-hero-palm" />
        <div className="tb-tape" aria-hidden>
          {"LA DESPEDIDA DE TANYA   ·   MAYO 2027   ·   VILLA O CRUCERO   ·   UNA NOVIA   ·   ".repeat(10)}
        </div>
        <div className="wrap tb-hero-grid">
          <div className="tb-hero-copy">
            <p className="eyebrow">
              Bachelorette · May 2027<span className="dot" aria-hidden>·</span>Private trip site
            </p>
            <h1 className="h1">
              ¡Vamos, <span className="italic">Tanya!</span>
            </h1>
            <p className="lede">
              One bride, {GROUP_SIZE} of her closest friends, and one last decision: a villa in Turks and Caicos over Memorial Day weekend,
              or a Virgin Voyages cruise to Grand Turk. The final vote is open.
            </p>
            <div className="btns tb-hero-btns">
              <Link className="btn btn-signal tb-big-btn" href={`${BASE}/rsvp`}>
                Start here: RSVP
              </Link>
            </div>
            <VoteClock />
            <Countdown />
          </div>
          <div className="tb-stamp-wrap">
            <div
              className={`tb-stamp${stampTapped ? " is-tapped" : ""}`}
              role="button"
              tabIndex={0}
              aria-label="Passport stamp"
              onClick={tapStamp}
              onKeyDown={(e: { key: string }) => e.key === "Enter" && tapStamp()}
            >
              <Hibiscus className="tb-stamp-flower" wash={false} />
              <span className="tb-stamp-top">República de la Despedida</span>
              <span className="tb-stamp-xxx">{fiesta ? "💃 🍹 💃" : "✿ ✿ ✿"}</span>
              <span className="tb-stamp-date">Mayo · MMXXVII</span>
              <span className="tb-stamp-bottom">Tanya · La Novia</span>
            </div>
          </div>
        </div>

      </section>

      <Steps />

      <Marquee a={["Tanya ’27", "Mayo", "Vota antes de Thanksgiving", "Sol y salsa", "La novia", "Salud"]} />

      <Rules />

      <PackingList />

      <section className="section orange tb-ballot">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The final vote</p>
            <h2 className="h2">Two options. One bride. Pick your feeling.</h2>
          </div>
          <ul className="tb-ballot-grid">
            {FINAL_OPTIONS.map((o, i) => (
              <li key={o.id}>
                <Link className="tb-ticket" href={`${BASE}/vote`} style={{ "--tilt": `${i ? 1 : -1}deg` } as CSSProperties}>
                  <span className="tb-ticket-k">
                    {o.kicker}
                    <span className="tb-ticket-cost">
                      ~{usd(o.low)}–{usd(o.high)}
                    </span>
                  </span>
                  <span className="tb-ticket-title">{o.name}</span>
                  <span className="tb-ticket-line">
                    {o.when} · {o.nights}
                  </span>
                  <span className="tb-ticket-go">See the breakdown →</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="btns tb-ballot-btns">
            <Link className="btn btn-dark tb-big-btn" href={`${BASE}/vote`}>
              Vote now
            </Link>
          </div>
        </div>
      </section>

      <Postcard />

      <Neon kicker="Regla número uno" line="Lo que pasa en la despedida, se queda en la despedida." />

    </>
  );
}

/** The to-do list: what to do, in order, with a clear status for each. */
function Steps() {
  const { done } = useTb();
  const rsvpDone = Boolean(done.rsvp);
  const voteDone = Boolean(done.final);
  const steps = [
    { n: 1, href: `${BASE}/rsvp`, title: "RSVP", line: "Tell us you're in, plus a few travel details.", time: "About 2 minutes", done: rsvpDone },
    { n: 2, href: `${BASE}/vote`, title: "Vote", line: "The final vote: villa or cruise. React with an emoji.", time: `About a minute · by ${VOTE_DEADLINE_LABEL}`, done: voteDone },
    { n: 3, href: `${BASE}/results`, title: "See the results", line: "Check where the group is leaning. Come back any time.", time: "Updates as people vote", done: false },
  ];
  const next = steps.find((s) => !s.done) ?? steps[2];
  return (
    <section className="section light tb-steps-sec" id="start">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">What to do</p>
          <h2 className="h2">
            Two quick steps. <span className="italic">That&apos;s it.</span>
          </h2>
        </div>
        <ol className="tb-steps">
          {steps.map((s) => (
            <li key={s.n}>
              <Link href={s.href} className={`tb-step${s.done ? " is-done" : ""}${s === next ? " is-next" : ""}`}>
                <span className="tb-step-n" aria-hidden>
                  {s.done ? "✓" : s.n}
                </span>
                <span className="tb-step-body">
                  <strong>{s.title}</strong>
                  <span>{s.line}</span>
                  <small>{s.time}</small>
                </span>
                <span className="tb-step-go">{s.done ? "Done · edit" : s === next ? "Start" : "Open"}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="tb-hint">
          Ticks are saved on this phone only. If you already did a step on another device, you&apos;re all set: we have your answers.
        </p>
      </div>
    </section>
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
  const diff = new Date(TRIP_TARGET).getTime() - now;
  if (diff <= 0) return <p className="tb-count-live">¡Ya llegó! It&apos;s trip time.</p>;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const sec = Math.floor((diff % 60_000) / 1000);
  const cells: [number, string][] = [
    [d, d === 1 ? "day" : "days"],
    [h, h === 1 ? "hour" : "hours"],
    [m, "min"],
    [sec, "sec"],
  ];
  return (
    <div className="tb-count">
      <div className="tb-count-row" role="timer" aria-live="off" aria-label={`${d} days, ${h} hours, ${m} minutes ${TRIP_TARGET_LABEL}`}>
        {cells.map(([v, l]) => (
          <div key={l} className="tb-count-cell">
            <span className="tb-count-num">{l === "days" || l === "day" ? v : String(v).padStart(2, "0")}</span>
            <span className="tb-count-label">{l}</span>
          </div>
        ))}
      </div>
      <p className="tb-count-cap">{TRIP_TARGET_LABEL}</p>
    </div>
  );
}
