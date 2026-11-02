import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/i18n";

export const metadata = pageMeta("en", "/");

export default function Home() {
  return <HomePage locale="en" />;
}
