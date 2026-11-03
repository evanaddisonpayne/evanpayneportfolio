"use client";

import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { DAYS } from "@/lib/turkscaicos";
import { useTc } from "./TcShell";

const API = "/api/turkscaicos/photos";
const NAME_KEY = "tc27-name";
const OWNER_KEY = "tc27-photo-key";
const CODE_KEY = "tc27-album-code";
const MAX_SIDE = 2400;
const TRIP_DATES: Record<string, string> = { "2027-05-27": "thu", "2027-05-28": "fri", "2027-05-29": "sat", "2027-05-30": "sun", "2027-05-31": "mon" };

type Photo = { url: string; day: string; by: string; at: number; owner: string; size: number };
type Album = { enabled: boolean; needsCode: boolean; photos: Photo[]; error?: string };

const DAY_TABS = [
  { id: "all", label: "All" },
  { id: "pre", label: "Before" },
  ...DAYS.map((d) => ({ id: d.id, label: d.weekday.slice(0, 3) })),
];
const dayLabel = (id: string) => (id === "pre" ? "Before the trip" : DAYS.find((d) => d.id === id)?.weekday ?? id);

function store(key: string, value?: string) {
  try {
    if (value === undefined) return window.localStorage.getItem(key) ?? "";
    window.localStorage.setItem(key, value);
  } catch {
    /* storage off: still works for this visit */
  }
  return value ?? "";
}

/** A random key per device; its hash goes in each file name so this device can delete its own photos. */
function ownerKey() {
  let k = store(OWNER_KEY);
  if (k.length < 32) {
    const a = new Uint8Array(24);
    crypto.getRandomValues(a);
    k = Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
    store(OWNER_KEY, k);
  }
  return k;
}
async function sha16(s: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24) || "someone";

/** Shrink big phone photos to a sensible JPEG before upload. Falls back to the original if the browser can't decode it. */
async function prepare(file: File): Promise<{ blob: Blob; ext: string }> {
  const ext0 = (file.name.split(".").pop() || "jpg").toLowerCase();
  if (file.type === "image/gif") return { blob: file, ext: "gif" };
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.drawImage(bmp, 0, 0, w, h);
    bmp.close?.();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.86));
    if (!blob) throw new Error("no blob");
    return { blob, ext: "jpg" };
  } catch {
    const ok = ["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(ext0);
    return { blob: file, ext: ok ? ext0 : "jpg" };
  }
}

