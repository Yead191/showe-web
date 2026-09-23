import BecomeCreator from "@/features/web-pages/become-creator";
import { buildMetadata } from "@/lib/seo";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import type { FaqItem } from "@/features/web-pages/support/types";

export const metadata = buildMetadata({
  title: "Become a Creator",
  description:
    "Turn your events into interactive experiences. Build and sell digital programmes, engage your audience and grow your revenue with SHOWE's creator tools.",
  path: "/become-creator",
  keywords: [
    "create event programmes",
    "event organiser tools",
    "digital programme builder",
    "sell programmes",
    "monetise events",
    "event creator platform",
    "programme maker",
    "for event creators",
    "grow event revenue",
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

  return <BecomeCreator faqs={faq?.data ?? []} />;
}
