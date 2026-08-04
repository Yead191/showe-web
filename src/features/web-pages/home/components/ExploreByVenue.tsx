"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, ArrowUpRight, Heart } from "lucide-react"
import { VENUES } from "@/constants/events/venus"
import { getImageUrl } from "@/lib/getImageUrl"
import { toggleVenueFavorite } from "@/helpers/next-fetch/favoriteActions"
import { toast } from "sonner"

export default function ExploreByVenue({ venues }: { venues?: any[] }) {
    const router = useRouter()
    const venueList = (venues && venues.length > 0) ? venues : VENUES
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleToggleFavorite = async (venueId: string, currentlyFavorited: boolean) => {
        if (!venueId || loadingId) return

        setLoadingId(venueId)
        try {
            const res = await toggleVenueFavorite(venueId)
            if (res?.success) {
                toast.success(
                    res.message ||
                    (!currentlyFavorited ? "Added to favourites" : "Removed from favourites")
                )
                // Pull fresh list (with updated isFavorited) from backend
                router.refresh()
            } else {
                toast.error(
                    (typeof res?.error === "string" ? res.error : res?.message) ||
                    "Failed to update favourites"
                )
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoadingId(null)
        }
    }

    const handleDetails = (venue: any) => {
        if (venue._id) {
            router.push(`/venues/${venue._id}`)
            return
        }
        router.push(`/events?location=${encodeURIComponent(venue.name || venue.city || "")}`)
    }

    return (
        <section className="container py-12 lg:py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
                            Explore Event
                        </h2>
                        <div className="relative">
                            <h2 className="text-2xl md:text-[32px] font-semibold text-[#F5A800] tracking-tighter">
                                by Venue
                            </h2>
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#F5A800]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {venueList?.map((venue: any, idx: number) => {
                    const id = venue._id || venue.id || String(idx)
                    const rawImage = venue.cover_image || venue.logo || venue.image
                    const imageUrl = rawImage ? getImageUrl(rawImage) : "/assets/images/events/event3.jpg"

                    const locationParts = [venue.city, venue.country].filter(Boolean)
                    const locationText = locationParts.length > 0
                        ? locationParts.join(", ")
                        : (venue.address_line1 || "Location")

                    const eventCount = venue.events_count ?? venue.programmes_count ?? venue.eventCount ?? 0
                    // Backend source of truth
                    const isFav = !!venue.isFavorited
                    const isLoading = loadingId === id

                    return (
                        <div
                            key={id}
                            className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl shadow-black/5"
                        >
                            <Image
                                src={imageUrl}
                                alt={venue.name || "Venue"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                            {venue._id && (
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => handleToggleFavorite(venue._id, isFav)}
                                    className={`absolute top-4 right-4 z-20 h-10 w-10 rounded-full backdrop-blur-md border flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:pointer-events-none ${
                                        isFav
                                            ? "bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/30"
                                            : "bg-black/40 border-white/20 text-white hover:bg-black/60"
                                    }`}
                                    title={isFav ? "Remove from favourites" : "Add to favourites"}
                                    aria-pressed={isFav}
                                >
                                    <Heart
                                        className={`h-5 w-5 transition-colors ${
                                            isFav ? "fill-white text-white" : "text-white"
                                        }`}
                                    />
                                </button>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 z-10">
                                <div className="flex items-center gap-2 text-[#F5A800]">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{locationText}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{venue.name}</h3>
                                <div className="flex items-center justify-between pt-4 border-t border-white/20 mt-4">
                                    <span className="text-white/80 text-xs font-medium">{eventCount} Upcoming Events</span>
                                    <button
                                        type="button"
                                        onClick={() => handleDetails(venue)}
                                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                                    >
                                        Details
                                        <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
