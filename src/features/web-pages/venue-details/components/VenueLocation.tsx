"use client"

import { MapPin, ExternalLink } from "lucide-react"
import type { Venue } from "../index"

export function VenueLocation({ venue }: { venue: Venue }) {
    const coords = venue.location?.coordinates || (venue as any).coordinates
    let lat: number | null = null
    let lng: number | null = null

    if (Array.isArray(coords) && coords.length >= 2) {
        // GeoJSON [longitude, latitude]
        lng = Number(coords[0])
        lat = Number(coords[1])
    } else if (coords && typeof coords === "object") {
        lat = Number(coords.latitude ?? coords.lat ?? null)
        lng = Number(coords.longitude ?? coords.lng ?? null)
    }

    const hasValidCoords = typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)
    const addressParts = [venue.name, venue.address_line1, venue.city, venue.country].filter(Boolean)
    const addressString = addressParts.join(", ")

    // Formulate query string with loc: prefix for pin marker on google maps
    const query = hasValidCoords
        ? `loc:${lat}+${lng}`
        : encodeURIComponent(addressString || venue.name)

    const mapSrc = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=B&output=embed`
    const mapUrl = hasValidCoords
        ? `https://maps.google.com/?q=${lat},${lng}`
        : `https://maps.google.com/?q=${encodeURIComponent(addressString || venue.name)}`

    const displayAddress = [venue.address_line1, venue.city, venue.country].filter(Boolean).join(", ") || "Location"

    return (
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#F5A800]" />
                        <span>Venue Location</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                        {displayAddress}
                    </p>
                </div>

                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-50 hover:bg-[#014B52] hover:text-white border border-gray-200 transition-all font-bold text-xs text-gray-800 shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>

            {/* Google Maps Iframe Container */}
            <div className="relative w-full h-[340px] md:h-[420px] rounded-2xl overflow-hidden border border-gray-100 shadow-inner group bg-gray-100">
                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100/80 flex items-center gap-3 transition-transform duration-300 group-hover:scale-105 pointer-events-none">
                    <div className="h-9 w-9 rounded-xl bg-[#F5A800] text-white flex items-center justify-center shrink-0 shadow-md animate-bounce">
                        <MapPin className="h-5 w-5 fill-white text-[#F5A800]" />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-black text-gray-900 leading-tight">{venue.name}</p>
                        <p className="text-[10px] font-bold text-gray-500 truncate max-w-[200px] mt-0.5">
                            {venue.address_line1 || venue.city || "Venue Pinned"}
                        </p>
                    </div>
                </div>

                {/* Embedded Map */}
                <iframe
                    title={`Google Map of ${venue.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={mapSrc}
                    className="w-full h-full"
                />
            </div>
        </section>
    )
}
