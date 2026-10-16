import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlanView from "@/components/christmas2026/PlanView";
import { days } from "@/lib/christmas2026";

export const dynamicParams = false;
export function generateStaticParams() {
  return days.map((d) => ({ day: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ day: string }> }): Promise<Metadata> {
  const { day } = await params;
  const d = days.find((x) => x.id === day);
  return { title: d ? `${d.dow} ${d.num} · ${d.title}` : "Plan" };
}

export default async function PlanDay({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  if (!days.some((d) => d.id === day)) notFound();
  return <PlanView dayId={day} />;
}
