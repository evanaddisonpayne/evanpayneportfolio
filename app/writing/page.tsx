import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern, Tarot } from "@/components/ui";

export const metadata: Metadata = { title: "Writing" };

export default function Writing() {
  return (
    <>
      <section className="section dark">
        <Pattern kind="rays" />
        <div className="wrap">
          <Eyebrow>Writing</Eyebrow>
          <h1 className="h1" style={{ marginTop: 20, maxWidth: 900 }}>Things I’d say in the meeting if we had more&nbsp;time.</h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Short essays on positioning, brand, and what AI is actually good for. Mostly about B2B tech, occasionally about everything&nbsp;else.
          </p>
        </div>
      </section>

      <section className="section light">
        <Pattern kind="passport" />
        <div className="wrap">
          <article className="piece">
            <Link href="/writing/you-all-sound-the-same" className="tarot-box" tabIndex={-1} aria-hidden>
              <Tarot src="/art/tarot_1.webp" alt="" />
            </Link>
            <div className="content">
              <Eyebrow>(I)   ·   Positioning   ·   Featured</Eyebrow>
              <h2 className="title">
                <Link href="/writing/you-all-sound-the-same">You all sound the same. It’s costing&nbsp;millions.</Link>
              </h2>
              <p className="lede">The Work Tech industry has a sameness problem. And no, another messaging workshop isn’t going to fix&nbsp;it.</p>
              <p className="meta">April 2026&nbsp;&nbsp;·&nbsp;&nbsp;6 min read</p>
              <Link href="/writing/you-all-sound-the-same" className="link-arrow">Read the piece <span aria-hidden>→</span></Link>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
