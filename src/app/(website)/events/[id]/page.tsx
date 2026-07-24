import EventDetails from '@/features/web-pages/events/event-details';
import { nextFetch } from '@/helpers/next-fetch/NextFetch';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await nextFetch(`/event/${id}`, {
        method: 'GET',
        cache: "force-cache",
    })
    if (!event.success) {
        return <div>Event not found</div>
    }
    console.log(event)
    return (
        <EventDetails event={event.data ?? {}} />
    )
}
