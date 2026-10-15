import type { Metadata } from "next";
import FunView from "@/components/amsterdam/FunView";

export const metadata: Metadata = { title: "Fun" };

export default function FunPage() {
  return <FunView />;
}
