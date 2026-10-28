/**
 * Engraved line art for /tanyasbach, drawn to match the portfolio's hairline style:
 * brass strokes at 0.6–1.4px, hatching for shade, and washes of color instead of solid fills.
 */
import type { CSSProperties } from "react";

const WASH = ["var(--signal)", "var(--brass)", "var(--lagoon)", "var(--lime)", "var(--ivory)"];

/** Papel picado: a sagging string of cut-paper flags, each with a hairline cut-out. */
export function PapelPicado({ count = 14, className = "" }: { count?: number; className?: string }) {
  const W = 1440;
  const step = W / count;
  const flags = Array.from({ length: count }, (_, i) => {
    const x = i * step + 8;
    const w = step - 16;
    const t = (i + 0.5) / count;
    const y = 10 + Math.sin(t * Math.PI) * 26;
    const h = 64;
    const teeth = 6;
    const tw = w / teeth;
    let zig = "";
    for (let k = teeth - 1; k >= 0; k--) zig += ` L${x + k * tw + tw / 2} ${y + h + 9} L${x + k * tw} ${y + h}`;
    const cx = x + w / 2;
    const cy = y + h / 2 + 2;
    const motif = i % 3;
    return (
      <g key={i} className="tb-flag" style={{ "--d": `${(i % 5) * -0.9}s` } as CSSProperties}>
        <path d={`M${x} ${y} H${x + w} V${y + h}${zig} Z`} fill={WASH[i % WASH.length]} className="tb-flag-paper" />
        <path d={`M${x + 5} ${y + 6} H${x + w - 5}`} className="tb-hair-thin" />
        {motif === 0 && (
          <g>
            <circle cx={cx} cy={cy} r={8} />
            {Array.from({ length: 12 }, (_, r) => {
              const a = (r / 12) * Math.PI * 2;
              return <path key={r} d={`M${cx + Math.cos(a) * 12} ${cy + Math.sin(a) * 12} L${cx + Math.cos(a) * 18} ${cy + Math.sin(a) * 18}`} className="tb-hair-thin" />;
            })}
          </g>
        )}
        {motif === 1 && (
          <g>
            {Array.from({ length: 6 }, (_, p) => (
              <ellipse key={p} cx={cx} cy={cy - 9} rx={4.5} ry={9} transform={`rotate(${p * 60} ${cx} ${cy})`} />
            ))}
            <circle cx={cx} cy={cy} r={2.5} />
          </g>
        )}
        {motif === 2 && (
          <g>
            <path d={`M${cx} ${cy - 16} L${cx + 12} ${cy} L${cx} ${cy + 16} L${cx - 12} ${cy} Z`} />
            <path d={`M${cx} ${cy - 9} L${cx + 6} ${cy} L${cx} ${cy + 9} L${cx - 6} ${cy} Z`} className="tb-hair-thin" />
            <path d={`M${x + 8} ${cy} H${cx - 16} M${cx + 16} ${cy} H${x + w - 8}`} className="tb-hair-dot" />
          </g>
        )}
      </g>
    );
  });
  return (
    <svg className={`tb-picado ${className}`} viewBox="0 0 1440 112" preserveAspectRatio="xMidYMin slice" aria-hidden>
      <path d="M-10 8 Q720 52 1450 8" className="tb-hair" />
      {flags}
    </svg>
  );
}

