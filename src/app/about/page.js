// src/app/about/page.jsx
"use client";

import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// ──────────────────────────────────────────────────────────────
// Scroll Wrapper Component - Fixes "Target ref is defined but not hydrated"
// ──────────────────────────────────────────────────────────────
function ScrollWrapper({ children }) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax - softer when reduced motion
  const yImage = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -150]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children({ yImage })}
    </div>
  );
}

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  // 3D card tilt values (only active on desktop)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // disable on mobile
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    x.set((e.clientX - centerX) * 0.02);
    y.set((e.clientY - centerY) * -0.02);
  };

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-neutral-50" />;

  return (
    <main className="bg-neutral-50 overflow-hidden">
      <ScrollWrapper>
        {({ yImage }) => (
          <>
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* CONTENT - Staggered reveal */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.18, delayChildren: 0.4 },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    className="inline-block px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-700 mb-8 tracking-[0.4em] uppercase shadow-sm font-mono"
                  >
                    About Us
                  </motion.div>

                  <motion.h1
                    variants={{ hidden: { opacity: 0, scale: 0.9, y: 40 }, visible: { opacity: 1, scale: 1, y: 0 } }}
                    className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter italic font-serif leading-[1.1] mb-8 text-neutral-900"
                  >
                    Welcome to Telaura
                  </motion.h1>

                  <motion.div
                    variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
                    className="w-24 h-px bg-neutral-300 mb-10 origin-left"
                  />

                  <motion.div className="space-y-6 md:text-lg text-neutral-500 font-light leading-relaxed">
                    {[
                      "Telaura is a premium mobile and gadget store serving customers in Dubai and Kerala. We specialize in new mobile phones, quality-checked used phones, gadgets, accessories, and professional mobile services.",
                      "Our goal is simple — to provide reliable products, transparent pricing, and customer-first service. Every used device is carefully inspected, and every customer is guided honestly to the right choice.",
                      "Whether you are looking for the latest smartphone, a budget-friendly used phone, or expert repair service, Telaura is here to help."
                    ].map((text, i) => (
                      <motion.p
                        key={i}
                        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ delay: i * 0.2 }}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </motion.div>
                </motion.div>

                {/* IMAGE - Parallax + entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl bg-neutral-200">
                    <motion.div style={{ y: yImage }} className="absolute inset-0 h-[120%] w-full">
                      <Image
                        src="/images/about/google-pixel.png"
                        alt="Telaura Store - Premium Mobile & Gadgets"
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Animated decorative elements */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
                    className="absolute -bottom-12 -right-12 w-48 h-48 bg-neutral-900/10 rounded-3xl -z-10 hidden lg:block blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7, duration: 1.2, type: "spring" }}
                    className="absolute -top-12 -left-12 w-40 h-40 border-2 border-neutral-300/50 rounded-3xl -z-10 hidden lg:block blur-sm"
                  />
                </motion.div>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="bg-white py-24 lg:py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  viewport={{ once: true }}
                  className="text-center mb-20"
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 text-neutral-900 font-serif">
                    Why Choose Us
                  </h2>
                  <div className="w-20 h-px bg-neutral-300 mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
                  {[
                    { icon: "✓", title: "Quality Products", desc: "Every device undergoes rigorous quality checks to ensure you get the best." },
                    { icon: "◆", title: "Transparent Pricing", desc: "No hidden costs. What you see is what you pay — honest and fair." },
                    { icon: "★", title: "Expert Service", desc: "Our team provides personalized guidance to help you make the right choice." },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="w-16 h-16 bg-neutral-900 rounded-xl mx-auto mb-6 flex items-center justify-center text-white text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4 font-serif">
                        {value.title}
                      </h3>
                      <p className="text-neutral-600 font-light leading-relaxed">
                        {value.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Responsive Banner */}
            <div className="py-8 sm:py-10 md:py-12 overflow-hidden bg-neutral-900 relative">
              {/* Fade edges for smooth loop */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-neutral-900 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-neutral-900 to-transparent" />
              </div>

              <motion.div
                animate={{ x: [0, -1800] }}
                transition={{
                  duration: 40, // slightly slower for better readability
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex whitespace-nowrap gap-10 sm:gap-16 md:gap-24 text-xs sm:text-sm md:text-base lg:text-xl font-light uppercase text-white/40 font-serif tracking-wider"
              >
                {Array(10).fill("Dubai • Kerala • Telaura • Premium • Gadgets • Mobile • Service • Quality • Trust •").map((text, i) => (
                  <span key={i}>{text}</span>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </ScrollWrapper>
    </main>
  );
}