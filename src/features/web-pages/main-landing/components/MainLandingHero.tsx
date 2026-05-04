"use client";

import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";

export default function MainLandingHero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            // Ensure video plays on mount
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

    const scrollToInfo = () => {
        const infoSection = document.getElementById("main-info");
        if (infoSection) {
            infoSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="banner" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-60"
                >
                    <source src="/assets/video/landing-hero.mp4" type="video/mp4" />
                </video>
                {/* <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" /> */}
            </div>

            {/* Content */}
            {/* <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both" style={{ fontFamily: "var(--font-museo)", animationDelay: "200ms" }}>
                    Experience <span className="text-[#F5A800]">Showe</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light drop-shadow-md animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both" style={{ animationDelay: "500ms" }}>
                    The ultimate platform to discover, create, and manage extraordinary events.
                </p>
            </div> */}

            {/* Scroll Indicator */}
            <button
                onClick={scrollToInfo}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce flex flex-col items-center gap-2 z-20"
                aria-label="Scroll down"
            >
                <span className="text-sm font-medium tracking-widest uppercase">Explore</span>
                <ArrowDown size={24} />
            </button>
        </section>
    );
}
