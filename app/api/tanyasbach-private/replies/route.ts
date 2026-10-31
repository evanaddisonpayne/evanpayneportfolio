// Live reply boxes on /tanyasbach-private. Each save is stored as its own small JSON file in Vercel Blob
// (tanyasbach-private/replies/<box id>/<timestamp>.json); the newest file per box is the current answer.
// Writing a new file per save means a reader never gets a stale cached copy, and every edit is kept as history.
import { list, put } from "@vercel/blob";

export const dynamic = "force-dynamic";

const PREFIX = "tanyasbach-private/replies/";
const ID_RE = /^[a-z0-9-]{1,48}$/;
const MAX_CHARS = 5000;

type Reply = { text: string; at: string };

const enabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const bodyCache = new Map<string, Reply>(); // blob URLs never change, so their contents can be cached forever

export async function GET() {
  if (!enabled()) return Response.json({ enabled: false, replies: {} });
  try {
    const latest = new Map<string, { url: string; uploadedAt: Date }>();
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      for (const b of page.blobs) {
        const id = b.pathname.slice(PREFIX.length).split("/")[0];
        const cur = latest.get(id);
        if (!cur || b.uploadedAt > cur.uploadedAt) latest.set(id, { url: b.url, uploadedAt: b.uploadedAt });
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    const replies: Record<string, Reply> = {};
    await Promise.all(
      [...latest].map(async ([id, { url }]) => {
        let r = bodyCache.get(url);
        if (!r) {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) return;
          r = (await res.json()) as Reply;
          bodyCache.set(url, r);
        }
        replies[id] = r;
      }),
    );
    return Response.json({ enabled: true, replies }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ enabled: true, error: "Couldn't load replies" }, { status: 502 });
  }
}

export async function POST(req: Request) {
  if (!enabled()) return Response.json({ ok: false, error: "Replies aren't switched on yet" }, { status: 503 });
  let body: { id?: unknown; text?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  const id = String(body.id ?? "");
  const text = String(body.text ?? "");
  if (!ID_RE.test(id)) return Response.json({ ok: false, error: "Unknown box" }, { status: 400 });
  if (text.length > MAX_CHARS) return Response.json({ ok: false, error: `Keep it under ${MAX_CHARS} characters` }, { status: 413 });

  const reply: Reply = { text, at: new Date().toISOString() };
  try {
    await put(`${PREFIX}${id}/${Date.now()}.json`, JSON.stringify(reply), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: true,
    });
    return Response.json({ ok: true, reply });
  } catch {
    return Response.json({ ok: false, error: "Couldn't save" }, { status: 502 });
  }
}
