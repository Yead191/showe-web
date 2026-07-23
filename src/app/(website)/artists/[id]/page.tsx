import ArtistDetails from "@/features/web-pages/artist-details"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { notFound } from "next/navigation"

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [artistRes, eventsRes] = await Promise.all([
        nextFetch(`/artist/${id}`, { method: "GET" }),
        nextFetch(`/artist/events/${id}`, { method: "GET" }),
    ])

    if (!artistRes.success || !artistRes.data) {
        notFound()
    }

    return (
        <ArtistDetails
            artist={artistRes.data}
            events={eventsRes.data ?? []}
        />
    )
}
