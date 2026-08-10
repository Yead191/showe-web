"use client";

import Link from "next/link";
import { ArrowRight, Check, Home, Sparkles } from "lucide-react";
import { getSuccessCopy } from "./payment-copy";

export default function PaymentSuccess({ type }: { type?: string | null }) {
  const copy = getSuccessCopy(type);

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-16"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 0%, #0A2A30 0%, #05171A 55%, #030E10 100%)",
      }}
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-112 w-112 rounded-full bg-[#F5A800]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-104 w-104 rounded-full bg-[#014B52]/50 blur-[120px]" />

      {/* Rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
        <div className="absolute h-168 w-168 rounded-full border border-white/10" />
        <div className="absolute h-120 w-120 rounded-full border border-white/10" />
        <div className="absolute h-80 w-80 rounded-full border border-white/10" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-6 relative z-10 mx-auto flex max-w-xl flex-col items-center text-center duration-700">
        {/* Success emblem */}
        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 rounded-full bg-[#F5A800]/25 blur-2xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5A800] shadow-lg shadow-[#F5A800]/40">
              <Check size={32} strokeWidth={3} className="text-[#06181B]" />
            </div>
          </div>
          <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#014B52] text-[#F5A800] shadow-lg">
            <Sparkles size={16} />
          </span>
        </div>

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F5A800]/25 bg-[#F5A800]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A800]">
          {copy.eyebrow}
        </span>

        <h1 className="font-museo text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60 md:text-base">
          {copy.description}
        </p>

        {type && (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
            Type · {type}
          </p>
        )}

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={copy.primaryHref}
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F5A800] px-7 font-bold text-[#06181B] shadow-lg shadow-[#F5A800]/25 transition-all hover:bg-[#e09900] active:scale-95 sm:w-auto"
          >
            {copy.primaryLabel}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href={copy.secondaryHref}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 font-semibold text-white/80 transition-all hover:bg-white/[0.07] hover:text-white active:scale-95 sm:w-auto"
          >
            <Home size={18} />
            {copy.secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
