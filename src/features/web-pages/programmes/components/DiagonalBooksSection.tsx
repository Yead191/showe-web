"use client";

/**
 * DiagonalBooksSection
 *
 * Direct Next.js port of Flutter's DiagonalBooksSection widget.
 *
 * Flutter → React mapping:
 *   AnimationController (450ms, easeInOutCubic) → requestAnimationFrame loop
 *   Stack + Positioned (absolute)               → position: absolute
 *   GestureDetector (horizontal drag)           → wheel + touch events
 *   Obx (reactive state)                        → useState
 *   Slots [0.02, 0.35, 0.67] × width            → same slot percentages
 *   enterFrom / exitTo vectors                  → same math, px-based
 */

import {
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { TheatreItem } from "@/helpers/useTheatreStore";
import { BookCard } from "./BookCard";
import { InfoTile } from "./InfoTile";


// ── Easing ────────────────────────────────────────────────────────────────────
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface DiagonalBooksSectionProps {
  items: TheatreItem[];
  onSwipeLeft: () => void;   // → next book
  onSwipePrev: () => void;   // → prev book
}

// ── Component ─────────────────────────────────────────────────────────────────
export function DiagonalBooksSection({
  items,
  onSwipeLeft,
  onSwipePrev,
}: DiagonalBooksSectionProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track width reactively for SSR safety
  const [containerW, setContainerW] = useState(960);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Dimensions (Adjusted for more items) ──────────────────────────────────────
  // Make book smaller: from 0.30 down to ~0.15-0.20 depending on count
  const bookW = containerW * (items.length > 4 ? 0.16 : 0.25);
  const bookH = bookW * 1.5; // Reduced aspect ratio slightly for better fit
  const totalH = bookH + 400; // Increased padding for info tiles

  // Dynamic slots based on items.length
  const slots: any[] = items.map((_, i) => {
    const startX = containerW * 0.05;
    const endX = containerW * 0.95 - bookW;
    const startY = 320;
    const endY = 40;

    const t = i / (items.length - 1 || 1);
    return {
      x: startX + (endX - startX) * t,
      y: startY + (endY - startY) * t,
    };
  });

  // Info tile offsets
  const infoY = (slotY: number) => slotY + bookH + 22;

  // ── Animation state ──────────────────────────────────────────────────────────
  const isAnimatingRef = useRef(false);
  const directionRef = useRef(1);
  const animTRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Snapshot of items AT THE MOMENT the animation started
  const prevItemsRef = useRef<TheatreItem[]>(items);
  const nextItemsRef = useRef<TheatreItem[]>(items);

  // Current render trigger
  const [tick, setTick] = useState(0);
  const forceUpdate = useCallback(() => setTick(t => t + 1), []);

  // ── Enter / exit vectors ───────────────────────────────────────────────────
  const enterFrom = useCallback((dir: number): any => ({
    x: dir >= 0 ? containerW * 1.2 : -bookW * 1.5,
    y: dir >= 0 ? -bookH * 0.5 : bookH * 1.5,
  }), [containerW, bookW, bookH]);

  const exitTo = useCallback((dir: number): any => ({
    x: dir >= 0 ? -bookW * 1.5 : containerW * 1.2,
    y: dir >= 0 ? bookH * 1.5 : -bookH * 0.5,
  }), [containerW, bookW, bookH]);

  // ── Interpolate helpers ───────────────────────────────────────────────────────
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // ── Swipe trigger ─────────────────────────────────────────────────────────────
  const swipe = useCallback(
    (dir: number, onMidpoint: () => void) => {
      if (isAnimatingRef.current) return;

      // 1. Snapshot current items
      prevItemsRef.current = [...items];

      // 2. Advance the store
      directionRef.current = dir;
      isAnimatingRef.current = true;
      onMidpoint();

      // 3. Snapshot the *new* items
      requestAnimationFrame(() => {
        nextItemsRef.current = [...items];

        const startTime = Date.now();
        const duration = 500;

        const animate = () => {
          const raw = Math.min((Date.now() - startTime) / duration, 1);
          animTRef.current = easeInOutCubic(raw);
          forceUpdate();

          if (raw < 1) {
            rafRef.current = requestAnimationFrame(animate);
          } else {
            animTRef.current = 0;
            isAnimatingRef.current = false;
            forceUpdate();
          }
        };

        rafRef.current = requestAnimationFrame(animate);
      });
    },
    [items, forceUpdate]
  );

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // ── Input handling ────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 20) {
        swipe(e.deltaY > 0 ? 1 : -1, e.deltaY > 0 ? onSwipeLeft : onSwipePrev);
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [swipe, onSwipeLeft, onSwipePrev]);

  // Touch
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) swipe(1, onSwipeLeft);
    else if (dx > 50) swipe(-1, onSwipePrev);
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") swipe(1, onSwipeLeft);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") swipe(-1, onSwipePrev);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [swipe, onSwipeLeft, onSwipePrev]);

  // ── Computed positions ────────────────────────────────────────────────────────
  const t = animTRef.current;
  const anim = isAnimatingRef.current;
  const dir = directionRef.current;
  const ef = enterFrom(dir);
  const et = exitTo(dir);

  const currItems = prevItemsRef.current;
  const nextItems = nextItemsRef.current;

  // Current items positions
  const currPositions = slots.map((slot) => ({
    left: anim ? lerp(slot.x, et.x, t) : slot.x,
    top: anim ? lerp(slot.y, et.y, t) : slot.y,
    opacity: anim ? Math.max(0, 1 - t) : 1,
  }));

  // Next items positions
  const nextPositions = slots.map((slot) => ({
    left: lerp(ef.x, slot.x, t),
    top: lerp(ef.y, slot.y, t),
    opacity: t,
  }));

  // Info tiles positions
  const infoPositions = slots.map((slot) => ({
    left: anim ? slot.x + (et.x - slot.x) * t * 0.3 : slot.x,
    top: anim ? infoY(slot.y) + (et.y - slot.y) * t * 0.3 : infoY(slot.y),
    opacity: anim ? Math.max(0, 1 - t * 2) : 1,
    scale: anim ? 1 - t * 0.1 : 1,
  }));

  // Golden diagonal line endpoints
  const lineX1 = slots[0]?.x + bookW / 2 || 0;
  const lineY1 = (slots[0]?.y || 0) + bookH + 10;
  const lineX2 = slots[slots.length - 1]?.x + bookW / 2 || 0;
  const lineY2 = (slots[slots.length - 1]?.y || 0) + bookH + 10;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden hide-scrollbar"
      style={{ height: totalH }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />

      {/* ── Golden diagonal line + dots ─────────────────────────────────────── */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ width: "100%", height: totalH }}
      >
        <line
          x1={lineX1} y1={lineY1}
          x2={lineX2} y2={lineY2}
          stroke="#F5A623"
          strokeWidth="1.5"
          opacity="0.3"
        />
        {slots.map((slot, i) => (
          <g key={i}>
            <circle
              cx={slot.x + bookW / 2}
              cy={slot.y + bookH + 10}
              r="7"
              fill="#F5A623"
              opacity="0.15"
            />
            <circle
              cx={slot.x + bookW / 2}
              cy={slot.y + bookH + 10}
              r="4"
              fill="#F5A623"
              opacity="0.7"
            />
          </g>
        ))}
      </svg>

      {/* ── Current books (exiting) ──────────────────────────────────────────── */}
      {currItems.map((item, i) => (
        <div
          key={`curr-${item.id}-${i}`}
          className="absolute will-change-transform"
          style={{
            left: currPositions[i]?.left || 0,
            top: currPositions[i]?.top || 0,
            opacity: currPositions[i]?.opacity || 0,
            zIndex: 10 + i,
          }}
        >
          <BookCard
            item={item}
            width={bookW}
            height={bookH}
            onTap={() => router.push(`/programmes/${item.id}`)}
          />
        </div>
      ))}

      {/* ── Next books (entering) ────────────────────────────────────────────── */}
      {anim &&
        nextItems.map((item, i) => (
          <div
            key={`next-${item.id}-${i}`}
            className="absolute will-change-transform"
            style={{
              left: nextPositions[i]?.left || 0,
              top: nextPositions[i]?.top || 0,
              opacity: nextPositions[i]?.opacity || 0,
              zIndex: 10 + i,
            }}
          >
            <BookCard
              item={item}
              width={bookW}
              height={bookH}
              onTap={() => router.push("/programme-details")}
            />
          </div>
        ))}

      {/* ── Info tiles ──────────────────────────────────────────────────────── */}
      {currItems.map((item, i) => (
        <div
          key={`info-${item.id}-${i}`}
          className="absolute transition-opacity duration-200"
          style={{
            left: infoPositions[i]?.left || 0,
            top: infoPositions[i]?.top || 0,
            opacity: infoPositions[i]?.opacity || 0,
            width: bookW,
            transform: `scale(${infoPositions[i]?.scale || 1})`,
          }}
        >
          <InfoTile item={item} width={bookW} />
        </div>
      ))}
    </div>
  );
}