/** An engraved palm: hatched trunk rings and fronds drawn as ribs with leaflets. */
export function Palm({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const fronds = [
    { a: -160, l: 150 },
    { a: -130, l: 170 },
    { a: -100, l: 140 },
    { a: -70, l: 160 },
    { a: -40, l: 165 },
    { a: -15, l: 135 },
    { a: -190, l: 120 },
  ];
  const top = { x: 210, y: 150 };
  return (
    <svg className={`tb-art tb-palm ${className}`} viewBox="0 0 420 640" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      {/* trunk */}
      <path d="M190 640 C196 520 182 360 210 150" className="tb-hair-bold" />
      <path d="M232 640 C230 520 214 360 222 152" className="tb-hair-bold" />
      {Array.from({ length: 22 }, (_, i) => {
        const y = 630 - i * 22;
        const k = i / 22;
        const x1 = 190 + 20 * k + Math.sin(k * 3) * 4;
        const x2 = 232 - 10 * k;
        return <path key={i} d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y - 7} ${x2} ${y}`} className="tb-hair-thin" />;
      })}
      {/* coconuts */}
      <circle cx="202" cy="166" r="11" className="tb-hair" />
      <circle cx="222" cy="170" r="11" className="tb-hair" />
      <circle cx="212" cy="184" r="10" className="tb-hair" />
      {/* fronds */}
      {fronds.map(({ a, l }, i) => {
        const rad = (a * Math.PI) / 180;
        const ex = top.x + Math.cos(rad) * l;
        const ey = top.y + Math.sin(rad) * l * 0.62 + l * 0.38;
        const mx = top.x + Math.cos(rad) * l * 0.5;
        const my = top.y + Math.sin(rad) * l * 0.5 - 18;
        const leaflets = Array.from({ length: 13 }, (_, j) => {
          const t = (j + 1) / 14;
          const px = (1 - t) * (1 - t) * top.x + 2 * (1 - t) * t * mx + t * t * ex;
          const py = (1 - t) * (1 - t) * top.y + 2 * (1 - t) * t * my + t * t * ey;
          const len = 26 * Math.sin(t * Math.PI) + 6;
          const n = rad + Math.PI / 2;
          return (
            <g key={j}>
              <path d={`M${px} ${py} L${px + Math.cos(n + 0.5) * len} ${py + Math.sin(n + 0.5) * len + 6}`} className="tb-hair-thin" />
              <path d={`M${px} ${py} L${px - Math.cos(n - 0.5) * len} ${py - Math.sin(n - 0.5) * len + 6}`} className="tb-hair-thin" />
            </g>
          );
        });
        return (
          <g key={i}>
            <path d={`M${top.x} ${top.y} Q${mx} ${my} ${ex} ${ey}`} className="tb-hair" />
            {leaflets}
          </g>
        );
      })}
    </svg>
  );
}

/** Engraved hibiscus: five veined petals and a long stamen. */
export function Hibiscus({ className = "", wash = true }: { className?: string; wash?: boolean }) {
  const petals = Array.from({ length: 5 }, (_, i) => i * 72);
  return (
    <svg className={`tb-art tb-hibiscus ${className}`} viewBox="-60 -60 120 120" aria-hidden>
      {petals.map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          <path d="M0 0 C-22 -10 -30 -38 -14 -50 C-6 -56 6 -56 14 -50 C30 -38 22 -10 0 0Z" className="tb-hair" fill={wash ? "color-mix(in srgb, var(--signal) 26%, transparent)" : "none"} />
          <path d="M0 -4 L0 -44 M0 -16 L-9 -32 M0 -16 L9 -32 M0 -28 L-6 -42 M0 -28 L6 -42" className="tb-hair-thin" />
        </g>
      ))}
      <path d="M0 0 C6 -14 10 -24 20 -34" className="tb-hair" />
      {[0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={14 + k * 1.6} cy={-26 - k * 2.4} r={1.4} className="tb-hair-thin" />
      ))}
    </svg>
  );
}

/** Layered hairline swell for the footer, in place of Amsterdam's canal. */
export function Swell() {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg className="tb-swell" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden>
      {rows.map((r) => {
        const y = 30 + r * 20;
        const amp = 10 - r;
        const len = 120 + r * 24;
        let d = `M-40 ${y}`;
        for (let x = -40; x < 1480; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
        return <path key={r} d={d} className={r % 2 ? "tb-hair-thin" : "tb-hair"} style={{ opacity: 1 - r * 0.12 }} />;
      })}
    </svg>
  );
}

/** Small motifs for the planning-passport visa stamps. */
export function Motif({ kind }: { kind: "hibiscus" | "palm" | "sun" | "shell" | "maraca" }) {
  return (
    <svg className="tb-motif" viewBox="-20 -20 40 40" aria-hidden>
      {kind === "hibiscus" &&
        [0, 72, 144, 216, 288].map((r) => <path key={r} transform={`rotate(${r})`} d="M0 0 C-7 -3 -9 -12 -4 -15 C-1 -17 1 -17 4 -15 C9 -12 7 -3 0 0Z" />)}
      {kind === "palm" && (
        <>
          <path d="M-2 18 C0 8 -2 0 2 -6" />
          <path d="M2 -6 C-6 -12 -14 -10 -17 -4 M2 -6 C10 -13 17 -10 18 -3 M2 -6 C0 -14 -6 -18 -11 -17 M2 -6 C6 -15 12 -17 15 -15" />
        </>
      )}
      {kind === "sun" && (
        <>
          <circle r="7" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <path key={i} d={`M${Math.cos(a) * 10} ${Math.sin(a) * 10} L${Math.cos(a) * 16} ${Math.sin(a) * 16}`} />;
          })}
        </>
      )}
      {kind === "shell" && (
        <>
          <path d="M0 14 C-16 6 -16 -12 0 -15 C16 -12 16 6 0 14Z" />
          <path d="M0 14 L-10 -9 M0 14 L-4 -14 M0 14 L4 -14 M0 14 L10 -9" />
        </>
      )}
      {kind === "maraca" && (
        <>
          <ellipse cx="-4" cy="-6" rx="7" ry="9" transform="rotate(-20 -4 -6)" />
          <path d="M-1 3 L4 17" />
          <ellipse cx="7" cy="-7" rx="6" ry="8" transform="rotate(18 7 -7)" />
          <path d="M5 1 L1 17" />
        </>
      )}
    </svg>
  );
}
