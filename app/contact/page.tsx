import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Let’s talk" };

const steps: [string, string, string][] = [
  ["(I)", "I read it myself.", "No assistant, no routing, no ticket number."],
  ["(II)", "I write back.", "Usually within two business days."],
  ["(III)", "We get on a call.", "Thirty minutes, if it looks like a fit. If it isn’t, I’ll tell you, and point you somewhere better when I can."],
];

export default function Contact() {
  return (
    <>
      <section className="ct-hero dark">
        <div className="pattern-corner c560" aria-hidden />
        <div className="wrap ct-intro">
          <Eyebrow as="p">Let’s talk</Eyebrow>
          <h1 className="ct-h1">Tell me what’s going&nbsp;on.</h1>
          <p className="ct-lede">
            A brand that sounds like everyone else, a growth number that won’t move, or a role you’re trying to fill. Start here, give me the short
            version, and I’ll take it from&nbsp;there.
          </p>
        </div>
      </section>

      <section className="ct-body light">
        <Pattern kind="passport" />
        <div className="wrap ct-row">
          <ContactForm />
          <aside className="ct-side">
            <div className="ct-next">
              <p className="ct-label">What happens next</p>
              <ol>
                {steps.map(([n, t, d]) => (
                  <li key={n}>
                    <span className="num">{n}</span>
                    <span className="txt">
                      <span className="t">{t}</span>
                      <span className="d">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ct-else">
              <p className="ct-label">Elsewhere</p>
              {site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn&nbsp;&nbsp;→
                </a>
              )}
              <Link href="/resume">The full resume&nbsp;&nbsp;→</Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer cta={false} />
    </>
  );
}
