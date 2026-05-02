"use client"

import {
    User,
    Ticket,
    Mic2,
    Smartphone,
    ShieldCheck,
    HelpCircle
} from "lucide-react"

const CATEGORIES = [
    {
        icon: User,
        title: "Account & Profile",
        desc: "Manage your account settings, privacy, and personal information.",
        color: "#F5A800"
    },
    {
        icon: Ticket,
        title: "Ticketing & Payments",
        desc: "Get help with purchases, refunds, and digital ticket access.",
        color: "#014B52"
    },
    {
        icon: Mic2,
        title: "Artist Resources",
        desc: "Tools and guides for artists to manage programs and engagement.",
        color: "#F5A800"
    },
    {
        icon: Smartphone,
        title: "Platform Usage",
        desc: "How to use the SHOWE app, QR scanning, and interactive features.",
        color: "#014B52"
    },
    {
        icon: ShieldCheck,
        title: "Trust & Safety",
        desc: "Reporting issues and understanding our community guidelines.",
        color: "#F5A800"
    },
    {
        icon: HelpCircle,
        title: "Other Questions",
        desc: "Anything else you need help with? We're here for you.",
        color: "#014B52"
    }
]

export default function SupportCategories() {
    return (
        <section className="py-10 lg:py-16">
            <div className="container   ">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {CATEGORIES.map((cat, i) => (
                        <div key={i} className="group p-8 rounded-3xl border border-gray-100 hover:border-[#F5A800]/20 hover:bg-gray-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: cat.color + "10", color: cat.color }}
                            >
                                <cat.icon size={24} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-[#014B52] mb-3">{cat.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {cat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
