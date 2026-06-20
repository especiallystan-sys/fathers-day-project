import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import Particles from "./Particles";

export default function Closing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const firedRef = useRef(false);

  useEffect(() => {
    if (inView && !firedRef.current) {
      firedRef.current = true;
      const colors = ["#D4AF37", "#E8C66A", "#FDFBF7", "#FFFFFF"];
      const end = Date.now() + 2500;
      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 70,
          startVelocity: 45,
          origin: { x: 0, y: 0.85 },
          colors,
          scalar: 0.9,
          gravity: 0.8,
          ticks: 220,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 70,
          startVelocity: 45,
          origin: { x: 1, y: 0.85 },
          colors,
          scalar: 0.9,
          gravity: 0.8,
          ticks: 220,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      // Burst in the middle
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          startVelocity: 35,
          origin: { x: 0.5, y: 0.45 },
          colors,
          scalar: 1.1,
          ticks: 260,
        });
      }, 400);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      id="closing"
      data-testid="closing-section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24"
      style={{
        background:
          "radial-gradient(ellipse at center, #0F1A3A 0%, #0A1128 45%, #02050E 100%)",
      }}
    >
      <div className="starfield" />
      <Particles count={32} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="heartbeat text-7xl sm:text-8xl text-[#D4AF37]" aria-hidden="true">
            <Heart className="w-24 h-24 sm:w-32 sm:h-32 mx-auto" fill="currentColor" />
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display italic text-4xl sm:text-6xl lg:text-7xl text-[#FDFBF7] leading-tight"
          style={{ textShadow: "0 0 60px rgba(212,175,55,0.3)" }}
        >
          Happy Father&apos;s Day,
          <br />
          <span className="text-[#E8C66A]">Pappa</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 space-y-3 font-body text-lg sm:text-xl text-[#EAEAEA]/90 leading-relaxed"
        >
          <p>Thank you for every lesson.</p>
          <p>Thank you for every sacrifice.</p>
          <p>Thank you for every moment.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 font-display italic text-xl sm:text-2xl text-[#FDFBF7]"
        >
          I am who I am today, because of you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="ornament mt-16 mb-6"
        >
          <Heart className="w-3 h-3" fill="currentColor" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <p className="font-hand text-2xl text-[#EAEAEA]/80">With all my love,</p>
          <p className="font-script text-6xl sm:text-7xl text-[#E8C66A] mt-1"
             style={{ textShadow: "0 0 30px rgba(212,175,55,0.5)" }}>
            Pranjlee
          </p>
          <p className="font-hand text-xl text-[#EAEAEA]/70 mt-2">
            — your daughter, forever and always
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2 }}
          className="mt-16 text-[10px] tracking-[0.4em] uppercase font-body text-[#E8C66A]/60"
        >
          made with love · for the greatest man i know
        </motion.p>
      </div>
    </section>
  );
}
