"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    title: "iPhone Series",
    category: "Premium Smartphones",
    image: "/images/products/iphone.png",
  },
  {
    title: "Premium Laptops",
    category: "High Performance",
    image: "/images/products/laptop.png",
  },
  {
    title: "Accessories",
    category: "Essential Add-ons",
    image: "/images/products/accessories.jpg",
  },
  {
    title: "Smart Watches",
    category: "Wearable Tech",
    image: "/images/products/smartwatch.jpg",
  },
  {
    title: "Android Phones",
    category: "Flagship Power",
    image: "/images/products/android.png",
  },
  {
    title: "Tablets",
    category: "Portable Productivity",
    image: "/images/products/tablet.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // custom ease for premium feel
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header with enhanced animation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] text-neutral-500 font-semibold block mb-4"
            >
              Our Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black leading-tight"
            >
              Curated <span className="font-serif italic">Tech</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products"
              className="text-sm uppercase tracking-widest font-medium text-black border-b-2 border-black pb-1 hover:opacity-70 transition-opacity"
            >
              View All Products
            </Link>
          </motion.div>
        </div>

        {/* Masonry-style Columns Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {products.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-neutral-100 flex flex-col"
              whileHover={{ y: -4 }} // subtle lift on hover
              transition={{ duration: 0.4 }}
            >
              {/* Image Container - Natural Aspect Ratio */}
              <div className="relative w-full overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.08 }}
                  style={{ originY: 0.5 }}
                />

                {/* Desktop Overlay (Appears on Hover) - Animated */}
                <motion.div
                  className="hidden sm:flex absolute inset-0 bg-black/40 items-end p-6"
                  initial="hidden"
                  whileHover="visible"
                  variants={overlayVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="text-white">
                    <motion.p
                      className="text-xs uppercase tracking-widest mb-1 opacity-80"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.8 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.category}
                    </motion.p>
                    <motion.h3
                      className="text-xl font-medium"
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Text (Visible below image) - Animated */}
              <motion.div
                className="sm:hidden px-5 py-4 bg-white border-t border-neutral-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                  {item.category}
                </p>
                <h3 className="text-lg font-medium text-black tracking-tight">
                  {item.title}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}