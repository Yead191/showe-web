"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { StepIndicator } from "./components/StepIndicator";
import { RegistrationForm } from "./components/RegistrationForm";
import { OtpVerification } from "./components/OtpVerification";
import { HowItWorks } from "./components/HowItWorks";
import { PackageSelection } from "./components/PackageSelection";
import { SubscriptionReview } from "./components/SubscriptionReview";
import { RegistrationSuccess } from "./components/RegistrationSuccess";
import type {
  RegistrationStep,
  OrganizerRegistrationFormData,
  PackageItem,
} from "./types";

const INITIAL_FORM_DATA: OrganizerRegistrationFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "ORGANIZATION",
  website: "",
  country: "",
  contact_name: "",
  phone: "",
};

export function OrganizerRegistration() {
  const searchParams = useSearchParams();
  const isReturnSuccess =
    searchParams.get("success") === "true" ||
    searchParams.get("step") === "success" ||
    searchParams.get("session_id") !== null;

  const [currentStep, setCurrentStep] = useState<RegistrationStep>(
    isReturnSuccess ? "success" : "account"
  );
  const [formData, setFormData] = useState<OrganizerRegistrationFormData>(INITIAL_FORM_DATA);
  const [isUnverifiedExistingAccount, setIsUnverifiedExistingAccount] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Step 1 -> Step 2
  const handleRegistrationSuccess = (data: OrganizerRegistrationFormData) => {
    setFormData(data);
    setIsUnverifiedExistingAccount(false);
    setCurrentStep("verify");
  };

  const handleUnverifiedExistingAccount = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));
    setIsUnverifiedExistingAccount(true);
    setCurrentStep("verify");
  };

  // Step 2 -> Step 3
  const handleOtpVerified = () => {
    setCurrentStep("how-it-works");
  };

  // Step 3 -> Step 4
  const handleHowItWorksContinue = () => {
    setCurrentStep("plans");
  };

  // Step 4 -> Step 5
  const handlePackageSelected = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
  };

  const handlePackageContinue = () => {
    if (selectedPackage) {
      setCurrentStep("review");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Step Router */}
      <div className="min-h-[420px]">
        {currentStep === "account" && (
          <RegistrationForm
            initialData={formData}
            onSubmitSuccess={handleRegistrationSuccess}
            onUnverifiedExistingAccount={handleUnverifiedExistingAccount}
          />
        )}

        {currentStep === "verify" && (
          <OtpVerification
            email={formData.email}
            isUnverifiedExistingAccount={isUnverifiedExistingAccount}
            onVerificationSuccess={handleOtpVerified}
            onBackToRegistration={() => setCurrentStep("account")}
          />
        )}

        {currentStep === "how-it-works" && (
          <HowItWorks onContinue={handleHowItWorksContinue} />
        )}

        {currentStep === "plans" && (
          <PackageSelection
            selectedPackage={selectedPackage}
            onSelectPackage={handlePackageSelected}
            onContinue={handlePackageContinue}
            onBack={() => setCurrentStep("how-it-works")}
          />
        )}

        {currentStep === "review" && selectedPackage && (
          <SubscriptionReview
            selectedPackage={selectedPackage}
            agreedToTerms={agreedToTerms}
            agreedToPrivacy={agreedToPrivacy}
            onToggleTerms={setAgreedToTerms}
            onTogglePrivacy={setAgreedToPrivacy}
            onBack={() => setCurrentStep("plans")}
          />
        )}

        {currentStep === "success" && <RegistrationSuccess />}
      </div>
    </div>
  );
}
