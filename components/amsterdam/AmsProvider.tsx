"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { days, sources, type Person } from "@/lib/amsterdam";
import { GezelligRain, ShelterMode } from "./Fun";
import { amsNow, load, save } from "./util";

const ME_KEY = "ams26-me";
const NASTY_KEY = "ams26-nasty";
const CHECK_KEY = "ams26-checks";

type Ctx = {
  now: Date | null;
  me: Person | null;
  pickMe: (p: Person) => void;
  nasty: boolean;
  setNastyMode: (on: boolean) => void;
  tapStamp: () => void;
  stampTapped: boolean;
  checks: Record<string, boolean>;
  toggleCheck: (id: string) => void;
  rain: () => void;
  shelter: () => void;
  todayId: string | null;
};

const AmsContext = createContext<Ctx | null>(null);
export function useAms() {
  const c = useContext(AmsContext);
  if (!c) throw new Error("useAms must be used inside AmsProvider");
  return c;
}

const TABS = [
  { href: "/amsterdam", label: "Home", icon: "⌂" },
  { href: "/amsterdam/plan", label: "Plan", icon: "☰" },
  { href: "/amsterdam/prep", label: "Prep", icon: "✓" },
  { href: "/amsterdam/guide", label: "Guide", icon: "☖" },
  { href: "/amsterdam/fun", label: "Fun", icon: "★" },
];

export default function AmsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/amsterdam";
  const [now, setNow] = useState<Date | null>(null);
  const [me, setMe] = useState<Person | null>(null);
  const [nasty, setNasty] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [rainTick, setRainTick] = useState(0);
  const [shelterTick, setShelterTick] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setNow(new Date());
    setMe(load<Person | null>(ME_KEY, null));
    setNasty(load<boolean>(NASTY_KEY, false));
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
  const setNastyMode = useCallback(
    (on: boolean) => {
      setNasty(on);
      save(NASTY_KEY, on);
      flash(on ? "🍆 Nasty Mode engaged. God help us." : "Nasty Mode off. Back to being respectable.");
    },
    [flash],
  );
  const tapStamp = useCallback(() => {
    const t = Date.now();
    const recent = [...taps.filter((x) => t - x < 3000), t];
    if (recent.length >= 5) {
      setTaps([]);
      setNastyMode(!nasty);
    } else {
      setTaps(recent);
      if (recent.length === 3) flash(nasty ? "Two more to calm down…" : "Keep going…");
    }
  }, [taps, nasty, setNastyMode, flash]);
  const toggleCheck = useCallback((id: string) => {
    setChecks((cur) => {
      const next = { ...cur, [id]: !cur[id] };
      save(CHECK_KEY, next);
      return next;
    });
  }, []);

  const todayId = useMemo(() => {
    if (!now) return null;
    const d = amsNow(now).date;
    return days.find((x) => x.date === d)?.id ?? null;
  }, [now]);

  const value: Ctx = {
    now,
    me,
    pickMe,
    nasty,
    setNastyMode,
    tapStamp,
    stampTapped: taps.length > 0,
    checks,
    toggleCheck,
    rain: () => setRainTick((t) => t + 1),
    shelter: () => setShelterTick((t) => t + 1),
    todayId,
  };

  const isActive = (href: string) => (href === "/amsterdam" ? pathname === href : pathname.startsWith(href));

  return (
    <AmsContext.Provider value={value}>
      <div className={`ams${nasty ? " is-nasty" : ""}`}>
        {nasty && (
          <button className="ams-nasty-bar" onClick={() => setNastyMode(false)}>
            <span aria-hidden>🍆</span> Nasty Mode is on. Tap here to be respectable again.
          </button>
        )}
        {toast && (
          <div className="ams-toast" role="status">
            {toast}
          </div>
        )}

        <header className="ams-nav">
          <div className="wrap ams-nav-inner">
            <Link href="/amsterdam" className="ams-nav-brand" aria-label="Amsterdam trip home">
              <span className="ams-nav-x" aria-hidden>✕✕✕</span>
              <span>
                Amsterdam <em>’26</em>
              </span>
            </Link>
            <nav className="ams-nav-links" aria-label="Trip sections">
              {TABS.map((t) => (
                <Link key={t.href} href={t.href} aria-current={isActive(t.href) ? "page" : undefined}>
                  <span className="ams-nav-icon" aria-hidden>{t.icon}</span>
                  <span>{t.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer ams-footer">
          <div className="canal" aria-hidden />
          <div className="wrap ams-foot">
            <div>
              <p className="eyebrow">Sources</p>
              <ul className="ams-sources">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="ams-hint">
              Facts checked October 9, 2026; the card and Tuesday plan were re-checked October 12. Hours and prices change, so reconfirm the week
              before. This site isn&apos;t indexed; share the link with the group only.
            </p>
          </div>
        </footer>

        <GezelligRain nasty={nasty} trigger={rainTick} />
        <ShelterMode nasty={nasty} trigger={shelterTick} />
      </div>
    </AmsContext.Provider>
  );
}
