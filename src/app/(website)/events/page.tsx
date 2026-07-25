import EventsPage from '@/features/web-pages/events'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
    title: "Search Events — Find Shows Near You",
    description:
        "Search live events by location, date and category. Find theatre, concerts, comedy and more near you, then explore each show's interactive programme on SHOWE.",
    path: "/events",
    keywords: [
        "search events",
        "events near me",
        "find events by location",
        "event calendar",
        "upcoming shows",
        "theatre events",
        "concert listings",
        "filter events by date",
        "whats on near me",
        "browse events",
    ],
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function page({ searchParams }: { searchParams: Promise<any> }) {
    const search = await searchParams

    return (
        <EventsPage search={search} />
    )
}
