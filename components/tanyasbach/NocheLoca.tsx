"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Sticker, type StickerKind } from "./Breaks";

/**
 * Noche Loca: the big easter egg.
 * Triggers: tap the lipstick kiss on the packing list (dispatches NOCHE_EVENT), type "vamos" anywhere, or open any page with ?noche.
 * Lights go down, a disco ball drops, a synthesized cha-cha plays, a conga line dances across, and a dare deck pops up.
 */
export const NOCHE_EVENT = "tb:noche";

const DARES = [
  "Get a stranger to teach the group a toast in Spanish.",
  "Tanya picks everyone's drink for the next round. No vetoes.",
  "Everyone dances the first 30 seconds of the next song. No exceptions.",
  "Find someone else celebrating something and toast them.",
  "Tanya gives a 10-second speech about each person. Go.",
  "Learn one salsa step from a local before midnight.",
  "Swap sunglasses with the person on your left for the rest of the night.",
  "Agree on the official trip anthem. You have 60 seconds.",
  "Text the groom a photo of a pineapple. No context.",
  "Order something on the menu you can't pronounce.",
  "Film the most dramatic slow-motion group walk of the trip.",
  "Give Tanya a new nickname for the trip. It sticks.",
  "Find the best sunset spot and claim it for the group.",
  "Recreate an old photo of Tanya, poses and all.",
  "Compliment the outfit of everyone at the table. Be specific.",
];

const CONGA: StickerKind[] = ["cocktail", "lips", "cherries", "shades", "lime", "coupe", "palm", "shell", "disco", "cocktail", "lips", "cherries"];

