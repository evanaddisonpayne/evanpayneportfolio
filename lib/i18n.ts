import type { Metadata } from "next";
import { de } from "@/content/de";
import { en, type Dict } from "@/content/en";
import { fr } from "@/content/fr";
import { cases as casesDe } from "@/content/cases/de";
import { cases as casesFr } from "@/content/cases/fr";
import { cases as casesEn, type Case } from "@/lib/cases";
import { site } from "@/lib/site";
import { altLocales, localePath, type Locale } from "@/lib/locales";

export { locales, altLocales, isLocale, localePath, type Locale } from "@/lib/locales";

const dicts: Record<Locale, Dict> = { en, fr, de };
const caseSets: Record<Locale, Case[]> = { en: casesEn, fr: casesFr, de: casesDe };

export const getDict = (locale: Locale): Dict => dicts[locale];
export const getCases = (locale: Locale): Case[] => caseSets[locale];
export const getCaseIn = (locale: Locale, slug: string) => caseSets[locale].find((c) => c.slug === slug);

/** Fills {placeholders}. */
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** The labels the client-side chrome needs (nav, menu, skip link), small enough to send for every locale. */
export function chromeLabels() {
  const pick = (d: Dict) => ({
    skip: d.common.skip,
    homeLabel: d.common.homeLabel,
    languageLabel: d.common.languageLabel,
    langName: d.langName,
    nav: d.nav,
  });
  return { en: pick(en), fr: pick(fr), de: pick(de) };
}
export type ChromeLabels = ReturnType<typeof chromeLabels>;

/**
 * hreflang alternates and Open Graph locale for one page, given its English path.
 * Alternates are only emitted when the production URL is configured, so they never point at localhost.
 */
export function pageMeta(locale: Locale, path: string, extra: Metadata = {}): Metadata {
  const d = dicts[locale];
  const languages: Record<string, string> = { en: path, "x-default": path };
  for (const l of altLocales) languages[l] = localePath(l, path);
  return {
    ...extra,
    ...(site.url ? { alternates: { canonical: localePath(locale, path), languages } } : {}),
    openGraph: {
      type: "website",
      siteName: "Evan Addison Payne",
      locale: d.meta.ogLocale,
      alternateLocale: [en, fr, de].filter((x) => x !== d).map((x) => x.meta.ogLocale),
      ...(extra.openGraph ?? {}),
    },
  };
}
