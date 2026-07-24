"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/features/auth/components/PasswordInput"
import { changePassword } from "@/helpers/next-fetch/profileActions"

export function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match")
            return
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters")
            return
        }

        setIsLoading(true)
        try {
            const response = await changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            })

            if (response.success) {
                toast.success(response.message || "Password updated successfully")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            } else if (response.error && Array.isArray(response.error)) {
                response.error.forEach((err: { message: string }) => {
                    toast.error(err.message)
                })
            } else {
                toast.error(response.message || "Failed to update password")
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-6">
            <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Current Password</Label>
                <PasswordInput
                    id="currentPassword"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">New Password</Label>
                <PasswordInput
                    id="newPassword"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</Label>
                <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 md:h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all font-medium"
                />
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto h-12 px-8 bg-[#014B52] hover:bg-[#023a40] rounded-2xl font-black text-xs uppercase tracking-widest gap-2 shadow-lg shadow-[#014B52]/20"
            >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                {isLoading ? "Updating..." : "Update Password"}
            </Button>
        </form>
    )
}
