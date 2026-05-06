"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Smartphone } from 'lucide-react'

export default function AboutHero() {
    const scrollToStory = () => {
        const section = document.getElementById('our-story');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="banner" className="relative h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <Image
                src="/assets/bg/banner/about-banner2.png"
                alt="About SHOWE"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/50 to-black/90" />

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-museo tracking-tight max-w-4xl mx-auto leading-[1.1]">
                    Redefining the <span className="text-[#F5A800]">Event Experience</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    SHOWE bridges the gap between traditional event programs and the digital future,
                    turning every scan into an interactive journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="h-12 px-8 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-lg rounded-xl flex items-center gap-2 shadow-lg shadow-[#F5A800]/20 active:scale-95 transition-all">
                        <Smartphone size={20} />
                        Download App
                    </Button>
                    <Button
                        onClick={scrollToStory}
                        className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base font-medium rounded-xl backdrop-blur-sm bg-transparent w-full sm:w-auto"
                    >
                        Our Story
                    </Button>
                </div>
            </div>


            {/* Decorative Scroll Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-1 h-12 rounded-full bg-linear-to-b from-[#F5A800] to-transparent" />
            </div>
        </section>
    )
}
