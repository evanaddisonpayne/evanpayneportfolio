"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NOCHE_EVENT } from "./NocheLoca";

const ITEMS = [
  { t: "SPF 50", note: "reapply, ladies" },
  { t: "A very small swimsuit", note: "or two" },
  { t: "One good dress", note: "and a backup" },
  { t: "Heart-shaped sunnies" },
  { t: "Questionable decisions" },
  { t: "Tanya", note: "♥", last: true },
];

/** The packing list: a sunset arch on the left, a hotel-notepad checklist on the right that ticks itself off in view. */
export default function PackingList() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`tb-pack${inView ? " is-in" : ""}`} aria-labelledby="tb-pack-h">
      <div className="tb-pack-stripe" aria-hidden />
      <div className="wrap tb-pack-grid">
        <figure className="tb-pack-art" aria-hidden>
          <SunsetWindow />
        </figure>

        <div className="tb-pack-card">
          <span className="tb-pack-tape" aria-hidden />
          <p className="tb-pack-k">Packing list · Tanya ’27</p>
          <h2 className="tb-pack-h" id="tb-pack-h">
            Pack light. <em>Pack cute.</em>
          </h2>
          <ul className="tb-pack-list">
            {ITEMS.map((it, i) => (
              <li key={it.t} className={it.last ? "is-last" : undefined} style={{ "--i": i } as CSSProperties}>
                <span className="tb-pack-box" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path d="M4 13 L10 19 L21 4" />
                  </svg>
                </span>
                <span className="tb-pack-item">
                  <span className="tb-pack-t">{it.t}</span>
                  {it.note && <span className="tb-pack-note">{it.note}</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="tb-pack-ps">P.S. Leave room in the suitcase. Duty free is calling.</p>
          <button type="button" className="tb-pack-kissbtn" aria-label="A lipstick kiss. Go on, tap it." onClick={() => window.dispatchEvent(new Event(NOCHE_EVENT))}>
          <svg className="tb-pack-kiss" viewBox="0 0 100 70" aria-hidden>
            <path d="M6 34 C18 14 36 14 50 26 C64 14 82 14 94 34 C78 39 64 40 50 40 C36 40 22 39 6 34 Z" />
            <path d="M6 36 C22 66 78 66 94 36 C78 44 22 44 6 36 Z" />
            <path className="tb-pack-kiss-line" d="M24 50 Q38 56 52 53 M58 22 Q66 18 74 22 M30 22 Q36 19 42 22" />
          </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/** Arched window at golden hour: hot sunset, turquoise sea, palm shadow, and a little still life on the sill. */
function SunsetWindow() {
  return (
    <svg className="tb-pack-svg" viewBox="0 0 420 520">
      <defs>
        <linearGradient id="tbp-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ff5c93" />
          <stop offset=".38" stopColor="#ff8e6e" />
          <stop offset=".6" stopColor="#ffc94a" />
          <stop offset=".605" stopColor="#1fb5a8" />
          <stop offset="1" stopColor="#0e7f76" />
        </linearGradient>
        <clipPath id="tbp-clip">
          <path d="M70 430 V210 A140 140 0 0 1 350 210 V430 Z" />
        </clipPath>
        <filter id="tbp-soft">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <pattern id="tbp-shine" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1.6" fill="#fff" opacity=".35" />
        </pattern>
      </defs>

      {/* plaster wall */}
      <rect width="420" height="520" fill="#fdeee6" />
      <g clipPath="url(#tbp-clip)">
        <rect width="420" height="520" fill="url(#tbp-sky)" />
        <circle cx="210" cy="312" r="46" fill="#fff3c4" />
        <circle cx="210" cy="312" r="46" fill="#ffe08a" opacity=".6" />
        {[322, 340, 362, 388, 418].map((y, i) => (
          <path key={y} d={`M${96 + i * 6} ${y} H${324 - i * 6}`} stroke="#fff" strokeWidth="1.4" strokeDasharray={`${30 - i * 4} ${10 + i * 3}`} opacity=".75" />
        ))}
        {/* distant sailboat */}
        <path d="M282 312 L282 280 L300 308 Z" fill="#fff" stroke="#1e1b2e" strokeWidth="1" />
        <path d="M274 312 H306 L300 318 H280 Z" fill="#1e1b2e" />
      </g>
      <path d="M70 430 V210 A140 140 0 0 1 350 210 V430" fill="none" stroke="#1e1b2e" strokeWidth="1.6" />
      <path d="M56 430 V210 A154 154 0 0 1 364 210 V430" fill="none" stroke="#c79a2e" strokeWidth="1" />

      {/* palm shadow across the wall */}
      <g opacity=".2" filter="url(#tbp-soft)" fill="#7a1f45">
        <path d="M-20 30 C90 50 190 120 252 220 C214 150 128 82 -20 62 Z" />
        {Array.from({ length: 15 }, (_, i) => {
          const t = i / 15;
          const x = -12 + t * 250;
          const y = 42 + t * t * 170;
          return <path key={i} d={`M${x} ${y} l${-9 + t * 6} ${58 - t * 22} l11 2 Z`} />;
        })}
      </g>

      {/* the sill */}
      <rect x="40" y="430" width="340" height="18" fill="#fff" stroke="#1e1b2e" strokeWidth="1.4" />
      <rect x="40" y="448" width="340" height="6" fill="#1e1b2e" opacity=".12" />

      {/* sun hat */}
      <g stroke="#1e1b2e" strokeWidth="1.4" strokeLinejoin="round">
        <ellipse cx="112" cy="424" rx="60" ry="10" fill="#f7d58a" />
        <path d="M82 424 C82 396 142 396 142 424 Z" fill="#f7d58a" />
        <path d="M84 414 C100 418 124 418 140 414" stroke="#e23c78" strokeWidth="5" fill="none" />
        <path d="M60 422 Q112 432 164 422" fill="none" strokeWidth=".8" opacity=".5" />
      </g>

      {/* heart sunnies */}
      <g stroke="#1e1b2e" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M188 410 Q216 404 244 410" fill="none" />
        <path d="M200 428 C188 420 188 410 194 409 C198 408 200 412 200 412 C200 412 202 408 206 409 C212 410 212 420 200 428 Z" fill="#e23c78" />
        <path d="M232 428 C220 420 220 410 226 409 C230 408 232 412 232 412 C232 412 234 408 238 409 C244 410 244 420 232 428 Z" fill="#e23c78" />
        <path d="M195 413 Q197 411 199 414 M227 413 Q229 411 231 414" stroke="#fff" strokeWidth="1" fill="none" />
      </g>

      {/* coupe with a cherry */}
      <g stroke="#1e1b2e" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M282 384 Q308 410 334 384 Z" fill="#ff8e6e" />
        <path d="M282 384 H334" fill="none" />
        <path d="M282 384 Q308 410 334 384 Z" fill="url(#tbp-shine)" stroke="none" />
        <path d="M308 398 V428 M294 430 H322" fill="none" />
        <path d="M322 384 C324 372 330 366 336 362" fill="none" />
        <circle cx="320" cy="386" r="6" fill="#c2185b" />
      </g>
    </svg>
  );
}
