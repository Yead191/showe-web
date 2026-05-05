"use client";

import { ReactNode } from "react";

interface StepShellProps {
    /** Eyebrow label, e.g. "Question 1", "Step 3 of 7" */
    eyebrow?: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
}

/**
 * Standard wrapper for every step's content area.
 * Keeps heading hierarchy, spacing, and motion consistent across the wizard.
 */
export function StepShell({ eyebrow, title, subtitle, children }: StepShellProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="space-y-2">
                {eyebrow && (
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F5A800]">
                        {eyebrow}
                    </p>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-base text-slate-500 leading-relaxed max-w-xl">
                        {subtitle}
                    </p>
                )}
            </header>
            <div>{children}</div>
        </div>
    );
}