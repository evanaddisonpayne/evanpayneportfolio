import Footer from "@/components/Footer";
import { CaseCard, Eyebrow, Pattern } from "@/components/ui";
import { getCases, getDict, type Locale } from "@/lib/i18n";

export default function WorkPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const w = t.work;
  const [featured, ...rest] = getCases(locale);
  const rows = [rest.slice(0, 2), rest.slice(2, 4)];
  return (
    <>
      <section className="wk-head dark" aria-labelledby="work-title">
        <div className="pattern-corner" aria-hidden />
        <div className="wrap wk-stack">
          <Eyebrow className="off">{w.eyebrow}</Eyebrow>
          <h1 className="wk-h1" id="work-title">{w.h1}</h1>
          <p className="wk-lede off">{w.lede}</p>
        </div>
      </section>
      <section className="wk-cases light" aria-label={w.casesLabel}>
        <Pattern kind="passport" />
        <div className="wrap cases">
          <CaseCard c={featured} featured locale={locale} read={t.common.readCase} />
          {rows.map((r, i) => (
            <div className="cases-row" key={i}>
              {r.map((c) => (
                <CaseCard c={c} key={c.slug} locale={locale} read={t.common.readCase} />
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}
