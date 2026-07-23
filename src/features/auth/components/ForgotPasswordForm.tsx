"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AuthView } from "@/features/auth/types"

export function ForgotPasswordForm({ setView }: { setView: (v: AuthView) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email Address</Label>
        <Input id="forgot-email" type="email" placeholder="name@example.com" className="h-12 border-gray-200" />
      </div>
      <Button
        onClick={() => setView("verify-otp")}
        className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all"
      >
        Send Code
      </Button>
      <button
        onClick={() => setView("login")}
        className="w-full text-center text-sm text-gray-500 hover:text-[#F5A800] transition-colors"
      >
        Back to Login
      </button>
    </div>
  )
}
