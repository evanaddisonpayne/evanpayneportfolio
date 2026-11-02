"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localePath, locales, splitLocale } from "@/lib/locales";

const names = { en: "English", fr: "Français", de: "Deutsch" } as const;

/** EN · FR · DE, linking to the same page in each language. Keeps <html lang> in step on client-side navigation. */
export default function LangSwitch({ label, className = "" }: { label: string; className?: string }) {
  const { locale, rest } = splitLocale(usePathname() || "/");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <nav className={`lang ${className}`.trim()} aria-label={label}>
      {locales.map((l, i) => (
        <span key={l} style={{ display: "contents" }}>
          {i > 0 && <span className="lang-sep" aria-hidden>·</span>}
          <Link
            href={localePath(l, rest)}
            hrefLang={l}
            lang={l}
            aria-label={names[l]}
            aria-current={l === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
