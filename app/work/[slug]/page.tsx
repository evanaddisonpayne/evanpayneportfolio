import type { Metadata } from "next";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { cases } from "@/lib/cases";
import { getCaseIn, pageMeta } from "@/lib/i18n";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseIn("en", slug);
  return c ? pageMeta("en", `/work/${slug}`, { title: c.cardTitle.replace(/[.,]$/, ""), description: c.cardLine }) : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage locale="en" slug={slug} />;
}
