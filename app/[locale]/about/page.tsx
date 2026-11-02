import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { notFound } from "next/navigation";
import { getDict, isLocale, pageMeta, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };
const loc = async (params: Props["params"]): Promise<Locale> => {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return locale;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await loc(params);
  return pageMeta(locale, "/about", { title: getDict(locale).about.title });
}

export default async function Page({ params }: Props) {
  return <AboutPage locale={await loc(params)} />;
}
