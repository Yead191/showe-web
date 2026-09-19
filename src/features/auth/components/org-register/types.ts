export type RegistrationStep =
  | "account"
  | "verify"
  | "how-it-works"
  | "plans"
  | "review"
  | "success";

export interface PackageItem {
  _id: string;
  priceId?: string;
  product?: string;
  payment_link?: string;
  features: string[];
  status: "active" | "inactive" | string;
  audience: string;
  modules?: number[];
  description: string;
  can_charge?: boolean;
  label: string;
  short: string;
  color?: string;
  priceMonthly: number;
  recommended: boolean;
  vanues: number;
  programmes: number;
  is_proggramme_sell: boolean;
  minimum_programme_price?: number;
  download_fee_price?: number;
}

export interface OrganizerRegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: "ORGANIZATION";
  website: string;
  country: string;
  contact_name: string;
  phone: string;
}

export interface WizardState {
  currentStep: RegistrationStep;
  formData: OrganizerRegistrationFormData;
  isUnverifiedExistingAccount: boolean;
  selectedPackage: PackageItem | null;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
}
