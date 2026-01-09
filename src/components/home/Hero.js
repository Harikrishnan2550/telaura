"use client";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import { SITE } from "@/constants/site";

const productImages = [
  { id: "hero-1", src: "/images/iphone.png", alt: "Premium iPhone", accent: "rgba(255,255,255,0.15)" },
  { id: "hero-2", src: "/images/airpods.png", alt: "AirPods Pro", accent: "rgba(100,200,255,0.1)" },
  { id: "hero-3", src: "/images/tablet.png", alt: "Ultra Tablet", accent: "rgba(200,100,255,0.1)" },
  { id: "hero-4", src: "/images/laptop.png", alt: "Laptop", accent: "rgba(255,255,255,0.15)" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mouse Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }, [mouseX, mouseY]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#020202] text-white"
    >
      {/* Dynamic Spotlight */}
      <motion.div 
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${productImages[currentIndex].accent}, transparent 80%)`
          ),
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Scanning Line */}
      <motion.div 
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-10 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />

      <Navbar />

      {/* Responsive Layout with Controlled Gap */}
      <div className="relative z-20 flex flex-col lg:grid lg:grid-cols-2 items-center min-h-screen max-w-7xl mx-auto px-6 lg:px-12 gap-8 lg:gap-20 pt-20 lg:pt-0">
        
        {/* Product Image Section - First on Mobile */}
        <div className="w-full flex justify-center order-1 lg:order-2 relative">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] w-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ 
                  y: -4500,
                  opacity: 0,
                  rotate: -18,
                  scale: 0.85
                }}
                animate={{ 
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{ 
                  y: 4500,
                  opacity: 0,
                  rotate: 15,
                  scale: 0.3,
                }}
                transition={{
                  initial: false,
                  animate: {
                    y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    rotate: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    opacity: { duration: 0.3 }
                  },
                  exit: {
                    y: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                    rotate: { duration: 0.45 },
                    scale: { duration: 0.45 },
                    opacity: { duration: 0.3 }
                  }
                }}
                className="relative w-full aspect-square max-w-sm sm:max-w-md lg:max-w-lg"
              >
                {/* Quick Impact Flash */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0.6, 1.5, 1]
                  }}
                  transition={{ duration: 0.6, times: [0, 0.2, 1] }}
                  className="absolute inset-0 rounded-full blur-[100px] pointer-events-none"
                  style={{ backgroundColor: productImages[currentIndex].accent.replace(/0\.\d+\)/, "0.9)") }}
                />

                {/* Pulsing Glow */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.12, 0.22, 0.12]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full blur-[120px]"
                  style={{ backgroundColor: productImages[currentIndex].accent.replace(/0\.\d+\)/, "0.4)") }}
                />

                {/* Product Image */}
                <motion.div
                  animate={{ 
                    y: [0, -25, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={productImages[currentIndex].src}
                    alt={productImages[currentIndex].alt}
                    fill
                    className="object-contain drop-shadow-[0_0_120px_rgba(255,255,255,0.4)]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

         
          </div>
        </div>

        {/* Text Section - Second on Mobile */}
        <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 pb-8 lg:pb-0">
          

          <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-none mb-4 mt-0 lg:mt-36">
            <AnimatePresence mode="wait">
              <motion.div
               
              >
                Technology, <br />
                <span className="font-medium bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  Chosen Well.
                </span>
              </motion.div>
            </AnimatePresence>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-6 text-lg sm:text-xl text-neutral-400 font-playfair italic max-w-lg mx-auto lg:mx-0 tracking-wide"
          >
           For those who expect more from what they carry.
          </motion.p>

          <div className="mt-12 flex justify-center lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
              whileTap={{ scale: 0.95 }}
              href={SITE.whatsappLink}
              className="relative group overflow-hidden px-10 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl transition-all"
            >
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em]">
                Acquire Now
              </span>
              <motion.div 
                className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%]"
                transition={{ duration: 0.5 }}
              />
              <span className="absolute inset-0 flex items-center justify-center z-20 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                Acquire Now
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}