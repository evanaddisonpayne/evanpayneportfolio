import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { en } from "@/content/en";
import { pageMeta } from "@/lib/i18n";

export const metadata: Metadata = pageMeta("en", "/contact", { title: en.contact.title });

export default function Page() {
  return <ContactPage locale="en" />;
}
