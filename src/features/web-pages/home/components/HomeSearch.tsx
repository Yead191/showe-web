"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
    MapPin,
    Calendar as CalendarIcon,
    ChevronDown,
    Music,
    Users,
    Trophy,
    CalendarDays,
    Theater,
    PartyPopper
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

const categories = [
    { label: "Theater", icon: Theater, value: "theater" },
    { label: "Music", icon: Music, value: "music" },
    { label: "Sports", icon: Trophy, value: "sports" },
    { label: "Events", icon: CalendarDays, value: "events" },
    { label: "Community", icon: Users, value: "community" },
    { label: "Ceremonies", icon: PartyPopper, value: "ceremonies" },
]

export default function HomeSearch() {
    const router = useRouter()
    const [what, setWhat] = useState("")
    const [where, setWhere] = useState("")
    const [date, setDate] = useState<Date>()

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (what) params.set("q", what)
        if (where) params.set("location", where)
        if (date) params.set("date", format(date, "yyyy-MM-dd"))
        router.push(`/events?${params.toString()}`)
    }

    const handleCategoryClick = (value: string) => {
        router.push(`/events?category=${value}`)
    }

    return (
        <section className="relative -mt-12 md:-mt-14 z-10 container mx-auto px-4 pb-20">
            {/* ── Search Bar ── */}
            <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 md:p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:divide-x divide-gray-100">

                    {/* What */}
                    <div className="flex-1 w-full flex items-center gap-4 px-2">
                        <div className="bg-gray-50 p-2.5 rounded-lg flex shrink-0">
                            <CalendarDays className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-0.5">What</p>
                            <input
                                type="text"
                                placeholder="Search by event or artist or venue"
                                className="w-full text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-400 truncate"
                                value={what}
                                onChange={(e) => setWhat(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Where */}
                    <div className="flex-1 w-full flex items-center gap-4 px-2 lg:pl-8 border-t lg:border-t-0 pt-4 lg:pt-0">
                        <div className="bg-gray-50 p-2.5 rounded-lg flex shrink-0">
                            <MapPin className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Where</p>
                                <ChevronDown className="h-4 w-4 text-[#F5A800]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by location"
                                className="w-full text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-400 truncate"
                                value={where}
                                onChange={(e) => setWhere(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* When */}
                    <div className="flex-1 w-full px-2 lg:pl-8 border-t lg:border-t-0 pt-4 lg:pt-0">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="w-full flex items-center gap-4 text-left outline-none group/when">
                                    <div className="bg-gray-50 p-2.5 rounded-lg flex shrink-0 group-hover/when:bg-gray-100 transition-colors">
                                        <CalendarIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-0.5">When</p>
                                        <div className={`text-sm ${date ? "text-gray-900" : "text-gray-400"} truncate`}>
                                            {date ? format(date, "PPP") : "Select date & month"}
                                        </div>
                                    </div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search Button */}
                    <div className="w-full lg:w-auto lg:pl-8 border-t lg:border-t-0 pt-4 lg:pt-0">
                        <Button
                            onClick={handleSearch}
                            className="w-full lg:w-44 h-14 bg-[#F5A800] hover:bg-[#e09900] text-white font-bold text-base rounded-lg transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Categories ── */}
            <div className="mt-10">
                <p className="text-xs font-semibold text-gray-400 text-center uppercase tracking-widest mb-10">Explore by Category</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-14 lg:gap-20">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => handleCategoryClick(cat.value)}
                            className="group flex flex-col items-center gap-3 transition-all"
                        >
                            <div className="text-gray-400 group-hover:text-[#F5A800] group-hover:scale-110 transition-all duration-300">
                                <cat.icon className="h-8 w-8 stroke-[1.25]" />
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="mt-12 border-b border-gray-100 max-w-5xl mx-auto" />
            </div>
        </section>
    )
}
