"use client";

import { useTheatreStore } from "@/helpers/useTheatreStore";
/**
 * MyProgrammesPage — Next.js equivalent of Flutter's MyProgramScreen
 *
 * Drop this file into:  app/programmes/page.tsx
 *
 * Components used:
 *   Starfield              → AnimatedSwitcher background (star texture)
 *   CategoryTabs           → CategoryTabsWidget
 *   DiagonalBooksSection   → DiagonalBooksSection
 *   useTheatreStore        → TheatreController (GetX)
 */

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Starfield } from "./components/Starfield";
import { CategoryTabs } from "./components/CategoryTabs";
import { DiagonalBooksSection } from "./components/DiagonalBooksSection";
import { useEffect, useState } from "react";


export default function MyProgrammesPage() {
    const router = useRouter();
    const {
        categories,
        selectedCategoryIndex,
        currentBackground,
        getVisibleItems,
        selectCategory,
        onSwipeLeft,
        onSwipePrev,
    } = useTheatreStore();

    // Determine how many items to show based on screen width
    // This is a rough estimate, DiagonalBooksSection will also have its own width
    const [itemCount, setItemCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 900) setItemCount(5);
            else if (width > 600) setItemCount(4);
            else setItemCount(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items = getVisibleItems(itemCount);

    return (
        <main
            id="banner"
            className="relative w-full h-screen overflow-hidden select-none"
            style={{ background: "#082A33" }}
        >
            {/* ── Animated background image (matches AnimatedSwitcher in Flutter) ─── */}
            <div className="absolute inset-0">
                <Image
                    key={currentBackground}
                    src={currentBackground}
                    alt="Background"
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
                />
                {/* Dark overlay so content stays readable */}
                <div className="absolute inset-0 bg-black/60" />
            </div>



            {/* ── Page content ─────────────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col h-screen overflow-hidden">
                <div className="flex flex-col  absolute top-20 z-20" >
                    {/* Title */}
                    <div className="px-4 mb-3 ">
                        <h1 className="text-white font-bold text-[22px]">My Programmes</h1>
                    </div>

                    {/* Category tabs */}
                    <div className="mb-5">
                        <CategoryTabs
                            categories={categories}
                            selectedIndex={selectedCategoryIndex}
                            onSelect={selectCategory}
                        />
                    </div>
                </div>

                {/* Diagonal scrollable section */}
                <div className="flex-1 overflow-hidden">
                    <DiagonalBooksSection
                        items={items}
                        onSwipeLeft={onSwipeLeft}
                        onSwipePrev={onSwipePrev}
                    />
                </div>

                {/* Scroll hint */}
                <p
                    className="text-center pb-4 text-xs"
                    style={{ color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}
                >
                    scroll · swipe · or use ← → keys
                </p>
            </div>
        </main>
    );
}
