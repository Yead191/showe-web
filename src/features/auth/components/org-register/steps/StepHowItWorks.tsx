"use client";

import { StepShell } from "@/components/shared/StepShell";
import { Layers, Component, Share2, Sparkles } from "lucide-react";

/**
 * Flowchart node: "How SHOWE works" — a non-interactive info screen shown to
 * every account type. The flowchart lists four pillars: Modules, Blocks,
 * Distribution, Benefits.
 *
 * No state mutation happens here; the user just reads and clicks Continue.
 */
export function StepHowItWorks() {
    const pillars = [
        {
            icon: <Layers size={22} />,
            title: "Modules",
            description:
                "Your programme is built from modules — cast bios, programme notes, sponsor pages, surveys, and more. Pick what fits each show.",
        },
        {
            icon: <Component size={22} />,
            title: "Blocks",
            description:
                "Inside every module, content is composed from drag-and-drop blocks — text, images, video, ticket links, social embeds.",
        },
        {
            icon: <Share2 size={22} />,
            title: "Distribution",
            description:
                "Every programme gets a QR code and a shareable link. No app downloads. Your audience opens it on their phone in one tap.",
        },
        {
            icon: <Sparkles size={22} />,
            title: "Benefits",
            description:
                "Save on print costs, learn what your audience actually engages with, and unlock new revenue from sponsorships and paid programmes.",
        },
    ];

    return (
        <StepShell
            eyebrow="How it works"
            title="The Showe platform in 30 seconds"
            subtitle="Here's the shape of what you're getting. We'll dig into pricing and tiers next."
        >
            <div className="grid sm:grid-cols-2 gap-4">
                {pillars.map((p) => (
                    <div
                        key={p.title}
                        className="p-5 rounded-2xl bg-linear-to-br from-slate-50 to-white border border-slate-100"
                    >
                        <div className="w-11 h-11 rounded-xl bg-[#014B52] text-[#F5A800] flex items-center justify-center mb-3">
                            {p.icon}
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">{p.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                    </div>
                ))}
            </div>
        </StepShell>
    );
}