import {
  useRef,
  useEffect,
  useState,
  useCallback,
  CSSProperties,
} from "react";
import { useRouter } from "next/navigation";
import { TheatreItem, ALL_ITEMS } from "@/helpers/useTheatreStore";
import { BookCard } from "./BookCard";
import { InfoTile } from "./InfoTile";

// ─── Easing ────────────────────────────────────────────────────────────────────
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Slot { x: number; y: number }
interface BookState {
  item:    TheatreItem;
  left:    number;
  top:     number;
  opacity: number;
  infoTop: number;
  infoOp:  number;
  isGhost: boolean; // entering / exiting transient element
}

interface DiagonalBooksSectionProps {
  offset:      number;    // current first-visible index
  onSwipeLeft: () => void;
  onSwipePrev: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function DiagonalBooksSection({
  offset,
  onSwipeLeft,
  onSwipePrev,
}: DiagonalBooksSectionProps) {
  const router       = useRouter();
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
  const bookH = Math.floor(bookW * 1.5); // Using the 1.5 ratio from the current design

  // ── Slot positions ────────────────────────────────────────────────────────────
  // X: evenly spaced left→right
  // Y: ascending (bottom-left to top-right)
  const xPad  = containerW * 0.05;
  const xEnd  = containerW * 0.95 - bookW;
  const xStep = (xEnd - xPad) / (N - 1 || 1);
  const yStart = 320; // Matches current design
  const yEnd   = 40;
  const yStep  = (yEnd - yStart) / (N - 1 || 1);

  const slots: Slot[] = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1 || 1);
    return {
      x: xPad + i * xStep,
      y: yStart + i * yStep,
    };
  });

  const totalH = yStart + bookH + 200; // Total height of the container

  // Off-screen ghost slots for animation
  const ghostEnterFwd: Slot = { x: slots[N - 1].x + xStep, y: slots[N - 1].y + yStep };
  const ghostExitFwd:  Slot = { x: slots[0].x   - xStep, y: slots[0].y   - yStep };
  const ghostEnterBk:  Slot = { x: slots[0].x   - xStep, y: slots[0].y   - yStep };
  const ghostExitBk:   Slot = { x: slots[N - 1].x + xStep, y: slots[N - 1].y + yStep };

  // ── Animation state ────────
  const animRef     = useRef(false);
  const frameRef    = useRef<number | null>(null);
  const offsetRef   = useRef(offset);

  // Rendered book states
  const [books, setBooks] = useState<BookState[]>([]);

  useEffect(() => { offsetRef.current = offset; }, [offset]);

  // ── Build static state ───────────────────────────────────────────────────────
  const buildStatic = useCallback(
    (off: number): BookState[] =>
      Array.from({ length: N }, (_, i) => {
        const item = ALL_ITEMS[(off + i) % ALL_ITEMS.length];
        return {
          item,
          left:    slots[i].x,
          top:     slots[i].y,
          opacity: 1,
          infoTop: slots[i].y + bookH + 22,
          infoOp:  1,
          isGhost: false,
        };
      }),
    [N, bookW, bookH, containerW]
  );

  useEffect(() => {
    setBooks(buildStatic(offsetRef.current));
  }, [buildStatic]);

  // ── Core swipe ────────────────────────────────────────────────────────────────
  const swipe = useCallback(
    (dir: number, advance: () => void) => {
      if (animRef.current) return;
      animRef.current = true;

      const prevOff = offsetRef.current;
      advance(); 

      const enterIdx =
        dir > 0
          ? (prevOff + N) % ALL_ITEMS.length          
          : (prevOff - 1 + ALL_ITEMS.length) % ALL_ITEMS.length; 

      const enterGhost: Slot = dir > 0 ? ghostEnterFwd : ghostEnterBk;
      const exitGhost:  Slot = dir > 0 ? ghostExitFwd  : ghostExitBk;

      const enterItem = ALL_ITEMS[enterIdx];
      const prevItems = Array.from({ length: N }, (_, i) =>
        ALL_ITEMS[(prevOff + i) % ALL_ITEMS.length]
      );

      const START = Date.now();
      const DUR   = 450;

      const tick = () => {
        const raw = Math.min((Date.now() - START) / DUR, 1);
        const t   = easeInOutCubic(raw);

        if (dir > 0) {
          // Forward shift
          setBooks([
            ...Array.from({ length: N }, (_, i) => {
              const from = slots[i];
              const to   = i === 0 ? exitGhost : slots[i - 1];
              const opac = i === 0 ? clamp(1 - t * 1.8, 0, 1) : 1;
              const iOp  = i === 0 ? clamp(1 - t * 3.5, 0, 1) : 1;
              return {
                item:    prevItems[i],
                left:    lerp(from.x, to.x, t),
                top:     lerp(from.y, to.y, t),
                opacity: opac,
                infoTop: lerp(from.y + bookH + 22, to.y + bookH + 22, t),
                infoOp:  iOp,
                isGhost: false,
              } as BookState;
            }),
            {
              item:    enterItem,
              left:    lerp(enterGhost.x, slots[N - 1].x, t),
              top:     lerp(enterGhost.y, slots[N - 1].y, t),
              opacity: clamp((t - 0.25) / 0.75, 0, 1),
              infoTop: lerp(enterGhost.y + bookH + 22, slots[N - 1].y + bookH + 22, t),
              infoOp:  clamp((t - 0.7) / 0.3, 0, 1),
              isGhost: true,
            },
          ]);
        } else {
          // Backward shift
          setBooks([
            {
              item:    enterItem,
              left:    lerp(enterGhost.x, slots[0].x, t),
              top:     lerp(enterGhost.y, slots[0].y, t),
              opacity: clamp((t - 0.25) / 0.75, 0, 1),
              infoTop: lerp(enterGhost.y + bookH + 22, slots[0].y + bookH + 22, t),
              infoOp:  clamp((t - 0.7) / 0.3, 0, 1),
              isGhost: true,
            },
            ...Array.from({ length: N }, (_, i) => {
              const from = slots[i];
              const to   = i === N - 1 ? exitGhost : slots[i + 1];
              const opac = i === N - 1 ? clamp(1 - t * 1.8, 0, 1) : 1;
              const iOp  = i === N - 1 ? clamp(1 - t * 3.5, 0, 1) : 1;
              return {
                item:    prevItems[i],
                left:    lerp(from.x, to.x, t),
                top:     lerp(from.y, to.y, t),
                opacity: opac,
                infoTop: lerp(from.y + bookH + 22, to.y + bookH + 22, t),
                infoOp:  iOp,
                isGhost: false,
              } as BookState;
            }),
          ]);
        }

        if (raw < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          animRef.current = false;
          setBooks(buildStatic(offsetRef.current));
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    },
    [N, bookW, bookH, containerW, buildStatic]
  );

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  // ── Input: wheel ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30)       swipe(1,  onSwipeLeft);
      else if (e.deltaY < -30) swipe(-1, onSwipePrev);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [swipe, onSwipeLeft, onSwipePrev]);

  // ── Input: touch ──────────────────────────────────────────────────────────────
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -45)      swipe(1,  onSwipeLeft);
    else if (dx > 45)  swipe(-1, onSwipePrev);
  };

  // ── Input: keyboard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") swipe(1,  onSwipeLeft);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   swipe(-1, onSwipePrev);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [swipe, onSwipeLeft, onSwipePrev]);

  // ── SVG diagonal line endpoints ───────────────────────────────────────────────
  const lineY = (s: Slot) => s.y + bookH + 10;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: totalH, overflow: "visible" }}
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
            x1={slots[0].x + bookW / 2}       y1={lineY(slots[0])}
            x2={slots[N - 1].x + bookW / 2}   y2={lineY(slots[N - 1])}
            stroke="#F5A623" strokeWidth="1.4" opacity="0.42"
          />
        )}
        {slots.map((slot, i) => (
          <g key={i}>
            <circle cx={slot.x + bookW / 2} cy={lineY(slot)} r="8"  fill="#F5A623" opacity="0.18" />
            <circle cx={slot.x + bookW / 2} cy={lineY(slot)} r="4"  fill="#F5A623" opacity="0.9"  />
          </g>
        ))}
      </svg>

      {/* ── Animated book cards + info tiles ────────────────────────────────── */}
      {books.map((b, idx) => {
        const style: CSSProperties = {
          position: "absolute",
          left:     b.left,
          top:      b.top,
          opacity:  b.opacity,
          willChange: "transform, opacity",
          zIndex: b.isGhost ? 0 : 10 + idx,
        };
        return (
          <div key={`${b.item.id}-${idx}`}>
            {/* Book card */}
            <div style={style}>
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
                left:     b.left,
                top:      b.infoTop,
                width:    bookW,
                opacity:  b.infoOp,
                willChange: "opacity",
                zIndex: 5,
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
