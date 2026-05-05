import {
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { ALL_ITEMS } from "@/helpers/useTheatreStore";
import { BookCard } from "./BookCard";
import { InfoTile } from "./InfoTile";


interface Slot { x: number; y: number }

interface DiagonalBooksSectionProps {
  offset: number;    // current first-visible index
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

  // Reactive container width
  const [containerW, setContainerW] = useState(1200);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Responsive N (visible books) ─────────────────────────────────────────────
  const N = containerW >= 1100 ? 6 : containerW >= 750 ? 5 : containerW >= 500 ? 4 : 3;

  // ── Book dimensions ───────────────────────────────────────────────────────────
  const bookW = Math.floor((containerW * 0.84) / (N * 1.28));
  const bookH = Math.floor(bookW * 1.5);

  // ── Slot positions ────────────────────────────────────────────────────────────
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

  // Off-screen ghost slots for smooth entry/exit
  const ghostPrev: Slot = { x: slots[0].x - xStep, y: slots[0].y - yStep };
  const ghostNext: Slot = { x: slots[N - 1].x + xStep, y: slots[N - 1].y + yStep };

  // ── Input Handling with Throttle ──────────────────────────────────────────────
  const isMoving = useRef(false);
  const handleSwipe = (dir: number) => {
    if (isMoving.current) return;
    isMoving.current = true;
    if (dir > 0) onSwipeLeft();
    else onSwipePrev();
    // Throttle duration matches transition duration (500ms)
    setTimeout(() => { isMoving.current = false; }, 500);
  };

  // Wheel handling
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

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleSwipe(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handleSwipe(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSwipeLeft, onSwipePrev]);

  // Touch handling
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) handleSwipe(dx < 0 ? 1 : -1);
  };

  // ── Render Items ──────────────────────────────────────────────────────────────
  const renderedItems = useMemo(() => {
    const total = ALL_ITEMS.length;
    return ALL_ITEMS.map((item, i) => {
      // Calculate relative index compared to offset
      let relIdx = (i - offset + total) % total;

      // If relIdx is close to the end, wrap it to negative for smooth exit
      // Example: item 0 when offset moves from 0 to 1 becomes relIdx 9. 
      // We want it at -1 (ghostPrev).
      if (relIdx > N + 1) relIdx -= total;

      let x = 0, y = 0, opacity = 0, zIndex = 0, infoOp = 0;

      if (relIdx >= 0 && relIdx < N) {
        // Visible slots
        x = slots[relIdx].x;
        y = slots[relIdx].y;
        opacity = 1;
        infoOp = 1;
        zIndex = 10 + (N - relIdx);
      } else if (relIdx === -1) {
        // Ghost Exit
        x = ghostPrev.x;
        y = ghostPrev.y;
        opacity = 0;
        infoOp = 0;
        zIndex = 5;
      } else if (relIdx === N) {
        // Ghost Enter
        x = ghostNext.x;
        y = ghostNext.y;
        opacity = 0;
        infoOp = 0;
        zIndex = 5;
      } else {
        // Hidden
        opacity = 0;
        // Keep them at one of the ghost positions to avoid long jumps across screen
        x = relIdx < -1 ? ghostPrev.x : ghostNext.x;
        y = relIdx < -1 ? ghostPrev.y : ghostNext.y;
        zIndex = 0;
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
        touchAction: "none" // Crucial for mobile stability
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Golden diagonal line + dots ──────────────────────────────────────── */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: totalH, overflow: "visible" }}
      >
        {slots.length >= 2 && (
          <line
            x1={slots[0].x + bookW / 2} y1={lineY(slots[0])}
            x2={slots[N - 1].x + bookW / 2} y2={lineY(slots[N - 1])}
            stroke="#F5A623" strokeWidth="1.4" opacity="0.42"
          />
        )}
        {slots.map((slot, i) => (
          <g key={i}>
            <circle cx={slot.x + bookW / 2} cy={lineY(slot)} r="8" fill="#F5A623" opacity="0.18" />
            <circle cx={slot.x + bookW / 2} cy={lineY(slot)} r="4" fill="#F5A623" opacity="0.9" />
          </g>
        ))}
      </svg>

      {/* ── Declarative book cards + info tiles ─────────────────────────────── */}
      {renderedItems.map((b) => {
        const transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        const infoTransform = `translate3d(${b.x}px, ${b.y + bookH + 22}px, 0)`;

        return (
          <div key={b.id}>
            {/* Book card */}
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
                transition: "transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease",
                willChange: "transform, opacity",
              }}
            >
              <BookCard
                item={b.item}
                width={bookW}
                height={bookH}
                onTap={() => router.push(`/programmes/${b.item.id}`)}
              />
            </div>

            {/* Info tile */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: bookW,
                transform: infoTransform,
                opacity: b.infoOp,
                zIndex: 5,
                transition: "transform 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms ease",
                willChange: "transform, opacity",
              }}
            >
              <InfoTile item={b.item} width={bookW} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
