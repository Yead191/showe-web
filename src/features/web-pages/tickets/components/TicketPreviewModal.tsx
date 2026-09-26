"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Download,
  ExternalLink,
  Calendar,
  FileText,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ImageIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UserTicket } from "../types";
import { isPdfFile, formatTicketDate, downloadTicketFile } from "../utils";
import { getImageUrl } from "@/lib/getImageUrl";

interface TicketPreviewModalProps {
  ticket: UserTicket | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketPreviewModal({
  ticket,
  isOpen,
  onClose,
}: TicketPreviewModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!ticket) return null;

  const isPdf = isPdfFile(ticket.file);
  const fileUrl = getImageUrl(ticket.file);
  const { formatted, isPast } = formatTicketDate(ticket.date);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const ext = isPdf ? "pdf" : "jpg";
      const sanitizedName = ticket.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      await downloadTicketFile(fileUrl, `${sanitizedName}_ticket.${ext}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (isPdf) {
      const printWindow = window.open(fileUrl, "_blank");
      printWindow?.focus();
      printWindow?.print();
    } else {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>${ticket.name}</title></head>
            <body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;">
              <img src="${fileUrl}" style="max-width:100%;max-height:100vh;object-fit:contain;" onload="window.print();window.close();" />
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleResetZoom();
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[96vw] max-w-[96vw] sm:max-w-[94vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[92vh] max-h-[92vh] rounded-[28px] md:rounded-[36px] p-0 overflow-hidden border-gray-100 shadow-2xl flex flex-col bg-white"
      >
        {/* ── Modal Header & Actions Bar ── */}
        <div className="shrink-0 p-4 md:p-6 border-b border-gray-100 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Info, Badges, Title */}
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    isPast
                      ? "bg-gray-100 text-gray-500"
                      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                  }`}
                >
                  {isPast ? "Past Event" : "Upcoming"}
                </span>

                <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">
                  <Calendar className="h-3.5 w-3.5 text-primary-600" />
                  {formatted}
                </span>

                {isPdf ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-100">
                    <FileText className="h-3 w-3" />
                    PDF
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                    <ImageIcon className="h-3 w-3" />
                    Image
                  </span>
                )}

                {Array.isArray(ticket.tags) &&
                  ticket.tags.map((tag, idx) => (
                    <span
                      key={`${tag}-${idx}`}
                      className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>

              <DialogTitle className="text-lg md:text-2xl font-black text-gray-900 tracking-tight truncate">
                {ticket.name}
              </DialogTitle>
            </div>

            {/* Right: Actions Toolbar & Close Button */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Zoom Controls for Images */}
              {!isPdf && (
                <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.2))}
                    className="h-8 w-8 rounded-lg text-gray-600 hover:bg-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-[11px] font-bold text-gray-600 px-1 min-w-[42px] text-center select-none">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZoomLevel((z) => Math.min(3, z + 0.2))}
                    className="h-8 w-8 rounded-lg text-gray-600 hover:bg-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="h-8 w-8 rounded-lg text-gray-600 hover:bg-white"
                    title="Rotate 90deg"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Print Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrint}
                className="h-9 w-9 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                title="Print ticket"
              >
                <Printer className="h-4 w-4" />
              </Button>

              {/* Open in New Tab Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(fileUrl, "_blank")}
                className="h-9 w-9 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>

              {/* Download Button */}
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="h-9 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-primary-600 hover:bg-primary-700 text-white gap-1.5 shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{isDownloading ? "..." : "Download"}</span>
              </Button>

              {/* Dedicated Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  handleResetZoom();
                  onClose();
                }}
                className="h-9 w-9 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Document / Image Viewer Area ── */}
        <div className="flex-1 min-h-0 bg-[#0F172A]/5 relative overflow-auto flex items-center justify-center p-3 md:p-6">
          {isPdf ? (
            <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px]">
              <iframe
                src={`${fileUrl}#toolbar=1&navpanes=0`}
                title={ticket.name}
                className="w-full h-full min-h-[500px] rounded-2xl bg-white border border-gray-200 shadow-sm"
              />
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(fileUrl, "_blank")}
                  className="text-xs font-bold text-primary-600 hover:underline gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Trouble viewing PDF? Click here to open directly</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
              <div
                className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                }}
              >
                <Image
                  src={fileUrl}
                  alt={ticket.name}
                  width={1920}
                  height={1080}
                  className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-2xl shadow-xl bg-white border border-gray-200"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
