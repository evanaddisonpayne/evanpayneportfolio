import ByLocale from "@/components/ByLocale";
import NotFoundPage from "@/components/pages/NotFoundPage";

// not-found pages don't receive params, so both languages render on the server and the client shows the one in the URL.
export default function NotFound() {
  return <ByLocale fr={<NotFoundPage locale="fr" />} de={<NotFoundPage locale="de" />} />;
}
