"use client"

import Image from "next/image"
import { MapPin, Mail, Phone, Globe, ShieldCheck } from "lucide-react"
import { getImageUrl } from "@/lib/getImageUrl"
import type { Venue } from "../index"

export function VenueAbout({ venue }: { venue: Venue }) {
    const owner = venue.owner

    function getInitials(name?: string) {
        if (!name?.trim()) return "O"
        const parts = name.trim().split(/\s+/)
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content: Description */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <span>About Venue</span>
                        <div className="h-2 w-2 rounded-full bg-[#F5A800]" />
                    </h2>

                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                            {venue.description || "Welcome to " + venue.name + ". Explore interactive event programmes, digital playbills, and upcoming live performances at this premier venue."}
                        </p>
                    </div>
                </div>

                {/* Owner / Host Card if available */}
                {owner && (
                    <div className="bg-linear-to-br from-[#014B52] to-[#023338] text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-[#014B52]/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#F5A800]">
                                    Venue Host / Organization
                                </span>
                                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Verified Host</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="h-16 w-16 rounded-2xl bg-[#F5A800] flex items-center justify-center text-white text-xl font-black shrink-0 overflow-hidden relative shadow-lg shadow-black/20">
                                    {owner.image ? (
                                        <Image
                                            src={getImageUrl(owner.image)}
                                            alt={owner.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <span>{getInitials(owner.name)}</span>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white tracking-tight">{owner.name}</h3>
                                    {owner.organization_type && (
                                        <p className="text-white/70 text-xs font-medium">{owner.organization_type}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-white/80">
                                {owner.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-[#F5A800]" />
                                        <span className="truncate">{owner.email}</span>
                                    </div>
                                )}
                                {owner.contact && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-[#F5A800]" />
                                        <span>{owner.contact}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar: Location & Contact Info */}
            <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Location & Contact</h3>

                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-gray-100 text-[#014B52] shrink-0 mt-0.5">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Address</p>
                                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                                    {[venue.address_line1, venue.city, venue.zip_code, venue.country].filter(Boolean).join(", ") || "Location details upon booking."}
                                </p>
                            </div>
                        </div>

                        {venue.contact_email && (
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-gray-100 text-[#014B52] shrink-0 mt-0.5">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-gray-900">Email</p>
                                    <a href={`mailto:${venue.contact_email}`} className="text-xs text-[#014B52] hover:underline truncate block mt-0.5">
                                        {venue.contact_email}
                                    </a>
                                </div>
                            </div>
                        )}

                        {venue.contact_phone && (
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-gray-100 text-[#014B52] shrink-0 mt-0.5">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Phone</p>
                                    <a href={`tel:${venue.contact_phone}`} className="text-xs text-gray-600 hover:text-[#014B52] mt-0.5 block">
                                        {venue.contact_phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {venue.website && (
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-gray-100 text-[#014B52] shrink-0 mt-0.5">
                                    <Globe className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-gray-900">Website</p>
                                    <a
                                        href={venue.website.startsWith("http") ? venue.website : `https://${venue.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#014B52] hover:underline truncate block mt-0.5"
                                    >
                                        {venue.website}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
