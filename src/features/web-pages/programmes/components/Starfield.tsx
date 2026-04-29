"use client";

// Pre-computed star positions (deterministic — avoids hydration mismatch)
const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x:       ((i * 37.3 + 13) % 100).toFixed(2),
  y:       ((i * 61.7 + 7)  % 100).toFixed(2),
  size:    (i % 3) + 1,
  opacity: (0.15 + (i % 5) * 0.13).toFixed(2),
  dur:     (2 + (i % 4) * 0.7).toFixed(1),
  delay:   ((i % 5) * 0.6).toFixed(1),
}));

export function Starfield() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0%   { opacity: 0.1;  transform: scale(0.8); }
          100% { opacity: 0.95; transform: scale(1.3); }
        }
      `}</style>
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left:    `${s.x}%`,
            top:     `${s.y}%`,
            width:   s.size,
            height:  s.size,
            opacity: Number(s.opacity),
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
