"use client";

import { useTheatreStore } from "@/helpers/useTheatreStore";

import Image from "next/image";
import { CategoryTabs } from "./components/CategoryTabs";
import { DiagonalBooksSection } from "./components/DiagonalBooksSection";


export default function MyProgrammesPage() {
    const {
        categories,
        selectedCategoryIndex,
        currentBackground,
        offset,
        selectCategory,
        onSwipeLeft,
        onSwipePrev,
    } = useTheatreStore();

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
                <div className="absolute inset-0 bg-black/70" />
            </div>



            {/* ── Page content ─────────────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col h-screen overflow-hidden">
                <div className="container relative">
                    <div className="flex flex-col absolute top-20 left-0 right-0 lg:left-3 lg:right-auto z-20" >
                        {/* Title */}
                        <div className="px-4 mb-3 hidden md:block">
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
                </div>

                {/* Diagonal scrollable section */}
                <div className="flex-1 overflow-hidden pt-20 2xl:pt-24">
                    <DiagonalBooksSection
                        offset={offset}
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
