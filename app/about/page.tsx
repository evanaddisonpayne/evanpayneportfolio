import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { en } from "@/content/en";
import { pageMeta } from "@/lib/i18n";

export const metadata: Metadata = pageMeta("en", "/about", { title: en.about.title });

export default function Page() {
  return <AboutPage locale="en" />;
}
