import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";
import type { LandingEventItem } from "../types";

export default function Programmes({ events }: { events?: LandingEventItem[] }) {
  const programmes = (events ?? [])
    .filter((e) => e.programme?._id && e.programme?.title)
    .slice(0, 3)
    .map((e) => ({
      eventId: e._id,
      programmeId: e.programme!._id,
      title: e.programme!.title,
      cover_image: e.programme!.cover_image,
    }));

  if (programmes.length === 0) return null;
  return (
    <section id="programmes" className="w-full">
      <div className="bg-[#004242] py-12 flex justify-center items-center">
        <p className="text-[#AFAFAF] font-medium tracking-wide">Programmes</p>
      </div>

      <div className="bg-white border-b-4 border-[#000000]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-4 divide-[#000000]">
          {programmes.map((prog) => (
            <Link
              href={`/events/${prog.eventId}`}
              key={prog.programmeId}
              className="flex flex-col p-8 lg:p-12 xl:p-16"
            >
              <div className="relative h-[450px] w-full mb-10 overflow-hidden">
                {prog.cover_image ? (
                  <Image
                    src={getImageUrl(prog.cover_image)}
                    alt={prog.title}
                    fill
                    className="object-contain"
                    unoptimized
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100" />
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F4C5C] font-museo">
                  {prog.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
