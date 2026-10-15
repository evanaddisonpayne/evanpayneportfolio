import type { Metadata } from "next";
import PrepView from "@/components/amsterdam/PrepView";

export const metadata: Metadata = { title: "Prep" };

export default function PrepPage() {
  return <PrepView />;
}
