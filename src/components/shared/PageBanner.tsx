import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BannerButton {
    label: string;
    href?: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
    className?: string;
    onClick?: () => void;
}

interface PageBannerProps {
    title: string;
    description?: string;
    bgImage: string;
    buttons?: BannerButton[];
    containerClassName?: string;
    overlayClassName?: string;
}

export default function PageBanner({
    title,
    description,
    bgImage,
    buttons = [],
    containerClassName,
    overlayClassName
}: PageBannerProps) {
    return (
        <section id='banner'
            className={cn(
                "relative min-h-screen md:min-h-[85vh]  2xl:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 bg-black",
                containerClassName
            )}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />

            {/* Dark Overlay/Gradient */}
            <div
                className={cn(
                    "absolute inset-0 z-10 bg-linear-to-b from-black/70 via-black/50 to-black/90",
                    overlayClassName
                )}
            />

            {/* Content */}
            <div className="container relative z-20 text-center px-4">
                <div className=" space-y-4 xl:space-y-6">
                    <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold mb-6 text-[#FEFEFE] font-museo leading-[120%]">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-sm xl:text-[16px] mb-6 text-[#FEFEFE] max-w-183.5 mx-auto leading-[140%]">
                            {description}
                        </p>
                    )}

                    {buttons.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                            {buttons?.map((btn, index) => {
                                const buttonElement = (
                                    <Button
                                        onClick={btn.onClick}
                                        variant={btn.variant || 'default'}
                                        className={cn(
                                            "h-12 px-8 rounded-md font-semibold transition-all duration-300",
                                            btn.variant === 'default'
                                                ? "cursor-pointer h-12 text-base px-8 bg-[#F2A900] text-white"
                                                : "h-12 text-white bg-transparent border-white/80 hover:bg-white/80 hover:text-black! px-8",
                                            btn.className
                                        )}
                                    >
                                        {btn.label}
                                    </Button>
                                );

                                return btn.href ? (
                                    <Link key={index} href={btn.href}>
                                        {buttonElement}
                                    </Link>
                                ) : (
                                    <div key={index}>
                                        {buttonElement}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
