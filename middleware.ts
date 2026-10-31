import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, UNLOCK_PATH, isValidSession } from "@/lib/tanyasbach-private-auth";

// Gate for /tanyasbach-private: anyone without a valid planner cookie is sent to the unlock page.
// The page itself checks the cookie again on the server, so this is belt and suspenders.
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (pathname === UNLOCK_PATH) return NextResponse.next();

  if (await isValidSession(req.cookies.get(COOKIE_NAME)?.value)) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = UNLOCK_PATH;
  url.search = "";
  url.searchParams.set("next", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/tanyasbach-private", "/tanyasbach-private/:path*"],
};
