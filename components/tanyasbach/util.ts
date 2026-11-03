import { SHEET_URL } from "@/lib/tanyasbach";

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: state just won't persist */
  }
}

export const isDemo = () => !SHEET_URL;

const API = "/api/tanyasbach";

/** Post one form through the site's own relay, which forwards it to the Google Sheet. Throws if it didn't save. */
export async function submit(payload: Record<string, unknown>): Promise<void> {
  if (!SHEET_URL) {
    await new Promise((r) => setTimeout(r, 450));
    return;
  }
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const out = (await res.json().catch(() => ({}))) as { ok?: boolean };
  if (!res.ok || !out.ok) throw new Error("not saved");
}

export const firstName = (n: string) => n.trim().split(/\s+/)[0] || n;
