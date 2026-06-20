import { useRef, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ALL_ITEMS } from "@/helpers/useTheatreStore";
import { BookCard } from "./BookCard";
import { InfoTile } from "./InfoTile";
import { DeleteProgrammeDialog } from "./DeleteProgrammeDialog";

interface Slot {
  x: number;
  y: number;
}

interface DiagonalBooksSectionProps {
  offset: number;
  onSwipeLeft: () => void;
  onSwipePrev: () => void;
}

export function DiagonalBooksSection({
  offset,
  onSwipeLeft,
  onSwipePrev,
}: DiagonalBooksSectionProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<(typeof ALL_ITEMS)[number] | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [containerW, setContainerW] = useState(1200);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const N = containerW >= 1100 ? 6 : containerW >= 750 ? 5 : containerW >= 500 ? 4 : 3;
  const bookW = Math.floor((containerW * 0.84) / (N * 1.28));
  const bookH = Math.floor(bookW * 1.5);

  const xPad = containerW * 0.05;
  const xEnd = containerW * 0.95 - bookW;
  const xStep = (xEnd - xPad) / (N - 1 || 1);
  const yStart = 320;
  const yEnd = 40;
  const yStep = (yEnd - yStart) / (N - 1 || 1);

  const slots = useMemo(() => {
    return Array.from({ length: N }, (_, i) => ({
      x: xPad + i * xStep,
      y: yStart + i * yStep,
    }));
  }, [N, xPad, xStep, yStart, yStep]);

  const totalH = yStart + bookH + 200;
  const ghostPrev: Slot = { x: slots[0].x - xStep, y: slots[0].y - yStep };
  const ghostNext: Slot = { x: slots[N - 1].x + xStep, y: slots[N - 1].y + yStep };

  const isMoving = useRef(false);
  const handleSwipe = (dir: number) => {
    if (isMoving.current) return;
    isMoving.current = true;
    if (dir > 0) onSwipeLeft();
    else onSwipePrev();
    setTimeout(() => {
      isMoving.current = false;
    }, 500);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      e.preventDefault();
      handleSwipe(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onSwipeLeft, onSwipePrev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleSwipe(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handleSwipe(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSwipeLeft, onSwipePrev]);

  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) handleSwipe(dx < 0 ? 1 : -1);
  };

  const handleViewProgramme = (item: (typeof ALL_ITEMS)[number]) => {
    router.push(`/programmes/${item.id}`);
  };

  const handleDeleteRequest = (item: (typeof ALL_ITEMS)[number]) => {
    setActiveItem(item);
    setDeleteDialogOpen(true);
  };

  const renderedItems = useMemo(() => {
    const total = ALL_ITEMS.length;
    return ALL_ITEMS.map((item, i) => {
      let relIdx = (i - offset + total) % total;
      if (relIdx > N + 1) relIdx -= total;

      let x = 0;
      let y = 0;
      let opacity = 0;
      let zIndex = 0;
      let infoOp = 0;

      if (relIdx >= 0 && relIdx < N) {
        x = slots[relIdx].x;
        y = slots[relIdx].y;
        opacity = 1;
        infoOp = 1;
        zIndex = 10 + (N - relIdx);
      } else if (relIdx === -1) {
        x = ghostPrev.x;
        y = ghostPrev.y;
      } else if (relIdx === N) {
        x = ghostNext.x;
        y = ghostNext.y;
      } else {
        x = relIdx < -1 ? ghostPrev.x : ghostNext.x;
        y = relIdx < -1 ? ghostPrev.y : ghostNext.y;
      }

      return { item, x, y, opacity, infoOp, zIndex, id: item.id };
    });
  }, [offset, N, slots, ghostPrev, ghostNext]);

  const lineY = (s: Slot) => s.y + bookH + 10;

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-all duration-500 ease-in-out"
      style={{
        height: totalH,
        overflow: "visible",
        touchAction: "none",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: totalH, overflow: "visible" }}
      >
        {slots.length >= 2 && (
          <line
            x1={slots[0].x + bookW / 2}
            y1={lineY(slots[0])}
            x2={slots[N - 1].x + bookW / 2}
            y2={lineY(slots[N - 1])}
            stroke="#F5A623"
            strokeWidth="1.4"
            opacity="0.42"
          />
        )}
        {slots.map((slot, i) => (
          <g key={i}>
            <circle
              cx={slot.x + bookW / 2}
              cy={lineY(slot)}
              r="8"
              fill="#F5A623"
              opacity="0.18"
            />
            <circle
              cx={slot.x + bookW / 2}
              cy={lineY(slot)}
              r="4"
              fill="#F5A623"
              opacity="0.9"
            />
          </g>
        ))}
      </svg>

      {renderedItems.map((b) => {
        const transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        const infoTransform = `translate3d(${b.x}px, ${b.y + bookH + 22}px, 0)`;

        return (
          <div key={b.id}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: bookW,
                height: bookH,
                transform,
                opacity: b.opacity,
                zIndex: b.zIndex,
                transition:
                  "transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease",
                willChange: "transform, opacity",
              }}
            >
              <BookCard
                item={b.item}
                width={bookW}
                height={bookH}
                onTap={() => handleViewProgramme(b.item)}
                onDeleteRequest={handleDeleteRequest}
              />
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: bookW,
                transform: infoTransform,
                opacity: b.infoOp,
                zIndex: 5,
                transition:
                  "transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms ease",
                willChange: "transform, opacity",
              }}
            >
              <InfoTile item={b.item} width={bookW} />
            </div>
          </div>
        );
      })}

      <DeleteProgrammeDialog
        item={activeItem}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={(item) => {
          console.log("Delete programme:", item);
        }}
      />
    </div>
  );
}
