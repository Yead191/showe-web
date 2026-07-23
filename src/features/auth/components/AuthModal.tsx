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
import { Eye, EyeOff, Loader2, MailCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Cookies from 'js-cookie';
import { z } from "zod"
import { nextFetch } from "@/helpers/next-fetch/NextFetch"
import { useResendOtp } from "@/features/auth/hooks/useResendOtp"


type AuthView = "login" | "register" | "forgot-password" | "verify-otp" | "reset-password"

const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterValues = z.infer<typeof registerSchema>

const otpSchema = z
  .string()
  .regex(/^\d{6}$/, "Enter the complete 6-digit code")

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess?: () => void
  initialView?: AuthView
}

export default function AuthModal({ open, onOpenChange, onLoginSuccess, initialView = "login" }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView)
  // Email captured during registration, used by the OTP verification step
  const [pendingEmail, setPendingEmail] = useState("")

  // Sync the view to the requested initialView each time the modal opens
  React.useEffect(() => {
    if (open) {
      setView(initialView)
    }
  }, [open, initialView])



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
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
                {view === "verify-otp" && (
                  <>
                    Enter the 6-digit code sent to{" "}
                    <span className="font-semibold text-[#014B52]">
                      {pendingEmail || "your email"}
                    </span>
                  </>
                )}
                {view === "reset-password" && "Create a new password for your account"}
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {view === "login" && <LoginForm setView={setView} onOpenChange={onOpenChange} onLoginSuccess={onLoginSuccess} onNeedVerify={(email) => setPendingEmail(email)} />}
            {view === "register" && (
              <RegisterForm
                setView={setView}
                onRegistered={(email) => setPendingEmail(email)}
              />
            )}
            {view === "forgot-password" && <ForgotPasswordForm setView={setView} />}
            {view === "verify-otp" && <VerifyOtpForm setView={setView} email={pendingEmail} />}
            {view === "reset-password" && <ResetPasswordForm setView={setView} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LoginForm({ setView, onOpenChange, onLoginSuccess, onNeedVerify }: { setView: (v: AuthView) => void, onOpenChange: (open: boolean) => void, onLoginSuccess?: () => void, onNeedVerify?: (email: string) => void }) {
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

function RegisterForm({
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

function VerifyOtpForm({ setView, email }: { setView: (v: AuthView) => void; email: string }) {
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

function PasswordInput({
  id,
  placeholder,
  className,
  name,
  value,
  onChange,
}: {
  id: string
  placeholder?: string
  className?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input
        name={name}
        id={id}
        value={value}
        onChange={onChange}
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

