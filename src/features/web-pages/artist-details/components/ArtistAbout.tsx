"use client"

import React from "react"
import { Globe, Mic2, Tag } from "lucide-react"
import type { Artist } from "../index"

export function ArtistAbout({ artist }: { artist: Artist }) {
    const genres = artist.genres ?? []
    const instruments = artist.instruments ?? []
    const languages = artist.languages ?? []

    const details = [
        ...(artist.category
            ? [{ label: "Category", value: artist.category, icon: Tag }]
            : []),
        ...(instruments.length > 0
            ? [{ label: "Instruments", value: instruments.join(", "), icon: Mic2 }]
            : []),
        ...(languages.length > 0
            ? [{ label: "Languages", value: languages.join(", "), icon: Globe }]
            : []),
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Bio */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Biography</h3>
                    {artist.short_description ? (
                        <p className="text-gray-500 text-lg leading-relaxed">
                            {artist.short_description}
                        </p>
                    ) : (
                        <p className="text-gray-400 text-base italic">No biography available.</p>
                    )}
                </div>

                {genres.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {genres.map((genre) => (
                            <span
                                key={genre}
                                className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Details */}
            {details.length > 0 && (
                <div className="space-y-8 bg-gray-50/50 p-8 md:p-10 rounded-[40px] border border-gray-100 h-fit">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Artist Info</h3>
                    <div className="space-y-6">
                        {details.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                    <item.icon className="h-5 w-5 text-[#F5A800]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                                    <p className="text-gray-900 font-bold">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
