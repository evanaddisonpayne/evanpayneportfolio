"use client";

import { useState, type CSSProperties } from "react";
import { CONSEQUENCES, DARES, DRINKS, EGO_BIO, EGO_FIRST, EGO_MID, EGO_PLACE, FATES, IGUANA_LINES, OFFENCES, RULINGS } from "@/lib/turkscaicos";
import { Conch, Iguana } from "./TcArt";
import { playSteelPan, useTc } from "./TcShell";

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export default function FunView() {
  const { confetti, openClub, flash } = useTc();
  return (
    <>
      <section className="section light tb-hero tc-pagehead tc-fun-hero">
        <div className="wrap">
          <p className="eyebrow">
            The weird part<span className="dot" aria-hidden>·</span>Rulings are final
          </p>
          <h1 className="h1">
            Fun, <span className="italic">island-style.</span>
          </h1>
          <p className="lede">
            A conch that settles arguments, a court for villa crimes, your island alter ego, dares on a slot machine, and a button you should not press.
          </p>
        </div>
      </section>

      <section className="section tb-bg-sea tc-fate-sec" id="conch">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Settle it</p>
            <h2 className="h2">
              Consult the <span className="italic">Conch of Fate.</span>
            </h2>
            <p className="lede">Next bar? Who pays? Can somebody go to bed? Spin the conch. The conch is binding.</p>
          </div>
          <ConchOfFate />
        </div>
      </section>

      <section className="section tb-bg-blush" id="ego">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Your island alter ego</p>
            <h2 className="h2">
              Who you <span className="italic">really</span> are down there.
            </h2>
            <p className="lede">Type your name. The island already knows. Same name, same alter ego, every time.</p>
          </div>
          <AlterEgo />
        </div>
      </section>

      <section className="section light tc-court-sec" id="court">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The Villa Court of Providenciales</p>
            <h2 className="h2">
              File an official <span className="italic">roommate grievance.</span>
            </h2>
            <p className="lede">Name the accused, check the crimes, get a formal ruling to paste in the group chat. The bride is the Supreme Court.</p>
          </div>
          <VillaCourt />
        </div>
      </section>

      <section className="section tc-dark" id="dares">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Rum Punch Roulette</p>
            <h2 className="h2">
              Three reels. <span className="italic">Zero accountability.</span>
            </h2>
            <p className="lede">Pull the lever when the night needs a push. Hydrate between pulls. We mean it.</p>
          </div>
          <Roulette />

          <div className="tc-buttons-row">
            <button
              type="button"
              className="btn btn-signal tb-big-btn"
              onClick={() => {
                playSteelPan();
                confetti(["🦩", "🦩", "🍹", "🌺"]);
                flash("¡Salud! It's raining flamingos.");
              }}
            >
              Make it rain flamingos
            </button>
            <p className="tb-hint">Or type “salud” anywhere on the site.</p>
          </div>

          <div className="tc-buttons-row">
            <button type="button" className="tc-dont" onClick={openClub}>
              Do not press this
            </button>
            <p className="tb-hint">Opens a full-screen beach club. It flashes, so it asks first. (Konami code, or type “afterdark”.)</p>
          </div>
        </div>
      </section>

      <IguanaPeek />
    </>
  );
}

/* ------------------------------------------------------------------ */

function ConchOfFate() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [fate, setFate] = useState<string | null>(null);
  const spin = () => {
    if (spinning) return;
    setFate(null);
    setSpinning(true);
    setAngle((a) => a + 1440 + Math.floor(Math.random() * 720));
    const f = pick(FATES);
    window.setTimeout(() => {
      setFate(f);
      setSpinning(false);
    }, 3000);
  };
  return (
    <div className="tc-fate">
      <button type="button" className="tc-conch" onClick={spin} disabled={spinning} aria-label="Spin the Conch of Fate">
        <span className="tc-conch-spin" style={{ transform: `rotate(${angle}deg)` }}>
          <Conch />
        </span>
        <span className="tc-conch-cta">{spinning ? "The conch is thinking…" : fate ? "Spin again" : "Spin it"}</span>
      </button>
      <div className={`tc-fate-card${fate ? " is-shown" : ""}`} aria-live="polite">
        <p className="tc-k">The conch has spoken</p>
        <p className="tc-fate-text">{fate ?? "Ask your question out loud. Then spin."}</p>
      </div>
    </div>
  );
}

