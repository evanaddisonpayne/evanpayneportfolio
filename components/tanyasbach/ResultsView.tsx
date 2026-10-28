"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BASE, BUDGET_BANDS, DESTS, SAILINGS, WEEKENDS, type Results } from "@/lib/tanyasbach";
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
  const destRows = rows(data?.destination, DESTS.map((d) => d.name), true);
  const dateRows = rows(data?.dates, [...WEEKENDS, ...SAILINGS].map((w) => w.label), false);
  const vibeRows = rows(data?.vibes, [], true).slice(0, 8);
  const budgetRows = rows(data?.budgetBands, BUDGET_BANDS, false);
  const leader = destRows[0]?.[1] ? destRows[0][0] : null;

  return (
    <>
      <section className="section light tb-pagehead tb-bg-blush">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="wrap">
          <p className="eyebrow">Live results{demo ? " · sample data" : ""}</p>
          <h1 className="h1">
            {leader ? (
              <>
                Leaning <span className="italic">{leader.split(",")[0]}.</span>
              </>
            ) : (
              <>
                No votes yet. <span className="italic">Be first.</span>
              </>
            )}
          </h1>
          <p className="lede">
            {data ? `${data.rsvps} ${data.rsvps === 1 ? "person has" : "people have"} RSVP'd. ` : ""}
            Tallies only: names, contacts, and individual budgets stay with the planners.
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

      <Arch kicker="Meanwhile" caption="Somewhere warm, a table for eighteen is waiting. Vote before Thanksgiving." />

      <section className="section light tb-results">
        <div className="wrap tb-results-grid">
          <Board title="Destination" sub="Points: a 1st choice counts 4, a 4th choice counts 1" items={destRows} tone="signal" />
          <Board title="Dates that work" sub="How many people can make each one" items={dateRows} tone="lagoon" />
          <Board title="Top vibes" sub="What people want to do" items={vibeRows} tone="brass" />
          <Board title="Budget comfort" sub="People per range, excluding flights" items={budgetRows} tone="lime" />
        </div>
        <div className="wrap btns tb-results-btns">
          <Link className="btn btn-dark" href={`${BASE}/vote`}>
            Add your votes
          </Link>
        </div>
      </section>
    </>
  );
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
