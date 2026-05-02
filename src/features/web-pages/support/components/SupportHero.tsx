"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SupportHero() {
    return (
        <section id="banner" className="bg-[#014B52] pt-32 pb-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A800]/10 rounded-full -ml-32 -mb-32 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-sm font-bold text-[#F5A800] uppercase tracking-[0.3em]">Help Center</h1>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-museo tracking-tight">
                            How can we <span className="text-[#F5A800]">help you?</span>
                        </h2>
                    </div>
                    
                    <div className="relative max-w-xl mx-auto group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#F5A800] transition-colors" size={20} />
                        <Input 
                            type="text" 
                            placeholder="Search for articles, guides, and more..." 
                            className="w-full h-14 pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl focus:bg-white/20 focus:border-[#F5A800]/50 transition-all text-base"
                        />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 text-white/60 text-sm font-medium">
                        <span>Popular:</span>
                        <button className="hover:text-[#F5A800] transition-colors">QR Scanning</button>
                        <span>•</span>
                        <button className="hover:text-[#F5A800] transition-colors">Refunds</button>
                        <span>•</span>
                        <button className="hover:text-[#F5A800] transition-colors">Artist Profile</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
