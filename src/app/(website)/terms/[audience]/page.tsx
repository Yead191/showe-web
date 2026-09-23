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
  const disclaimerType = resolveDisclaimerType("terms", audience);
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
      "SHOWE terms",
      "terms and conditions",
      config.audienceLabel,
      "legal agreement",
      "digital programmes",
      "user agreement",
    ],
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const disclaimerType = resolveDisclaimerType("terms", audience);
  const config = LEGAL_DOCS[disclaimerType];

  const res = await getDisclaimer(disclaimerType);

  return <LegalPage config={config} htmlContent={res?.data} />;
}
