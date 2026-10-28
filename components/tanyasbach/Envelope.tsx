"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { Hibiscus, PapelPicado } from "./Art";
import { HIDE_ID, OPENED_KEY, REPLAY_EVENT } from "./envelope-gate";
import { useTb } from "./TbProvider";

type Stage = "closed" | "open" | "reveal";

export default function Envelope() {
  const { confetti } = useTb();
  const [show, setShow] = useState(true);
  const [stage, setStage] = useState<Stage>("closed");
  const [drag, setDrag] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const seal = useRef<HTMLButtonElement>(null);
  const start = useRef<{ y: number; x: number } | null>(null);
  const timers = useRef<number[]>([]);

  // Returning guest: the head script already hid us, so just unmount.
  useEffect(() => {
    if (document.getElementById(HIDE_ID)) setShow(false);
    const replay = () => {
      document.getElementById(HIDE_ID)?.remove();
      setStage("closed");
      setDrag(0);
      setShow(true);
      window.scrollTo(0, 0);
    };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  // While it's up: no page scroll, the site behind is inert, the hero stamp waits for its entrance.
  useEffect(() => {
    if (!show) return;
    const el = root.current;
    const site = el?.parentElement;
    const behind = site ? Array.from(site.children).filter((c) => c !== el) : [];
    behind.forEach((c) => c.setAttribute("inert", ""));
    if (site) site.dataset.sealed = "";
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    seal.current?.focus({ preventScroll: true });
    return () => {
      behind.forEach((c) => c.removeAttribute("inert"));
      if (site) delete site.dataset.sealed;
      html.style.overflow = prev;
    };
  }, [show]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

  const finish = useCallback(() => {
    try {
      window.localStorage.setItem(OPENED_KEY, "1");
    } catch {
      /* storage blocked: it'll just play again next time */
    }
    setShow(false);
  }, []);

  const open = useCallback(() => {
    if (stage !== "closed") return;
    setDrag(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("reveal");
      later(450, finish);
      return;
    }
    setStage("open");
    // Card has risen out of the envelope; now it grows to fill the screen and the site shows through.
    later(1750, () => {
      const c = card.current;
      if (c) {
        const r = c.getBoundingClientRect();
        const dx = window.innerWidth / 2 - (r.left + r.width / 2);
        const dy = window.innerHeight / 2 - (r.top + r.height / 2);
        const s = Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.25;
        c.style.setProperty("--fly", `translate(${dx}px, ${dy}px) scale(${s})`);
      }
      setStage("reveal");
    });
    later(2250, confetti);
    later(2700, finish);
  }, [stage, confetti, finish]);

  // Tap, or swipe up, anywhere on the envelope.
  const onDown = (e: ReactPointerEvent) => {
    if (stage !== "closed") return;
    start.current = { y: e.clientY, x: e.clientX };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent) => {
    if (!start.current) return;
    const dy = start.current.y - e.clientY;
    setDrag(Math.max(0, Math.min(dy, 140)));
  };
  const onUp = (e: ReactPointerEvent) => {
    if (!start.current) return;
    const dy = start.current.y - e.clientY;
    const dx = Math.abs(start.current.x - e.clientX);
    start.current = null;
    if (dy > 40 || (Math.abs(dy) < 10 && dx < 10)) open();
    else setDrag(0);
  };

  if (!show) return null;

  const pull = Math.min(drag / 140, 1);

  return (
    <div ref={root} className={`tb-env is-${stage}`} role="dialog" aria-modal="true" aria-label="Your invitation to Tanya's bachelorette">
      <div className="tb-env-sky" aria-hidden />
      <PapelPicado className="tb-env-picado" count={10} />

      <p className="tb-env-kicker" aria-hidden>
        Correo aéreo <span>✦</span> Por avión
      </p>

      <div
        className={`tb-env-stage${drag ? " is-dragging" : ""}`}
        style={{ "--pull": pull } as CSSProperties}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => {
          start.current = null;
          setDrag(0);
        }}
      >
        <div className="tb-env-float">
          <div className="tb-env-back" aria-hidden />

          <div ref={card} className="tb-env-card" aria-hidden={stage === "closed"}>
            <div className="tb-env-card-in">
              <p className="tb-env-card-k">Estás invitada</p>
              <p className="tb-env-card-h">
                ¡Vamos, <em>Tanya!</em>
              </p>
              <p className="tb-env-card-d">Bachelorette · Mayo 2027</p>
              <Hibiscus className="tb-env-card-flower" />
            </div>
          </div>

          <div className="tb-env-front" aria-hidden>
            <div className="tb-env-to">
              <span>Para:</span> ti <span className="tb-env-to-x">✿</span>
              <small>La despedida de Tanya</small>
            </div>
            <div className="tb-env-post">
              <span>Mayo</span>
              <b>2027</b>
              <span>✦ ✦ ✦</span>
            </div>
          </div>

          <div className="tb-env-flap" aria-hidden />

          <button ref={seal} type="button" className="tb-env-seal" onClick={(e) => e.detail === 0 && open()} aria-label="Open the invitation">
            <Hibiscus className="tb-env-seal-flower" wash={false} />
            <span className="tb-env-seal-ring" aria-hidden />
          </button>
        </div>
      </div>

      <p className="tb-env-hint" aria-hidden>
        <span className="tb-env-hint-arrow">↑</span>
        Tap the seal or swipe up to open
      </p>

      <button type="button" className="tb-env-skip" onClick={finish}>
        Skip
      </button>
    </div>
  );
}
