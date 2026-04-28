import ArtistDetails from "@/features/web-pages/artist-details"
import { mockArtistDetails } from "@/constants/artists/mockArtistDetails"

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    console.log("id", id)
    const artistData = mockArtistDetails
    return (
        <ArtistDetails artist={artistData} />
    )
}
