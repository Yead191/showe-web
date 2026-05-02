import { Heart, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface Event {
    id: string
    title: string
    location: string
    price: number
    date: string
    interestedCount: string
    image: string
    category: string
}

interface EventCardProps {
    event: Event
}

export function EventCard({ event }: EventCardProps) {
    return (
        <Link scroll={true} href={`/events/${event.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-4/3 overflow-hidden shrink-0">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                    <Heart className="h-5 w-5" />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="space-y-1 flex-1">
                        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            {event.location}
                        </p>
                        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#F5A800] transition-colors line-clamp-2">
                            {event.title}
                        </h3>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-xl font-black text-[#F5A800]">
                            ${event.price.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-4 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Calendar className="h-4 w-4 text-[#F5A800] shrink-0" />
                        <span>{event.date}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative">
                                        <Image src={`https://i.pravatar.cc/100?u=${event.id}-${i}`} alt="user" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] text-gray-500 font-bold tracking-tight">
                                {event.interestedCount} Interested
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
