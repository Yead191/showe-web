"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Plus, Ticket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  UserTicket,
  TicketPaginationInfo,
  TicketFilterState,
} from "./types";
import { extractUniqueTags, formatTicketDate } from "./utils";
import TicketStats from "./components/TicketStats";
import TicketFilters from "./components/TicketFilters";
import TicketCard from "./components/TicketCard";
import TicketUploadModal from "./components/TicketUploadModal";
import TicketPreviewModal from "./components/TicketPreviewModal";
import TicketDeleteDialog from "./components/TicketDeleteDialog";
import TicketEmptyState from "./components/TicketEmptyState";
import TicketPagination from "./components/TicketPagination";
import TicketSkeleton from "./components/TicketSkeleton";

interface TicketsFeatureProps {
  initialTickets: UserTicket[];
  initialPagination?: TicketPaginationInfo;
}

export default function TicketsFeature({
  initialTickets,
  initialPagination,
}: TicketsFeatureProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Modal states
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState<UserTicket | null>(null);
  const [ticketToPreview, setTicketToPreview] = useState<UserTicket | null>(null);
  const [ticketToDelete, setTicketToDelete] = useState<UserTicket | null>(null);

  // Active filters from URL search params with sensible defaults
  const searchTerm = searchParams.get("searchTerm") || searchParams.get("search") || "";
  const statusParam = (searchParams.get("status") || "all") as "all" | "upcoming" | "past";
  const tagParam = searchParams.get("tag") || null;
  const sortParam = (searchParams.get("sort") || "newest") as TicketFilterState["sort"];
  const currentPage = Number(searchParams.get("page")) || 1;

  const filters: TicketFilterState = {
    searchTerm,
    status: statusParam,
    selectedTag: tagParam,
    sort: sortParam,
  };

  // Extract all available tags across current tickets
  const availableTags = useMemo(
    () => extractUniqueTags(initialTickets),
    [initialTickets],
  );

  // Update query params in URL
  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || (key === "page" && value === "1")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Filter change handler
  const handleFilterChange = (updates: Partial<TicketFilterState>) => {
    const nextParams: Record<string, string | null> = {};

    if ("searchTerm" in updates) {
      nextParams.searchTerm = updates.searchTerm || null;
      nextParams.page = "1";
    }

    if ("status" in updates) {
      nextParams.status = updates.status === "all" ? null : (updates.status || null);
      nextParams.page = "1";
    }

    if ("selectedTag" in updates) {
      nextParams.tag = updates.selectedTag || null;
      nextParams.page = "1";
    }

    if ("sort" in updates) {
      nextParams.sort = updates.sort === "newest" ? null : (updates.sort || null);
    }

    updateUrlParams(nextParams);
  };

  // Page change handler
  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: String(newPage) });
  };

  // Revalidation and fresh fetch callback after mutations
  const handleMutationSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // Client-side filtering & sorting on the current slice of tickets
  const displayedTickets = useMemo(() => {
    let list = [...initialTickets];

    // Status filter
    if (filters.status !== "all") {
      list = list.filter((t) => {
        const { isPast } = formatTicketDate(t.date);
        return filters.status === "past" ? isPast : !isPast;
      });
    }

    // Tag filter
    if (filters.selectedTag) {
      list = list.filter((t) =>
        Array.isArray(t.tags) &&
        t.tags.some(
          (tag) => tag.toLowerCase() === filters.selectedTag?.toLowerCase(),
        ),
      );
    }

    // Search term filter (in case backend didn't filter or for immediate match)
    if (filters.searchTerm.trim()) {
      const q = filters.searchTerm.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          (Array.isArray(t.tags) &&
            t.tags.some((tag) => tag.toLowerCase().includes(q))),
      );
    }

    // Sort order
    list.sort((a, b) => {
      if (filters.sort === "nameAsc") {
        return a.name.localeCompare(b.name);
      }
      if (filters.sort === "eventDateSoonest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (filters.sort === "eventDateLatest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (filters.sort === "oldest") {
        return (
          new Date(a.createdAt || a.date).getTime() -
          new Date(b.createdAt || b.date).getTime()
        );
      }
      // default: newest
      return (
        new Date(b.createdAt || b.date).getTime() -
        new Date(a.createdAt || a.date).getTime()
      );
    });

    return list;
  }, [initialTickets, filters]);

  const hasAnyTickets = initialTickets.length > 0;
  const isFiltered =
    Boolean(filters.searchTerm) ||
    filters.status !== "all" ||
    Boolean(filters.selectedTag) ||
    filters.sort !== "newest";

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
      {/* ── Top Header & Actions ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-primary-600 text-xs font-black uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Digital Ticket Wallet</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            My Tickets
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium max-w-xl">
            Store, view, and organize your event tickets, entry passes, and PDF documents in one secure place.
          </p>
        </div>

        <Button
          onClick={() => {
            setTicketToEdit(null);
            setIsUploadOpen(true);
          }}
          className="rounded-2xl h-12 px-7 bg-primary-600 hover:bg-primary-700 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary-600/20 hover:scale-[1.02] transition-all self-start md:self-auto shrink-0"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Upload Ticket</span>
        </Button>
      </div>

      {/* ── Quick Stats Metric Row ── */}
      {hasAnyTickets && (
        <TicketStats
          tickets={initialTickets}
          totalFromPagination={initialPagination?.total}
        />
      )}

      {/* ── Search & Filter Controls ── */}
      {hasAnyTickets && (
        <TicketFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          availableTags={availableTags}
          totalResults={displayedTickets.length}
        />
      )}

      {/* ── Tickets List / Loading / Empty State ── */}
      {isPending ? (
        <TicketSkeleton />
      ) : displayedTickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {displayedTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onPreview={(t) => setTicketToPreview(t)}
              onEdit={(t) => {
                setTicketToEdit(t);
                setIsUploadOpen(true);
              }}
              onDelete={(t) => setTicketToDelete(t)}
            />
          ))}
        </div>
      ) : (
        <TicketEmptyState
          isFiltered={isFiltered}
          onUploadClick={() => {
            setTicketToEdit(null);
            setIsUploadOpen(true);
          }}
          onResetFilters={() =>
            handleFilterChange({
              searchTerm: "",
              status: "all",
              selectedTag: null,
              sort: "newest",
            })
          }
        />
      )}

      {/* ── Pagination ── */}
      {initialPagination && initialPagination.totalPage > 1 && (
        <TicketPagination
          currentPage={initialPagination.page || currentPage}
          totalPage={initialPagination.totalPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* ── Modals & Dialogs ── */}
      {/* Upload & Edit Modal */}
      <TicketUploadModal
        isOpen={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          setTicketToEdit(null);
        }}
        ticketToEdit={ticketToEdit}
        onSuccess={handleMutationSuccess}
      />

      {/* Full Preview Modal */}
      <TicketPreviewModal
        isOpen={Boolean(ticketToPreview)}
        onClose={() => setTicketToPreview(null)}
        ticket={ticketToPreview}
      />

      {/* Delete Confirmation Dialog */}
      <TicketDeleteDialog
        isOpen={Boolean(ticketToDelete)}
        onClose={() => setTicketToDelete(null)}
        ticket={ticketToDelete}
        onSuccess={handleMutationSuccess}
      />
    </div>
  );
}
