import Link from "next/link";
import Footer from "@/components/Footer";
import Globe from "@/components/Globe";
import { Eyebrow, Pattern } from "@/components/ui";
import { getDict, localePath, type Locale } from "@/lib/i18n";

function Segs({ text }: { text: string }) {
  return (
    <span className="ey-in">
      {text.split(/\s+·\s+/).map((p, i) => (
        <span className="ey-seg" key={i}>
          <span className="ey-sep" aria-hidden>{"   ·   "}</span>
          <span className="ey-txt">{p}</span>
        </span>
      ))}
    </span>
  );
}

export default function AboutPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const a = t.about;
  const lp = (p: string) => localePath(locale, p);
  const stops = a.long.stops;
  return (
    <>
      <section className="ab-hero dark">
        <div className="color-bar" aria-hidden />
        <div className="wrap ab-hero-row">
          <div className="ab-hero-copy">
            <Eyebrow className="off">{a.hero.eyebrow}</Eyebrow>
            <h1 className="ab-h1">{a.hero.h1}</h1>
            <p className="ab-lede off">{a.hero.lede}</p>
            <div className="btns off">
              <Link href={lp("/contact")} className="btn btn-signal">{a.hero.cta}</Link>
              <Link href={lp("/resume")} className="btn btn-ghost">{a.hero.resume}</Link>
            </div>
          </div>
          <div className="ab-art">
            <img src="/art/desk.webp" alt={t.common.deskAlt} width={920} height={1240} />
          </div>
        </div>
      </section>

      <section className="ab-long light" aria-labelledby="long-way">
        <Pattern kind="passport" />
        <div className="wrap ab-long-stack">
          <div className="ab-long-head">
            <div className="ab-long-title">
              <Eyebrow>{a.long.eyebrow}</Eyebrow>
              <h2 className="ab-h2" id="long-way">{a.long.h2}</h2>
            </div>
            <p className="ab-long-lede">{a.long.lede}</p>
          </div>

          <ol className="career-strip" aria-label={a.long.careerLabel}>
            {stops.map(([y, l1, l2], i) => (
              <li key={y + l1} style={{ ["--i" as string]: i }}>
                <span className={`dot${i === stops.length - 1 ? " now" : ""}`} />
                <span className="year">{y}</span>
                <span className="label">{l1}{l2 && <br />}{l2}</span>
              </li>
            ))}
          </ol>
          <ol className="career-list" aria-label={a.long.careerLabel}>
            {stops.map(([y, l1, l2], i) => (
              <li key={y + l1}>
                <span className={`dot${i === stops.length - 1 ? " now" : ""}`} />
                <span className="year">{y}</span>
                <span className="label">{l1} {l2}</span>
              </li>
            ))}
          </ol>

          <div className="ab-chapters">
            {a.long.chapters.map((c) => (
              <article className="ab-chapter" key={c.n}>
                <p className="row"><span className="num">({c.n})</span> <span className="t">{c.title}</span></p>
                <p className="meta"><Segs text={c.meta} /></p>
                <p className="body">{c.body}</p>
                <p className="proof">{c.chips[0]}<span className="pipe" aria-hidden>{"   |   "}</span>{c.chips[1]}</p>
              </article>
            ))}
          </div>

          <div className="ab-long-foot">
            <p className="italic">{a.long.education}</p>
            <Link href={lp("/resume")} className="ab-resume-link">{a.long.resumeLink}</Link>
          </div>
        </div>
      </section>

      <section className="ab-how dark" aria-labelledby="how">
        <div className="wrap ab-how-stack">
          <Eyebrow className="off">{a.how.eyebrow}</Eyebrow>
          <h2 className="ab-how-h2" id="how">{a.how.h2}</h2>
          <div className="ab-habits off">
            {a.how.habits.map((h, i) => (
              <article className="ab-habit" key={h.title}>
                <p className="num">({["I", "II", "III"][i]})</p>
                <h3 className="t">{h.title}</h3>
                <p className="b">{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-otc light" aria-labelledby="otc">
        <Pattern kind="passport" />
        <div className="wrap ab-otc-cols">
          <div className="ab-otc-copy">
            <Eyebrow className="off">{a.outside.eyebrow}</Eyebrow>
            <h2 className="ab-h2" id="otc">{a.outside.h2}</h2>
            <div className="ab-otc-text off">
              {a.outside.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <dl className="otc-list off">
            {a.outside.list.map(([dt, dd]) => (
              <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
            ))}
          </dl>
        </div>
        <div className="wrap ab-globe">
          <Globe lang={locale} title={a.outside.mapTitle} />
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
