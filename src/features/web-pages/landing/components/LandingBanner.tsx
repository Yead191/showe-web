import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function LandingBanner() {
    return (
        <section id='banner' className='min-h-screen flex items-center bg-[#0C0C0C] relative overflow-hidden'>
            <div className='container relative z-10 text-center flex flex-col flex-center'>
                <div>
                    <h1 className='text-3xl lg:text-7xl font-bold mb-6 text-[#FEFEFE] font-museo'>Transform Event Programs Into Interactive Experiences</h1>
                    <p className='text-lg mb-6 text-[#FEFEFE] max-w-[734px] mx-auto'>SHOWE turns traditional event programs into dynamic, interactive experiences-accessible instantly through a simple QR scan.</p>
                    <div className='flex gap-5 justify-center items-center'>
                        <Button className='cursor-pointer h-10 text-base px-8 bg-[#F2A900] text-white'>Get Started</Button>
                        <Button className='cursor-pointer h-10 text-white bg-transparent border-white/80 hover:bg-white/80 hover:text-black! px-8' >View Demo</Button>
                    </div>
                </div>
            </div>
            <Image
                src="/assets/bg/banner/landing-bg.png"
                alt="banner-img"
                className="absolute -bottom-1/12 left-1/2 -translate-x-1/2 h-full w-auto object-contain"
                width={1920}
                height={1080}
                priority
                unoptimized
            />
        </section>
    )
}
