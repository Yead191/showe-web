"use client";

import { Category } from "@/helpers/useTheatreStore";

interface CategoryTabsProps {
  categories: Category[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function CategoryTabs({
  categories,
  selectedIndex,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 px-4 overflow-x-auto pb-1 w-full no-scrollbar">
      {categories.map((cat, i) => {
        const isSelected = i === selectedIndex;
        return (
          <button
            key={cat.name}
            onClick={() => onSelect(i)}
            className="whitespace-nowrap rounded-full text-[13px] font-semibold
                       transition-all duration-200 active:scale-95"
            style={{
              padding: "6px 18px",
              background: isSelected ? "#F5A623" : "transparent",
              border: `1.2px solid ${isSelected ? "#F5A623" : "rgba(255,255,255,0.3)"}`,
              color: "white",
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
