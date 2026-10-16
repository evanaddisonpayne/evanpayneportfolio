"use client";

import { useEffect, useMemo, useState } from "react";
import { PEOPLE, type Person } from "@/lib/christmas2026";
import { load, save } from "./util";

/* ==========================================================================
   1. The Snow Globe of Fate (replaces the Windmill of Fate)
   ========================================================================== */

const FATES = [
  "Prosper picks tonight's movie.",
  "Addie chooses everyone's cocoa toppings.",
  "Grown-ups do the dishes. Kids are the inspectors.",
  "Santa hats at dinner. Everyone. No exceptions.",
  "Hot tub order: youngest to oldest.",
  "Debbie picks the Christmas music for the car.",
  "Brad gets the front seat. Forever.",
  "Evan may not mention the itinerary for one hour.",
  "Group photo in front of the next Christmas tree you see.",
  "Snowball truce until dessert.",
  "Brannen and Whitney get the first hot showers.",
  "Whoever spots the first horse buys the cocoa.",
  "Everyone shares their favorite Christmas memory at dinner.",
  "Loser of the next card game makes breakfast.",
];

export function SnowGlobe() {
  const [shaking, setShaking] = useState(false);
  const [fate, setFate] = useState<string | null>(null);
  const flakes = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({ x: 70 + ((i * 37) % 160), y: 60 + ((i * 53) % 150), r: 2 + (i % 3), d: (i % 7) * 0.12 })),
    [],
  );

  function shake() {
    if (shaking) return;
    setFate(null);
    setShaking(true);
    const pick = FATES[Math.floor(Math.random() * FATES.length)];
    window.setTimeout(() => {
      setFate(pick);
      setShaking(false);
    }, 2400);
  }

  return (
    <div className="xm-globe-wrap">
      <button className={`xm-globe${shaking ? " is-shaking" : ""}`} onClick={shake} aria-label="Shake the Snow Globe of Fate" disabled={shaking}>
        <svg viewBox="0 0 300 340" aria-hidden>
          <defs>
            <clipPath id="xm-globe-clip">
              <circle cx="150" cy="140" r="118" />
            </clipPath>
          </defs>
          <circle cx="150" cy="140" r="118" className="xm-globe-glass" />
          <g clipPath="url(#xm-globe-clip)">
            <path d="M32 200 Q90 170 150 188 T268 196 L268 270 L32 270 Z" className="xm-globe-snow" />
            {/* a tiny mountain town */}
            <path d="M60 196 L110 120 L140 160 L170 110 L230 196 Z" className="xm-globe-mtn" />
            <path d="M98 138 L110 120 L122 138 L114 136 L110 142 L105 136 Z M158 128 L170 110 L182 128 L174 126 L170 132 L165 126 Z" className="xm-globe-cap" />
            <rect x="120" y="170" width="44" height="28" className="xm-globe-house" />
            <path d="M114 172 L142 150 L170 172 Z" className="xm-globe-roof" />
            <rect x="136" y="182" width="12" height="16" className="xm-globe-door" />
            <path d="M200 198 L210 168 L220 198 Z M196 186 L210 160 L224 186 Z" className="xm-globe-tree" />
            <g className="xm-globe-flakes">
              {flakes.map((f, i) => (
                <circle key={i} cx={f.x} cy={f.y} r={f.r} style={{ animationDelay: `${f.d}s` }} />
              ))}
            </g>
          </g>
          <circle cx="150" cy="140" r="118" className="xm-globe-rim" />
          <path d="M108 66 Q130 40 170 44" className="xm-globe-shine" />
          <path d="M60 248 L240 248 L262 318 L38 318 Z" className="xm-globe-base" />
          <text x="150" y="292" textAnchor="middle" className="xm-globe-label">
            STEAMBOAT
          </text>
        </svg>
        <span className="xm-globe-cta">{shaking ? "Shaking…" : fate ? "Shake again" : "Shake it"}</span>
      </button>
      <div className={`xm-fate${fate ? " is-shown" : ""}`} aria-live="polite">
        <p className="xm-fate-label">The snow globe has spoken</p>
        <p className="xm-fate-text">{fate ?? "Settle any argument. The snow globe is never wrong."}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Your Steamboat cowboy names (Steamboat is a cattle town at heart)
   ========================================================================== */

const COWBOY: { who: Person; name: string; bio: string }[] = [
  { who: "Debbie", name: "Dusty Deb", bio: "Runs the cocoa bar with an iron ladle. Nobody leaves without marshmallows." },
  { who: "Brad", name: "Big Sky Brad", bio: "Sleigh captain. Sits up front, tells the horses where we're going, and they listen." },
  { who: "Brannen", name: "Two-Tube Brannen", bio: "Has never once taken the carpet lift without racing someone to the top." },
  { who: "Whitney", name: "Whit Wildfire", bio: "Fastest draw in the West, mostly with a phone camera. Every photo is the good one." },
  { who: "Addie", name: "Addie Snowdrift", bio: "Rides the tubing track like it owes her money. Knows every word to every Christmas song." },
  { who: "Prosper", name: "The Powder Kid", bio: "Youngest wrangler on the trail and already the bravest one on the hill." },
  { who: "Evan", name: "Trail Boss Evan", bio: "Drew the map. Booked the sleigh. Will remind you about the itinerary. Lovingly." },
];

export function CowboyNames({ me }: { me: Person | null }) {
  const [shown, setShown] = useState<Record<string, boolean>>({});
  return (
    <ul className="xm-egos">
      {COWBOY.map((e) => (
        <li key={e.who} className={me === e.who ? "is-me" : undefined}>
          <button onClick={() => setShown((s) => ({ ...s, [e.who]: !s[e.who] }))} aria-expanded={!!shown[e.who]}>
            <span className="xm-ego-real">{e.who} is actually…</span>
            <span className={`xm-ego-name${shown[e.who] ? " is-shown" : ""}`}>{shown[e.who] ? e.name : "tap to reveal"}</span>
            {shown[e.who] && <span className="xm-ego-bio">{e.bio}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ==========================================================================
   3. Steamboat bingo: things to spot on the trip
   ========================================================================== */

const SPOTS = [
  "Someone in a cowboy hat",
  "A dog in a coat",
  "A snowplow",
  "An icicle longer than your arm",
  "Santa",
  "A horse",
  "Steam rising off a hot spring",
  "A cocoa mustache",
  "A gondola cabin",
  "A deer or an elk",
  "Skis on a car roof",
  "An ugly Christmas sweater",
  "A wreath on a door",
  "A light-up reindeer",
  "Someone asks “are we there yet?”",
  "A frozen stretch of river",
  "All seven in one photo",
  "A snowman",
  "Fresh snow falling",
  "A fireplace",
  "Someone slips (and is fine)",
  "A cowboy boot shop",
  "A sleigh bell",
  "Someone says “Champagne Powder”",
];
const BINGO_KEY = "xm26-bingo";
const LINES = [
  ...[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => r * 5 + c)),
  ...[0, 1, 2, 3, 4].map((c) => [0, 1, 2, 3, 4].map((r) => r * 5 + c)),
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export function Bingo() {
  const cells = useMemo(() => {
    const c = [...SPOTS];
    c.splice(12, 0, "FREE: Snow");
    return c;
  }, []);
  const [hits, setHits] = useState<Record<number, boolean>>({ 12: true });
  useEffect(() => setHits({ ...load<Record<number, boolean>>(BINGO_KEY, {}), 12: true }), []);
  const toggle = (i: number) => {
    if (i === 12) return;
    setHits((h) => {
      const next = { ...h, [i]: !h[i] };
      save(BINGO_KEY, next);
      return next;
    });
  };
  const won = LINES.filter((l) => l.every((i) => hits[i]));
  const onLine = new Set(won.flat());
  const count = Object.values(hits).filter(Boolean).length - 1;

  return (
    <div className="xm-bingo-wrap">
      <div className="xm-bingo">
        {cells.map((c, i) => (
          <button
            key={c}
            className={`xm-bingo-cell${hits[i] ? " is-hit" : ""}${i === 12 ? " is-free" : ""}${onLine.has(i) ? " is-line" : ""}`}
            aria-pressed={!!hits[i]}
            onClick={() => toggle(i)}
          >
            <span>{c}</span>
          </button>
        ))}
        {won.length > 0 && (
          <div className="xm-bingo-stamp" aria-live="polite">
            <span>Bingo!</span>
            <small>
              {won.length} line{won.length > 1 ? "s" : ""} · winner picks the movie
            </small>
          </div>
        )}
      </div>
      <div className="xm-bingo-foot">
        <p className="xm-hint">
          {count} of 24 spotted. Saves on this device. Kids keep score.
        </p>
        <button
          className="xm-chip"
          onClick={() => {
            setHits({ 12: true });
            save(BINGO_KEY, {});
          }}
        >
          New card
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. The Cocoa Bar Builder (replaces the Bad Decisions Generator)
   ========================================================================== */

const BASES = ["classic hot cocoa", "peppermint hot chocolate", "white hot chocolate", "cinnamon-spiced cocoa", "salted caramel cocoa", "hot apple cider"];
const TOPPINGS = ["a mountain of mini marshmallows", "whipped cream and sprinkles", "a crushed candy cane", "one giant toasted marshmallow", "chocolate shavings", "a cinnamon stick stirrer"];
const CHALLENGES = [
  "Make a toast to the person on your left.",
  "Drink it with your pinky out. Fancy cowboy style.",
  "Tell everyone your favorite Christmas memory.",
  "Do your best sleigh-bell impression.",
  "Name three things you're thankful for this year.",
  "Hum a carol. Everyone else guesses which one.",
  "Pick someone to make your next cup.",
  "Nothing. Just enjoy it. You've earned it.",
];

export function CocoaBuilder({ me }: { me: Person | null }) {
  const [who, setWho] = useState<Person>(me ?? "Prosper");
  const [roll, setRoll] = useState<{ base: string; top: string; dare: string } | null>(null);
  const [rolling, setRolling] = useState(false);
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  useEffect(() => {
    if (me) setWho(me);
  }, [me]);

  function go() {
    if (rolling) return;
    setRolling(true);
    let n = 0;
    const t = window.setInterval(() => {
      setRoll({ base: pick(BASES), top: pick(TOPPINGS), dare: pick(CHALLENGES) });
      if (++n >= 9) {
        window.clearInterval(t);
        setRolling(false);
      }
    }, 90);
  }

  return (
    <div className="xm-bad">
      <div className="xm-who-mini" role="group" aria-label="Whose cup">
        {PEOPLE.map((p) => (
          <button key={p} className={who === p ? "is-on" : undefined} onClick={() => setWho(p)} aria-pressed={who === p}>
            {p}
          </button>
        ))}
      </div>
      <button className="xm-bad-roll" onClick={go} disabled={rolling}>
        {rolling ? "Stirring…" : roll ? `Another cup for ${who}` : `Make ${who}'s cup`}
      </button>
      <div className={`xm-bad-card${roll ? " is-shown" : ""}`} aria-live="polite">
        {roll ? (
          <>
            <p>
              <span>The cup</span>
              {roll.base}
            </p>
            <p>
              <span>On top</span>
              {roll.top}
            </p>
            <p>
              <span>The challenge</span>
              {roll.dare}
            </p>
          </>
        ) : (
          <p className="xm-bad-empty">Three dice. One cup, one topping, one challenge. Best served at the house after the gondola.</p>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   5. Let it snow: type "snow" anywhere, or press the button
   ========================================================================== */

export function LetItSnow({ sweater = false, trigger = 0 }: { sweater?: boolean; trigger?: number }) {
  const [drops, setDrops] = useState<{ id: number; left: number; delay: number; dur: number; emoji: string; size: number }[]>([]);

  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed === "snow") fall();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sweater]);

  useEffect(() => {
    if (trigger > 0) fall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  function fall() {
    const set = sweater ? ["🧶", "❄️", "🎄", "🧦", "❄️", "⛄"] : ["❄️", "❄️", "⛄", "🎄", "❄️", "🦌"];
    const base = Date.now();
    setDrops(
      Array.from({ length: 48 }, (_, i) => ({
        id: base + i,
        left: Math.random() * 100,
        delay: Math.random() * 1.8,
        dur: 3.2 + Math.random() * 2.6,
        emoji: set[i % set.length],
        size: 18 + Math.random() * 24,
      })),
    );
    window.setTimeout(() => setDrops([]), 7500);
  }

  if (!drops.length) return null;
  return (
    <div className="xm-rain-fx" aria-hidden>
      {drops.map((d) => (
        <span key={d.id} style={{ left: `${d.left}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, fontSize: `${d.size}px` }}>
          {d.emoji}
        </span>
      ))}
    </div>
  );
}

/* ==========================================================================
   6. Do not press: a sleigh flies across the screen, with optional bells.
   The tune is "Jingle Bells" (1857, public domain), played with the Web Audio API.
   ========================================================================== */

const JINGLE: [number, number][] = [
  [659, 1], [659, 1], [659, 2],
  [659, 1], [659, 1], [659, 2],
  [659, 1], [784, 1], [523, 1.5], [587, 0.5], [659, 4],
];

export function SleighRide({ trigger = 0 }: { trigger?: number }) {
  const [run, setRun] = useState(0);
  const [bells, setBells] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const KONAMI = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-10);
      if (seq.join(",") === KONAMI) setRun((r) => r + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (trigger > 0) setRun((r) => r + 1);
  }, [trigger]);

  useEffect(() => {
    if (!run) return;
    setBells(false);
    const t = window.setTimeout(() => setRun(0), reduced ? 4000 : 7000);
    return () => window.clearTimeout(t);
  }, [run, reduced]);

  function ring() {
    setBells(true);
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      let t = ctx.currentTime + 0.05;
      const beat = 0.22;
      for (const [f, len] of JINGLE) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(f, t);
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + beat * len * 0.95);
        o.start(t);
        o.stop(t + beat * len);
        t += beat * len;
      }
      window.setTimeout(() => ctx.close().catch(() => {}), (t - ctx.currentTime + 0.5) * 1000);
    } catch {
      /* no audio, fine */
    }
  }

  if (!run) return null;
  return (
    <div className={`xm-sleigh-fx${reduced ? " is-calm" : ""}`} role="dialog" aria-label="Santa's sleigh">
      <div className="xm-sleigh" key={run} aria-hidden>
        <span>🦌</span>
        <span>🦌</span>
        <span>🦌</span>
        <span className="xm-sleigh-santa">🛷🎅</span>
      </div>
      <div className="xm-sleigh-bar">
        <button onClick={ring} disabled={bells}>
          {bells ? "🔔 Jingling" : "Ring the bells"}
        </button>
        <button onClick={() => setRun(0)}>Close</button>
      </div>
    </div>
  );
}
