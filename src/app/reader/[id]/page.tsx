import ReaderPage from "@/features/web-pages/reader/ReaderPage";
import { normalizeProgramme } from "@/features/web-pages/reader/programmesApi";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { buildMetadata } from "@/lib/seo";
import { getImageUrl } from "@/lib/getImageUrl";
import { cache } from "react";
import ProgrammeNotFound from "@/features/web-pages/reader/ProgrammeNotFound";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getProgramme = cache((id: string, token?: string) =>
  nextFetch<any>(`/programmes/${id}?${token ? `token=${token}` : ""}`, {
    method: "GET",
    cache: "default",
    tags: [`programme-${id}`],
  }),
);

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}) {
  const search = await searchParams;
  const token = typeof search?.token === "string" ? search.token : undefined;

  const { id } = await params;
  const res = await getProgramme(id, token);
  const programme = res?.data;

  return buildMetadata({
    title: programme?.title
      ? `${programme.title} — Programme`
      : "Programme Reader",
    description: programme?.title
      ? `Read “${programme.title}” — an interactive digital programme on SHOWE with rich media, artist profiles and behind-the-scenes content.`
      : "Read this interactive digital programme on SHOWE—an immersive, mobile-first playbill experience.",
    path: `/reader/${id}`,
    image: programme?.cover_image
      ? getImageUrl(programme.cover_image)
      : undefined,
    keywords: [
      "programme reader",
      "digital programme",
      "interactive playbill",
      ...(programme?.title ? [programme.title] : []),
    ],
    type: "article",
  });
}

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}) {
  const search = await searchParams;
  const token = typeof search?.token === "string" ? search.token : undefined;

  const { id } = await params;
  const [programme] = await Promise.all([getProgramme(id, token)]);
  // console.log(programme)
  if (!programme?.success || !programme.data) {
    return <ProgrammeNotFound variant={programme?.message === "jwt malformed" ? "unauthorized" : "not-found"} />
  }
  return <ReaderPage programme={normalizeProgramme(programme.data)} />;
}
