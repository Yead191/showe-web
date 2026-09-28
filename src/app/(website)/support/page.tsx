import Support, { type FaqItem } from "@/features/web-pages/support";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support & Help Centre",
  description:
    "Need a hand? Browse SHOWE FAQs or contact our support team for help with events, tickets, digital programmes and your account.",
  path: "/support",
  keywords: [
    "SHOWE support",
    "help centre",
    "contact SHOWE",
    "SHOWE FAQ",
    "customer service",
    "event app help",
    "ticket support",
    "programme help",
  ],
});

export default async function page() {
  const faq = await nextFetch<FaqItem[]>("/faq", {
    method: "GET",
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["faq"],
    },
  });
  return <Support faq={faq} />;
}
