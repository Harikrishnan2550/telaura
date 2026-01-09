"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/constants/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Section: Logo Branding & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-md">
            {/* Logo */}
            <div className="relative w-[280px] h-[100px] mb-6 ">
              <Image
                src="/logo/logo2.png"
                alt={`${SITE.name} Logo`}
                fill
                priority
                className="object-contain ml-[-58]"
              />
            </div>
            <p className="text-neutral-500 font-light leading-relaxed text-sm">
              {SITE.tagline}. Premium mobile ecosystem with delivery across UAE and Kerala, backed by uncompromising standards.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-4 font-bold">
              Direct Inquiries
            </span>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-2xl font-light tracking-tight text-black overflow-hidden"
            >
              Start a Conversation
              <div className="h-px w-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          </div>
        </div>

        {/* Middle Section: Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Column 1: Explore */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-8">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Products', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-sm text-neutral-500 hover:text-black transition-colors duration-300 font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-8">Solutions</h4>
            <ul className="space-y-4 text-sm text-neutral-500 font-light">
              <li className="hover:text-black transition-colors cursor-default">Flagship Inventory</li>
              <li className="hover:text-black transition-colors cursor-default">Certified Pre-Owned</li>
              <li className="hover:text-black transition-colors cursor-default">Master Repair Studio</li>
              <li className="hover:text-black transition-colors cursor-default">Elite Accessories</li>
            </ul>
          </div>

          {/* Column 3: Presence - Sharjah Showroom + Delivery Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-8">Presence</h4>
            <ul className="space-y-6">
              {/* Sharjah Showroom */}
              <li>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black mt-1.5 rounded-full flex-shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold mb-2">
                      Sharjah Showroom
                    </p>
                    <address className="not-italic text-sm text-neutral-700 font-light leading-relaxed">
                      Old Muwaileh, Fire Station Road<br />
                      Sharjah, UAE<br />
                      Opposite Munnavar Ansari Supermarket
                    </address>
                  </div>
                </div>
              </li>

              {/* Delivery Areas */}
              <li className="pt-4">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold mb-3">
                  Delivery Across
                </p>
                <div className="space-y-3 text-sm text-neutral-600 font-light">
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                    All Over UAE
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                    Kerala, India
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-8">Social</h4>
            <ul className="space-y-4 text-sm text-neutral-500 font-light">
              <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal & Branding */}
        <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
            © {currentYear} {SITE.name} • <span className="italic font-serif normal-case tracking-normal text-neutral-300">Curated with Excellence</span>
          </p>

          <div className="flex items-center gap-2 opacity-30 grayscale hover:opacity-100 transition-opacity duration-500">
             <span className="text-[10px] font-black tracking-tighter">APPLE</span>
             <span className="text-[10px] font-black tracking-tighter">SAMSUNG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}