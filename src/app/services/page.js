// src/app/services/page.js
"use client";

import { SITE } from "@/constants/site";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// NEW IMPORTS
import ScrollProgress from "@/components/ScrollProgress";
import FadeInSection from "@/components/FadeInSection";

const services = [
  {
    tag: "PURCHASE",
    title: "Flagship Inventory",
    description:
      "The latest global releases from Apple and Samsung. We bridge the gap between Dubai's rapid innovation and Kerala's doorstep, ensuring you have the latest flagship technology before anyone else.",
    image: "/images/service/service1.png",
  },
  {
    tag: "RESTORED",
    title: "Certified Pre-Owned",
    description:
      "Restored to excellence. Every device undergoes our signature 50-point diagnostic audit. We believe a pre-owned device should feel like a new beginning.",
    image: "/images/service/service2.png",
  },
  {
    tag: "ENGINEERED",
    title: "The Repair Studio",
    description:
      "Master-level chip servicing and motherboard restoration. Our technicians operate with original component precision to revive devices others deem irreparable.",
    image: "/images/service/service3.png",
  },
  {
    tag: "CURATED",
    title: "Elite Ecosystem",
    description:
      "A selection of premium audio and accessories designed for the modern tech connoisseur. From high-fidelity sound to protective elegance.",
    image: "/images/service/service4.png",
  },
];

function ScrollContainer({ children }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-20, 40]
  );

  const opacityProgress = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 0.6]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children({ parallaxY, opacityProgress, prefersReducedMotion })}
    </div>
  );
}

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <main className="bg-white text-black overflow-hidden relative">
      {/* Top Scroll Progress Bar - Works on every page */}
      <ScrollProgress />

      <ScrollContainer>
        {({ parallaxY, opacityProgress, prefersReducedMotion }) => (
          <>
            {/* Editorial Header - Fade in */}
            <FadeInSection delay={0.1}>
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-28 md:pt-36 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 text-center"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em] text-neutral-400 mb-6 sm:mb-8 block font-bold font-mono"
                >
                  Our Core Offerings
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-12 font-serif"
                >
                  Service
                  <br className="sm:hidden" />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="font-serif italic text-neutral-300 block mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  >
                    Redefined.
                  </motion.span>
                </motion.h1>
              </motion.section>
            </FadeInSection>

            {/* Services List */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
              {services.map((service, index) => (
                <FadeInSection key={index} delay={index * 0.15}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col gap-10 sm:gap-16 lg:gap-24 xl:gap-32 mb-20 sm:mb-32 lg:mb-48 xl:mb-64 ${
                      index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                    } lg:flex-row lg:items-center`}
                  >
                    {/* Image Container */}
                    <motion.div
                      className="w-full lg:w-1/2 relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl"
                      whileHover={{ scale: isMobile ? 1 : 1.025 }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[4/5] xl:aspect-[3/4] overflow-hidden bg-neutral-100">
                        <motion.div
                          style={{ y: parallaxY }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className={`
                              object-cover transition-transform duration-1000 ease-out
                              ${isMobile ? "" : "group-hover:scale-105"}
                            `}
                            quality={85}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                            priority={index === 0}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                      className="w-full lg:w-1/2 space-y-6 sm:space-y-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] font-bold text-neutral-400 uppercase font-mono block"
                      >
                        // 0{index + 1} — {service.tag}
                      </motion.span>

                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light tracking-tight italic font-serif leading-tight"
                      >
                        {service.title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl"
                      >
                        {service.description}
                      </motion.p>

                      <MagneticButton>
                        <motion.a
                          href={SITE.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center gap-3 xs:gap-4 sm:gap-6 px-5 py-3 sm:px-0 sm:py-0 rounded-full sm:rounded-none"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <div
                            className={`
                              h-11 w-11 xs:h-12 xs:w-12 sm:h-14 sm:w-14 
                              rounded-full border border-neutral-300/70 
                              flex items-center justify-center 
                              group-hover:bg-black group-hover:border-black 
                              group-active:bg-black group-active:border-black
                              transition-all duration-500 relative overflow-hidden
                              shadow-sm group-hover:shadow-md
                            `}
                          >
                            <span className="text-black group-hover:text-white group-active:text-white transition-colors text-xl xs:text-2xl">
                              →
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}
                            />
                          </div>

                          <span
                            className={`
                              text-xs xs:text-sm sm:text-sm 
                              uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em] 
                              font-bold border-b border-transparent 
                              group-hover:border-black pb-1 transition-all
                            `}
                          >
                            Enquire via WhatsApp
                          </span>
                        </motion.a>
                      </MagneticButton>
                    </motion.div>
                  </motion.div>
                </FadeInSection>
              ))}
            </section>

            {/* Footer */}
            <FadeInSection delay={0.3}>
              <footer className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-50 border-t border-neutral-100 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-3 sm:space-y-4 px-5 sm:px-8 md:px-12 lg:px-16"
                >
                  <h4 className="text-xs sm:text-sm tracking-[0.5em] sm:tracking-[0.6em] text-neutral-400 uppercase font-bold font-mono">
                    Dubai × Kerala
                  </h4>
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-neutral-400">
                    Premium Standards. Local Expertise.
                  </p>
                </motion.div>
              </footer>
            </FadeInSection>
          </>
        )}
      </ScrollContainer>
    </main>
  );
}

function MagneticButton({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile) {
      x.set(0);
      y.set(0);
      return;
    }

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.1);
      y.set((e.clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const el = ref.current;
    if (el) el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (el) el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, isMobile]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="inline-block touch-none select-none"
    >
      {children}
    </motion.div>
  );
}