"use client";

import type { FetchResponse } from "@/helpers/next-fetch/NextFetch";
import type { FaqItem } from "./types";
import SupportHero from "./components/SupportHero";
import SupportCategories from "./components/SupportCategories";
import SupportForm from "./components/SupportForm";
import SupportFaq from "./components/SupportFaq";

export { type FaqItem } from "./types";

interface SupportProps {
  faq?: FetchResponse<FaqItem[]> | FaqItem[];
}

export default function Support({ faq }: SupportProps) {
  const faqs = Array.isArray(faq) ? faq : faq?.data ?? [];

  return (
    <main className="">
      {/* Hero Section with Search */}
      <SupportHero />

      {/* Categorized Help Topics */}
      <SupportCategories />

      {/* Main Contact Form & Info */}
      <SupportForm />

      {/* Common FAQ Section */}
      <SupportFaq faqs={faqs} />
    </main>
  );
}