"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
    User,
    Heart,
    Ticket,
    ChevronRight,
} from "lucide-react"
import { getImageUrl } from "@/lib/getImageUrl"
import type { UserProfile } from "@/features/web-pages/user-profile/types"

const sidebarItems = [
    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
        description: "Personal details & password"
    },
    {
        label: "My Favourites",
        href: "/dashboard/favourites",
        icon: Heart,
        description: "Saved shows & artists"
    },
    {
        label: "Tickets",
        href: "/dashboard/tickets",
        icon: Ticket,
        description: "Your active bookings"
    }
]

function getInitials(name?: string) {
    if (!name?.trim()) return "JD"
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface DashboardSidebarProps {
    user: UserProfile | null
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-6">

                {/* User Summary Card - Hidden on Mobile */}
                <div className="hidden lg:block bg-[#014B52] rounded-[32px] p-8 text-white shadow-2xl shadow-[#014B52]/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
                    <div className="relative z-10 space-y-4">
                        <div className="h-16 w-16 rounded-2xl bg-[#F5A800] flex items-center justify-center text-2xl font-black shadow-lg shadow-black/20 overflow-hidden relative shrink-0">
                            {user?.image ? (
                                <Image
                                    src={getImageUrl(user.image)}
                                    alt={user.name || "User profile"}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <span className="text-white">{getInitials(user?.name)}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">{user?.name || "John Doe"}</h2>
                            <p className="text-white/60 text-xs font-medium">
                                {user?.email || (user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Member` : "Premium Member")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links - Desktop: Stack, Mobile: Horizontal Scroll */}
                <nav className="bg-white lg:bg-white rounded-[24px] lg:rounded-[32px] p-2 lg:p-3 shadow-sm border border-gray-100/50 sticky top-20 z-30 lg:static">
                    <div className="flex lg:flex-col lg:overflow-x-visible no-scrollbar gap-1 w-full items-center justify-between lg:justify-start">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href || (pathname === "/dashboard" && item.href === "/dashboard/profile")
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-2xl transition-all duration-300 group w-full md:shrink-0 ${isActive
                                        ? "bg-[#014B52] lg:bg-[#014B52]/5 text-white lg:text-[#014B52]"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <div className={`hidden lg:flex p-2.5 rounded-xl transition-all duration-300 ${isActive ? "bg-[#014B52] text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600 "
                                        }`}>
                                        <item.icon size={18} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black tracking-tight leading-none lg:mb-1 text-nowrap text-center md:text-start">{item.label}</p>
                                        <p className="hidden lg:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.description}</p>
                                    </div>
                                    <ChevronRight size={14} className={`hidden lg:block transition-transform duration-300 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* Need Help Card - Hidden on Mobile */}
                <div className="hidden lg:block bg-[#F5A800]/5 rounded-[32px] p-6 border border-[#F5A800]/20">
                    <p className="text-xs font-black text-[#F5A800] uppercase tracking-widest mb-2">Need Assistance?</p>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">Our support team is available 24/7 to help you.</p>
                    <Link href="/support" className="text-xs font-black text-[#014B52] underline underline-offset-4 hover:text-[#F5A800] transition-colors">
                        Contact Support
                    </Link>
                </div>
            </div>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </aside>
    )
}
