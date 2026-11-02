import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { notFound } from "next/navigation";
import { isLocale, pageMeta, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };
const loc = async (params: Props["params"]): Promise<Locale> => {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return locale;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMeta(await loc(params), "/");
}

export default async function Page({ params }: Props) {
  return <HomePage locale={await loc(params)} />;
}
