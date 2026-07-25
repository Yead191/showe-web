import ArtistDetails, { type Artist } from "@/features/web-pages/artist-details"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { buildMetadata, toMetaDescription } from "@/lib/seo"
import { getImageUrl } from "@/lib/getImageUrl"
import { notFound } from "next/navigation"
import { cache } from "react"

const getArtist = cache((id: string) =>
    nextFetch<Artist>(`/artist/${id}`, { method: "GET" })
)

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const artistRes = await getArtist(id)
    const artist = artistRes?.data

    if (!artistRes?.success || !artist) {
        return buildMetadata({ title: "Artist", path: `/artists/${id}`, noIndex: true })
    }

    const keywords = [
        artist.name,
        artist.category,
        "artist profile",
        "performer",
        "upcoming performances",
        `${artist.name} events`,
        `${artist.name} tour`,
        ...(Array.isArray(artist.genres) ? artist.genres : []),
    ].filter(Boolean) as string[]

    return buildMetadata({
        title: artist.name,
        description: artist.short_description
            ? toMetaDescription(artist.short_description)
            : `Explore ${artist.name}${artist.category ? `, ${artist.category},` : ""} on SHOWE—biography, upcoming performances and interactive event programmes.`,
        path: `/artists/${id}`,
        image: artist.cover_image || artist.image ? getImageUrl(artist.cover_image || artist.image) : undefined,
        keywords,
        type: "profile",
    })
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [artistRes, eventsRes] = await Promise.all([
        getArtist(id),
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
