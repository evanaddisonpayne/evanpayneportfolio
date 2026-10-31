import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_MAX_AGE, COOKIE_NAME, PRIVATE_BASE, UNLOCK_PATH, checkPassword, privatePassword, safeNext, sessionToken } from "@/lib/tanyasbach-private-auth";

// POST from the unlock form (works without JavaScript).
//   intent=unlock + password → sets the planner cookie and redirects to the page
//   intent=lock               → clears the cookie and redirects to the unlock page
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const intent = String(form.get("intent") || "unlock");
  const next = safeNext(form.get("next"));
  const to = (path: string) => NextResponse.redirect(new URL(path, req.url), 303);

  if (intent === "lock") {
    const res = to(UNLOCK_PATH);
    res.cookies.set(COOKIE_NAME, "", { path: PRIVATE_BASE, maxAge: 0 });
    return res;
  }

  if (!privatePassword()) return to(`${UNLOCK_PATH}?e=setup`);

  const ok = await checkPassword(String(form.get("password") || ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 700)); // slow down guessing
    return to(`${UNLOCK_PATH}?e=wrong&next=${encodeURIComponent(next)}`);
  }

  const res = to(next);
  res.cookies.set(COOKIE_NAME, (await sessionToken())!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: PRIVATE_BASE,
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
