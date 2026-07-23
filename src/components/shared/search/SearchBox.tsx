import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
    MapPin,
    Calendar as CalendarIcon,
    ChevronDown,
    CalendarDays,
    Loader2
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
import { loadGoogleMaps } from "@/lib/loadGoogleMaps"

/* eslint-disable @typescript-eslint/no-explicit-any */

interface PlaceSuggestion {
    id: string
    text: string
}

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

    // ── Google Places autocomplete (Where) ──────────────────────────────────
    const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoadingPlaces, setIsLoadingPlaces] = useState(false)
    const whereRef = useRef<HTMLDivElement>(null)
    const sessionTokenRef = useRef<any>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Preload the Maps script once on mount
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (key) loadGoogleMaps(key).catch(() => { })
    }, [])

    // Close the dropdown when clicking outside the Where field
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (whereRef.current && !whereRef.current.contains(e.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const fetchPlaceSuggestions = async (input: string) => {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!input.trim() || !key) {
            setSuggestions([])
            return
        }

        try {
            setIsLoadingPlaces(true)
            const google = await loadGoogleMaps(key)
            const places = await google.maps.importLibrary("places")

            let mapped: PlaceSuggestion[] = []

            if (places?.AutocompleteSuggestion) {
                // Places API (New)
                if (!sessionTokenRef.current) {
                    sessionTokenRef.current = new places.AutocompleteSessionToken()
                }
                const { suggestions: results } =
                    await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
                        input,
                        sessionToken: sessionTokenRef.current,
                        includedRegionCodes: ["gb"],
                    })
                mapped = (results || [])
                    .filter((s: any) => s.placePrediction)
                    .map((s: any) => ({
                        id: s.placePrediction.placeId,
                        text: s.placePrediction.text?.text ?? "",
                    }))
            } else if (places?.AutocompleteService) {
                // Legacy Places API fallback
                const service = new places.AutocompleteService()
                const predictions = await new Promise<any[]>((resolve) => {
                    service.getPlacePredictions(
                        { input, componentRestrictions: { country: "gb" } },
                        (preds: any[], status: string) => {
                            resolve(status === "OK" && preds ? preds : [])
                        }
                    )
                })
                mapped = predictions.map((p) => ({ id: p.place_id, text: p.description }))
            }

            setSuggestions(mapped)
            setShowSuggestions(mapped.length > 0)
        } catch (err) {
            console.error("Places autocomplete error:", err)
            setSuggestions([])
        } finally {
            setIsLoadingPlaces(false)
        }
    }

    const handleWhereChange = (value: string) => {
        setWhere(value)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => fetchPlaceSuggestions(value), 300)
    }

    const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
        setWhere(suggestion.text)
        setSuggestions([])
        setShowSuggestions(false)
        // A new session begins after a selection is made
        sessionTokenRef.current = null
    }

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
                            className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none p-0 placeholder:text-gray-400 truncate"
                            value={what}
                            onChange={(e) => setWhat(e.target.value)}
                        />
                    </div>
                </div>

                {/* Where */}
                <div ref={whereRef} className="relative flex-1 w-full flex items-center gap-4 px-2 lg:pl-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                    <div className="bg-gray-50 p-2 rounded-lg flex shrink-0">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Where</p>
                            {isLoadingPlaces ? (
                                <Loader2 className="h-3 w-3 text-[#F5A800] animate-spin" />
                            ) : (
                                <ChevronDown className="h-3 w-3 text-[#F5A800]" />
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search by location"
                            className="w-full text-sm text-gray-500 bg-transparent border-none focus:outline-none p-0 placeholder:text-gray-400 truncate"
                            value={where}
                            onChange={(e) => handleWhereChange(e.target.value)}
                            onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
                            autoComplete="off"
                        />
                    </div>

                    {/* Places suggestions dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion.id}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                                >
                                    <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                                    <span className="truncate text-sm text-gray-700">{suggestion.text}</span>
                                </button>
                            ))}
                        </div>
                    )}
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
