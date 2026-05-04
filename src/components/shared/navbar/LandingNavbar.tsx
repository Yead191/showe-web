"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/features/auth/components/AuthModal";

export default function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const [authModalOpen, setAuthModalOpen] = useState(false);
    const lastScrollTop = useRef(0);
    const isManualScrolling = useRef(false);

    // ── Scroll spy + hide-on-scroll-down ──────────────────────────────────────
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const bannerHeight = document.getElementById("banner")?.offsetHeight || 0;

            // Background swap (Always run this, even during manual scroll)
            setIsScrolled(scrollY > bannerHeight - 67);

            if (isManualScrolling.current) return;

            lastScrollTop.current = scrollY <= 0 ? 0 : scrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // ── Styles ─────────────────────────────────────────────────────────────────
    const navBase =
        "fixed top-0 z-50 w-full transition-all duration-500";

    const navBg = isScrolled
        ? "bg-[#014B52] backdrop-blur-sm"
        : "bg-transparent";

    // const navTranslate = showNavbar ? "translate-y-0" : "-translate-y-full";

    return (
        <nav className={`${navBase} ${navBg} `}>
            <div className=" container py-2 flex items-center justify-between">

                {/* ── Logo ── */}
                <Link
                    href="/"
                    className="shrink-0 flex items-center gap-0 select-none"
                    aria-label="Go to home"
                >
                    <Image src={'/logo.png'} width={400} height={100} alt="logo" className="h-[51px] w-fit object-contain" draggable={false} />
                </Link>



                {/* ── Right: CTA + mobile menu ── */}
                <div className="flex items-center gap-3">
                    {/* CTA button */}
                    <Link href={'/home'}>
                        <Button
                            className="inline-flex
              bg-[#F5A800] hover:bg-[#e09900] text-white
              px-6 py-2 rounded-md text-sm
              transition-all duration-200 shadow-none h-10
            "
                        >
                            Get Started
                        </Button>
                    </Link>


                </div>
            </div>
            <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        </nav>
    );
}