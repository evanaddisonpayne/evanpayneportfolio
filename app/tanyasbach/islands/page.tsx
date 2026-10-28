import type { Metadata } from "next";
import IslandsView from "@/components/tanyasbach/IslandsView";

export const metadata: Metadata = { title: "Places" };

export default function Page() {
  return <IslandsView />;
}
