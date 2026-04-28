"use client"

import React from "react"
import { EventCard } from "../../events/components/EventCard"

export function ArtistEvents({ events }: { events: any[] }) {
    return (
        <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
                            Upcoming
                        </h2>
                        <div className="relative">
                            <h2 className="text-2xl md:text-[32px] font-semibold text-[#F5A800] tracking-tighter">
                                Events
                            </h2>
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#F5A800]" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl">
                        Don't miss out on these amazing performances. Book your tickets now!
                    </p>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                    <button className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-gray-900 shadow-sm border border-gray-200">Upcoming</button>
                    <button className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600">Past Events</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {events.map((event) => (
                    <div key={event.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </section>
    )
}
