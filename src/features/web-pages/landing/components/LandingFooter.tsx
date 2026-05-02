import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LiaLinkedin } from 'react-icons/lia';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '#events' },
  { label: 'About us', href: '#about' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Support', href: '#support' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-[#004242] pt-20 ">
      <div className="container flex flex-col items-center text-center space-y-10">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-[#F2A900] transition-colors font-medium text-sm md:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Subscription Section */}
        <div className="w-full max-w-2xl space-y-6">
          <h3 className="text-white font-semibold text-lg md:text-xl">
            Subscribe to our updates
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 h-fit sm:h-12 bg-transparent sm:bg-white rounded-md overflow-hidden p-0 sm:p-1">
            <div className="h-12 sm:h-full md:flex-1">
              <Input
                type="email"
                placeholder="Enter email address"
                className="h-full bg-white! sm:bg-transparent border-none text-[#1C1C1C] px-6 focus-visible:ring-0 rounded-md sm:rounded-none"
              />
            </div>
            <Button className="bg-[#F2A900] hover:bg-[#D49400] text-white px-10 h-12 sm:h-full rounded-md sm:rounded-sm text-sm font-semibold shrink-0">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Follow Us</p>
          <div className="flex justify-center gap-6">
            <Link href="#" className="text-white hover:text-[#F2A900] transition-colors">
              <LiaLinkedin className="size-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#F2A900] transition-colors">
              <FaFacebook className="size-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#F2A900] transition-colors">
              <FaInstagram className="size-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#F2A900] transition-colors">
              <BsTwitter className="size-5" />
            </Link>
          </div>
        </div>

        {/* Large Logo Image */}
        <div className="w-full">
          <Image
            src="/footer-img.png"
            alt="SHOWE"
            width={1800}
            height={800}
            className="w-full h-fit object-contain pointer-events-none select-none"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs md:text-sm">
          <p>©2026 SHOWE • All rights reserved</p>
          <div className="flex gap-4 md:gap-8">
            <Link href="#" className="hover:text-white transition-colors">Terms & Service</Link>
            <span className="text-gray-600">•</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
