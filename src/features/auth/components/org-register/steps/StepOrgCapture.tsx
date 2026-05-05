"use client";

import { Building2, Globe, MapPin, User, Mail, Phone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { OnboardingState, OrgCapture } from "@/types/onboarding";
import { StepShell } from "@/components/shared/StepShell";

interface Props {
    state: OnboardingState;
    dispatch: (action: { type: "SET_ORG"; value: Partial<OrgCapture> }) => void;
}

/**
 * Flowchart node: "Producer Or Education Capture" / "Venue Capture".
 * The same fields are collected in both paths — org name, website, country,
 * contact name, email — so we render one form regardless of accountType.
 */
export function StepOrgCapture({ state, dispatch }: Props) {
    const o = state.org;
    const set = (patch: Partial<OrgCapture>) => dispatch({ type: "SET_ORG", value: patch });

    return (
        <StepShell
            eyebrow="Step 2"
            title="Tell us about your organisation"
            subtitle="These details appear on your public profile and on every digital programme you publish."
        >
            <div className="grid md:grid-cols-2 gap-5">
                <Field
                    id="organisationName"
                    label="Organisation name"
                    icon={<Building2 size={16} />}
                    placeholder="e.g. Grand Theatre"
                    value={o.organisationName ?? ""}
                    onChange={(v) => set({ organisationName: v })}
                    required
                    fullWidth
                />
                <Field
                    id="website"
                    label="Website"
                    icon={<Globe size={16} />}
                    placeholder="https://yourvenue.com"
                    value={o.website ?? ""}
                    onChange={(v) => set({ website: v })}
                    required
                />
                <Field
                    id="country"
                    label="Country"
                    icon={<MapPin size={16} />}
                    placeholder="United Kingdom"
                    value={o.country ?? ""}
                    onChange={(v) => set({ country: v })}
                    required
                />
                <Field
                    id="contactName"
                    label="Contact name"
                    icon={<User size={16} />}
                    placeholder="Jane Smith"
                    value={o.contactName ?? ""}
                    onChange={(v) => set({ contactName: v })}
                    required
                />
                <Field
                    id="email"
                    label="Email"
                    icon={<Mail size={16} />}
                    type="email"
                    placeholder="jane@yourvenue.com"
                    value={o.email ?? ""}
                    onChange={(v) => set({ email: v })}
                    required
                />
                <Field
                    id="phone"
                    label="Phone (optional)"
                    icon={<Phone size={16} />}
                    type="tel"
                    placeholder="+44 20 0000 0000"
                    value={o.phone ?? ""}
                    onChange={(v) => set({ phone: v })}
                    fullWidth
                />
            </div>
        </StepShell>
    );
}

// ---- local field helper ----
interface FieldProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    fullWidth?: boolean;
}
function Field({
    id, label, icon, placeholder, type = "text", value, onChange, required, fullWidth,
}: FieldProps) {
    return (
        <div className={`space-y-1.5 ${fullWidth ? "md:col-span-2" : ""}`}>
            <Label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
                {required && <span className="text-[#F5A800] ml-1">*</span>}
            </Label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </span>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10 h-11 border-slate-200 focus:border-[#014B52] focus:ring-[#014B52]/20"
                />
            </div>
        </div>
    );
}