"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Heart, MapPin, Music, Mic2 } from "lucide-react"

const MOCK_PROGRAMMES = [
    { id: 1, title: "Until We Shatter", author: "Kate Dylan", image: "/assets/images/books/book1.jpg" },
    { id: 2, title: "The Gilded Fork", author: "Gourmet Series", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000" },
]

const MOCK_ARTISTS = [
    { id: 1, name: "The Midnight Echo", genre: "Synthwave", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000" },
    { id: 2, name: "Luna Ray", genre: "Indie Pop", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000" },
]

const MOCK_VENUES = [
    { id: 1, name: "Grand Opera House", location: "Downtown", image: "https://images.unsplash.com/photo-1503095396549-80705bc06ee0?q=80&w=1000" },
]

export default function FavouritesPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Header ── */}
            <div className="space-y-1">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Favourites</h1>
                <p className="text-gray-500 font-medium">Keep track of everything you love</p>
            </div>

            <Tabs defaultValue="programmes" className="w-full">
                <TabsList className="bg-gray-100/50 p-1 rounded-2xl mb-8 flex overflow-x-auto no-scrollbar whitespace-nowrap">
                    <TabsTrigger
                        value="programmes"
                        className="flex-1 rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        Programmes
                    </TabsTrigger>
                    <TabsTrigger
                        value="artists"
                        className="rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        Artists
                    </TabsTrigger>
                    <TabsTrigger
                        value="venues"
                        className="rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#014B52] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                    >
                        Venues
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="programmes" className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_PROGRAMMES.map((item) => (
                            <div key={item.id} className="group bg-gray-50/50 rounded-3xl p-4 border border-transparent hover:border-[#014B52]/10 hover:bg-white hover:shadow-xl transition-all duration-500">
                                <div className="relative aspect-3/4 rounded-2xl overflow-hidden mb-4">
                                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-red-500 shadow-sm">
                                        <Heart size={16} fill="currentColor" />
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-gray-900 line-clamp-1">{item.title}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="artists" className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_ARTISTS.map((item) => (
                            <div key={item.id} className="group bg-gray-50/50 rounded-3xl p-4 border border-transparent hover:border-[#014B52]/10 hover:bg-white hover:shadow-xl transition-all duration-500">
                                <div className="relative aspect-square rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <button className="absolute inset-0 bg-[#014B52]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <Mic2 className="text-white" size={24} />
                                    </button>
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="text-sm font-black text-gray-900">{item.name}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.genre}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="venues" className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_VENUES.map((item) => (
                            <div key={item.id} className="group relative h-48 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-lg font-black text-white">{item.name}</h3>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-white/70">
                                        <MapPin className="h-3 w-3 text-[#F5A800]" />
                                        {item.location}
                                    </div>
                                </div>
                                <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl text-white">
                                    <Heart size={16} fill="currentColor" className="text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
