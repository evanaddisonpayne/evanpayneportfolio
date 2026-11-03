/**
 * Line art for /turkscaicos. Ink outlines over flat island fills, same hand as /tanyasbach and /virgincruise.
 * Everything here is decorative (aria-hidden) unless a parent gives it a label.
 */
import type { CSSProperties } from "react";
import { PINS } from "@/lib/turkscaicos";

const FLAG_FILLS = ["var(--signal)", "var(--lagoon)", "var(--mango)", "var(--scarlet)", "var(--orchid)", "var(--coral)"];

/** Triangle pennants on a rope, swaying. */
export function Pennants({ count = 22 }: { count?: number }) {
  return (
    <div className="tc-pennants" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className="tc-pennant" viewBox="0 0 40 52" style={{ "--d": `${(i % 7) * -0.6}s` } as CSSProperties}>
          <path d="M2 2 H38 L20 48 Z" fill={FLAG_FILLS[i % FLAG_FILLS.length]} stroke="var(--oxblood)" strokeWidth="1.2" strokeLinejoin="round" />
          {i % 3 === 0 && <circle cx="20" cy="16" r="4" fill="var(--paper)" />}
          {i % 3 === 1 && <path d="M12 12 H28 M14 20 H26" stroke="var(--paper)" strokeWidth="2.2" strokeLinecap="round" />}
          {i % 3 === 2 && <path d="M20 9 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1 Z" fill="var(--paper)" />}
        </svg>
      ))}
    </div>
  );
}

