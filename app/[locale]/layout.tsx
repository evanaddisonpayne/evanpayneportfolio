import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { altLocales, getDict, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return altLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  const t = getDict(locale);
  return { title: { default: t.meta.defaultTitle, template: "%s · Evan Addison Payne" }, description: t.meta.description };
}

/** /fr and /de. The root layout renders <html lang="en">; this marks the page content with its real language. */
export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return (
    <div lang={locale} className="locale-root">
      {children}
    </div>
  );
}
