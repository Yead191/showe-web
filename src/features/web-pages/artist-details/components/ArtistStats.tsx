"use client"

import React from "react"
import { Users, Headphones, Calendar, Eye } from "lucide-react"

export function ArtistStats({ stats }: { stats: any }) {
    const statItems = [
        {
            label: "Total Followers",
            value: stats.total_followers.toLocaleString(),
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Monthly Listeners",
            value: stats.monthly_listeners.toLocaleString(),
            icon: Headphones,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            label: "Total Events",
            value: stats.total_events,
            icon: Calendar,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            label: "Profile Views",
            value: stats.profile_views.toLocaleString(),
            icon: Eye,
            color: "text-green-600",
            bg: "bg-green-50"
        }
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statItems.map((item, idx) => (
                <div 
                    key={idx}
                    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5"
                >
                    <div className={`${item.bg} p-4 rounded-2xl`}>
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                        <h4 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{item.value}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}
