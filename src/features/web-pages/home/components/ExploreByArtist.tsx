"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import Link from "next/link"



export default function ExploreByArtist({ artists }: { artists: any[] }) {

    const ARTISTS = artists ?? []


    return (
        <section className="py-16 lg:py-20 bg-gray-50/50 ">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
                            Explore Event
                        </h2>
                        <div className="relative">
                            <h2 className="text-2xl md:text-[32px] font-semibold text-[#F5A800] tracking-tighter">
                                by Artist
                            </h2>
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#F5A800]" />
                        </div>
                    </div>

                    {/* Custom Navigation */}
                    <div className="md:flex items-center gap-3 hidden ">
                        <button className="swiper-button-prev-custom h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-[#F5A800] hover:border-[#F5A800] hover:text-white transition-all shadow-sm cursor-pointer active:scale-90">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="swiper-button-next-custom h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-[#F5A800] hover:border-[#F5A800] hover:text-white transition-all shadow-sm cursor-pointer active:scale-90">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={2}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                    }}
                    className="pb-12"
                >
                    {ARTISTS?.map((artist) => (
                        <SwiperSlide key={artist.id}>
                            <Link
                                href={`/artists/${artist?._id}`}
                                scroll={true}
                                className="group flex flex-col gap-4 cursor-pointer"
                            >
                                <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-500">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${artist.image}`}
                                        alt={artist.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ArrowUpRight className="h-6 w-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-base font-black text-gray-900 group-hover:text-[#F5A800] transition-colors tracking-tight">
                                        {artist.name}
                                    </h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
