import EventsPage from '@/features/web-pages/events'
import { nextFetch } from '@/helpers/next-fetch/NextFetch'


export default async function page({ searchParams }: { searchParams: Promise<any> }) {
    const search = await searchParams

    const params = new URLSearchParams()
    if (search.q) params.set('searchTerm', search.q)
    if (search.location) params.set('location', search.location)
    if (search.date) params.set('date', search.date)
    if (search.category) params.set('category', search.category)
    params.set('page', search.page || '1')

    const { data: events, pagination } = await nextFetch(`/event/search?${params.toString()}`, {
        method: 'GET',
        cache: "force-cache",
    })


    return (
        <EventsPage search={search} events={events ?? []} pagination={pagination} />
    )
}
