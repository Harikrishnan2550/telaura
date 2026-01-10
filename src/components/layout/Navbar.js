"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SITE = {
  whatsappLink: "https://wa.me/971564470500", // Replace with your real link
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const isHomePage = pathname === "/";
  const showBg = !isHomePage || scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-out ${
          showBg
            ? "bg-gray-800/50 bg-blur backdrop-blur-xl border-b border-white/10 py-2 md:py-3 lg:py-4"
            : "bg-transparent py-3 md:py-4 lg:py-5"
        }`}
      >
        <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between w-full">
            <Link
              href="/"
              className="relative z-50 flex-shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Telaura Home"
            >
              <div className="relative w-[180px] h-[50px] xs:w-[100px] xs:h-[32px] sm:w-[110px] sm:h-[34px] md:w-[130px] md:h-[42px] lg:w-[150px] lg:h-[48px] xl:w-[170px] xl:h-[54px] 2xl:w-[280px] 2xl:h-[76px] ml-[-30px] sm:ml-[-100px]">
                <Image
                  src="/logo/logo.png"
                  alt="Telaura Logo"
                  fill
                  priority
                  sizes="(max-width: 480px) 90px, (max-width: 640px) 100px, (max-width: 768px) 110px, (max-width: 1024px) 130px, (max-width: 1280px) 150px, (max-width: 1536px) 170px, 180px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 flex-shrink-0">
              <div className="flex items-center gap-3 xl:gap-5 2xl:gap-6 text-xs xl:text-sm 2xl:text-[13px] uppercase tracking-[0.15em] xl:tracking-[0.18em] 2xl:tracking-[0.2em] font-extralight italic whitespace-nowrap">
                <NavLink href="/" active={pathname === "/"}>Home</NavLink>
                <NavLink href="/about" active={pathname === "/about"}>About</NavLink>
                <NavLink href="/services" active={pathname === "/services"}>Services</NavLink>
                <NavLink href="/products" active={pathname === "/products"}>Products</NavLink>
                <NavLink href="/contact" active={pathname === "/contact"}>Contact</NavLink>
              </div>

              <div className="h-6 w-px bg-white/20 hidden xl:block" />

              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 xl:px-5 2xl:px-6 py-2 xl:py-2.5 2xl:py-3 bg-white text-black text-xs xl:text-sm 2xl:text-[13px] uppercase tracking-[0.15em] xl:tracking-[0.18em] font-bold rounded-full hover:bg-neutral-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap flex-shrink-0 shadow-md"
              >
                Chat with us
              </a>
            </div>

       
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="relative z-50 lg:hidden p-2 -mr-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg transition-all flex-shrink-0 ml-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${open ? "w-6 rotate-45 translate-y-1.5" : "w-6"}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-0" : "w-5 opacity-100 scale-100"}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${open ? "w-6 -rotate-45 -translate-y-1.5" : "w-4"}`} />
              </div>
            </button>
          </div>

          <div className="hidden md:flex lg:hidden items-center justify-center mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-[13px] uppercase tracking-[0.15em] font-medium whitespace-nowrap">
              <NavLink href="/" active={pathname === "/"}>Home</NavLink>
              <div className="w-px h-3 bg-white/20" />
              <NavLink href="/about" active={pathname === "/about"}>About</NavLink>
              <div className="w-px h-3 bg-white/20" />
              <NavLink href="/services" active={pathname === "/services"}>Services</NavLink>
              <div className="w-px h-3 bg-white/20" />
              <NavLink href="/products" active={pathname === "/products"}>Products</NavLink>
              <div className="w-px h-3 bg-white/20" />
              <NavLink href="/contact" active={pathname === "/contact"}>Contact</NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - FINAL FIXED VERSION */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-40 bg-black transition-all duration-700 ease-out ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 4rem)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex flex-col h-full w-full px-4 xs:px-6 sm:px-8 pb-8 xs:pb-12 sm:pb-16 overflow-y-auto">
         

          <div className="space-y-3 xs:space-y-4 sm:space-y-5">
            <MobileLink href="/" isOpen={open} delay={100}>Home</MobileLink>
            <MobileLink href="/about" isOpen={open} delay={150}>About</MobileLink>
            <MobileLink href="/services" isOpen={open} delay={200}>Services</MobileLink>
            <MobileLink href="/products" isOpen={open} delay={250}>Products</MobileLink>
            <MobileLink href="/contact" isOpen={open} delay={300}>Contact</MobileLink>
          </div>

          <div className="mt-auto pt-8 xs:pt-12 sm:pt-16">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 xs:py-4 sm:py-5 text-center bg-white text-black text-sm xs:text-base sm:text-lg uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] font-bold rounded-lg xs:rounded-xl sm:rounded-2xl transition-all active:scale-[0.98] hover:bg-neutral-50 shadow-lg"
            >
              Chat with us on WhatsApp
            </a>
            <p className="text-white/50 text-xs xs:text-sm sm:text-base text-center mt-3 xs:mt-4 sm:mt-5">
              Typically replies within minutes
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
      className={`relative px-2 py-1 transition-colors duration-300 group ${active ? "text-white" : "text-white/70 hover:text-white"}`}
    >
      {children}
      <span
        className={`absolute left-2 right-2 bottom-0 h-px bg-white transition-all duration-500 ease-out ${
          active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

function MobileLink({ href, children, isOpen, delay }) {
  return (
    <Link
      href={href}
      className="block w-full"
      style={{
        transition: `opacity 700ms ${delay}ms ease-out, transform 700ms ${delay}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(60px)",
      }}
    >
      <span className="text-3xl xs:text-4xl sm:text-5xl font-medium text-white hover:text-neutral-200 transition-colors duration-300 block py-3 xs:py-4 sm:py-5 border-b border-white/10 last:border-b-0">
        {children}
      </span>
    </Link>
  );
}