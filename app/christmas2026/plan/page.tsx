import type { Metadata } from "next";
import PlanView from "@/components/christmas2026/PlanView";

export const metadata: Metadata = { title: "Plan" };

export default function PlanPage() {
  return <PlanView />;
}
