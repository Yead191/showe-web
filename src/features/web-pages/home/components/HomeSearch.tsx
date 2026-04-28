"use client"

import React from "react"
import { SearchBox } from "@/components/shared/search/SearchBox"
import { CategoryBar } from "@/components/shared/search/CategoryBar"

export default function HomeSearch() {
    return (
        <section className="relative -mt-12 md:-mt-14 z-10 container mx-auto px-4 pb-20">
            <SearchBox />
            <div className="mt-16">
                <CategoryBar />
                <div className="mt-12 border-b border-gray-100 max-w-5xl mx-auto" />
            </div>
        </section>
    )
}
