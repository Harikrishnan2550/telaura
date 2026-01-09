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
            ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-2 md:py-3 lg:py-4"
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
              <div className="relative w-[90px] h-[28px] xs:w-[100px] xs:h-[32px] sm:w-[110px] sm:h-[34px] md:w-[130px] md:h-[42px] lg:w-[150px] lg:h-[48px] xl:w-[170px] xl:h-[54px] 2xl:w-[180px] 2xl:h-[56px]">
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

            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-white text-black rounded-full hover:bg-neutral-100 transition-all duration-300 active:scale-95 flex-shrink-0 shadow-md"
              aria-label="Chat with us on WhatsApp"
            >
              <svg className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
              </svg>
            </a>

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
          <div className="mb-6 xs:mb-8 sm:mb-10">
            <p className="text-white/40 text-xs xs:text-sm sm:text-base uppercase tracking-[0.3em] xs:tracking-[0.35em] sm:tracking-[0.4em] font-medium">
              Navigation
            </p>
          </div>

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