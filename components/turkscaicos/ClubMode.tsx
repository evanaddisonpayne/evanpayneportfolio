"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * "Grace Bay After Dark": a full-screen beach club. Opened by the "Do not press" button on /turkscaicos/fun,
 * the Konami code anywhere, or typing "afterdark". It flashes, so it always asks first, and it fades instead
 * of flashing when the device asks for reduced motion. Esc or "Leave the club" closes it.
 */
export default function ClubMode({ trigger = 0 }: { trigger?: number }) {
  const [stage, setStage] = useState<"off" | "warn" | "on">("off");
  const [beat, setBeat] = useState(0);
  const [sound, setSound] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (trigger > 0) setStage("warn");
  }, [trigger]);

  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStage("off");
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-9);
      if (typed === "afterdark") setStage("warn");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Beat clock: soca tempo, 128 bpm.
  useEffect(() => {
    if (stage !== "on") return;
    const t = window.setInterval(() => setBeat((b) => b + 1), 60000 / 128);
    return () => window.clearInterval(t);
  }, [stage]);

  // Optional kick + shaker, synthesized, off by default.
  useEffect(() => {
    if (stage !== "on" || !sound) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const now = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(150, now);
      o.frequency.exponentialRampToValueAtTime(42, now + 0.16);
      g.gain.setValueAtTime(0.5, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      o.start(now);
      o.stop(now + 0.22);
      if (beat % 2 === 1) {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        const n = ctx.createBufferSource();
        const hp = ctx.createBiquadFilter();
        const ng = ctx.createGain();
        hp.type = "highpass";
        hp.frequency.value = 6000;
        ng.gain.value = 0.18;
        n.buffer = buf;
        n.connect(hp);
        hp.connect(ng);
        ng.connect(ctx.destination);
        n.start(now + 0.23);
      }
      window.setTimeout(() => ctx.close().catch(() => {}), 600);
    } catch {
      /* no audio, fine */
    }
  }, [beat, stage, sound]);

  useEffect(() => {
    document.body.style.overflow = stage === "off" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  if (stage === "off") return null;

  if (stage === "warn") {
    return (
      <div className="tc-club-warn" role="dialog" aria-modal="true" aria-label="Grace Bay After Dark warning">
        <div>
          <p className="eyebrow">Grace Bay After Dark</p>
          <h3 className="h3">A beach club. Flashing lights.</h3>
          <p className="tc-body">
            This fills the screen with fast flashing colors, which can trigger seizures in people with photosensitive epilepsy.{" "}
            {reduced ? "Your device asks for reduced motion, so it will fade softly instead of flashing." : "Skip it if that's you."}
          </p>
          <div className="tc-club-btns">
            <button type="button" className="btn btn-signal" onClick={() => setStage("on")}>
              Let me in
            </button>
            <button type="button" className="btn tc-ghost" onClick={() => setStage("off")}>
              No thanks
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hues = [330, 175, 42, 355, 225, 15];
  const lines = ["SALUD", "TANYA", "ONE MORE", "RUM PUNCH", "JUNKANOO", "NO PHOTOS", "TAN LINES", "LAST CALL?", "NEVER"];
  return (
    <div className={`tc-club${reduced ? " is-calm" : ""}`} style={{ "--h": String(hues[beat % hues.length]) } as CSSProperties} role="dialog" aria-modal="true" aria-label="Grace Bay After Dark">
      <div className="tc-club-ring" key={beat} />
      <div className="tc-club-palms" aria-hidden>
        🌴 🌴
      </div>
      <p className="tc-club-word" key={`w${Math.floor(beat / 2)}`}>
        {lines[Math.floor(beat / 4) % lines.length]}
      </p>
      <div className="tc-club-bar">
        <button type="button" onClick={() => setSound((s) => !s)} aria-pressed={sound}>
          {sound ? "Sound on" : "Sound off"}
        </button>
        <button type="button" onClick={() => setStage("off")}>
          Leave the club
        </button>
      </div>
      <p className="tc-club-hint">Esc or “Leave the club” to get out. 128 BPM, 2 am forever.</p>
    </div>
  );
}
