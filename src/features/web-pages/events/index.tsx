import { SearchBox } from "@/components/shared/search/SearchBox"
import { CategoryBar } from "@/components/shared/search/CategoryBar"
import { EventCard, type Event } from "./components/EventCard"
import { ResultsHeader } from "./components/ResultsHeader"
import { EventsPagination } from "./components/EventsPagination"
import LandingCTA from "../landing/components/LandingCTA"
import { Suspense } from "react"
import Spinner from "@/components/shared/Spinner"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"

interface EventsSearch {
    q?: string
    location?: string
    date?: string
    category?: string
    page?: string
}

interface EventsPageProps {
    search: EventsSearch
}

export default function EventsPage({ search }: EventsPageProps) {
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

                {/* Only the results stream: the search shell above renders
                    instantly while the fetch resolves behind this boundary. */}
                <Suspense key={JSON.stringify(search)} fallback={<Spinner />}>
                    <EventsResults search={search} />
                </Suspense>
            </main>
            <LandingCTA />
        </div>
    )
}

async function EventsResults({ search }: { search: EventsSearch }) {
    const params = new URLSearchParams()
    if (search.q) params.set('searchTerm', search.q)
    if (search.location) params.set('address', search.location)
    if (search.date) {
        // search.date is either a single day "2026-07-01" or a range "2026-07-01_2026-07-04"
        const [startDate, endDate] = search.date.split('_')
        params.set('startDate', startDate)
        params.set('endDate', endDate || startDate)
    }
    if (search.category) params.set('category', search.category)
    params.set('page', search.page || '1')

    const { data: events, pagination } = await nextFetch<Event[]>(`/event/search?${params.toString()}`, {
        method: 'GET',
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 // 1 hour
        }
    })

    const eventList = events ?? []

    if (eventList.length === 0) {
        return (
            <div className="text-center py-32 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">No events found matching your search</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Try using different keywords, clearing your filters, or browsing other categories.
                    </p>
                </div>
            </div>
        )
    }

    return (
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
    )
}
