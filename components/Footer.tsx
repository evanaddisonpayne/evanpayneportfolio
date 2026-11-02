import Link from "next/link";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import FooterScene from "./FooterScene";
import LangSwitch from "./LangSwitch";
import { Eyebrow } from "./ui";

export default function Footer({ cta = true, locale = "en" }: { cta?: boolean; locale?: Locale }) {
  const t = getDict(locale);
  return (
    <footer className={`footer${cta ? "" : " no-cta"}`}>
      <FooterScene />
      <div className="wrap ft-stack">
        {cta && (
          <>
            <Eyebrow className="off">{t.footer.eyebrow}</Eyebrow>
            <p className="ft-h">{t.footer.heading}</p>
            <div className="ft-btn off">
              <Link href={localePath(locale, "/contact")} className="btn btn-signal">
                {t.footer.button}
              </Link>
            </div>
          </>
        )}
        <div className="ft-bar off">
          <div className="ft-id">
            <span className="name">{site.name}</span>
            <span className="meta">
              {t.site.city}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;© {new Date().getFullYear()}
            </span>
          </div>
          <div className="ft-end">
            <nav className="ft-links" aria-label={t.footer.navLabel}>
              {site.linkedin && (
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {t.nav.links.map((l) => (
                <Link key={l.href} href={localePath(locale, l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <LangSwitch label={t.common.languageLabel} className="lang-footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
