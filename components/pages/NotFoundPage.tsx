import Link from "next/link";
import Footer from "@/components/Footer";
import { Eyebrow, Tarot } from "@/components/ui";
import { getDict, localePath, type Locale } from "@/lib/i18n";

export default function NotFoundPage({ locale }: { locale: Locale }) {
  const n = getDict(locale).notFound;
  return (
    <>
      <section className="nf dark">
        <img className="nf-rays" src="/art/rays_404.svg" alt="" aria-hidden="true" width={1440} height={900} />
        <div className="wrap nf-wrap">
          <div className="nf-card">
            <Tarot src="/art/tarot_404.webp" alt={n.tarotAlt} />
          </div>
          <div className="nf-stack">
            <div className="off"><Eyebrow>{n.eyebrow}</Eyebrow></div>
            <h1 className="nf-h1">{n.h1[0]}<br />{n.h1[1]}</h1>
            <p className="off nf-lede">{n.lede}</p>
            <div className="off nf-btns btns">
              <Link href={localePath(locale, "/")} className="btn btn-signal">{n.home}</Link>
              <Link href={localePath(locale, "/work")} className="btn btn-ghost">{n.work}</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </>
  );
}
