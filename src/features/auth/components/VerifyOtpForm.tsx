"use client"

import * as React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { useResendOtp } from "@/features/auth/hooks/useResendOtp"
import { otpSchema } from "@/features/auth/schemas"
import type { AuthView } from "@/features/auth/types"

export function VerifyOtpForm({ setView, email }: { setView: (v: AuthView) => void; email: string }) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { resend, resendIn } = useResendOtp();
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

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

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    setError("");

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    const parsed = otpSchema.safeParse(code);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Enter the complete 4-digit code");
      return;
    }
    if (!email) {
      toast.error("Missing email. Please register again.", { id: "verify-otp" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await nextFetch("/auth/verify-email", {
        method: "POST",
        body: { email, oneTimeCode: Number(parsed.data) },
      });

      if (response?.success) {
        toast.success(response?.message || "Email verified! You can now sign in.", { id: "verify-otp" });
        setView("login");
      } else if (Array.isArray(response?.error)) {
        response.error.forEach((err: { message: string }) => toast.error(err.message, { id: "verify-otp" }));
      } else {
        setError(response?.message || "Invalid or expired code");
        toast.error(response?.message || "Invalid or expired code", { id: "verify-otp" });
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      toast.error("Something went wrong. Please try again.", { id: "verify-otp" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A800]/10">
          <MailCheck className="h-6 w-6 text-[#F5A800]" />
        </div>
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              value={digit}
              inputMode="numeric"
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20 ${error ? "border-red-400" : ""}`}
              maxLength={1}
              autoFocus={i === 0}
            />
          ))}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="space-y-3">
        <Button
          type="button"
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Code"}
        </Button>
        <p className="text-center text-sm text-gray-500">
          Didn&apos;t receive code?{" "}
          <button
            type="button"
            onClick={() => resend(email)}
            disabled={resendIn > 0}
            className="text-[#F5A800] font-semibold hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
          >
            {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend"}
          </button>
        </p>
        <button
          type="button"
          onClick={() => setView("login")}
          className="w-full text-center text-sm text-gray-500 hover:text-[#F5A800] transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}
