"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface TheatreItem {
  id: number;
  title: string;
  author: string;
  quote: string;
  description: string;
  imageUrl?: string; // optional: replace with your actual image paths
}

// Shape of a programme returned by the API
export interface ProgrammeItem {
  _id: string;
  title: string;
  cover_image: string;
}

export interface Category {
  name: string;
  backgroundImage: string; // path to your background asset
}

// ─── Replace these with your actual data & image paths ───────────────────────
export const CATEGORIES: Category[] = [
  { name: "Theatre", backgroundImage: "/assets/bg/programmes/theatre.png" },
  { name: "Sports", backgroundImage: "/assets/bg/programmes/sports.png" },
  { name: "Music", backgroundImage: "/assets/bg/programmes/music.png" },
  { name: "Events", backgroundImage: "/assets/bg/programmes/events.png" },
  { name: "Museum", backgroundImage: "/assets/bg/programmes/museum.png" },
  { name: "Community", backgroundImage: "/assets/bg/programmes/community.png" },
  { name: "Ceremonies", backgroundImage: "/assets/bg/programmes/ceremonies.png" },
];

export const ALL_ITEMS: TheatreItem[] = [
  { id: 0, title: "Until We Shatter", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "Leadership & Development (L&D) is a strategic, ongoing process aimed at enhancing an individual's ability.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 1, title: "Until We Shatter 2", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "A powerful story of resilience and determination that will leave you breathless.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 2, title: "Until We Shatter 3", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "An epic journey through worlds unknown, charting new territories of the imagination.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 3, title: "Until We Shatter 4", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "A gripping tale of adventure, love, and survival against impossible odds.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 4, title: "Until We Shatter 5", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "The most anticipated continuation of the series fans have been waiting for.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 5, title: "Until We Shatter 6", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "A heartfelt narrative of sacrifice and courage in the face of overwhelming darkness.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 6, title: "Until We Shatter 7", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "An unforgettable experience that redefines what fantasy storytelling can achieve.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 7, title: "Until We Shatter 8", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "Brilliant storytelling with characters that live beyond the final page.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 8, title: "Until We Shatter 9", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "A tour de force of imagination that cements Kate Dylan's place as a master storyteller.", imageUrl: "/assets/images/books/book1.jpg" },
  { id: 9, title: "Until We Shatter 10", author: "Kate Dylan", quote: "'Vivid and dangerous' SAMANTHA SHANNON", description: "The final chapter of an era — epic, emotional, and utterly unforgettable.", imageUrl: "/assets/images/books/book1.jpg" },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useTheatreStore() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Selected category is driven by the `category` query param.
  const categoryParam = searchParams.get("category");
  const foundIndex = CATEGORIES.findIndex(
    (c) => c.name.toLowerCase() === (categoryParam ?? "").toLowerCase()
  );
  const selectedCategoryIndex = foundIndex >= 0 ? foundIndex : 0;

  // Default to the first category so it's selected (and sent to the API) on load.
  useEffect(() => {
    if (foundIndex < 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", CATEGORIES[0].name.toUpperCase());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [foundIndex, pathname, router, searchParams]);

  // Continuous counter; the carousel wraps it around the visible items.
  const [offset, setOffset] = useState(0);

  const selectCategory = useCallback(
    (i: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", CATEGORIES[i].name.toUpperCase());
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const onSwipeLeft = useCallback(() => setOffset((p) => p + 1), []);
  const onSwipePrev = useCallback(() => setOffset((p) => p - 1), []);

  return {
    categories: CATEGORIES,
    selectedCategoryIndex,
    currentBackground: CATEGORIES[selectedCategoryIndex].backgroundImage,
    offset,
    selectCategory,
    onSwipeLeft,
    onSwipePrev,
  };
}
