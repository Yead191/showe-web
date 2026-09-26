import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TicketSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 md:p-8 rounded-[32px] border border-gray-100 bg-white flex flex-col md:flex-row gap-6 animate-pulse"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-8 w-3/4 rounded-xl" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-gray-50">
              <Skeleton className="h-4 w-28 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-xl" />
                <Skeleton className="h-9 w-9 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="md:w-64 bg-gray-50/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-4">
            <Skeleton className="w-full aspect-4/3 max-w-[200px] rounded-2xl" />
            <div className="w-full flex gap-2">
              <Skeleton className="h-9 flex-1 rounded-xl" />
              <Skeleton className="h-9 flex-1 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
