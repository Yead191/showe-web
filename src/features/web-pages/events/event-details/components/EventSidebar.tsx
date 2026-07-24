"use client"
import Image from "next/image"
import { Calendar, MapPin, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventDetail } from "../types"
import { getImageUrl } from "@/lib/getImageUrl"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"
import { ProgrammePurchase } from "./ProgrammePurchase"

interface EventSidebarProps {
    event: EventDetail
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any
}

export function EventSidebar({ event, user }: EventSidebarProps) {
    const handleComingSoon = (feature: string) => {
        toast.info(`${feature} feature will be available soon!`, {
            description: "We are currently working on integrating this with the venue's ticketing system."
        });
    }

    const handleGetTicket = () => {
        if (event.get_tickets_url) {
            window.open(event.get_tickets_url, "_blank", "noopener,noreferrer")
            return
        }
        handleComingSoon("Get Your Ticket")
    }

    const eventDate = event.event_date ? parseISO(event.event_date) : null
    const firstPerformance = event.performances?.[0]

    const interestedPeople = event.someInterestPeopsle ?? []
    const extraInterested = (event.interest_count ?? 0) - interestedPeople.length

    return (
        <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
            {/* ── Booking Card ── */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/4 border border-gray-100 overflow-hidden group">
                <div className="p-6 md:p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ticket starting from</p>
                            <p className="text-4xl font-black text-[#F5A800] tracking-tight">${event.price}</p>
                        </div>
                        <div className="bg-[#F5A800]/10 text-[#F5A800] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Best Deal
                        </div>
                    </div>

                    <Button
                        onClick={handleGetTicket}
                        className="w-full h-16 bg-[#014B52] hover:bg-[#023a40] text-white font-black text-lg rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-[#014B52]/20 flex items-center justify-center gap-2 group-hover:gap-4 duration-300"
                    >
                        Get Your Ticket
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    {/* ── Programme ── */}
                    {event.programme?._id && (
                        <ProgrammePurchase eventId={event._id} programme={event.programme} user={user} />
                    )}
                    <div className="space-y-5 pt-2">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-50 p-3.5 rounded-2xl flex shrink-0 shadow-sm border border-gray-100">
                                <Calendar className="h-6 w-6 text-[#014B52]" />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-sm font-black text-gray-900 leading-tight">
                                    {eventDate ? format(eventDate, "EEEE, MMM dd, yyyy") : "Date to be announced"}
                                </p>
                                {firstPerformance && (
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        {firstPerformance.start_time} - {firstPerformance.end_time}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gray-50 p-3.5 rounded-2xl flex shrink-0 shadow-sm border border-gray-100">
                                <MapPin className="h-6 w-6 text-[#014B52]" />
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-sm font-black text-gray-900 leading-tight">{event.vanue?.name}</p>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    {event.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Host Info ── */}
                {event.author && (
                    <div className="bg-gray-50/50 p-6 md:p-8 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 rounded-full overflow-hidden border-4 border-white shadow-md flex shrink-0">
                                <Image
                                    src={getImageUrl(event.author.image)}
                                    alt={event.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <p className="text-sm font-black text-gray-900 truncate">{event.author.name}</p>
                                    {event.host?.is_verified && (
                                        <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-500 shrink-0" />
                                    )}
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Event Host</p>
                                <p className="text-xs font-bold text-gray-500">{(event.author.followers_count ?? 0).toLocaleString()} Followers</p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full text-[10px] font-black uppercase tracking-widest border-gray-200 hover:border-[#F5A800] hover:text-[#F5A800] transition-colors">
                                {event.author.following ? "Following" : "Follow"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Artist ── */}
            {event.artist && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-black/2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Featured Artist</p>
                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-gray-100 shadow-md flex shrink-0">
                            <Image
                                src={getImageUrl(event.artist.image)}
                                alt={event.artist.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-black text-gray-900 leading-tight truncate">{event.artist.name}</p>
                            {event.artist.type && (
                                <span className="mt-1.5 inline-flex items-center rounded-full bg-[#F5A800]/10 text-[#F5A800] px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                    {event.artist.type}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Interested Crowd ── */}
            {interestedPeople.length > 0 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-black/2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Interested Community</p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3.5">
                            {interestedPeople.map((user, idx) => (
                                <div
                                    key={user._id}
                                    className="h-12 w-12 rounded-full border-4 border-white bg-gray-100 overflow-hidden relative shadow-sm"
                                    style={{ zIndex: 3 - idx }}
                                >
                                    <Image src={getImageUrl(user.image)} alt={user.name} fill className="object-cover" />
                                </div>
                            ))}
                            {extraInterested > 0 && (
                                <div className="h-12 w-12 rounded-full border-4 border-white bg-[#F5A800] flex items-center justify-center text-[11px] font-black text-white relative z-0 shadow-sm">
                                    +{extraInterested}
                                </div>
                            )}
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-sm font-black text-gray-900 tracking-tight">
                                {event.interest_count ?? interestedPeople.length}+ Interested
                            </p>
                            <p className="text-[11px] font-bold text-gray-400">
                                Join the community
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    )
}
