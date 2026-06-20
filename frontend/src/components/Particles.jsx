import React from "react";

// Generates floating gold particles using inline styles (no external libs)
export default function Particles({ count = 24, className = "" }) {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = 3 + Math.random() * 6;
      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 18;
      const delay = Math.random() * -duration;
      const opacity = 0.4 + Math.random() * 0.5;
      return { i, size, left, duration, delay, opacity };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.i}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: "100%",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
