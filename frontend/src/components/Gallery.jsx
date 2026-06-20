import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./Particles";
import { X, Heart } from "lucide-react";

const CARDS = [
  {
    id: "beginning",
    title: "The Beginning",
    subtitle: "where it all began",
    rotate: "-rotate-3",
    img: "/photos/img1.png",
    message:
      "Pappa, this is one of the earliest memories I have with you. I may not remember every detail, but I will always remember how safe I felt whenever you were around.",
  },
  {
    id: "hero",
    title: "My First Hero",
    subtitle: "my superhero",
    rotate: "rotate-2",
    img: "/photos/img2.jpg",
    message:
      "As a child I thought superheroes only existed in movies. Then I realized I already had one at home.",
  },
  {
    id: "teacher",
    title: "The Teacher",
    subtitle: "every lesson, every truth",
    rotate: "-rotate-2",
    img: "/photos/img3.jpg",
    message:
      "You taught me lessons that no classroom ever could. Discipline, honesty, respect and courage.",
  },
  {
    id: "sacrifice",
    title: "Every Sacrifice",
    subtitle: "the quiet ones",
    rotate: "rotate-3",
    img: "/photos/img4.jpg",
    message:
      "There were many sacrifices I never noticed when I was young. Today I understand them and appreciate every single one.",
  },
  {
    id: "achievement",
    title: "Every Achievement",
    subtitle: "behind every step of mine",
    rotate: "-rotate-1",
    img: "/photos/img5.jpg",
    message:
      "Behind every achievement of mine there is a silent contribution from you. Thank you for believing in me even when I doubted myself.",
  },
  {
    id: "grateful",
    title: "Forever Grateful",
    subtitle: "always and always",
    rotate: "rotate-2",
    img: "/photos/img6.jpg",
    message:
      "No matter where life takes me, I will always be grateful to call you my father.",
  },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #02050E 0%, #0A1128 30%, #0F1A3A 70%, #0A1128 100%)",
      }}
    >
      <Particles count={18} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="ornament mb-6">
            <span className="font-hand text-2xl text-[#E8C66A]">memories</span>
          </div>
          <h2 className="font-display italic text-5xl sm:text-6xl lg:text-7xl text-[#FDFBF7] leading-tight">
            Our Journey <span className="text-[#E8C66A]">Together</span>
          </h2>
          <p className="mt-6 font-hand text-2xl sm:text-3xl text-[#EAEAEA]/80">
            Every picture holds a story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 pt-6 pb-4 px-2">
          {CARDS.map((card, idx) => (
            <motion.button
              key={card.id}
              data-testid={`polaroid-card-${card.id}`}
              type="button"
              onClick={() => setActive(card)}
              layoutId={`card-${card.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`polaroid relative text-left ${card.rotate}`}
              style={{ transform: undefined }}
              aria-label={`Open memory: ${card.title}`}
            >
              <div className="tape" />
              {card.img ? (
                <motion.img
                  layoutId={`img-${card.id}`}
                  src={card.img}
                  alt={card.title}
                  className="polaroid-photo block"
                  draggable="false"
                />
              ) : (
                <motion.div
                  layoutId={`img-${card.id}`}
                  className="polaroid-photo flex items-center justify-center text-center px-4"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #E8DCB8 0 14px, #DCCFA4 14px 28px)",
                  }}
                >
                  <div className="text-[#5A4A30]">
                    <p className="font-hand text-2xl leading-tight">your photo,<br/>coming soon</p>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] mt-3 text-[#8B6F30]">reserved · 06 / 06</p>
                  </div>
                </motion.div>
              )}
              <div className="px-2 pt-4">
                <motion.h3
                  layoutId={`title-${card.id}`}
                  className="font-hand text-2xl text-[#2A2114] leading-none"
                >
                  {card.title}
                </motion.h3>
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.22em] text-[#5A4A30]">
                  {card.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Postcard modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            style={{
              background: "rgba(2, 5, 14, 0.75)",
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
            }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`card-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className="postcard w-[92vw] sm:w-[85vw] md:w-[75vw] lg:w-[70vw] max-w-5xl max-h-[88vh] overflow-hidden grid grid-cols-1 md:grid-cols-2"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                layoutId={`img-${active.id}`}
                className="relative h-64 md:h-auto"
              >
                {active.img ? (
                  <>
                    <img
                      src={active.img}
                      alt={active.title}
                      className="absolute inset-0 w-full h-full object-cover postcard-photo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F4ECD8]/40 md:to-[#F4ECD8]/60" />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-center px-6"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, #E8DCB8 0 18px, #DCCFA4 18px 36px)",
                    }}
                  >
                    <div className="text-[#5A4A30]">
                      <p className="font-hand text-3xl leading-tight">your photo,<br/>coming soon</p>
                      <p className="font-body text-[10px] uppercase tracking-[0.3em] mt-4 text-[#8B6F30]">reserved spot · for Pappa</p>
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="relative p-7 sm:p-10 md:p-12 flex flex-col justify-between">
                <button
                  data-testid="close-postcard-btn"
                  onClick={() => setActive(null)}
                  aria-label="Close memory"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border border-[#2A2114]/20 hover:bg-[#2A2114] hover:text-[#FDFBF7] text-[#2A2114] transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.4em] text-[#8B6F30]">
                    Memory · {String(CARDS.findIndex((c) => c.id === active.id) + 1).padStart(2, "0")} / 06
                  </p>
                  <motion.h3
                    layoutId={`title-${active.id}`}
                    className="mt-2 font-display italic text-3xl sm:text-4xl md:text-5xl text-[#1A1408] leading-tight"
                  >
                    {active.title}
                  </motion.h3>
                  <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  <p className="mt-6 font-body text-base sm:text-lg text-[#2A2114]/85 leading-relaxed">
                    {active.message}
                  </p>
                </div>

                <div className="mt-10 flex items-end justify-between">
                  <div>
                    <p className="font-hand text-2xl text-[#5A4A30]">
                      For Pappa,
                    </p>
                    <p className="font-hand text-3xl text-[#1A1408]">
                      from Pranjlee
                    </p>
                  </div>
                  <Heart className="w-6 h-6 text-[#D4AF37]" fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
