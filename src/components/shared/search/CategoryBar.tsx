"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
    Music, 
    Users, 
    Trophy, 
    CalendarDays, 
    Theater, 
    PartyPopper 
} from "lucide-react"
import { cn } from "@/lib/utils"

export const categories = [
    { label: "Theater", icon: Theater, value: "theater" },
    { label: "Music", icon: Music, value: "music" },
    { label: "Sports", icon: Trophy, value: "sports" },
    { label: "Events", icon: CalendarDays, value: "events" },
    { label: "Community", icon: Users, value: "community" },
    { label: "Ceremonies", icon: PartyPopper, value: "ceremonies" },
]

interface CategoryBarProps {
    className?: string
    activeCategory?: string
}

export function CategoryBar({ className, activeCategory }: CategoryBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleCategoryClick = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (params.get("category") === value) {
            params.delete("category")
        } else {
            params.set("category", value)
        }
        router.push(`/events?${params.toString()}`)
    }

    return (
        <div className={cn("text-center", className)}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Explore by Category</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 lg:gap-16">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.value
                    return (
                        <button
                            key={cat.value}
                            onClick={() => handleCategoryClick(cat.value)}
                            className="group flex flex-col items-center gap-2.5 transition-all"
                        >
                            <div className={cn(
                                "transition-all duration-300 p-2 rounded-full",
                                isActive 
                                    ? "text-[#F5A800] bg-[#F5A800]/5 scale-110" 
                                    : "text-gray-400 group-hover:text-[#F5A800] group-hover:bg-[#F5A800]/5"
                            )}>
                                <cat.icon className="h-7 w-7 stroke-[1.5]" />
                            </div>
                            <span className={cn(
                                "text-[11px] font-bold uppercase tracking-wider transition-colors",
                                isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"
                            )}>
                                {cat.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
