"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import type { Person } from "@/lib/amsterdam";

type Msg = { role: "user" | "assistant"; content: string };

const CODE_KEY = "ams26-chat-code";
const LOG_KEY = "ams26-chat-log";
const SUGGESTIONS = [
  "What's next on the plan?",
  "Where's dinner Wednesday?",
  "What does the I amsterdam card cover?",
  "Best way back to the hotel at 2 am?",
  "What should I order at Van Kerkwijk?",
];

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

/** Tiny renderer: paragraphs, "- " bullets, **bold**, and bare links. */
function Rich({ text }: { text: string }) {
  const inline = (s: string, k: string): ReactNode[] =>
    s.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={k + i}>{part.slice(2, -2)}</strong>;
      if (/^https?:\/\//.test(part))
        return (
          <a key={k + i} href={part} target="_blank" rel="noopener noreferrer">
            {part.replace(/^https?:\/\/(www\.)?/, "").slice(0, 40)}
          </a>
        );
      return <span key={k + i}>{part}</span>;
    });
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((b, bi) => {
        const lines = b.split("\n");
        if (lines.every((l) => /^\s*[-•*]\s+/.test(l) || !l.trim())) {
          return (
            <ul key={bi}>
              {lines
                .filter((l) => l.trim())
                .map((l, li) => (
                  <li key={li}>{inline(l.replace(/^\s*[-•*]\s+/, ""), `${bi}-${li}-`)}</li>
                ))}
            </ul>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {inline(l, `${bi}-${li}-`)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

export default function Chat({ me }: { me: Person | null }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [needCode, setNeedCode] = useState(false);
  const [code, setCode] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMsgs(load<Msg[]>(LOG_KEY, []));
    setCode(load<string>(CODE_KEY, ""));
  }, []);
  useEffect(() => {
    if (!busy) save(LOG_KEY, msgs.slice(-30));
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string, codeOverride?: string) {
    const q = text.trim();
    if (!q || busy) return;
    setNotice(null);
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/amsterdam-chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-trip-code": codeOverride ?? code },
        body: JSON.stringify({ messages: history, viewer: me }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}) as { error?: string });
        setMsgs(history.slice(0, -1));
        setInput(q);
        if (err.error === "need_code") {
          setNeedCode(true);
          setNotice(code ? "That code didn't work. Ask Evan for the group code." : "Bram needs the group code first.");
        } else if (err.error === "not_configured") {
          setNotice("Bram isn't switched on yet. Evan still needs to add the API key in Vercel.");
        } else if (err.error === "slow_down") {
          setNotice("Easy, tiger. Too many questions at once. Try again in a few minutes.");
        } else {
          setNotice("Bram couldn't answer just now. Try again in a moment.");
        }
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) setMsgs([...history, { role: "assistant", content: "(No answer came back. Try asking again.)" }]);
    } catch {
      setMsgs(history.slice(0, -1));
      setInput(q);
      setNotice("Couldn't reach Bram. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function submitCode(e: FormEvent) {
    e.preventDefault();
    const c = code.trim();
    if (!c) return;
    save(CODE_KEY, c);
    setNeedCode(false);
    setNotice(null);
    if (input.trim()) send(input, c);
  }

  return (
    <>
      <button className={`ams-chat-fab${open ? " is-open" : ""}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="ams-chat">
        <span className="ams-chat-fab-face" aria-hidden>
          ✕✕✕
        </span>
        <span>{open ? "Close" : "Ask Bram"}</span>
      </button>

      <section id="ams-chat" className="ams-chat" hidden={!open} role="dialog" aria-label="Ask Bram, the trip concierge">
        <header className="ams-chat-head">
          <div>
            <p className="ams-chat-title">Bram</p>
            <p className="ams-chat-sub">Your trip concierge. Knows the whole plan{me ? `, and that you're ${me}` : ""}.</p>
          </div>
          <div className="ams-chat-head-actions">
            {msgs.length > 0 && (
              <button
                className="ams-chat-clear"
                onClick={() => {
                  setMsgs([]);
                  save(LOG_KEY, []);
                }}
              >
                Clear
              </button>
            )}
            <button className="ams-chat-x" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
        </header>

        <div className="ams-chat-log" ref={logRef} aria-live="polite">
          {msgs.length === 0 && (
            <div className="ams-chat-empty">
              <p>
                Hoi! Ask me anything about the trip: what&apos;s next, where dinner is, what the card covers, how to get home at 2 am.
              </p>
              <div className="ams-chat-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} disabled={busy}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`ams-msg ams-msg-${m.role}`}>
              {m.role === "assistant" ? (
                m.content ? <Rich text={m.content} /> : <span className="ams-typing" aria-label="Bram is typing"><i /><i /><i /></span>
              ) : (
                <p>{m.content}</p>
              )}
            </div>
          ))}
        </div>

        {notice && <p className="ams-chat-notice">{notice}</p>}

        {needCode ? (
          <form className="ams-chat-form" onSubmit={submitCode}>
            <input
              className="ams-chat-input"
              value={code}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              placeholder="Group code"
              aria-label="Group code"
              autoComplete="off"
            />
            <button className="ams-chat-send" type="submit">
              Unlock
            </button>
          </form>
        ) : (
          <form className="ams-chat-form" onSubmit={onSubmit}>
            <textarea
              ref={inputRef}
              className="ams-chat-input"
              value={input}
              rows={1}
              maxLength={1200}
              placeholder="Ask about the trip…"
              aria-label="Message Bram"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              onKeyDown={(e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button className="ams-chat-send" type="submit" disabled={busy || !input.trim()}>
              {busy ? "…" : "Send"}
            </button>
          </form>
        )}
        <p className="ams-chat-fine">Bram knows the plan as of the last site update. Double-check hours before you go.</p>
      </section>
    </>
  );
}
