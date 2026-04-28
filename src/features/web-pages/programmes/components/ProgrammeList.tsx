import { cn } from '@/lib/utils'
import React from 'react'

export default function ProgrammeList() {
    return (
        <div id='banner' className='min-h-screen relative'>
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/assets/bg/programmes/programmes-bg.jpg')` }}
            />

            {/* Dark Overlay/Gradient */}
            <div
                className={cn(
                    "absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/40 to-black/90",
                )}
            />
        </div>
    )
}
