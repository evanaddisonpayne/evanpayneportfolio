import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { CaseCard, Eyebrow, Pattern } from "@/components/ui";
import { cases } from "@/lib/cases";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  const [featured, ...rest] = cases;
  const rows = [rest.slice(0, 2), rest.slice(2, 4)];
  return (
    <>
      <section className="wk-head dark" aria-labelledby="work-title">
        <div className="pattern-corner" aria-hidden />
        <div className="wrap wk-stack">
          <Eyebrow className="off">Work</Eyebrow>
          <h1 className="wk-h1" id="work-title">
            Ten years of work, sorted by the problem it solved instead of the logo on the&nbsp;door.
          </h1>
          <p className="wk-lede off">
            Some of these are names you know and some sit under an NDA, but every one is real and every number is one I can stand behind. Where I
            led, I say so. Where I didn’t, I say that&nbsp;too.
          </p>
        </div>
      </section>
      <section className="wk-cases light" aria-label="Case studies">
        <Pattern kind="passport" />
        <div className="wrap cases">
          <CaseCard c={featured} featured />
          {rows.map((r, i) => (
            <div className="cases-row" key={i}>
              {r.map((c) => (
                <CaseCard c={c} key={c.slug} />
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
