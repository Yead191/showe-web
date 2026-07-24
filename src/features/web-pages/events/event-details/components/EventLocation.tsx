"use client"

import { ExternalLink } from "lucide-react"
import { EventDetail } from "../types"

export function EventLocation({ event }: { event: EventDetail }) {

    // GeoJSON coordinates are [longitude, latitude]
    const lng = event?.location?.coordinates?.[0]
    const lat = event?.location?.coordinates?.[1]
    const hasCoords = typeof lat === "number" && typeof lng === "number"
    const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=18&output=embed`
    const mapUrl = `https://maps.google.com/?q=${lat},${lng}`

    return (
        <section className="space-y-10 py-12 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Location & Venue</h2>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                        {event.vanue?.name ? `${event.vanue.name} — ` : ""}{event.address}
                    </p>
                </div>
                {hasCoords && (
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest shadow-sm"
                    >
                        View on Google Maps
                        <ExternalLink className="h-4 w-4" />
                    </a>
                )}
            </div>

            {/* ── Map ── */}
            {hasCoords && (
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
                </div>
            )}
        </section>
    )
}
