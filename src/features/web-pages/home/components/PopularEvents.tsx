"use client"

import React from "react"
import { EventCard } from "../../events/components/EventCard"
import { MOCK_EVENTS } from "@/constants/events/mock-events"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PopularEvents({ events }: { events: any[] }) {
   
   
    const popularEvents = events.slice(0, 6)
    return (
        <section className="container mx-auto px-4 pb-10 md:pb-12">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-12">
                <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
                    Popular
                </h2>
                <div className="relative">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#F5A800] tracking-tighter">
                        Event
                    </h2>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#F5A800]" />
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {popularEvents.map((event, idx) => (
                    <div
                        key={event._id}
                        className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <EventCard event={event} />
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 lg:mt-20 flex justify-center">
                <Link href="/events">
                    <Button
                        variant="outline"
                        className="w-xs md:w-sm h-12 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all rounded-none tracking-widest uppercase"
                    >
                        View All Event
                    </Button>
                </Link>
            </div>
        </section>
    )
}   
