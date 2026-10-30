/**
 * Original nautical line art for /virgincruise, drawn in the /tanyasbach engraved-sticker style:
 * plum outlines over flat color. Inspired by cruise-ship and sailor-tattoo motifs; no brand marks.
 */
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/* Maritime signal flags. The bunting spells T-A-N-Y-A in code.        */
/* ------------------------------------------------------------------ */

type FlagKind = "T" | "A" | "N" | "Y" | "heart";

function Flag({ k }: { k: FlagKind }) {
  const ink = "var(--oxblood)";
  if (k === "heart")
    return (
      <svg viewBox="0 0 60 56" className="vc-flag-svg">
        <path d="M6 2 H54 L30 50 Z" fill="var(--signal)" stroke={ink} strokeWidth="1.4" />
        <path d="M30 26 C24 18 16 22 20 28 L30 36 L40 28 C44 22 36 18 30 26 Z" fill="#fff" stroke={ink} strokeWidth="1" />
      </svg>
    );
  return (
    <svg viewBox="0 0 60 56" className="vc-flag-svg">
      <defs>
        <clipPath id={`vc-clip-${k}`}>
          {k === "A" ? <path d="M4 2 H56 L42 26 L56 50 H4 Z" /> : <rect x="4" y="2" width="52" height="48" />}
        </clipPath>
      </defs>
      <g clipPath={`url(#vc-clip-${k})`}>
        {k === "T" && (
          <>
            <rect x="4" y="2" width="18" height="48" fill="var(--scarlet)" />
            <rect x="22" y="2" width="17" height="48" fill="#fff" />
            <rect x="39" y="2" width="17" height="48" fill="var(--navy)" />
          </>
        )}
        {k === "A" && (
          <>
            <rect x="4" y="2" width="26" height="48" fill="#fff" />
            <rect x="30" y="2" width="26" height="48" fill="var(--navy)" />
          </>
        )}
        {k === "N" &&
          Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={4 + (i % 4) * 13} y={2 + Math.floor(i / 4) * 12} width="13" height="12" fill={(i + Math.floor(i / 4)) % 2 ? "#fff" : "var(--navy)"} />
          ))}
        {k === "Y" && (
          <>
            <rect x="4" y="2" width="52" height="48" fill="var(--mango)" />
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={`M${-40 + i * 16} 50 L${-16 + i * 16} 2 L${-8 + i * 16} 2 L${-32 + i * 16} 50 Z`} fill="var(--scarlet)" />
            ))}
          </>
        )}
      </g>
      <path d={k === "A" ? "M4 2 H56 L42 26 L56 50 H4 Z" : "M4 2 H56 V50 H4 Z"} fill="none" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

const WORD: FlagKind[] = ["T", "A", "N", "Y", "A", "heart"];

export function Bunting({ repeat = 5 }: { repeat?: number }) {
  const flags = Array.from({ length: repeat }, () => WORD).flat();
  return (
    <div className="vc-bunting" aria-hidden>
      {flags.map((k, i) => (
        <span key={i} className="vc-flag" style={{ "--d": `${(i % 7) * -0.6}s` } as CSSProperties}>
          <Flag k={k} />
        </span>
      ))}
    </div>
  );
}

