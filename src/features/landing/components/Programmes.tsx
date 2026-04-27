import React from 'react';
import Image from 'next/image';

const PROGRAMMES_DATA = [
  {
    title: 'MACBETH',
    description: 'Everything your audience expects from a programme—cast, schedule, notes and more—brought together in one interactive, engaging experience. SHOWE transforms static information into something people can explore, react to and enjoy before, during and after the event.',
    image: '/assets/images/programmes/book1.png'
  },
  {
    title: 'MACBETH',
    description: 'Everything your audience expects from a programme—cast, schedule, notes and more—brought together in one interactive, engaging experience. SHOWE transforms static information into something people can explore, react to and enjoy before, during and after the event.',
    image: '/assets/images/programmes/book1.png'
  },
  {
    title: 'MACBETH',
    description: 'Everything your audience expects from a programme—cast, schedule, notes and more—brought together in one interactive, engaging experience. SHOWE transforms static information into something people can explore, react to and enjoy before, during and after the event.',
    image: '/assets/images/programmes/book1.png'
  }
];

export default function Programmes() {
  return (
    <section id="programmes" className="w-full">
      {/* Header Bar */}
      <div className="bg-[#004242] py-12 flex justify-center items-center">
        <p className="text-[#AFAFAF] font-medium tracking-wide">Programmes</p>
      </div>

      {/* Programmes Grid */}
      <div className="bg-white border-b-4 border-[#000000]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-4 divide-[#000000]">
          {PROGRAMMES_DATA.map((prog, index) => (
            <div key={index} className="flex flex-col p-8 lg:p-12 xl:p-16">
              {/* Image Container */}
              <div className="relative h-[450px] w-full mb-10 overflow-hidden ">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-contain"
                  unoptimized
                  draggable={false}

                />
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F4C5C] font-museo">
                  {prog.title}
                </h3>
                <p className="text-[#1C1C1C] text-sm md:text-[16px] leading-relaxed">
                  {prog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
