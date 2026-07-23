"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationInfo {
    total: number
    limit: number
    page: number
    totalPage: number
}

interface EventsPaginationProps {
    pagination?: PaginationInfo
}

// Build a compact page list with ellipses, e.g. [1, "...", 4, 5, 6, "...", 12]
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const items: (number | "ellipsis")[] = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    if (start > 2) items.push("ellipsis")
    for (let p = start; p <= end; p++) items.push(p)
    if (end < total - 1) items.push("ellipsis")

    items.push(total)
    return items
}

export function EventsPagination({ pagination }: EventsPaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    if (!pagination || pagination.totalPage <= 1) return null

    const { page, totalPage } = pagination

    const goToPage = (p: number) => {
        if (p < 1 || p > totalPage || p === page) return
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(p))
        router.push(`/events?${params.toString()}`)
    }

    const pageItems = getPageItems(page, totalPage)

    return (
        <div className="mt-16 flex items-center justify-center gap-2">
            <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-[#F5A800] hover:text-[#F5A800] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {pageItems.map((item, idx) =>
                item === "ellipsis" ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-gray-400 select-none">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        onClick={() => goToPage(item)}
                        aria-current={item === page ? "page" : undefined}
                        className={cn(
                            "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-bold transition-all",
                            item === page
                                ? "bg-[#F5A800] text-white shadow-[0_4px_14px_0_rgba(245,168,0,0.39)]"
                                : "border border-gray-200 text-gray-600 hover:border-[#F5A800] hover:text-[#F5A800]"
                        )}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPage}
                aria-label="Next page"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-[#F5A800] hover:text-[#F5A800] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    )
}
