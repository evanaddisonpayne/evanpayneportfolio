import { SAMPLE, SHEET_URL, type Results } from "@/lib/tanyasbach";

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

/**
 * Post one form to the Apps Script web app. Sent as text/plain so the browser skips the CORS preflight
 * Apps Script can't answer; the response is opaque, so a resolved fetch counts as sent.
 */
export async function submit(payload: Record<string, unknown>): Promise<void> {
  if (!SHEET_URL) {
    await new Promise((r) => setTimeout(r, 450));
    return;
  }
  await fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
}

/** Aggregated tallies only: the script never returns names, contacts, or individual budgets. */
export async function fetchResults(): Promise<{ data: Results; demo: boolean }> {
  if (!SHEET_URL) return { data: SAMPLE, demo: true };
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const data = (await res.json()) as Results;
    return { data, demo: false };
  } catch {
    return { data: { rsvps: 0, destination: {}, dates: {}, vibes: {}, budgetBands: {} }, demo: false };
  }
}

export const firstName = (n: string) => n.trim().split(/\s+/)[0] || n;
