"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SITE = {
  whatsappLink: "https://wa.me/971564470500",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const showBg = !isHomePage || scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          showBg
            ? "bg-black/80 backdrop-blur-lg py-3 border-b border-white/10"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between relative">
          
          <Link 
            href="/" 
            className="relative z-50 ml-0 lg:ml-[-36] transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <div className="relative w-32 h-12 md:w-64 md:h-20 ml-[-12] lg:ml-0">
              <Image
                src="/logo/logo.png"
                alt="Telaura Logo"
                fill
                priority
                className="object-contain brightness-0 invert"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-8 text-[11px] uppercase tracking-[0.3em] font-light">
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>
            <NavLink href="/about" active={pathname === "/about"}>About</NavLink>
            <NavLink href="/services" active={pathname === "/services"}>Services</NavLink>
            <NavLink href="/products" active={pathname === "/products"}>Products</NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>Contact</NavLink>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-6 py-2.5 bg-white text-black text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
            >
              Chat with us
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative z-50 p-2 text-white focus:outline-none"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : "w-full"}`} />
                <span className={`h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : "w-3/4"}`} />
                <span className={`h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : "w-1/2"}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* --- UPDATED MOBILE MENU OVERLAY STYLE --- */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col h-full justify-center px-10">
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <MobileLink href="/" active={pathname === "/"} onClick={() => setOpen(false)}>Home</MobileLink>
            <MobileLink href="/about" active={pathname === "/about"} onClick={() => setOpen(false)}>About</MobileLink>
            <MobileLink href="/services" active={pathname === "/services"} onClick={() => setOpen(false)}>Services</MobileLink>
            <MobileLink href="/products" active={pathname === "/products"} onClick={() => setOpen(false)}>Products</MobileLink>
            <MobileLink href="/contact" active={pathname === "/contact"} onClick={() => setOpen(false)}>Contact</MobileLink>
          </div>
          
          <div className={`mt-16 transition-all duration-1000 delay-500 ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <a
              href={SITE.whatsappLink}
              className="inline-block w-full py-5 bg-white text-black text-center text-xs uppercase tracking-[0.3em] font-bold rounded-xl shadow-2xl active:scale-95 transition-transform"
            >
              Chat on WhatsApp
            </a>
            <p className="text-white/30 text-[10px] uppercase tracking-widest text-center mt-6">
              Available 24/7 for support
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children, active }) {
  return (
    <Link
      href={href}
      className={`relative py-1 transition-colors duration-300 group ${
        active ? "text-white" : "text-white/50 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

function MobileLink({ href, children, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center justify-between border-b border-white/5 py-4"
    >
      <span className={`text-2xl font-extralight tracking-[0.1em] transition-all duration-500 ${
        active ? "text-white translate-x-4" : "text-white/40 group-hover:text-white"
      }`}>
        {children}
      </span>
      {active && <span className="w-2 h-2 rounded-full bg-white mr-4" />}
    </Link>
  );
}