/** A single flag word for the guide: shows how the bunting spells her name. */
export function FlagWord() {
  return (
    <span className="vc-flagword" aria-label="T A N Y A in maritime signal flags">
      {(["T", "A", "N", "Y", "A"] as FlagKind[]).map((k, i) => (
        <span key={i} className="vc-flagword-one">
          <Flag k={k} />
          <b>{k}</b>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* The ship: a side profile with a scarlet hull and a heart funnel.    */
/* ------------------------------------------------------------------ */

export function Ship({ className = "", name = "TANYA ’27" }: { className?: string; name?: string }) {
  const ink = "var(--oxblood)";
  const row = (y: number, x0: number, x1: number, w = 9, gap = 6) =>
    Array.from({ length: Math.floor((x1 - x0) / (w + gap)) }, (_, i) => (
      <rect key={`${y}-${i}`} x={x0 + i * (w + gap)} y={y} width={w} height="6" rx="2" fill="var(--navy)" opacity=".85" />
    ));
  return (
    <svg className={`vc-ship ${className}`} viewBox="0 0 600 200" aria-hidden>
      {/* funnel + heart */}
      <g className="vc-ship-funnel">
        <path d="M430 34 L438 2 H492 L486 34 Z" fill="var(--scarlet)" stroke={ink} strokeWidth="1.6" />
        <path d="M463 22 C455 12 445 18 451 25 L463 33 L475 25 C481 18 471 12 463 22 Z" fill="#fff" stroke={ink} strokeWidth="1" />
      </g>
      {/* superstructure */}
      <path d="M190 36 H500 L520 62 H160 Z" fill="#fff" stroke={ink} strokeWidth="1.6" />
      <path d="M120 62 H540 L560 96 H90 Z" fill="#fff" stroke={ink} strokeWidth="1.6" />
      <path d="M40 96 H580 L578 120 H34 Z" fill="#fff" stroke={ink} strokeWidth="1.6" />
      {row(46, 206, 494)}
      {row(72, 136, 540)}
      {row(104, 56, 566, 7, 8)}
      {/* balcony rail lines */}
      <path d="M130 88 H546" stroke={ink} strokeWidth=".8" strokeDasharray="2 4" />
      {/* hull */}
      <path d="M30 120 H584 L552 172 Q300 186 64 172 Z" fill="var(--scarlet)" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M42 136 H574" stroke="#fff" strokeWidth="1.2" opacity=".7" />
      <text x="100" y="160" fill="#fff" fontFamily="var(--caps)" fontWeight="700" fontSize="15" letterSpacing="3">
        {name}
      </text>
      {/* bow anchor */}
      <g transform="translate(520 142)" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="0" cy="-8" r="3" />
        <path d="M0 -5 V12 M-9 4 Q0 16 9 4 M-5 -1 H5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Waves: a looping swell along the bottom of a section.               */
/* ------------------------------------------------------------------ */

export function Waves({ className = "" }: { className?: string }) {
  const d = Array.from({ length: 26 }, (_, i) => `q 30 ${i % 2 ? 12 : -12} 60 0`).join(" ");
  return (
    <svg className={`vc-waves ${className}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
      <path className="vc-wave vc-wave-a" d={`M0 30 ${d} V80 H0 Z`} />
      <path className="vc-wave vc-wave-b" d={`M-60 46 ${d} V80 H-60 Z`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Life ring: scarlet-and-white, her name around the rim.              */
/* ------------------------------------------------------------------ */

export function LifeRing({ className = "", top = "S.S. TANYA", bottom = "MAYO · MMXXVII" }: { className?: string; top?: string; bottom?: string }) {
  const ink = "var(--oxblood)";
  const quads = [0, 1, 2, 3].map((i) => {
    const a0 = (i * Math.PI) / 2 - Math.PI / 4 + 0.32;
    const a1 = a0 + Math.PI / 2 - 0.64;
    return { a0, a1 };
  });
  const arc = (r: number, a0: number, a1: number) => `${100 + r * Math.cos(a0)} ${100 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${100 + r * Math.cos(a1)} ${100 + r * Math.sin(a1)}`;
  return (
    <svg className={`vc-ring ${className}`} viewBox="0 0 200 200" aria-hidden>
      <defs>
        <path id="vc-ring-top" d="M30 100 A70 70 0 0 1 170 100" />
        <path id="vc-ring-bot" d="M24 100 A76 76 0 0 0 176 100" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="#fff" stroke={ink} strokeWidth="2" />
      {quads.map(({ a0, a1 }, i) => (
        <path key={i} d={`M${arc(92, a0, a1)} L${100 + 46 * Math.cos(a1)} ${100 + 46 * Math.sin(a1)} A46 46 0 0 0 ${100 + 46 * Math.cos(a0)} ${100 + 46 * Math.sin(a0)} Z`} fill="var(--scarlet)" stroke={ink} strokeWidth="1.2" />
      ))}
      <circle cx="100" cy="100" r="46" fill="var(--sky)" stroke={ink} strokeWidth="2" />
      {/* rope loops */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i * Math.PI) / 2 - Math.PI / 4;
        const x = 100 + 92 * Math.cos(a);
        const y = 100 + 92 * Math.sin(a);
        return <circle key={i} cx={x} cy={y} r="9" fill="none" stroke="#d9b26a" strokeWidth="4" />;
      })}
      <text fontFamily="var(--caps)" fontWeight="700" fontSize="15" letterSpacing="3" fill={ink}>
        <textPath href="#vc-ring-top" startOffset="50%" textAnchor="middle">
          {top}
        </textPath>
      </text>
      <text fontFamily="var(--caps)" fontWeight="700" fontSize="12" letterSpacing="3" fill={ink}>
        <textPath href="#vc-ring-bot" startOffset="50%" textAnchor="middle">
          {bottom}
        </textPath>
      </text>
      <path d="M100 82 C90 70 74 78 82 90 L100 106 L118 90 C126 78 110 70 100 82 Z" fill="var(--signal)" stroke={ink} strokeWidth="1.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sailor tattoo: a heart, an anchor, a banner with a word on it.      */
/* ------------------------------------------------------------------ */

export function Tattoo({ className = "", word = "SAILOR" }: { className?: string; word?: string }) {
  const ink = "var(--oxblood)";
  return (
    <svg className={`vc-tattoo ${className}`} viewBox="0 0 240 220" aria-hidden>
      <g fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* anchor behind */}
        <circle cx="120" cy="22" r="9" />
        <path d="M120 31 V196 M84 52 H156 M60 160 Q120 226 180 160 M60 160 l-8 14 M60 160 l16 4 M180 160 l8 14 M180 160 l-16 4" />
      </g>
      <path d="M120 84 C96 48 40 60 56 108 C66 138 120 172 120 172 C120 172 174 138 184 108 C200 60 144 48 120 84 Z" fill="var(--scarlet)" stroke={ink} strokeWidth="2.4" />
      <path d="M78 82 Q86 72 98 74" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".85" />
      {/* banner */}
      <path d="M20 116 L40 104 H200 L220 116 L200 128 L210 140 H170 L160 132 H80 L70 140 H30 L40 128 Z" fill="#fff" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <path d="M40 104 V128 M200 104 V128" stroke={ink} strokeWidth="1.4" />
      <text x="120" y="123" textAnchor="middle" fontFamily="var(--caps)" fontWeight="700" fontSize="17" letterSpacing="4" fill={ink}>
        {word}
      </text>
      {/* swallows of sparkle */}
      {[
        [24, 40],
        [214, 52],
        [200, 196],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x} ${y - 9} l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 z`} fill="var(--mango)" stroke={ink} strokeWidth="1.2" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Route map: Miami → Grand Turk → Bimini → Miami. Not to scale.       */
/* ------------------------------------------------------------------ */

export function RouteMap() {
  const ink = "var(--oxblood)";
  return (
    <svg className="vc-map" viewBox="0 0 520 360" role="img" aria-label="Route: Miami to Grand Turk, then Bimini, then back to Miami">
      <defs>
        <pattern id="vc-map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--navy)" opacity=".18" />
        </pattern>
      </defs>
      <rect width="520" height="360" fill="var(--sky)" />
      <rect width="520" height="360" fill="url(#vc-map-dots)" />
      {/* Florida */}
      <path d="M0 0 H92 C96 40 104 80 110 120 C116 160 108 200 92 230 C80 252 64 264 54 262 C40 258 30 230 26 196 C20 150 8 110 0 90 Z" fill="var(--sunsoft)" stroke={ink} strokeWidth="1.4" />
      {/* Bahamas */}
      {[
        "M150 150 c6 -10 16 -8 14 4 c-2 10 -12 12 -14 -4 z",
        "M214 104 c10 -6 20 0 22 10 c-8 4 -18 2 -22 -10 z",
        "M232 176 c8 -6 18 -2 22 10 c-8 8 -18 6 -22 -10 z",
        "M282 206 c10 -4 20 4 18 14 c-10 4 -18 0 -18 -14 z",
        "M330 232 c8 -2 14 6 10 12 c-8 2 -12 -4 -10 -12 z",
      ].map((d) => (
        <path key={d} d={d} fill="var(--sunsoft)" stroke={ink} strokeWidth="1.2" />
      ))}
      {/* Turks and Caicos */}
      <path d="M420 262 c12 -8 30 -4 34 6 c-10 8 -26 8 -34 -6 z M466 284 c6 -4 12 0 12 6 c-6 4 -12 2 -12 -6 z" fill="var(--sunsoft)" stroke={ink} strokeWidth="1.2" />
      {/* route */}
      <path className="vc-route" d="M100 182 C180 214 300 262 466 290" fill="none" stroke="var(--scarlet)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      <path className="vc-route" d="M466 290 C380 210 250 150 152 152" fill="none" stroke="var(--navy)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      <path className="vc-route" d="M152 152 C130 160 112 170 100 182" fill="none" stroke="var(--signal)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
      {/* pins */}
      {[
        { x: 100, y: 182, label: "Miami", sub: "Sat + Thu", dx: -14, anchor: "end" as const },
        { x: 466, y: 290, label: "Grand Turk", sub: "Mon · May 31", dx: -16, anchor: "end" as const, dy: 32 },
        { x: 152, y: 152, label: "Bimini", sub: "Wed · Jun 2", dx: 14, anchor: "start" as const, dy: -24 },
      ].map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="9" fill="#fff" stroke={ink} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="4" fill="var(--scarlet)" />
          <text x={p.x + p.dx} y={p.y + (p.dy ?? 0) + 5} textAnchor={p.anchor} fontFamily="var(--display)" fontSize="20" fill={ink}>
            {p.label}
          </text>
          <text x={p.x + p.dx} y={p.y + (p.dy ?? 0) + 22} textAnchor={p.anchor} fontFamily="var(--caps)" fontWeight="700" fontSize="11" letterSpacing="2" fill="var(--antique)">
            {p.sub.toUpperCase()}
          </text>
        </g>
      ))}
      {/* compass */}
      <g transform="translate(470 54)" stroke={ink} strokeWidth="1.2">
        <circle r="26" fill="#fff" />
        <path d="M0 -22 L6 0 L0 22 L-6 0 Z" fill="var(--scarlet)" />
        <path d="M-22 0 L0 -5 L22 0 L0 5 Z" fill="var(--navy)" />
        <text y="-30" textAnchor="middle" stroke="none" fill={ink} fontFamily="var(--caps)" fontWeight="700" fontSize="12">
          N
        </text>
      </g>
      <text x="12" y="348" textAnchor="start" fontFamily="var(--caps)" fontSize="10" letterSpacing="2" fill="var(--smoke)">
        NOT TO SCALE · NOT FOR NAVIGATION
      </text>
    </svg>
  );
}
