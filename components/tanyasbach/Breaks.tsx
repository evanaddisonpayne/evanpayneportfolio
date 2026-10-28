/**
 * Art breaks for /tanyasbach: full-width interludes between content sections.
 * All decorative (aria-hidden) except the neon line, which is real text.
 */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Sticker motifs: engraved plum outlines over flat fiesta fills.      */
/* ------------------------------------------------------------------ */

export type StickerKind = "cocktail" | "lips" | "disco" | "shades" | "lime" | "cherries" | "coupe" | "sparkle" | "palm" | "shell";

export function Sticker({ kind, className = "", style }: { kind: StickerKind; className?: string; style?: CSSProperties }) {
  return (
    <svg className={`tb-sticker ${className}`} viewBox="0 0 100 100" style={style} aria-hidden>
      {kind === "cocktail" && (
        <>
          <path d="M18 24 H82 L50 60 Z" fill="var(--lagoon)" />
          <path d="M24 30 H76" className="s-thin" />
          <path d="M50 60 V86 M34 88 H66" />
          <circle cx="76" cy="24" r="10" fill="var(--lime)" />
          <path d="M76 14 V34 M66 24 H86 M69 17 L83 31 M69 31 L83 17" className="s-thin" />
          <path d="M30 24 L22 6" />
          <path d="M10 14 Q22 0 36 10 Z" fill="var(--signal)" />
          <path d="M23 9 L22 6" className="s-thin" />
        </>
      )}
      {kind === "lips" && (
        <>
          <path d="M10 50 C22 30 38 30 50 42 C62 30 78 30 90 50 C74 54 62 55 50 55 C38 55 26 54 10 50 Z" fill="var(--signal)" />
          <path d="M10 50 C26 82 74 82 90 50 C74 58 26 58 10 50 Z" fill="var(--signal)" />
          <path d="M28 66 Q40 72 52 69" className="s-thin" stroke="var(--ivory)" />
          <path d="M14 50 Q50 60 86 50" className="s-thin" />
        </>
      )}
      {kind === "disco" && (
        <>
          <path d="M50 2 V18" />
          <circle cx="50" cy="52" r="34" fill="var(--sky)" />
          <ellipse cx="50" cy="52" rx="34" ry="12" className="s-thin" />
          <ellipse cx="50" cy="52" rx="34" ry="24" className="s-thin" />
          <path d="M16 52 H84" className="s-thin" />
          <ellipse cx="50" cy="52" rx="12" ry="34" className="s-thin" />
          <ellipse cx="50" cy="52" rx="24" ry="34" className="s-thin" />
          <path d="M50 18 V86" className="s-thin" />
          <path d="M34 36 h8 v8 h-8z M58 60 h8 v8 h-8z" fill="var(--ivory)" className="s-thin" />
          <path d="M86 14 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="var(--mango)" className="s-thin" />
        </>
      )}
      {kind === "shades" && (
        <>
          <path d="M8 40 Q50 30 92 40" />
          <path d="M28 70 C10 58 10 44 20 42 C26 41 28 46 28 46 C28 46 31 41 37 42 C47 44 46 58 28 70 Z" fill="var(--signal)" />
          <path d="M72 70 C54 58 53 44 63 42 C69 41 72 46 72 46 C72 46 74 41 80 42 C90 44 90 58 72 70 Z" fill="var(--signal)" />
          <path d="M22 48 Q26 46 28 50 M66 48 Q70 46 72 50" className="s-thin" stroke="var(--ivory)" />
        </>
      )}
      {kind === "lime" && (
        <>
          <circle cx="50" cy="50" r="38" fill="var(--lime)" />
          <circle cx="50" cy="50" r="31" fill="#e5f7b0" className="s-thin" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <path key={i} d={`M50 50 L${50 + Math.cos(a) * 31} ${50 + Math.sin(a) * 31}`} className="s-thin" />;
          })}
          <circle cx="50" cy="50" r="4" fill="var(--ivory)" className="s-thin" />
        </>
      )}
      {kind === "cherries" && (
        <>
          <path d="M34 66 C38 40 50 22 62 10 M68 70 C66 44 64 26 62 10" />
          <path d="M62 10 C72 4 86 8 90 18 C78 22 68 18 62 10 Z" fill="var(--lime)" />
          <circle cx="32" cy="74" r="16" fill="var(--signal)" />
          <circle cx="68" cy="78" r="16" fill="var(--signal)" />
          <path d="M24 68 Q28 64 32 66 M60 72 Q64 68 68 70" className="s-thin" stroke="var(--ivory)" />
        </>
      )}
      {kind === "coupe" && (
        <>
          <path d="M14 30 Q50 70 86 30 Z" fill="var(--mango)" />
          <path d="M14 30 H86" />
          <path d="M50 52 V88 M34 90 H66" />
          {[
            [40, 22],
            [52, 14],
            [60, 24],
            [46, 6],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="3" className="s-thin" />
          ))}
        </>
      )}
      {kind === "sparkle" && <path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill="var(--mango)" />}
      {kind === "palm" && (
        <>
          <path d="M48 96 C50 74 46 56 52 38" />
          <path d="M52 38 C38 24 18 26 8 38 C24 32 38 34 52 38 Z M52 38 C64 22 84 22 94 34 C78 30 64 32 52 38 Z M52 38 C46 20 32 8 18 8 C32 16 44 26 52 38 Z M52 38 C60 18 74 8 88 10 C74 16 62 26 52 38 Z" fill="var(--lagoon)" />
          <circle cx="50" cy="42" r="4" fill="#b5703c" />
          <circle cx="57" cy="43" r="4" fill="#b5703c" />
        </>
      )}
      {kind === "shell" && (
        <>
          <path d="M50 86 C14 70 12 26 50 16 C88 26 86 70 50 86 Z" fill="var(--coral)" />
          <path d="M50 86 L26 30 M50 86 L40 20 M50 86 L60 20 M50 86 L74 30" className="s-thin" />
          <path d="M40 86 H60" />
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee: two crossing tapes scrolling in opposite directions.       */
/* ------------------------------------------------------------------ */

export function Marquee({ a, b }: { a: string[]; b?: string[] }) {
  // Each run holds the list twice so it's wider than any screen; two runs back to back loop seamlessly.
  const run = (items: string[]) => {
    const list = [...items, ...items];
    const one = (p: string) =>
      list.map((t, i) => (
        <span key={`${p}${i}`} className="tb-mq-item">
          {t}
          <span className="tb-mq-star">✦</span>
        </span>
      ));
    return (
      <>
        <span className="tb-mq-run">{one("a")}</span>
        <span className="tb-mq-run">{one("b")}</span>
      </>
    );
  };
  return (
    <div className={`tb-marquee${b ? "" : " is-single"}`} aria-hidden>
      <div className="tb-mq tb-mq-a">{run(a)}</div>
      {b && <div className="tb-mq tb-mq-b">{run(b)}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Neon sign on a night-brick wall.                                   */
/* ------------------------------------------------------------------ */

export function Neon({ kicker, line, children }: { kicker: string; line: string; children?: ReactNode }) {
  return (
    <section className="tb-neon">
      <div className="wrap">
        <div className="tb-menu">
          <svg className="tb-menu-glass" viewBox="0 0 100 100" aria-hidden>
            <path d="M14 30 Q50 70 86 30 Z" />
            <path d="M14 30 H86 M50 52 V88 M34 90 H66" />
            <path d="M70 30 L84 8" />
            <circle cx="86" cy="6" r="4" />
            {[
              [40, 22],
              [52, 16],
              [60, 24],
            ].map(([x, y]) => (
              <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" />
            ))}
          </svg>
          <p className="tb-neon-kicker">{kicker}</p>
          <p className="tb-neon-line">{line}</p>
          <p className="tb-menu-foot">Tanya ’27 · House rules</p>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sticker sheet: a scattered field of motifs.                        */
/* ------------------------------------------------------------------ */

const FIELD: { k: StickerKind; x: number; y: number; s: number; r: number }[] = [
  { k: "cocktail", x: 4, y: 18, s: 120, r: -12 },
  { k: "lips", x: 20, y: 56, s: 96, r: 10 },
  { k: "sparkle", x: 17, y: 8, s: 44, r: 0 },
  { k: "disco", x: 33, y: 14, s: 130, r: 6 },
  { k: "lime", x: 47, y: 60, s: 84, r: -18 },
  { k: "shades", x: 53, y: 10, s: 124, r: -6 },
  { k: "sparkle", x: 66, y: 64, s: 38, r: 20 },
  { k: "cherries", x: 70, y: 26, s: 100, r: 14 },
  { k: "coupe", x: 83, y: 12, s: 112, r: -8 },
  { k: "shell", x: 88, y: 58, s: 80, r: 18 },
];

export function StickerSheet({ caption }: { caption?: string }) {
  return (
    <section className="tb-stickers" aria-hidden={!caption}>
      <div className="tb-stickers-field" aria-hidden>
        {FIELD.map((f, i) => (
          <Sticker
            key={i}
            kind={f.k}
            className="tb-sticker-peel"
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.s, height: f.s, "--r": `${f.r}deg`, "--i": i } as CSSProperties}
          />
        ))}
      </div>
      {caption && (
        <div className="wrap">
          <p className="tb-stickers-cap">{caption}</p>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Postcard collage: "Greetings from ¿Adónde?" + polaroids + stamp.     */
/* ------------------------------------------------------------------ */

export function Postcard() {
  return (
    <section className="tb-postcard-sec" aria-label="Postcard">
      <div className="wrap tb-postcard-stage">
        <div className="tb-polaroid tb-polaroid-1" aria-hidden>
          <svg viewBox="0 0 200 170">
            <defs>
              <linearGradient id="tb-sky1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ff8e6e" />
                <stop offset=".55" stopColor="#ffc94a" />
                <stop offset=".56" stopColor="#3ccfc0" />
                <stop offset="1" stopColor="#1fa89b" />
              </linearGradient>
            </defs>
            <rect width="200" height="170" fill="url(#tb-sky1)" />
            <circle cx="100" cy="94" r="30" fill="#ff5c93" />
            <rect y="94" width="200" height="76" fill="#3ccfc0" />
            {[104, 114, 126, 140, 156].map((y, i) => (
              <path key={y} d={`M${20 + i * 6} ${y} H${180 - i * 6}`} stroke="#fff8f0" strokeWidth="1.2" strokeDasharray={`${18 - i * 2} ${8 + i * 2}`} />
            ))}
            <path d="M140 92 L140 54 L162 86 Z" fill="#fff8f0" stroke="#2b0f2e" strokeWidth="1.2" />
            <path d="M130 92 H168 L162 100 H136 Z" fill="#2b0f2e" />
          </svg>
          <span>la puesta de sol</span>
        </div>

        <div className="tb-card">
          <div className="tb-card-left">
            <p className="tb-card-greet">Greetings from</p>
            <p className="tb-card-big" aria-label="¿Adónde?">
              {"¿ADÓNDE?".split("").map((ch, i) => (
                <span key={i} className={`tb-card-l tb-card-l${i % 4}`} aria-hidden>
                  {ch}
                </span>
              ))}
            </p>
            <p className="tb-card-note">Wish you were here. (You will be. Vote first.)</p>
          </div>
          <div className="tb-card-right" aria-hidden>
            <div className="tb-card-stamp">
              <Sticker kind="lime" />
              <span>27¢</span>
            </div>
            <div className="tb-card-postmark">
              <span>Mayo</span>
              <strong>2027</strong>
              <span>La Novia</span>
            </div>
            <div className="tb-card-lines">
              <span>Para: Tanya</span>
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="tb-polaroid tb-polaroid-2" aria-hidden>
          <svg viewBox="0 0 200 170">
            <rect width="200" height="170" fill="#d4f3f1" />
            <rect y="110" width="200" height="60" fill="#fff0c9" />
            <path d="M0 110 Q50 102 100 110 T200 110" stroke="#2b0f2e" strokeWidth="1.2" fill="#3ccfc0" />
            <g transform="translate(60 40) scale(.9)">
              <path d="M18 24 H82 L50 60 Z" fill="#ff5c93" stroke="#2b0f2e" strokeWidth="1.6" />
              <path d="M50 60 V86 M34 88 H66" stroke="#2b0f2e" strokeWidth="1.6" />
              <circle cx="76" cy="24" r="10" fill="#c6ec6a" stroke="#2b0f2e" strokeWidth="1.4" />
              <path d="M30 24 L22 6" stroke="#2b0f2e" strokeWidth="1.6" />
              <path d="M10 14 Q22 0 36 10 Z" fill="#ffc94a" stroke="#2b0f2e" strokeWidth="1.4" />
            </g>
            <path d="M150 170 C152 140 146 120 156 96 M156 96 C144 84 128 86 120 94 M156 96 C166 82 182 82 190 92 M156 96 C152 82 140 72 130 72" stroke="#2b0f2e" strokeWidth="1.4" fill="none" />
          </svg>
          <span>happy hour, all day</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Borders: Talavera tiles and a scalloped cabana awning.              */
/* ------------------------------------------------------------------ */

export function Talavera() {
  return (
    <svg className="tb-talavera" aria-hidden width="100%" height="72">
      <defs>
        <pattern id="tb-tile" width="72" height="72" patternUnits="userSpaceOnUse">
          <rect width="72" height="72" fill="#fbf8f3" />
          <rect x="1.5" y="1.5" width="69" height="69" fill="none" stroke="#2a1a22" strokeWidth=".6" />
          <path d="M0 0 A18 18 0 0 1 18 18 L0 18 Z M72 0 A18 18 0 0 0 54 18 L72 18 Z M0 72 A18 18 0 0 0 18 54 L0 54 Z M72 72 A18 18 0 0 1 54 54 L72 54 Z" fill="#c9dbd3" stroke="#2a1a22" strokeWidth=".6" />
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx="36" cy="22" rx="5" ry="12" transform={`rotate(${i * 45} 36 36)`} fill={i % 2 ? "#e6cf9c" : "#d9a6a0"} stroke="#2a1a22" strokeWidth=".6" />
          ))}
          <circle cx="36" cy="36" r="6" fill="#9e2a4f" stroke="#2a1a22" strokeWidth=".6" />
          <path d="M36 2 l4 6 -4 6 -4 -6 z M36 58 l4 6 -4 6 -4 -6 z M2 36 l6 -4 6 4 -6 4 z M58 36 l6 -4 6 4 -6 4 z" fill="#b08a3e" />
        </pattern>
      </defs>
      <rect width="100%" height="72" fill="url(#tb-tile)" />
    </svg>
  );
}

export function Awning({ tone = "signal" }: { tone?: "signal" | "lagoon" | "mango" }) {
  return <div className={`tb-awning tb-awning-${tone}`} aria-hidden />;
}

/* ------------------------------------------------------------------ */
/* Arch: a plaster wall, an arched window to the sea, palm shadows.   */
/* ------------------------------------------------------------------ */

export function Arch({ caption, kicker }: { caption: string; kicker?: string }) {
  return (
    <section className="tb-arch-sec">
      <div className="wrap tb-arch-grid">
        <svg className="tb-arch" viewBox="0 0 400 480" aria-hidden>
          <defs>
            <linearGradient id="tb-arch-sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#efc9b8" />
              <stop offset=".62" stopColor="#f2dcb6" />
              <stop offset=".63" stopColor="#4f8f88" />
              <stop offset="1" stopColor="#2f6d68" />
            </linearGradient>
            <clipPath id="tb-arch-clip">
              <path d="M80 470 V200 A120 120 0 0 1 320 200 V470 Z" />
            </clipPath>
            <filter id="tb-arch-blur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <rect width="400" height="480" fill="#efe6da" />
          <g clipPath="url(#tb-arch-clip)">
            <rect width="400" height="480" fill="url(#tb-arch-sky)" />
            <circle cx="200" cy="300" r="34" fill="#e7a07f" opacity=".9" />
            {[318, 336, 358, 384, 414].map((y, i) => (
              <path key={y} d={`M${100 + i * 4} ${y} H${300 - i * 4}`} stroke="#f6efe6" strokeWidth=".9" strokeDasharray={`${26 - i * 3} ${10 + i * 3}`} opacity=".7" />
            ))}
          </g>
          <path d="M80 470 V200 A120 120 0 0 1 320 200 V470" fill="none" stroke="#2a1a22" strokeWidth="1.2" />
          <path d="M66 470 V200 A134 134 0 0 1 334 200 V470" fill="none" stroke="#b08a3e" strokeWidth=".7" />
          <path d="M60 470 H340" stroke="#2a1a22" strokeWidth="1.2" />
          {/* palm frond shadow falling across the wall */}
          <g opacity=".16" filter="url(#tb-arch-blur)" fill="#2a1a22">
            <path d="M-20 40 C80 60 170 120 230 210 C200 150 120 90 -20 70 Z" />
            {Array.from({ length: 14 }, (_, i) => {
              const t = i / 14;
              const x = -10 + t * 230;
              const y = 50 + t * t * 150;
              return <path key={i} d={`M${x} ${y} l${-8 + t * 6} ${54 - t * 20} l10 2 Z`} />;
            })}
          </g>
        </svg>
        <div className="tb-arch-copy">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <p className="tb-arch-cap">{caption}</p>
        </div>
      </div>
    </section>
  );
}
