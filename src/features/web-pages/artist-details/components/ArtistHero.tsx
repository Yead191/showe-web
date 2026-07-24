"use client"

import Image from "next/image"
import { Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/getImageUrl"
import type { Artist } from "../index"

export function ArtistHero({ artist }: { artist: Artist }) {
    const genres = artist.genres ?? []

    return (
        <section id="banner" className="relative w-full ">
            {/* Cover Image */}
            <div className="relative h-[250px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
                <Image
                    src={getImageUrl(artist.cover_image)}
                    alt={artist.name}
                    width={1400}
                    height={600}
                    className="w-full h-full object-cover object-[50%_15%]"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Profile Info Overlay */}
            <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10">
                    {/* Profile Picture */}
                    <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-3xl overflow-hidden border-8 border-white bg-white shadow-2xl shrink-0">
                        <Image
                            src={getImageUrl(artist.image)}
                            alt={artist.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-4 pb-4">
                        {artist.category && (
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-[#F5A800] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                                    {artist.category}
                                </span>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter ">
                                    {artist.name}
                                </h1>
                            </div>
                            {genres.length > 0 && (
                                <p className="text-gray-500 font-medium text-lg italic opacity-80">
                                    {genres.join(" • ")}
                                </p>
                            )}
                        </div>
                    </div>

                   
                </div>
            </div>
        </section>
    )
}
