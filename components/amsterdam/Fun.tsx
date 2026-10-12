"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
const TOWER: LatLng = [52.3852, 4.9035]; // nudged north so its pins stay on dry land
const CENTRAAL: LatLng = [52.3786, 4.9003];
const BOEREJONGENS: LatLng = [52.3637, 4.8986];
const REGULIERS: LatLng = [52.3662, 4.8932];
const GEO: Record<string, LatLng> = {
  "Train → Centraal → free ferry to Noord": CENTRAAL,
  "Lunch at The Butcher Social Club": TOWER,
  "Nap, or a river walk to EYE": [52.3858, 4.8965],
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
  "Or: Lotus Biscoff oliebol run": { label: "Biscoff oliebol · 40 min", at: [40, H * 0.74], arrow: "←" },
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
    [52.3968, 4.8925],
    [52.3838, 4.8955],
    [52.3824, 4.904],
    [52.3816, 4.92],
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
  { at: [52.3688, 4.9035], text: "CENTRUM", cls: "hood" },
  { at: [52.3972, 4.872], text: "the IJ", cls: "water" },
  { at: [52.3596, 4.911], text: "Amstel", cls: "water" },
];
const QUIPS: { at: LatLng; text: string; rot?: number }[] = [
  { at: [52.3884, 4.9075], text: "↙ home, club & swing: all one building", rot: -4 },
  { at: [52.3748, 4.9142], text: "← no photos of the windows. seriously.", rot: 3 },
  { at: [52.3577, 4.8852], text: "↑ Zak's happy place", rot: -3 },
  { at: [52.3995, 4.8705], text: "Jarrod: on a boat, probably", rot: 4 },
  { at: [52.3612, 4.8905], text: "↑ the ring canals. Bikes WILL hit you.", rot: -2 },
];

type Pin = { n: number; x: number; y: number; d: Day; s: Stop };

