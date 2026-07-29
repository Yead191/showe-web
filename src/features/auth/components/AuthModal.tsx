"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import type { AuthView } from "@/features/auth/types";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { VerifyOtpForm } from "./VerifyOtpForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: () => void;
  initialView?: AuthView;
  redirectOnSuccess?: boolean;
}

export default function AuthModal({
  open,
  onOpenChange,
  onLoginSuccess,
  initialView = "login",
  redirectOnSuccess = true,
}: AuthModalProps) {
  const [view, setView] = useState<AuthView>(initialView);
  // Email captured during registration, used by the OTP verification step
  const [pendingEmail, setPendingEmail] = useState("");

  // Sync the view to the requested initialView each time the modal opens
  React.useEffect(() => {
    if (open) {
      setView(initialView);
    }
  }, [open, initialView]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-white p-8 sm:p-10 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/logo.png"
              width={150}
              height={50}
              alt="SHOWE"
              className="h-10 w-auto select-none pointer-events-none"
              draggable={false}
            />
            <div className="text-center space-y-1">
              <DialogTitle className="text-2xl font-bold font-museo text-primary-600">
                {view === "login" && "Welcome Back"}
                {view === "register" && "Create Account"}
                {view === "forgot-password" && "Recover Password"}
                {view === "verify-otp" && "Verification"}
                {view === "reset-password" && "Reset Password"}
              </DialogTitle>
              <p className="text-gray-500 text-sm">
                {view === "login" && "Sign in to access your dashboard"}
                {view === "register" &&
                  "Start creating smarter event experiences"}
                {view === "forgot-password" &&
                  "Receive a code to reset your password"}
                {view === "verify-otp" && (
                  <>
                    Enter the 6-digit code sent to{" "}
                    <span className="font-semibold text-primary-600">
                      {pendingEmail || "your email"}
                    </span>
                  </>
                )}
                {view === "reset-password" &&
                  "Create a new password for your account"}
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {view === "login" && (
              <LoginForm
                setView={setView}
                onOpenChange={onOpenChange}
                onLoginSuccess={onLoginSuccess}
                onNeedVerify={(email) => setPendingEmail(email)}
                redirectOnSuccess={redirectOnSuccess}
              />
            )}
            {view === "register" && (
              <RegisterForm
                setView={setView}
                onRegistered={(email) => setPendingEmail(email)}
              />
            )}
            {view === "forgot-password" && (
              <ForgotPasswordForm setView={setView} />
            )}
            {view === "verify-otp" && (
              <VerifyOtpForm setView={setView} email={pendingEmail} />
            )}
            {view === "reset-password" && (
              <ResetPasswordForm setView={setView} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
