import EventsPage from '@/features/web-pages/events'

export default async function page({ searchParams }: { searchParams: Promise<any> }) {
    const search = await searchParams
    console.log(search)
    return (
        <EventsPage search={search} />
    )
}
