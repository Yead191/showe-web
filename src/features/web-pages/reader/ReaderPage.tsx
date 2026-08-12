"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Block, ProgrammeDoc, ProgrammePage } from "@/types/programme";
import { useReveal } from "./animation";
import { renderBlockPreview } from "./BlockPreviews";
import ProgrammeNotFound from "./ProgrammeNotFound";
import { useDwellTime } from "./useDwellTime";

const SWIPE_THRESHOLD_PX = 56;

export default function ReaderPage({ programme }: { programme: ProgrammeDoc }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const pages = programme?.pages ?? [];
  const totalPages = pages.length;

  // Track enter → leave dwell time for this programme (POST /ads/dwell-time).
  useDwellTime(totalPages > 0 ? programme?.id : null, "Programmes");
  // URL uses 1-based `page` (e.g. ?page=2). Invalid / missing → first page.
  const rawPage = Number(searchParams.get("page"));
  const pageIndex =
    totalPages > 0 && Number.isFinite(rawPage) && rawPage >= 1
      ? Math.min(Math.floor(rawPage) - 1, totalPages - 1)
      : 0;

  const goToPage = useCallback(
    (index: number) => {
      if (totalPages === 0) return;
      const next = Math.max(0, Math.min(index, totalPages - 1));
      if (next === pageIndex) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(next + 1));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pageIndex, pathname, router, searchParams, totalPages],
  );

  const goPrev = useCallback(() => goToPage(pageIndex - 1), [goToPage, pageIndex]);
  const goNext = useCallback(() => goToPage(pageIndex + 1), [goToPage, pageIndex]);

  // Keyboard ← → page navigation
  useEffect(() => {
    if (totalPages <= 1) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, totalPages]);

  // Touch swipe: left → next, right → previous (won't fight vertical scroll)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    if (!t) return;
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start || totalPages <= 1) return;

      const t = e.changedTouches[0];
      if (!t) return;

      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;

      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev, totalPages],
  );

  if (!programme || totalPages === 0) {
    return <ProgrammeNotFound />;
  }

  const page = pages[pageIndex] ?? pages[0]!;

  return (
    <div className="programme-reader min-h-dvh bg-surface-raised md:bg-ink/95 text-ink-inverse relative hide-scrollbar!">
      {/* Brand strip — desktop/tablet only; mobile is edge-to-edge */}
      <div className="hidden md:flex px-5 py-2 border-b border-white/8 items-center justify-between fixed top-0 w-full backdrop-blur-2xl z-50">
        <div className="inline-flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="object-contain w-full h-12" />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="font-display font-extrabold text-xl md:text-2xl mt-1.5 text-ink-inverse text-center">
            {programme.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to programmes
          </div>
        </div>
      </div>

      {/* Full-bleed on mobile; phone frame on md+ */}
      <div className="md:px-4 md:pt-18 2xl:pt-20 2xl:pb-16">
        <div className="mx-auto md:max-w-90">
          <div className="md:p-2.5 md:bg-ink md:rounded-[40px] md:shadow-2xl">
            <div className="bg-surface-raised text-ink overflow-hidden md:rounded-[32px] md:overflow-hidden">
              {/* Notch (desktop only) */}
              <div className="hidden md:block relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink rounded-full z-10" />
              </div>

              {/* Page content — full viewport on mobile; swipe left/right to change page */}
              <div
                className="h-dvh md:h-[calc(100dvh-137px)] 2xl:h-[calc(100vh-180px)] overflow-auto no-scrollbar! touch-pan-y"
                key={page.id}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {page.blocks.length === 0 ? (
                  <div className="px-6 py-20 text-center text-ink-muted">
                    <BookOpen
                      size={28}
                      className="mx-auto mb-3 text-ink-faint"
                    />
                    <p>This page is empty.</p>
                  </div>
                ) : (
                  <div>
                    {page?.blocks?.map((b) => (
                      <ReaderBlock
                        key={b.id}
                        block={b}
                        programme={programme}
                        page={page}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page indicator dots */}
          {totalPages > 1 && (
            <div className="hidden 2xl:flex items-center justify-center gap-2 mt-2">
              {programme.pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goToPage(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === pageIndex
                      ? "w-6 bg-accent"
                      : "w-1.5 bg-white/30 hover:bg-white/50",
                  )}
                  aria-label={`Go to ${p.title}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating page nav */}
      {totalPages > 1 && (
        <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 p-1 2xl:p-1.5 rounded-full bg-ink-inverse text-ink shadow-2xl border border-white/10">
          <button
            onClick={goPrev}
            disabled={pageIndex === 0}
            className="w-6 h-6 2xl:w-9 2xl:h-9 rounded-full hover:bg-surface-sunken disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="px-3 text-[12px] font-semibold tabular text-ink whitespace-nowrap">
            {pageIndex + 1} / {totalPages}
          </div>
          <button
            onClick={goNext}
            disabled={pageIndex === totalPages - 1}
            className="w-6 h-6 2xl:w-9 2xl:h-9 rounded-full hover:bg-surface-sunken disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </div>
  );
}

function ReaderBlock({
  block,
  programme,
  page,
}: {
  block: Block;
  programme: ProgrammeDoc;
  page: ProgrammePage;
}) {
  const reveal = useReveal(block.animation);

  const resolvedBg =
    block.layout.background === "custom"
      ? block.layout.background_custom || "transparent"
      : block.layout.background === "sunken"
        ? "#F2EFE9"
        : block.layout.background === "surface"
          ? "#FBFAF7"
          : block.layout.background === "primary"
            ? "#014B52"
            : block.layout.background === "accent"
              ? "#F5A800"
              : block.layout.background === "dark"
                ? "#000000"
                : "transparent";

  const style = {
    paddingTop: block.layout.padding_top,
    paddingBottom: block.layout.padding_bottom,
    paddingLeft: block.layout.padding_x,
    paddingRight: block.layout.padding_x,
    background: resolvedBg,
    ...(block.layout.text_color ? { "--btext": block.layout.text_color } : {}),
    ...(block.layout.text_color
      ? { "--bborder": block.layout.text_color }
      : {}),
    ...(block.layout.title_color
      ? { "--btitle": block.layout.title_color }
      : {}),
    ...(block.layout.eyebrow_color
      ? { "--beyebrow": block.layout.eyebrow_color }
      : {}),
    ...(block.layout.card_background
      ? { "--bcardbg": block.layout.card_background }
      : {}),
    ...(block.layout.card_text_color
      ? { "--bcardtext": block.layout.card_text_color }
      : {}),
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        block.layout.text_color && "block-textcolor",
        block.layout.title_color && "block-titlecolor",
        block.layout.eyebrow_color && "block-eyebrowcolor",
        block.layout.card_background && "block-cardbg",
        block.layout.card_text_color && "block-cardtext",
      )}
    >
      <div ref={reveal.ref} style={reveal.style}>
        {renderBlockPreview(block, { programme, page })}
      </div>
    </div>
  );
}
