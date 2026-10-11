// Trip chatbot ("Bram") for /amsterdam. Streams Claude's reply back as plain text.
//
// Environment (Vercel → Project → Settings → Environment Variables):
//   ANTHROPIC_API_KEY  required. Without it the chat says it isn't set up yet.
//   TRIP_CHAT_CODE     optional group passcode. If set, the chat asks for it once per device.
//   TRIP_CHAT_MODEL    optional model override (default below).

import { sessionContext, systemPrompt } from "@/lib/amsterdamKnowledge";
import { PEOPLE, type Person } from "@/lib/amsterdam";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.TRIP_CHAT_MODEL || "claude-sonnet-5-5";
const MAX_TURNS = 12; // messages of history sent to the model
const MAX_CHARS = 1200; // per user message

// Best-effort rate limit per IP (resets when the serverless instance recycles).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 40;
}

type Msg = { role: "user" | "assistant"; content: string };

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "x-robots-tag": "noindex" },
  });
}

function amsterdamNow() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json(503, { error: "not_configured" });

  const code = process.env.TRIP_CHAT_CODE;
  if (code && req.headers.get("x-trip-code")?.trim().toLowerCase() !== code.trim().toLowerCase()) {
    return json(401, { error: "need_code" });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return json(429, { error: "slow_down" });

  let body: { messages?: Msg[]; viewer?: string; nasty?: boolean };
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "bad_request" });
  }

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    .slice(-MAX_TURNS);
  // The conversation must start with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return json(400, { error: "bad_request" });

  const viewer = PEOPLE.includes(body.viewer as Person) ? (body.viewer as Person) : null;

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 800,
      stream: true,
      system: [
        { type: "text", text: systemPrompt(), cache_control: { type: "ephemeral" } },
        { type: "text", text: sessionContext({ now: amsterdamNow(), viewer, nasty: body.nasty === true }) },
      ],
      messages,
    }),
  }).catch(() => null);

  if (!upstream || !upstream.ok || !upstream.body) {
    const status = upstream?.status ?? 502;
    return json(status === 429 || status === 529 ? 503 : 502, { error: "upstream", status });
  }

  // Turn Anthropic's SSE stream into a plain text stream of the reply.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    // Keep reading until we have text to hand on (a chunk may hold only pings or half an event).
    async pull(controller) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        let sent = false;
        for (const evt of events) {
          const dataLine = evt.split("\n").find((l) => l.startsWith("data:"));
          if (!dataLine) continue;
          try {
            const data = JSON.parse(dataLine.slice(5).trim());
            if (data.type === "content_block_delta" && data.delta?.type === "text_delta") {
              controller.enqueue(encoder.encode(data.delta.text));
              sent = true;
            } else if (data.type === "error") {
              controller.enqueue(encoder.encode("\n\n(Bram lost his train of thought. Try again in a moment.)"));
              sent = true;
            }
          } catch {
            /* ignore partial or unknown events */
          }
        }
        if (sent) return;
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}