function hash(s: string) {
  let h = 2166136261;
  for (const c of s.trim().toLowerCase()) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function AlterEgo() {
  const [name, setName] = useState("");
  const clean = name.trim();
  const h = hash(clean);
  const isTanya = /^tanya\b/i.test(clean);
  const ego = isTanya
    ? { title: "Her Royal Highness, Queen of the Sandbar", bio: "Sovereign of Grace Bay, patron saint of the rum punch, and the reason sixteen people learned to snorkel. All rise." }
    : {
        title: `${EGO_FIRST[h % EGO_FIRST.length]} ${EGO_MID[(h >>> 4) % EGO_MID.length]} ${EGO_PLACE[(h >>> 9) % EGO_PLACE.length]}`,
        bio: EGO_BIO[(h >>> 14) % EGO_BIO.length],
      };
  return (
    <div className="tc-ego">
      <label className="tc-field">
        <span className="tb-label">Your first name</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Lina" maxLength={30} autoComplete="off" />
      </label>
      <div className={`tc-ego-card${clean ? " is-shown" : ""}`} aria-live="polite">
        <p className="tc-k">{clean ? `${clean} is actually…` : "Waiting for a name"}</p>
        <p className="tc-ego-name">{clean ? ego.title : "…"}</p>
        {clean && <p className="tc-body">{ego.bio}</p>}
      </div>
    </div>
  );
}

function VillaCourt() {
  const { flash } = useTc();
  const [who, setWho] = useState("");
  const [crimes, setCrimes] = useState<string[]>([]);
  const [ruling, setRuling] = useState<{ text: string; no: string } | null>(null);
  const toggle = (c: string) => setCrimes((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  const rule = () => {
    if (!who.trim() || !crimes.length) {
      flash("The court needs a name and at least one crime.");
      return;
    }
    setRuling({ text: pick(RULINGS), no: `TCI-${String(Math.floor(1000 + Math.random() * 9000))}` });
  };
  const notice = ruling
    ? `🏛 VILLA COURT OF PROVIDENCIALES · Case ${ruling.no}\nThe accused: ${who.trim()}\nCharges: ${crimes.join("; ")}.\nRuling: ${ruling.text}\nNo appeals. The bride has spoken.`
    : "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(notice);
      flash("Copied. Paste it in the group chat.");
    } catch {
      flash("Couldn't copy. Screenshot it instead.");
    }
  };
  return (
    <div className="tc-court">
      <div className="tc-court-form">
        <label className="tc-field">
          <span className="tb-label">The accused</span>
          <input type="text" value={who} onChange={(e) => setWho(e.target.value)} placeholder="Name names" maxLength={40} autoComplete="off" />
        </label>
        <fieldset className="tc-crimes">
          <legend className="tb-label">The charges</legend>
          {OFFENCES.map((o) => (
            <label key={o} className={crimes.includes(o) ? "is-on" : undefined}>
              <input type="checkbox" checked={crimes.includes(o)} onChange={() => toggle(o)} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="btn btn-dark tb-big-btn" onClick={rule}>
          Bang the gavel
        </button>
      </div>
      <div className={`tc-notice${ruling ? " is-shown" : ""}`} aria-live="polite">
        {ruling ? (
          <>
            <p className="tc-notice-seal" aria-hidden>
              ⚖
            </p>
            <p className="tc-k">Official notice · Case {ruling.no}</p>
            <p className="tc-notice-who">In the matter of {who.trim()}</p>
            <ul>
              {crimes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="tc-notice-ruling">{ruling.text}</p>
            <p className="tc-notice-foot">No appeals. The bride has spoken.</p>
            <button type="button" className="btn tc-ghost" onClick={copy}>
              Copy for the group chat
            </button>
          </>
        ) : (
          <p className="tc-notice-empty">Rulings appear here. The court is in session.</p>
        )}
      </div>
    </div>
  );
}

function Roulette() {
  const [reels, setReels] = useState<[string, string, string] | null>(null);
  const [rolling, setRolling] = useState(false);
  const pull = () => {
    if (rolling) return;
    setRolling(true);
    let n = 0;
    const t = window.setInterval(() => {
      setReels([pick(DARES), `with a ${pick(DRINKS)} in hand`, pick(CONSEQUENCES)]);
      n += 1;
      if (n > 12) {
        window.clearInterval(t);
        setRolling(false);
      }
    }, 90);
  };
  return (
    <div className="tc-slot">
      <div className="tc-slot-reels" aria-live="polite">
        {(reels ?? ["Your dare", "your drink", "or else"]).map((r, i) => (
          <p key={i} className={`tc-reel${rolling ? " is-rolling" : ""}`} style={{ "--i": i } as CSSProperties}>
            {r}
          </p>
        ))}
      </div>
      <button type="button" className="tc-lever" onClick={pull} disabled={rolling} aria-label="Pull the lever">
        <span className="tc-lever-knob" aria-hidden />
        <span>{rolling ? "Rolling…" : "Pull"}</span>
      </button>
    </div>
  );
}

/** An iguana peeks up from the bottom corner. Tap it five times. */
function IguanaPeek() {
  const { flash, confetti } = useTc();
  const [taps, setTaps] = useState(0);
  const tap = () => {
    const n = taps + 1;
    setTaps(n);
    if (n === 5) {
      confetti(["🦎", "🌺", "🕶"]);
      flash("🦎 The iguana has blessed this bachelorette.");
    } else {
      flash(`🦎 ${IGUANA_LINES[(n - 1) % IGUANA_LINES.length]}`);
    }
  };
  return (
    <button type="button" className={`tc-iguana${taps >= 5 ? " is-blessed" : ""}`} onClick={tap} aria-label="Tap the iguana">
      <Iguana />
    </button>
  );
}
