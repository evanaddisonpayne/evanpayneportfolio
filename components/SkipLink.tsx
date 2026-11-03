"use client";

import { usePathname } from "next/navigation";
import type { ChromeLabels } from "@/lib/i18n";
import { splitLocale } from "@/lib/locales";

export default function SkipLink({ labels }: { labels: ChromeLabels }) {
  const { locale } = splitLocale(usePathname() || "/");
  return (
    <a href="#main" className="sr-only">
      {labels[locale].skip}
    </a>
  );
}
