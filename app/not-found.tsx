import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern, Tarot } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <section className="hero dark">
        <Pattern kind="rays" />
        <div className="wrap nf-grid">
          <div>
            <Eyebrow>Error   ·   404</Eyebrow>
            <h1 className="h1">This page is invisible.</h1>
            <p className="lede">
              Which, as it happens, is the most expensive thing a brand can be. The page you wanted either moved or never existed. Either way, the good
              stuff is a click&nbsp;away.
            </p>
            <div className="btns">
              <Link href="/" className="btn btn-signal">Back to the homepage</Link>
              <Link href="/work" className="btn btn-ghost">See the work</Link>
            </div>
          </div>
          <Tarot src="/art/tarot_404.webp" alt="Tarot card (404), The Ghost" className="nf-card" />
        </div>
      </section>
      <Footer />
    </>
  );
}
