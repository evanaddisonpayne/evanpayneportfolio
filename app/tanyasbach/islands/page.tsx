import type { Metadata } from "next";
import IslandsView from "@/components/tanyasbach/IslandsView";

export const metadata: Metadata = { title: "Islands" };

export default function Page() {
  return <IslandsView />;
}
