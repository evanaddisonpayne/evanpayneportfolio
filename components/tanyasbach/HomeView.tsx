"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { BASE, DESTS, GROUP_SIZE, STAMPS, TRIP_TARGET, TRIP_TARGET_LABEL } from "@/lib/tanyasbach";
import { Hibiscus, Motif, Palm, PapelPicado } from "./Art";
import { Arch, Marquee, Neon, Postcard } from "./Breaks";
import { Rules, VoteClock } from "./Deadline";
import { NameField } from "./Forms";
import { useTb } from "./TbProvider";
import { firstName } from "./util";

export default function HomeView() {
  const { name, done, fiesta, tapStamp, stampTapped } = useTb();
  const count = STAMPS.filter((s) => done[s.id]).length;

  return (
    <>
      <section className="section light tb-hero">
        <div className="pattern pattern-sunrise" aria-hidden />
        <PapelPicado />
        <Palm className="tb-hero-palm" />
        <div className="tb-tape" aria-hidden>
          {"LA DESPEDIDA DE TANYA   ·   MAYO 2027   ·   CUATRO ISLAS   ·   UNA NOVIA   ·   ".repeat(10)}
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
              One bride, {GROUP_SIZE} of her favorite people, a long weekend in May, and four places with warm water. We haven&apos;t picked
              one yet. That&apos;s where you come in.
            </p>
            <Countdown />
            <VoteClock />
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

        <div className="wrap tb-who">
          <NameField />
        </div>
      </section>

      <Marquee a={["Tanya ’27", "Mayo", "Vota antes de Thanksgiving", "Sol y salsa", "La novia", "Salud"]} />

      <section className="section light tb-passport-sec" id="passport">
        <div className="wrap">
          <div className="section-head tb-passport-head">
            <div>
              <p className="eyebrow">Your planning passport</p>
              <h2 className="h2">
                {name ? `${firstName(name)}, collect` : "Collect"} all five stamps.{" "}
                <span className="italic">Then we book.</span>
              </h2>
            </div>
            <div className="tb-progress">
              <p className="tb-progress-num">
                {count}
                <span>/{STAMPS.length}</span>
              </p>
              <div className="tb-progress-bar">
                <span style={{ width: `${(count / STAMPS.length) * 100}%` }} />
              </div>
            </div>
          </div>
          <ol className="tb-visas">
            {STAMPS.map((s, i) => {
              const at = done[s.id];
              return (
                <li key={s.id}>
                  <Link href={s.href} className={`tb-visa${at ? " is-stamped" : ""}`} style={{ "--tilt": `${[-6, 4, -3, 7, -5][i]}deg` } as CSSProperties}>
                    <span className="tb-visa-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tb-visa-ring">
                      <Motif kind={s.motif} />
                      <span className="tb-visa-word">{s.short}</span>
                    </span>
                    <span className="tb-visa-label">{s.label}</span>
                    <span className="tb-visa-go">
                      {at ? `Stamped ${new Date(at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : "Go →"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <Rules />

      <Arch kicker="Packing list" caption="SPF 50, a very small swimsuit, one good dress, questionable decisions, and Tanya." />

      <section className="section orange tb-ballot">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">On the ballot</p>
            <h2 className="h2">Four destinations. One bride. Rank them.</h2>
          </div>
          <ul className="tb-ballot-grid">
            {DESTS.map((d, i) => (
              <li key={d.id}>
                <Link className="tb-ticket" href={`${BASE}/islands#${d.id}`} style={{ "--tilt": `${(i % 3) - 1}deg` } as CSSProperties}>
                  <span className="tb-ticket-k">
                    {d.coords}
                    <span className="tb-ticket-cost">{d.cost}</span>
                  </span>
                  <span className="tb-ticket-title">{d.name}</span>
                  <span className="tb-ticket-line">{d.tagline}</span>
                  <span className="tb-ticket-go">Read the dossier →</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="btns tb-ballot-btns">
            <Link className="btn btn-dark" href={`${BASE}/vote#destination`}>
              Cast your vote
            </Link>
          </div>
        </div>
      </section>

      <Postcard />

      <Neon kicker="Regla número uno" line="Lo que pasa en la despedida, se queda en la despedida." />

      <section className="section light tb-tiles-sec tb-bg-sun">
        <div className="wrap">
          <ul className="tb-tiles">
            <li>
              <Link href={`${BASE}/rsvp`}>
                <span className="tb-tile-k">RSVP</span>
                <strong>Are you in?</strong>
                <span>Home airport, passport, rooming, and a private budget check.</span>
              </Link>
            </li>
            <li>
              <Link href={`${BASE}/vote`}>
                <span className="tb-tile-k">Vote</span>
                <strong>Where, when, and what we do</strong>
                <span>Rank the islands, tap your weekends, pick the vibes.</span>
              </Link>
            </li>
            <li>
              <Link href={`${BASE}/islands`}>
                <span className="tb-tile-k">Islands</span>
                <strong>The four dossiers</strong>
                <span>May weather, getting in, money, and what to watch out for.</span>
              </Link>
            </li>
            <li>
              <Link href={`${BASE}/results`}>
                <span className="tb-tile-k">En vivo</span>
                <strong>Where we&apos;re leaning</strong>
                <span>Live tallies as the group votes. Names and budgets stay private.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
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
