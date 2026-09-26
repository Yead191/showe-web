"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push("ellipsis");

  items.push(total);
  return items;
}

export default function TicketPagination({
  currentPage,
  totalPage,
  onPageChange,
}: TicketPaginationProps) {
  if (!totalPage || totalPage <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPage);

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition-all hover:border-primary-600 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((item, idx) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-gray-400 select-none font-bold"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={cn(
              "flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-xs font-black transition-all",
              item === currentPage
                ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                : "border border-gray-200 text-gray-600 hover:border-primary-600 hover:text-primary-600 bg-white",
            )}
          >
            {item}
          </button>
        ),
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPage}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition-all hover:border-primary-600 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
