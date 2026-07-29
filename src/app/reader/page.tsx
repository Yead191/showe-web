import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

// The reader always opens a specific programme at /reader/[id]. This bare
// /reader route has no programme to show, so it is not indexed and simply
// points visitors back to the programmes library.
export const metadata = buildMetadata({
  title: "Programme Reader",
  path: "/reader",
  noIndex: true,
});

export default function ReaderIndexPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-surface-base p-6 text-center">
      <h1 className="font-display font-bold text-2xl text-ink">
        No programme selected
      </h1>
      <p className="text-ink-muted mt-2">
        Open a programme from the library to start reading.
      </p>
      <Link href="/programmes" className="mt-4 text-primary font-semibold">
        Browse programmes
      </Link>
    </div>
  );
}
