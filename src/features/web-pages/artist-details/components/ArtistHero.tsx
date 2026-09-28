"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/getImageUrl";
import { toggleArtistFavorite } from "@/helpers/next-fetch/favoriteActions";
import type { Artist } from "../index";
import { toast } from "sonner";
import { revalidateTags } from "@/helpers/next-fetch/revalidateTags";

export function ArtistHero({ artist }: { artist: Artist }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimisticFavorited, setOptimisticFavorited] = useState<boolean>(
    Boolean(artist.isFavorited),
  );

  // Keep state synced with backend prop updates
  useEffect(() => {
    setOptimisticFavorited(Boolean(artist.isFavorited));
  }, [artist.isFavorited]);

  const genres = artist.genres ?? [];

  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      navigator
        .share({
          title: artist.name,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleToggleFavorite = async () => {
    if (!artist._id || isSubmitting) return;

    const previousState = optimisticFavorited;
    const nextState = !previousState;
    setOptimisticFavorited(nextState);
    setIsSubmitting(true);

    try {
      const res = await toggleArtistFavorite(artist._id);
      if (res?.success) {
        // toast.success(
        //   res.message ||
        //     (nextState ? "Added to favourites" : "Removed from favourites"),
        // );
        revalidateTags(["artist-details", "user-favourites"]);
      } else {
        // Rollback state if server returns failure
        setOptimisticFavorited(previousState);
        toast.error(
          (typeof res?.error === "string" ? res.error : res?.message) ||
            "Failed to update favourites",
        );
      }
    } catch {
      setOptimisticFavorited(previousState);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const coverImage = artist.cover_image
    ? getImageUrl(artist.cover_image)
    : artist.image
      ? getImageUrl(artist.image)
      : "/assets/images/events/event2.jpg";

  const profileImage = artist.image
    ? getImageUrl(artist.image)
    : artist.cover_image
      ? getImageUrl(artist.cover_image)
      : "/assets/images/artists/dp.webp";

  return (
    <section id="banner" className="relative w-full">
      {/* Cover Image */}
      <div className="relative h-h-62.5 md:h-80 lg:h-100 2xl:h-125 w-full overflow-hidden bg-slate-900">
        <Image
          src={coverImage}
          alt={artist.name}
          fill
          className="w-full h-full object-cover object-[50%_15%] opacity-90"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-black/20" />
      </div>

      {/* Profile Info Overlay */}
      <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10 pb-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10 flex-1">
            {/* Profile Picture */}
            <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-3xl overflow-hidden border-8 border-white bg-white shadow-2xl shrink-0">
              <Image
                src={profileImage}
                alt={artist.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-5 pb-2">
              <div className="flex flex-wrap items-center gap-2.5">
                {artist.category && (
                  <span className="bg-accent-400 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md">
                    {artist.category}
                  </span>
                )}
                {artist.type && (
                  <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-md">
                    {artist.type}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                  {artist.name}
                </h1>
                {genres.length > 0 && (
                  <p className="text-gray-500 font-medium text-base md:text-lg italic opacity-85">
                    {genres.join(" • ")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={isSubmitting}
              aria-pressed={optimisticFavorited}
              className={`inline-flex h-12 items-center justify-center gap-2 px-6 rounded-2xl border font-bold text-xs transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95 flex-1 md:flex-initial ${
                optimisticFavorited
                  ? "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600 shadow-lg shadow-red-500/25"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
              }`}
            >
              <Heart
                className={`h-5 w-5 transition-transform duration-300 ${
                  optimisticFavorited
                    ? "fill-white text-white scale-110"
                    : "text-gray-600 group-hover:scale-110"
                }`}
              />
              <span>{optimisticFavorited ? "Favorited" : "Favorite"}</span>
            </button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="h-12 px-5 rounded-2xl border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm active:scale-95 transition-all"
              title="Share"
            >
              <Share2 className="h-5 w-5" /> Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
