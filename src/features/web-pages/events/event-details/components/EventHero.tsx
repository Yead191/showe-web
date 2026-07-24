"use client"
import * as React from "react"
import Image from "next/image"
import { Share2, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { EventDetail } from "../types"
import { getImageUrl } from "@/lib/getImageUrl"
import { PerformancesModal } from "./PerformancesModal"

export function EventHero({ event }: { event: EventDetail }) {
    const [showPerformances, setShowPerformances] = React.useState(false)
    return (
        <section id="banner" className="relative w-full h-[45vh] md:h-[65vh] lg:h-[85vh] pt-[72px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={getImageUrl(event.cover_image) || "/assets/bg/programmes/theatre.png"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#014B52] via-[#014B52]/40 to-black/80" />
            </div>

            {/* Content Over Image */}
            <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-end pb-12 md:pb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

                    <div className="flex justify-end items-end">
                        <Image
                            src={'/assets/images/events/phone-event.png'}
                            alt={event.title}
                            fill
                            className="object-contain "
                        />
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4 justify-end">
                        <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 lg:p-4 rounded-full border border-white/20 transition-all shadow-xl group">
                            <Share2 className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={() => setShowPerformances(true)}
                            aria-label="Choose a performance to favourite"
                            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 lg:p-4 rounded-full border border-white/20 transition-all shadow-xl group cursor-pointer"
                        >
                            <Heart className={cn("h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform", event.isFavorited && "fill-red-500 text-red-500")} />
                        </button>
                    </div>
                </div>
            </div>

            <PerformancesModal
                open={showPerformances}
                onOpenChange={setShowPerformances}
                performances={event.performances}
                eventTitle={event.title}
            />
        </section>
    )
}
