import type { Metadata } from "next";
import VoteView from "@/components/tanyasbach/VoteView";

export const metadata: Metadata = { title: "Vote" };

export default function Page() {
  return <VoteView />;
}
