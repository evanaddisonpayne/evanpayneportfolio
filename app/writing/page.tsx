import type { Metadata } from "next";
import WritingPage from "@/components/pages/WritingPage";
import { en } from "@/content/en";
import { pageMeta } from "@/lib/i18n";

export const metadata: Metadata = pageMeta("en", "/writing", { title: en.writing.title });

export default function Page() {
  return <WritingPage locale="en" />;
}
