"use client";

import * as React from "react";
import { Heart, Clock, CalendarDays, Check, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { EventPerformance } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function formatType(type: string) {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface PerformancesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  performances?: EventPerformance[];
  eventTitle?: string;
  eventId?: string;
}

export function PerformancesModal({
  open,
  onOpenChange,
  performances,
  eventTitle,
  eventId,
}: PerformancesModalProps) {
  const [selectedPerformanceId, setSelectedPerformanceId] = React.useState<
    string | null
  >(null);
  const [submittingId, setSubmittingId] = React.useState<string | null>(null);

  const storageKey = React.useMemo(() => {
    return eventId ? `saved_performance_${eventId}` : "saved_performance_id";
  }, [eventId]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved =
        localStorage.getItem(storageKey) ||
        localStorage.getItem("saved_performance_id");
      if (saved) {
        setSelectedPerformanceId(saved);
      }
    }
  }, [storageKey, open]);

  const handleSelectPerformance = async (perf: EventPerformance) => {
    if (submittingId) return;

    setSubmittingId(perf._id);
    try {
      const res = await nextFetch(`/event/interest/${perf._id}`, {
        method: "POST",
        body: {
          type: "Performances",
        },
      });

      if (res?.success) {
        setSelectedPerformanceId(perf._id);
        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, perf._id);
          localStorage.setItem("saved_performance_id", perf._id);
        }
        const label = perf.date
          ? format(parseISO(perf.date), "EEE, MMM dd")
          : "this slot";
        toast.success(res?.message || `Selected ${label} performance`, {
          id: "perf-select",
        });
      } else {
        toast.error(
          res?.message ||
            res?.error ||
            "Failed to update performance selection",
          {
            id: "perf-select",
          },
        );
      }
    } catch {
      toast.error("Something went wrong selecting the performance.", {
        id: "perf-select",
      });
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden gap-0">
        <DialogHeader className="p-6 md:p-7 border-b border-gray-100 bg-gray-50/60">
          <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
            Choose a performance
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-gray-500">
            {eventTitle
              ? `Select the slots of "${eventTitle}" you'd like to attend and mark them as favourite.`
              : "Select the slots you'd like to attend and mark them as favourite."}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 md:p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {(!performances || performances.length === 0) && (
            <p className="text-sm font-bold text-gray-400 text-center py-8">
              No performance slots available yet.
            </p>
          )}

          {performances?.map((perf) => {
            const isSelected = selectedPerformanceId === perf._id;
            const isSubmitting = submittingId === perf._id;
            const dateObj = perf.date ? parseISO(perf.date) : null;
            return (
              <div
                key={perf._id}
                onClick={() => handleSelectPerformance(perf)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
                  isSelected
                    ? "border-accent-400 bg-accent-400/5 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200",
                )}
              >
                {/* Date block */}
                <div className="flex flex-col items-center justify-center shrink-0 h-14 w-14 rounded-2xl bg-primary-600 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                    {dateObj ? format(dateObj, "MMM") : "--"}
                  </span>
                  <span className="text-xl font-black leading-tight">
                    {dateObj ? format(dateObj, "dd") : "--"}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-black text-gray-900 leading-tight flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-accent-400 shrink-0" />
                    {dateObj ? format(dateObj, "EEEE, MMM dd") : "Date TBA"}
                  </p>
                  <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-primary-600 shrink-0" />
                    {perf.start_time} - {perf.end_time}
                    <span className="ml-1 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-gray-600">
                      {formatType(perf.type)}
                    </span>
                  </p>
                </div>

                {/* Selection / Favorite button */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPerformance(perf);
                  }}
                  aria-pressed={isSelected}
                  className={cn(
                    "h-11 w-11 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 cursor-pointer border",
                    isSelected
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200",
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Heart
                      className={cn("h-5 w-5", isSelected && "fill-white")}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {performances && performances.length > 0 && (
          <div className="p-4 md:p-5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
              <Check className="h-4 w-4 text-accent-400" />
              {selectedPerformanceId ? "1 selected" : "None selected"}
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-10 px-6 rounded-full bg-primary-600 hover:bg-[#023a40] text-white text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
