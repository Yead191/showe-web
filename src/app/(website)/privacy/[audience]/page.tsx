import { cache } from "react";
import LegalPage, {
  LEGAL_DOCS,
  resolveDisclaimerType,
  type DisclaimerType,
} from "@/features/web-pages/legal";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { buildMetadata, toMetaDescription } from "@/lib/seo";

// Cache query per request so generateMetadata and page render share the call
const getDisclaimer = cache(async (type: DisclaimerType) => {
  return nextFetch<string>(`/disclaimer?type=${type}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 60 * 60 },
    tags: [`disclaimer-${type}`, "disclaimer"],
  });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const disclaimerType = resolveDisclaimerType("privacy", audience);
  const config = LEGAL_DOCS[disclaimerType];

  const res = await getDisclaimer(disclaimerType);
  const cleanDescription = res?.data
    ? toMetaDescription(res.data, 160)
    : config.description;

  return buildMetadata({
    title: `${config.title} (${config.shortAudience})`,
    description: cleanDescription,
    path: config.path,
    keywords: [
      "SHOWE privacy policy",
      "privacy",
      "data protection",
      config.audienceLabel,
      "GDPR",
      "digital privacy",
    ],
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const disclaimerType = resolveDisclaimerType("privacy", audience);
  const config = LEGAL_DOCS[disclaimerType];

  const res = await getDisclaimer(disclaimerType);

  return <LegalPage config={config} htmlContent={res?.data} />;
}
