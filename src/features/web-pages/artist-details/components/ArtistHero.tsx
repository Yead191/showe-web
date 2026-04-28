"use client"

import Image from "next/image"
import { Share2, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArtistHero({ artist }: { artist: any }) {
    return (
        <section className="relative w-full pt-[72px]">
            {/* Cover Image */}
            <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden">
                <Image
                    src={artist.cover_image}
                    alt={artist.name}
                    fill
                    className="object-cover object-[50%_15%]"
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
                            src={artist.profile_image}
                            alt={artist.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 space-y-4 pb-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="bg-[#F5A800] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                                {artist.type}
                            </span>
                            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
                                <MapPin className="h-3.5 w-3.5 text-gray-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                    {artist.about.based_in}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter ">
                                    {artist.name}
                                </h1>
                            </div>
                            <p className="text-gray-500 font-medium text-lg italic opacity-80">
                                {artist.about.genres.join(" • ")}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pb-4">
                        <Button className="h-12 px-8 bg-[#014B52] hover:bg-[#023a40] text-white font-black text-sm rounded-2xl transition-all active:scale-95 shadow-xl shadow-[#014B52]/20">
                            Follow Artist
                        </Button>
                        <button className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                            <Share2 className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                            <Heart className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
