"use client"

import * as React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { useResendOtp } from "@/features/auth/hooks/useResendOtp"
import { PasswordInput } from "./PasswordInput"
import { registerSchema, type RegisterValues } from "@/features/auth/schemas"
import type { AuthView } from "@/features/auth/types"

export function RegisterForm({
  setView,
  onRegistered,
}: {
  setView: (v: AuthView) => void
  onRegistered: (email: string) => void
}) {
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterValues, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { resend } = useResendOtp()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name as keyof RegisterValues]) return prev
      const next = { ...prev }
      delete next[name as keyof RegisterValues]
      return next
    })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsed = registerSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof RegisterValues, string>> = {}
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof RegisterValues
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await nextFetch("/user", {
        method: "POST",
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password,
          role: "USER",
        },
      })

      if (!response?.success && response.message === "Account is not verified. Please check your email for verification code.") {
        await resend(parsed.data.email)
        onRegistered(parsed.data.email)
        setView("verify-otp")
        return
      }
      if (response?.success) {
        toast.success(response?.message || "Account created! Check your email for the code.", {
          id: "sign-up",
        })
        onRegistered(parsed.data.email)
        setView("verify-otp")
      } else if (Array.isArray(response?.error)) {
        response.error.forEach((err: { message: string }) => toast.error(err.message, { id: "sign-up" }))
      } else {
        toast.error(response?.message || "Registration failed. Please try again.", { id: "sign-up" })
      }
    } catch (err) {
      console.error("Register error:", err)
      toast.error("Something went wrong. Please try again.", { id: "sign-up" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleRegister} noValidate>
      <div className="space-y-2">
        <Label htmlFor="reg-name">Full Name</Label>
        <Input
          id="reg-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`h-11 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20 ${errors.name ? "border-red-400 focus:border-red-400" : ""}`}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email Address</Label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className={`h-11 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20 ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <PasswordInput
          id="reg-password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Set your password"
          className={`h-11 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20 ${errors.password ? "border-red-400 focus:border-red-400" : ""}`}
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </div>
      <div className="space-y-2 pb-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className={`h-11 border-gray-200 focus:border-[#F5A800] focus:ring-[#F5A800]/20 ${errors.confirmPassword ? "border-red-400 focus:border-red-400" : ""}`}
        />
        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
      </Button>
      <div className="text-center text-sm text-gray-500 pt-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-[#F5A800] font-semibold hover:underline"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}
