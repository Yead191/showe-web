import { VenueHero } from "./components/VenueHero"
import { VenueStats } from "./components/VenueStats"
import { VenueAbout } from "./components/VenueAbout"
import { VenueLocation } from "./components/VenueLocation"
import { VenueEvents } from "./components/VenueEvents"
import type { Event } from "@/features/web-pages/events/components/EventCard"

export interface VenueOwner {
    _id: string
    name: string
    email: string
    image?: string | null
    contact?: string | null
    organization_type?: string
}

export interface Venue {
    _id: string
    name: string
    status: string
    cover_image?: string | null
    logo?: string | null
    description?: string
    address_line1?: string
    city?: string
    country?: string
    zip_code?: string
    location?: {
        type: string
        coordinates: number[]
    }
    contact_email?: string
    contact_phone?: string
    website?: string
    brand_color?: string
    programmes_count?: number
    events_count?: number
    total_downloads?: number
    total_revenue?: number
    createdAt?: string
    updatedAt?: string
    isFavorited?: boolean
    owner?: VenueOwner
}

export default function VenueDetails({
    venue,
    events = [],
}: {
    venue: Venue
    events?: Event[]
}) {
    if (!venue) return null

    return (
        <main className="min-h-screen bg-gray-50/50 pb-32">
            <VenueHero venue={venue} />

            <div className="container mx-auto px-4 mt-8 md:mt-12 space-y-12 md:space-y-16">
                <VenueStats venue={venue} />
                <VenueAbout venue={venue} />
                <VenueLocation venue={venue} />
                <VenueEvents events={events} venueName={venue.name} />
            </div>
        </main>
    )
}
