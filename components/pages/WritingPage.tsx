import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { getDict, localePath, type Locale } from "@/lib/i18n";

export default function WritingPage({ locale }: { locale: Locale }) {
  const w = getDict(locale).writing;
  const f = w.featured;
  const href = localePath(locale, "/writing/you-all-sound-the-same");
  return (
    <>
      <section className="wr-head dark">
        <div className="wrap wr-intro">
          <Eyebrow>{w.eyebrow}</Eyebrow>
          <h1 className="wr-h1">{w.h1}</h1>
          <p className="wr-lede">{w.lede}</p>
        </div>
      </section>

      <section className="wr-pieces light">
        <div className="wrap">
          <article className="wr-feature">
            <Link href={href} className="wr-art" tabIndex={-1} aria-hidden>
              <img src="/art/tarot_1.webp" alt="" width={216} height={360} />
            </Link>
            <div className="wr-text">
              <p className="wr-meta">{f.meta}</p>
              <h2 className="wr-title">
                <Link href={href}>{f.title}</Link>
              </h2>
              <p className="wr-dek">{f.dek}</p>
              <p className="wr-meta sm">{f.date}</p>
              <p className="wr-read">
                <Link href={href}>{f.read}<span aria-hidden>→</span></Link>
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer locale={locale} />
    </>
  );
}
