import type { Metadata } from "next";
import VillaView from "@/components/turkscaicos/VillaView";

export const metadata: Metadata = { title: "The villa" };

export default function Page() {
  return <VillaView />;
}
