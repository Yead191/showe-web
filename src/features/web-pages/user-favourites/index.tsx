"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"
import { Calendar, Heart, MapPin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getImageUrl } from "@/lib/getImageUrl"
import {
    toggleEventFavorite,
    toggleVenueFavorite,
} from "@/helpers/next-fetch/favoriteActions"

export interface FavouriteEvent {
    _id: string
    title: string
    category?: string
    cover_image?: string
    price?: number
    event_date?: string
    address?: string
    interest_count?: number
}

export interface FavouriteVenue {
    _id: string
    name: string
    cover_image?: string
    logo?: string
    city?: string
    country?: string
    address_line1?: string
    events_count?: number
}

export default function UserFavourites({
    events,
    venues,
}: {
    events: FavouriteEvent[]
    venues: FavouriteVenue[]
}) {
    const router = useRouter()
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleUnfavoriteEvent = async (eventId: string) => {
        if (!eventId || loadingId) return
        setLoadingId(eventId)
        try {
            const res = await toggleEventFavorite(eventId)
            if (res?.success) {
                toast.success(res.message || "Removed from favourites")
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

    const handleUnfavoriteVenue = async (venueId: string) => {
        if (!venueId || loadingId) return
        setLoadingId(venueId)
        try {
            const res = await toggleVenueFavorite(venueId)
            if (res?.success) {
                toast.success(res.message || "Removed from favourites")
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

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-1">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                    My Favourites
                </h1>
                <p className="text-gray-500 font-medium">
                    Keep track of everything you love
                </p>
            </div>

            <Tabs defaultValue="events" className="w-full">
                <TabsList className="bg-gray-100/50 p-1 rounded-2xl mb-8 flex overflow-x-auto no-scrollbar whitespace-nowrap">
                    <TabsTrigger
                        value="events"
                        className="flex-1 rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        Events ({events.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="venues"
                        className="flex-1 rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        Venues ({venues.length})
                    </TabsTrigger>
                </TabsList>

                {/* ── Events ── */}
                <TabsContent value="events" className="animate-in fade-in zoom-in-95 duration-500">
                    {events.length === 0 ? (
                        <EmptyState label="No favourite events yet" href="/events" cta="Explore Events" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <Link href={`/events/${event._id}`} className="block">
                                        <div className="relative aspect-4/3 overflow-hidden">
                                            <Image
                                                src={event.cover_image ? getImageUrl(event.cover_image) : "/assets/images/events/event1.jpg"}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="p-5 space-y-2">
                                            {event.category && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A800]">
                                                    {event.category}
                                                </p>
                                            )}
                                            <h3 className="text-base font-black text-gray-900 line-clamp-2 group-hover:text-[#F5A800] transition-colors">
                                                {event.title}
                                            </h3>
                                            {event.address && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                                    <MapPin className="h-3.5 w-3.5 text-[#F5A800] shrink-0" />
                                                    <span className="line-clamp-1">{event.address}</span>
                                                </div>
                                            )}
                                            {event.event_date && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                                    <Calendar className="h-3.5 w-3.5 text-[#F5A800] shrink-0" />
                                                    <span>
                                                        {format(parseISO(event.event_date), "EEE, MMM dd, yyyy")}
                                                    </span>
                                                </div>
                                            )}
                                            {event.price != null && (
                                                <p className="text-lg font-black text-[#F5A800]">
                                                    ${Number(event.price).toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                    <button
                                        type="button"
                                        disabled={loadingId === event._id}
                                        onClick={() => handleUnfavoriteEvent(event._id)}
                                        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                                        title="Remove from favourites"
                                    >
                                        <Heart size={16} className="fill-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* ── Venues ── */}
                <TabsContent value="venues" className="animate-in fade-in zoom-in-95 duration-500">
                    {venues.length === 0 ? (
                        <EmptyState label="No favourite venues yet" href="/home" cta="Explore Venues" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {venues.map((venue) => {
                                const locationText = [venue.city, venue.country].filter(Boolean).join(", ")
                                    || venue.address_line1
                                    || "Location"
                                const image = venue.cover_image || venue.logo

                                return (
                                    <div
                                        key={venue._id}
                                        className="group relative h-52 rounded-3xl overflow-hidden shadow-sm border border-gray-100"
                                    >
                                        <Link href={`/venues/${venue._id}`} className="absolute inset-0 z-0">
                                            <Image
                                                src={image ? getImageUrl(image) : "/assets/images/events/event3.jpg"}
                                                alt={venue.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute bottom-6 left-6 right-16">
                                                <h3 className="text-lg font-black text-white">{venue.name}</h3>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-white/70 mt-1">
                                                    <MapPin className="h-3 w-3 text-[#F5A800]" />
                                                    {locationText}
                                                </div>
                                            </div>
                                        </Link>
                                        <button
                                            type="button"
                                            disabled={loadingId === venue._id}
                                            onClick={() => handleUnfavoriteVenue(venue._id)}
                                            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                                            title="Remove from favourites"
                                        >
                                            <Heart size={16} className="fill-white" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

function EmptyState({
    label,
    href,
    cta,
}: {
    label: string
    href: string
    cta: string
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart className="h-7 w-7 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">{label}</p>
            <Link
                href={href}
                className="text-sm font-black uppercase tracking-widest text-[#014B52] underline underline-offset-4 hover:text-[#F5A800] transition-colors"
            >
                {cta}
            </Link>
        </div>
    )
}
