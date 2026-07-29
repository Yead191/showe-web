'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Compass, Library, Lock } from 'lucide-react';

export type ProgrammeErrorVariant = 'not-found' | 'unauthorized';

/**
 * Premium error screen for the reader.
 * Uses the dark reader theme (teal #014B52 primary, gold #F5A800 accent).
 *
 * - `not-found`: the programme doesn't exist / was removed.
 * - `unauthorized`: the programme is locked because the user hasn't purchased it.
 */
export default function ProgrammeNotFound({
  variant = 'not-found',
}: {
  variant?: ProgrammeErrorVariant;
}) {
  const router = useRouter();
  const isLocked = variant === 'unauthorized';

  const eyebrow = isLocked ? 'Locked Programme' : 'Programme Reader';
  const title = isLocked ? 'This programme is locked' : 'This programme isn\u2019t here';
  const description = isLocked
    ? 'You don\u2019t have access to this programme yet. Purchase it to unlock the full interactive experience—rich media, artist profiles and behind-the-scenes content.'
    : 'The programme you\u2019re looking for may have been removed, unpublished, or the link is incorrect. Explore our library to find your next experience.';

  return (
    <div
      className="programme-reader relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-6"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 0%, #0A2A30 0%, #05171A 55%, #030E10 100%)',
      }}
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-40 -right-32 h-112 w-md rounded-full bg-accent-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-104 w-104 rounded-full bg-primary-600/40 blur-[120px]" />

      {/* Faint concentric rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.12]">
        <div className="absolute h-168 w-2xl rounded-full border border-white/10" />
        <div className="absolute h-120 w-120 rounded-full border border-white/10" />
        <div className="absolute h-80 w-80 rounded-full border border-white/10" />
      </div>

      {/* Content */}
      <div className="animate-in fade-in slide-in-from-bottom-6 relative z-10 mx-auto flex max-w-xl flex-col items-center text-center duration-700">
        {/* Emblem */}
        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-accent-400/20 blur-2xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/4 ring-1 ring-white/10 backdrop-blur-sm">
            {isLocked ? (
              <Lock size={42} strokeWidth={1.75} className="text-accent-400" />
            ) : (
              <BookOpen size={44} strokeWidth={1.75} className="text-accent-400" />
            )}
            <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full `bg-accent-400 text-sm font-black text-[#06181B] shadow-lg shadow-accent-400/30">
              {isLocked ? <Lock size={15} strokeWidth={2.5} /> : '?'}
            </span>
          </div>
        </div>

        {/* Eyebrow */}
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-400">
          {eyebrow}
        </span>

        <h1 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/programmes"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-400 px-7 font-bold text-[#06181B] shadow-lg shadow-accent-400/25 transition-all hover:bg-[#e09900] active:scale-95 sm:w-auto"
          >
            <Library size={18} className="transition-transform group-hover:-translate-y-0.5" />
            {isLocked ? 'Get this programme' : 'Browse programmes'}
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/3 px-7 font-semibold text-white/80 transition-all hover:bg-white/[0.07] hover:text-white active:scale-95 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>

        {/* Secondary link */}
        <Link
          href="/home"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors hover:text-white/70"
        >
          <Compass size={14} />
          Or explore events
        </Link>
      </div>
    </div>
  );
}
