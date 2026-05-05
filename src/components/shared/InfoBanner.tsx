"use client";

import { ReactNode } from "react";
import { AlertTriangle, Info, Lock } from "lucide-react";

type Variant = "info" | "warning" | "lock";

interface InfoBannerProps {
    variant?: Variant;
    title: string;
    children?: ReactNode;
}

const STYLES: Record<Variant, { wrap: string; icon: ReactNode }> = {
    info: {
        wrap: "bg-sky-50 border-sky-200 text-sky-900",
        icon: <Info size={18} className="text-sky-600" />,
    },
    warning: {
        wrap: "bg-amber-50 border-amber-200 text-amber-900",
        icon: <AlertTriangle size={18} className="text-amber-600" />,
    },
    lock: {
        wrap: "bg-rose-50 border-rose-200 text-rose-900",
        icon: <Lock size={18} className="text-rose-600" />,
    },
};

/**
 * Used for the flowchart's red-bubble messages — "NON-SKIPPABLE + REQUIRED
 * BEFORE ANY FINANCIAL ACTION", commission warnings, and the global
 * conditions notice.
 */
export function InfoBanner({ variant = "info", title, children }: InfoBannerProps) {
    const s = STYLES[variant];
    return (
        <div className={`flex gap-3 p-4 rounded-xl border ${s.wrap}`}>
            <div className="shrink-0 mt-0.5">{s.icon}</div>
            <div className="space-y-1 text-sm">
                <p className="font-semibold">{title}</p>
                {children && <div className="opacity-90">{children}</div>}
            </div>
        </div>
    );
}