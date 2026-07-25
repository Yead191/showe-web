import OrganisationRegister from "@/features/auth/components/org-register/OrganisationRegister";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Register Your Organisation",
  description:
    "Register your organisation on SHOWE and start creating interactive event programmes. Onboard your venue, publish events and engage audiences in minutes.",
  path: "/organisation-register",
  keywords: [
    "register organisation",
    "event organiser signup",
    "venue registration",
    "create organiser account",
    "organiser onboarding",
    "list your events",
    "event management signup",
  ],
});

export default function OrganisationRegisterPage() {
  return <OrganisationRegister />;
}
