// src/app/products/ProductsClient.jsx
"use client";

import Image from "next/image";
import { SITE } from "@/constants/site";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

const productCategories = [
  {
    title: "iPhone Series",
    tagline: "The Gold Standard",
    description: "Experience the pinnacle of smartphone innovation and design.",
    images: ["/images/ourproducts/iphone1.png", "/images/ourproducts/iphone2.png", "/images/ourproducts/iphone3.png"],
  },
  {
    title: "Android Smartphones",
    tagline: "Pure Versatility",
    description: "Cutting-edge technology meets an open world of possibilities.",
    images: ["/images/ourproducts/android1.png", "/images/ourproducts/android2.png", "/images/ourproducts/android3.png"],
  },
  {
    title: "Used Mobile Phones",
    tagline: "Certified Excellence",
    description: "Premium quality devices at exceptional value, rigorously tested.",
    images: ["/images/ourproducts/used1.png", "/images/ourproducts/used2.png", "/images/ourproducts/used3.png"],
  },
  {
    title: "Laptops",
    tagline: "Pro Performance",
    description: "Power and performance engineered for every professional need.",
    images: ["/images/ourproducts/lap1.png", "/images/ourproducts/lap2.png", "/images/ourproducts/lap3.png"],
  },
  {
    title: "Tablets",
    tagline: "Infinite Canvas",
    description: "Portable productivity and immersive entertainment in your hands.",
    images: ["/images/ourproducts/tab1.png", "/images/ourproducts/tab2.png", "/images/ourproducts/tab3.png"],
  },
  {
    title: "Smart Watches",
    tagline: "Health & Connection",
    description: "Wellness and seamless connectivity, elegantly on your wrist.",
    images: ["/images/ourproducts/watch1.png", "/images/ourproducts/watch2.png", "/images/ourproducts/watch3.png"],
  },
  {
    title: "Mobile Accessories",
    tagline: "Complete the Kit",
    description: "Premium essentials designed to elevate your daily device experience.",
    images: ["/images/ourproducts/accessories1.png", "/images/ourproducts/accessories2.png", "/images/ourproducts/accessories3.png"],
  },
];

const MagneticButton = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const strength = isMobile ? 0.06 : 0.15;
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
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
  }, [x, y, prefersReducedMotion, strength]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} className="inline-block">
      {children}
    </motion.div>
  );
};

const FloatingParticle = ({ delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="absolute w-0.5 h-0.5 bg-slate-400/60 rounded-full"
      initial={{ y: "120%", opacity: 0 }}
      animate={{
        y: ["-120%", "120%"],
        x: isMobile ? [0, 20, -20, 0] : [0, 50, -50, 0],
        opacity: [0, 0.5, 0.5, 0],
      }}
      transition={{
        duration: 18 + Math.random() * 14,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );
};

export default function ProductsClient() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const responsive = useMemo(
    () => ({
      staggerDelay: isMobile ? 0.09 : isTablet ? 0.13 : 0.18,
      entranceDuration: isMobile ? 0.75 : 1.1,
      hoverScale: isMobile ? 1.04 : 1.09,
      hoverRotate: isMobile ? 0 : 3,
      particleCount: isMobile ? 5 : isTablet ? 6 : 8,
      parallaxStrength: isMobile ? 0.08 : 0.5,
    }),
    [isMobile, isTablet]
  );

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, responsive.parallaxStrength * 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0.35]);

  if (prefersReducedMotion) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-slate-900">
        {/* Very basic fallback version without heavy animations */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-8xl font-medium mb-8">Our Products</h1>
          {/* Rest of content without motion... */}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: responsive.entranceDuration }}
      className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-black selection:text-white overflow-x-hidden relative"
    >
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: responsive.particleCount }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 2.8} />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ y: yHero, opacity: opacityHero }}
        className="relative pt-20 pb-28 md:pt-32 md:pb-44 px-5 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 animate-slow-breathe opacity-70" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase border border-slate-300/50 rounded-full text-slate-500 bg-white/50 backdrop-blur-sm"
          >
            Curated Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: responsive.entranceDuration }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 md:mb-8 text-slate-950"
          >
            Our{" "}
            <span className="font-serif italic text-slate-400">Products.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed"
          >
            Discover a handpicked selection of premium gadgets, designed to integrate seamlessly into your digital lifestyle.
          </motion.p>
        </div>
      </motion.section>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-20 md:pb-40 relative z-10">
        <div className="space-y-20 md:space-y-32 lg:space-y-48 xl:space-y-60">
          {productCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: responsive.entranceDuration,
                delay: index * responsive.staggerDelay,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div className="max-w-xl">
                  <span className="text-xs font-mono text-slate-400 mb-3 block uppercase tracking-widest">
                    Category 0{index + 1} // {category.tagline}
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[-0.03em] bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    {category.title}
                  </h2>
                  <div className="mt-4 h-px w-16 md:w-24 bg-gradient-to-r from-slate-900 to-transparent" />
                </div>

                <p className="text-slate-500 text-base md:text-lg max-w-sm font-light leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {category.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + index * 0.15, duration: 0.8 }}
                    whileHover={{
                      scale: responsive.hoverScale,
                      y: responsive.isMobile ? -8 : -16,
                      rotateZ: responsive.hoverRotate * (i % 2 === 0 ? 1 : -1),
                    }}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white shadow-md group border border-slate-100"
                  >
                    <Image
                      src={img}
                      alt={`${category.title} product ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05] md:group-hover:scale-110"
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6"
                    >
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-white bg-black/70 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-2 rounded-full">
                        View →
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 md:mt-16 flex justify-center md:justify-start">
                <MagneticButton>
                  <a
                    href="https://wa.me/971564470500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 bg-slate-950 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    Enquire Now
                    <motion.svg
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </motion.svg>
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-950 py-20 md:py-40 px-6 text-center">
        <h3 className="text-slate-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 md:mb-10">
          Experience Telaura
        </h3>
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight max-w-4xl mx-auto leading-tight">
          Ready to upgrade your technology?
          <br className="hidden md:block" />
          <span className="text-slate-400 italic font-serif">Let us help you find the perfect device.</span>
        </p>
      </div>
    </motion.div>
  );
}