"use client";

import { useState, useCallback } from "react";

export interface TheatreItem {
  id: number;
  title: string;
  author: string;
  quote: string;
  description: string;
  imageUrl?: string; // optional: replace with your actual image paths
}

export interface Category {
  name: string;
  backgroundImage: string; // path to your background asset
}

// ─── Replace these with your actual data & image paths ───────────────────────
export const CATEGORIES: Category[] = [
  { name: "Theatre", backgroundImage: "/assets/bg/programmes/programmes-bg.jpg" },
  { name: "Sports", backgroundImage: "/assets/bg/programmes/sports-bg.jpg" },
  { name: "Music", backgroundImage: "/assets/bg/programmes/music-bg.jpg" },
  { name: "Events", backgroundImage: "/assets/bg/programmes/events-bg.jpg" },
  { name: "Community", backgroundImage: "/assets/bg/programmes/community-bg.jpg" },
  { name: "Ceremonies", backgroundImage: "/assets/bg/programmes/ceremony-bg.avif" },
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
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);

  const currentBackground = CATEGORIES[selectedCategoryIndex].backgroundImage;

  const getVisibleItems = (count: number) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(ALL_ITEMS[(currentOffset + i) % ALL_ITEMS.length]);
    }
    return items;
  };

  const selectCategory = useCallback((index: number) => {
    setSelectedCategoryIndex(index);
  }, []);

  const onSwipeLeft = useCallback(() => {
    setCurrentOffset(prev => (prev + 1) % ALL_ITEMS.length);
  }, []);

  const onSwipePrev = useCallback(() => {
    setCurrentOffset(prev => (prev - 1 + ALL_ITEMS.length) % ALL_ITEMS.length);
  }, []);

  return {
    categories: CATEGORIES,
    selectedCategoryIndex,
    currentBackground,
    getVisibleItems,
    selectCategory,
    onSwipeLeft,
    onSwipePrev,
  };
}
