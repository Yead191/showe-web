"use client"

import React from "react"
import { X, ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

interface ResultsHeaderProps {
    search: {
        q?: string
        location?: string
        date?: string
        category?: string
    }
}

export function ResultsHeader({ search }: ResultsHeaderProps) {
    const router = useRouter()

    // Check if any search is active
    const isActive = search.q || search.location || search.date || search.category

    const clearParam = (key: string) => {
        const params = new URLSearchParams(window.location.search)
        params.delete(key)
        router.push(`/events?${params.toString()}`)
    }

    if (!isActive) {
        return (
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">All Events</h2>
            </div>
        )
    }

    return (
        <div className="space-y-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mr-2">Results for :</h2>

                <div className="flex flex-wrap items-center gap-2">
                    {search.category && (
                        <Tag label={search.category} onClear={() => clearParam("category")} />
                    )}
                    {search.location && (
                        <Tag label={search.location} onClear={() => clearParam("location")} />
                    )}
                    {search.date && (
                        <Tag label={search.date} onClear={() => clearParam("date")} />
                    )}
                    {search.q && (
                        <Tag label={search.q} onClear={() => clearParam("q")} />
                    )}
                </div>
            </div>
        </div>
    )
}

function Tag({ label, onClear }: { label: string, onClear: () => void }) {
    return (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-700">
            <span className="capitalize">{label}</span>
            <button
                onClick={onClear}
                className="hover:text-red-500 transition-colors"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </div>
    )
}
