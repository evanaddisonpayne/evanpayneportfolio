import type { Metadata } from "next";
import PlanView from "@/components/amsterdam/PlanView";

export const metadata: Metadata = { title: "Plan" };

export default function PlanIndex() {
  return <PlanView />;
}
