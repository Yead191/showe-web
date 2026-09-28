"use client";

import React from "react";
import { EventCard } from "../../events/components/EventCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function PopularEvents({ events }: { events?: any[] }) {
  const popularEvents = events?.slice(0, 6) ?? [];
  return (
    <section className="container mx-auto px-4 pb-10 md:pb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <h2 className="text-2xl md:text-[32px] font-semibold text-gray-900 tracking-tighter">
          Popular
        </h2>
        <div className="relative">
          <h2 className="text-2xl md:text-[32px] font-semibold text-accent-400 tracking-tighter">
            Event
          </h2>
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent-400" />
        </div>
      </div>

      {popularEvents.length === 0 ? (
        <div className="text-center py-16 md:py-20 px-6 bg-slate-50/70 rounded-3xl border border-dashed border-slate-200">
          <div className="w-14 h-14 rounded-2xl bg-accent-400/10 text-accent-400 flex items-center justify-center mx-auto mb-5">
            <Calendar className="w-7 h-7 text-accent-400" strokeWidth={1.75} />
          </div>
          <div className="max-w-lg mx-auto space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight font-museo">
              Events are coming to SHOWE.
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              We&apos;re just getting started. As organisations join SHOWE,
              you&apos;ll be able to discover events, venues, artists and
              digital programmes here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {popularEvents.map((event, idx) => (
              <div
                key={event._id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-10 lg:mt-20 flex justify-center">
            <Link href="/events">
              <Button
                variant="outline"
                className="w-xs md:w-sm h-12 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all rounded-none tracking-widest uppercase"
              >
                View All Event
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
