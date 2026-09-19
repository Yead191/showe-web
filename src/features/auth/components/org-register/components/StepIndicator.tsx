"use client";

import { Check } from "lucide-react";
import type { RegistrationStep } from "../types";

interface StepIndicatorProps {
  currentStep: RegistrationStep;
}

interface StepItem {
  id: RegistrationStep;
  number: string;
  label: string;
}

const STEPS: StepItem[] = [
  { id: "account", number: "01", label: "Account" },
  { id: "verify", number: "02", label: "Verify" },
  { id: "how-it-works", number: "03", label: "How It Works" },
  { id: "plans", number: "04", label: "Choose Plan" },
  { id: "review", number: "05", label: "Payment" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  if (currentStep === "success") return null;

  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentStepItem = STEPS[activeIndex] || STEPS[0];
  const progressPercent = Math.round(((activeIndex + 1) / STEPS.length) * 100);

  return (
    <div className="w-full mb-8">
      {/* Mobile view: Compact progress pill */}
      <div className="flex md:hidden flex-col gap-2 bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-primary-600 text-white text-[11px] font-bold">
              {currentStepItem.number}
            </span>
            {currentStepItem.label}
          </span>
          <span className="text-slate-500 font-medium text-[11px]">
            Step {activeIndex + 1} of {STEPS.length} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary-600 to-accent-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Desktop view: Polished linear stepper */}
      <nav aria-label="Onboarding Progress" className="hidden md:block">
        <ol className="flex items-center justify-between w-full">
          {STEPS.map((step, index) => {
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <li
                key={step.id}
                className="flex items-center flex-1 last:flex-initial relative"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isCompleted
                        ? "bg-primary-600 text-accent-400 shadow-sm"
                        : isCurrent
                          ? "bg-accent-400 text-slate-900 ring-4 ring-accent-400/20 shadow-md scale-105"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={15} strokeWidth={3} />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-medium uppercase tracking-wider transition-colors ${
                        isCurrent
                          ? "text-primary-600 font-bold"
                          : isCompleted
                            ? "text-slate-800 font-medium"
                            : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>

                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-3 h-0.5 bg-slate-200">
                    <div
                      className={`h-full transition-all duration-300 ${
                        index < activeIndex
                          ? "bg-primary-600"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
