"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
    const [showSplash, setShowSplash] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Check if we have already shown the splash screen in this session
        const hasShownSplash = sessionStorage.getItem("splashShown");

        if (!hasShownSplash) {
            setShowSplash(true);

            // Start fade out after 2.5 seconds (adjust based on gif length)
            const fadeTimer = setTimeout(() => {
                setIsFading(true);
            }, 2500);

            // Remove from DOM completely after fade completes (3 seconds total)
            const removeTimer = setTimeout(() => {
                setShowSplash(false);
                sessionStorage.setItem("splashShown", "true");
            }, 3000);

            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(removeTimer);
            };
        }
    }, []);

    if (!showSplash) return null;

    return (
        <div
            className={`fixed inset-0 z-9999 bg-[#104d5c] flex items-center justify-center transition-opacity duration-500 min-h-screen ease-in-out ${isFading ? "opacity-0" : "opacity-100"
                }`}
        >
            <Image
                src="/splash-screen.gif"
                alt="Showe Loading..."
                width={1200}
                height={900}
                priority
                className="w-fit h-full  object-cover"
            />
        </div>
    );
}
