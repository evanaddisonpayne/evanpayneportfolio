"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { BASE, FINAL_FACTS, FINAL_OPTIONS, REACTIONS, VILLA_GUESTS, usd, votingOpen, type FinalOption } from "@/lib/tanyasbach";
import { Palm } from "./Art";
import { VoteClock } from "./Deadline";
import { SubmitBlock, Success, YourName, useSubmitAll, type Problem } from "./Forms";
import { useTb } from "./TbProvider";
import { firstName } from "./util";

type Picks = Partial<Record<FinalOption["id"], string>>;

export default function VoteView() {
  const [open, setOpen] = useState(true);
  useEffect(() => setOpen(votingOpen()), []);
  return (
    <>
      <section className="section light tb-pagehead tb-bg-sky">
        <div className="pattern pattern-passport" aria-hidden />
        <Palm className="tb-head-palm" />
        <div className="wrap">
          <p className="eyebrow">Step 2 of 2 · The final vote</p>
          <h1 className="h1">
            Villa or cruise? <span className="italic">You decide.</span>
          </h1>
          <p className="lede">
            Round 1 narrowed it to two. Read the side-by-side, then react to both with an emoji. One button at the end. About a minute.
          </p>
          <VoteClock />
        </div>
      </section>
      {open ? <FinalForm /> : <Closed />}
    </>
  );
}

function Closed() {
  return (
    <section className="section light tb-form-sec">
      <div className="wrap tb-success">
        <h2 className="h2">Voting is closed.</h2>
        <p className="lede">The final vote closed the night before Thanksgiving. Thank you to everyone who weighed in.</p>
        <div className="tb-success-btns">
          <Link className="btn btn-signal tb-big-btn" href={`${BASE}/results`}>
            See the results
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalForm() {
  const { name } = useTb();
  const { run, state, problems, edit } = useSubmitAll();
  const [picks, setPicks] = useState<Picks>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note = String(new FormData(e.currentTarget).get("note") || "").trim();
    const issues: Problem[] = FINAL_OPTIONS.filter((o) => !picks[o.id]).map((o) => ({
      msg: `React to the ${o.short.toLowerCase()}`,
      focus: `react-${o.id}`,
    }));
    run([{ kind: "final", fields: { villa: picks.villa ?? "", cruise: picks.cruise ?? "", note } }], issues);
  };

  if (state === "done")
    return (
      <section className="section light tb-form-sec">
        <div className="wrap">
          <Success
            title={`Vote's in. Gracias, ${firstName(name)}.`}
            body="You can change your reactions any time before the deadline. Your latest answer is the one that counts."
            next={{ href: `${BASE}/results`, label: "See how it's going" }}
            onEdit={edit}
          />
        </div>
      </section>
    );

  return (
    <form onSubmit={onSubmit} noValidate>
      <section className="section light tb-final-glance">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">At a glance</p>
            <h2 className="h2">
              Side by side. <span className="italic">Flights not included.</span>
            </h2>
          </div>
          <div className="tb-glance card">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Detail</span>
                  </th>
                  {FINAL_OPTIONS.map((o) => (
                    <th scope="col" key={o.id}>
                      {o.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FINAL_FACTS.map((f) => (
                  <tr key={f.k}>
                    <th scope="row">{f.k}</th>
                    <td>{f.villa}</td>
                    <td>{f.cruise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tb-hint">
            Estimates per person for a moderately boozy weekend. The villa is split {VILLA_GUESTS} ways. The cruise assumes two to a cabin.
          </p>
        </div>
      </section>

      <section className="section light tb-bg-blush tb-final-sec">
        <div className="wrap">
          <div className="tb-final-grid">
            {FINAL_OPTIONS.map((o) => (
              <OptionCard key={o.id} o={o} pick={picks[o.id]} onPick={(l) => setPicks((p) => ({ ...p, [o.id]: l }))} />
            ))}
          </div>
        </div>
      </section>

      <section className="section light tb-form-sec">
        <div className="wrap">
          <div className="tb-form card">
            <YourName />
            <div className="tb-final-mine" aria-live="polite">
              {FINAL_OPTIONS.map((o) => (
                <p key={o.id}>
                  <span>{o.short}</span>
                  <strong>{picks[o.id] ?? "Not yet"}</strong>
                </p>
              ))}
            </div>
            <div className="tb-field">
              <label className="tb-label" htmlFor="f-note">
                Anything we should know? <span className="tb-optional">(optional)</span>
              </label>
              <textarea className="tb-input" id="f-note" name="note" rows={2} placeholder="e.g. I can only do the villa if we leave Sunday" />
            </div>
            <SubmitBlock label="Send my vote" state={state} problems={problems} />
          </div>
        </div>
      </section>
    </form>
  );
}

function OptionCard({ o, pick, onPick }: { o: FinalOption; pick?: string; onPick: (label: string) => void }) {
  const total = o.lines.reduce((s, l) => s + l.amount, 0);
  return (
    <article className={`tb-final card tb-final-${o.id}`}>
      <header className="tb-final-head">
        <p className="tb-final-kicker">{o.kicker}</p>
        <h2 className="h3 tb-final-name">{o.name}</h2>
        <p className="tb-final-when">
          <strong>{o.when}</strong> · {o.nights}
        </p>
        <p className="tb-final-where">
          {o.where}
          {o.url && (
            <>
              {" "}
              <a href={o.url} target="_blank" rel="noopener noreferrer">
                See the listing ↗
              </a>
            </>
          )}
        </p>
      </header>

      <div className="tb-final-price">
        <span className="tb-final-num">
          {usd(o.low)}–{usd(o.high)}
        </span>
        <span className="tb-final-per">per person, estimated, before flights</span>
      </div>

      <table className="tb-final-lines">
        <tbody>
          {o.lines.map((l) => (
            <tr key={l.item}>
              <th scope="row">
                {l.item}
                <small>{l.note}</small>
              </th>
              <td>{l.amount ? usd(l.amount) : "Included"}</td>
            </tr>
          ))}
          <tr className="is-total">
            <th scope="row">About</th>
            <td>{usd(Math.round(total / 50) * 50)}</td>
          </tr>
          {o.extra && (
            <tr className="is-extra">
              <th scope="row">{o.extra.item}</th>
              <td>{o.extra.amount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="tb-final-lists">
        <div>
          <p className="tb-final-lh">Why it&apos;s great</p>
          <ul className="tb-final-good">
            {o.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="tb-final-lh">Good to know</p>
          <ul className="tb-final-know">
            {o.heads.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <fieldset className="tb-react" id={`react-${o.id}`} tabIndex={-1}>
        <legend>How do you feel about the {o.short.toLowerCase()}?</legend>
        <div className="tb-react-row">
          {REACTIONS.map((r) => (
            <button
              key={r.label}
              type="button"
              className="tb-react-btn"
              aria-pressed={pick === r.label}
              onClick={() => onPick(r.label)}
            >
              <span className="tb-react-emoji" aria-hidden>
                {r.emoji}
              </span>
              <span className="tb-react-word">{r.word}</span>
            </button>
          ))}
        </div>
      </fieldset>
    </article>
  );
}
