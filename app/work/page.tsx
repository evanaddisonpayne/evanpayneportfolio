import type { Metadata } from "next";
import WorkPage from "@/components/pages/WorkPage";
import { en } from "@/content/en";
import { pageMeta } from "@/lib/i18n";

export const metadata: Metadata = pageMeta("en", "/work", { title: en.work.title });

export default function Page() {
  return <WorkPage locale="en" />;
}
