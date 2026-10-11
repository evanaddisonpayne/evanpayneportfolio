"use client";

import { useEffect, useMemo, useState } from "react";
import type { Day, Person, Stop } from "@/lib/amsterdam";

/* ==========================================================================
   1. Hand-drawn trip map
   Real coordinates, projected onto a 1000-wide SVG. Water, canals and the
   Amstel are stylised on purpose ("not to scale, barely to anything").
   ========================================================================== */

type LatLng = [number, number];
const B = { n: 52.4045, s: 52.3515, w: 4.851, e: 4.933 };
const COS = Math.cos((52.38 * Math.PI) / 180);
const W = 1000;
const H = Math.round((W * (B.n - B.s)) / ((B.e - B.w) * COS));
const proj = ([lat, lng]: LatLng): [number, number] => [((lng - B.w) / (B.e - B.w)) * W, ((B.n - lat) / (B.n - B.s)) * H];

// Approximate locations, keyed by stop title. Good enough for a doodle.
const TOWER: LatLng = [52.3841, 4.902];
const CENTRAAL: LatLng = [52.3786, 4.9003];
const BOEREJONGENS: LatLng = [52.3637, 4.8986];
const REGULIERS: LatLng = [52.3662, 4.8932];
const GEO: Record<string, LatLng> = {
  "Train → Centraal → free ferry to Noord": CENTRAAL,
  "Lunch at The Butcher Social Club": TOWER,
  "Nap, or a river walk to EYE": [52.3845, 4.9006],
  "Dinner at Hotel de Goudfazant": [52.3868, 4.9232],
  "One nightcap at the hotel, then bed": TOWER,
  "Ferry + train to Zaanse Schans": CENTRAAL,
  "Boerejongens Centrum": BOEREJONGENS,
  "Dinner at Café Restaurant Van Kerkwijk": [52.3712, 4.8951],
  "Brown-café crawl": [52.3687, 4.8897],
  "Slow brunch in De Pijp": [52.3556, 4.8936],
  Rijksmuseum: [52.36, 4.8852],
  "Or: Brouwerij 't IJ": [52.3667, 4.9264],
  "Sunset at A'DAM Lookout": TOWER,
  "Light Festival canal cruise": [52.3776, 4.9022],
  "Thanksgiving dinner": [52.3557, 4.8597],
  "Or keep going: Reguliersdwarsstraat": REGULIERS,
  "Free daytime canal cruise (optional)": [52.3779, 4.8985],
  "NDSM wharf + lunch at Pllek": [52.4006, 4.8915],
  "Rest at the hotel": TOWER,
  "Stock up for the boat": BOEREJONGENS,
  "The Bulldog Boat": [52.3779, 4.8996],
  "Drinks toward Rembrandtplein": REGULIERS,
  Shelter: TOWER,
  "Anne Frank House": [52.3752, 4.884],
  "Noordermarkt + Winkel 43": [52.3789, 4.8855],
  "Wander the Nine Streets": [52.3696, 4.8852],
  "Or: Our Lord in the Attic": [52.3754, 4.8999],
  "Wynand Fockink": [52.373, 4.8952],
  "In 't Aepjen": [52.3766, 4.9012],
  "Red Light District walk": [52.3727, 4.8985],
  "Farewell dinner at De Belhamel": [52.3797, 4.8889],
  "Queer-bar crawl": [52.374, 4.9006],
  "Leave Sir Adam": TOWER,
  "Check out, late brunch": TOWER,
  "Last beers at Oedipus": [52.3866, 4.9195],
};
// Stops that are off the edge of the doodle: shown as an arrow at the border.
const OFFMAP: Record<string, { label: string; at: [number, number]; arrow: string }> = {
  "Zak & Tyler land": { label: "Schiphol · 15 min by train", at: [40, H - 40], arrow: "↙" },
  "Evan & Jarrod land": { label: "Schiphol · 15 min by train", at: [40, H - 40], arrow: "↙" },
  "Collect bags → Schiphol": { label: "Schiphol · 15 min by train", at: [40, H - 40], arrow: "↙" },
  "Zaanse Schans": { label: "Windmills · 17 min by train", at: [40, 40], arrow: "↖" },
  "Pancakes in the village": { label: "Windmills · 17 min by train", at: [40, 40], arrow: "↖" },
  "Or: Lotus Biscoff oliebol run": { label: "Biscoff oliebol · 40 min", at: [40, H * 0.55], arrow: "←" },
};

