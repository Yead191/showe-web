import { format, isPast, parseISO, formatDistanceToNow } from "date-fns";
import type { UserTicket } from "./types";

/**
 * Checks if a given file URL or filename represents a PDF document.
 */
export function isPdfFile(url?: string | null): boolean {
  if (!url) return false;
  const clean = url.split("?")[0].toLowerCase();
  return clean.endsWith(".pdf") || clean.includes("application/pdf");
}

/**
 * Parses and formats a ticket date with human-friendly relative status.
 */
export function formatTicketDate(dateStr?: string | null) {
  if (!dateStr) {
    return {
      formatted: "Date not specified",
      relative: "",
      isPast: false,
    };
  }

  try {
    const dateObj = typeof dateStr === "string" && dateStr.includes("T")
      ? parseISO(dateStr)
      : new Date(dateStr);

    if (isNaN(dateObj.getTime())) {
      return {
        formatted: dateStr,
        relative: "",
        isPast: false,
      };
    }

    const past = isPast(dateObj);
    const formatted = format(dateObj, "EEE, MMM d, yyyy");
    const relative = past
      ? `${formatDistanceToNow(dateObj)} ago`
      : `in ${formatDistanceToNow(dateObj)}`;

    return {
      formatted,
      relative,
      isPast: past,
    };
  } catch {
    return {
      formatted: dateStr,
      relative: "",
      isPast: false,
    };
  }
}

/**
 * Format bytes into human-readable size (KB, MB).
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Trigger file download in browser.
 */
export async function downloadTicketFile(fileUrl: string, fileName?: string) {
  try {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName || fileUrl.split("/").pop() || "ticket-file";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch {
    // Fallback: open in new window
    window.open(fileUrl, "_blank");
  }
}

/**
 * Collects unique tags across an array of tickets.
 */
export function extractUniqueTags(tickets: UserTicket[]): string[] {
  const tagsSet = new Set<string>();
  tickets.forEach((t) => {
    if (Array.isArray(t.tags)) {
      t.tags.forEach((tag) => {
        if (typeof tag === "string" && tag.trim()) {
          tagsSet.add(tag.trim());
        }
      });
    }
  });
  return Array.from(tagsSet);
}
