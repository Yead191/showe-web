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
        <section id="banner" className="relative w-full h-[45vh] md:h-[65vh] lg:h-screen 2xl:h-[85vh] pt-18">
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
            <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-end pb-12 lg:pb-4 2xl:pb-16">

                {/* Action buttons (bottom-right) */}
                <div className="absolute bottom-12 md:bottom-16 right-4 flex items-center gap-2 lg:gap-4 z-20">
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

                {/* Phone (centered) */}
                <div className="flex justify-center items-end">
                    {event.programme?.cover_image && (
                        <div className="relative w-52.5h-110 md:w-70 md:h-146.25 lg:w-74 2xl:w-87.5 lg:h-[84vh] 2xl:h-155 rounded-[3rem] bg-neutral-900 p-3 shadow-2xl shadow-black/60 ring-1 ring-white/15">
                            {/* Side buttons */}
                            <span className="absolute -left-0.75 top-28 h-16 w-0.75 rounded-l bg-neutral-700" />
                            <span className="absolute -right-0.75 top-24 h-12 w-0.75 rounded-r bg-neutral-700" />
                            <span className="absolute -right-0.75 top-40 h-20 w-0.75 rounded-r bg-neutral-700" />

                            {/* Screen */}
                            <div className="relative h-full w-full rounded-[2.25rem] overflow-hidden bg-black">
                                <Image
                                    src={getImageUrl(event.programme.cover_image)}
                                    alt={event.programme.title || event.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Dynamic island */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 h-7 w-21.5 bg-black rounded-full z-10 flex items-center justify-end pr-2.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-800 ring-1 ring-neutral-700" />
                                </div>

                                {/* Screen glare */}
                                <div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-black/20 pointer-events-none" />
                            </div>
                        </div>
                    )}
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
