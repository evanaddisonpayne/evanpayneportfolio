import Link from "next/link";
import EmailReveal from "@/components/EmailReveal";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern } from "@/components/ui";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// No form on purpose: nothing for bots to submit to. LinkedIn is the main route (Evan's profile is an Open Profile,
// so any member can message him without connecting), and email is a backup that only appears after a click.

export default function ContactPage({ locale }: { locale: Locale }) {
  const c = getDict(locale).contact;
  const lp = (p: string) => localePath(locale, p);
  return (
    <>
      <section className="ct-hero dark">
        <div className="pattern-corner c560" aria-hidden />
        <div className="wrap ct-intro">
          <Eyebrow as="p">{c.eyebrow}</Eyebrow>
          <h1 className="ct-h1">{c.h1}</h1>
          <p className="ct-lede">{c.lede}</p>
        </div>
      </section>

      <section className="ct-body light">
        <Pattern kind="passport" />
        <div className="wrap ct-row">
          <div className="ct-routes">
            <div className="ct-route">
              <p className="ct-label">{c.linkedin.label}</p>
              <h2 className="ct-route-h">{c.linkedin.h}</h2>
              <p className="ct-route-d">{c.linkedin.d}</p>
              <a href={site.linkedin} className="btn btn-signal" target="_blank" rel="noopener noreferrer">
                {c.linkedin.button}
              </a>
            </div>
            <div className="ct-route">
              <p className="ct-label">{c.email.label}</p>
              <h2 className="ct-route-h">{c.email.h}</h2>
              <p className="ct-route-d">{c.email.d}</p>
              <EmailReveal show={c.email.show} copy={c.email.copy} copied={c.email.copied} />
            </div>
          </div>
          <aside className="ct-side">
            <div className="ct-next">
              <p className="ct-label">{c.nextLabel}</p>
              <ol>
                {c.steps.map(([title, d]) => (
                  <li key={title}>
                    <span className="t">{title}</span>
                    <span className="d">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ct-else">
              <p className="ct-label">{c.beforeLabel}</p>
              <Link href={lp("/resume")}>{c.resumeLink}</Link>
              <Link href={lp("/work")}>{c.workLink}</Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer cta={false} locale={locale} />
    </>
  );
}
