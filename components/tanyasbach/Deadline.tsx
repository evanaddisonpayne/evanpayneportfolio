"use client";

import { useEffect, useState } from "react";
import { NO_REFUND, VOTE_DEADLINE, VOTE_DEADLINE_LABEL } from "@/lib/tanyasbach";

/** Live "voting closes in…" pill. Ticks every minute; flips to "Voting closed" after the deadline. */
export function VoteClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  if (now === null) return <p className={`tb-voteclock ${className}`} aria-hidden>&nbsp;</p>;
  const diff = new Date(VOTE_DEADLINE).getTime() - now;
  if (diff <= 0)
    return (
      <p className={`tb-voteclock is-closed ${className}`}>
        <strong>Voting closed</strong> on Thanksgiving Eve. Results are final.
      </p>
    );
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const left = d > 0 ? `${d} ${d === 1 ? "day" : "days"}, ${h} ${h === 1 ? "hr" : "hrs"}` : `${h} ${h === 1 ? "hour" : "hours"}`;
  return (
    <p className={`tb-voteclock${d < 3 ? " is-urgent" : ""} ${className}`}>
      <strong>Voting closes in {left}</strong>
      <span>{VOTE_DEADLINE_LABEL}, the night before Thanksgiving</span>
    </p>
  );
}

/** The house rules. */
export function Rules() {
  return (
    <section className="section light tb-rules tb-bg-blush">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Las reglas</p>
          <h2 className="h2">
            Three rules. <span className="italic">Non-negotiable.</span>
          </h2>
        </div>
        <ol className="tb-rules-grid">
          <li>
            <span className="tb-rule-n">01</span>
            <strong>Vote by Thanksgiving.</strong>
            <span>Destination, dates and vibes close {VOTE_DEADLINE_LABEL}. Silence counts as &ldquo;I&apos;m easy.&rdquo;</span>
          </li>
          <li className="is-money">
            <span className="tb-rule-n">02</span>
            <strong>Paying or committing means you&apos;re in.</strong>
            <span>{NO_REFUND} Only commit when you&apos;re sure.</span>
          </li>
          <li>
            <span className="tb-rule-n">03</span>
            <strong>Lo que pasa en la despedida…</strong>
            <span>…se queda en la despedida. What happens on the trip stays on the trip.</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
