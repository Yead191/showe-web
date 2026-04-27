import React from 'react';

const eventData = {
  title: "FutureConnect 2026",
  description: "FutureConnect 2026 is a forward-thinking event that brings together innovators, creators, and industry leaders to explore the latest trends in technology.",
  bgImage: "/assets/bg/landing/event-bg.jpg"
};

export default function LandingEvents() {
  return (
    <div className=' mt-12 lg:mt-16'>
      <p className='text-center font-medium text-[#AFAFAF] mb-6'>Events</p>
      <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden">
        {/* Background Image Container */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000 ease-out hover:scale-105"
          style={{ backgroundImage: `url(${eventData.bgImage})` }}
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content Overlay */}
        <div className="container relative h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl md:text-7xl font-bold text-white font-museo tracking-tight leading-[1.1]">
              {eventData.title}
            </h2>
            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl font-light">
              {eventData.description}
            </p>
          </div>
        </div>

        {/* Decorative side accent (optional, but adds to "premium" feel) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#F2A900] rounded-r-full" />
      </section>
    </div>
  );
}
