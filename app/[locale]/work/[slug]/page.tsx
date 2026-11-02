import type { Metadata } from "next";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { cases } from "@/lib/cases";
import { notFound } from "next/navigation";
import { altLocales, getCaseIn, isLocale, pageMeta } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return altLocales.flatMap((locale) => cases.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const c = getCaseIn(locale, slug);
  return c ? pageMeta(locale, `/work/${slug}`, { title: c.cardTitle.replace(/[.,\u00a0]+$/, ""), description: c.cardLine }) : {};
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <CaseStudyPage locale={locale} slug={slug} />;
}
