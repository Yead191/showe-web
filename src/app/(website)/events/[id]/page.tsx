import EventDetails from '@/features/web-pages/events/event-details';
import getProfile from '@/helpers/next-fetch/getProfile';
import { nextFetch } from '@/helpers/next-fetch/NextFetch';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [event, user] = await Promise.all([nextFetch(`/event/${id}`, {
        method: 'GET',
        cache: "default",
        tags: [`event-${id}`],
    }), getProfile()

    ])
    if (!event?.success) {
        return <div>Event not found</div>
    }

    return (
        <EventDetails event={event.data ?? {}} user={user} />
    )
}
