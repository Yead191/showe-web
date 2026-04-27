import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FEATURE_DATA = [
  {
    title: 'All-in-One Programme Experience',
    description: 'Enjoy a seamless digital event journey where everything you need—schedule, speakers, sessions, and updates—is in one place. No more searching through printed papers or outdated information. With real-time updates, easy navigation, and mobile-friendly access, users can explore events effortlessly, stay informed, and engage more deeply with every moment of the program.',
    buttonText: 'Book Your Ticket',
    image: '/assets/images/programmes/program1.jpg',
    url: '#',
  },
  {
    title: 'Effortless Programme Management for Creators',
    description: 'Enjoy a seamless digital event journey where everything you need—schedule, speakers, sessions, and updates—is in one place. No more searching through printed papers or outdated information. With real-time updates, easy navigation, and mobile-friendly access, users can explore events effortlessly, stay informed, and engage more deeply with every moment of the program.',
    buttonText: 'Become a Creator',
    image: '/assets/images/programmes/program2.jpg',
    url: '/become-creator',
  }
];

export default function FeatureSections() {
  return (
    <section className="container">
      {FEATURE_DATA.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} min-h-[500px] lg:min-h-[600px]`}
        >
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 xl:p-24 bg-white">
            <div className="max-w-xl space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1C1C1C] leading-tight font-museo">
                {feature.title}
              </h2>
              <p className="text-[#494949] text-base lg:text-lg leading-relaxed font-light">
                {feature.description}
              </p>
              <Link href={feature.url}>
                <Button className="bg-[#F2A900] hover:bg-[#D49400] text-white px-6 h-10 text-sm font-medium rounded-sm">
                  {feature.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
