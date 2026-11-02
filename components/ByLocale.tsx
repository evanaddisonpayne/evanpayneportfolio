"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { splitLocale } from "@/lib/locales";

/** Shows the child for the language in the current URL. */
export default function ByLocale({ fr, de }: { fr: ReactNode; de: ReactNode }) {
  const { locale } = splitLocale(usePathname() || "/");
  return <>{locale === "de" ? de : fr}</>;
}
