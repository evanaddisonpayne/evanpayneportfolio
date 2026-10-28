"use client";

import { useState, type FormEvent } from "react";
import { DESTS, NIGHTS, VIBES, WEEKENDS } from "@/lib/tanyasbach";
import { Palm } from "./Art";
import { Chips, NameField, SubmitRow, useSend } from "./Forms";

export default function VoteView() {
  return (
    <>
      <section className="section light tb-pagehead tb-bg-sky">
        <div className="pattern pattern-passport" aria-hidden />
        <Palm className="tb-head-palm" />
        <div className="wrap">
          <p className="eyebrow">Paso dos</p>
          <h1 className="h1">
            ¿Adónde, cuándo, <span className="italic">y qué?</span>
          </h1>
          <p className="lede">Where we go, which weekend, and what we do when we get there. Three quick votes.</p>
          <div className="tb-jump">
            <a href="#destination">Destination</a>
            <a href="#dates">Dates</a>
            <a href="#vibes">Vibes</a>
          </div>
          <NameField compact />
        </div>
      </section>
      <DestinationVote />
      <DatesVote />
      <VibesVote />
    </>
  );
}

function DestinationVote() {
  const { send, sending, status } = useSend("destination");
  const [rank, setRank] = useState<string[]>([]);
  const tap = (n: string) => setRank((r) => (r.includes(n) ? r.filter((x) => x !== n) : [...r, n]));
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const why = String(new FormData(e.currentTarget).get("why") || "");
    send({ ranking: rank, why }, () => (rank.length ? null : "Tap at least one destination to rank it."));
  };
  return (
    <section className="section light tb-form-sec" id="destination">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">El destino · ranked choice</p>
          <h2 className="h2">Tap them in order. Your #1 first.</h2>
          <p className="lede">Tap again to take one off. First choice gets 4 points, last gets 1.</p>
        </div>
        <form className="tb-form" onSubmit={onSubmit}>
          <ul className="tb-rank">
            {DESTS.map((d) => {
              const i = rank.indexOf(d.name);
              return (
                <li key={d.id}>
                  <button type="button" className="tb-rank-card" aria-pressed={i >= 0} onClick={() => tap(d.name)}>
                    <span className="tb-rank-n" aria-hidden>
                      {i >= 0 ? i + 1 : ""}
                    </span>
                    <span className="tb-rank-k">
                      {d.place} · {d.cost}
                    </span>
                    <span className="tb-rank-title">{d.name}</span>
                    <span className="tb-rank-line">{d.tagline}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="tb-field">
            <label className="tb-label" htmlFor="d-why">
              Why your #1? Sell it.
            </label>
            <textarea className="tb-input" id="d-why" name="why" rows={3} />
          </div>
          <SubmitRow label="Cast my vote" sending={sending} status={status} />
        </form>
      </div>
    </section>
  );
}

function DatesVote() {
  const { send, sending, status } = useSend("dates");
  const [picked, setPicked] = useState<string[]>([]);
  const [nights, setNights] = useState<string[]>(["4 nights"]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ weekends: picked, maxNights: nights[0] || "" }, () => (picked.length ? null : "Tap at least one weekend you could make."));
  };
  return (
    <section className="section light tb-form-sec tb-bg-sun" id="dates">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Las fechas · May 2027</p>
          <h2 className="h2">
            Every Thursday-to-Sunday <span className="italic">you could make work.</span>
          </h2>
        </div>
        <form className="tb-form" onSubmit={onSubmit}>
          <div className="tb-cal" role="group" aria-label="Weekends you can make">
            {WEEKENDS.map((w) => {
              const on = picked.includes(w.label);
              return (
                <button
                  key={w.id}
                  type="button"
                  className="tb-cal-day"
                  aria-pressed={on}
                  onClick={() => setPicked((p) => (on ? p.filter((x) => x !== w.label) : [...p, w.label]))}
                >
                  <span className="tb-cal-dates">{w.label}</span>
                  <span className="tb-cal-note">{w.note ?? "Thu – Sun"}</span>
                  <span className="tb-cal-check" aria-hidden>
                    {on ? "✓" : "+"}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="tb-field">
            <p className="tb-label">Most nights you can do</p>
            <Chips label="Most nights you can do" options={NIGHTS} value={nights} onChange={setNights} multi={false} />
          </div>
          <SubmitRow label="Save my dates" sending={sending} status={status} />
        </form>
      </div>
    </section>
  );
}

function VibesVote() {
  const { send, sending, status } = useSend("vibes");
  const [picks, setPicks] = useState<string[]>([]);
  const icon = Object.fromEntries(VIBES.map((v) => [v.label, v.icon]));
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idea = String(new FormData(e.currentTarget).get("idea") || "");
    send({ picks, idea }, () => (picks.length ? null : "Pick at least one vibe."));
  };
  return (
    <section className="section orange tb-form-sec" id="vibes">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">El vibe</p>
          <h2 className="h2">Pick everything that sounds like a great day.</h2>
          <p className="lede">We&apos;ll build the itinerary around the top picks.</p>
        </div>
        <form className="tb-form" onSubmit={onSubmit}>
          <Chips
            label="Vibes"
            options={VIBES.map((v) => v.label)}
            value={picks}
            onChange={setPicks}
            render={(o) => (
              <>
                <span className="tb-chip-i" aria-hidden>
                  {icon[o]}
                </span>
                {o}
              </>
            )}
          />
          <div className="tb-field">
            <label className="tb-label" htmlFor="v-idea">
              One must-do for Tanya
            </label>
            <input className="tb-input" id="v-idea" name="idea" type="text" />
          </div>
          <SubmitRow label="Send my vibes" sending={sending} status={status} />
        </form>
      </div>
    </section>
  );
}
