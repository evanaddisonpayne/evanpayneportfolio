"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { BASE, DESTS, NIGHTS, SAILINGS, VIBES, WEEKENDS, votingOpen } from "@/lib/tanyasbach";
import { Palm } from "./Art";
import { VoteClock } from "./Deadline";
import { Chips, Question, SubmitBlock, Success, YourName, useSubmitAll, type Part, type Problem } from "./Forms";
import { useTb } from "./TbProvider";
import { firstName } from "./util";

const ORD = ["1st", "2nd", "3rd", "4th"];

export default function VoteView() {
  const [open, setOpen] = useState(true);
  useEffect(() => setOpen(votingOpen()), []);
  return (
    <>
      <section className="section light tb-pagehead tb-bg-sky">
        <div className="pattern pattern-passport" aria-hidden />
        <Palm className="tb-head-palm" />
        <div className="wrap">
          <p className="eyebrow">Step 2 of 2 · Vote</p>
          <h1 className="h1">
            Where, when, <span className="italic">and what we do.</span>
          </h1>
          <p className="lede">Three quick questions, one button at the end. About 3 minutes.</p>
          <VoteClock />
        </div>
      </section>
      {open ? <VoteForm /> : <Closed />}
    </>
  );
}

function Closed() {
  return (
    <section className="section light tb-form-sec">
      <div className="wrap tb-success">
        <h2 className="h2">Voting is closed.</h2>
        <p className="lede">Votes closed the night before Thanksgiving. Thank you to everyone who weighed in.</p>
        <div className="tb-success-btns">
          <Link className="btn btn-signal tb-big-btn" href={`${BASE}/results`}>
            See the results
          </Link>
        </div>
      </div>
    </section>
  );
}

function VoteForm() {
  const { name } = useTb();
  const { run, state, problems, edit } = useSubmitAll();
  const [rank, setRank] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [nights, setNights] = useState<string[]>(["4 nights"]);
  const [vibes, setVibes] = useState<string[]>([]);

  const tap = (n: string) => setRank((r) => (r.includes(n) ? r.filter((x) => x !== n) : [...r, n]));
  const toggleDate = (l: string) => setDates((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const why = String(fd.get("why") || "");
    const idea = String(fd.get("idea") || "");
    const issues: Problem[] = [];
    if (!rank.length) issues.push({ msg: "Pick at least your favorite destination", focus: "q-where" });
    if (!dates.length) issues.push({ msg: "Tap at least one date you could make", focus: "q-when" });
    const parts: Part[] = [];
    if (rank.length) parts.push({ kind: "destination", fields: { ranking: rank, why } });
    if (dates.length) parts.push({ kind: "dates", fields: { weekends: dates, maxNights: nights[0] || "" } });
    if (vibes.length || idea) parts.push({ kind: "vibes", fields: { picks: vibes, idea } });
    run(parts, issues);
  };

  if (state === "done")
    return (
      <section className="section light tb-form-sec">
        <div className="wrap">
          <Success
            title={`Votes in. Thank you, ${firstName(name)}.`}
            body="You can come back and change your votes any time before Wednesday, Nov 25. Your latest answers are the ones that count."
            next={{ href: `${BASE}/results`, label: "See where everyone's leaning" }}
            onEdit={edit}
          />
        </div>
      </section>
    );

  return (
    <section className="section light tb-form-sec">
      <div className="wrap">
        <form className="tb-form tb-form-long card" onSubmit={onSubmit} noValidate>
          <YourName />

          <Question n={1} id="q-where" title="Where should we go?" hint="Tap your favorite first, then your next favorite. You don't have to rank all four.">
            <ul className="tb-rank">
              {DESTS.map((d) => {
                const i = rank.indexOf(d.name);
                return (
                  <li key={d.id}>
                    <button type="button" className="tb-rank-card" aria-pressed={i >= 0} onClick={() => tap(d.name)}>
                      <span className="tb-rank-badge">{i >= 0 ? `${ORD[i]} choice` : "Tap to pick"}</span>
                      <span className="tb-rank-title">{d.name}</span>
                      <span className="tb-rank-line">{d.tagline}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="tb-rank-summary" aria-live="polite">
              {rank.length ? (
                <>
                  <span>Your order: {rank.map((r, i) => `${i + 1}. ${r}`).join("  ·  ")}</span>
                  <button type="button" className="tb-linkbtn" onClick={() => setRank([])}>
                    Start over
                  </button>
                </>
              ) : (
                <span>Nothing picked yet.</span>
              )}
            </div>
            <p className="tb-q-more">
              Not sure? <Link href={`${BASE}/islands`}>Read about each place</Link>.
            </p>
            <div className="tb-field">
              <label className="tb-label" htmlFor="d-why">
                Why your favorite? <span className="tb-optional">(optional)</span>
              </label>
              <textarea className="tb-input" id="d-why" name="why" rows={2} />
            </div>
          </Question>

          <Question n={2} id="q-when" title="Which dates could you make?" hint="Tap every one that works. Tap again to unselect.">
            <p className="tb-sublabel">If we fly somewhere (Thursday to Sunday)</p>
            <div className="tb-cal" role="group" aria-label="Weekends you could make">
              {WEEKENDS.map((w) => (
                <DateChip key={w.id} label={w.label} note={w.note ?? "Thu to Sun"} on={dates.includes(w.label)} toggle={toggleDate} />
              ))}
            </div>
            <p className="tb-sublabel">If we take the cruise from Miami (5 nights)</p>
            <div className="tb-cal" role="group" aria-label="Cruise dates you could make">
              {SAILINGS.map((w) => (
                <DateChip key={w.id} label={w.label} note={w.note} on={dates.includes(w.label)} toggle={toggleDate} />
              ))}
            </div>
            <p className="tb-sublabel">How many nights can you be away?</p>
            <Chips label="Most nights you can be away" options={NIGHTS} value={nights} onChange={setNights} multi={false} />
          </Question>

          <Question n={3} title="What sounds fun?" hint="Pick as many as you like. Optional, but it helps us plan the days.">
            <Chips label="Things to do" options={VIBES.map((v) => v.label)} value={vibes} onChange={setVibes} />
            <div className="tb-field">
              <label className="tb-label" htmlFor="v-idea">
                One thing we have to do for Tanya <span className="tb-optional">(optional)</span>
              </label>
              <input className="tb-input" id="v-idea" name="idea" type="text" />
            </div>
          </Question>

          <SubmitBlock label="Send my votes" state={state} problems={problems} />
        </form>
      </div>
    </section>
  );
}

function DateChip({ label, note, on, toggle }: { label: string; note: string; on: boolean; toggle: (l: string) => void }) {
  return (
    <button type="button" className="tb-cal-day" aria-pressed={on} onClick={() => toggle(label)}>
      <span className="tb-cal-dates">{label}</span>
      <span className="tb-cal-note">{note}</span>
      <span className="tb-cal-check" aria-hidden>
        {on ? "✓" : "+"}
      </span>
    </button>
  );
}
