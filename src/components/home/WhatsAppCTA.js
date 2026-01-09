"use client";

import { SITE } from "@/constants/site";
import { motion } from "framer-motion";

export default function WhatsAppCTA() {
  return (
    <section className="relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50 py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background subtle effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-green-100/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-[400px] sm:h-[400px] bg-emerald-100/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        {/* WhatsApp Icon with bounce animation */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.7 }}
          animate={{ y: [0, -15, 0], opacity: 1, scale: 1 }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3.5,
              ease: "easeInOut",
            },
            opacity: { duration: 0.8, delay: 0.2 },
            scale: { duration: 0.8, delay: 0.2 },
          }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 sm:mb-10 relative"
        >
          <div className="absolute inset-0 bg-[#25D366] rounded-full shadow-2xl shadow-green-500/40" />
          <svg
            className="w-12 h-12 sm:w-14 sm:h-14 text-white relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.627.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.27 12.62C2.266 7.59 6.404 3.5 11.76 3.5c2.657 0 5.15 1.034 7.02 2.91 1.87 1.876 2.9 4.37 2.9 7.02-.003 5.36-4.143 9.45-9.499 9.45z" />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-neutral-900 mb-5 sm:mb-6"
        >
          Got Questions?
          <br className="hidden sm:inline" />
          <span className="font-normal text-[#25D366]">Chat with us</span>
        </motion.h2>

        {/* Description - responsive text size */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
        >
          Instant help • Special offers • Product recommendations — our team is just one message away
        </motion.p>

        {/* CTA Button with hover animation */}
        <motion.a
          href={SITE.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg md:text-xl font-medium shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300"
        >
          <span>Open WhatsApp Chat</span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.a>

        {/* Small info text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-sm sm:text-base text-neutral-500 font-light"
        >
          Usually reply in <span className="text-neutral-700 font-medium">under 2 minutes</span> • 9AM – 9PM
        </motion.p>
      </div>
    </section>
  );
}