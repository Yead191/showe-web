import VenueDetails, { type Venue } from "@/features/web-pages/venue-details"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { buildMetadata, toMetaDescription } from "@/lib/seo"
import { getImageUrl } from "@/lib/getImageUrl"
import { notFound } from "next/navigation"
import { cache } from "react"

const getVenue = cache(async (id: string) => {
    // User-specific isFavorited — no-store + tag for refresh after favourite toggle
    const opts = { method: "GET" as const, cache: "no-store" as const, tags: ["venue-details"] }
    // Try /vanue/:id first (backend route), fallback to /venue/:id if needed
    const res = await nextFetch<Venue>(`/vanue/${id}`, opts)
    if (res.success && res.data) return res
    return await nextFetch<Venue>(`/venue/${id}`, opts)
})

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const venueRes = await getVenue(id)
    const venue = venueRes?.data

    if (!venueRes?.success || !venue) {
        return buildMetadata({ title: "Venue", path: `/venues/${id}`, noIndex: true })
    }

    return buildMetadata({
        title: venue.name,
        description: venue.description
            ? toMetaDescription(venue.description)
            : `Explore ${venue.name}${venue.city ? `, ${venue.city}` : ""} on SHOWE — upcoming events and interactive digital programmes.`,
        path: `/venues/${id}`,
        image: venue.cover_image || venue.logo ? getImageUrl(venue.cover_image || venue.logo) : undefined,
        keywords: [venue.name, venue.city, venue.country, "venue", "event venue", "theatre"].filter(Boolean) as string[],
    })
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const venueRes = await getVenue(id)

    if (!venueRes.success || !venueRes.data) {
        notFound()
    }

    const venue = venueRes.data

    const eventsRes = await nextFetch(`/event/search?address=${encodeURIComponent(venue.city || venue.name || "")}`, { method: "GET" })

    return (
        <VenueDetails
            venue={venue}
            events={eventsRes.data ?? []}
        />
    )
}
