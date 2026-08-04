"use client"

import { Calendar, BookOpen, Download, Building2 } from "lucide-react"
import type { Venue } from "../index"

export function VenueStats({ venue }: { venue: Venue }) {
    const stats = [
        {
            label: "Events Hosted",
            value: venue.events_count ?? 0,
            icon: Calendar,
            color: "text-[#014B52]",
            bgColor: "bg-[#014B52]/10",
        },
        {
            label: "Digital Programmes",
            value: venue.programmes_count ?? 0,
            icon: BookOpen,
            color: "text-[#F5A800]",
            bgColor: "bg-[#F5A800]/10",
        },
        {
            label: "Total Downloads",
            value: venue.total_downloads ?? 0,
            icon: Download,
            color: "text-blue-600",
            bgColor: "bg-blue-500/10",
        },
        {
            label: "City / Region",
            value: venue.city || venue.country || "Global",
            icon: Building2,
            color: "text-emerald-600",
            bgColor: "bg-emerald-500/10",
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-3"
                >
                    <div className={`h-12 w-12 rounded-2xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                            {stat.value}
                        </p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {stat.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
