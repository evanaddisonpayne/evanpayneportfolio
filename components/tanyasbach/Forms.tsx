"use client";

import { useState, type ReactNode } from "react";
import type { FormKind } from "@/lib/tanyasbach";
import { useTb } from "./TbProvider";
import { firstName, isDemo, submit } from "./util";

/** "¿Quién eres?" — one name, remembered on this device and attached to every form. */
export function NameField({ compact = false }: { compact?: boolean }) {
  const { name, setName } = useTb();
  return (
    <div className={`tb-name${compact ? " is-compact" : ""}`}>
      <label htmlFor="tb-name" className="tb-name-label">
        ¿Quién eres?
      </label>
      <input
        id="tb-name"
        className="tb-input tb-name-input"
        type="text"
        autoComplete="name"
        placeholder="First and last name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {!compact && (
        <p className="tb-hint">Saved on this phone and used on every form, so your answers line up. Send a form again any time to change your answer.</p>
      )}
    </div>
  );
}

export function Chips({
  options,
  value,
  onChange,
  multi = true,
  label,
  render,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
  label: string;
  render?: (o: string) => ReactNode;
}) {
  const toggle = (o: string) => {
    if (multi) onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
    else onChange(value.includes(o) ? [] : [o]);
  };
  return (
    <div className="tb-chips" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" className="tb-chip" aria-pressed={value.includes(o)} onClick={() => toggle(o)}>
          {render ? render(o) : o}
        </button>
      ))}
    </div>
  );
}

/** Sends one form, stamps the planning passport, and throws a little confetti. */
export function useSend(kind: FormKind) {
  const { name, markDone, flash, confetti } = useTb();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send(fields: Record<string, unknown>, check?: () => string | null) {
    const who = name.trim();
    if (!who) {
      flash("Add your name first: ¿quién eres?");
      document.getElementById("tb-name")?.focus();
      return;
    }
    const problem = check?.();
    if (problem) {
      flash(problem);
      return;
    }
    setState("sending");
    try {
      await submit({ form: kind, name: who, ...fields });
      setState("sent");
      markDone(kind);
      confetti();
      flash(isDemo() ? `Demo mode: nothing sent, ${firstName(who)}.` : `¡Gracias, ${firstName(who)}! Stamped. ✿`);
    } catch {
      setState("error");
      flash("That didn't send. Check your signal and try again.");
    }
  }

  const status =
    state === "sending" ? "Sending…" : state === "sent" ? "✓ Saved. Send again to change it." : state === "error" ? "Didn't send. Try again?" : "";
  return { send, sending: state === "sending", status };
}

export function SubmitRow({ label, sending, status }: { label: string; sending: boolean; status: string }) {
  return (
    <div className="tb-submit">
      <button className="btn btn-signal" disabled={sending}>
        {label}
      </button>
      <span className="tb-status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
