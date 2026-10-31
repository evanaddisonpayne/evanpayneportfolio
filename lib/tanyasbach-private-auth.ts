// Password gate for /tanyasbach-private (planners only: Evan and Tanya).
//
// One shared password lives in the TANYASBACH_PRIVATE_PASSWORD env var (Vercel → Project → Settings → Environment Variables).
// Unlocking sets an httpOnly cookie holding an HMAC of that password, so the password itself is never stored in the browser.
// Changing the env var (and redeploying) signs everyone out. With no env var set, the page stays locked for everyone.
// Uses Web Crypto only, so it runs in both middleware (edge) and server components (node).

export const PRIVATE_BASE = "/tanyasbach-private";
export const UNLOCK_PATH = `${PRIVATE_BASE}/unlock`;
export const COOKIE_NAME = "tbp27";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 days

export function privatePassword(): string {
  return (process.env.TANYASBACH_PRIVATE_PASSWORD || "").trim();
}

async function hmacHex(key: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** The cookie value that proves someone typed the current password. Null when no password is configured. */
export async function sessionToken(): Promise<string | null> {
  const pw = privatePassword();
  return pw ? hmacHex(pw, "tanyasbach-private:v1") : null;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function isValidSession(cookieValue: string | undefined): Promise<boolean> {
  const token = await sessionToken();
  return !!token && !!cookieValue && safeEqual(cookieValue, token);
}

/** Compare a typed password against the configured one (case-sensitive, surrounding spaces ignored). */
export async function checkPassword(typed: string): Promise<boolean> {
  const pw = privatePassword();
  if (!pw) return false;
  // Compare HMACs so the comparison takes the same time whatever the length.
  const [a, b] = await Promise.all([hmacHex("tbp-compare", typed.trim()), hmacHex("tbp-compare", pw)]);
  return safeEqual(a, b);
}

/** Only allow redirects back inside the private page. */
export function safeNext(next: unknown): string {
  return typeof next === "string" && (next === PRIVATE_BASE || next.startsWith(PRIVATE_BASE + "/") || next.startsWith(PRIVATE_BASE + "#")) && !next.startsWith(UNLOCK_PATH)
    ? next
    : PRIVATE_BASE;
}
