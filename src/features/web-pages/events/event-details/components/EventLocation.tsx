"use client"

import { ExternalLink, Car, Bus, Bike, Footprints, } from "lucide-react"
import { Event } from "@/constants/events/mock-event-details"
import { cn } from "@/lib/utils"

const TRANSPORT_ICONS: Record<string, any> = {
    driving: Car,
    public_transport: Bus,
    cycling: Bike,
    walking: Footprints,
}

export function EventLocation({ event }: { event: Event }) {

    const lat = event?.location?.coordinates?.latitude;
    const lng = event?.location?.coordinates?.longitude;
    const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=18&output=embed`;
    return (
        <section className="space-y-10 py-12 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Location & Venue</h2>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{event.location.full_address}</p>
                </div>
                <a
                    href={event.location.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest shadow-sm"
                >
                    View on Google Maps
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>

            {/* ── Transport Options ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.transport_options.map((option) => {
                    const Icon = TRANSPORT_ICONS[option.mode] || Car
                    return (
                        <div
                            key={option.mode}
                            className={cn(
                                "flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all",
                                option.available
                                    ? "bg-white border-gray-100 shadow-sm hover:shadow-md"
                                    : "bg-gray-50 border-gray-100 opacity-50 grayscale"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-2xl",
                                option.available ? "bg-[#014B52]/5 text-[#014B52]" : "bg-gray-200 text-gray-400"
                            )}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-black text-gray-900 tracking-tight">{option.label}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {option.available ? "Available" : "Not Available"}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ── Map Placeholder ── */}
            <div className="relative w-full aspect-video md:aspect-21/9 rounded-[20px] overflow-hidden border border-gray-100 shadow-inner group">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0, }}
                        loading="lazy"
                        allowFullScreen
                        src={mapSrc}

                    ></iframe>
                </div>
                {/* Integration point for actual Google Maps / Leaflet component */}
            </div>
        </section>
    )
}
