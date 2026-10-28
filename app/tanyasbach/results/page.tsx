import type { Metadata } from "next";
import ResultsView from "@/components/tanyasbach/ResultsView";

export const metadata: Metadata = { title: "En vivo" };

export default function Page() {
  return <ResultsView />;
}
