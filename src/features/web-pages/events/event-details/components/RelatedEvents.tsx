"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronRight } from "lucide-react"
import { getImageUrl } from "@/lib/getImageUrl"

export interface RelatedEventItem {
    id: string
    title: string
    cover_image: string
    date: string
    price: number
}

export function RelatedEvents({ items }: { items?: RelatedEventItem[] }) {
    if (!items || items.length === 0) return null

    return (
        <section className="space-y-10 ">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">You might also like</h2>
                <Link
                    href="/events"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#014B52] hover:text-[#F5A800] transition-colors"
                >
                    View All
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((rel) => (
                    <Link
                        key={rel.id}
                        href={`/events/${rel.id}`}
                        className="group space-y-4"
                    >
                        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                            <Image
                                src={getImageUrl(rel.cover_image)}
                                alt={rel.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm">
                                <p className="text-xs font-black text-[#F5A800] tracking-tight">${rel.price.toFixed(0)}</p>
                            </div>
                        </div>
                        <div className="space-y-2 px-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <Calendar className="h-3 w-3 text-[#F5A800]" />
                                {rel.date}
                            </div>
                            <h3 className="text-sm font-black text-gray-900 leading-tight group-hover:text-[#F5A800] transition-colors line-clamp-2">
                                {rel.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
