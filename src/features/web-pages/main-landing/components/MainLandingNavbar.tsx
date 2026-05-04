"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MainLandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const bannerHeight = document.getElementById("banner")?.offsetHeight || 0;
            // Background swap (Always run this, even during manual scroll)
            setIsScrolled(scrollY > bannerHeight - 67);

        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navBase = "fixed top-0 z-50 w-full transition-all duration-500";
    const navBg = isScrolled ? "bg-[#014B52] backdrop-blur-md shadow-md" : "bg-transparent";

    return (
        <nav className={`${navBase} ${navBg}`}>
            <div className="container py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="shrink-0 flex items-center gap-0 select-none" aria-label="Go to home">
                    <Image
                        src="/logo.png"
                        width={150}
                        height={50}
                        alt="Showe Logo"
                        className="h-[45px] w-auto object-contain"
                        draggable={false}
                    />
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/become-creator" className="hidden sm:block text-white/90 hover:text-white transition-colors text-sm font-medium">
                        Create Event
                    </Link>
                    <Link href="/for-users">
                        <Button className="bg-[#F5A800] hover:bg-[#e09900] text-white px-6 py-2 rounded-md text-sm transition-all duration-200 shadow-none h-10">
                            Explore Showe
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
