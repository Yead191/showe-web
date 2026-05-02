"use client"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AuthModal from '@/features/auth/components/AuthModal';

export default function MakeOwnProgramme() {
  const [authModalOpen, setAuthModalOpen] = useState(false)

  return (
    <section className="w-full pt-12 lg:pt-32  overflow-visible">
      <div className="relative w-full bg-[#F2A900]">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[350px] lg:gap-20">
            {/* Left: Illustration with overflow */}
            <div className="relative order-2 lg:order-1 h-full flex items-center justify-center lg:justify-start lg:col-span-5 ">
              <div className="relative w-[110%] lg:w-[140%] aspect-video -mt-16 lg:-mt-24 lg:-ml-12 pointer-events-none select-none">
                <Image
                  src="/assets/images/landing/make-own.png"
                  alt="Make your own programme illustration"
                  fill
                  className="object-contain lg:scale-[2.2] lg:-translate-y-10"
                  priority
                  draggable={false}
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="py-12 lg:py-0 space-y-6 text-white order-1 lg:order-2 text-center lg:text-left lg:col-span-7">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-museo leading-tight">
                Make your own programme
              </h2>
              <p className="text-white/90 text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                Join thousands of music lovers for an electrifying evening with world-class
              </p>
              <div className="pt-4">

                <Button onClick={() => setAuthModalOpen(true)} className="bg-[#004242] hover:bg-[#003333] text-white  h-12 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer w-xs lg:w-sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        initialView={"login"}
      />
    </section>
  );
}
