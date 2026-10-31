import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, isValidSession, privatePassword, safeNext } from "@/lib/tanyasbach-private-auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Planners only" };

export default async function Unlock({ searchParams }: { searchParams: Promise<{ e?: string; next?: string }> }) {
  const { e, next: rawNext } = await searchParams;
  const next = safeNext(rawNext);

  const jar = await cookies();
  if (await isValidSession(jar.get(COOKIE_NAME)?.value)) redirect(next);

  const notSetUp = !privatePassword() || e === "setup";

  return (
    <section className="section light tbp-unlock">
      <div className="wrap">
        <div className="tbp-unlock-card">
          <p className="eyebrow">Tanya ’27 · Planners only</p>
          <h1 className="h2">
            Just for <span className="italic">Evan + Tanya.</span>
          </h1>
          {notSetUp ? (
            <p className="lede">This page isn&apos;t switched on yet. It needs its password set on the server first.</p>
          ) : (
            <form method="post" action="/api/tanyasbach-private" className="tbp-unlock-form">
              <input type="hidden" name="intent" value="unlock" />
              <input type="hidden" name="next" value={next} />
              <label htmlFor="tbp-pw">Password</label>
              <input id="tbp-pw" name="password" type="password" autoComplete="current-password" required autoFocus />
              {e === "wrong" && (
                <p className="tbp-error" role="alert">
                  That&apos;s not it. Try again?
                </p>
              )}
              <button type="submit" className="btn btn-dark">
                Open
              </button>
              <p className="tb-hint">Stays unlocked on this device for 60 days.</p>
            </form>
          )}
          <p className="tb-hint">
            Looking for the group site? <a href="/tanyasbach">Go to /tanyasbach</a>
          </p>
        </div>
      </div>
    </section>
  );
}
