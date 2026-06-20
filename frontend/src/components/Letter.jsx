import React from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";

export default function Letter() {
  const paragraphs = [
    "There are some words I never said out loud, so I am writing them here, in a quiet little corner of the internet, just for you.",
    "Pappa, you were my first friend, my first teacher, and my first idea of what 'strong' really means. You held my hand when I was learning to walk, and you have never really let it go since then.",
    "I have watched you wake up early so we could sleep peacefully. I have watched you choose us, again and again, without ever making it sound like a sacrifice.",
    "You taught me that love is not always loud. Sometimes it is a packed lunch. Sometimes it is a worried call when I am late. Sometimes it is the quiet way you stand behind me when the world feels heavy.",
    "Every time I have been brave, it is because you showed me how. Every time I have been kind, it is because you were kind to me first.",
    "Thank you for every late night, every silent prayer, every gentle correction and every proud smile you tried to hide.",
    "I love you, Pappa. More than I will ever know how to say.",
  ];

  return (
    <section
      id="letter"
      data-testid="letter-section"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0A1128 0%, #050914 60%, #0A1128 100%)",
      }}
    >
      <Particles count={14} />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="ornament mb-4">
            <span className="font-hand text-2xl text-[#E8C66A]">a letter</span>
          </div>
          <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7]">
            For your eyes only, Pappa
          </h2>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="letter-paper relative mx-auto px-8 py-12 sm:px-14 sm:py-16 md:px-20 md:py-20"
          style={{ borderRadius: "4px" }}
        >
          <div className="relative z-10">
            <p className="font-hand text-3xl sm:text-4xl text-[#1A1408] mb-8">
              Dear Pappa,
            </p>

            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="font-hand text-xl sm:text-2xl md:text-[26px] leading-[1.55] text-[#2A2114]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-end">
              <p className="font-hand text-2xl text-[#5A4A30]">
                Yours, always —
              </p>
              <p className="font-script text-5xl sm:text-6xl text-[#1A1408] -mt-1 -rotate-3">
                Pranjlee
              </p>
              <p className="font-hand text-base text-[#5A4A30] mt-1">
                your daughter
              </p>
            </div>

            {/* Wax seal */}
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #C24A2C 0%, #8C2A18 70%, #5A1A0E 100%)",
                boxShadow: "0 12px 30px -8px rgba(0,0,0,0.6), inset 0 4px 10px rgba(255,255,255,0.15), inset 0 -6px 12px rgba(0,0,0,0.4)",
                transform: "rotate(-12deg)",
              }}
            >
              <span className="font-display italic text-[#FDE3C7] text-xl sm:text-2xl tracking-tight">P</span>
            </div>
          </div>
        </motion.article>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14 text-center font-hand text-xl text-[#E8C66A]/80"
        >
          (please keep reading… one more page)
        </motion.p>
      </div>
    </section>
  );
}
