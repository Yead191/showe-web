"use client"

import * as React from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type AuthView = "login" | "register" | "forgot-password" | "verify-otp" | "reset-password"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess?: () => void
  initialView?: AuthView
}

export default function AuthModal({ open, onOpenChange, onLoginSuccess, initialView = "login" }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView)

  // Reset to initial view when modal closes
  React.useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setView(initialView), 300)
      return () => clearTimeout(timer)
    }
  }, [open, initialView])






  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-white p-8 sm:p-10 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Image src="/logo.png" width={150} height={50} alt="SHOWE" className="h-10 w-auto select-none pointer-events-none" draggable={false} />
            <div className="text-center space-y-1">
              <DialogTitle className="text-2xl font-bold font-museo text-[#014B52]">
                {view === "login" && "Welcome Back"}
                {view === "register" && "Create Account"}
                {view === "forgot-password" && "Recover Password"}
                {view === "verify-otp" && "Verification"}
                {view === "reset-password" && "Reset Password"}
              </DialogTitle>
              <p className="text-gray-500 text-sm">
                {view === "login" && "Sign in to access your dashboard"}
                {view === "register" && "Start creating smarter event experiences"}
                {view === "forgot-password" && "Receive a code to reset your password"}
                {view === "verify-otp" && "Enter the 4-digit code sent to your email"}
                {view === "reset-password" && "Create a new password for your account"}
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {view === "login" && <LoginForm setView={setView} onOpenChange={onOpenChange} onLoginSuccess={onLoginSuccess} />}
            {view === "register" && <RegisterForm setView={setView} />}
            {view === "forgot-password" && <ForgotPasswordForm setView={setView} />}
            {view === "verify-otp" && <VerifyOtpForm setView={setView} />}
            {view === "reset-password" && <ResetPasswordForm setView={setView} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LoginForm({ setView, onOpenChange, onLoginSuccess }: { setView: (v: AuthView) => void, onOpenChange: (open: boolean) => void, onLoginSuccess?: () => void }) {
  const router = useRouter();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    // Mock login success
    const mockUser = {
      name: "John Doe",
      email: email as string || "john@example.com",
      avatar: "https://github.com/shadcn.png"
    };

    localStorage.setItem("user_profile", JSON.stringify(mockUser));
    toast.success("Welcome back, " + mockUser.name + "!");
    router.push("/home")
    onLoginSuccess?.();
    onOpenChange(false);
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
        <Button type="submit" className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all">
          Sign In
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

function RegisterForm({ setView }: { setView: (v: AuthView) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" className="h-11 border-gray-200" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" className="h-11 border-gray-200" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email Address</Label>
        <Input id="reg-email" type="email" placeholder="name@example.com" className="h-11 border-gray-200" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <PasswordInput id="reg-password" placeholder="••••••••" className="h-11 border-gray-200" />
      </div>
      <div className="space-y-2 pb-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput id="confirm-password" placeholder="••••••••" className="h-11 border-gray-200" />
      </div>
      <Button className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all">
        Create Account
      </Button>
      <div className="text-center text-sm text-gray-500 pt-2">
        Already have an account?{" "}
        <button
          onClick={() => setView("login")}
          className="text-[#F5A800] font-semibold hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

function ForgotPasswordForm({ setView }: { setView: (v: AuthView) => void }) {
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

function VerifyOtpForm({ setView }: { setView: (v: AuthView) => void }) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
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
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus last filled or next empty
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-3">
        {otp.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-xl font-bold border-gray-200 focus:border-[#F5A800]"
            maxLength={1}
            autoFocus={i === 0}
          />
        ))}
      </div>
      <div className="space-y-3">
        <Button
          onClick={() => setView("reset-password")}
          className="w-full h-12 bg-[#F5A800] hover:bg-[#e09900] text-white font-semibold text-base transition-all"
        >
          Verify Code
        </Button>
        <p className="text-center text-sm text-gray-500">
          Didn&apos;t receive code?{" "}
          <button className="text-[#F5A800] font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  )
}

function ResetPasswordForm({ setView }: { setView: (v: AuthView) => void }) {
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

function PasswordInput({ id, placeholder, className, name }: { id: string, placeholder?: string, className?: string, name?: string }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input
        name={name}
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`${className || ""} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

