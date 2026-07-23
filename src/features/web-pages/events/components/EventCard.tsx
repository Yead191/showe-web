import { getImageUrl } from "@/lib/getImageUrl"
import { format, parseISO } from "date-fns"
import { Heart, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface InterestedPerson {
    _id: string
    name: string
    image: string
}

export interface Event {
    _id: string
    title: string
    address: string
    price: number
    event_date: string
    interest_count: string
    cover_image: string
    category: string
    isFavorited?: boolean
    someInterestPeopsle?: InterestedPerson[]
}

interface EventCardProps {
    event: Event
}

export function EventCard({ event }: EventCardProps) {
    // console.log(event)
    return (
        <Link scroll={true} href={`/events/${event._id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-4/3 overflow-hidden shrink-0">
                <Image
                    src={getImageUrl(event.cover_image)}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-sm ${event.isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}>
                    <Heart className={`h-5 w-5 ${event.isFavorited ? "fill-current" : ""}`} />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="space-y-1 flex-1">
                        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            {event?.address ?? ''}
                        </p>
                        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#F5A800] transition-colors line-clamp-2">
                            {event.title}
                        </h3>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-xl font-black text-[#F5A800]">
                            ${Number(event?.price?.toFixed(2) ?? 0)}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-4 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Calendar className="h-4 w-4 text-[#F5A800] shrink-0" />
                        <span>{event?.event_date ? format(parseISO(event?.event_date), 'EEEE, MMM dd, yyyy') : ''}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2">
                            {event?.someInterestPeopsle?.length && event?.someInterestPeopsle?.length > 0 && (
                                <div className="flex -space-x-2">
                                    {event.someInterestPeopsle.slice(0, 3).map((person) => (
                                        <div
                                            key={person._id}
                                            className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-gray-100"
                                        >
                                            <Image
                                                src={getImageUrl(person.image)}
                                                alt={person.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-[11px] font-bold tracking-tight text-gray-500">
                                {event.interest_count ?? 0} Interested
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
