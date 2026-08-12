export interface LandingEventProgramme {
  _id: string;
  title: string;
  price_pence?: number;
  cover_image?: string;
}

export interface LandingEventItem {
  _id: string;
  title: string;
  category?: string;
  cover_image?: string;
  description_html?: string;
  programme?: LandingEventProgramme | null;
  event_date?: string;
  address?: string;
}

export function stripHtml(html: string | undefined | null, max = 280): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}
