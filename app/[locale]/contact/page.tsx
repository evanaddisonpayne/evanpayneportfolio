import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
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
  return pageMeta(locale, "/contact", { title: getDict(locale).contact.title });
}

export default async function Page({ params }: Props) {
  return <ContactPage locale={await loc(params)} />;
}
