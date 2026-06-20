import React, { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const MUSIC_SRC = "/audio/background.mp3";

export default function MusicToggle({ autoStart }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.28;
    a.loop = true;
    const onCanPlay = () => setReady(true);
    a.addEventListener("canplay", onCanPlay);
    return () => a.removeEventListener("canplay", onCanPlay);
  }, []);

  useEffect(() => {
    if (autoStart && ready && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [autoStart, ready]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      // Optimistically reflect user intent; revert if audio cannot play
      setPlaying(true);
      const p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => setPlaying(false));
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" />
      <button
        type="button"
        onClick={toggle}
        data-testid="music-toggle-btn"
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-2.5 rounded-full pl-3.5 pr-4 py-2.5 glass border border-[rgba(212,175,55,0.4)] text-[#E8C66A] hover:text-white transition-all duration-500 hover:border-[rgba(212,175,55,0.9)]"
        style={{
          boxShadow: playing
            ? "0 0 30px -4px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 8px 25px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {playing ? (
          <>
            <span className="flex items-end h-4">
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </span>
            <span className="text-xs uppercase tracking-[0.18em] font-medium">Playing</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-medium">Music</span>
          </>
        )}
      </button>
    </>
  );
}
