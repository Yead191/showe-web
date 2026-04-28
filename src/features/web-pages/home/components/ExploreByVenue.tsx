"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, ArrowUpRight } from "lucide-react"
import { VENUES } from "@/constants/events/venus"


export default function ExploreByVenue() {
    const router = useRouter()

    const handleVenueClick = (venueName: string) => {
        router.push(`/events?location=${encodeURIComponent(venueName)}`)
    }

    return (
        <section className="container py-12 lg:py-16 ">
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
                {VENUES?.map((venue) => (
                    <div
                        key={venue.id}
                        onClick={() => handleVenueClick(venue.name)}
                        className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-black/5"
                    >
                        <Image
                            src={venue.image}
                            alt={venue.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 transform transition-transform duration-500">
                            <div className="flex items-center gap-2 text-[#F5A800]">
                                <MapPin className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{venue.location}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{venue.name}</h3>
                            <div className="flex items-center justify-between pt-4 border-t border-white/20 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-white/80 text-xs font-medium">{venue.eventCount} Upcoming Events</span>
                                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
