"use client";

import { SITE } from "@/constants/site";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    tag: "PURCHASE",
    title: "Flagship Inventory",
    description: "The latest global releases from Apple and Samsung. Straight from Dubai to your hands.",
    image: "/images/service/service1.png",
  },
  {
    tag: "RESTORED",
    title: "Certified Pre-Owned",
    description: "Restored to excellence. Every device undergoes our signature 50-point diagnostic audit.",
    image: "/images/service/service2.png",
  },
  {
    tag: "ENGINEERED",
    title: "The Repair Studio",
    description: "Master-level chip servicing and motherboard restoration with original component precision.",
    image: "/images/service/service3.png",
  },
  {
    tag: "CURATED",
    title: "Elite Ecosystem",
    description: "A selection of premium audio and accessories designed for the modern tech connoisseur.",
    image: "/images/service/service4.png",
  },
];

// Stagger container for the grid items
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Individual card animation
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Services() {
  return (
    <section className="bg-white py-20 lg:py-48 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 lg:mb-40 gap-8">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 mb-4 lg:mb-6 block font-bold"
            >
              Excellence Defined
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-black leading-[0.95] lg:leading-[0.9]"
            >
              Curated <span className="font-serif italic text-neutral-400">Solutions.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-neutral-400 max-w-xs text-sm font-light leading-relaxed lg:mb-2"
          >
            Providing a seamless bridge between Dubai&apos;s innovation and the heart of Kerala.
          </motion.p>
        </div>

        {/* Services Grid with Staggered Animation */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.5, ease: "easeOut" } }} // Elegant lift on hover
              className="group flex flex-col items-start"
            >
              {/* Premium Image Container */}
              <div className="relative aspect-[3/4] w-full max-w-[320px] mx-auto md:mx-0 overflow-hidden mb-10 shadow-2xl rounded-xl">
                {/* Subtle Gradient Frame */}
                <div className="absolute -inset-[1px] bg-gradient-to-b from-neutral-200 to-neutral-100 rounded-xl -z-10" />
                
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-50">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-[1.1] transition-all duration-[1.8s] ease-out"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 25vw"
                    priority={index < 2} // Prioritize first two for LCP
                  />
                  
                  {/* Animated Tag */}
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 left-4 text-[9px] tracking-[0.25em] font-bold text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-sm"
                  >
                    {service.tag}
                  </motion.span>

                  {/* Inner Shadow Ring */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start w-full max-w-[320px] mx-auto md:mx-0">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-2xl font-light tracking-tight text-black mb-3"
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  className="text-neutral-500 font-light text-sm leading-relaxed mb-8"
                >
                  {service.description}
                </motion.p>
                
                <motion.a
                  href={SITE.whatsappLink}
                  whileHover={{ letterSpacing: "0.3em" }}
                  className="group/link inline-flex items-center gap-3 mt-auto"
                >
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-black border-b border-black pb-0.5 group-hover/link:border-neutral-400 transition-all duration-500">
                    Enquire Now
                  </span>
                  <motion.span 
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg"
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Minimalist Footer Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 lg:mt-32 pt-16 border-t border-neutral-100"
        >
          <p className="text-[10px] tracking-[0.5em] text-neutral-300 uppercase font-bold text-center">
            Dubai × Kerala × Premium Standards
          </p>
        </motion.div>
      </div>
    </section>
  );
}