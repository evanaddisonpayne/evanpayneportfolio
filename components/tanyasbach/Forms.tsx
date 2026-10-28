"use client";

import { useState, type ReactNode } from "react";
import { VOTE_FORMS, votingOpen, type FormKind } from "@/lib/tanyasbach";
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

/** Sends one form and stamps the planning passport. */
export function useSend(kind: FormKind) {
  const { name, markDone, flash } = useTb();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send(fields: Record<string, unknown>, check?: () => string | null) {
    const who = name.trim();
    if (!who) {
      flash("Add your name first: ¿quién eres?");
      document.getElementById("tb-name")?.focus();
      return;
    }
    if (VOTE_FORMS.includes(kind) && !votingOpen()) {
      flash("Voting closed on Thanksgiving Eve. Results are final.");
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
      flash(isDemo() ? `Demo mode: nothing sent, ${firstName(who)}.` : `Gracias, ${firstName(who)}. Stamped.`);
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

/* ------------------------------------------------------------------ */
/* One-button pages: validate everything, list what's missing inline,  */
/* send each part to its sheet tab, then show a clear "done" panel.    */
/* ------------------------------------------------------------------ */

export type Part = { kind: FormKind; fields: Record<string, unknown> };
export type Problem = { msg: string; focus?: string };
type SubmitState = "idle" | "sending" | "done" | "error";

export function useSubmitAll() {
  const { name, markDone } = useTb();
  const [state, setState] = useState<SubmitState>("idle");
  const [problems, setProblems] = useState<Problem[]>([]);

  async function run(parts: Part[], issues: Problem[]) {
    const who = name.trim();
    const all = [...(who ? [] : [{ msg: "Add your name", focus: "tb-name" }]), ...issues];
    if (all.length) {
      setProblems(all);
      setState("idle");
      const el = all[0].focus ? document.getElementById(all[0].focus) : null;
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
      return;
    }
    setProblems([]);
    setState("sending");
    try {
      for (const p of parts) {
        await submit({ form: p.kind, name: who, ...p.fields });
        markDone(p.kind);
      }
      setState("done");
    } catch {
      setState("error");
    }
  }

  return { run, state, problems, edit: () => setState("idle") };
}

/** "Your name": the first field of every form. Remembered on this phone. */
export function YourName() {
  const { name, setName } = useTb();
  return (
    <div className="tb-field">
      <label className="tb-label" htmlFor="tb-name">
        Your name
      </label>
      <input
        id="tb-name"
        className="tb-input"
        type="text"
        autoComplete="name"
        placeholder="First and last name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

/** A numbered question inside a form. */
export function Question({ n, title, hint, id, children }: { n: number; title: string; hint?: string; id?: string; children: ReactNode }) {
  return (
    <div className="tb-q" id={id} tabIndex={id ? -1 : undefined}>
      <p className="tb-q-title">
        <span className="tb-q-n">{n}</span>
        {title}
      </p>
      {hint && <p className="tb-q-hint">{hint}</p>}
      {children}
    </div>
  );
}

export function SubmitBlock({ label, state, problems }: { label: string; state: SubmitState; problems: Problem[] }) {
  return (
    <div className="tb-submit-block">
      {problems.length > 0 && (
        <div className="tb-errors" role="alert">
          <p>
            <strong>Almost there.</strong> Please fill in:
          </p>
          <ul>
            {problems.map((p) => (
              <li key={p.msg}>{p.focus ? <a href={`#${p.focus}`}>{p.msg}</a> : p.msg}</li>
            ))}
          </ul>
        </div>
      )}
      {state === "error" && (
        <div className="tb-errors" role="alert">
          <p>
            <strong>That didn&apos;t send.</strong> Check your connection and tap the button again. Nothing you entered is lost.
          </p>
        </div>
      )}
      <button className="btn btn-signal tb-big-btn" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : label}
      </button>
    </div>
  );
}

/** Full-width confirmation that replaces the form after a successful send. */
export function Success({ title, body, next, onEdit }: { title: string; body: string; next?: { href: string; label: string }; onEdit: () => void }) {
  return (
    <div className="tb-success" role="status" ref={(el) => el?.scrollIntoView({ block: "center", behavior: "smooth" })}>
      <p className="tb-success-mark" aria-hidden>
        ✓
      </p>
      <h2 className="h2">{title}</h2>
      <p className="lede">{body}</p>
      {isDemo() && <p className="tb-hint">Demo mode: nothing was actually sent.</p>}
      <div className="tb-success-btns">
        {next && (
          <a className="btn btn-signal tb-big-btn" href={next.href}>
            {next.label}
          </a>
        )}
        <button type="button" className="tb-linkbtn" onClick={onEdit}>
          Change my answers
        </button>
      </div>
    </div>
  );
}
