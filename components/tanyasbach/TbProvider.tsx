"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { BASE, sources, type FormKind } from "@/lib/tanyasbach";
import { Swell } from "./Art";
import { load, save } from "./util";

const NAME_KEY = "tb27-name";
const DONE_KEY = "tb27-done";
const FIESTA_KEY = "tb27-fiesta";

type Ctx = {
  now: Date | null;
  name: string;
  setName: (n: string) => void;
  done: Partial<Record<FormKind, string>>;
  markDone: (k: FormKind) => void;
  flash: (msg: string) => void;
  fiesta: boolean;
  setFiestaMode: (on: boolean) => void;
  tapStamp: () => void;
  stampTapped: boolean;
  confetti: () => void;
};

const TbContext = createContext<Ctx | null>(null);
export function useTb() {
  const c = useContext(TbContext);
  if (!c) throw new Error("useTb must be used inside TbProvider");
  return c;
}

const TABS = [
  { href: BASE, label: "Home", icon: "⌂" },
  { href: `${BASE}/rsvp`, label: "RSVP", icon: "✉" },
  { href: `${BASE}/vote`, label: "Vote", icon: "✓" },
  { href: `${BASE}/islands`, label: "Islands", icon: "☀" },
  { href: `${BASE}/results`, label: "En vivo", icon: "◉" },
];

export default function TbProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || BASE;
  const [now, setNow] = useState<Date | null>(null);
  const [name, setNameState] = useState("");
  const [done, setDone] = useState<Partial<Record<FormKind, string>>>({});
  const [fiesta, setFiesta] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [confettiTick, setConfettiTick] = useState(0);

  useEffect(() => {
    setNow(new Date());
    setNameState(load<string>(NAME_KEY, ""));
    setDone(load<Partial<Record<FormKind, string>>>(DONE_KEY, {}));
    setFiesta(load<boolean>(FIESTA_KEY, false));
    const t = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const setName = useCallback((n: string) => {
    setNameState(n);
    save(NAME_KEY, n);
  }, []);

  const markDone = useCallback((k: FormKind) => {
    setDone((cur) => {
      const next = { ...cur, [k]: new Date().toISOString() };
      save(DONE_KEY, next);
      return next;
    });
  }, []);

  const confetti = useCallback(() => setConfettiTick((t) => t + 1), []);

  const setFiestaMode = useCallback(
    (on: boolean) => {
      setFiesta(on);
      save(FIESTA_KEY, on);
      if (on) setConfettiTick((t) => t + 1);
      flash(on ? "💃 Modo Fiesta: activado. Que empiece la fiesta." : "Fiesta Mode off. Back to planning like adults.");
    },
    [flash],
  );

  const tapStamp = useCallback(() => {
    const t = Date.now();
    const recent = [...taps.filter((x) => t - x < 3000), t];
    if (recent.length >= 5) {
      setTaps([]);
      setFiestaMode(!fiesta);
    } else {
      setTaps(recent);
      if (recent.length === 3) flash(fiesta ? "Dos más para calmarse…" : "Sigue… keep going…");
    }
  }, [taps, fiesta, setFiestaMode, flash]);

  const isActive = (href: string) => (href === BASE ? pathname === href : pathname.startsWith(href));

  const value: Ctx = { now, name, setName, done, markDone, flash, fiesta, setFiestaMode, tapStamp, stampTapped: taps.length > 0, confetti };

  return (
    <TbContext.Provider value={value}>
      <div className={`tb${fiesta ? " is-fiesta" : ""}`}>
        {fiesta && (
          <button className="tb-fiesta-bar" onClick={() => setFiestaMode(false)}>
            <span aria-hidden>💃</span> Modo Fiesta is on. Tap here to calm down.
          </button>
        )}
        {toast && (
          <div className="tb-toast" role="status">
            {toast}
          </div>
        )}

        <header className="tb-nav">
          <div className="wrap tb-nav-inner">
            <Link href={BASE} className="tb-nav-brand" aria-label="Tanya's bachelorette home">
              <span className="tb-nav-x" aria-hidden>✿ ✿ ✿</span>
              <span>
                Tanya <em>’27</em>
              </span>
            </Link>
            <nav className="tb-nav-links" aria-label="Trip sections">
              {TABS.map((t) => (
                <Link key={t.href} href={t.href} aria-current={isActive(t.href) ? "page" : undefined}>
                  <span className="tb-nav-icon" aria-hidden>{t.icon}</span>
                  <span>{t.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer tb-footer">
          <Swell />
          <div className="wrap tb-foot">
            <div>
              <p className="eyebrow">Sources</p>
              <ul className="tb-sources">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="tb-hint">
              Destination facts checked October 27, 2026. Nothing is booked yet, and entry rules change, so we&apos;ll reconfirm before anyone buys a
              flight. This site isn&apos;t indexed; share the link with the group only.
            </p>
          </div>
        </footer>

        <Confetti trigger={confettiTick} fiesta={fiesta} />
      </div>
    </TbContext.Provider>
  );
}

const BITS = ["✿", "❀", "✦", "◆", "☀", "♥"];
const COLORS = ["var(--signal)", "var(--mango)", "var(--lagoon)", "var(--lime)", "var(--coral)", "var(--orchid)"];

/** Hibiscus-and-paper confetti, fired on a form submit or by Modo Fiesta. */
function Confetti({ trigger, fiesta }: { trigger: number; fiesta: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; delay: number; dur: number; size: number; bit: string; color: string }[]>([]);
  useEffect(() => {
    if (!trigger) return;
    const n = fiesta ? 90 : 46;
    setPieces(
      Array.from({ length: n }, (_, i) => ({
        id: trigger * 1000 + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        dur: 2.4 + Math.random() * 2.2,
        size: 14 + Math.random() * 18,
        bit: BITS[i % BITS.length],
        color: COLORS[i % COLORS.length],
      })),
    );
    const t = window.setTimeout(() => setPieces([]), 5600);
    return () => window.clearTimeout(t);
  }, [trigger, fiesta]);
  if (!pieces.length) return null;
  return (
    <div className="tb-confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, fontSize: p.size, color: p.color } as CSSProperties}
        >
          {p.bit}
        </span>
      ))}
    </div>
  );
}
