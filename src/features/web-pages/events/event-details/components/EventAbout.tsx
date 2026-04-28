"use client"

import React from "react"
import { CheckCircle2, FileDown } from "lucide-react"
import { Event } from "@/constants/events/mock-event-details"

export function EventAbout({ event }: { event: Event }) {
    return (
        <section className="space-y-12">
            {/* ── About the Event ── */}
            <div className="space-y-6">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">About the Event</h2>
                <div 
                    className="prose prose-gray prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: event.about.description_html }}
                />
            </div>
            
            {/* ── Highlights ── */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#F5A800] rounded-full" />
                    Key Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.about.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-[#F5A800]/30 transition-colors group">
                            <CheckCircle2 className="h-5 w-5 text-[#F5A800] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <p className="text-sm font-bold text-gray-700 leading-snug">{highlight}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* ── Downloads ── */}
            <div className="pt-8 flex flex-wrap gap-4">
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
        </section>
    )
}
