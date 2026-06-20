"use client";

import { useEffect, useRef } from "react";
import { TheatreItem } from "@/helpers/useTheatreStore";
import { Eye, Trash2 } from "lucide-react";

interface ProgrammeCardActionsMenuProps {
  item: TheatreItem | null;
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  onView: (item: TheatreItem) => void;
  onDeleteRequest: (item: TheatreItem) => void;
}

export function ProgrammeCardActionsMenu({
  item,
  open,
  x,
  y,
  onClose,
  onView,
  onDeleteRequest,
}: ProgrammeCardActionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 768;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label={`${item.title} actions`}
      className="fixed z-[80] min-w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#061419] p-2 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur"
      style={{
        left: Math.min(x, viewportWidth - 224),
        top: Math.min(y, viewportHeight - 144),
      }}
    >
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onView(item);
          onClose();
        }}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none"
      >
        <Eye className="h-4 w-4" />
        View programme
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onDeleteRequest(item);
          onClose();
        }}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-200 transition-colors hover:bg-red-500/10 focus:bg-red-500/10 focus:outline-none"
      >
        <Trash2 className="h-4 w-4" />
        Delete programme
      </button>
    </div>
  );
}
