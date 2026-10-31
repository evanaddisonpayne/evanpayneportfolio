// Same-origin relay for /tanyasbach forms and results. The browser talks to this route;
// this route talks to the Apps Script web app, which always answers through a 302 redirect.
// Doing that hop server-side gives the page a real 200/4xx/5xx instead of an opaque redirect.
import { SHEET_URL } from "@/lib/tanyasbach";

export const dynamic = "force-dynamic";

const FORMS = new Set(["rsvp", "destination", "dates", "budget", "vibes", "final"]);
const MAX_BYTES = 10_000;

export async function POST(req: Request) {
  if (!SHEET_URL) return Response.json({ ok: true, demo: true });
  const raw = await req.text();
  if (raw.length > MAX_BYTES) return Response.json({ ok: false, error: "Too long" }, { status: 413 });
  let body: { form?: string; name?: string };
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  if (!body.form || !FORMS.has(body.form) || !String(body.name ?? "").trim()) {
    return Response.json({ ok: false, error: "Missing form or name" }, { status: 400 });
  }
  try {
    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: raw,
      redirect: "follow",
      cache: "no-store",
    });
    const text = await res.text();
    let out: { ok?: boolean; error?: string } = {};
    try {
      out = JSON.parse(text);
    } catch {
      return Response.json({ ok: false, error: "The sheet didn't answer as expected" }, { status: 502 });
    }
    return Response.json(out, { status: out.ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false, error: "Couldn't reach the sheet" }, { status: 502 });
  }
}

export async function GET() {
  if (!SHEET_URL) return Response.json({ demo: true });
  try {
    const res = await fetch(SHEET_URL, { redirect: "follow", cache: "no-store" });
    const data = await res.json();
    return Response.json(data, { headers: { "Cache-Control": "s-maxage=15, stale-while-revalidate=60" } });
  } catch {
    return Response.json({ error: "Couldn't reach the sheet" }, { status: 502 });
  }
}
