import type { Metadata } from "next";
import PackingView from "@/components/turkscaicos/PackingView";

export const metadata: Metadata = { title: "Packing list" };

export default function Page() {
  return <PackingView />;
}