export function TripMap({
  days,
  dayId,
  me,
  nasty = false,
  onDay,
  onPick,
}: {
  days: Day[];
  dayId: string;
  me: Person | null;
  nasty?: boolean;
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
        where: GEO[s.title] ? "pin" : OFFMAP[s.title] ? OFFMAP[s.title].arrow + " off the map" : "no fixed spot",
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
                {nasty ? (
                  <>
                    <circle r={all ? 12 : 22} className="ams-pin-hit" />
                    <text textAnchor="middle" dy={all ? 7 : 12} className="ams-pin-egg" style={{ fontSize: all ? 20 : 34 }}>
                      🍆
                    </text>
                    {!all && (
                      <g transform="translate(15 -15)">
                        <circle r="11" className="ams-pin-badge" />
                        <text textAnchor="middle" dy="5" className="ams-pin-badge-n">
                          {p.n}
                        </text>
                      </g>
                    )}
                  </>
                ) : (
                  <>
                    <circle r={all ? 9 : 17} />
                    {!all && (
                      <text textAnchor="middle" dy="6">
                        {p.n}
                      </text>
                    )}
                  </>
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
        <p className="ams-map-small">
          {nasty ? "Not to scale. Every pin is an eggplant now. You did this." : "Not to scale. Barely to anything. Tap a pin to jump to it in the plan."}
        </p>
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

const NASTY_WINDOWS: Record<Person, { title: string; lines: string[] }> = {
  Evan: {
    title: "The Ringleader",
    lines: ["Third visit. Will absolutely mention it.", "Specialty: losing you in a brown café at 1 am", "Turn-ons: a well-kept itinerary", "Rate: you owe him for this website"],
  },
  Jarrod: {
    title: "The Boatswain",
    lines: ["Specialty: getting baked on a boat", "Rolls for the whole group, no questions", "Hours: until the ferry gives up", "Rate: one local beer, paid up front"],
  },
  Tyler: {
    title: "The Early Bird",
    lines: ["Specialty: leaving at 11, judging you at breakfast", "Turn-ons: placards, audio guides", "Will cry at Anne Frank. Will deny it.", "Rate: a quiet room by midnight"],
  },
  Zak: {
    title: "The Heckler",
    lines: ["Specialty: heckling Evan's itinerary", "Turn-ons: Rembrandt, windmills, a Dutch woman's kitchen", "Hours: not scheduled all day, sweetheart", "Rate: $200 a day and not a cent more"],
  },
};

export function Windows({ me, nasty = false }: { me: Person | null; nasty?: boolean }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="ams-windows">
      {WINDOWS.map((base, i) => {
        const w = nasty ? { ...base, ...NASTY_WINDOWS[base.who] } : base;
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

/* ==========================================================================
   4. The window services menu
   ========================================================================== */

type Service = { who: string; what: string; price: string };
const SERVICES: Service[] = [
  { who: "Evan", what: "Reciting the itinerary from memory", price: "Mandatory" },
  { who: "Evan", what: "Booking every table, emotionally", price: "Free" },
  { who: "Jarrod", what: "Rolling for the group on the Bulldog Boat", price: "One beer" },
  { who: "Jarrod", what: "Finding a gay bar within 400 m of anywhere", price: "Instant" },
  { who: "Tyler", what: "Historical context nobody asked for", price: "Free, unavoidable" },
  { who: "Tyler", what: "Leaving the club at 11, gracefully", price: "Included" },
  { who: "Zak", what: "Rijksmuseum tour, second edition", price: "Your patience" },
  { who: "Zak", what: "Thanksgiving demands", price: "Non-negotiable" },
  { who: "Anyone", what: "Holding your jacket at Shelter", price: "€0 + resentment" },
  { who: "Anyone", what: "Emotional support at the Anne Frank House", price: "Priceless" },
];
const NASTY_SERVICES: Service[] = [
  { who: "Anyone", what: "Holding your hair after the space cake", price: "One FEBO croquette" },
  { who: "Anyone", what: "Pretending we didn't see that in De Wallen", price: "€20, cash" },
  { who: "Anyone", what: "Walking you home after Shelter", price: "A 6 am apology" },
  { who: "Jarrod", what: "Hot-boxing the Bulldog Boat cabin", price: "Two drinks included" },
  { who: "Evan", what: "Explaining to the ferry why you're shouting", price: "Gratis" },
];

export function Services({ nasty = false }: { nasty?: boolean }) {
  const list = nasty ? [...SERVICES, ...NASTY_SERVICES] : SERVICES;
  return (
    <ul className="ams-services">
      {list.map((s) => (
        <li key={s.who + s.what} className={NASTY_SERVICES.includes(s) ? "is-nasty-item" : undefined}>
          <span className="ams-svc-who">{s.who}</span>
          <span className="ams-svc-what">{s.what}</span>
          <span className="ams-svc-dots" aria-hidden />
          <span className="ams-svc-price">{s.price}</span>
        </li>
      ))}
    </ul>
  );
}

/* ==========================================================================
   5. Official roommate complaints
   ========================================================================== */

const ROOMMATE: Record<Person, Person> = { Evan: "Zak", Zak: "Evan", Jarrod: "Tyler", Tyler: "Jarrod" };
const OFFENCES = [
  "Snored like a ferry horn",
  "Hogged the shower",
  "Came home at 6 am",
  "Set a 5:45 am alarm and hit snooze",
  "Ate my FEBO croquette",
  "Recited the itinerary, unprompted",
  "Took the good pillow",
  "Left wet towels on my bed",
  "Narrated the Rijksmuseum",
  "Played music in the room at 2 am",
];
const NASTY_OFFENCES = [
  "Hot-boxed the bathroom (non-smoking hotel)",
  "Left space-cake crumbs in the bed",
  "Brought the whole club home with them",
  "Clogged the toilet after FEBO",
  "Smelled like the Bulldog Boat for 48 hours",
  "Farted the entire length of the A'DAM Lookout elevator",
  "Pissed in the sink and called it 'the Dutch way'",
  "Was loudly horny about a stroopwafel",
  "Snored, sweated and drooled, in that order, on my side of the room",
  "Shat for forty minutes and refused to light a match",
  "Answered the door in a towel, then dropped the towel (room service has filed a report)",
  "Gave an unsolicited 3 am ranking of everyone we saw in the Red Light District",
  "Left a mystery stain on the nice duvet and blamed the Wi-Fi",
  "Drunk-texted an ex from the Sir Adam swing",
  "Called the minibar 'a lifestyle' and drank all of it",
];
const RULINGS = [
  "Buys the next round of bitterballen.",
  "Takes the 5:45 am Sunday alarm without complaint.",
  "Banned from the shower until Thursday.",
  "Owes the room one FEBO croquette, warm.",
  "Must carry everyone's jackets at Shelter.",
  "Sits on the open deck of the next canal cruise.",
  "Pays for the oliebollen run. All of it.",
  "Writes a formal apology in Dutch. Proost.",
];
const NASTY_RULINGS = [
  "Sleeps in the bathtub. Dignity optional.",
  "Must publicly apologise to the next stranger they offend, with a bow.",
  "Does the walk of shame down Damrak, carrying everyone's shoes.",
  "Buys the room's hangover breakfast and eats it last.",
  "Banned from speaking until they've apologised in rhyme.",
  "Smells the offending sock. Out loud. With feeling.",
  "Pays a fine of one (1) emotional compliment to the person they wronged.",
  "Court-ordered cold shower. Duration: until the room says stop.",
];

function caseNo() {
  return `SA-${Math.floor(1000 + Math.random() * 9000)}-${"ABCDEFGHJKLMNPQRSTUVWXYZ"[Math.floor(Math.random() * 24)]}`;
}

export function Complaints({ me, nasty = false }: { me: Person | null; nasty?: boolean }) {
  const [by, setBy] = useState<Person | null>(null);
  const [against, setAgainst] = useState<Person | null>(null);
  const [crimes, setCrimes] = useState<string[]>([]);
  const [notice, setNotice] = useState<{ no: string; ruling: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const filer = by ?? me;
  const list = nasty ? [...OFFENCES, ...NASTY_OFFENCES] : OFFENCES;

  useEffect(() => {
    if (me && !by) setBy(me);
  }, [me, by]);
  useEffect(() => {
    if (filer && !against) setAgainst(ROOMMATE[filer]);
  }, [filer, against]);

  const people: Person[] = ["Evan", "Jarrod", "Tyler", "Zak"];
  const ready = !!against && crimes.length > 0;
  const text = notice && against
    ? `OFFICIAL NOTICE · Sir Adam Grievance Office · Case ${notice.no}\nComplainant: ${filer ?? "Anonymous"}\nAccused: ${against}\nCharges: ${crimes.join("; ")}\nRuling: ${notice.ruling}\nThis decision is final and cannot be appealed.`
    : "";

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="ams-complaints">
      <div className="ams-complaint-form">
        <div className="ams-cf-row">
          <p className="ams-cf-label">Filed by</p>
          <div className="ams-cf-chips">
            {people.map((p) => (
              <button key={p} className="ams-chip" aria-pressed={filer === p} onClick={() => { setBy(p); setAgainst(ROOMMATE[p]); setNotice(null); }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="ams-cf-row">
          <p className="ams-cf-label">Against</p>
          <div className="ams-cf-chips">
            {people.filter((p) => p !== filer).map((p) => (
              <button key={p} className="ams-chip" aria-pressed={against === p} onClick={() => { setAgainst(p); setNotice(null); }}>
                {p}
                {filer && ROOMMATE[filer] === p ? " (roommate)" : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="ams-cf-row">
          <p className="ams-cf-label">Charges</p>
          <div className="ams-cf-chips">
            {list.map((c) => (
              <button
                key={c}
                className={`ams-chip${NASTY_OFFENCES.includes(c) ? " ams-chip-nasty" : ""}`}
                aria-pressed={crimes.includes(c)}
                onClick={() => {
                  setCrimes((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));
                  setNotice(null);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <button
          className="btn btn-dark"
          disabled={!ready}
          onClick={() => setNotice({ no: caseNo(), ruling: (nasty ? [...RULINGS, ...NASTY_RULINGS, ...NASTY_RULINGS] : RULINGS)[Math.floor(Math.random() * (nasty ? RULINGS.length + 2 * NASTY_RULINGS.length : RULINGS.length))] })}
        >
          {notice ? "Re-sentence" : "File complaint"}
        </button>
      </div>

      <div className={`ams-notice${notice ? " is-filed" : ""}`} aria-live="polite">
        {notice && against ? (
          <>
            <p className="ams-notice-office">Sir Adam Grievance Office</p>
            <p className="ams-notice-title">Official Notice</p>
            <p className="ams-notice-case">Case {notice.no}</p>
            <dl>
              <div><dt>Complainant</dt><dd>{filer ?? "Anonymous"}</dd></div>
              <div><dt>Accused</dt><dd>{against}</dd></div>
              <div>
                <dt>Charges</dt>
                <dd>
                  <ul>{crimes.map((c) => <li key={c}>{c}</li>)}</ul>
                </dd>
              </div>
              <div><dt>Ruling</dt><dd className="ams-notice-ruling">{notice.ruling}</dd></div>
            </dl>
            <p className="ams-notice-fine">This decision is final and cannot be appealed.</p>
            <span className="ams-notice-stamp" aria-hidden>Guilty</span>
            <button className="btn btn-signal ams-notice-share" onClick={share}>
              {copied ? "Copied" : "Send to the group chat"}
            </button>
          </>
        ) : (
          <p className="ams-notice-empty">Your notice appears here once charges are filed.</p>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   6. Getting weird: Windmill of Fate, Dutch alter egos, the gezellig rain
   ========================================================================== */

const FATES = [
  "Zak buys the next round.",
  "Everyone takes a jenever, bent over the bar, no hands.",
  "Jarrod picks the next bar. No vetoes.",
  "Tyler is granted permission to go to bed.",
  "Evan may not mention the itinerary for one hour.",
  "Next stop: FEBO. Immediately.",
  "Speak only Dutch until the next canal. Good luck.",
  "Whoever is closest to a bike lane buys bitterballen.",
  "Group photo with the next heron you see.",
  "Swap jackets with your roommate until midnight.",
  "Order whatever the bartender recommends. Trust the Dutch.",
  "Ferry ride to Noord and back, for no reason.",
];
const NASTY_FATES = [
  "Loser rolls for the whole group.",
  "Everyone confesses their worst Red Light District thought.",
  "Next round is on whoever said 'gezellig' last.",
  "Space-cake roulette: quarter pieces only, you animals.",
];

export function Windmill({ nasty = false }: { nasty?: boolean }) {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [fate, setFate] = useState<string | null>(null);
  const pool = nasty ? [...FATES, ...NASTY_FATES] : FATES;

  function spin() {
    if (spinning) return;
    setFate(null);
    setSpinning(true);
    setAngle((a) => a + 1440 + Math.floor(Math.random() * 720));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    window.setTimeout(() => {
      setFate(pick);
      setSpinning(false);
    }, 3200);
  }

  return (
    <div className="ams-windmill-wrap">
      <button className="ams-windmill" onClick={spin} aria-label="Spin the Windmill of Fate" disabled={spinning}>
        <svg viewBox="0 0 300 360" aria-hidden>
          <path d="M115 340 L135 150 L165 150 L185 340 Z" className="ams-wm-body" />
          <path d="M126 160 L150 120 L174 160 Z" className="ams-wm-cap" />
          <rect x="140" y="290" width="20" height="50" className="ams-wm-door" />
          <rect x="143" y="210" width="14" height="18" className="ams-wm-window" />
          <g className="ams-wm-sails" style={{ transform: `rotate(${angle}deg)` }}>
            {[0, 90, 180, 270].map((r) => (
              <g key={r} transform={`rotate(${r} 150 140)`}>
                <rect x="144" y="18" width="12" height="118" className="ams-wm-arm" />
                <rect x="156" y="22" width="34" height="104" className="ams-wm-sail" />
                {[40, 62, 84, 106].map((y) => (
                  <line key={y} x1="156" x2="190" y1={y} y2={y} className="ams-wm-lattice" />
                ))}
              </g>
            ))}
            <circle cx="150" cy="140" r="10" className="ams-wm-hub" />
          </g>
        </svg>
        <span className="ams-wm-cta">{spinning ? "Deciding your fate…" : fate ? "Spin again" : "Spin it"}</span>
      </button>
      <div className={`ams-fate${fate ? " is-shown" : ""}`} aria-live="polite">
        <p className="ams-fate-label">The windmill has spoken</p>
        <p className="ams-fate-text">{fate ?? "Settle any argument. The windmill is never wrong."}</p>
      </div>
    </div>
  );
}

const ALTER_EGOS: { who: Person; name: string; bio: string }[] = [
  { who: "Evan", name: "Evert van der Brug", bio: "Retired harbour master of itineraries. Has never once been late. Will tell you about it." },
  { who: "Jarrod", name: "Joost Bootsma", bio: "Third-generation barge captain. Legally married to a canal boat. Smells faintly of hops." },
  { who: "Tyler", name: "Teun de Oude", bio: "Museum docent since 1987. In bed by 22:00. Has opinions about Rembrandt's brushwork." },
  { who: "Zak", name: "Sjaak van Rijn", bio: "Claims to be Rembrandt's descendant. Isn't. Still expects a Dutch grandmother to cook his Thanksgiving." },
];

export function AlterEgos({ me }: { me: Person | null }) {
  const [shown, setShown] = useState<Record<string, boolean>>({});
  return (
    <ul className="ams-egos">
      {ALTER_EGOS.map((e) => (
        <li key={e.who} className={me === e.who ? "is-me" : undefined}>
          <button onClick={() => setShown((s) => ({ ...s, [e.who]: !s[e.who] }))} aria-expanded={!!shown[e.who]}>
            <span className="ams-ego-real">{e.who} is actually…</span>
            <span className={`ams-ego-name${shown[e.who] ? " is-shown" : ""}`}>{shown[e.who] ? e.name : "tap to reveal"}</span>
            {shown[e.who] && <span className="ams-ego-bio">{e.bio}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Type "gezellig" anywhere (or call the trigger) and it rains cheese, tulips and bikes. */
export function GezelligRain({ nasty = false, trigger = 0 }: { nasty?: boolean; trigger?: number }) {
  const [drops, setDrops] = useState<{ id: number; left: number; delay: number; dur: number; emoji: string; size: number }[]>([]);

  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (typed === "gezellig") rain();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nasty]);

  useEffect(() => {
    if (trigger > 0) rain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  function rain() {
    const set = nasty ? ["🍆", "🧀", "🌷", "🚲", "🍆", "🥴"] : ["🧀", "🌷", "🚲", "🧇", "🌷", "🧀"];
    const base = Date.now();
    setDrops(
      Array.from({ length: 44 }, (_, i) => ({
        id: base + i,
        left: Math.random() * 100,
        delay: Math.random() * 1.6,
        dur: 2.6 + Math.random() * 2.2,
        emoji: set[i % set.length],
        size: 22 + Math.random() * 26,
      })),
    );
    window.setTimeout(() => setDrops([]), 6500);
  }

  if (!drops.length) return null;
  return (
    <div className="ams-rain-fx" aria-hidden>
      {drops.map((d) => (
        <span
          key={d.id}
          style={{ left: `${d.left}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, fontSize: `${d.size}px` }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}

/* ==========================================================================
   7. Crazier: Bad Decisions Generator + Shelter Mode (full-screen club)
   ========================================================================== */

const DARES = [
  "Ask a stranger to rate your bike-lane etiquette out of ten.",
  "Order in Dutch only. No pointing, no English, no mercy.",
  "Compliment the first bartender you see on their jenever pour.",
  "Do your best Dutch accent for the next ten minutes.",
  "Get a photo with a stranger who is wearing orange.",
  "Eat a bitterbal in one bite. Report back.",
  "Narrate the next canal like a nature documentary.",
  "Start a slow clap when the next tram arrives.",
  "Invent a Dutch holiday and get the table to celebrate it.",
  "Try the strangest thing on the snack menu.",
];
const NASTY_DARES = [
  "Wink at the next person who says 'gezellig'.",
  "Introduce yourself to the next bar by your alter-ego name, in full.",
  "Rate each of your friends' butts out of ten. Out loud. Be fair.",
  "Slow-dance with a lamppost for one full chorus.",
];
const DRINKS = [
  "a Heineken, because it's a rule",
  "a Brouwerij 't IJ Zatte",
  "a mystery jenever, chased with a beer (a kopstoot)",
  "something with a ridiculous name, bartender's choice",
  "a water. Yes, really. You're welcome.",
  "whatever your roommate is drinking",
  "an Amsterdam Mule, pinky out",
  "the cheapest thing on the board",
];
const CONSEQUENCES = [
  "Everyone votes. If it was bad, you buy the next round of bitterballen.",
  "The group picks your next song. Your protests will be ignored.",
  "You're navigator for the next hour. Nobody may help.",
  "You're designated photographer until the next stop.",
  "You owe each friend one honest compliment.",
  "Nothing. You're safe. Suspiciously safe.",
  "You must take the tram, not a taxi, no matter what.",
  "You carry the group's snacks for the rest of the night.",
];

export function BadDecisions({ me, nasty = false }: { me: Person | null; nasty?: boolean }) {
  const crew: Person[] = ["Evan", "Jarrod", "Tyler", "Zak"];
  const [who, setWho] = useState<Person>(me ?? "Evan");
  const [roll, setRoll] = useState<{ dare: string; drink: string; cons: string } | null>(null);
  const [rolling, setRolling] = useState(false);
  const dares = nasty ? [...DARES, ...NASTY_DARES] : DARES;
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

  useEffect(() => {
    if (me) setWho(me);
  }, [me]);

  function go() {
    if (rolling) return;
    setRolling(true);
    let n = 0;
    const t = window.setInterval(() => {
      setRoll({ dare: pick(dares), drink: pick(DRINKS), cons: pick(CONSEQUENCES) });
      if (++n >= 9) {
        window.clearInterval(t);
        setRolling(false);
      }
    }, 90);
  }

  return (
    <div className="ams-bad">
      <div className="ams-bad-who" role="group" aria-label="Who is rolling">
        {crew.map((p) => (
          <button key={p} className={who === p ? "is-on" : undefined} onClick={() => setWho(p)} aria-pressed={who === p}>
            {p}
          </button>
        ))}
      </div>
      <button className="ams-bad-roll" onClick={go} disabled={rolling}>
        {rolling ? "Rolling…" : roll ? `Roll again for ${who}` : `Roll for ${who}`}
      </button>
      <div className={`ams-bad-card${roll ? " is-shown" : ""}`} aria-live="polite">
        {roll ? (
          <>
            <p><span>The dare</span>{roll.dare}</p>
            <p><span>Your drink</span>{roll.drink}</p>
            <p><span>The consequence</span>{roll.cons}</p>
            <small>Drink at your own pace. Skipping is always allowed. Water counts as a drink.</small>
          </>
        ) : (
          <p className="ams-bad-empty">Three dice. One dare, one drink, one consequence. All optional, all binding.</p>
        )}
      </div>
    </div>
  );
}

/** Full-screen club. Opens from a button, Konami code or typing "shelter". Asks first because it flashes. */
export function ShelterMode({ nasty = false, trigger = 0 }: { nasty?: boolean; trigger?: number }) {
  const [stage, setStage] = useState<"off" | "warn" | "on">("off");
  const [beat, setBeat] = useState(0);
  const [sound, setSound] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    let typed = "";
    const KONAMI = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-10);
      if (seq.join(",") === KONAMI) setStage("warn");
      if (e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-7);
        if (typed === "shelter") setStage("warn");
      }
      if (e.key === "Escape") setStage("off");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (trigger > 0) setStage("warn");
  }, [trigger]);

  // Beat clock: 124 bpm. Slower and no flashing when reduced motion is on.
  useEffect(() => {
    if (stage !== "on") return;
    const ms = 60000 / 124;
    const t = window.setInterval(() => setBeat((b) => b + 1), ms);
    return () => window.clearInterval(t);
  }, [stage]);

  // Optional kick drum from the Web Audio API (no files, off by default).
  useEffect(() => {
    if (stage !== "on" || !sound) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(140, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);
      g.gain.setValueAtTime(0.5, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      o.start();
      o.stop(ctx.currentTime + 0.25);
      o.onended = () => ctx.close().catch(() => {});
    } catch {
      /* no audio, fine */
    }
  }, [beat, stage, sound]);

  if (stage === "off") return null;

  if (stage === "warn") {
    return (
      <div className="ams-shelter-warn" role="dialog" aria-modal="true" aria-label="Shelter Mode warning">
        <div>
          <p className="eyebrow">Shelter Mode</p>
          <h3 className="h3">Basement club. Flashing lights.</h3>
          <p className="body">
            This fills the screen with fast flashing colours, which can trigger seizures in people with photosensitive epilepsy. {reduced ? "Your device asks for reduced motion, so it will fade softly instead of flashing." : "Skip it if that's you."}
          </p>
          <div className="ams-shelter-btns">
            <button className="ams-rain-btn" onClick={() => setStage("on")}>Let me in</button>
            <button className="ams-shelter-ghost" onClick={() => setStage("off")}>No thanks</button>
          </div>
        </div>
      </div>
    );
  }

  const hues = nasty ? [285, 320, 265, 300] : [18, 45, 340, 200];
  const lines = nasty
    ? ["NO SHAME", "SHELTER", "PRESS CLOSER", "GEZELLIG??", "ZAK BUYS", "ONE MORE"]
    : ["SHELTER", "GEZELLIG", "DANCE", "ONE MORE", "PROOST", "NO PHOTOS"];
  return (
    <div
      className={`ams-shelter${reduced ? " is-calm" : ""}`}
      style={{ ["--h" as string]: String(hues[beat % hues.length]) } as CSSProperties}
      role="dialog"
      aria-label="Shelter Mode"
    >
      <div className="ams-shelter-ring" key={beat} />
      <p className="ams-shelter-word" key={`w${Math.floor(beat / 2)}`}>
        {lines[Math.floor(beat / 4) % lines.length]}
      </p>
      <div className="ams-shelter-bar">
        <button onClick={() => setSound((s) => !s)} aria-pressed={sound}>{sound ? "Sound on" : "Sound off"}</button>
        <button onClick={() => setStage("off")}>Leave the club</button>
      </div>
      <p className="ams-shelter-hint">Tap Esc or “Leave the club” to exit. 124 BPM, 03:00 forever.</p>
    </div>
  );
}
