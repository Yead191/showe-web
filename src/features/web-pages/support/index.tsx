"use client";

import { useState } from "react";
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
  const [selectedTopic, setSelectedTopic] = useState("");

  const faqs = Array.isArray(faq) ? faq : faq?.data ?? [];

  return (
    <main className="min-h-screen bg-white">
      {/* Clean, Focused Hero Section */}
      <SupportHero />

      {/* Categorized Help Topics */}
      <SupportCategories onSelectCategory={(topic) => setSelectedTopic(topic)} />

      {/* Main Contact Form & Trust Hub */}
      <SupportForm selectedTopic={selectedTopic} />

      {/* Streamlined FAQ Section */}
      <SupportFaq faqs={faqs} />
    </main>
  );
}