"use client";

import {
  User,
  QrCode,
  Mic2,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";

interface SupportCategoriesProps {
  onSelectCategory?: (categoryTitle: string) => void;
}

const CATEGORIES = [
  {
    icon: User,
    title: "Account & Profile",
    desc: "Manage your account settings, privacy, and personal information.",
    color: "#F5A800",
    subject: "Account & Profile Inquiry",
  },
  {
    icon: QrCode,
    title: "Programme Access",
    desc: "Troubleshoot QR scanning and accessing digital programme content.",
    color: "#014B52",
    subject: "Programme Access & QR Issue",
  },
  {
    icon: Mic2,
    title: "Artist Resources",
    desc: "Tools and guides for artists to manage programs and engagement.",
    color: "#F5A800",
    subject: "Artist Resources & Verification",
  },
  {
    icon: Smartphone,
    title: "Platform Usage",
    desc: "How to use the SHOWE app, QR scanning, and interactive features.",
    color: "#014B52",
    subject: "Platform Usage Assistance",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    desc: "Reporting issues, safety, and community guidelines compliance.",
    color: "#F5A800",
    subject: "Trust & Safety Inquiry",
  },
  {
    icon: HelpCircle,
    title: "Other Questions",
    desc: "Have a unique question or partnership proposal? We're here for you.",
    color: "#014B52",
    subject: "General Support Question",
  },
];

export default function SupportCategories({
  onSelectCategory,
}: SupportCategoriesProps) {
  const handleCategoryClick = (subject: string) => {
    onSelectCategory?.(subject);

    const target = document.getElementById("contact-form");
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Focus the subject input field for immediate editing
      setTimeout(() => {
        const input = document.getElementById("subject") as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.select();
        }
      }, 400);
    }
  };

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-black text-accent-400 uppercase tracking-[0.25em]">
            Topic Directory
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 font-museo tracking-tight">
            Browse help by topic
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Select an area below to jump directly to the inquiry form with that topic prefilled.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClick(cat.subject)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryClick(cat.subject);
                }
              }}
              className="group p-8 rounded-3xl border border-gray-100 hover:border-accent-400/50 bg-white hover:bg-linear-to-b hover:from-white hover:to-gray-50/70 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs"
                    style={{
                      backgroundColor: cat.color + "15",
                      color: cat.color,
                    }}
                  >
                    <cat.icon size={26} strokeWidth={2.2} />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gray-50 text-gray-400 group-hover:bg-accent-400 group-hover:text-white transition-all duration-300 flex items-center justify-center opacity-70 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary-600 mb-2.5 group-hover:text-accent-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100/80 flex items-center text-xs font-bold text-accent-400 group-hover:translate-x-1.5 transition-transform">
                <span>Inquire about this</span>
                <span className="ml-1.5">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
