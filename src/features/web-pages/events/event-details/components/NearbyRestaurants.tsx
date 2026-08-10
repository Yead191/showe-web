"use client";

import Image from "next/image";
import { Star, MapPin, Utensils } from "lucide-react";
import { NearbyPlace } from "../types";
import { getImageUrl } from "@/lib/getImageUrl";

export function NearbyRestaurants({ items }: { items?: NearbyPlace[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <Utensils className="h-8 w-8 text-accent-400" />
          Nearby Restaurants
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items?.map((res) => {
          const href = res.website?.trim();
          const content = (
            <>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <Image
                  src={getImageUrl(res.image)}
                  alt={res.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent-400 text-accent-400" />
                  <p className="text-xs font-black text-gray-900 tracking-tight">
                    {res.rating}
                  </p>
                </div>
              </div>
              <div className="space-y-2 px-1">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {res.category}
                  </p>
                  <p className="text-[10px] font-black text-accent-400 uppercase tracking-widest">
                    {res.price}
                  </p>
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-accent-400 transition-colors">
                  {res.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <MapPin className="h-3 w-3 text-primary-600" />
                  {res.distance} from venue
                </div>
              </div>
            </>
          );

          return href ? (
            <a
              key={res?._id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group space-y-4 block"
            >
              {content}
            </a>
          ) : (
            <div key={res?._id} className="group space-y-4">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
