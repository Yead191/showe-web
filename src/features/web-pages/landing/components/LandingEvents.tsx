import React from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";
import { stripHtml, type LandingEventItem } from "../types";

export default function LandingEvents({ event }: { event?: LandingEventItem }) {
  if (!event) return null;

  const image = event.cover_image
    ? getImageUrl(event.cover_image)
    : "/assets/bg/landing/event-bg.jpg";
  const description = stripHtml(event.description_html, 280);

  return (
    <div id="events" className="mt-12 lg:mt-16">
      <p className="text-center font-medium text-[#AFAFAF] mb-6">Events</p>
      <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000 ease-out hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="container relative h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl md:text-7xl font-bold text-white font-museo tracking-tight leading-[1.1]">
              {event.title}
            </h2>
            {description && (
              <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl font-light">
                {description}
              </p>
            )}
            <Link
              href={`/events/${event._id}`}
              className="inline-flex mt-2 text-sm font-bold uppercase tracking-widest text-[#F5A800] hover:text-[#ffb81a] transition-colors"
            >
              View event →
            </Link>
          </div>
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#F2A900] rounded-r-full" />
      </section>
    </div>
  );
}
