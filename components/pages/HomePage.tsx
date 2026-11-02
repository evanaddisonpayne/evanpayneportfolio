import Link from "next/link";
import Footer from "@/components/Footer";
import { CaseCard, CaseRow, Eyebrow, Pattern, Portrait, Tape, Tarot } from "@/components/ui";
import { fmt, getCases, getDict, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const h = t.home;
  const lp = (p: string) => localePath(locale, p);
  const [featured, ...rest] = getCases(locale);
  return (
    <>
      {/* HERO */}
      <section className="hh dark">
        <Pattern kind="sunrise" />
        <div className="color-bar" aria-hidden />
        <div className="wrap hh-stack">
          <div className="hh-row">
            <div className="hh-copy">
              <Eyebrow className="off">{`${t.site.title}   ·   ${t.site.city}`}</Eyebrow>
              <h1 className="hh-h1">{h.hero.h1}</h1>
              <p className="hh-lede off">{h.hero.lede}</p>
            </div>
            <div className="hh-portrait">
              <Portrait alt={t.common.portraitAlt} />
            </div>
          </div>
          <div className="btns off">
            <Link href={lp("/contact")} className="btn btn-signal">{h.hero.cta}</Link>
            <Link href="#brand-therapy" className="btn btn-ghost">{h.hero.secondary}</Link>
          </div>
        </div>
      </section>

      {/* STANCES */}
      <section className="hs light" aria-labelledby="stances">
        <Pattern kind="passport" />
        <Tape position="top" />
        <Tape position="bottom" />
        <div className="wrap hs-stack">
          <Eyebrow className="off">{h.stances.eyebrow}</Eyebrow>
          <h2 className="hs-h2" id="stances">{h.stances.h2}</h2>
          <div className="stances off">
            {h.stances.items.map((s) => (
              <div className="stance" key={s.n}>
                <Tarot src={`/art/tarot_${s.n}.webp`} alt={fmt(h.stances.tarotAlt, { n: s.n, name: s.name })} />
                <h3 className="st-title">{s.title}</h3>
                <p className="st-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND THERAPY */}
      <section className="hb orange" id="brand-therapy" aria-labelledby="bt">
        <Pattern kind="rays" />
        <div className="wrap hb-wrap">
          <div className="hb-stack">
            <Eyebrow className="off">{h.newsletter.eyebrow}</Eyebrow>
            <h2 className="hb-h" id="bt">{h.newsletter.name}</h2>
            <p className="hb-lede off">{h.newsletter.lede}</p>
            <figure className="pull off">
              <span className="pull-rule" aria-hidden />
              <span className="pull-text">
                <q>{h.newsletter.quote}</q>
                <figcaption>
                  <span className="ey-in">
                    <span className="ey-seg"><span className="ey-sep" aria-hidden>{"   ·   "}</span><span className="ey-txt">{h.newsletter.from}</span></span>
                    <span className="ey-seg"><span className="ey-sep" aria-hidden>{"   ·   "}</span><span className="ey-txt">{h.newsletter.issueTitle}</span></span>
                  </span>
                </figcaption>
              </span>
            </figure>
            <div className="btns off">
              <Link href={lp("/writing/you-all-sound-the-same")} className="btn btn-dark">{h.newsletter.read}</Link>
              {site.newsletter && (
                <a href={site.newsletter} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">{h.newsletter.subscribe}</a>
              )}
            </div>
          </div>
          <div className="hb-card">
            <Tarot src="/art/tarot_issue.webp" alt={h.newsletter.tarotAlt} />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="hw dark" aria-labelledby="work">
        <div className="wrap hw-stack">
          <Eyebrow className="off">{h.work.eyebrow}</Eyebrow>
          <h2 className="hw-h2" id="work">{h.work.h2}</h2>
          <div className="cases">
            <CaseCard c={featured} featured locale={locale} read={t.common.readCase} />
            <div className="cases-row">
              <CaseCard c={rest[0]} locale={locale} read={t.common.readCase} />
              <CaseCard c={rest[1]} locale={locale} read={t.common.readCase} />
            </div>
            <div className="case-list">
              <CaseRow c={rest[2]} locale={locale} read={t.common.readCase} />
              <CaseRow c={rest[3]} locale={locale} read={t.common.readCase} />
              <div className="see-all">
                <Link href={lp("/work")} className="btn btn-outline-signal">{h.work.seeAll}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="ha light" aria-labelledby="about">
        <Pattern kind="passport" />
        <div className="color-bar" aria-hidden />
        <div className="wrap ha-stack">
          <div className="ha-row">
            <div className="ha-art">
              <img src="/art/desk.webp" alt={t.common.deskAlt} width={920} height={1240} loading="lazy" />
            </div>
            <div className="ha-copy">
              <Eyebrow className="off">{h.about.eyebrow}</Eyebrow>
              <h2 className="ha-h2" id="about">{h.about.h2}</h2>
              <p className="ha-lede off">{h.about.lede}</p>
              <p className="habits off">
                <span>{h.about.habits[0]}</span><span className="diamond" aria-hidden />
                <span>{h.about.habits[1]}</span><span className="diamond" aria-hidden />
                <span>{h.about.habits[2]}</span>
              </p>
              <p className="ha-italic off">{h.about.italic}</p>
            </div>
          </div>
          <div className="ha-btn">
            <Link href={lp("/about")} className="btn btn-ghost">{h.about.more}</Link>
          </div>
          <img className="stamps" src="/art/stamps.webp" alt={h.about.stampsAlt} width={720} height={520} loading="lazy" />
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
