export type PaymentType = "programme" | "ticket" | "subscription" | string;

type SuccessCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

type FailedCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function getSuccessCopy(type?: string | null): SuccessCopy {
  switch ((type || "").toLowerCase()) {
    case "programme":
      return {
        eyebrow: "Programme purchased",
        title: "You're all set",
        description:
          "Your interactive programme is unlocked. Open it anytime from your library and dive into the full experience.",
        primaryHref: "/programmes",
        primaryLabel: "View my programmes",
        secondaryHref: "/home",
        secondaryLabel: "Back to home",
      };
    case "ticket":
      return {
        eyebrow: "Ticket confirmed",
        title: "You're going!",
        description:
          "Your ticket is ready. Keep it handy for entry and explore the event details whenever you need them.",
        primaryHref: "/dashboard/tickets",
        primaryLabel: "View my tickets",
        secondaryHref: "/events",
        secondaryLabel: "Browse more events",
      };
    case "subscription":
      return {
        eyebrow: "Subscription active",
        title: "Welcome aboard",
        description:
          "Your subscription is confirmed. You now have access to the tools and features included in your plan.",
        primaryHref: "/dashboard",
        primaryLabel: "Go to dashboard",
        secondaryHref: "/home",
        secondaryLabel: "Back to home",
      };
    default:
      return {
        eyebrow: "Payment successful",
        title: "You're all set",
        description:
          "Your payment went through successfully. You can continue exploring SHOWE or head back home.",
        primaryHref: "/home",
        primaryLabel: "Continue exploring",
        secondaryHref: "/support",
        secondaryLabel: "Need help?",
      };
  }
}

export function getFailedCopy(type?: string | null): FailedCopy {
  switch ((type || "").toLowerCase()) {
    case "programme":
      return {
        eyebrow: "Payment failed",
        title: "We couldn't unlock this programme",
        description:
          "Something went wrong with your payment. No charge was completed. You can try again from the event page, or contact support if this keeps happening.",
        primaryHref: "/events",
        primaryLabel: "Browse events",
        secondaryHref: "/support",
        secondaryLabel: "Contact support",
      };
    case "ticket":
      return {
        eyebrow: "Payment failed",
        title: "We couldn't book your ticket",
        description:
          "Your payment didn't go through, so your seat wasn't reserved. Try again when you're ready, or reach out if you need a hand.",
        primaryHref: "/events",
        primaryLabel: "Browse events",
        secondaryHref: "/support",
        secondaryLabel: "Contact support",
      };
    case "subscription":
      return {
        eyebrow: "Payment failed",
        title: "We couldn't activate your plan",
        description:
          "The subscription payment didn't complete. You can retry from onboarding, or contact support if the issue continues.",
        primaryHref: "/organisation-register",
        primaryLabel: "Try again",
        secondaryHref: "/support",
        secondaryLabel: "Contact support",
      };
    default:
      return {
        eyebrow: "Payment failed",
        title: "Something went wrong",
        description:
          "We couldn't complete your payment. Nothing has been charged. Please try again, or contact support if you need help.",
        primaryHref: "/home",
        primaryLabel: "Back to home",
        secondaryHref: "/support",
        secondaryLabel: "Contact support",
      };
  }
}
