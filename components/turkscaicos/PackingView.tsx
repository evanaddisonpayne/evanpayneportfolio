"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { DAYS, LEAVE_HOME, PACK_EVERYONE, PACK_GIRLS, PACK_GUYS, type PackGroup } from "@/lib/turkscaicos";
import { useTc } from "./TcShell";

const KEY = "tc27-pack";
const WHO_KEY = "tc27-pack-who";
type Who = "girls" | "guys";

function read<T>(k: string, f: T): T {
  try {
    const r = window.localStorage.getItem(k);
    return r ? (JSON.parse(r) as T) : f;
  } catch {
    return f;
  }
}
function write(k: string, v: unknown) {
  try {
    window.localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* fine */
  }
}

export default function PackingView() {
  const { confetti, flash } = useTc();
  const [who, setWho] = useState<Who>("girls");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWho(read<Who>(WHO_KEY, "girls"));
    setDone(read<Record<string, boolean>>(KEY, {}));
    setReady(true);
  }, []);

  const groups: PackGroup[] = useMemo(() => [...(who === "girls" ? PACK_GIRLS : PACK_GUYS), ...PACK_EVERYONE], [who]);
  const ids = useMemo(() => groups.flatMap((g) => g.items.map((i) => i.id)), [groups]);
  const count = ids.filter((id) => done[id]).length;
  const pct = ids.length ? Math.round((count / ids.length) * 100) : 0;

  const toggle = (id: string) => {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    write(KEY, next);
    const n = ids.filter((x) => next[x]).length;
    if (n === ids.length && next[id]) {
      confetti(["🧳", "👙", "🕶", "🌺"]);
      flash("Packed. You're more ready than the planners.");
    }
  };
  const pickWho = (w: Who) => {
    setWho(w);
    write(WHO_KEY, w);
  };
  const reset = () => {
    if (!window.confirm("Uncheck everything on your list?")) return;
    const next = { ...done };
    ids.forEach((id) => delete next[id]);
    setDone(next);
    write(KEY, next);
  };

  return (
    <>
      <section className="section light tb-hero tc-pagehead tc-pack-hero">
        <div className="wrap tc-pack-hero-grid">
          <div>
            <p className="eyebrow">
              Packing list<span className="dot" aria-hidden>·</span>Saves on your phone
            </p>
            <h1 className="h1">
              Pack light. <span className="italic">Pack red.</span>
            </h1>
            <p className="lede">
              Four nights, five looks, one carry-on if you&apos;re brave. Pick your list, tick things off as they go in the bag, and come back to it the
              night before you fly.
            </p>
          </div>
          <div className="tc-suitcase" aria-hidden>
            <span className="tc-suitcase-handle" />
            <span className="tc-suitcase-body">
              <span className="tc-suitcase-pct">{ready ? `${pct}%` : ""}</span>
              <span className="tc-suitcase-fill" style={{ height: `${pct}%` }} />
              <span className="tc-suitcase-sticker s1">TCI</span>
              <span className="tc-suitcase-sticker s2">♥ T</span>
              <span className="tc-suitcase-sticker s3">’27</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section tb-bg-sun tc-pack-sec" id="list">
        <div className="wrap">
          <div className="tc-pack-top">
            <div className="tc-seg" role="tablist" aria-label="Whose list">
              {(["girls", "guys"] as Who[]).map((w) => (
                <button key={w} type="button" role="tab" aria-selected={who === w} onClick={() => pickWho(w)}>
                  {w === "girls" ? "The girls (14)" : "The guys (2)"}
                </button>
              ))}
            </div>
            <div className="tc-pack-progress">
              <div className="tc-upbar is-big" aria-hidden>
                <span style={{ width: `${pct}%` }} />
              </div>
              <p>
                <b>
                  {count} of {ids.length}
                </b>{" "}
                packed
              </p>
              <button type="button" className="tc-linkbtn" onClick={reset}>
                Start over
              </button>
            </div>
          </div>

          <div className="tc-notepads">
            {groups.map((g, gi) => (
              <div key={g.title} className="tc-notepad" style={{ "--tilt": `${[-1.2, 0.8, -0.6, 1.1, -0.9, 0.5][gi % 6]}deg` } as CSSProperties}>
                <span className="tc-tape" aria-hidden />
                <h2 className="tc-notepad-title">{g.title}</h2>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <label className={done[it.id] ? "is-done" : undefined}>
                        <input type="checkbox" checked={!!done[it.id]} onChange={() => toggle(it.id)} />
                        <span className="tc-box" aria-hidden>
                          {done[it.id] ? "♥" : ""}
                        </span>
                        <span>
                          <span className="tc-item">{it.label}</span>
                          {it.note && <span className="tc-item-note">{it.note}</span>}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tb-bg-blush" id="looks">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The looks</p>
            <h2 className="h2">
              Five nights, <span className="italic">five dress codes.</span>
            </h2>
            <p className="lede">Screenshot this. It&apos;s the whole wardrobe brief.</p>
          </div>
          <ol className="tc-looks">
            {DAYS.map((d) => (
              <li key={d.id} style={{ "--tone": `var(--${d.tone})` } as CSSProperties}>
                <p className="tc-k">
                  {d.weekday} · {d.date}
                </p>
                <p className="tc-look-theme">{d.dress.theme}</p>
                <p className="tc-look-line">
                  <b>{who === "girls" ? "You" : "Girls"}:</b> {d.dress.girls}
                </p>
                <p className="tc-look-line">
                  <b>{who === "guys" ? "You" : "Guys"}:</b> {d.dress.guys}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section light" id="leave">
        <div className="wrap tc-leave">
          <div className="section-head">
            <p className="eyebrow">Leave at home</p>
            <h2 className="h2">
              Not invited <span className="italic">on this trip.</span>
            </h2>
          </div>
          <ul className="tc-leave-list">
            {LEAVE_HOME.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
