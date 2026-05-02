"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, LogOut } from "lucide-react"
import AuthModal from "@/features/auth/components/AuthModal"
import { toast } from "sonner"

const webNavItems = [
    { label: "Home", href: "/home" },
    { label: "Events", href: "/events" },
    { label: "About us", href: "/about" },
    { label: "Programmes", href: "/programmes" },
    { label: "Support", href: "/support" },
]

export default function WebNavbar() {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [authView, setAuthView] = useState<any>("login")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false);


    // ── Auth Check ────────────────────────────────────────────────────────────
    const checkAuth = () => {
        const storedUser = localStorage.getItem("user_profile");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsSignedIn(true);
        } else {
            setUser(null);
            setIsSignedIn(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_profile");
        checkAuth();
        toast.info("Logged out successfully");
    };
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const banner = document.getElementById("banner");

            if (!banner) {
                // If there's no banner, the background should be visible
                setIsScrolled(true);
                return;
            }

            const bannerHeight = banner.offsetHeight || 0;
            // Background swap
            setIsScrolled(scrollY > bannerHeight - 72);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const navBase =
        "fixed top-0 z-50 w-full transition-all duration-500";

    const navBg = isScrolled
        ? "bg-[#014B52] backdrop-blur-sm"
        : "bg-transparent";

    const handleOpenAuth = (view: "login" | "register") => {
        console.log(view)
        setAuthView(view)
        setAuthModalOpen(true)
        setMobileMenuOpen(false)
    }

    return (
        <nav className={`${navBase} ${navBg}`}>
            <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">

                {/* ── Left: Nav Items (Desktop) ── */}
                <ul className="flex-1 hidden lg:flex items-center gap-2">
                    {webNavItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    scroll={true}
                                    className={`relative p-2 text-sm font-medium transition-all duration-300 rounded-md hover:text-white ${isActive ? "text-[#F5A800]" : "text-white/80"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span
                                            className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-[#F5A800]"
                                        />
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* ── Mobile Menu Trigger ── */}
                <div className="flex lg:hidden flex-1">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-[#014B52] border-white/10 text-white w-72">
                            <SheetHeader className="mb-8 pt-4">
                                <SheetTitle className="text-left">
                                    <Image src="/logo.png" width={120} height={40} alt="SHOWE" className="h-8 w-auto" />
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 px-3">
                                {webNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${pathname === item.href
                                            ? "bg-white/10 text-[#F5A800]"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* ── Center: Logo ── */}
                <div className="flex shrink-0 items-center justify-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png"
                            width={160}
                            height={50}
                            alt="SHOWE"
                            className="h-[52px] w-auto object-contain"
                            draggable={false}
                        />
                    </Link>
                </div>

                {/* ── Right: Profile / Auth ── */}
                <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
                    {!isSignedIn ? (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={() => handleOpenAuth("login")}
                                className="text-sm font-semibold text-white/90 hover:text-white transition-colors px-2 py-1"
                            >
                                Sign in
                            </button>
                            <Button
                                onClick={() => handleOpenAuth("register")}
                                className="bg-[#F5A800] hover:bg-[#e09900] text-white font-bold px-4 sm:px-7 h-10 transition-all rounded-md shadow-[0_4px_14px_0_rgba(245,168,0,0.39)] hidden md:block"
                            >
                                Sign up
                            </Button>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border-2 border-white/10 hover:border-[#F5A800]/50 transition-all overflow-hidden ring-offset-[#014B52] focus-visible:ring-[#F5A800]">
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt="Profile" />
                                        <AvatarFallback className="bg-[#F5A800] text-white text-xs font-bold">
                                            {user?.name?.split(" ").map(n => n[0]).join("") || "JD"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 mt-2 bg-[#014B52] border-white/10 text-white shadow-2xl animate-in fade-in zoom-in-95" align="end">
                                <DropdownMenuLabel className="font-normal border-b border-white/5 pb-3 mb-1">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold leading-none text-white">{user?.name || "John Doe"}</p>
                                        <p className="text-xs leading-none text-white/60">{user?.email || "john@example.com"}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <div className="p-1">
                                    <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer py-2.5 rounded-md transition-colors">
                                        <Link href="/dashboard" className="flex items-center gap-2 w-full">
                                            <LayoutDashboard className="h-4 w-4 text-[#F5A800]" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </div>
                                <div className="p-1">
                                    <DropdownMenuItem
                                        className="focus:bg-red-500/10! text-red-400  cursor-pointer py-2.5 rounded-md transition-colors"
                                        onClick={handleLogout}
                                    >
                                        <div className="flex items-center gap-2 w-full">
                                            <LogOut className="h-4 w-4" />
                                            <span>Log out</span>
                                        </div>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                onLoginSuccess={checkAuth}
                initialView={authView}
            />
        </nav>
    )
}
