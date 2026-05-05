"use client";

interface ProgressBarProps {
    current: number;
    total: number;
    percent: number;
}

export function ProgressBar({ current, total, percent }: ProgressBarProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium tracking-wide">
                    STEP {current} OF {total}
                </span>
                <span className="font-semibold text-[#014B52]">{percent}% complete</span>
            </div>
            <div className="flex gap-1.5">
                {Array.from({ length: total }).map((_, i) => {
                    const filled = i < current;
                    const active = i === current - 1;
                    return (
                        <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${filled
                                ? active
                                    ? "bg-[#F5A800]"
                                    : "bg-[#014B52]"
                                : "bg-slate-200"
                                }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}