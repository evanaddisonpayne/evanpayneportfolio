import Link from "next/link";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";
import { Pattern } from "@/components/ui";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Every fact on this page comes from Evan (resume, LinkedIn, or confirmed in chat). Don't add numbers or claims without asking.

export default function ResumePage({ locale }: { locale: Locale }) {
  const r = getDict(locale).resume;
  const { scope, results, jobs, capabilities } = r;
  return (
    <>
      <section className="rx-head dark" aria-labelledby="rx-name">
        <div className="pattern-corner tall" aria-hidden />
        <div className="wrap">
          <p className="rx-kicker">{r.kicker}</p>
          <h1 className="rx-name" id="rx-name">Evan Addison Payne</h1>
          <p className="rx-role"><span>{r.role[0]}</span><span className="rx-dot" aria-hidden>·</span><span>{r.role[1]}</span><span className="rx-dot" aria-hidden>·</span><span>{r.role[2]}</span></p>
          <p className="rx-pos">{r.pos}</p>
          <div className="rx-btns">
            <PrintButton label={r.pdf} />
            {site.linkedin && (
              <a href={site.linkedin} className="rx-link" target="_blank" rel="noopener noreferrer">{r.linkedin}</a>
            )}
          </div>
          <dl className="rx-scope">
            {scope.map((s) => (
              <div key={s.label}>
                <dt>{s.num}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rx-body light">
        <Pattern kind="passport" />
        <div className="wrap">
          <section className="rx-block" aria-labelledby="rx-results">
            <h2 className="rx-label" id="rx-results">{r.labels.results}</h2>
            <ol className="rx-results">
              {results.map((x) => (
                <li key={x.num}>
                  <p className="rx-num">{x.num}</p>
                  <p className="rx-text">{x.text}</p>
                  <p className="rx-src">{x.org}<span>{x.year}</span></p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rx-block" aria-labelledby="rx-exp">
            <h2 className="rx-label" id="rx-exp">{r.labels.experience}</h2>
            <div className="rx-jobs">
              {jobs.map((j) => (
                <article className="rx-job" key={j.org + j.when}>
                  <div className="rx-when">
                    <p className="yrs">{j.when}</p>
                    <p className="loc">{j.where}</p>
                  </div>
                  <div className="rx-what">
                    <h3 className="org">{j.org}</h3>
                    {j.note && <p className="note">{j.note}</p>}
                    {j.roles.map((ro) => (
                      <div className="rx-role-block" key={ro.title}>
                        <h4 className="title">
                          {ro.title}
                          {ro.when && <span className="dates">{ro.when}</span>}
                        </h4>
                        <p className="mandate">{ro.mandate}</p>
                        {ro.bullets.length > 0 && (
                          <ul className="rx-bullets">
                            {ro.bullets.map((b) => <li key={b}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rx-cap dark">
        <div className="wrap">
          <section className="rx-block" aria-labelledby="rx-capabilities">
            <h2 className="rx-label" id="rx-capabilities">{r.labels.capabilities}</h2>
            <dl className="rx-caps">
              {capabilities.map((c) => (
                <div key={c.t}>
                  <dt>{c.t}</dt>
                  <dd>{c.b}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="rx-block rx-edu" aria-labelledby="rx-education">
            <h2 className="rx-label" id="rx-education">{r.labels.education}</h2>
            <div className="rx-edu-row">
              <p className="loc">{r.education.where}</p>
              <div>
                <p className="school">{r.education.school}</p>
                <p className="degree">{r.education.degree}</p>
              </div>
              <p className="rx-more">
                {r.education.more}<Link href={localePath(locale, "/contact")}>{r.education.contact}</Link>
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
