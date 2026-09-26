"use client";

import React from "react";
import { Search, X, SlidersHorizontal, Tag as TagIcon } from "lucide-react";
import type {
  TicketFilterState,
  TicketStatusFilter,
  TicketSortOption,
} from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TicketFiltersProps {
  filters: TicketFilterState;
  onFilterChange: (updates: Partial<TicketFilterState>) => void;
  availableTags: string[];
  totalResults: number;
}

const SORT_LABELS: Record<TicketSortOption, string> = {
  newest: "Newest First",
  oldest: "Oldest First",
  eventDateSoonest: "Date: Soonest First",
  eventDateLatest: "Date: Latest First",
  nameAsc: "Name: A to Z",
};

export default function TicketFilters({
  filters,
  onFilterChange,
  availableTags,
  totalResults,
}: TicketFiltersProps) {
  const isFiltered =
    Boolean(filters.searchTerm) ||
    filters.status !== "all" ||
    Boolean(filters.selectedTag) ||
    filters.sort !== "newest";

  const handleClearFilters = () => {
    onFilterChange({
      searchTerm: "",
      status: "all",
      selectedTag: null,
      sort: "newest",
    });
  };

  return (
    <div className="space-y-4">
      {/* ── Search & Primary Controls Bar ── */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            placeholder="Search tickets by name or tag..."
            className="w-full h-11 pl-11 pr-10 rounded-2xl bg-gray-50/70 border border-gray-200/80 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 focus:bg-white transition-all"
          />
          {filters.searchTerm && (
            <button
              onClick={() => onFilterChange({ searchTerm: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs (All, Upcoming, Past) */}
        <div className="flex p-1 bg-gray-100/80 rounded-2xl border border-gray-200/60 self-start md:self-auto shrink-0">
          {(["all", "upcoming", "past"] as TicketStatusFilter[]).map((tab) => {
            const isActive = filters.status === tab;
            return (
              <button
                key={tab}
                onClick={() => onFilterChange({ status: tab })}
                className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all capitalize ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm shadow-black/5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 rounded-2xl border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 gap-2 px-4"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-gray-500" />
                <span className="hidden sm:inline text-gray-400 font-medium">
                  Sort:
                </span>
                <span>{SORT_LABELS[filters.sort]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-2xl p-1.5 min-w-[200px] shadow-xl border-gray-100"
            >
              {(Object.keys(SORT_LABELS) as TicketSortOption[]).map((key) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onFilterChange({ sort: key })}
                  className={`rounded-xl text-xs font-bold px-3 py-2 cursor-pointer ${
                    filters.sort === key
                      ? "bg-primary-600/10 text-primary-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {SORT_LABELS[key]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset Filters button if any filter is active */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="h-11 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-1.5 px-3"
            >
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* ── Available Tags Chips (if any) ── */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400 shrink-0 pr-1">
            <TagIcon className="h-3 w-3" />
            <span>Tags:</span>
          </div>

          <button
            onClick={() => onFilterChange({ selectedTag: null })}
            className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
              filters.selectedTag === null
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {availableTags.map((tag) => {
            const isSelected = filters.selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() =>
                  onFilterChange({ selectedTag: isSelected ? null : tag })
                }
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-gray-400 font-medium px-1">
        <span>
          Showing{" "}
          <strong className="text-gray-900 font-bold">{totalResults}</strong>{" "}
          {totalResults === 1 ? "ticket" : "tickets"}
        </span>
      </div>
    </div>
  );
}
