import type { Metadata } from "next";
import ArticleDe, { deck as deckDe, title as titleDe } from "@/content/articles/you-all-sound-the-same.de";
import ArticleFr, { deck as deckFr, title as titleFr } from "@/content/articles/you-all-sound-the-same.fr";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

async function which(params: Props["params"]): Promise<"fr" | "de"> {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "de") notFound();
  return locale;
}

const articles = {
  fr: { Article: ArticleFr, title: titleFr, deck: deckFr },
  de: { Article: ArticleDe, title: titleDe, deck: deckDe },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await which(params);
  const a = articles[locale];
  return pageMeta(locale, "/writing/you-all-sound-the-same", {
    title: a.title,
    description: a.deck,
    openGraph: { type: "article" },
  });
}

export default async function Page({ params }: Props) {
  const { Article } = articles[await which(params)];
  return <Article />;
}
