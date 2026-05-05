"use client";

import { ReactNode } from "react";
import { Check } from "lucide-react";

interface OptionCardProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    selected: boolean;
    onClick: () => void;
    badge?: string;
}

export function OptionCard({
    icon,
    title,
    description,
    selected,
    onClick,
    badge,
}: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`group relative w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300
        ${selected
                    ? "border-[#014B52] bg-[#014B52]/5 shadow-lg shadow-[#014B52]/5"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}
        >
            {/* Selected check */}
            <span
                className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all
          ${selected
                        ? "bg-[#F5A800] text-white scale-100"
                        : "bg-slate-100 text-transparent scale-75 group-hover:scale-100"
                    }`}
            >
                <Check size={14} strokeWidth={3} />
            </span>

            <div className="flex items-start gap-4">
                {icon && (
                    <div
                        className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors
              ${selected ? "bg-[#014B52] text-[#F5A800]" : "bg-slate-100 text-slate-600"}`}
                    >
                        {icon}
                    </div>
                )}
                <div className="flex-1 min-w-0 pr-8">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3
                            className={`font-semibold text-base md:text-lg ${selected ? "text-[#014B52]" : "text-slate-900"
                                }`}
                        >
                            {title}
                        </h3>
                        {badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5A800]/15 text-[#a07000]">
                                {badge}
                            </span>
                        )}
                    </div>
                    {description && (
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </button>
    );
}