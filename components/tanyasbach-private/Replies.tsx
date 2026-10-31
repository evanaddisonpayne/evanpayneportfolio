"use client";

// Live reply boxes for /tanyasbach-private. One provider polls every few seconds so both of us see new answers
// without refreshing; each <Reply> autosaves a moment after typing stops (and when you click away).
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Reply = { text: string; at: string };
type Ctx = { enabled: boolean | null; replies: Record<string, Reply>; save: (id: string, text: string) => Promise<Reply> };

const API = "/api/tanyasbach-private/replies";
const POLL_MS = 4000;
const ReplyContext = createContext<Ctx | null>(null);

export function ReplyProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [replies, setReplies] = useState<Record<string, Reply>>({});

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(API, { cache: "no-store" });
      const data = await res.json();
      if (typeof data.enabled === "boolean") setEnabled(data.enabled);
      if (data.replies) setReplies(data.replies);
    } catch {
      /* try again on the next tick */
    }
  }, []);

  useEffect(() => {
    refresh();
    const tick = () => document.visibilityState === "visible" && refresh();
    const t = window.setInterval(tick, POLL_MS);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [refresh]);

  const save = useCallback(async (id: string, text: string) => {
    const res = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, text }) });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Couldn't save");
    setReplies((cur) => ({ ...cur, [id]: data.reply }));
    return data.reply as Reply;
  }, []);

  return <ReplyContext.Provider value={{ enabled, replies, save }}>{children}</ReplyContext.Provider>;
}

function when(iso: string) {
  const d = new Date(iso);
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

type Status = "idle" | "typing" | "saving" | "saved" | "error";

/** A labeled text box Tanya can answer in. `id` must be unique on the page (lowercase, hyphens). */
export function Reply({ id, prompt, label = "Tanya’s answer", placeholder = "Type here. It saves on its own." }: {
  id: string;
  prompt?: ReactNode;
  label?: string;
  placeholder?: string;
}) {
  const ctx = useContext(ReplyContext);
  if (!ctx) throw new Error("Reply must be inside ReplyProvider");
  const { enabled, replies, save } = ctx;
  const remote = replies[id];

  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [, rerender] = useState(0);
  const focused = useRef(false);
  const dirty = useRef(false);
  const lastSaved = useRef<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  // Pull in answers typed on the other device, unless you're mid-edit in this box.
  useEffect(() => {
    if (!remote || focused.current || dirty.current) return;
    if (remote.text !== text) setText(remote.text);
    lastSaved.current = remote.text;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote?.at]);

  // Grow the box with its content.
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 96)}px`;
  }, [text]);

  // Keep "2 min ago" fresh.
  useEffect(() => {
    const t = window.setInterval(() => rerender((n) => n + 1), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const flush = useCallback(
    async (value: string) => {
      window.clearTimeout(timer.current);
      if (value === lastSaved.current) {
        dirty.current = false;
        setStatus("saved");
        return;
      }
      setStatus("saving");
      try {
        await save(id, value);
        lastSaved.current = value;
        dirty.current = false;
        setError("");
        setStatus("saved");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Couldn't save");
        setStatus("error");
      }
    },
    [id, save],
  );

  const onChange = (value: string) => {
    setText(value);
    dirty.current = true;
    setStatus("typing");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => flush(value), 900);
  };

  const off = enabled === false;
  const statusText =
    status === "typing" ? "Typing…" :
    status === "saving" ? "Saving…" :
    status === "error" ? `Not saved: ${error}. Click away to retry.` :
    remote ? `Saved ${when(remote.at)}` :
    off ? "Replies aren’t switched on yet" :
    enabled === null ? "Loading…" : "No answer yet";

  return (
    <div className={`tbp-reply${remote?.text ? " has-answer" : ""}${status === "error" ? " is-error" : ""}`}>
      {prompt && <p className="tbp-reply-prompt">{prompt}</p>}
      <label className="tbp-reply-label" htmlFor={`tbp-r-${id}`}>
        <span aria-hidden>✎</span> {label}
      </label>
      <textarea
        ref={areaRef}
        id={`tbp-r-${id}`}
        className="tbp-reply-box"
        value={text}
        placeholder={off ? "" : placeholder}
        disabled={off || enabled === null}
        maxLength={5000}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => (focused.current = true)}
        onBlur={() => {
          focused.current = false;
          if (dirty.current || status === "error") flush(text);
        }}
      />
      <p className="tbp-reply-status" role="status" aria-live="polite">
        {statusText}
      </p>
    </div>
  );
}