export default function NocheLoca() {
  const [open, setOpen] = useState(false);
  const [dare, setDare] = useState(0);
  const [music, setMusic] = useState(true);
  const [calm, setCalm] = useState(false);
  const beat = useRef<Beat | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const start = useCallback(() => {
    setDare(Math.floor(Math.random() * DARES.length));
    setOpen(true);
  }, []);

  // Triggers
  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onEvent = () => start();
    window.addEventListener(NOCHE_EVENT, onEvent);
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-5);
      if (typed === "vamos") start();
    };
    window.addEventListener("keydown", onKey);
    if (new URLSearchParams(window.location.search).has("noche")) window.setTimeout(start, 600);
    return () => {
      window.removeEventListener(NOCHE_EVENT, onEvent);
      window.removeEventListener("keydown", onKey);
    };
  }, [start]);

  // Page shimmy + music + Esc
  useEffect(() => {
    const root = document.querySelector(".tb");
    if (!open) {
      root?.classList.remove("is-noche");
      beat.current?.stop();
      return;
    }
    root?.classList.add("is-noche");
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (music) {
      beat.current = beat.current ?? new Beat();
      beat.current.start();
    } else beat.current?.stop();
  }, [open, music]);

  useEffect(() => () => beat.current?.stop(), []);

  if (!open) return null;

  return (
    <div className={`tb-noche${calm ? " is-calm" : ""}`} role="dialog" aria-modal="true" aria-label="Noche Loca">
      <div className="tb-noche-lights" aria-hidden>
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ "--a": `${(i * 360) / 28}deg`, "--r": `${18 + ((i * 37) % 70)}vmax`, "--c": ["#ff5c93", "#ffc94a", "#7fd3cb", "#c9d6fa", "#fff"][i % 5] } as CSSProperties} />
        ))}
      </div>

      <div className="tb-noche-ball" aria-hidden>
        <span className="tb-noche-string" />
        <DiscoBall />
      </div>

      <div className="tb-noche-card">
        <p className="tb-noche-k">Noche Loca · Bach dare #{dare + 1}</p>
        <p className="tb-noche-dare" aria-live="polite">
          {DARES[dare]}
        </p>
        <div className="tb-noche-btns">
          <button type="button" className="tb-noche-next" onClick={() => setDare((d) => (d + 1 + Math.floor(Math.random() * (DARES.length - 1))) % DARES.length)}>
            Next dare
          </button>
          <button type="button" className="tb-noche-mute" aria-pressed={!music} onClick={() => setMusic((m) => !m)}>
            {music ? "Music off" : "Music on"}
          </button>
          <button type="button" ref={closeBtn} className="tb-noche-close" onClick={() => setOpen(false)}>
            Lights on
          </button>
        </div>
      </div>

      <div className="tb-noche-conga" aria-hidden>
        <div className="tb-noche-line">
          {CONGA.map((k, i) => (
            <span key={i} className="tb-noche-dancer" style={{ "--i": i } as CSSProperties}>
              <Sticker kind={k} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiscoBall() {
  const cols = ["#ffffff", "#e8e3f0", "#c9d6fa", "#ffd1df", "#b8b3c4", "#fff3c4"];
  const tiles = [];
  for (let y = -6; y < 6; y++) {
    for (let x = -12; x < 12; x++) {
      tiles.push(<rect key={`${x}${y}`} x={x * 12} y={y * 12} width="11" height="11" fill={cols[(x * 7 + y * 13 + 600) % cols.length]} />);
    }
  }
  return (
    <svg className="tb-noche-svg" viewBox="-80 -80 160 160">
      <defs>
        <clipPath id="tbn-ball">
          <circle r="70" />
        </clipPath>
        <radialGradient id="tbn-shade" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#1e1b2e" stopOpacity=".55" />
        </radialGradient>
      </defs>
      <g clipPath="url(#tbn-ball)">
        <rect x="-80" y="-80" width="160" height="160" fill="#9c97ad" />
        <g className="tb-noche-tiles">{tiles}</g>
        <circle r="70" fill="url(#tbn-shade)" />
      </g>
      <circle r="70" fill="none" stroke="#1e1b2e" strokeWidth="2" />
      <path d="M-18 -46 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#fff" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* A tiny cha-cha machine in Web Audio: clave, cowbell, congas,        */
/* shaker and a tumbao bassline. Starts only after the guest's tap.    */
/* ------------------------------------------------------------------ */

class Beat {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private step = 0;
  private next = 0;
  private readonly bpm = 116;
  private noise: AudioBuffer | null = null;

  start() {
    if (this.timer !== null) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    this.ctx = this.ctx ?? new AC();
    void this.ctx.resume();
    if (!this.master) {
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.42;
      this.master.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.2;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    this.step = 0;
    this.next = this.ctx.currentTime + 0.08;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stop() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    void this.ctx?.suspend();
  }

  private schedule() {
    const ctx = this.ctx;
    if (!ctx) return;
    const s16 = 60 / this.bpm / 4;
    while (this.next < ctx.currentTime + 0.12) {
      this.play(this.step % 16, this.next);
      this.next += s16;
      this.step++;
    }
  }

  private play(s: number, t: number) {
    // son clave 3-2
    if ([0, 3, 6, 10, 12].includes(s)) this.click(t, 2600, 0.5, 0.03);
    // cowbell on the beat, accent on 1
    if (s % 4 === 0) this.bell(t, s === 0 ? 0.28 : 0.18);
    // congas: slaps and open tones
    if ([4, 12].includes(s)) this.drum(t, 330, 0.55, 0.12);
    if ([6, 7, 14, 15].includes(s)) this.drum(t, 210, 0.5, 0.18);
    // shaker every 16th, accented off-beats
    this.shake(t, s % 2 ? 0.12 : 0.06);
    // tumbao bass (A minor-ish)
    const bass: Record<number, number> = { 3: 110, 6: 164.81, 11: 110, 14: 146.83 };
    if (bass[s]) this.bass(t, bass[s]);
    // a little stab on the "cha-cha-cha"
    if ([8, 10].includes(s)) this.stab(t, [440, 523.25, 659.25]);
  }

  private env(t: number, peak: number, dur: number) {
    const g = this.ctx!.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(this.master!);
    return g;
  }

  private click(t: number, f: number, v: number, d: number) {
    const o = this.ctx!.createOscillator();
    o.type = "square";
    o.frequency.value = f;
    const bp = this.ctx!.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = f;
    o.connect(bp).connect(this.env(t, v * 0.4, d));
    o.start(t);
    o.stop(t + d + 0.02);
  }

  private bell(t: number, v: number) {
    const g = this.env(t, v, 0.25);
    const bp = this.ctx!.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 800;
    bp.connect(g);
    for (const f of [540, 800]) {
      const o = this.ctx!.createOscillator();
      o.type = "square";
      o.frequency.value = f;
      o.connect(bp);
      o.start(t);
      o.stop(t + 0.27);
    }
  }

  private drum(t: number, f: number, v: number, d: number) {
    const o = this.ctx!.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(f * 1.6, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.04);
    o.connect(this.env(t, v, d));
    o.start(t);
    o.stop(t + d + 0.02);
  }

  private shake(t: number, v: number) {
    const src = this.ctx!.createBufferSource();
    src.buffer = this.noise;
    const hp = this.ctx!.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 6000;
    src.connect(hp).connect(this.env(t, v, 0.05));
    src.start(t);
    src.stop(t + 0.06);
  }

  private bass(t: number, f: number) {
    const o = this.ctx!.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    o.connect(this.env(t, 0.5, 0.32));
    o.start(t);
    o.stop(t + 0.34);
  }

  private stab(t: number, fs: number[]) {
    const g = this.env(t, 0.07, 0.14);
    for (const f of fs) {
      const o = this.ctx!.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.connect(g);
      o.start(t);
      o.stop(t + 0.16);
    }
  }
}
