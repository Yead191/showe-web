import EventsPage from '@/features/web-pages/events'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function page({ searchParams }: { searchParams: Promise<any> }) {
    const search = await searchParams

    return (
        <EventsPage search={search} />
    )
}
