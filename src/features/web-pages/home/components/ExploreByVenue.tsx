"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowUpRight, Heart } from "lucide-react"
import { VENUES } from "@/constants/events/venus"
import { getImageUrl } from "@/lib/getImageUrl"
import { toggleVenueFavorite } from "@/helpers/next-fetch/favoriteActions"
import { toast } from "sonner"

export default function ExploreByVenue({ venues }: { venues?: any[] }) {
    const venueList = (venues && venues.length > 0) ? venues : VENUES

    const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>({})

    useEffect(() => {
        if (venues && venues.length > 0) {
            const initial: Record<string, boolean> = {}
            venues.forEach((v: any) => {
                const id = v._id || v.id
                if (id) {
                    initial[id] = !!(v.isFavorited ?? v.isFavorite)
                }
            })
            setFavoriteStates(initial)
        }
    }, [venues])

    const handleToggleFavorite = async (e: React.MouseEvent, venueId: string) => {
        e.preventDefault()
        e.stopPropagation()

        if (!venueId) return

        const currentState = favoriteStates[venueId] ?? false
        // Optimistic UI toggle
        setFavoriteStates((prev) => ({ ...prev, [venueId]: !currentState }))

        try {
            const res = await toggleVenueFavorite(venueId)
            if (res?.success) {
                toast.success(res.message || (!currentState ? "Added to favourites" : "Removed from favourites"))
            } else {
                // Revert on failure
                setFavoriteStates((prev) => ({ ...prev, [venueId]: currentState }))
                toast.error(res?.message || res?.error || "Failed to update favourites")
            }
        } catch {
            setFavoriteStates((prev) => ({ ...prev, [venueId]: currentState }))
            toast.error("Something went wrong. Please try again.")
        }
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
                    const id = venue._id || venue.id || idx
                    const rawImage = venue.cover_image || venue.logo || venue.image
                    const imageUrl = rawImage ? getImageUrl(rawImage) : "/assets/images/events/event3.jpg"

                    const locationParts = [venue.city, venue.country].filter(Boolean)
                    const locationText = locationParts.length > 0
                        ? locationParts.join(", ")
                        : (venue.address_line1 || venue.location || "Location")

                    const eventCount = venue.events_count ?? venue.programmes_count ?? venue.eventCount ?? 0
                    const href = venue._id ? `/venues/${venue._id}` : `/events?location=${encodeURIComponent(venue.name || venue.city || "")}`
                    const isFav = favoriteStates[id] ?? !!(venue.isFavorited ?? venue.isFavorite)

                    return (
                        <Link
                            key={id}
                            href={href}
                            className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-black/5 block"
                        >
                            <Image
                                src={imageUrl}
                                alt={venue.name || "Venue"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Favorite Button */}
                            {venue._id && (
                                <button
                                    type="button"
                                    onClick={(e) => handleToggleFavorite(e, venue._id)}
                                    className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                                    title={isFav ? "Remove from favourites" : "Add to favourites"}
                                >
                                    <Heart
                                        className={`h-5 w-5 transition-colors ${
                                            isFav ? "fill-red-500 text-red-500" : "text-white"
                                        }`}
                                    />
                                </button>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 transform transition-transform duration-500">
                                <div className="flex items-center gap-2 text-[#F5A800]">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{locationText}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{venue.name}</h3>
                                <div className="flex items-center justify-between pt-4 border-t border-white/20 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-white/80 text-xs font-medium">{eventCount} Upcoming Events</span>
                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
