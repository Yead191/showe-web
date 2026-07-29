import MyProgrammesPage from "@/features/web-pages/programmes";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { buildMetadata } from "@/lib/seo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const search = await searchParams;
  const category =
    typeof search?.category === "string" ? search.category : undefined;
  const pretty = category
    ? category.charAt(0) + category.slice(1).toLowerCase()
    : undefined;

  return buildMetadata({
    title: pretty ? `${pretty} Programmes` : "Interactive Programmes",
    description:
      "Browse SHOWE's collection of interactive digital programmes—rich, immersive playbills for theatre, music and live performances you can explore anywhere.",
    path: category ? `/programmes?category=${category}` : "/programmes",
    keywords: [
      "digital programmes",
      "interactive programmes",
      "event programmes",
      "theatre programmes",
      "show programmes",
      "browse programmes",
      "digital playbill",
      ...(pretty ? [`${pretty.toLowerCase()} programmes`] : []),
    ],
  });
}

export default async function page({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const search = await searchParams;

  const params = new URLSearchParams();
  if (search.category) params.set("category", search.category);

  const programmes = await nextFetch(`/booking?${params.toString()}`, {
    method: "GET",
    cache: "default",
    tags: ["programmes"],
  });
  return <MyProgrammesPage programmes={programmes?.data ?? []} />;
}
