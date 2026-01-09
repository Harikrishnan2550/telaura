// components/LineReveal.jsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LineReveal({ children }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="relative inline-block">
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-600 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}