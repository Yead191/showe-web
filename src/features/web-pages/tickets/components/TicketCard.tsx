"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Download,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  FileText,
  ImageIcon,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserTicket } from "../types";
import {
  isPdfFile,
  formatTicketDate,
  downloadTicketFile,
} from "../utils";
import { getImageUrl } from "@/lib/getImageUrl";

interface TicketCardProps {
  ticket: UserTicket;
  onPreview: (ticket: UserTicket) => void;
  onEdit: (ticket: UserTicket) => void;
  onDelete: (ticket: UserTicket) => void;
}

export default function TicketCard({
  ticket,
  onPreview,
  onEdit,
  onDelete,
}: TicketCardProps) {
  const isPdf = isPdfFile(ticket.file);
  const fileUrl = getImageUrl(ticket.file);
  const { formatted, relative, isPast } = formatTicketDate(ticket.date);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      const ext = isPdf ? "pdf" : "jpg";
      const sanitizedName = ticket.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      await downloadTicketFile(fileUrl, `${sanitizedName}_ticket.${ext}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-100 hover:border-gray-200 rounded-[28px] md:rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary-600/5 transition-all duration-300 flex flex-col md:flex-row">
      {/* ── Left / Main Content ── */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-5">
        <div className="space-y-4">
          {/* Header Badges: Status + File Type + ID */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge
                className={`rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider border-none ${
                  isPast
                    ? "bg-gray-100 text-gray-500"
                    : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                }`}
              >
                {isPast ? "Past Event" : "Upcoming"}
              </Badge>

              {isPdf ? (
                <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 border-none gap-1">
                  <FileText className="h-3 w-3" />
                  PDF
                </Badge>
              ) : (
                <Badge className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 border-none gap-1">
                  <ImageIcon className="h-3 w-3" />
                  Image
                </Badge>
              )}
            </div>

            {ticket._id && (
              <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">
                ID: {ticket._id.slice(-6).toUpperCase()}
              </span>
            )}
          </div>

          {/* Ticket Title */}
          <div>
            <h3
              onClick={() => onPreview(ticket)}
              className="text-xl md:text-2xl font-black text-gray-900 tracking-tight cursor-pointer hover:text-primary-600 transition-colors line-clamp-2"
              title={ticket.name}
            >
              {ticket.name}
            </h3>

            {/* Date Details */}
            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-1.5 text-primary-700 font-bold bg-primary-50/60 px-2.5 py-1 rounded-lg">
                <Calendar className="h-3.5 w-3.5 text-primary-600" />
                <span>{formatted}</span>
              </div>

              {relative && (
                <div className="flex items-center gap-1 text-gray-400 font-medium">
                  <Clock className="h-3 w-3" />
                  <span>{relative}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags Chips */}
          {Array.isArray(ticket.tags) && ticket.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ticket.tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600 border border-gray-200/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Metadata and Mobile Quick Actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] font-medium text-gray-400">
            {ticket.createdAt
              ? `Added ${formatTicketDate(ticket.createdAt).formatted}`
              : "Saved in your wallet"}
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPreview(ticket)}
              className="h-9 px-3 rounded-xl text-xs font-black text-primary-600 hover:bg-primary-50 gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl p-1.5 min-w-[160px] shadow-xl border-gray-100"
              >
                <DropdownMenuItem
                  onClick={() => onPreview(ticket)}
                  className="rounded-xl text-xs font-bold px-3 py-2 cursor-pointer gap-2"
                >
                  <Eye className="h-3.5 w-3.5 text-gray-500" />
                  <span>Preview File</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDownload}
                  className="rounded-xl text-xs font-bold px-3 py-2 cursor-pointer gap-2"
                >
                  <Download className="h-3.5 w-3.5 text-gray-500" />
                  <span>Download File</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => window.open(fileUrl, "_blank")}
                  className="rounded-xl text-xs font-bold px-3 py-2 cursor-pointer gap-2"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-gray-500" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  onClick={() => onEdit(ticket)}
                  className="rounded-xl text-xs font-bold px-3 py-2 cursor-pointer gap-2 text-gray-700"
                >
                  <Pencil className="h-3.5 w-3.5 text-amber-500" />
                  <span>Edit Ticket</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDelete(ticket)}
                  className="rounded-xl text-xs font-bold px-3 py-2 cursor-pointer gap-2 text-rose-600 focus:text-rose-700 focus:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Ticket</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* ── Perforated Divider (Desktop) ── */}
      <div className="relative hidden md:flex flex-col items-center justify-between w-0 border-l border-dashed border-gray-200">
        <div className="w-5 h-5 rounded-full bg-[#F8FAFB] -mt-2.5 -ml-2.5 border-b border-gray-200/80" />
        <div className="w-5 h-5 rounded-full bg-[#F8FAFB] -mb-2.5 -ml-2.5 border-t border-gray-200/80" />
      </div>

      {/* ── Right Section / Stub (File Preview & Actions) ── */}
      <div className="md:w-64 bg-gray-50/70 p-6 flex flex-col items-center justify-center gap-4 border-t md:border-t-0 border-gray-100">
        {/* Document Thumbnail / Icon */}
        <div
          onClick={() => onPreview(ticket)}
          className="relative w-full aspect-4/3 max-w-[200px] rounded-2xl overflow-hidden bg-white border border-gray-200/70 shadow-xs cursor-pointer group/thumb transition-all duration-300 hover:scale-[1.02] hover:shadow-md flex items-center justify-center"
        >
          {isPdf ? (
            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs">
                <FileText className="h-6 w-6" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 line-clamp-1">
                PDF Document
              </p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={fileUrl}
                alt={ticket.name}
                fill
                className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                unoptimized
              />
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
            <span className="p-2 rounded-xl bg-white text-gray-900 shadow-md">
              <Eye className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Quick Stub Buttons */}
        <div className="w-full flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 h-9 rounded-xl text-xs font-black uppercase tracking-wider border-gray-200 text-gray-700 hover:bg-white gap-1.5 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isDownloading ? "..." : "Download"}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => onPreview(ticket)}
            className="flex-1 h-9 rounded-xl text-xs font-black uppercase tracking-wider bg-primary-600 hover:bg-primary-700 text-white gap-1.5 shadow-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Open</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