export default function PhotosView() {
  const { flash, confetti } = useTc();
  const [album, setAlbum] = useState<Album | null>(null);
  const [filter, setFilter] = useState("all");
  const [name, setName] = useState("");
  const [day, setDay] = useState("pre");
  const [code, setCode] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number; pct: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [mine, setMine] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(API, { cache: "no-store" });
      const a = (await res.json()) as Partial<Album>;
      setAlbum({ enabled: a.enabled !== false, needsCode: !!a.needsCode, photos: a.photos ?? [], error: a.error });
    } catch {
      setAlbum({ enabled: true, needsCode: false, photos: [], error: "Couldn't load the album. Check your connection and refresh." });
    }
  }, []);

  useEffect(() => {
    setName(store(NAME_KEY));
    setCode(store(CODE_KEY));
    // Default the day picker to today's trip day, if we're on the trip.
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
    const hit = TRIP_DATES[today];
    if (hit) setDay(hit);
    sha16(ownerKey()).then(setMine);
    load();
  }, [load]);

  const shown = useMemo(() => (album?.photos ?? []).filter((p) => filter === "all" || p.day === filter), [album, filter]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: album?.photos.length ?? 0 };
    for (const p of album?.photos ?? []) c[p.day] = (c[p.day] ?? 0) + 1;
    return c;
  }, [album]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const problems: string[] = [];
    if (!name.trim()) problems.push("Add your name so people know who to thank.");
    if (!files.length) problems.push("Pick at least one photo.");
    if (album?.needsCode && !code.trim()) problems.push("Enter the album code from the group chat.");
    if (problems.length) {
      setErr(problems.join(" "));
      return;
    }
    store(NAME_KEY, name.trim());
    if (code) store(CODE_KEY, code.trim());
    setBusy(true);
    const hash = await sha16(ownerKey());
    let done = 0;
    let failed = 0;
    let lastError = "";
    setProgress({ done: 0, total: files.length, pct: 0 });
    for (const f of files) {
      try {
        const { blob, ext } = await prepare(f);
        const path = `turkscaicos/photos/${day}/${slug(name)}--${Date.now()}--${hash}.${ext}`;
        await upload(path, blob, {
          access: "public",
          handleUploadUrl: API,
          clientPayload: JSON.stringify({ code: code.trim() }),
          contentType: ext === "jpg" ? "image/jpeg" : blob.type || undefined,
          onUploadProgress: ({ percentage }) => setProgress({ done, total: files.length, pct: percentage }),
        });
        done += 1;
      } catch (x) {
        failed += 1;
        lastError = x instanceof Error ? x.message : "";
      }
      setProgress({ done: done + failed, total: files.length, pct: 0 });
    }
    setBusy(false);
    setProgress(null);
    setFiles([]);
    if (fileRef.current) fileRef.current.value = "";
    if (done) {
      confetti(["📸", "🌺", "✦", "♥"]);
      flash(`${done} photo${done === 1 ? "" : "s"} added. Gorgeous.`);
      setFilter("all");
    }
    if (failed) setErr(`${failed} didn't upload${/code/i.test(lastError) ? ": wrong album code" : ""}. Try those again, or send them to Evan.`);
    load();
  }

  async function remove(p: Photo) {
    if (!window.confirm("Delete this photo from the album for everyone?")) return;
    try {
      const res = await fetch(API, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: p.url, key: ownerKey() }) });
      const out = (await res.json()) as { ok?: boolean; error?: string };
      if (!out.ok) throw new Error(out.error);
      setOpen(null);
      flash("Deleted. It never happened.");
      load();
    } catch (x) {
      flash(x instanceof Error && x.message ? x.message : "Couldn't delete that one.");
    }
  }

  return (
    <>
      <section className="section light tb-hero tc-pagehead tc-photos-hero">
        <div className="wrap">
          <p className="eyebrow">
            The shared album<span className="dot" aria-hidden>·</span>Everyone adds, everyone downloads
          </p>
          <h1 className="h1">
            Pics or it <span className="italic">didn&apos;t happen.</span>
          </h1>
          <p className="lede">
            Drop your photos here from the plane, the boat, the Fish Fry and the 2 am kitchen. Full size, no compression roulette in the group chat, and
            anyone can download them after.
          </p>
        </div>
        <div className="tc-film" aria-hidden>
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
      </section>

      <section className="section tb-bg-blush tc-upload-sec" id="add">
        <div className="wrap tc-upload-grid">
          <div className="section-head">
            <p className="eyebrow">Add photos</p>
            <h2 className="h2">
              Your camera roll, <span className="italic">our scrapbook.</span>
            </h2>
            <ul className="tc-upload-rules">
              <li>Photos only for now (JPG, PNG, HEIC, GIF), up to 25 MB each. Big ones get resized on your phone first.</li>
              <li>Anyone with this link can see the album. Keep it cute enough for Tanya&apos;s mom to stumble on.</li>
              <li>You can delete your own photos from the same phone you added them with. Evan can delete anything.</li>
            </ul>
          </div>

          {album && !album.enabled ? (
            <div className="tc-upload-card is-off">
              <p className="tc-k">Coming soon</p>
              <p className="tc-upload-off">The album switches on once the photo storage is connected. Until then, keep shooting.</p>
            </div>
          ) : (
            <form className="tc-upload-card" onSubmit={onSubmit} noValidate>
              {err && (
                <p className="tc-error" role="alert">
                  {err}
                </p>
              )}
              <label className="tc-field">
                <span className="tb-label">Your name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" maxLength={40} placeholder="First name is fine" />
              </label>
              <label className="tc-field">
                <span className="tb-label">Which day?</span>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                  <option value="pre">Before the trip</option>
                  {DAYS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.weekday}, {d.date}: {d.name}
                    </option>
                  ))}
                </select>
              </label>
              {album?.needsCode && (
                <label className="tc-field">
                  <span className="tb-label">Album code</span>
                  <input type="text" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" placeholder="It's in the group chat" />
                </label>
              )}
              <label className="tc-drop">
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
                <span className="tc-drop-icon" aria-hidden>
                  📸
                </span>
                <span className="tc-drop-text">{files.length ? `${files.length} photo${files.length === 1 ? "" : "s"} ready` : "Tap to choose photos"}</span>
                <span className="tb-hint">Pick as many as you want.</span>
              </label>
              <button type="submit" className="btn btn-signal tb-big-btn" disabled={busy}>
                {busy && progress ? `Uploading ${Math.min(progress.done + 1, progress.total)} of ${progress.total}…` : "Add to the album"}
              </button>
              {progress && (
                <div className="tc-upbar" aria-hidden>
                  <span style={{ width: `${((progress.done + progress.pct / 100) / progress.total) * 100}%` }} />
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      <section className="section light tc-gallery-sec" id="album">
        <div className="wrap">
          <div className="tc-gallery-head">
            <h2 className="h2">
              The album <span className="italic">{album ? `· ${counts.all} photo${counts.all === 1 ? "" : "s"}` : ""}</span>
            </h2>
            <div className="tc-chips" role="group" aria-label="Filter by day">
              {DAY_TABS.map((t) => (
                <button key={t.id} type="button" aria-pressed={filter === t.id} onClick={() => setFilter(t.id)}>
                  {t.label}
                  {counts[t.id] ? <small>{counts[t.id]}</small> : null}
                </button>
              ))}
            </div>
          </div>

          {!album && <p className="tb-hint">Loading the album…</p>}
          {album?.error && <p className="tc-error">{album.error}</p>}
          {album && !album.error && shown.length === 0 && (
            <div className="tc-empty">
              {[0, 1, 2].map((i) => (
                <div key={i} className="tc-polaroid is-ghost" style={{ "--r": `${[-6, 3, -2][i]}deg` } as CSSProperties}>
                  <span className="tc-polaroid-img" />
                  <span className="tc-polaroid-cap">{["your photo here", "and here", "and here"][i]}</span>
                </div>
              ))}
              <p className="tc-empty-text">{filter === "all" ? "No photos yet. Be the first. Make it a good one." : `Nothing from ${dayLabel(filter)} yet.`}</p>
            </div>
          )}

          <ul className="tc-grid">
            {shown.map((p, i) => (
              <li key={p.url} style={{ "--r": `${((i * 37) % 9) - 4}deg` } as CSSProperties}>
                <button type="button" className="tc-polaroid" onClick={() => setOpen(i)} aria-label={`Open photo by ${p.by}, ${dayLabel(p.day)}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt="" loading="lazy" decoding="async" />
                  <span className="tc-polaroid-cap">
                    {p.by} · {dayLabel(p.day).slice(0, 3)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {open !== null && shown[open] && (
        <Lightbox
          photos={shown}
          index={open}
          mine={mine}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
          onDelete={remove}
        />
      )}
    </>
  );
}

function Lightbox({
  photos,
  index,
  mine,
  onIndex,
  onClose,
  onDelete,
}: {
  photos: Photo[];
  index: number;
  mine: string;
  onIndex: (i: number) => void;
  onClose: () => void;
  onDelete: (p: Photo) => void;
}) {
  const p = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onIndex((index + d + photos.length) % photos.length), [index, onIndex, photos.length]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  // Swipe left/right on phones.
  const start = useRef<number | null>(null);

  return (
    <div className="tc-lightbox" role="dialog" aria-modal="true" aria-label={`Photo by ${p.by}`} onClick={onClose}>
      <figure
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (start.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (start.current === null) return;
          const dx = e.changedTouches[0].clientX - start.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          start.current = null;
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.url} alt={`Photo by ${p.by}, ${dayLabel(p.day)}`} />
        <figcaption>
          <span>
            <b>{p.by}</b> · {dayLabel(p.day)} · {index + 1} of {photos.length}
          </span>
          <span className="tc-lb-actions">
            <a href={`${p.url}?download=1`} download>
              Download
            </a>
            {mine && p.owner === mine && (
              <button type="button" onClick={() => onDelete(p)}>
                Delete
              </button>
            )}
          </span>
        </figcaption>
      </figure>
      <button type="button" className="tc-lb-nav is-prev" onClick={(e) => (e.stopPropagation(), go(-1))} aria-label="Previous photo">
        ‹
      </button>
      <button type="button" className="tc-lb-nav is-next" onClick={(e) => (e.stopPropagation(), go(1))} aria-label="Next photo">
        ›
      </button>
      <button ref={closeRef} type="button" className="tc-lb-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
