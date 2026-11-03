import type { Metadata } from "next";
import PhotosView from "@/components/turkscaicos/PhotosView";

export const metadata: Metadata = { title: "Photos" };

export default function Page() {
  return <PhotosView />;
}
