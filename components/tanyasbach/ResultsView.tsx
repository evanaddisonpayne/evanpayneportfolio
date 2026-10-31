"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BASE, CANT, DEST_ALIASES, DESTS, FINAL_OPTIONS, INVITED, REACTIONS, SAILINGS, WEEKENDS, type Results } from "@/lib/tanyasbach";
import { Arch } from "./Breaks";
import { VoteClock } from "./Deadline";
import { fetchResults } from "./util";

export default function ResultsView() {
  const [data, setData] = useState<Results | null>(null);
  const [demo, setDemo] = useState(false);
  const [at, setAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const r = await fetchResults();
    setData(r.data);
    setDemo(r.demo);
    setAt(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Fixed order for categories with a natural order; the rest sort by votes.
  const destRows = rows(mergeAliases(data?.destination), DESTS.map((d) => d.name), true);
  const dateRows = rows(data?.dates, [...WEEKENDS, ...SAILINGS].map((w) => w.label), false);
  const finals = FINAL_OPTIONS.map((o) => tally(data?.final?.[o.id]));
  const voters = Math.max(0, ...finals.map((f) => f.voters));
  const lead = finals[0].score === finals[1].score ? -1 : finals[0].score > finals[1].score ? 0 : 1;

  return (
    <>
      <section className="section light tb-pagehead tb-bg-blush">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="wrap">
          <p className="eyebrow">Live results{demo ? " · sample data" : ""}</p>
          <h1 className="h1">
            {voters && lead >= 0 ? (
              <>
                Leaning <span className="italic">{FINAL_OPTIONS[lead].short.toLowerCase()}.</span>
              </>
            ) : voters ? (
              <>
                Dead even. <span className="italic">Your vote decides.</span>
              </>
            ) : (
              <>
                No votes yet. <span className="italic">Be first.</span>
              </>
            )}
          </h1>
          <p className="lede">
            {data ? `${data.rsvps} of ${INVITED} friends ${data.rsvps === 1 ? "has" : "have"} RSVP'd, and ${voters} ${voters === 1 ? "has" : "have"} voted in the final round. ` : ""}
            Totals only. Names, contact info and individual budgets stay with Evan and Tanya.
          </p>
          <VoteClock />
          {demo && <p className="tb-demo">Sample numbers for now. They switch to real votes once the Sheet is connected.</p>}
          <div className="tb-results-bar">
            <button className="btn btn-ghost" onClick={refresh} disabled={loading}>
              {loading ? "Refreshing…" : "Refresh"}
            </button>
            {at && <span className="tb-hint">Updated {at.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>}
          </div>
        </div>
      </section>

      <Arch kicker="Meanwhile" caption="Somewhere warm, a table for sixteen is waiting. Vote before Thanksgiving." />

      <section className="section light tb-results">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The final vote</p>
            <h2 className="h2">Villa vs. cruise</h2>
          </div>
          <div className="tb-final-results">
            {FINAL_OPTIONS.map((o, i) => (
              <Reactions key={o.id} title={o.name} sub={`${o.when} · ${o.nights}`} t={finals[i]} leading={i === lead && voters > 0} tone={o.id === "villa" ? "lagoon" : "signal"} />
            ))}
          </div>
          <p className="tb-hint">Points: 🔥 counts 3, 🙌 counts 2, 🤷‍♀️ counts 1. Highest total wins. 🙅‍♀️ tells us who couldn&apos;t come.</p>
        </div>
        <div className="wrap tb-round1">
          <div className="section-head">
            <p className="eyebrow">Round 1 · closed</p>
            <h2 className="h3">How we got to two</h2>
          </div>
          <div className="tb-results-grid">
            <Board title="Destination" sub="Points: a 1st choice counts 4, a 4th choice counts 1" items={destRows} tone="brass" />
            <Board title="Dates that work" sub="How many people can make each one" items={dateRows} tone="lime" />
          </div>
        </div>
        <div className="wrap btns tb-results-btns">
          <Link className="btn btn-dark" href={`${BASE}/vote`}>
            Cast your vote
          </Link>
        </div>
      </section>
    </>
  );
}

type Tally = { counts: [string, number][]; score: number; voters: number; cant: number };

function tally(obj: Record<string, number> | undefined): Tally {
  const o = obj ?? {};
  const counts = REACTIONS.map((r) => [r.label, o[r.label] ?? 0] as [string, number]);
  const score = REACTIONS.reduce((s, r) => s + r.pts * (o[r.label] ?? 0), 0);
  const voters = counts.reduce((s, [, v]) => s + v, 0);
  return { counts, score, voters, cant: o[CANT] ?? 0 };
}

function Reactions({ title, sub, t, leading, tone }: { title: string; sub: string; t: Tally; leading: boolean; tone: string }) {
  const max = Math.max(1, ...t.counts.map((c) => c[1]));
  return (
    <div className={`card tb-board tb-tone-${tone}${leading ? " is-leading" : ""}`}>
      <div>
        <h3 className="h3">
          {title}
          {leading ? " 👑" : ""}
        </h3>
        <p className="tb-board-sub">{sub}</p>
      </div>
      <ul className="tb-tally">
        {t.counts.map(([label, v]) => {
          const r = REACTIONS.find((x) => x.label === label)!;
          return (
            <li key={label}>
              <span className="tb-tally-emoji" aria-hidden>
                {r.emoji}
              </span>
              <span>
                <span className="tb-tally-k">{r.word}</span>
                <span className="tb-bar-track">
                  <span className="tb-bar-fill" style={{ width: `${(v / max) * 100}%` }} />
                </span>
              </span>
              <span className="tb-tally-v">{v}</span>
            </li>
          );
        })}
      </ul>
      <p className="tb-score">
        <strong>{t.score}</strong> points
        <span>
          {t.cant} {t.cant === 1 ? "person" : "people"} can&apos;t make it
        </span>
      </p>
    </div>
  );
}

function mergeAliases(obj: Record<string, number> | undefined) {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(obj ?? {})) {
    const key = DEST_ALIASES[k] ?? k;
    out[key] = (out[key] ?? 0) + v;
  }
  return out;
}

function rows(obj: Record<string, number> | undefined, order: string[], sortByVotes: boolean): [string, number][] {
  const o = obj ?? {};
  const keys = [...new Set([...order, ...Object.keys(o)])];
  const r = keys.map((k) => [k, o[k] ?? 0] as [string, number]);
  return sortByVotes ? r.sort((a, b) => b[1] - a[1]) : r;
}

function Board({ title, sub, items, tone }: { title: string; sub: string; items: [string, number][]; tone: string }) {
  const max = Math.max(1, ...items.map((i) => i[1]));
  return (
    <div className={`card tb-board tb-tone-${tone}`}>
      <div>
        <h2 className="h3">{title}</h2>
        <p className="tb-board-sub">{sub}</p>
      </div>
      {items.length ? (
        <ol className="tb-bars">
          {items.map(([k, v], i) => (
            <li key={k} className={i === 0 && v > 0 ? "is-top" : undefined}>
              <span className="tb-bar-k">{k}</span>
              <span className="tb-bar-track">
                <span className="tb-bar-fill" style={{ width: `${(v / max) * 100}%` }} />
              </span>
              <span className="tb-bar-v">{v}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="tb-board-sub">Nothing yet.</p>
      )}
    </div>
  );
}