const pts = (list: LatLng[]) => list.map((p) => proj(p));
/** Smooth path through points (Catmull-Rom → cubic Bézier). */
function smooth(p: [number, number][], closed = false) {
  const n = p.length;
  const at = (i: number) => (closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return closed ? d + " Z" : d;
}

const WATER = smooth(
  pts([
    [52.4045, 4.851],
    [52.4002, 4.866],
    [52.3985, 4.885],
    [52.3968, 4.894],
    [52.385, 4.8975],
    [52.3829, 4.904],
    [52.3818, 4.92],
    [52.3815, 4.933],
    [52.3786, 4.933],
    [52.3792, 4.92],
    [52.3803, 4.905],
    [52.3809, 4.8965],
    [52.388, 4.889],
    [52.3925, 4.875],
    [52.394, 4.858],
    [52.3955, 4.851],
  ]),
  true,
);
const AMSTEL = smooth(
  pts([
    [52.3515, 4.9105],
    [52.358, 4.9065],
    [52.363, 4.9035],
    [52.3656, 4.9003],
    [52.3672, 4.8955],
    [52.3712, 4.8928],
  ]),
);
// Canal ring: half-ellipses around the old centre, from Brouwersgracht round to the Amstel.
const C: LatLng = [52.3791, 4.8962];
function ring(rx: number, ry: number) {
  const out: LatLng[] = [];
  for (let t = 148; t <= 334; t += 6) {
    const r = (t * Math.PI) / 180;
    out.push([C[0] + ry * Math.sin(r), C[1] + (rx * Math.cos(r)) / COS]);
  }
  return smooth(pts(out));
}
const RINGS = [
  { id: "singel", d: ring(0.004, 0.0103), name: "Singel" },
  { id: "heren", d: ring(0.0051, 0.0124), name: "Herengracht" },
  { id: "keizers", d: ring(0.0062, 0.0144), name: "Keizersgracht" },
  { id: "prinsen", d: ring(0.0073, 0.0164), name: "Prinsengracht" },
];

const LABELS: { at: LatLng; text: string; cls?: string }[] = [
  { at: [52.3905, 4.912], text: "NOORD", cls: "hood" },
  { at: [52.3755, 4.8805], text: "JORDAAN", cls: "hood" },
  { at: [52.3535, 4.8965], text: "DE PIJP", cls: "hood" },
  { at: [52.3635, 4.922], text: "OOST", cls: "hood" },
  { at: [52.3712, 4.9035], text: "CENTRUM", cls: "hood" },
  { at: [52.3912, 4.873], text: "the IJ", cls: "water" },
  { at: [52.3596, 4.911], text: "Amstel", cls: "water" },
];
const QUIPS: { at: LatLng; text: string; rot?: number }[] = [
  { at: [52.3868, 4.8995], text: "home, club & swing — all one building", rot: -4 },
  { at: [52.3712, 4.9118], text: "no photos of the windows. seriously.", rot: 3 },
  { at: [52.3578, 4.8735], text: "Zak's happy place", rot: -3 },
  { at: [52.3928, 4.8925], text: "Jarrod: on a boat, probably", rot: 4 },
  { at: [52.3612, 4.8905], text: "↑ the ring canals. Bikes WILL hit you.", rot: -2 },
];

type Pin = { n: number; x: number; y: number; d: Day; s: Stop };

export function TripMap({
  days,
  dayId,
  me,
  onDay,
  onPick,
}: {
  days: Day[];
  dayId: string;
  me: Person | null;
  onDay: (id: string) => void;
  onPick: (d: Day, s: Stop) => void;
}) {
  const [all, setAll] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const day = days.find((d) => d.id === dayId) ?? days[0];
  const shown = all ? days.filter((d) => d.id !== "mon") : [day];

  // Place pins, nudging any that land on top of each other (the hotel gets crowded).
  const { pins, off } = useMemo(() => {
    const placed: Pin[] = [];
    const offList: { key: string; label: string; at: [number, number]; arrow: string; items: { d: Day; s: Stop; n: number }[] }[] = [];
    for (const d of shown) {
      let n = 0;
      for (const s of d.stops) {
        n += 1;
        const g = GEO[s.title];
        if (g) {
          let [x, y] = proj(g);
          let k = 0;
          while (placed.some((p) => Math.hypot(p.x - x, p.y - y) < (all ? 17 : 34)) && k < 24) {
            const a = (k * 137.5 * Math.PI) / 180;
            const r = (all ? 14 : 30) * (1 + Math.floor(k / 6) * 0.6);
            [x, y] = [proj(g)[0] + r * Math.cos(a), proj(g)[1] + r * Math.sin(a)];
            k += 1;
          }
          placed.push({ n, x, y, d, s });
        } else if (OFFMAP[s.title]) {
          const o = OFFMAP[s.title];
          const key = o.label;
          const hit = offList.find((x) => x.key === key);
          if (hit) hit.items.push({ d, s, n });
          else offList.push({ key, ...o, items: [{ d, s, n }] });
        }
      }
    }
    return { pins: placed, off: offList };
  }, [shown, all]);

  const legend = useMemo(
    () =>
      day.stops.map((s, i) => ({
        s,
        n: i + 1,
        where: GEO[s.title] ? "pin" : OFFMAP[s.title] ? OFFMAP[s.title].arrow + " off the map" : "—",
      })),
    [day],
  );

  return (
    <div className="ams-map-wrap">
      <div className="ams-map-controls" role="group" aria-label="Map day">
        {days.map((d) => (
          <button
            key={d.id}
            className="ams-chip"
            aria-pressed={!all && d.id === day.id}
            onClick={() => {
              setAll(false);
              onDay(d.id);
            }}
          >
            {d.dow} {d.num}
          </button>
        ))}
        <button className="ams-chip ams-chip-star" aria-pressed={all} onClick={() => setAll((v) => !v)}>
          Whole trip
        </button>
      </div>

      <div className="ams-map-paper">
        <div className="ams-map-scroll">
        <svg viewBox={`0 0 ${W} ${H}`} className="ams-map" role="img" aria-label={`Hand-drawn map of ${all ? "the whole trip" : `${day.dow} ${day.num}`}`}>
          <defs>
            <pattern id="ams-waves" width="28" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 9 q7 -6 14 0 t14 0" className="ams-wave" />
            </pattern>
            <path id="ams-bike-route" d={RINGS[1].d} />
            <path id="ams-ferry-route" d={`M${proj([52.3802, 4.9007]).join(",")} L${proj([52.3831, 4.9013]).join(",")}`} />
          </defs>

          <rect x="0" y="0" width={W} height={H} className="ams-land" />
          <path d={WATER} className="ams-water" />
          <path d={WATER} className="ams-water-hatch" />
          <path d={AMSTEL} className="ams-river" />
          {RINGS.map((r) => (
            <path key={r.id} d={r.d} className="ams-canal" />
          ))}

          {LABELS.map((l) => {
            const [x, y] = proj(l.at);
            return (
              <text key={l.text} x={x} y={y} className={`ams-map-label ams-map-${l.cls}`} textAnchor="middle">
                {l.text}
              </text>
            );
          })}
          {QUIPS.map((q) => {
            const [x, y] = proj(q.at);
            return (
              <text key={q.text} x={x} y={y} className="ams-map-quip" textAnchor="middle" transform={`rotate(${q.rot ?? 0} ${x} ${y})`}>
                {q.text}
              </text>
            );
          })}

          {/* The free ferry, forever shuttling. */}
          <g className="ams-ferry" aria-hidden>
            <path d="M-14 -4 h28 l-5 8 h-18 z" />
            <rect x="-6" y="-11" width="12" height="7" />
            <animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;1;1;0;0" keyTimes="0;0.4;0.5;0.9;1" calcMode="linear">
              <mpath href="#ams-ferry-route" />
            </animateMotion>
          </g>
          {/* A cyclist who will not stop for you. */}
          <g className="ams-bike" aria-hidden>
            <circle cx="-7" cy="0" r="5" />
            <circle cx="7" cy="0" r="5" />
            <path d="M-7 0 L-1 -8 L7 0 M-1 -8 L3 -8 M-1 -8 L-3 -12" />
            <animateMotion dur="26s" repeatCount="indefinite" rotate="auto">
              <mpath href="#ams-bike-route" />
            </animateMotion>
          </g>

          {/* Compass, of sorts */}
          <g transform={`translate(${W - 70} ${H - 80})`} className="ams-compass" aria-hidden>
            <circle r="34" />
            <path d="M0 -26 L7 0 L0 26 L-7 0 Z" />
            <text y="-40" textAnchor="middle">N-ish</text>
          </g>

          {off.map((o) => (
            <g key={o.key} className="ams-off" transform={`translate(${o.at[0]} ${o.at[1]})`}>
              <text className="ams-off-arrow" x="0" y="0">
                {o.arrow}
              </text>
              <text className="ams-off-label" x={o.arrow === "←" ? 38 : 34} y={o.arrow === "↖" ? 26 : -4}>
                {o.label}
              </text>
              {!all && (
                <text className="ams-off-label ams-off-nums" x={o.arrow === "←" ? 38 : 34} y={o.arrow === "↖" ? 48 : 18}>
                  {o.items.map((i) => `#${i.n}`).join(" · ")}
                </text>
              )}
            </g>
          ))}

          {pins.map((p) => {
            const key = `${p.d.id}-${p.s.title}`;
            const notMe = !!me && !!p.s.who && !p.s.who.includes(me);
            const mine = !!me && !!p.s.picks?.includes(me);
            const active = hover === key;
            return (
              <g
                key={key}
                className={`ams-pin${all ? " is-small" : ""}${notMe ? " is-not-me" : ""}${mine ? " is-mine" : ""}${p.s.must ? " is-must" : ""}${active ? " is-active" : ""}`}
                transform={`translate(${p.x} ${p.y})`}
                tabIndex={0}
                role="button"
                aria-label={`${p.d.dow} ${p.s.time}: ${p.s.title}`}
                onMouseEnter={() => setHover(key)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(key)}
                onBlur={() => setHover(null)}
                onClick={() => onPick(p.d, p.s)}
                onKeyDown={(e: { key: string; preventDefault: () => void }) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPick(p.d, p.s);
                  }
                }}
              >
                <circle r={all ? 9 : 17} />
                {!all && (
                  <text textAnchor="middle" dy="6">
                    {p.n}
                  </text>
                )}
                {active && (
                  <g className="ams-pin-tip">
                    <rect x="22" y="-18" width={Math.min(420, 22 + (p.s.title.length + p.s.time.length + 6) * 9.2)} height="36" rx="0" />
                    <text x="34" y="6">
                      {all ? `${p.d.dow} · ` : ""}
                      {p.s.time} · {p.s.title}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {!all && day.id === "mon" && (
            <g className="ams-iceland" transform={`translate(${W / 2} ${H / 2})`}>
              <rect x="-300" y="-90" width="600" height="180" />
              <text y="-18" textAnchor="middle" className="ams-iceland-big">
                Wrong country.
              </text>
              <text y="28" textAnchor="middle">
                Monday is in Iceland, about 2,000 km thataway ↑
              </text>
              <text y="62" textAnchor="middle">
                Bring a swimsuit.
              </text>
            </g>
          )}
        </svg>
        </div>
        <p className="ams-map-small">Not to scale. Barely to anything. Tap a pin to jump to it in the plan.</p>
      </div>

      {!all && (
        <ol className="ams-map-legend">
          {legend.map(({ s, n, where }) => (
            <li key={s.title}>
              <button onClick={() => onPick(day, s)}>
                <span className="ams-legend-n">{n}</span>
                <span className="ams-legend-t">{s.time}</span>
                <span className="ams-legend-title">{s.title}</span>
                {where !== "pin" && <span className="ams-legend-where">{where}</span>}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ==========================================================================
   2. The Red Light windows (it's just us)
   ========================================================================== */

const WINDOWS: { who: Person; title: string; lines: string[] }[] = [
  {
    who: "Evan",
    title: "The Planner",
    lines: ["Third visit. Will mention it.", "Specialty: moody brown cafés", "Hours: wherever the party is", "Rate: free (he built this website)"],
  },
  {
    who: "Jarrod",
    title: "The Captain",
    lines: ["Specialty: boats. Beer on boats.", "Bring your own pre-roll", "Hours: very, very late", "Rate: cheap, with the odd splurge"],
  },
  {
    who: "Tyler",
    title: "The Historian",
    lines: ["Specialty: museums, history, snacks", "Hours: closes ~11 pm (“I'm geriatric”)", "Will absolutely do Anne Frank", "Rate: ~$200/day, flexible"],
  },
  {
    who: "Zak",
    title: "The Critic",
    lines: ["Specialty: the Rijksmuseum, again", "Demands Thanksgiving cooked by Evan and a Dutch woman", "Hours: not scheduled all day, every day", "Rate: $200/day, max"],
  },
];

export function Windows({ me }: { me: Person | null }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="ams-windows">
      {WINDOWS.map((w, i) => {
        const isOpen = !!open[w.who];
        return (
          <div key={w.who} className={`ams-house ams-house-${i}${me === w.who ? " is-me" : ""}`}>
            <div className="ams-gable" aria-hidden />
            <button
              className={`ams-window${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              aria-label={`${isOpen ? "Close" : "Open"} ${w.who}'s window`}
              onClick={() => setOpen((o) => ({ ...o, [w.who]: !o[w.who] }))}
            >
              <span className="ams-window-glow" aria-hidden />
              <span className="ams-window-card">
                <span className="ams-window-name">{w.who}</span>
                <span className="ams-window-title">{w.title}</span>
                <span className="ams-window-lines">
                  {w.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </span>
              </span>
              <span className="ams-curtain ams-curtain-l" aria-hidden />
              <span className="ams-curtain ams-curtain-r" aria-hidden />
              {!isOpen && <span className="ams-window-hint">Tap</span>}
            </button>
            <div className="ams-door" aria-hidden />
            <p className="ams-house-sign">{w.who}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   3. Trip bingo (saved on this device)
   ========================================================================== */

const SQUARES = [
  "Yelled at by a cyclist",
  "Zak calls it before midnight",
  "Tyler says “I'm geriatric”",
  "Jarrod is on a boat",
  "Evan: “last time I was here…”",
  "Someone orders bitterballen",
  "“Gezellig” said unironically",
  "Rain and sun in the same hour",
  "Lose someone in the Red Light District",
  "FEBO croquette after 1 am",
  "Someone overdoes the space cake",
  "Stroopwafel before 10 am",
  "Ferry selfie with the A'DAM Tower",
  "Someone dozes on the Bulldog Boat",
  "“It's not even that cold”",
  "Someone eats raw herring",
  "Prinsengracht, mispronounced",
  "Rides the Lookout swing",
  "Someone buys clogs",
  "A Dutch person is extremely direct with us",
  "Biscoff oliebol acquired",
  "Tips 20% out of habit",
  "Bike bell 3× in one minute",
  "Accidentally walks in a bike lane",
];
const FREE = "Survived the bike lanes";
const BINGO_KEY = "ams26-bingo";
const LINES = [
  ...[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => r * 5 + c)),
  ...[0, 1, 2, 3, 4].map((c) => [0, 1, 2, 3, 4].map((r) => r * 5 + c)),
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

function shuffled() {
  const a = [...SQUARES];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return [...a.slice(0, 12), FREE, ...a.slice(12)];
}

export function Bingo() {
  const [cells, setCells] = useState<string[]>([...SQUARES.slice(0, 12), FREE, ...SQUARES.slice(12)]);
  const [hit, setHit] = useState<boolean[]>(() => Array.from({ length: 25 }, (_, i) => i === 12));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(BINGO_KEY) || "null");
      if (saved && Array.isArray(saved.cells) && saved.cells.length === 25 && Array.isArray(saved.hit)) {
        setCells(saved.cells);
        setHit(saved.hit);
      } else {
        setCells(shuffled());
      }
    } catch {
      setCells(shuffled());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(BINGO_KEY, JSON.stringify({ cells, hit }));
    } catch {
      /* fine — the card just won't persist */
    }
  }, [cells, hit, ready]);

  const winning = LINES.filter((l) => l.every((i) => hit[i]));
  const winSet = new Set(winning.flat());
  const count = hit.filter(Boolean).length - 1;

  return (
    <div className="ams-bingo-wrap">
      <div className={`ams-bingo${winning.length ? " has-bingo" : ""}`} role="grid" aria-label="Trip bingo card">
        {cells.map((c, i) => (
          <button
            key={i}
            role="gridcell"
            className={`ams-bingo-cell${hit[i] ? " is-hit" : ""}${i === 12 ? " is-free" : ""}${winSet.has(i) ? " is-line" : ""}`}
            aria-pressed={hit[i]}
            disabled={i === 12}
            onClick={() => setHit((h) => h.map((v, k) => (k === i ? !v : v)))}
          >
            <span>{c}</span>
          </button>
        ))}
        {winning.length > 0 && (
          <div className="ams-bingo-stamp" aria-live="polite">
            <span>Bingo{winning.length > 1 ? ` ×${winning.length}` : ""}!</span>
            <small>Screenshot it for the group chat</small>
          </div>
        )}
      </div>
      <div className="ams-bingo-foot">
        <p className="ams-hint">
          {count} of 24 spotted. Your card is shuffled just for you and saves on this device.
        </p>
        <button
          className="ams-chip ams-chip-clear"
          onClick={() => {
            setCells(shuffled());
            setHit(Array.from({ length: 25 }, (_, i) => i === 12));
          }}
        >
          New card
        </button>
      </div>
    </div>
  );
}
