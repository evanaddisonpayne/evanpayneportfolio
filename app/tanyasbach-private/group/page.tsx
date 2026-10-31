import type { Metadata } from "next";
import Link from "next/link";
import { INVITED, PEOPLE, SNAPSHOT, STILL_WAITING, firstName, money, tally, type RoomPref } from "@/lib/tanyasbach-group";

export const metadata: Metadata = { title: "The group" };

const ROOMS: { pref: RoomPref; emoji: string }[] = [
  { pref: "Happy to share a bed", emoji: "🛏️" },
  { pref: "Share a room, own bed", emoji: "🛏️🛏️" },
  { pref: "Need my own room", emoji: "🚪" },
];

/** People who named each other (both directions), worked out by hand from the roommate wishes below. */
const NATURAL_GROUPS = [
  { who: "Cynthia, Vanessa, Megan", why: "All three asked for each other." },
  { who: "Suong, Mai (+ Lina)", why: "Sisters; both asked for each other and Lina." },
  { who: "Lily, Peighton", why: "Asked for each other. Lily shares a bed; Peighton wants her own bed." },
  { who: "Evan", why: "Needs his own room, though Alexis and Peighton both named him." },
  { who: "Ana, Alejandra, Alexis", why: "No mutual pick yet. Ana and Alexis want their own bed; Alejandra is happy to share." },
];

function Bars({ rows, of }: { rows: { label: string; count: number }[]; of: number }) {
  return (
    <ul className="tbg-bars">
      {rows.map((r) => (
        <li key={r.label}>
          <span className="tbg-bar-label">{r.label}</span>
          <span className="tbg-bar-track" aria-hidden>
            <span className="tbg-bar-fill" style={{ width: `${(r.count / of) * 100}%` }} />
          </span>
          <span className="tbg-bar-n">
            {r.count}/{of}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function GroupPage() {
  const n = PEOPLE.length;
  const byBudget = [...PEOPLE].sort((a, b) => b.budget - a.budget || a.name.localeCompare(b.name));
  const budgets = PEOPLE.map((p) => p.budget).sort((a, b) => a - b);
  const median = budgets[Math.floor(budgets.length / 2)];
  const mean = Math.round(budgets.reduce((s, b) => s + b, 0) / n / 50) * 50;

  return (
    <>
      <header className="tb-nav">
        <div className="wrap tb-nav-inner">
          <Link href="/tanyasbach-private" className="tb-nav-brand">
            <span className="tb-nav-x" aria-hidden>
              ✿ ✿ ✿
            </span>
            Tanya <em>’27</em>
          </Link>
          <Link href="/tanyasbach-private" className="tbg-back">
            ← Planners page
          </Link>
        </div>
      </header>

      <section className="section light tb-pagehead tbp-head">
        <div className="wrap">
          <p className="eyebrow">
            Planners<span className="dot" aria-hidden>·</span>From the planning sheet, {SNAPSHOT}
          </p>
          <h1 className="h1">
            The <span className="italic">group.</span>
          </h1>
          <p className="lede">
            Everyone&apos;s budget, vibe picks and rooming wishes, person by person. {n} of {INVITED} have answered; still waiting on{" "}
            {STILL_WAITING}. If someone answered twice, this uses their latest.
          </p>
          <nav className="tbp-toc" aria-label="On this page">
            <a href="#budgets">Budgets</a>
            <a href="#rooming">Rooming</a>
            <a href="#vibes">Vibes</a>
            <a href="#everyone">Everyone</a>
          </nav>
        </div>
      </section>

      <section id="budgets" className="section tbp-section light tb-bg-sky">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Comfort max per person, not counting flights</p>
            <h2 className="h2">Budgets</h2>
            <p className="lede">
              Median {money(median)}, average about {money(mean)}. The form used brackets, so $1,999 and $2,999 mean &ldquo;about $2k&rdquo; and
              &ldquo;about $3k.&rdquo;
            </p>
          </div>
          <div className="tbp-body">
            <div className="tbg-scroll">
              <table className="tbp-table">
                <thead>
                  <tr>
                    <th>Who</th>
                    <th>Comfort max</th>
                    <th>Would splurge on</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {byBudget.map((p) => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td className="tbg-num">{money(p.budget)}</td>
                      <td>{p.splurge.length ? p.splurge.join(", ") : "—"}</td>
                      <td>{p.budgetNote ?? ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="tbg-h3">Most-wanted splurges</h3>
            <Bars rows={tally((p) => p.splurge)} of={n} />
          </div>
        </div>
      </section>

      <section id="rooming" className="section tbp-section light tb-bg-blush">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Room preference + who they asked for</p>
            <h2 className="h2">Rooming</h2>
          </div>
          <div className="tbp-body">
            <div className="tbp-cards">
              {ROOMS.map(({ pref, emoji }) => {
                const people = PEOPLE.filter((p) => p.room === pref);
                return (
                  <article key={pref} className="tbp-card">
                    <h3>
                      <span aria-hidden>{emoji}</span> {pref}
                    </h3>
                    <p className="tbg-count">{people.length} {people.length === 1 ? "person" : "people"}</p>
                    <ul className="tbg-roomlist">
                      {people.map((p) => (
                        <li key={p.name}>
                          <strong>{firstName(p.name)}</strong>
                          {p.roommateWish ? <span> → {p.roommateWish}</span> : <span className="tbg-muted"> · no one named</span>}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
            <h3 className="tbg-h3">Natural groupings</h3>
            <ul className="tbp-list">
              {NATURAL_GROUPS.map((g) => (
                <li key={g.who}>
                  <strong>{g.who}.</strong> {g.why}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="vibes" className="section tbp-section light tb-bg-sun">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">What people want to do</p>
            <h2 className="h2">Vibes</h2>
          </div>
          <div className="tbp-body">
            <Bars rows={tally((p) => p.vibes)} of={n} />
            <h3 className="tbg-h3">Must-do ideas</h3>
            <ul className="tbp-list">
              {PEOPLE.filter((p) => p.mustDo).map((p) => (
                <li key={p.name}>
                  <strong>{firstName(p.name)}:</strong> {p.mustDo}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="everyone" className="section tbp-section light">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">One card each</p>
            <h2 className="h2">Everyone</h2>
          </div>
          <div className="tbp-body tbg-people">
            {PEOPLE.map((p) => (
              <article key={p.name} className="tbp-card tbg-person">
                <h3>{p.name}</h3>
                <dl>
                  <div>
                    <dt>Budget</dt>
                    <dd>
                      {money(p.budget)}
                      {p.budgetNote ? ` · ${p.budgetNote}` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt>Splurge</dt>
                    <dd>{p.splurge.length ? p.splurge.join(", ") : "—"}</dd>
                  </div>
                  <div>
                    <dt>Room</dt>
                    <dd>
                      {p.room}
                      {p.roommateWish ? ` · with ${p.roommateWish}` : ""}
                    </dd>
                  </div>
                  {p.mustDo && (
                    <div>
                      <dt>Must-do</dt>
                      <dd>{p.mustDo}</dd>
                    </div>
                  )}
                </dl>
                <ul className="tbg-chips" aria-label="Vibe picks">
                  {p.vibes.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="tbp-foot">
        <div className="wrap">
          <p className="tb-hint">
            For Evan and Tanya. Everyone&apos;s budget is on this page and anyone with the link can open it, so please don&apos;t forward it.
          </p>
        </div>
      </footer>
    </>
  );
}
