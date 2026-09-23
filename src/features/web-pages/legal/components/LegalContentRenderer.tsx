import { Clock, ShieldAlert } from "lucide-react";
import type { TOCItem } from "./LegalTOC";
import type { LegalDocConfig } from "../types";

interface LegalContentRendererProps {
  htmlContent?: string | null;
  config: LegalDocConfig;
  onProcessedTOC?: (items: TOCItem[]) => void;
}

export function processLegalHtml(html: string): {
  processedHtml: string;
  tocItems: TOCItem[];
} {
  if (!html) {
    return { processedHtml: "", tocItems: [] };
  }

  const tocItems: TOCItem[] = [];
  let sectionIndex = 0;

  // Replace each <h2> with an id and custom scroll-mt class for smooth jumping
  const processedHtml = html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, _attrs, innerHtml) => {
    sectionIndex += 1;
    const cleanTitle = innerHtml
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .trim();

    const id = `section-${sectionIndex}`;
    tocItems.push({ id, title: cleanTitle || `Section ${sectionIndex}` });

    return `<h2 id="${id}" class="scroll-mt-28 font-museo font-bold text-slate-900 text-xl sm:text-2xl mt-10 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">${innerHtml}</h2>`;
  });

  return { processedHtml, tocItems };
}

export default function LegalContentRenderer({
  htmlContent,
  config,
}: LegalContentRendererProps) {
  const isContentEmpty = !htmlContent || htmlContent.trim().length === 0;

  if (isContentEmpty) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <Clock size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-museo">
          Document Under Final Review
        </h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
          The {config.title} for {config.shortAudience} are currently being updated by the SHOWE legal and compliance team.
        </p>
        <div className="pt-2 text-xs text-slate-400">
          Last check: {new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" })} • SHOWE Global
        </div>
      </div>
    );
  }

  const { processedHtml } = processLegalHtml(htmlContent);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 md:p-12 shadow-xs">
      {/* Editorial metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-700 uppercase tracking-wide">
            Official SHOWE Document
          </span>
        </div>
        <div className="text-slate-400">
          Governed by UK & International Digital Services Standards
        </div>
      </div>

      {/* Styled Rich Text Output */}
      <article
        className="legal-prose space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base [&>h1]:hidden [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mb-4 [&_h1]:font-museo [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-museo [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-slate-900 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4 [&_li]:text-slate-600 [&_a]:text-primary-600 [&_a]:underline [&_a]:font-medium hover:[&_a]:text-primary-700 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-600/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_th]:bg-slate-50 [&_th]:border [&_th]:border-slate-200 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-slate-200 [&_td]:p-3"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
}
