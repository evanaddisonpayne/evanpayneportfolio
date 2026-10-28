import type { Metadata } from "next";
import RsvpView from "@/components/tanyasbach/RsvpView";

export const metadata: Metadata = { title: "RSVP" };

export default function Page() {
  return <RsvpView />;
}
