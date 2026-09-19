"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Lock,
  Loader2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nextFetch } from "@/helpers/next-fetch/NextFetch";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import type { OrganizerRegistrationFormData } from "../types";

interface RegistrationFormProps {
  initialData: OrganizerRegistrationFormData;
  onSubmitSuccess: (data: OrganizerRegistrationFormData) => void;
  onUnverifiedExistingAccount: (email: string) => void;
}

export function RegistrationForm({
  initialData,
  onSubmitSuccess,
  onUnverifiedExistingAccount,
}: RegistrationFormProps) {
  const [formData, setFormData] =
    useState<OrganizerRegistrationFormData>(initialData);
  const [confirmPassword, setConfirmPassword] = useState(
    initialData.confirmPassword || "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    field: keyof OrganizerRegistrationFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = "Organisation name is required";
    }

    if (!formData.contact_name.trim()) {
      errs.contact_name = "Contact name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 7) {
      errs.phone = "Please enter a valid phone number";
    }

    if (!formData.country.trim()) {
      errs.country = "Country is required";
    }

    if (formData.website.trim()) {
      try {
        const urlStr =
          formData.website.startsWith("http://") ||
          formData.website.startsWith("https://")
            ? formData.website
            : `https://${formData.website}`;
        new URL(urlStr);
      } catch {
        errs.website = "Please enter a valid website URL";
      }
    }

    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields properly", {
        id: "form-validation",
      });
      return;
    }

    setIsLoading(true);

    const formattedWebsite = formData.website.trim()
      ? formData.website.startsWith("http://") ||
        formData.website.startsWith("https://")
        ? formData.website.trim()
        : `https://${formData.website.trim()}`
      : "";

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: "ORGANIZATION",
      website: formattedWebsite,
      country: formData.country.trim(),
      contact_name: formData.contact_name.trim(),
      phone: formData.phone.trim(),
    };

    try {
      const response = await nextFetch("/user", {
        method: "POST",
        body: payload,
      });

      // Edge case: unverified existing account (handles status 400, suggestRoute, and message checks)
      const rawMessage = response?.message || "";
      const rawError = Array.isArray(response?.error)
        ? response.error[0]?.message || ""
        : typeof response?.error === "string"
          ? response.error
          : "";
      const combinedMsg = `${rawMessage} ${rawError}`.toLowerCase();
      const suggestRoute = String(
        (response as any)?.suggestRoute || "",
      ).toLowerCase();
      const statusCode = Number((response as any)?.statusCode);

      const isUnverifiedAccount =
        combinedMsg.includes("account is not verified") ||
        combinedMsg.includes("please check your email for verification code") ||
        combinedMsg.includes("email already exist! verified: false") ||
        (combinedMsg.includes("email already exist") &&
          combinedMsg.includes("verified: false")) ||
        suggestRoute.includes("verify-email") ||
        (statusCode === 400 && combinedMsg.includes("not verified"));

      if (isUnverifiedAccount) {
        const targetEmail = (response as any)?.email || formData.email.trim();
        toast.info(
          rawMessage ||
            "Account is not verified. Please check your email for verification code.",
        );
        onUnverifiedExistingAccount(targetEmail);
        setIsLoading(false);
        return;
      }

      if (response?.success) {
        // Store session tokens in cookies per LoginForm.tsx pattern
        if (response?.data?.accessToken) {
          Cookies.set("accessToken", response.data.accessToken);
        }
        if (response?.data?.user?.role || response?.data?.role) {
          Cookies.set(
            "role",
            response?.data?.user?.role ||
              response?.data?.role ||
              "ORGANIZATION",
          );
        }

        toast.success(response?.message || "Account created successfully!");
        onSubmitSuccess({ ...formData, website: formattedWebsite });
      } else {
        if (Array.isArray(response?.error)) {
          response.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "reg-error" });
          });
        } else {
          toast.error(
            response?.message || "Registration failed. Please try again.",
            {
              id: "reg-error",
            },
          );
        }
      }
    } catch (err) {
      console.error("Organizer registration error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 text-primary-600 text-xs font-semibold tracking-wide uppercase">
          Step 1 · Account Details
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-museo">
          Create Your Organizer Account
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Set up your organization profile to start managing venues, publishing
          interactive programmes, and engaging audiences.
        </p>
      </header>

      {/* Existing account quick CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-sm">
        <div className="flex items-center gap-2 text-amber-900">
          <span className="font-medium">Already have a SHOWE account?</span>
        </div>
        <a
          href="https://admin.showe.biz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-accent-400 transition-colors"
        >
          Go to Organizer Portal <ExternalLink size={14} />
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Organization Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label
              htmlFor="org-name"
              className="text-sm font-semibold text-slate-700"
            >
              Organisation Name <span className="text-accent-400">*</span>
            </Label>
            <div className="relative">
              <Building2
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                id="org-name"
                name="name"
                placeholder="e.g. Royal Opera House or National Theatre"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`pl-10 h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                  errors.name ? "border-red-400 ring-1 ring-red-400" : ""
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Contact Person Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="contact-name"
              className="text-sm font-semibold text-slate-700"
            >
              Contact Person Name <span className="text-accent-400">*</span>
            </Label>
            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                id="contact-name"
                name="contact_name"
                placeholder="e.g. Jane Smith"
                value={formData.contact_name}
                onChange={(e) => handleChange("contact_name", e.target.value)}
                className={`pl-10 h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                  errors.contact_name
                    ? "border-red-400 ring-1 ring-red-400"
                    : ""
                }`}
              />
            </div>
            {errors.contact_name && (
              <p className="text-xs text-red-500">{errors.contact_name}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <Label
              htmlFor="org-email"
              className="text-sm font-semibold text-slate-700"
            >
              Business Email <span className="text-accent-400">*</span>
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                id="org-email"
                type="email"
                name="email"
                placeholder="contact@yourvenue.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`pl-10 h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                  errors.email ? "border-red-400 ring-1 ring-red-400" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <Label
              htmlFor="org-phone"
              className="text-sm font-semibold text-slate-700"
            >
              Phone Number <span className="text-accent-400">*</span>
            </Label>
            <div className="relative">
              <Phone
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                id="org-phone"
                type="tel"
                name="phone"
                placeholder="+44 20 7946 0991"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`pl-10 h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                  errors.phone ? "border-red-400 ring-1 ring-red-400" : ""
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <Label
              htmlFor="org-country"
              className="text-sm font-semibold text-slate-700"
            >
              Country <span className="text-accent-400">*</span>
            </Label>
            <div className="relative">
              <MapPin
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                id="org-country"
                name="country"
                placeholder="e.g. United Kingdom"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className={`pl-10 h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                  errors.country ? "border-red-400 ring-1 ring-red-400" : ""
                }`}
              />
            </div>
            {errors.country && (
              <p className="text-xs text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Website (Optional) */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label
              htmlFor="org-website"
              className="text-sm font-semibold text-slate-700"
            >
              Website{" "}
              <span className="text-slate-400 font-normal text-xs">
                (Optional)
              </span>
            </Label>
            <div className="relative">
              <Globe
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                id="org-website"
                name="website"
                placeholder="https://yourtheatre.com"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className={`pl-10 h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                  errors.website ? "border-red-400 ring-1 ring-red-400" : ""
                }`}
              />
            </div>
            {errors.website && (
              <p className="text-xs text-red-500">{errors.website}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="org-password"
              className="text-sm font-semibold text-slate-700"
            >
              Password <span className="text-accent-400">*</span>
            </Label>
            <PasswordInput
              id="org-password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                errors.password ? "border-red-400 ring-1 ring-red-400" : ""
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="org-confirm-password"
              className="text-sm font-semibold text-slate-700"
            >
              Confirm Password <span className="text-accent-400">*</span>
            </Label>
            <PasswordInput
              id="org-confirm-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) {
                  setErrors((prev) => {
                    const u = { ...prev };
                    delete u.confirmPassword;
                    return u;
                  });
                }
              }}
              className={`h-12 border-slate-200 focus:border-primary-600 focus:ring-primary-600/20 rounded-xl ${
                errors.confirmPassword
                  ? "border-red-400 ring-1 ring-red-400"
                  : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="pt-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 bg-primary-600 hover:bg-[#013c42] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Continue to Verification</span>
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
