import { ArtistHero } from "./components/ArtistHero"
import { ArtistAbout } from "./components/ArtistAbout"
import { ArtistEvents } from "./components/ArtistEvents"

export default function ArtistDetails({ artist }: { artist: any }) {
    if (!artist) return null

    return (
        <main className="min-h-screen bg-white pb-32">
            <ArtistHero artist={artist} />

            <div className="container mt-8 md:mt-10 space-y-12 md:space-y-16">
                {/* Statistics Section */}
                {/* <ArtistStats stats={artist.stats} /> */}

                {/* About Section */}
                <ArtistAbout about={artist.about} />

                {/* Events Section */}
                <ArtistEvents events={artist.events} />
            </div>
        </main>
    )
}
