import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Let’s talk" };

export default function Contact() {
  return (
    <>
      <section className="section dark">
        <Pattern kind="rays" />
        <div className="wrap">
          <Eyebrow>Let’s talk</Eyebrow>
          <h1 className="h1" style={{ marginTop: 20 }}>Tell me what’s going&nbsp;on.</h1>
          <p className="lede" style={{ marginTop: 24 }}>
            A brand that sounds like everyone else, a growth number that won’t move, or a role you’re trying to fill. Start here, give me the short
            version, and I’ll take it from&nbsp;there.
          </p>
        </div>
      </section>

      <section className="section light">
        <Pattern kind="passport" />
        <div className="wrap contact-grid">
          <ContactForm />
          <aside>
            <div className="next-steps">
              <Eyebrow>What happens next</Eyebrow>
              <ol>
                <li><span className="num">(I)</span><span className="t">I read it myself.</span><span className="d">No assistant, no routing, no ticket number.</span></li>
                <li><span className="num">(II)</span><span className="t">I write back.</span><span className="d">Usually within two business days.</span></li>
                <li><span className="num">(III)</span><span className="t">We get on a call.</span><span className="d">Thirty minutes, if it looks like a fit. If it isn’t, I’ll tell you, and point you somewhere better when I&nbsp;can.</span></li>
              </ol>
            </div>
            <div className="elsewhere">
              <Eyebrow>Elsewhere</Eyebrow>
              {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn&nbsp;&nbsp;→</a>}
              <Link href="/resume">The full resume&nbsp;&nbsp;→</Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer cta={false} />
    </>
  );
}
