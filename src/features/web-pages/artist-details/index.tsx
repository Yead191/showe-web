import { ArtistHero } from "./components/ArtistHero"
import { ArtistAbout } from "./components/ArtistAbout"
import { ArtistEvents } from "./components/ArtistEvents"
import type { Event } from "../events/components/EventCard"

export interface Artist {
    _id: string
    name: string
    image: string
    cover_image: string
    short_description?: string
    category?: string
    genres?: string[]
    instruments?: string[]
    languages?: string[]
}

export default function ArtistDetails({
    artist,
    events,
}: {
    artist: Artist
    events: Event[]
}) {
    if (!artist) return null

    return (
        <main className="min-h-screen bg-white pb-32">
            <ArtistHero artist={artist} />

            <div className="container mt-8 md:mt-10 space-y-12 md:space-y-16">
                <ArtistAbout artist={artist} />
                <ArtistEvents events={events ?? []} />
            </div>
        </main>
    )
}
