"use client"

import { SearchBox } from "@/components/shared/search/SearchBox"
import { CategoryBar } from "@/components/shared/search/CategoryBar"
import { EventCard, type Event } from "./components/EventCard"
import { ResultsHeader } from "./components/ResultsHeader"
import { EventsPagination } from "./components/EventsPagination"
import LandingCTA from "../landing/components/LandingCTA"

interface PaginationInfo {
    total: number
    limit: number
    page: number
    totalPage: number
}

interface EventsPageProps {
    search: {
        q?: string
        location?: string
        date?: string
        category?: string
        page?: string
    }
    events: Event[]
    pagination?: PaginationInfo
}

export default function EventsPage({ search, events, pagination }: EventsPageProps) {
    const eventList = events ?? []

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

                {eventList.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {eventList.map((event, index) => (
                                <div key={event._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>

                        <EventsPagination pagination={pagination} />
                    </>
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
