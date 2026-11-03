// Shared photo album for /turkscaicos/photos, stored in Vercel Blob (the same store as /tanyasbach-private replies).
//
// Uploads go straight from the browser to Blob with a short-lived token from POST here, so big phone photos never
// hit the 4.5 MB serverless body limit. Everything the album needs lives in the file's path:
//   turkscaicos/photos/<day>/<name>--<timestamp>--<owner hash>.<ext>
// <owner hash> is the first 16 hex of SHA-256 of a random key kept in the uploader's browser, so the person who
// added a photo (and only them, from that device) can delete it. Planners can delete anything in the Vercel dashboard.
//
// Optional: set TC_UPLOAD_CODE in Vercel to require a shared code before anyone can upload.
import { createHash } from "node:crypto";
import { del, head, list } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const dynamic = "force-dynamic";

const PREFIX = "turkscaicos/photos/";
const DAYS = ["pre", "thu", "fri", "sat", "sun", "mon"] as const;
const UPLOAD_RE = new RegExp(`^${PREFIX}(${DAYS.join("|")})/[a-z0-9-]{1,24}--\\d{13}--[a-f0-9]{16}\\.(jpg|jpeg|png|webp|gif|heic|heif)$`);
const LISTED_RE = new RegExp(`^${PREFIX}(${DAYS.join("|")})/([a-z0-9-]{1,24})--(\\d{13})--([a-f0-9]{16})(?:-[A-Za-z0-9]+)?\\.([a-z]+)$`);
const MAX_BYTES = 25 * 1024 * 1024;

const enabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const uploadCode = () => (process.env.TC_UPLOAD_CODE || "").trim().toLowerCase();
const ownerHash = (key: string) => createHash("sha256").update(key).digest("hex").slice(0, 16);

type Photo ={ url: string; day: string; by: string; at: number; owner: string; size: number };

export async function GET() {
  const needsCode = !!uploadCode();
  if (!enabled()) return Response.json({ enabled: false, needsCode, photos: [] });
  try {
    const photos: Photo[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      for (const b of page.blobs) {
        const m = LISTED_RE.exec(b.pathname);
        if (!m) continue;
        photos.push({ url: b.url, day: m[1], by: m[2].replace(/-/g, " "), at: Number(m[3]), owner: m[4], size: b.size });
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    photos.sort((a, b) => b.at - a.at);
    return Response.json({ enabled: true, needsCode, photos }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ enabled: true, needsCode, error: "Couldn't load the album" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!enabled()) return Response.json({ error: "The album isn't switched on yet" }, { status: 503 });
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  try {
    const out = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!UPLOAD_RE.test(pathname)) throw new Error("That file name doesn't look right");
        const code = uploadCode();
        if (code) {
          let given = "";
          try {
            given = String((JSON.parse(clientPayload || "{}") as { code?: unknown }).code ?? "");
          } catch {
            /* treated as no code */
          }
          if (given.trim().toLowerCase() !== code) throw new Error("Wrong album code");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        /* nothing to do: the album is just a listing of the folder */
      },
    });
    return Response.json(out);
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Upload refused" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!enabled()) return Response.json({ ok: false, error: "The album isn't switched on yet" }, { status: 503 });
  let url = "";
  let key = "";
  try {
    const b = (await request.json()) as { url?: unknown; key?: unknown };
    url = String(b.url ?? "");
    key = String(b.key ?? "");
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  if (!url || key.length < 16) return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  try {
    const meta = await head(url);
    const m = LISTED_RE.exec(meta.pathname);
    if (!m) return Response.json({ ok: false, error: "Not an album photo" }, { status: 404 });
    if (m[4] !== ownerHash(key)) return Response.json({ ok: false, error: "Only the person who added it can delete it" }, { status: 403 });
    await del(url);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Couldn't delete" }, { status: 502 });
  }
}
