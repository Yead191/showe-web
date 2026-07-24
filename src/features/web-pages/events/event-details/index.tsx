"use client"
import { EventDetail } from "./types"
import { EventHero } from "./components/EventHero"
import { EventSidebar } from "./components/EventSidebar"
import { EventAbout } from "./components/EventAbout"
import { EventGallery } from "./components/EventGallery"
import { EventLocation } from "./components/EventLocation"
import { RelatedEvents } from "./components/RelatedEvents"
import { NearbyRestaurants } from "./components/NearbyRestaurants"
import { RecommendedHotels } from "./components/RecommendedHotels"
import { NearbyBars } from "./components/NearbyBars"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { toast } from "sonner"


export default function EventDetails({ event }: { event: EventDetail }) {
    if (!event) return null

    const handleGetTicket = () => {
        if (event.get_tickets_url) {
            window.open(event.get_tickets_url, "_blank", "noopener,noreferrer")
            return
        }
        toast.info(`Get Your Ticket feature will be available soon!`, {
            description: "We are currently working on integrating this with the venue's ticketing system."
        });
    }

    return (
        <main className="min-h-screen bg-white pb-24 lg:pb-0">
            {/* ── Immersive Hero ── */}
            <EventHero event={event} />

            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* ── Left Content (65%) ── */}
                    <div className="lg:w-[65%] space-y-12">
                        <EventAbout event={event} />
                        <EventGallery images={event.gallery} />
                        <EventLocation event={event} />
                        <NearbyRestaurants items={event.nearby_restaurants} />
                        <RecommendedHotels items={event.nearby_hotels} />
                        <NearbyBars items={event.nearby_bars} />
                        <RelatedEvents />
                    </div>

                    {/* ── Right Sidebar (35%) ── */}
                    <div className="lg:w-[35%]">
                        <EventSidebar event={event} />
                    </div>
                </div>
            </div>

            {/* ── Mobile Sticky Booking Bar ── */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between gap-12 animate-in slide-in-from-bottom duration-500">
                <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Starting From</p>
                    <p className="text-xl font-black text-[#F5A800] tracking-tight">${event.price}</p>
                </div>
                <Button
                    onClick={handleGetTicket}
                    className="flex-1 h-12 bg-[#014B52] hover:bg-[#023a40] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#014B52]/20"
                >
                    Get Your Ticket
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>


        </main>
    )
}
