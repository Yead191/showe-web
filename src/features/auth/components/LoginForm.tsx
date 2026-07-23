"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { useResendOtp } from "@/features/auth/hooks/useResendOtp"
import { PasswordInput } from "./PasswordInput"
import type { AuthView } from "@/features/auth/types"

export function LoginForm({ setView, onOpenChange, onLoginSuccess, onNeedVerify }: { setView: (v: AuthView) => void, onOpenChange: (open: boolean) => void, onLoginSuccess?: () => void, onNeedVerify?: (email: string) => void }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { resend } = useResendOtp();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      toast.error("Please fill in all fields", { id: "login" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await nextFetch("/auth/login", { method: "POST", body: { email, password } })
      if (!response?.success && response.message === "Account is not verified. Please check your email for verification code.") {
        onNeedVerify?.(email as string)
        await resend(email as string)
        setView("verify-otp")
        setIsLoading(false);
        return
      }
      if (response?.success) {
        Cookies.set("accessToken", response?.data?.accessToken);
        Cookies.set("role", response?.data?.role);
        toast.success(response?.message)
        router.replace('/home');
        onLoginSuccess?.();
        onOpenChange(false);
        setIsLoading(false);
      } else {
        if (response?.error && Array.isArray(response.error)) {
          response.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "sign-up" });
          });
        } else {
          toast.error(response?.message || "Something went wrong!", {
            id: "sign-up",
          });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div >
      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input name="email" id="email" type="email" placeholder="name@example.com" className="h-12 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

          </div>
          <PasswordInput name="password" id="password" placeholder="••••••••" className="h-12 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20" />
          <div className="w-full inline-flex justify-end">
            <button
              onClick={() => setView("forgot-password")}
              className="text-xs text-[#F5A800] hover:underline font-medium underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500 pt-2">
        Don&apos;t have an account?{" "}
        <button

          onClick={() => setView("register")}
          className="text-[#F5A800] font-semibold hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
