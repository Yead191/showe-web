"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/features/auth/components/AuthModal";
import { ORGANISATION_DASHBOARD_URL } from "@/constants/links";
import { ArrowUpRight } from "lucide-react";

export default function LandingNavbar({
  isCreator = false,
}: {
  isCreator?: boolean;
}) {
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
  const navBase = "fixed top-0 z-50 w-full transition-all duration-500";

  const navBg = isScrolled
    ? "bg-primary-600 backdrop-blur-sm"
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
          <Image
            src={"/logo.png"}
            width={400}
            height={100}
            alt="logo"
            className="h-12.75 w-fit object-contain"
            draggable={false}
          />
        </Link>

        {/* ── Right: CTA + mobile menu ── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {isCreator && (
            <a
              href={ORGANISATION_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 h-10 rounded-md text-xs sm:text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 backdrop-blur-md transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Organizer Portal</span>
              <ArrowUpRight className="size-3.5 sm:size-4 text-accent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          )}

          {/* CTA button */}
          <Link href={isCreator ? "/organisation-register" : "/home"}>
            <Button
              className="inline-flex
              bg-accent-400 hover:bg-[#e09900] text-white
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
