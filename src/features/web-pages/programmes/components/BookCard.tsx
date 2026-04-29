"use client";

import Image from "next/image";
import { TheatreItem } from "@/helpers/useTheatreStore";

interface BookCardProps {
  item: TheatreItem;
  width: number;
  height: number;
  onTap: () => void;
}

export function BookCard({ item, width, height, onTap }: BookCardProps) {
  const titleSize = Math.max(width * 0.1, 12);
  const authorSize = Math.max(width * 0.046, 8);

  // Split title into parts if it's long
  const titleParts = item.title.split(" ");

  return (
    <div
      onClick={onTap}
      className="relative overflow-hidden cursor-pointer select-none active:scale-[0.97] transition-transform"
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

      {/* Pink bloom overlay */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 72% 22%,rgba(255,120,180,0.38) 0%,transparent 100%)",
        }}
      /> */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 30% 20% at 30% 70%,rgba(140,80,220,0.25) 0%,transparent 100%)",
        }}
      /> */}

      {/* Castle silhouette */}
      {/* <div className="absolute bottom-0 left-0 right-0" style={{ height: "52%" }}>
        <svg
          viewBox="0 0 120 90"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d="M0 90 L0 55 L8 55 L8 44 L14 44 L14 55 L22 55 L22 36 L28 28 L34 36 L34 55
               L42 55 L42 38 L50 28 L58 38 L58 55 L62 55 L62 38 L70 28 L78 38 L78 55
               L86 55 L86 36 L92 28 L98 36 L98 55 L106 55 L106 44 L112 44 L112 55 L120 55
               L120 90 Z"
            fill="rgba(6,4,22,0.88)"
          />
          <ellipse cx="60" cy="50" rx="4.5" ry="5.5" fill="rgba(245,166,35,0.65)" />
        </svg>
      </div> */}

      {/* Top ornament */}
      {/* <div className="absolute top-0 left-0 right-0 flex justify-center pt-1.5">
        <svg width="32" height="16" viewBox="0 0 32 16">
          <path
            d="M16 2 Q20 8 16 13 Q12 8 16 2"
            fill="none"
            stroke="rgba(100,210,230,0.5)"
            strokeWidth="0.8"
          />
          <circle cx="16" cy="2" r="1.2" fill="rgba(100,210,230,0.5)" />
          <circle cx="9" cy="8" r="0.9" fill="rgba(100,210,230,0.35)" />
          <circle cx="23" cy="8" r="0.9" fill="rgba(100,210,230,0.35)" />
        </svg>
      </div> */}

      {/* Quote */}
      {/* <div className="absolute top-5 left-0 right-0 text-center px-2">
        <p
          className="italic"
          style={{ color: "rgba(200,230,255,0.65)", fontSize: 6, letterSpacing: 0.2 }}
        >
          {item.quote}
        </p>
      </div> */}

      {/* Title + Author */}
      {/* <div
        className="absolute inset-0 flex flex-col items-center justify-center p-2"
        style={{ marginTop: height * 0.04 }}
      >
        <h3
          className="text-white font-black text-center leading-[1.1]"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: titleSize,
            textShadow: "0 0 18px rgba(160,100,255,0.55)",
          }}
        >
          {titleParts.map((part, i) => (
            <span key={i}>
              {part.toUpperCase()}
              {i < titleParts.length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p
          className="mt-1 font-bold tracking-[1px] text-center"
          style={{ color: "rgba(200,220,255,0.8)", fontSize: authorSize }}
        >
          {item.author.toUpperCase()}
        </p>
      </div> */}
    </div>
  );
}
