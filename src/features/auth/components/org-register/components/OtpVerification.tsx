"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import {
  MailCheck,
  Loader2,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";

interface OtpVerificationProps {
  email: string;
  isUnverifiedExistingAccount?: boolean;
  onVerificationSuccess: () => void;
  onBackToRegistration: () => void;
}

export function OtpVerification({
  email,
  isUnverifiedExistingAccount = false,
  onVerificationSuccess,
  onBackToRegistration,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { resend, resendIn, isCoolingDown } = useResendOtp(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    setError("");

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    setError("");

    const targetIdx = Math.min(pasted.length, 5);
    inputRefs.current[targetIdx]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (!email) {
      toast.error("Email is missing. Please return to registration.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await nextFetch("/auth/verify-email", {
        method: "POST",
        body: {
          email,
          oneTimeCode: Number(code),
        },
      });

      if (response?.success) {
        toast.success(response?.message || "Email verified successfully!");
        onVerificationSuccess();
      } else {
        const msg =
          response?.message ||
          (Array.isArray(response?.error) ? response.error[0]?.message : "") ||
          "Invalid or expired verification code";
        setError(msg);
        toast.error(msg, { id: "otp-error" });
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Something went wrong verifying your code. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="space-y-2 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-[#014B52] text-xs font-semibold tracking-wide uppercase">
          Step 2 · Security
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-museo">
          Verify Your Email
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-semibold text-slate-900">{email}</span>.
        </p>
      </header>

      {/* Explanatory banner for unverified accounts */}
      {isUnverifiedExistingAccount && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            This email is already registered but hasn&apos;t been verified yet.
            Enter the verification code sent to your email to continue.
          </p>
        </div>
      )}

      {/* OTP Input Fields */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600/10 text-[#014B52] shadow-inner">
          <MailCheck className="h-7 w-7" />
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 w-full max-w-sm">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={digit}
              inputMode="numeric"
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border-slate-200 focus:border-[#014B52] focus:ring-[#014B52]/20 shadow-sm transition-all ${
                error ? "border-red-400 ring-1 ring-red-400" : ""
              }`}
              maxLength={1}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-2">
        <Button
          type="button"
          onClick={handleVerify}
          disabled={isLoading || otp.join("").length < 6}
          className="w-full h-13 bg-primary-600 hover:bg-[#013c42] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-[#014B52]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : (
            <span>Verify & Continue</span>
          )}
        </Button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => resend(email)}
            disabled={isCoolingDown}
            className="flex items-center gap-1.5 font-semibold text-[#014B52] hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed cursor-pointer"
          >
            <RefreshCw
              size={14}
              className={isCoolingDown ? "animate-spin" : ""}
            />
            {isCoolingDown ? `Resend code in ${resendIn}s` : "Resend code"}
          </button>

          <button
            type="button"
            onClick={onBackToRegistration}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Change email / Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
