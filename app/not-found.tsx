import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow, Tarot } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <section className="nf dark">
        <img className="nf-rays" src="/art/rays_404.svg" alt="" aria-hidden="true" width={1440} height={900} />
        <div className="wrap nf-wrap">
          <div className="nf-card">
            <Tarot src="/art/tarot_404.webp" alt="Tarot card (404), The Ghost" />
          </div>
          <div className="nf-stack">
            <div className="off"><Eyebrow>Error   ·   404</Eyebrow></div>
            <h1 className="nf-h1">This page <br />is invisible.</h1>
            <p className="off nf-lede">
              Which, as it happens, is the most expensive thing a brand can be. The page you wanted either moved or never existed. Either way, the good
              stuff is a click&nbsp;away.
            </p>
            <div className="off nf-btns btns">
              <Link href="/" className="btn btn-signal">Back to the homepage</Link>
              <Link href="/work" className="btn btn-ghost">See the work</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
