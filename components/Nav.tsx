"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LangSwitch from "@/components/LangSwitch";
import type { ChromeLabels } from "@/lib/i18n";
import { localePath, splitLocale } from "@/lib/locales";
import { roman, site } from "@/lib/site";

export default function Nav({ labels }: { labels: ChromeLabels }) {
  const pathname = usePathname() || "/";
  const { locale, rest } = splitLocale(pathname);
  const t = labels[locale];
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => rest === href || rest.startsWith(href + "/");

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The private trip pages have their own chrome and aren't part of the portfolio.
  const isTrip = (base: string) => pathname === base || pathname.startsWith(base + "/");
  if (isTrip("/amsterdam") || isTrip("/christmas2026") || isTrip("/tanyasbach") || isTrip("/tanyasbach-private")) return null;

  const brand = (
    <Link href={localePath(locale, "/")} className="brand" aria-label={t.homeLabel.replace("{name}", site.name)}>
      <img src="/art/seal.webp" alt="" width={44} height={44} />
      <span>
        <span className="brand-name">{site.name}</span>
        <span className="brand-coords">{site.coords}</span>
      </span>
    </Link>
  );

  return (
    <header className="nav" lang={locale === "en" ? undefined : locale}>
      <div className="wrap nav-inner">
        {brand}
        <nav className="nav-links" aria-label={t.nav.mainLabel}>
          {t.nav.links.map((l, i) => (
            <span key={l.href} style={{ display: "contents" }}>
              {i > 0 && <span className="diamond" aria-hidden />}
              <Link href={localePath(locale, l.href)} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </span>
          ))}
          <Link href={localePath(locale, "/contact")} className="btn btn-outline-signal nav-cta">
            {t.nav.cta}
          </Link>
        </nav>
        <LangSwitch label={t.languageLabel} className="lang-nav" />
        <button className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
          {t.nav.menu}
        </button>
      </div>

      <div id="site-menu" className="menu" hidden={!open} role="dialog" aria-modal="true" aria-label={t.nav.menuLabel}>
        <div className="nav">
          <div className="wrap nav-inner">
            {brand}
            <button className="menu-btn" onClick={() => setOpen(false)}>
              {t.nav.close}
            </button>
          </div>
        </div>
        <nav className="menu-links" aria-label={t.nav.menuLabel}>
          {t.nav.links.map((l, i) => (
            <Link key={l.href} href={localePath(locale, l.href)} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
              <span>({roman[i]})</span>
            </Link>
          ))}
        </nav>
        <div className="menu-cta">
          <Link href={localePath(locale, "/contact")} className="btn btn-outline-signal">
            {t.nav.cta}
          </Link>
          <LangSwitch label={t.languageLabel} className="lang-menu" />
          <span className="brand-coords">{site.coords}</span>
        </div>
      </div>
    </header>
  );
}
