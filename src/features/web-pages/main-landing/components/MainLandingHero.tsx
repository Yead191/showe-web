"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowDown, Smartphone, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainLandingHero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [baseDelay, setBaseDelay] = useState(3000);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const hasShownSplash = sessionStorage.getItem("splashShown");
        if (hasShownSplash) {
            setBaseDelay(0);
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            const timer = setTimeout(() => {
                videoRef.current?.play().catch(error => {
                    console.log("Video autoplay failed:", error);
                });
            }, baseDelay);

            return () => clearTimeout(timer);
        }
    }, [baseDelay]);

    const scrollToInfo = () => {
        const infoSection = document.getElementById("main-info");
        if (infoSection) {
            infoSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="banner" className="relative min-h-screen w-full overflow-hidden bg-[#0C0C0C] flex items-center pt-24 lg:pt-0">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A800]/10 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#014B52]/10 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className=" container relative z-10 ">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Content */}
                    <div className="text-white space-y-8 order-2 lg:order-1">
                        <h1 className="text-[40px] md:text-5xl 2xl:text-6xl  font-bold font-museo leading-none animate-in slide-in-from-left-8 fade-in duration-1000 fill-mode-both" style={{ animationDelay: `${baseDelay + 200}ms` }}>
                            Turn every performance into an <span className="text-[#F5A800]">interactive experience</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 font-light leading-tight max-w-2xl animate-in slide-in-from-left-8 fade-in duration-1000 fill-mode-both" style={{ animationDelay: `${baseDelay + 400}ms` }}>
                            Turn every event programme into a living, interactive experience. Instantly access it on your phone, explore rich content, discover the people behind the performance, and engage with the story as it unfolds, before, during, and after the event.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-left-8 fade-in duration-1000 fill-mode-both mb-28 lg:mb-0" style={{ animationDelay: `${baseDelay + 600}ms` }}>
                            <Button className="h-14 px-8 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-lg rounded-xl flex items-center gap-2 shadow-lg shadow-[#F5A800]/20 active:scale-95 transition-all w-full md:w-auto">
                                <Smartphone size={20} />
                                Download App
                            </Button>
                        </div>
                    </div>

                    {/* Right Side: Portrait Video */}
                    <div className="flex justify-center 2xl:justify-end order-1 lg:order-2 animate-in zoom-in-95 fade-in duration-1000 fill-mode-both" style={{ animationDelay: `${baseDelay + 300}ms` }}>
                        <div className="relative h-full lg:h-[80vh]  rounded-[3rem]  shadow-[0_0_50px_rgba(245,168,0,0.15)] overflow-hidden bg-[#1C1C1C] p-1 border-4 border-[#1C1C1C]  ">
                            {/* Notch/Camera Area */}
                            {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1C1C1C] rounded-b-2xl z-20" /> */}

                            <video
                                ref={videoRef}
                                loop
                                muted={isMuted}
                                playsInline
                                className="w-full h-full object-contain rounded-[2.5rem] "
                            >
                                <source src="/assets/video/main-hero.mp4" type="video/mp4" />
                            </video>

                            {/* Inner Glow/Overlay */}
                            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-white/10" />

                            {/* Mute/Unmute Toggle */}
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="absolute bottom-6 right-6 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl text-white/90 hover:text-white z-20 transition-all border border-white/10 shadow-lg group"
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                            >
                                {isMuted ? <VolumeX size={18} className="group-hover:scale-110 transition-transform" /> : <Volume2 size={18} className="group-hover:scale-110 transition-transform" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToInfo}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 transition-colors animate-bounce flex flex-col items-center gap-2 z-20"
                aria-label="Scroll down"
            >
                <span className="text-sm font-medium tracking-widest uppercase">Explore</span>
                <ArrowDown size={24} />
            </button>
        </section>

    );
}
