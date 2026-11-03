import type { Metadata } from "next";
import WorkPage from "@/components/pages/WorkPage";
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
  return pageMeta(locale, "/work", { title: getDict(locale).work.title });
}

export default async function Page({ params }: Props) {
  return <WorkPage locale={await loc(params)} />;
}
