import type { Metadata } from "next";
import Link from "next/link";
import EmailReveal from "@/components/EmailReveal";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Let’s talk" };

// No form on purpose: nothing for bots to submit to. LinkedIn is the main route (Evan's profile is an Open Profile,
// so any member can message him without connecting), and email is a backup that only appears after a click.

const steps: [string, string][] = [
  ["I read it myself.", "No assistant, no routing, no ticket number."],
  ["I write back.", "Usually within two business days."],
  ["We get on a call.", "Thirty minutes, if it looks like a fit. If it isn’t, I’ll tell you, and point you somewhere better when I can."],
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
            A brand that sounds like everyone else, a growth number that won’t move, or a role you’re trying to fill. Send me the short version, and
            I’ll take it from&nbsp;there.
          </p>
        </div>
      </section>

      <section className="ct-body light">
        <Pattern kind="passport" />
        <div className="wrap ct-row">
          <div className="ct-routes">
            <div className="ct-route">
              <p className="ct-label">LinkedIn</p>
              <h2 className="ct-route-h">The fastest way to reach&nbsp;me.</h2>
              <p className="ct-route-d">My profile is open, so you can message me directly, no connection needed. Tell me what’s going on and where you&nbsp;work.</p>
              <a href={site.linkedin} className="btn btn-signal" target="_blank" rel="noopener noreferrer">
                Message me on LinkedIn&nbsp;&nbsp;→
              </a>
            </div>
            <div className="ct-route">
              <p className="ct-label">Email</p>
              <h2 className="ct-route-h">Rather&nbsp;email?</h2>
              <p className="ct-route-d">Same reply time. The address appears when you click, which keeps it away from spam&nbsp;bots.</p>
              <EmailReveal />
            </div>
          </div>
          <aside className="ct-side">
            <div className="ct-next">
              <p className="ct-label">What happens next</p>
              <ol>
                {steps.map(([t, d]) => (
                  <li key={t}>
                    <span className="t">{t}</span>
                    <span className="d">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ct-else">
              <p className="ct-label">Before you write</p>
              <Link href="/resume">The full resume&nbsp;&nbsp;→</Link>
              <Link href="/work">Selected work&nbsp;&nbsp;→</Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer cta={false} />
    </>
  );
}
