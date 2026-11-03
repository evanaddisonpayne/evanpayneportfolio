"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { BASE, PAGES, TRIP_SITE, sources } from "@/lib/turkscaicos";
import ClubMode from "./ClubMode";

type Ctx = {
  flash: (msg: string) => void;
  confetti: (bits?: string[]) => void;
  steelPan: () => void;
  openClub: () => void;
};

const TcContext = createContext<Ctx | null>(null);
export function useTc() {
  const c = useContext(TcContext);
  if (!c) throw new Error("useTc must be used inside TcShell");
  return c;
}

const PARTY_BITS = ["🌺", "🍹", "🐚", "✦", "♥", "🌴", "🦩", "☀"];
const COLORS = ["#e23c78", "#1fb5a8", "#f5b731", "#d3002b", "#6f8fe0", "#f26b4f"];

export default function TcShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || BASE;
  const [toast, setToast] = useState<string | null>(null);
  const [burst, setBurst] = useState<{ tick: number; bits: string[] }>({ tick: 0, bits: PARTY_BITS });
  const [club, setClub] = useState(0);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 3000);
  }, []);
  const confetti = useCallback((bits: string[] = PARTY_BITS) => setBurst((b) => ({ tick: b.tick + 1, bits })), []);
  const steelPan = useCallback(() => playSteelPan(), []);
  const openClub = useCallback(() => setClub((c) => c + 1), []);

  // Easter eggs that work on every page: type "salud" for a flamingo shower, Konami code for the club.
  useEffect(() => {
    let typed = "";
    let seq: string[] = [];
    const KONAMI = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement) return;
      seq = [...seq, e.key].slice(-10);
      if (seq.join(",") === KONAMI) setClub((c) => c + 1);
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-5);
      if (typed === "salud") {
        playSteelPan();
        setBurst((b) => ({ tick: b.tick + 1, bits: ["🦩", "🦩", "🍹", "🌺"] }));
        setToast("¡Salud! It's raining flamingos.");
        window.setTimeout(() => setToast(null), 3000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = (href: string) => (href === BASE ? pathname === BASE : pathname === href || pathname.startsWith(href + "/"));

  return (
    <TcContext.Provider value={{ flash, confetti, steelPan, openClub }}>
      <div className="tb tc" id="top">
        {toast && (
          <div className="tb-toast" role="status">
            {toast}
          </div>
        )}

        <header className="tb-nav">
          <div className="wrap tb-nav-inner">
            <Link href={BASE} className="tb-nav-brand" aria-label="Tanya takes Turks, itinerary">
              <span className="tb-nav-x" aria-hidden>
                ☀ ♥ ☀
              </span>
              <span>
                Tanya × Turks <em>’27</em>
              </span>
            </Link>
            <nav className="tb-nav-links" aria-label="Pages">
              {PAGES.map((p) => (
                <Link key={p.href} href={p.href} aria-current={current(p.href) ? "page" : undefined}>
                  {p.label}
                </Link>
              ))}
              <Link href={TRIP_SITE} className="tc-nav-trip">
                Trip site ↗
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <div className="tc-sand" aria-hidden />
        <footer className="footer tb-footer tc-footer">
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
            <div>
              <p className="tb-hint">
                Draft plan for review: this is what the trip looks like if Turks and Caicos wins the vote. Nothing is booked. Facts checked November 2,
                2026; times, prices and rules can change, so we reconfirm before anyone pays. This page isn&apos;t indexed. Share it with the group
                only. Planned by Evan and Tanya.
              </p>
              <p className="tc-foot-links">
                <Link href={TRIP_SITE}>← Back to the trip site</Link>
                <button
                  type="button"
                  className="tb-replay"
                  onClick={() => {
                    playSteelPan();
                    confetti();
                  }}
                >
                  🥁 Play the steel pan
                </button>
              </p>
            </div>
          </div>
        </footer>

        <nav className="tb-tabbar" aria-label="Pages">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} aria-current={current(p.href) ? "page" : undefined}>
              <span className="tb-tabbar-icon" aria-hidden>
                {p.icon}
              </span>
              <span>{p.label}</span>
            </Link>
          ))}
        </nav>

        <Confetti tick={burst.tick} bits={burst.bits} />
        <ClubMode trigger={club} />
      </div>
    </TcContext.Provider>
  );
}

function Confetti({ tick, bits }: { tick: number; bits: string[] }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; delay: number; dur: number; size: number; bit: string; color: string }[]>([]);
  useEffect(() => {
    if (!tick) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setPieces(
      Array.from({ length: 54 }, (_, i) => ({
        id: tick * 1000 + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        dur: 2.4 + Math.random() * 2.2,
        size: 16 + Math.random() * 18,
        bit: bits[i % bits.length],
        color: COLORS[i % COLORS.length],
      })),
    );
    const t = window.setTimeout(() => setPieces([]), 5600);
    return () => window.clearTimeout(t);
  }, [tick, bits]);
  if (!pieces.length) return null;
  return (
    <div className="tb-confetti" aria-hidden>
      {pieces.map((p) => (
        <span key={p.id} style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, fontSize: p.size, color: p.color }}>
          {p.bit}
        </span>
      ))}
    </div>
  );
}

/** A little steel-pan riff, synthesized: bell-like partials with a fast decay. No audio files. */
export function playSteelPan() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const out = ctx.createGain();
    out.gain.value = 0.16;
    out.connect(ctx.destination);
    // G A B D E D B G (calypso-ish)
    const notes = [392, 440, 493.9, 587.3, 659.3, 587.3, 493.9, 784];
    notes.forEach((f, i) => {
      const t = ctx.currentTime + i * 0.13;
      [1, 2, 3.01].forEach((m, j) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f * m;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime([1, 0.45, 0.2][j], t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.001, t + (i === notes.length - 1 ? 1.2 : 0.45));
        o.connect(g);
        g.connect(out);
        o.start(t);
        o.stop(t + 1.3);
      });
    });
    window.setTimeout(() => ctx.close().catch(() => {}), 2800);
  } catch {
    /* no audio: the confetti still fires */
  }
}
