"use client"
import Image from "next/image"
import { Calendar, MapPin, CheckCircle2, ChevronRight, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Event } from "@/constants/events/mock-event-details"

interface EventSidebarProps {
    event: Event
    onBookTickets: () => void
}

export function EventSidebar({ event, onBookTickets }: EventSidebarProps) {
    return (
        <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
            {/* ── Booking Card ── */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/4 border border-gray-100 overflow-hidden group">
                <div className="p-6 md:p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ticket starting from</p>
                            <p className="text-4xl font-black text-[#F5A800] tracking-tight">{event.tickets.display_price}</p>
                        </div>
                        <div className="bg-[#F5A800]/10 text-[#F5A800] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Best Deal
                        </div>
                    </div>

                    <Button
                        onClick={onBookTickets}
                        className="w-full h-16 bg-[#014B52] hover:bg-[#023a40] text-white font-black text-lg rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-[#014B52]/20 flex items-center justify-center gap-2 group-hover:gap-4 duration-300"
                    >
                        Book Tickets Now
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    {/* ── Downloads ── */}
                    <div className=" flex flex-wrap gap-4">
                        {Object.entries(event.downloads).map(([key, url]) => (
                            <a
                                key={key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#014B52]/5 hover:bg-[#014B52]/10 text-[#014B52] transition-all group"
                            >
                                <FileDown className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">
                                    Download {key.replace("_url", "").replace("_", " ")}
                                </span>
                            </a>
                        ))}
                    </div>
                    <div className="space-y-5 pt-2">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-50 p-3.5 rounded-2xl flex shrink-0 shadow-sm border border-gray-100">
                                <Calendar className="h-6 w-6 text-[#014B52]" />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-sm font-black text-gray-900 leading-tight">{event.schedule.display_date}</p>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    {event.schedule.timezone.replace("/", ", ")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gray-50 p-3.5 rounded-2xl flex shrink-0 shadow-sm border border-gray-100">
                                <MapPin className="h-6 w-6 text-[#014B52]" />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-sm font-black text-gray-900 leading-tight">{event.location.venue_name}</p>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    {event.location.city}, {event.location.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Host Info ── */}
                <div className="bg-gray-50/50 p-6 md:p-8 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 rounded-full overflow-hidden border-4 border-white shadow-md flex shrink-0">
                            <Image
                                src={event.host.avatar_url}
                                alt={event.host.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <p className="text-sm font-black text-gray-900 truncate">{event.host.name}</p>
                                {event.host.is_verified && (
                                    <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-500 shrink-0" />
                                )}
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Event Host</p>
                            <p className="text-xs font-bold text-gray-500">{event.host.follower_count.toLocaleString()} Followers</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-widest border-gray-200 hover:border-[#F5A800] hover:text-[#F5A800] transition-colors">
                            Follow
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Interested Crowd ── */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-black/2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Interested Community</p>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3.5">
                        {event.interested_audience.preview_users.map((user, idx) => (
                            <div
                                key={user.id}
                                className="h-12 w-12 rounded-full border-4 border-white bg-gray-100 overflow-hidden relative shadow-sm"
                                style={{ zIndex: 3 - idx }}
                            >
                                <Image src={user.avatar_url} alt={user.name} fill className="object-cover" />
                            </div>
                        ))}
                        <div className="h-12 w-12 rounded-full border-4 border-white bg-[#F5A800] flex items-center justify-center text-[11px] font-black text-white relative z-0 shadow-sm">
                            +{event.interested_audience.total_count - event.interested_audience.preview_users.length}
                        </div>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm font-black text-gray-900 tracking-tight">
                            {event.interested_audience.total_count}+ Joined
                        </p>
                        <p className="text-[11px] font-bold text-gray-400">
                            {event.interested_audience.mutual_friends_count} Mutual friends
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
