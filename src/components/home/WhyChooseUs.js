"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    side: "left",
    title: "Global Tech Curation",
    description: "By leveraging our strategic presence in Dubai, we provide Kerala with exclusive access to international gadget releases and premium global inventory before they hit local markets.",
  },
  {
    side: "left",
    title: "Certified 50-Point Audit",
    description: "Quality is our signature. Every certified pre-owned device undergoes an exhaustive 50-point diagnostic protocol to ensure hardware integrity and peak battery performance.",
  },
  {
    side: "right",
    title: "Master-Level Servicing",
    description: "Our laboratory specializes in advanced chip-level repairs and motherboard restoration. We provide precision servicing for the entire Apple and flagship Android ecosystem.",
  },
  {
    side: "right",
    title: "Eco-Conscious Luxury",
    description: "We promote a sustainable luxury tech cycle. By extending the life of premium gadgets through expert restoration, we reduce e-waste without compromising on the elite user experience.",
  },
];

// Enhanced floating animation — softer and more elegant
const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-15, 15, -15],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// Stagger container for left/right features
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Individual feature item animation
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

export default function WhyChooseUs() {
  const leftFeatures = features.filter((f) => f.side === "left");
  const rightFeatures = features.filter((f) => f.side === "right");

  return (
    <section className="bg-white py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* SEO-Rich Header with enhanced animation */}
        <div className="text-center mb-16 lg:mb-28">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 mb-6 block font-bold"
          >
            The Telaura Distinction
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-extralight tracking-tighter text-black leading-tight"
          >
            Redefining the <span className="font-serif italic">Mobile Experience.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-6 text-neutral-400 max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed"
          >
            Telaura is more than a boutique; it is a bridge between Dubai's cutting-edge innovation 
            and Kerala's demand for authentic, high-performance technology.
          </motion.p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
          
          {/* Left Side Features */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16 lg:space-y-32 order-2 lg:order-1"
          >
            {leftFeatures.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.4 } }} // Subtle lift on hover
                className="text-left lg:text-right"
              >
                <h3 className="text-xl font-medium text-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed text-sm md:text-[15px] mb-8">
                  {item.description}
                </p>
                {/* Separator Line */}
                <hr className="border-t border-neutral-200 w-full lg:w-3/4 lg:ml-auto" />
              </motion.div>
            ))}
          </motion.div>

          {/* Center: Hero Image with enhanced floating + entrance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2 flex justify-center items-center"
          >
            {/* Ambient Radial Glow */}
            <div className="absolute w-[120%] h-[120%] bg-radial-gradient from-neutral-100 to-transparent opacity-40 -z-10 blur-3xl" />
            
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="relative w-full max-w-[380px] aspect-[4/5] md:aspect-square"
            >
              <Image 
                src="/images/pixel.png" 
                alt="Premium iPhone Curation Dubai Kerala"
                fill
                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.12)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Side Features */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16 lg:space-y-32 order-3"
          >
            {rightFeatures.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariantsRight}
                whileHover={{ y: -8, transition: { duration: 0.4 } }}
                className="text-left"
              >
                <h3 className="text-xl font-medium text-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed text-sm md:text-[15px] mb-8">
                  {item.description}
                </p>
                {/* Separator Line */}
                <hr className="border-t border-neutral-200 w-full lg:w-3/4" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}