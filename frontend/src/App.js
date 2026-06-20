import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Surprise from "./components/Surprise";
import Gallery from "./components/Gallery";
import Letter from "./components/Letter";
import Closing from "./components/Closing";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  const [opened, setOpened] = useState(false);
  const galleryRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
    // Allow render then scroll to gallery
    setTimeout(() => {
      const el = document.getElementById("gallery");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);
  };

  return (
    <div className="App relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Surprise onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="journey"
            ref={galleryRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Gallery />
            <Letter />
            <Closing />
          </motion.div>
        )}
      </AnimatePresence>

      <MusicToggle autoStart={opened} />
    </div>
  );
}
