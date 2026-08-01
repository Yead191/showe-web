import EventDetails from "@/features/web-pages/events/event-details";
import EventNotFound from "@/features/web-pages/events/event-details/components/EventNotFound";
import type { EventDetail } from "@/features/web-pages/events/event-details/types";
import getProfile from "@/helpers/next-fetch/getProfile";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { buildMetadata, toMetaDescription } from "@/lib/seo";
import { getImageUrl } from "@/lib/getImageUrl";
import { cache } from "react";

// Memoized so generateMetadata + the page share a single request.
const getEvent = cache((id: string) =>
  nextFetch<EventDetail>(`/event/${id}`, {
    method: "GET",
    cache: "default",
    tags: [`event-${id}`],
  }),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);
  const data = event?.data;
  //   console.log(data);
  if (!event?.success || !data) {
    return buildMetadata({
      title: "Event",
      path: `/events/${id}`,
      noIndex: true,
    });
  }

  const keywords = [
    data.title,
    data.category,
    `${data.category} events`,
    "event tickets",
    "show times",
    "event programme",
    ...(data.address ? [`events in ${data.address}`] : []),
    ...(Array.isArray(data.tags) ? data.tags : []),
  ].filter(Boolean) as string[];

  return buildMetadata({
    title: data.title,
    description: toMetaDescription(data.description_html),
    path: `/events/${id}`,
    image: data.cover_image ? getImageUrl(data.cover_image) : undefined,
    keywords,
    type: "article",
  });
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [event, user] = await Promise.all([getEvent(id), getProfile()]);
  if (!event?.success || !event.data) {
    return <EventNotFound />;
  }

  return <EventDetails event={event.data} user={user} />;
}
