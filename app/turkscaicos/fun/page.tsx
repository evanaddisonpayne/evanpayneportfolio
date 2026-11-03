import type { Metadata } from "next";
import FunView from "@/components/turkscaicos/FunView";

export const metadata: Metadata = { title: "Fun" };

export default function Page() {
  return <FunView />;
}
