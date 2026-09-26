"use client";

import React from "react";
import { Ticket, CalendarClock, History, FileText } from "lucide-react";
import type { UserTicket } from "../types";
import { isPdfFile, formatTicketDate } from "../utils";

interface TicketStatsProps {
  tickets: UserTicket[];
  totalFromPagination?: number;
}

export default function TicketStats({
  tickets,
  totalFromPagination,
}: TicketStatsProps) {
  const total = totalFromPagination ?? tickets.length;

  const upcomingCount = tickets.filter((t) => {
    const { isPast } = formatTicketDate(t.date);
    return !isPast;
  }).length;

  const pastCount = tickets.filter((t) => {
    const { isPast } = formatTicketDate(t.date);
    return isPast;
  }).length;

  const pdfCount = tickets.filter((t) => isPdfFile(t.file)).length;
  const imageCount = tickets.length - pdfCount;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {/* Total Tickets */}
      <div className="p-4 md:p-5 rounded-2xl md:rounded-[24px] bg-gray-50/60 border border-gray-100 flex items-center gap-3.5 transition-all hover:bg-gray-50 hover:border-gray-200">
        <div className="h-11 w-11 rounded-2xl bg-primary-600/10 text-primary-600 flex items-center justify-center shrink-0">
          <Ticket className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
            Total Tickets
          </p>
          <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            {total}
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="p-4 md:p-5 rounded-2xl md:rounded-[24px] bg-gray-50/60 border border-gray-100 flex items-center gap-3.5 transition-all hover:bg-gray-50 hover:border-gray-200">
        <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
            Upcoming
          </p>
          <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            {upcomingCount}
          </p>
        </div>
      </div>

      {/* Past Events */}
      <div className="p-4 md:p-5 rounded-2xl md:rounded-[24px] bg-gray-50/60 border border-gray-100 flex items-center gap-3.5 transition-all hover:bg-gray-50 hover:border-gray-200">
        <div className="h-11 w-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
          <History className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
            Past Shows
          </p>
          <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            {pastCount}
          </p>
        </div>
      </div>

      {/* Documents Stored */}
      <div className="p-4 md:p-5 rounded-2xl md:rounded-[24px] bg-gray-50/60 border border-gray-100 flex items-center gap-3.5 transition-all hover:bg-gray-50 hover:border-gray-200">
        <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
            Documents
          </p>
          <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            {pdfCount} <span className="text-xs font-bold text-gray-400">PDF</span> / {imageCount} <span className="text-xs font-bold text-gray-400">IMG</span>
          </p>
        </div>
      </div>
    </div>
  );
}
