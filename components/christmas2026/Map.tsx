"use client";

import { useMemo, useState } from "react";
import type { Day, Person, Stop } from "@/lib/christmas2026";

/* Hand-drawn Steamboat map. Real coordinates projected onto a 1000-wide SVG;
   the river, roads and Mt. Werner are stylised on purpose. */

type LatLng = [number, number];
const B = { n: 40.492, s: 40.443, w: -106.852, e: -106.784 };
const COS = Math.cos((40.47 * Math.PI) / 180);
const W = 1000;
const H = Math.round((W * (B.n - B.s)) / ((B.e - B.w) * COS));
const proj = ([lat, lng]: LatLng): [number, number] => [((lng - B.w) / (B.e - B.w)) * W, ((B.n - lat) / (B.n - B.s)) * H];

// Approximate locations, keyed by stop title. Good enough for a doodle.
const HOUSE: LatLng = [40.4866, -106.834]; // somewhere in Old Town, once booked
const LINCOLN: LatLng = [40.4836, -106.83];
const COURTHOUSE: LatLng = [40.4846, -106.8316];
const HOT_SPRINGS: LatLng = [40.4806, -106.8232];
const HOWELSEN: LatLng = [40.4827, -106.8388];
const CITY_MARKET: LatLng = [40.465, -106.823];
const GONDOLA: LatLng = [40.4573, -106.8046];
const THUNDERHEAD: LatLng = [40.4628, -106.79];
const HAYMAKER: LatLng = [40.4482, -106.8135];

const GEO: Record<string, LatLng> = {
  "Grocery run at City Market": CITY_MARKET,
  "Check in, unpack, nap": HOUSE,
  "Short stroll under the Lincoln Ave lights": LINCOLN,
  "Easy dinner, early night": LINCOLN,
  "Slow breakfast at the house": HOUSE,
  "Santa's study on the courthouse lawn": COURTHOUSE,
  "Lunch downtown": LINCOLN,
  "Old Town Hot Springs": HOT_SPRINGS,
  "Back to the house, rest": HOUSE,
  "Horse-drawn sleigh ride dinner": HAYMAKER,
  "Sleep in, coffee downtown": LINCOLN,
  "Tube Howelsen": HOWELSEN,
  "Lunch together": LINCOLN,
  "Downtime at the house": HOUSE,
  "Gondola up to Thunderhead for sunset": GONDOLA,
  "Cozy dinner, cocoa bar, movie": LINCOLN,
  "Breakfast, pack, check out": HOUSE,
};
const AIRPORT = { label: "Hayden airport · 25 mi", at: [28, 58] as [number, number], arrow: "←" };
const OFFMAP: Record<string, typeof AIRPORT> = {
  "Evan lands, picks up the SUV": AIRPORT,
  "The family lands": AIRPORT,
  "Drive to Steamboat": AIRPORT,
  "Leave for the airport": AIRPORT,
  "American 2750 to Dallas, then home to XNA": AIRPORT,
  "Backup ways home": AIRPORT,
};

function smooth(p: [number, number][]) {
  if (p.length < 2) return "";
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [x0, y0] = p[Math.max(0, i - 1)];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[Math.min(p.length - 1, i + 2)];
    const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
    const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return d;
}
const line = (pts: LatLng[]) => smooth(pts.map(proj));

const YAMPA = line([
  [40.443, -106.812],
  [40.452, -106.8165],
  [40.46, -106.8185],
  [40.468, -106.8205],
  [40.475, -106.8215],
  [40.4795, -106.8248],
  [40.4822, -106.832],
  [40.4846, -106.8398],
  [40.4878, -106.847],
  [40.4905, -106.852],
]);
const US40 = line([
  [40.4445, -106.8035],
  [40.452, -106.8115],
  [40.459, -106.815],
  [40.467, -106.8168],
  [40.474, -106.8178],
  [40.479, -106.8212],
  [40.4826, -106.8268],
  [40.4852, -106.8332],
  [40.4876, -106.8402],
  [40.49, -106.8472],
  [40.4915, -106.852],
]);
const WERNER_CIRCLE = line([
  [40.459, -106.815],
  [40.4585, -106.811],
  [40.4575, -106.807],
  GONDOLA,
]);
const [GX, GY] = proj(GONDOLA);
const [TX, TY] = proj(THUNDERHEAD);

