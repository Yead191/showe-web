import { mockEventDetails } from '@/constants/events/mock-event-details';
import EventDetails from '@/features/web-pages/events/event-details';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = mockEventDetails?.event;
    return (
        <EventDetails event={event} />
    )
}
