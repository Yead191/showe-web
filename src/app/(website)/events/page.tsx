import EventsPage from '@/features/web-pages/events'
import { nextFetch } from '@/helpers/next-fetch/NextFetch'


export default async function page({ searchParams }: { searchParams: Promise<any> }) {
    const search = await searchParams

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

    const { data: events, pagination } = await nextFetch(`/event/search?${params.toString()}`, {
        method: 'GET',
        cache: "force-cache",
        next: {
            revalidate: 1
        }
    })


    return (
        <EventsPage search={search} events={events ?? []} pagination={pagination} />
    )
}
