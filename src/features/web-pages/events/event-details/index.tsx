"use client"

import React from "react"
import { Event } from "@/constants/events/mock-event-details"
import { EventHero } from "./components/EventHero"
import { EventSidebar } from "./components/EventSidebar"
import { EventAbout } from "./components/EventAbout"
import { EventLocation } from "./components/EventLocation"
import { RelatedEvents } from "./components/RelatedEvents"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function EventDetails({ event }: { event: Event }) {
    if (!event) return null

    return (
        <main className="min-h-screen bg-white pb-24 lg:pb-0">
            {/* ── Immersive Hero ── */}
            <EventHero event={event} />
            
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* ── Left Content (65%) ── */}
                    <div className="lg:w-[65%] space-y-20">
                        <EventAbout event={event} />
                        <EventLocation event={event} />
                        <RelatedEvents event={event} />
                    </div>
                    
                    {/* ── Right Sidebar (35%) ── */}
                    <div className="lg:w-[35%]">
                        <EventSidebar event={event} />
                    </div>
                </div>
            </div>

            {/* ── Mobile Sticky Booking Bar ── */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between gap-6 animate-in slide-in-from-bottom duration-500">
                <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Starting From</p>
                    <p className="text-xl font-black text-[#F5A800] tracking-tight">{event.tickets.display_price}</p>
                </div>
                <Button className="flex-1 h-14 bg-[#014B52] hover:bg-[#023a40] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#014B52]/20">
                    Get Tickets
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </main>
    )
}