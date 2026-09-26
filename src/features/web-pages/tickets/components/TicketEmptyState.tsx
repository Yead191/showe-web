"use client";

import React from "react";
import { Ticket, SearchX, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TicketEmptyStateProps {
  isFiltered: boolean;
  onUploadClick: () => void;
  onResetFilters: () => void;
}

export default function TicketEmptyState({
  isFiltered,
  onUploadClick,
  onResetFilters,
}: TicketEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="text-center py-20 px-6 bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200 animate-in fade-in duration-500">
        <div className="h-16 w-16 mx-auto rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4 shadow-xs">
          <SearchX className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">
          No Tickets Match Your Filters
        </h3>
        <p className="text-sm text-gray-500 font-medium max-w-md mx-auto mb-6 leading-relaxed">
          We couldn't find any tickets matching your search query or selected tags.
          Try clearing or adjusting your active filters.
        </p>
        <Button
          variant="outline"
          onClick={onResetFilters}
          className="rounded-2xl h-11 px-6 border-gray-200 text-xs font-black uppercase tracking-wider gap-2 hover:bg-gray-100"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset All Filters</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-6 bg-gray-50/40 rounded-[36px] border border-dashed border-gray-200/90 animate-in fade-in duration-500">
      <div className="relative inline-block mb-5">
        <div className="h-20 w-20 rounded-3xl bg-primary-600/10 text-primary-600 flex items-center justify-center shadow-xs">
          <Ticket className="h-10 w-10" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-xl bg-accent-400 text-white flex items-center justify-center shadow-md">
          <Plus className="h-4 w-4 stroke-[3]" />
        </div>
      </div>

      <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Your Ticket Wallet is Empty
      </h3>
      <p className="text-sm text-gray-500 font-medium max-w-md mx-auto mb-8 leading-relaxed">
        Upload and keep your concert tickets, theatre stubs, festival passes, and PDF receipts neatly organized in one secure place.
      </p>

      <Button
        onClick={onUploadClick}
        className="rounded-2xl h-12 px-8 bg-primary-600 hover:bg-primary-700 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary-600/20 hover:scale-[1.02] transition-transform"
      >
        <Plus className="h-4 w-4" />
        <span>Upload Your First Ticket</span>
      </Button>
    </div>
  );
}
