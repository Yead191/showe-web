"use client"

import { CheckCircle2, } from "lucide-react"
import { EventDetail } from "../types"

export function EventAbout({ event }: { event: EventDetail }) {
    return (
        <section className="space-y-12">
            <div className="space-y-6 max-w-4xl">
                <div className="flex flex-wrap gap-2">
                    <span className="bg-[#F5A800] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                        {event.category}
                    </span>
                    {event.tags?.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-gray-200">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-none tracking-tight font-museo">
                    {event.title}
                </h1>
            </div>

            {/* ── About the Event ── */}
            <div className="space-y-6">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">About the Event</h2>
                <div
                    className="prose prose-gray prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: event.description_html }}
                />
            </div>

            {/* ── Highlights ── */}
            {event.highlights?.length > 0 && (
            <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#F5A800] rounded-full" />
                    Key Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-[#F5A800]/30 transition-colors group">
                            <CheckCircle2 className="h-5 w-5 text-[#F5A800] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <p className="text-sm font-bold text-gray-700 leading-snug">{highlight}</p>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </section>
    )
}
