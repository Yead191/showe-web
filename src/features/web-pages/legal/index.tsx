import LegalHero from "./components/LegalHero";
import LegalTabs from "./components/LegalTabs";
import LegalTOC from "./components/LegalTOC";
import LegalContentRenderer, { processLegalHtml } from "./components/LegalContentRenderer";
import LegalHelpCard from "./components/LegalHelpCard";
import type { LegalDocConfig } from "./types";

interface LegalPageProps {
  config: LegalDocConfig;
  htmlContent?: string | null;
}

export default function LegalPage({ config, htmlContent }: LegalPageProps) {
  const { tocItems } = processLegalHtml(htmlContent || "");

  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section with ID "banner" for seamless navbar scroll behavior */}
      <LegalHero config={config} />

      {/* Quick Category & Audience Switcher Tabs */}
      <LegalTabs config={config} />

      {/* Main Content Layout with Sticky Table of Contents */}
      <div className="container mx-auto px-4 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-8">
          {/* Main Document Body */}
          <div className="flex-1 w-full min-w-0">
            {/* Mobile TOC displayed before content */}
            <LegalTOC items={tocItems} variant="mobile" />

            <LegalContentRenderer
              htmlContent={htmlContent}
              config={config}
            />

            {/* Bottom Support & Contact Card */}
            <LegalHelpCard />
          </div>

          {/* Desktop Sticky Sidebar TOC */}
          <LegalTOC items={tocItems} variant="desktop" />
        </div>
      </div>
    </main>
  );
}

export * from "./types";
