"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./PasswordInput"
import type { AuthView } from "@/features/auth/types"

export function ResetPasswordForm({ setView }: { setView: (v: AuthView) => void }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <PasswordInput id="new-password" placeholder="••••••••" className="h-12 border-gray-200" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-new-password">Confirm New Password</Label>
        <PasswordInput id="confirm-new-password" placeholder="••••••••" className="h-12 border-gray-200" />
      </div>
      <Button
        onClick={() => setView("login")}
        className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all"
      >
        Reset Password
      </Button>
    </div>
  )
}
