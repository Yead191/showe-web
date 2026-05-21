"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { OnboardingWizard } from "./onboarding/OnboardingWizard";

export default function OrganisationRegister() {
  const router = useRouter();

  return (
    <div className="h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
      {/* ------------------------------------------------------------------
        Left side — branding & info (unchanged from the original)
      ------------------------------------------------------------------ */}
      <div className="hidden lg:flex lg:w-3/8 bg-[#014B52] relative overflow-y-hidden flex-col justify-between p-12 text-white  no-scrollbar">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A800]/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5A800]/5 rounded-full blur-3xl -ml-20 -mb-20" />

        <Button
          onClick={() => router.back()}
          className="relative z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit bg-transparent"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Button>

        <div className="relative z-10 max-w-lg">
          <Image
            src="/logo.png"
            width={200}
            height={60}
            alt="Showe Logo"
            className="mb-12 h-12 2xl:h-20 w-fit object-contain"
          />
          <h1 className="text-3xl 2xl:text-5xl font-bold font-museo leading-tight mb-6">
            Empower Your <span className="text-[#F5A800]">Organization</span> With
            Digital Intelligence.
          </h1>
          <p className="text-[16px] 2xl:text-xl text-white/80 font-light leading-relaxed">
            Join hundreds of world-class venues and event producers who have replaced
            print with our dynamic, interactive platform.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Showe Platform. All rights reserved.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------
        Right side — the multi-step wizard
      ------------------------------------------------------------------ */}
      <div className="flex-1 overflow-y-auto h-full bg-slate-50">
        <div className="min-h-full flex items-start justify-center p-4 md:p-12">
          <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 py-8 md:p-12 my-auto">
            <OnboardingWizard />
          </div>
        </div>
      </div>
    </div>
  );
}