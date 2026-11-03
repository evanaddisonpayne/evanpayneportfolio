import { notFound } from "next/navigation";

// Any unknown path under /fr or /de gets the 404 page in that language (app/[locale]/not-found.tsx).
export default function Unknown() {
  notFound();
}
