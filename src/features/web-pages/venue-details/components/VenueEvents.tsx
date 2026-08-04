"use client"

import { EventCard } from "@/features/web-pages/events/components/EventCard"
import type { Event } from "@/features/web-pages/events/components/EventCard"

export function VenueEvents({ events, venueName }: { events: Event[]; venueName: string }) {
    if (!events || events.length === 0) {
        return (
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 space-y-2">
                <h3 className="text-lg font-bold text-gray-900">No Upcoming Events Listed</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Check back soon for new performances and digital programmes scheduled at {venueName}.
                </p>
            </div>
        )
    }

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
                    Upcoming Events at
                </h2>
                <div className="relative">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#F5A800] tracking-tighter">
                        {venueName}
                    </h2>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#F5A800]" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {events.map((event, idx) => (
                    <div key={event._id || idx}>
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </section>
    )
}
