import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    MapPin,
    Calendar as CalendarIcon,
    ChevronDown,
    CalendarDays
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"

interface SearchBoxProps {
    className?: string
    initialValues?: {
        q?: string
        location?: string
        date?: string
    }
}

export function SearchBox({ className, initialValues }: SearchBoxProps) {
    const router = useRouter()
    const [what, setWhat] = useState(initialValues?.q || "")
    const [where, setWhere] = useState(initialValues?.location || "")

    // Helper to parse date from initialValues
    const parseInitialDate = (dateStr?: string): DateRange | undefined => {
        if (!dateStr) return undefined;
        if (dateStr.includes("_")) {
            const [from, to] = dateStr.split("_");
            return {
                from: new Date(from),
                to: new Date(to),
            };
        }
        const d = new Date(dateStr);
        return { from: d, to: d };
    }

    const [date, setDate] = useState<DateRange | undefined>(() => parseInitialDate(initialValues?.date));

    // Sync state with initialValues when they change
    useEffect(() => {
        setWhat(initialValues?.q || "")
        setWhere(initialValues?.location || "")
        setDate(parseInitialDate(initialValues?.date))
    }, [initialValues])

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (what) params.set("q", what);
        if (where) params.set("location", where);

        if (date?.from) {
            if (date.to) {
                params.set(
                    "date",
                    `${format(date.from, "yyyy-MM-dd")}_${format(date.to, "yyyy-MM-dd")}`
                );
            } else {
                params.set("date", format(date.from, "yyyy-MM-dd"));
            }
        }

        router.push(`/events?${params.toString()}`);
    };

    return (
        <div className={cn("bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 md:p-5 border border-gray-100", className)}>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:divide-x divide-gray-100">

                {/* What */}
                <div className="flex-1 w-full flex items-center gap-4 px-2">
                    <div className="bg-gray-50 p-2 rounded-lg flex shrink-0">
                        <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-0.5">What</p>
                        <input
                            type="text"
                            placeholder="Search by event or artist"
                            className="w-full text-sm text-gray-500 bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-400 truncate"
                            value={what}
                            onChange={(e) => setWhat(e.target.value)}
                        />
                    </div>
                </div>

                {/* Where */}
                <div className="flex-1 w-full flex items-center gap-4 px-2 lg:pl-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <div className="bg-gray-50 p-2 rounded-lg flex shrink-0">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Where</p>
                            <ChevronDown className="h-3 w-3 text-[#F5A800]" />
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
                <div className="flex-1 w-full px-2 lg:pl-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="w-full flex items-center gap-4 text-left outline-none group/when">
                                <div className="bg-gray-50 p-2 rounded-lg flex shrink-0 group-hover/when:bg-gray-100 transition-colors">
                                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-0.5">When</p>
                                    <div className={`text-sm ${date ? "text-gray-900" : "text-gray-400"} truncate`}>
                                        {date?.from
                                            ? date.to
                                                ? `${format(date.from, "MMM dd")} - ${format(date.to, "MMM dd, yyyy")}`
                                                : format(date.from, "MMM dd, yyyy")
                                            : "Search by date & month"}
                                    </div>
                                </div>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Search Button */}
                <div className="w-full lg:w-auto lg:pl-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <Button
                        onClick={handleSearch}
                        className="w-full lg:w-40 h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-bold text-sm rounded-lg transition-all active:scale-[0.98]"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
