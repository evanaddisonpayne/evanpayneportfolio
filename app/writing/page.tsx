import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Writing" };

const href = "/writing/you-all-sound-the-same";

export default function Writing() {
  return (
    <>
      <section className="wr-head dark">
        <div className="wrap wr-intro">
          <Eyebrow>Writing</Eyebrow>
          <h1 className="wr-h1">Things I’d say in the meeting if we had more&nbsp;time.</h1>
          <p className="wr-lede">Short essays on positioning, brand, and what AI is actually good for. Mostly about B2B tech, occasionally about everything&nbsp;else.</p>
        </div>
      </section>

      <section className="wr-pieces light">
        <div className="wrap">
          <article className="wr-feature">
            <Link href={href} className="wr-art" tabIndex={-1} aria-hidden>
              <img src="/art/tarot_1.webp" alt="" width={216} height={360} />
            </Link>
            <div className="wr-text">
              <p className="wr-meta">(I)&nbsp;&nbsp;&nbsp;Positioning&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;Featured</p>
              <h2 className="wr-title">
                <Link href={href}>You all sound the same. It’s costing&nbsp;millions.</Link>
              </h2>
              <p className="wr-dek">The Work Tech industry has a sameness problem. And no, another messaging workshop isn’t going to fix&nbsp;it.</p>
              <p className="wr-meta sm">April 2026&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;6 min read</p>
              <p className="wr-read">
                <Link href={href}>Read the piece <span aria-hidden>→</span></Link>
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </>
  );
}
