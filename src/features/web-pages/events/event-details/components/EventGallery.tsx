"use client"

import * as React from "react"
import Image from "next/image"
import { ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/lib/getImageUrl"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function EventGallery({ images }: { images?: string[] }) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

    if (!images || images.length === 0) return null

    const open = activeIndex !== null
    const showPrev = () =>
        setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    const showNext = () =>
        setActiveIndex((i) => (i === null ? i : (i + 1) % images.length))

    return (
        <section className="space-y-8 py-12 border-t border-gray-100">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                    <ImageIcon className="h-8 w-8 text-[#F5A800]" />
                    Gallery
                </h2>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {images.length} Photo{images.length > 1 ? "s" : ""}
                </span>
            </div>

            {/* ── Mosaic Grid ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[210px]">
                {images.map((img, idx) => (
                    <button
                        key={img + idx}
                        onClick={() => setActiveIndex(idx)}
                        className={cn(
                            "relative overflow-hidden rounded-3xl group shadow-sm border border-gray-100 cursor-pointer",
                            idx === 0 && "col-span-2 row-span-2"
                        )}
                    >
                        <Image
                            src={getImageUrl(img)}
                            alt={`Gallery image ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </div>

            {/* ── Lightbox ── */}
            <Dialog open={open} onOpenChange={(v) => !v && setActiveIndex(null)}>
                <DialogContent
                    showCloseButton={false}
                    className="max-w-[calc(100%-2rem)] sm:max-w-4xl bg-black/95 ring-0 border-0 p-0 overflow-hidden"
                >
                    <DialogTitle className="sr-only">Event gallery image viewer</DialogTitle>
                    {activeIndex !== null && (
                        <div className="relative w-full aspect-video">
                            <Image
                                src={getImageUrl(images[activeIndex])}
                                alt={`Gallery image ${activeIndex + 1}`}
                                fill
                                className="object-contain"
                            />

                            <button
                                onClick={() => setActiveIndex(null)}
                                className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={showPrev}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={showNext}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-md text-white text-xs font-black tracking-widest px-4 py-1.5 rounded-full">
                                        {activeIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
