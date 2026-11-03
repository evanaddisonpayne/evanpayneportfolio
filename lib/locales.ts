// Locale basics that are safe to import from client components (no dictionaries in here).
// English lives at the existing URLs; French and German live under /fr and /de.

export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const altLocales = ["fr", "de"] as const;

export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s);

/** "/work" in French is "/fr/work"; English paths stay as they are. Hash-only links are left alone. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en" || path.startsWith("#")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits "/fr/work/hireez" into { locale: "fr", rest: "/work/hireez" }. */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const m = pathname.match(/^\/(fr|de)(?=\/|$)/);
  if (!m) return { locale: "en", rest: pathname || "/" };
  return { locale: m[1] as Locale, rest: pathname.slice(m[0].length) || "/" };
}
