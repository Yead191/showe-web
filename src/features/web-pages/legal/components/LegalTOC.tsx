"use client";

import { useEffect, useState } from "react";
import { ListOrdered, ChevronDown } from "lucide-react";

export interface TOCItem {
  id: string;
  title: string;
}

interface LegalTOCProps {
  items: TOCItem[];
  variant?: "mobile" | "desktop" | "both";
}

export default function LegalTOC({ items, variant = "both" }: LegalTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) {
    return null;
  }

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  const showMobile = variant === "mobile" || variant === "both";
  const showDesktop = variant === "desktop" || variant === "both";

  return (
    <>
      {/* Mobile Drawer Accordion */}
      {showMobile && (
        <div className="lg:hidden w-full mb-6">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200/90 rounded-2xl text-left text-sm font-semibold text-slate-800 shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ListOrdered size={16} className="text-primary-600" />
              <span>Table of Contents ({items.length} sections)</span>
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 text-slate-500 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileOpen && (
            <div className="mt-2 p-3 bg-white border border-slate-200/90 rounded-2xl shadow-md max-h-72 overflow-y-auto space-y-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScrollTo(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors truncate ${
                      isActive
                        ? "bg-primary-600/10 text-primary-600 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      {showDesktop && (
        <aside className="hidden lg:block w-72 shrink-0 sticky top-28 self-start z-10">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              <ListOrdered size={14} className="text-primary-600" />
              <span>Table of Contents</span>
            </div>

            <nav className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pr-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScrollTo(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs leading-relaxed transition-all cursor-pointer block truncate ${
                      isActive
                        ? "bg-primary-600/10 text-primary-600 font-semibold border-l-2 border-primary-600 pl-2.5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    title={item.title}
                  >
                    {item.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>
      )}
    </>
  );
}
