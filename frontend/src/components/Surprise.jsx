import React from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";
import { Heart, ChevronDown } from "lucide-react";

export default function Surprise({ onOpen }) {
  const lines = [
    "Before you continue...",
    "I want you to take a small journey with me.",
    "A journey through moments that shaped my life.",
    "Every smile, every lesson, every success...",
    "has a piece of you in it.",
  ];

  return (
    <section
      data-testid="surprise-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #0A1128 0%, #050914 60%, #02050E 100%)",
      }}
    >
      <div className="starfield" />
      <Particles count={28} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="ornament mb-8"
        >
          <Heart className="w-4 h-4" fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="font-display italic text-5xl sm:text-6xl lg:text-7xl text-[#FDFBF7] tracking-wide leading-tight"
          style={{ textShadow: "0 0 40px rgba(212,175,55,0.2)" }}
        >
          Pappa,
        </motion.h1>

        <div className="mt-10 space-y-3 text-base sm:text-lg text-[#EAEAEA]/90 font-body font-light leading-relaxed">
          {lines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.25, duration: 0.9 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-12 font-display italic text-2xl sm:text-3xl text-[#E8C66A]"
        >
          Today is not just Father&apos;s Day.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-3 font-display italic text-2xl sm:text-3xl text-[#FDFBF7]"
        >
          It is a celebration of the greatest man I know.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.4, duration: 0.9, ease: "easeOut" }}
          className="mt-14"
        >
          <button
            data-testid="open-gift-btn"
            onClick={onOpen}
            className="glow-btn group inline-flex items-center gap-3 text-base sm:text-lg"
          >
            <span>Open My Gift</span>
            <Heart className="w-5 h-5" fill="currentColor" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 4, duration: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-[#E8C66A]/70"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-body">
            With love · For Pappa
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </motion.div>

      <div className="vignette" />
    </section>
  );
}
