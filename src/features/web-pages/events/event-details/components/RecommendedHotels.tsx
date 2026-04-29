"use client"

import Image from "next/image"
import { Star, MapPin, Hotel } from "lucide-react"
import { MOCK_HOTELS } from "@/constants/events/mock-hotels"



export function RecommendedHotels() {
    return (
        <section className="space-y-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <Hotel className="h-8 w-8 text-[#F5A800]" />
                    Recommended Hotels
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_HOTELS.map((hot) => (
                    <div key={hot.id} className="group space-y-4">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                            <Image
                                src={hot.image}
                                alt={hot.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                                <Star className="h-3 w-3 fill-[#F5A800] text-[#F5A800]" />
                                <p className="text-xs font-black text-gray-900 tracking-tight">{hot.rating}</p>
                            </div>
                        </div>
                        <div className="space-y-2 px-1">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{hot.type}</p>
                                <p className="text-[10px] font-black text-[#F5A800] uppercase tracking-widest">{hot.price_range}</p>
                            </div>
                            <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-[#F5A800] transition-colors">
                                {hot.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                <MapPin className="h-3 w-3 text-[#014B52]" />
                                {hot.distance} from venue
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
