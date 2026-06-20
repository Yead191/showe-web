"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TheatreItem } from "@/helpers/useTheatreStore";
import { Eye, Trash2 } from "lucide-react";

interface BookCardProps {
  item: TheatreItem;
  width: number;
  height: number;
  onTap: () => void;
  onDeleteRequest: (item: TheatreItem) => void;
}

export function BookCard({
  item,
  width,
  height,
  onTap,
  onDeleteRequest,
}: BookCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const longPressTriggeredRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const openMenu = (anchor: DOMRect) => {
    const menuWidth = 208;
    const menuHeight = 104;
    const preferredX = anchor.right + 12;
    const preferredY = anchor.top + anchor.height * 0.5 - menuHeight * 0.5;
    const clampedX = Math.max(12, Math.min(preferredX, window.innerWidth - menuWidth - 12));
    const clampedY = Math.max(12, Math.min(preferredY, window.innerHeight - menuHeight - 12));

    setMenuPosition({
      x: clampedX - anchor.left,
      y: clampedY - anchor.top,
    });
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (cardRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      ref={cardRef}
      onClick={onTap}
      onContextMenu={(event) => {
        event.preventDefault();
        openMenu(event.currentTarget.getBoundingClientRect());
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") return;
        longPressTriggeredRef.current = false;
        clearLongPressTimer();
        longPressTimerRef.current = window.setTimeout(() => {
          longPressTriggeredRef.current = true;
          openMenu(event.currentTarget.getBoundingClientRect());
        }, 550);
      }}
      onPointerUp={clearLongPressTimer}
      onPointerLeave={clearLongPressTimer}
      onPointerCancel={clearLongPressTimer}
      className="relative overflow-visible cursor-pointer select-none active:scale-[0.97] transition-transform"
      style={{
        width,
        height,
        border: "2px solid rgba(245,166,35,0.65)",
      }}
    >
      {/* ── Background ── */}
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        /* Fallback gradient book cover when no image provided */
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg,#17093a 0%,#2a1060 28%,#481a80 52%,#7040a8 75%,#9a68c8 100%)",
          }}
        />
      )}
      {menuOpen && (
        <div
          className="absolute z-30 min-w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#061419] p-2 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
          }}
        >
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen(false);
              longPressTriggeredRef.current = false;
              onTap();
            }}
          >
            <Eye className="h-4 w-4" />
            View programme
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-200 transition-colors hover:bg-red-500/10"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen(false);
              onDeleteRequest(item);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete programme
          </button>
        </div>
      )}
    </div>
  );
}
