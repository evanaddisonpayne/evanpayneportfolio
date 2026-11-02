import type { Metadata } from "next";
import ResumePage from "@/components/pages/ResumePage";
import { en } from "@/content/en";
import { pageMeta } from "@/lib/i18n";

export const metadata: Metadata = pageMeta("en", "/resume", { title: en.resume.title });

export default function Page() {
  return <ResumePage locale="en" />;
}
