import { getDict, type Locale } from "@/lib/i18n";
import ShareClient from "./ShareClient";

/** Share row for articles: LinkedIn and copy link, labeled in the page's language. */
export default function Share({ locale = "en" }: { locale?: Locale }) {
  const t = getDict(locale).share;
  return <ShareClient label={t.label} copy={t.copy} copied={t.copied} />;
}
