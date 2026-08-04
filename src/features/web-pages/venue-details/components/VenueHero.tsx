"use client"

import Image from "next/image"
import { MapPin, Globe, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/getImageUrl"
import type { Venue } from "../index"
import { toast } from "sonner"

export function VenueHero({ venue }: { venue: Venue }) {
    const rawImage = venue.cover_image || venue.logo
    const coverImage = rawImage ? getImageUrl(rawImage) : "/assets/images/events/event3.jpg"
    const logoImage = venue.logo ? getImageUrl(venue.logo) : (venue.cover_image ? getImageUrl(venue.cover_image) : null)

    const locationText = [venue.address_line1, venue.city, venue.country].filter(Boolean).join(", ") || "Location"

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: venue.name,
                url: window.location.href,
            }).catch(() => {})
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success("Link copied to clipboard!")
        }
    }

    function getInitials(name?: string) {
        if (!name?.trim()) return "V"
        const parts = name.trim().split(/\s+/)
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return (
        <section id="banner" className="relative w-full">
            {/* Cover Image */}
            <div className="relative h-[280px] md:h-[420px] lg:h-[520px] w-full overflow-hidden bg-slate-900">
                <Image
                    src={coverImage}
                    alt={venue.name}
                    fill
                    className="w-full h-full object-cover opacity-90"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
            </div>

            {/* Profile Info Overlay */}
            <div className="container mx-auto px-4 -mt-20 md:-mt-24 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10 pb-6 border-b border-gray-100">
                    {/* Venue Logo / Avatar */}
                    <div className="relative h-32 w-32 md:h-44 md:w-44 rounded-3xl overflow-hidden border-4 border-white bg-[#014B52] shadow-2xl shrink-0 flex items-center justify-center">
                        {logoImage ? (
                            <Image
                                src={logoImage}
                                alt={venue.name}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <span className="text-4xl font-black text-[#F5A800]">
                                {getInitials(venue.name)}
                            </span>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            {venue.status && (
                                <span className="bg-[#014B52] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md">
                                    {venue.status}
                                </span>
                            )}
                            {venue.city && (
                                <span className="bg-[#F5A800] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md">
                                    {venue.city}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                            {venue.name}
                        </h1>

                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-[#F5A800] shrink-0" />
                            <span>{locationText}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {venue.website && (
                            <a
                                href={venue.website.startsWith("http") ? venue.website : `https://${venue.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-initial"
                            >
                                <Button className="w-full bg-[#014B52] hover:bg-[#01383e] text-white font-bold h-12 px-6 rounded-2xl gap-2 shadow-lg shadow-[#014B52]/20 cursor-pointer">
                                    <Globe className="h-4 w-4" />
                                    <span>Website</span>
                                </Button>
                            </a>
                        )}
                        <Button
                            variant="outline"
                            onClick={handleShare}
                            className="h-12 w-12 rounded-2xl border-gray-200 text-gray-700 hover:bg-gray-50 p-0 cursor-pointer"
                            title="Share"
                        >
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
