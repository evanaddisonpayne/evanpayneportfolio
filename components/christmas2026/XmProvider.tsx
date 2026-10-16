"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { days, sources, type Person } from "@/lib/christmas2026";
import { LetItSnow, SleighRide } from "./Fun";
import { BASE, load, sbNow, save } from "./util";

const ME_KEY = "xm26-me";
const SWEATER_KEY = "xm26-sweater";
const CHECK_KEY = "xm26-checks";

type Ctx = {
  now: Date | null;
  me: Person | null;
  pickMe: (p: Person) => void;
  sweater: boolean;
  setSweaterMode: (on: boolean) => void;
  tapOrnament: () => void;
  ornamentTapped: boolean;
  checks: Record<string, boolean>;
  toggleCheck: (id: string) => void;
  snow: () => void;
  sleigh: () => void;
  todayId: string | null;
};

const XmContext = createContext<Ctx | null>(null);
export function useXm() {
  const c = useContext(XmContext);
  if (!c) throw new Error("useXm must be used inside XmProvider");
  return c;
}

const TABS = [
  { href: BASE, label: "Home", icon: "⌂" },
  { href: `${BASE}/plan`, label: "Plan", icon: "☰" },
  { href: `${BASE}/prep`, label: "Prep", icon: "✓" },
  { href: `${BASE}/guide`, label: "Guide", icon: "❄" },
  { href: `${BASE}/fun`, label: "Fun", icon: "★" },
];

export default function XmProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || BASE;
  const [now, setNow] = useState<Date | null>(null);
  const [me, setMe] = useState<Person | null>(null);
  const [sweater, setSweater] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [snowTick, setSnowTick] = useState(0);
  const [sleighTick, setSleighTick] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setNow(new Date());
    setMe(load<Person | null>(ME_KEY, null));
    setSweater(load<boolean>(SWEATER_KEY, false));
    setChecks(load<Record<string, boolean>>(CHECK_KEY, {}));
    const t = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const pickMe = useCallback((p: Person) => {
    setMe((cur) => {
      const next = cur === p ? null : p;
      save(ME_KEY, next);
      return next;
    });
  }, []);
  const setSweaterMode = useCallback(
    (on: boolean) => {
      setSweater(on);
      save(SWEATER_KEY, on);
      flash(on ? "🧶 Ugly Sweater Mode is on. Very festive. Very itchy." : "Sweater off. Back to tasteful.");
    },
    [flash],
  );
  const tapOrnament = useCallback(() => {
    const t = Date.now();
    const recent = [...taps.filter((x) => t - x < 3000), t];
    if (recent.length >= 5) {
      setTaps([]);
      setSweaterMode(!sweater);
    } else {
      setTaps(recent);
      if (recent.length === 3) flash(sweater ? "Two more to take it off…" : "Keep going…");
    }
  }, [taps, sweater, setSweaterMode, flash]);
  const toggleCheck = useCallback((id: string) => {
    setChecks((cur) => {
      const next = { ...cur, [id]: !cur[id] };
      save(CHECK_KEY, next);
      return next;
    });
  }, []);

  const todayId = useMemo(() => {
    if (!now) return null;
    const d = sbNow(now).date;
    return days.find((x) => x.date === d)?.id ?? null;
  }, [now]);

  const value: Ctx = {
    now,
    me,
    pickMe,
    sweater,
    setSweaterMode,
    tapOrnament,
    ornamentTapped: taps.length > 0,
    checks,
    toggleCheck,
    snow: () => setSnowTick((t) => t + 1),
    sleigh: () => setSleighTick((t) => t + 1),
    todayId,
  };

  const isActive = (href: string) => (href === BASE ? pathname === href : pathname.startsWith(href));

  return (
    <XmContext.Provider value={value}>
      <div className={`xm${sweater ? " is-sweater" : ""}`}>
        {sweater && (
          <button className="xm-sweater-bar" onClick={() => setSweaterMode(false)}>
            <span aria-hidden>🧶</span> Ugly Sweater Mode is on. Tap here to take it off.
          </button>
        )}
        {toast && (
          <div className="xm-toast" role="status">
            {toast}
          </div>
        )}

        <header className="xm-nav">
          <div className="wrap xm-nav-inner">
            <Link href={BASE} className="xm-nav-brand" aria-label="Christmas trip home">
              <span className="xm-nav-x" aria-hidden>❄ ❄ ❄</span>
              <span>
                Steamboat <em>’26</em>
              </span>
            </Link>
            <nav className="xm-nav-links" aria-label="Trip sections">
              {TABS.map((t) => (
                <Link key={t.href} href={t.href} aria-current={isActive(t.href) ? "page" : undefined}>
                  <span className="xm-nav-icon" aria-hidden>{t.icon}</span>
                  <span>{t.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer xm-footer">
          <Ridge />
          <div className="wrap xm-foot">
            <div>
              <p className="eyebrow">Sources</p>
              <ul className="xm-sources">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="xm-hint">
              Facts checked October 16, 2026. Nothing is booked yet: flights, the house and reservations are the plan. Hours and prices
              change, so reconfirm the week before. This site isn&apos;t indexed; share the link with the family only.
            </p>
          </div>
        </footer>

        <LetItSnow sweater={sweater} trigger={snowTick} />
        <SleighRide trigger={sleighTick} />
      </div>
    </XmContext.Provider>
  );
}

/** A hand-drawn mountain ridge with snowcaps, in place of the Amsterdam canal. */
function Ridge() {
  return (
    <svg className="xm-ridge" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden>
      <path
        className="xm-ridge-back"
        d="M0 180 L0 120 L90 88 L170 112 L260 54 L340 98 L420 70 L520 112 L610 40 L700 92 L790 66 L880 104 L980 30 L1080 96 L1170 62 L1260 108 L1350 72 L1440 98 L1440 180 Z"
      />
      <path
        className="xm-ridge-front"
        d="M0 180 L0 150 L120 112 L210 140 L330 84 L450 136 L560 100 L680 146 L800 92 L930 140 L1040 108 L1160 150 L1290 104 L1440 138 L1440 180 Z"
      />
      <path className="xm-ridge-snow" d="M245 62 L260 54 L276 66 L268 64 L260 70 L252 64 Z M596 48 L610 40 L626 52 L617 50 L610 57 L602 51 Z M965 38 L980 30 L996 42 L987 40 L980 47 L972 41 Z" />
      <path className="xm-ridge-snow" d="M316 92 L330 84 L346 96 L337 94 L330 101 L322 95 Z M786 100 L800 92 L816 104 L807 102 L800 109 L792 103 Z M1276 112 L1290 104 L1306 116 L1297 114 L1290 121 L1282 115 Z" />
    </svg>
  );
}
