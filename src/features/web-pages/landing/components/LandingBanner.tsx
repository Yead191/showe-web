import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingBanner() {
    return (
        <section
            id="banner"
            className="relative min-h-screen w-full overflow-hidden flex items-center bg-black"
            style={{
                backgroundImage: 'url("/assets/bg/landing/home-bg.jpeg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/70"></div>
            <div className='container relative z-10 text-center flex flex-col flex-center'>
                <div>
                    <h1 className='text-4xl lg:text-7xl font-bold mb-6 text-[#FEFEFE] font-museo'>Step into the story before the curtain rises.</h1>
                    <p className='lg:text-lg mb-6 text-[#FEFEFE] max-w-[734px] mx-auto'>Access your digital programme in seconds, explore the people and moments behind the event, and
                        experience it in a whole new way-before, during, and after.</p>
                    <div className="flex flex-row gap-3 lg:gap-5 justify-between lg:justify-center items-center w-full ">

                        <Link href="/home" className="w-full sm:w-auto flex-1 lg:flex-none">
                            <Button className="cursor-pointer h-12 text-base w-full sm:w-xs bg-[#F2A900] text-white">
                                Get Started
                            </Button>
                        </Link>

                        <Button className="cursor-pointer h-12 text-white w-full sm:w-xs bg-transparent border border-white/80 hover:bg-white/80 hover:text-black flex-1 lg:flex-none">
                            Download App
                        </Button>

                    </div>
                </div>
            </div>
            <Image
                src="/assets/bg/banner/landing-bg.png"
                alt="banner-img"
                className="absolute -bottom-1/12 left-1/2 -translate-x-1/2 h-full w-auto object-cover lg:object-contain opacity-20"
                width={1920}
                height={1080}
                priority
                unoptimized
            />
        </section>
    )
}