/** A catamaran with a striped sail, for the hero horizon. */
export function Catamaran() {
  return (
    <svg className="tc-cat" viewBox="0 0 320 210" aria-hidden>
      {/* sail */}
      <path d="M152 12 L152 150 L58 150 Z" fill="var(--paper)" stroke="var(--oxblood)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M152 52 L104 110" stroke="var(--signal)" strokeWidth="9" opacity=".9" />
      <path d="M152 86 L126 120" stroke="var(--mango)" strokeWidth="9" opacity=".9" />
      <path d="M160 26 L160 150 L250 150 Z" fill="var(--scarlet)" stroke="var(--oxblood)" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="178" y="138" fontFamily="var(--display)" fontStyle="italic" fontSize="17" fill="#fff">T ’27</text>
      {/* mast + flag */}
      <path d="M156 4 V160" stroke="var(--oxblood)" strokeWidth="2.4" />
      <path d="M156 4 L184 10 L156 16 Z" fill="var(--mango)" stroke="var(--oxblood)" strokeWidth="1" />
      {/* deck + twin hulls */}
      <path d="M40 158 H272 L262 170 H50 Z" fill="var(--paper)" stroke="var(--oxblood)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M24 170 H140 Q132 192 112 194 H46 Q30 190 24 170 Z" fill="var(--navy)" stroke="var(--oxblood)" strokeWidth="1.6" />
      <path d="M176 170 H296 Q288 192 268 194 H200 Q184 190 176 170 Z" fill="var(--navy)" stroke="var(--oxblood)" strokeWidth="1.6" />
      <path d="M36 180 H128 M188 180 H284" stroke="var(--lagoon)" strokeWidth="3" />
      {/* tiny people on deck */}
      {[78, 98, 214, 236].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={150} r="5" fill={["var(--signal)", "var(--mango)", "var(--coral)", "var(--lagoon)"][i]} stroke="var(--oxblood)" />
          <path d={`M${x} 155 V158`} stroke="var(--oxblood)" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

/** Two layers of rolling water along the bottom of the hero. */
export function Waves() {
  return (
    <svg className="tc-waves" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
      <path className="tc-wave tc-wave-a" d="M-40 40 Q60 10 160 40 T360 40 T560 40 T760 40 T960 40 T1160 40 T1360 40 T1560 40 V100 H-40 Z" />
      <path className="tc-wave tc-wave-b" d="M-40 66 Q60 40 160 66 T360 66 T560 66 T760 66 T960 66 T1160 66 T1360 66 T1560 66 V100 H-40 Z" />
    </svg>
  );
}

/** Splash drops thrown up when you tap the boat. */
export function Splash() {
  return (
    <span className="tc-splash" aria-hidden>
      {Array.from({ length: 7 }, (_, i) => (
        <i key={i} style={{ "--a": `${-70 + i * 23}deg` } as CSSProperties} />
      ))}
    </span>
  );
}

/** A hand-drawn, not-to-scale Providenciales with the trip's pins. Highlights the pins in `active`. */
export function ProvoMap({ active = [], onPin }: { active?: string[]; onPin?: (id: string) => void }) {
  return (
    <svg className="tc-map" viewBox="0 0 1000 400" role="img" aria-label="Sketch map of Providenciales with the trip's stops: the villa and Grace Bay on the north shore, Half Moon Bay by boat to the northeast, the Fish Fry in The Bight, Da Conch Shack in Blue Hills, the airport in the middle, and Chalk Sound and Five Cays in the southwest.">
      <rect width="1000" height="400" fill="var(--sky)" />
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 12 }, (_, c) => (
          <path
            key={`${r}-${c}`}
            d={`M${c * 90 + (r % 2) * 45} ${r * 46 + 20} q8 -6 16 0 t16 0`}
            fill="none"
            stroke="color-mix(in srgb, var(--navy) 22%, transparent)"
            strokeWidth="1"
          />
        )),
      )}
      {/* reef line off the north shore */}
      <path d="M120 112 Q300 70 520 108 T880 70" fill="none" stroke="var(--lagoon)" strokeWidth="5" strokeDasharray="2 10" strokeLinecap="round" />
      {/* Provo, roughly */}
      <path
        className="tc-map-land"
        d="M90 236 Q96 196 150 188 Q210 182 250 158 Q300 132 380 150 Q470 168 560 160 Q650 150 720 136 Q790 120 840 140 Q880 158 860 196 Q840 230 780 232 Q720 236 690 262 Q650 300 580 300 Q520 300 480 330 Q430 362 360 350 Q300 340 270 316 Q246 296 200 312 Q150 326 118 300 Q84 274 90 236 Z"
      />
      {/* Chalk Sound */}
      <path d="M150 300 Q170 270 220 278 Q260 286 250 304 Q236 320 196 318 Q160 316 150 300 Z" fill="var(--lagoon)" stroke="var(--oxblood)" strokeWidth="1.2" />
      {/* the cays toward North Caicos */}
      <path className="tc-map-land" d="M880 106 Q900 90 924 96 Q936 104 922 114 Q900 120 880 106 Z" />
      <path className="tc-map-land" d="M940 84 Q958 74 978 80 Q986 90 970 96 Q952 98 940 84 Z" />
      {/* boat route to Half Moon Bay */}
      <path d="M700 158 Q800 120 900 96" fill="none" stroke="var(--scarlet)" strokeWidth="2.4" strokeDasharray="7 7" className="tc-map-route" />
      {/* compass */}
      <g transform="translate(70 70)">
        <circle r="26" fill="var(--paper)" stroke="var(--oxblood)" strokeWidth="1.2" />
        <path d="M0 -20 L6 0 L0 20 L-6 0 Z" fill="var(--signal)" stroke="var(--oxblood)" strokeWidth="1" />
        <text y="-30" textAnchor="middle" fontFamily="var(--caps)" fontWeight="700" fontSize="13" fill="var(--oxblood)">N</text>
      </g>
      <text x="500" y="384" textAnchor="middle" fontFamily="var(--display)" fontStyle="italic" fontSize="18" fill="var(--oxblood)">
        Providenciales, roughly · not to scale
      </text>
      {PINS.map((p) => {
        const on = active.includes(p.id);
        const above = p.id === "fivecays" || p.id === "pls" || p.id === "chalksound";
        return (
          <g
            key={p.id}
            className={`tc-pin${on ? " is-on" : ""}`}
            transform={`translate(${p.x} ${p.y})`}
            onClick={onPin ? () => onPin(p.id) : undefined}
          >
            <path d="M0 0 C-12 -16 -12 -30 0 -32 C12 -30 12 -16 0 0 Z" stroke="var(--oxblood)" strokeWidth="1.4" />
            <circle cy="-21" r="4.5" fill="var(--paper)" />
            <text y={above ? 22 : -42} textAnchor="middle" className="tc-pin-label">
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** A queen conch, used as the Conch of Fate spinner. */
export function Conch() {
  return (
    <svg className="tc-conch-svg" viewBox="0 0 220 220" aria-hidden>
      <path
        d="M110 18 L128 46 L160 40 L158 74 L190 86 L170 112 L192 140 Q170 180 120 196 Q70 206 46 176 Q26 150 40 116 L24 92 L54 78 L52 46 L84 50 Z"
        fill="#f6d2bf"
        stroke="var(--oxblood)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M74 120 Q86 80 128 82 Q166 92 158 136 Q148 176 104 180 Q76 176 74 150 Q76 128 100 128 Q122 130 120 148" fill="none" stroke="var(--oxblood)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M96 132 Q118 104 146 120 Q160 150 128 168 Q100 176 92 150 Z" fill="var(--signal)" opacity=".75" />
      {[
        [110, 30],
        [150, 52],
        [176, 92],
        [36, 98],
        [62, 56],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="var(--paper)" stroke="var(--oxblood)" />
      ))}
    </svg>
  );
}

/** A Turks and Caicos rock iguana, peeking up. */
export function Iguana() {
  return (
    <svg className="tc-iguana-svg" viewBox="0 0 200 120" aria-hidden>
      <path d="M10 118 Q30 70 80 58 Q120 50 150 60 Q186 70 190 92 Q192 108 170 110 L150 112 Q140 118 120 118 Z" fill="#9aa66a" stroke="var(--oxblood)" strokeWidth="2" strokeLinejoin="round" />
      {/* spines */}
      <path d="M60 64 L66 50 L72 62 L80 46 L86 60 L96 44 L100 58 L110 44 L114 58 L124 46 L126 60" fill="#7d8a52" stroke="var(--oxblood)" strokeWidth="1.4" strokeLinejoin="round" />
      {/* jowl */}
      <path d="M150 104 Q156 120 140 118" fill="#c5c98f" stroke="var(--oxblood)" strokeWidth="1.4" />
      <circle cx="166" cy="80" r="7" fill="#fff" stroke="var(--oxblood)" strokeWidth="1.6" />
      <circle className="tc-iguana-eye" cx="168" cy="80" r="3.2" fill="var(--oxblood)" />
      <path d="M176 98 Q184 100 188 96" fill="none" stroke="var(--oxblood)" strokeWidth="1.4" strokeLinecap="round" />
      {/* sunglasses, obviously */}
      <path d="M154 74 H180 M156 74 Q156 88 166 88 Q176 88 178 74" fill="color-mix(in srgb, var(--oxblood) 85%, transparent)" stroke="var(--oxblood)" strokeWidth="1.4" className="tc-iguana-shades" />
    </svg>
  );
}

/** The villa: white house, pool, two palms, a flamingo float. */
export function VillaArt() {
  return (
    <svg className="tc-villa-art" viewBox="0 0 520 360" aria-hidden>
      <rect x="0" y="0" width="520" height="360" fill="var(--sky)" />
      <circle cx="420" cy="78" r="44" fill="var(--mango)" stroke="var(--oxblood)" strokeWidth="1.6" />
      {/* house */}
      <path d="M90 230 V140 L190 92 L290 140 V230 Z" fill="var(--paper)" stroke="var(--oxblood)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M78 146 L190 86 L302 146" fill="none" stroke="var(--scarlet)" strokeWidth="8" strokeLinejoin="round" />
      <path d="M290 230 V164 H420 V230" fill="var(--paper)" stroke="var(--oxblood)" strokeWidth="2" />
      <path d="M284 168 H426" stroke="var(--scarlet)" strokeWidth="8" />
      {/* arched doors + windows */}
      {[118, 166, 214].map((x) => (
        <path key={x} d={`M${x} 230 V190 Q${x + 16} 168 ${x + 32} 190 V230`} fill="var(--lagoon)" stroke="var(--oxblood)" strokeWidth="1.6" />
      ))}
      {[310, 360].map((x) => (
        <rect key={x} x={x} y="182" width="34" height="30" fill="var(--sky)" stroke="var(--oxblood)" strokeWidth="1.6" />
      ))}
      <circle cx="190" cy="132" r="12" fill="var(--sky)" stroke="var(--oxblood)" strokeWidth="1.6" />
      {/* terrace + pool */}
      <rect x="40" y="230" width="440" height="18" fill="#f3e3cc" stroke="var(--oxblood)" strokeWidth="1.6" />
      <path d="M70 248 H450 Q462 300 430 316 H90 Q58 300 70 248 Z" fill="#5fd3e0" stroke="var(--oxblood)" strokeWidth="1.8" />
      <path d="M96 272 Q130 264 164 272 T232 272 T300 272 T368 272 T420 272" fill="none" stroke="#fff" strokeWidth="2" opacity=".8" />
      <path d="M110 296 Q150 288 190 296 T270 296 T350 296 T410 296" fill="none" stroke="#fff" strokeWidth="2" opacity=".6" />
      {/* flamingo float */}
      <g className="tc-float">
        <ellipse cx="330" cy="284" rx="34" ry="12" fill="#ff8fb3" stroke="var(--oxblood)" strokeWidth="1.6" />
        <path d="M354 282 Q366 250 352 238 Q344 232 340 242" fill="none" stroke="#ff8fb3" strokeWidth="9" strokeLinecap="round" />
        <path d="M354 282 Q366 250 352 238 Q344 232 340 242" fill="none" stroke="var(--oxblood)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M338 242 l-8 4" stroke="var(--oxblood)" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* palms */}
      {[
        [470, 300, 1],
        [40, 300, -1],
      ].map(([x, y, f]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${f} 1)`}>
          <path d="M0 0 Q-8 -90 10 -170" fill="none" stroke="#8a5a3c" strokeWidth="10" strokeLinecap="round" />
          <path d="M0 0 Q-8 -90 10 -170" fill="none" stroke="var(--oxblood)" strokeWidth="1.2" />
          {[-150, -110, -60, -20, 20].map((a, i) => (
            <path
              key={a}
              d="M10 -170 Q40 -196 76 -176 Q46 -178 10 -170 Z"
              transform={`rotate(${a + 60} 10 -170)`}
              fill={i % 2 ? "#2f9e5c" : "#47b86f"}
              stroke="var(--oxblood)"
              strokeWidth="1.2"
            />
          ))}
        </g>
      ))}
      <rect x="0" y="316" width="520" height="44" fill="#f3e3cc" />
      <path d="M0 316 H520" stroke="var(--oxblood)" strokeWidth="1.6" />
    </svg>
  );
}