const LABELS: { at: LatLng; text: string; cls: string; rot?: number }[] = [
  { at: [40.4895, -106.8262], text: "OLD TOWN", cls: "hood" },
  { at: [40.4702, -106.8268], text: "Yampa River", cls: "water", rot: -78 },
  { at: [40.4505, -106.7905], text: "MT. WERNER", cls: "hood" },
  { at: [40.4785, -106.8425], text: "Howelsen Hill", cls: "minor" },
  { at: [40.4575, -106.8185], text: "US 40", cls: "minor", rot: -62 },
];
const QUIPS: { at: LatLng; text: string; rot?: number }[] = [
  { at: [40.4912, -106.8105], text: "↑ Strawberry Park, 7 mi", rot: -3 },
  { at: [40.4735, -106.8065], text: "free bus, every ~20 min", rot: 4 },
  { at: [40.4655, -106.8395], text: "snow: yes", rot: -6 },
  { at: [40.4445, -106.8355], text: "Rabbit Ears Pass this way →", rot: 2 },
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
  const shown = useMemo(() => (all ? days : [day]), [all, days, day]);

  // Place pins, nudging any that land on top of each other (the house and Lincoln Ave get crowded).
  const { pins, off } = useMemo(() => {
    const placed: Pin[] = [];
    const offItems: { d: Day; s: Stop; n: number }[] = [];
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
          offItems.push({ d, s, n });
        }
      }
    }
    return { pins: placed, off: offItems };
  }, [shown, all]);

  const legend = useMemo(
    () =>
      day.stops.map((s, i) => ({
        s,
        n: i + 1,
        where: GEO[s.title] ? "pin" : OFFMAP[s.title] ? "← off the map" : "no fixed spot",
      })),
    [day],
  );

  const flakes = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        x: (i * 97.3) % W,
        r: 1.6 + ((i * 7) % 5) * 0.5,
        dur: 9 + ((i * 13) % 9),
        delay: -((i * 29) % 17),
      })),
    [],
  );

  return (
    <div className="xm-map-wrap">
      <div className="xm-map-controls" role="group" aria-label="Map day">
        {days.map((d) => (
          <button
            key={d.id}
            className="xm-chip"
            aria-pressed={!all && d.id === day.id}
            onClick={() => {
              setAll(false);
              onDay(d.id);
            }}
          >
            {d.dow} {d.num}
          </button>
        ))}
        <button className="xm-chip xm-chip-star" aria-pressed={all} onClick={() => setAll((v) => !v)}>
          Whole trip
        </button>
      </div>

      <div className="xm-map-paper">
        <div className="xm-map-scroll">
          <svg viewBox={`0 0 ${W} ${H}`} className="xm-map" role="img" aria-label={`Hand-drawn map of ${all ? "the whole trip" : `${day.dow} ${day.num}`}`}>
            <defs>
              <path id="xm-gondola-route" d={`M${GX},${GY} L${TX},${TY}`} />
            </defs>

            <rect x="0" y="0" width={W} height={H} className="xm-land" />

            {/* Mt. Werner, roughly where it sits, with snowcaps */}
            <path className="xm-mtn" d={`M560 ${H} L700 700 L780 610 L860 520 L905 470 L950 530 L1000 480 L1000 ${H} Z`} />
            <path className="xm-mtn-snow" d="M878 498 L905 470 L932 506 L918 500 L905 512 L892 500 Z M982 500 L1000 480 L1000 506 L992 504 Z" />
            <path className="xm-mtn-run" d="M905 480 Q880 600 820 720 M950 540 Q930 640 900 760 M860 530 Q820 640 760 760" />
            {/* Howelsen Hill */}
            <path className="xm-hill" d={`M95 ${proj(HOWELSEN)[1] + 90} Q ${proj(HOWELSEN)[0]} ${proj(HOWELSEN)[1] - 70} 300 ${proj(HOWELSEN)[1] + 90} Z`} />

            <path d={YAMPA} className="xm-river" />
            <path d={US40} className="xm-road" />
            <path d={WERNER_CIRCLE} className="xm-road xm-road-thin" />
            <path d={`M${GX},${GY} L${TX},${TY}`} className="xm-gondola-line" />

            {LABELS.map((l) => {
              const [x, y] = proj(l.at);
              return (
                <text key={l.text} x={x} y={y} className={`xm-map-label xm-map-${l.cls}`} textAnchor="middle" transform={`rotate(${l.rot ?? 0} ${x} ${y})`}>
                  {l.text}
                </text>
              );
            })}
            {QUIPS.map((q) => {
              const [x, y] = proj(q.at);
              return (
                <text key={q.text} x={x} y={y} className="xm-map-quip" textAnchor="middle" transform={`rotate(${q.rot ?? 0} ${x} ${y})`}>
                  {q.text}
                </text>
              );
            })}

            {/* Thunderhead, at the top of the gondola */}
            <g transform={`translate(${TX} ${TY})`} className="xm-lodge" aria-hidden>
              <path d="M-16 6 L0 -10 L16 6 Z" />
              <rect x="-12" y="6" width="24" height="12" />
              <text y="40" textAnchor="middle">Thunderhead</text>
            </g>
            {/* The gondola, forever going up */}
            <g className="xm-cabin" aria-hidden>
              <line x1="0" y1="-14" x2="0" y2="-4" />
              <rect x="-8" y="-4" width="16" height="13" rx="2" />
              <animateMotion dur="11s" repeatCount="indefinite" keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear">
                <mpath href="#xm-gondola-route" />
              </animateMotion>
            </g>

            {/* Compass, of sorts */}
            <g transform="translate(70 820)" className="xm-compass" aria-hidden>
              <circle r="34" />
              <path d="M0 -26 L7 0 L0 26 L-7 0 Z" />
              <text y="-40" textAnchor="middle">N-ish</text>
            </g>

            {off.length > 0 && (
              <g className="xm-off" transform={`translate(${AIRPORT.at[0]} ${AIRPORT.at[1]})`}>
                <text className="xm-off-arrow" x="0" y="0">
                  {AIRPORT.arrow}
                </text>
                <text className="xm-off-label" x="38" y="-4">
                  {AIRPORT.label}
                </text>
                {!all && (
                  <text className="xm-off-label xm-off-nums" x="38" y="18">
                    {off.map((i) => `#${i.n}`).join(" · ")}
                  </text>
                )}
              </g>
            )}

            {pins.map((p) => {
              const key = `${p.d.id}-${p.s.title}`;
              const notMe = !!me && !!p.s.who && !p.s.who.includes(me);
              const active = hover === key;
              return (
                <g
                  key={key}
                  className={`xm-pin${all ? " is-small" : ""}${notMe ? " is-not-me" : ""}${p.s.must ? " is-must" : ""}${active ? " is-active" : ""}`}
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
                    <g className="xm-pin-tip" transform={p.x > W - 380 ? "translate(-460 0)" : undefined}>
                      <rect x="22" y="-18" width={Math.min(430, 22 + (p.s.title.length + p.s.time.length + 6) * 9.2)} height="36" />
                      <text x="34" y="6">
                        {all ? `${p.d.dow} · ` : ""}
                        {p.s.time} · {p.s.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <g className="xm-flakes" aria-hidden>
              {flakes.map((f, i) => (
                <circle key={i} cx={f.x} cy={-10} r={f.r} style={{ animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }} />
              ))}
            </g>

            {!all && day.id === "tue" && (
              <g className="xm-buffer" transform={`translate(${W / 2} ${H / 2})`}>
                <rect x="-310" y="-90" width="620" height="180" />
                <text y="-18" textAnchor="middle" className="xm-buffer-big">
                  Hopefully home.
                </text>
                <text y="28" textAnchor="middle">
                  Tuesday is the spare day. If we&apos;re still here,
                </text>
                <text y="62" textAnchor="middle">
                  something went sideways. Head for the airport ←
                </text>
              </g>
            )}
          </svg>
        </div>
        <p className="xm-map-small">Not to scale. Barely to anything. Tap a pin to jump to it in the plan.</p>
      </div>

      {!all && (
        <ol className="xm-map-legend">
          {legend.map(({ s, n, where }) => (
            <li key={s.title}>
              <button onClick={() => onPick(day, s)}>
                <span className="xm-legend-n">{n}</span>
                <span className="xm-legend-t">{s.time}</span>
                <span className="xm-legend-title">{s.title}</span>
                {where !== "pin" && <span className="xm-legend-where">{where}</span>}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
