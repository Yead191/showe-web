"use client"

import { SearchBox } from "@/components/shared/search/SearchBox"
import { CategoryBar } from "@/components/shared/search/CategoryBar"
import { EventCard } from "./components/EventCard"
import { ResultsHeader } from "./components/ResultsHeader"
import { MOCK_EVENTS } from "../../../constants/events/mock-events"

import { isWithinInterval, parseISO, isSameDay } from "date-fns"
import LandingCTA from "../landing/components/LandingCTA"

export default function EventsPage({ search }: { search: any }) {
    // Basic client-side filtering logic
    const filteredEvents = MOCK_EVENTS.filter(event => {
        const matchesCategory = !search.category || event.category === search.category
        const matchesQuery = !search.q || event.title.toLowerCase().includes(search.q.toLowerCase()) ||
            event.location.toLowerCase().includes(search.q.toLowerCase())
        const matchesLocation = !search.location || event.location.toLowerCase().includes(search.location.toLowerCase())

        // Advanced date filtering
        let matchesDate = true
        if (search.date) {
            try {
                const eventDate = parseISO(event.isoDate)
                if (search.date.includes("_")) {
                    const [fromStr, toStr] = search.date.split("_")
                    const from = parseISO(fromStr)
                    const to = parseISO(toStr)
                    matchesDate = isWithinInterval(eventDate, { start: from, end: to })
                } else {
                    const searchDate = parseISO(search.date)
                    matchesDate = isSameDay(eventDate, searchDate)
                }
            } catch (error) {
                console.error("Date parsing error:", error)
                matchesDate = false
            }
        }

        return matchesCategory && matchesQuery && matchesLocation && matchesDate
    })

    return (
        <div className="min-h-screen">
            {/* ── Top Search Section ── */}
            <div className="bg-gray-50/50 border-b border-gray-100 pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <SearchBox className="shadow-xl shadow-black/3" initialValues={search} />
                        <CategoryBar activeCategory={search.category} />
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="container py-12 lg:py-16">
                <ResultsHeader search={search} />

                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {filteredEvents?.map(event => (
                            <div key={event.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${parseInt(event.id) * 50}ms` }}>
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">No events found matching your search</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Try using different keywords, clearing your filters, or browsing other categories.
                            </p>
                        </div>
                    </div>
                )}
            </main>
            <LandingCTA />
        </div>
    )
}
