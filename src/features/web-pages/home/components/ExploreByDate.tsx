"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { format, startOfToday, endOfWeek, startOfWeek, endOfMonth, startOfMonth, addDays, isSaturday, isSunday, nextSaturday, nextSunday } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface DateCardProps {
    title: string
    dateLabel: string
    onClick?: () => void
    className?: string
    isCustom?: boolean
}

const DateCard = ({ title, dateLabel, onClick, className, isCustom }: DateCardProps) => (
    <div
        onClick={onClick}
        className={cn(
            "relative flex flex-col justify-between p-6 rounded-none bg-[#FFF9EB] border border-[#FDF2D5] cursor-pointer hover:shadow-lg transition-all group overflow-hidden h-[160px] w-full",
            className
        )}
    >
        <div className="space-y-1 relative z-10">
            <h3 className="text-[#F5A800] font-bold text-lg">{title}</h3>
            <p className="text-gray-600 font-medium text-sm">{dateLabel}</p>
        </div>

        {/* Calendar Icon with Pink Circle */}
        <div className="absolute top-4 -right-4 w-24 h-24 bg-[#FF8C8C] rounded-full flex items-center justify-center translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 opacity-80">
            <div className="bg-white p-2 rounded-md shadow-sm translate-x--2 translate-y-2">
                <CalendarIcon className="h-8 w-8 text-[#FF8C8C]" />
            </div>
        </div>
    </div>
)

export default function ExploreByDate() {
    const router = useRouter()
    const today = startOfToday()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

    const handleDateSelect = (date: string) => {
        router.push(`/events?date=${date}`)
    }

    const handleCustomDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date)
            handleDateSelect(format(date, "yyyy-MM-dd"))
        }
    }

    // Date Logic
    const todayLabel = format(today, "d MMMM")

    const saturday = isSaturday(today) ? today : nextSaturday(today)
    const sunday = isSunday(today) ? today : nextSunday(today)
    const weekendLabel = `${format(saturday, "d")}-${format(sunday, "d MMMM")}`

    const weekStart = startOfWeek(today, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 })
    const weekLabel = `${format(weekStart, "d")}-${format(weekEnd, "d MMMM")}`

    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)
    const monthLabel = `${format(monthStart, "d")}-${format(monthEnd, "d MMMM")}`

    return (
        <section className="container mx-auto px-4 py-12 lg:py-16">
            <div className="flex items-center gap-3 mb-12">
                <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
                    Explore Event
                </h2>
                <div className="relative">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#F5A800] tracking-tighter">
                        by Date
                    </h2>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#F5A800]" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <DateCard
                    title="Today"
                    dateLabel={todayLabel}
                    onClick={() => handleDateSelect(format(today, "yyyy-MM-dd"))}
                />
                <DateCard
                    title="This Weekend"
                    dateLabel={weekendLabel}
                    onClick={() => handleDateSelect(`${format(saturday, "yyyy-MM-dd")}_${format(sunday, "yyyy-MM-dd")}`)}
                />
                <DateCard
                    title="This Week"
                    dateLabel={weekLabel}
                    onClick={() => handleDateSelect(`${format(weekStart, "yyyy-MM-dd")}_${format(weekEnd, "yyyy-MM-dd")}`)}
                />
                <DateCard
                    title="This Month"
                    dateLabel={monthLabel}
                    onClick={() => handleDateSelect(`${format(monthStart, "yyyy-MM-dd")}_${format(monthEnd, "yyyy-MM-dd")}`)}
                />

                <Popover>
                    <PopoverTrigger asChild>
                        <div>
                            <DateCard
                                title="Custom"
                                dateLabel={selectedDate ? format(selectedDate, "d MMMM") : "Choose Date"}
                                isCustom
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleCustomDateSelect}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </section>
    )
}
