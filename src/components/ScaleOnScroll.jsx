// components/ScaleOnScroll.jsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScaleOnScroll({ children, delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.96, opacity: 0.85 }}
      animate={
        inView
          ? { scale: 1, opacity: 1, boxShadow: "0 10px 30px rgba(59,130,246,0.15)" }
          : {}
      }
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="transition-shadow duration-700"
    >
      {children}
    </motion.div>
  );
}