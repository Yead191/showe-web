"use client"

import React from "react"
import Image from "next/image"
import { Share2, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Event } from "@/constants/events/mock-event-details"

export function EventHero({ event }: { event: Event }) {
    return (
        <section id="banner" className="relative w-full h-[45vh] md:h-[65vh] pt-[72px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={event.cover_image} 
                    alt={event.title} 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#014B52] via-[#014B52]/40 to-black/30" />
            </div>
            
            {/* Content Over Image */}
            <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-end pb-12 md:pb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-6 max-w-4xl">
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-[#F5A800] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                                {event.category}
                            </span>
                            {event.tags.map(tag => (
                                <span key={tag} className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tight drop-shadow-2xl">
                            {event.title}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full border border-white/20 transition-all shadow-xl group">
                            <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full border border-white/20 transition-all shadow-xl group">
                            <Heart className={cn("h-5 w-5 group-hover:scale-110 transition-transform", event.social.is_saved && "fill-red-500 text-red-500")} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
