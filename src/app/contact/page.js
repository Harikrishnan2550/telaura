"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageCircle,
  Phone,
  Loader2,
  ArrowRight,
} from "lucide-react";

/* ---------------- Animations ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

/* ---------------- Component ---------------- */

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- REAL API SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      setFormData({ name: "", email: "", phone: "", message: "" });
      setStatus({ loading: false, success: true, error: null });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Intro */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-24 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-mono tracking-[0.35em] uppercase text-slate-500 mb-8"
        >
          OUR CORE CONTACT CHANNELS
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-6 font-serif"
        >
          Contact <span className="text-slate-400">us</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-10 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto"
        >
          Reach out the way that suits you best — we're always here to help.
        </motion.p>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-20 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-12">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-500 mb-6">
            GET IN TOUCH
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-10 font-serif">
            Send Your Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg border border-slate-300 focus:border-black outline-none text-lg"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg border border-slate-300 focus:border-black outline-none text-lg"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-lg border border-slate-300 focus:border-black outline-none text-lg"
                placeholder="+971 50 123 4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Your Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-lg border border-slate-300 focus:border-black outline-none resize-none text-lg"
                placeholder="How can we assist you today..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <motion.button
                type="submit"
                disabled={status.loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full text-lg ${
                  status.loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-6 h-6" />
                  </>
                )}
              </motion.button>

              {status.success && (
                <motion.p className="text-emerald-600 text-lg">
                  ✓ Message sent successfully!
                </motion.p>
              )}

              {status.error && (
                <motion.p className="text-red-600 text-lg">
                  {status.error}
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </motion.section>

      {/* Quick Contact */}
      <section className="py-20 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid md:grid-cols-3 gap-8">
          <a
            href="mailto:info@telauratech.com"
            className="p-8 border rounded-2xl text-center"
          >
            <Mail className="mx-auto mb-4" />
            <p>Email Us</p>
          </a>

          <a
            href="https://wa.me/971564470500"
            target="_blank"
            className="p-8 border rounded-2xl text-center"
          >
            <MessageCircle className="mx-auto mb-4" />
            <p>WhatsApp</p>
          </a>

          <a
            href="https://wa.me/971564470500"
            className="p-8 border rounded-2xl text-center"
          >
            <Phone className="mx-auto mb-4" />
            <p>Call Us</p>
          </a>
        </div>
      </section>
    </main>
  );
}
