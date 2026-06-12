'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundFX() {
  const spotRef = useRef(null);
  const [stars, setStars] = useState([]);

  // Star field is generated after mount to avoid hydration mismatch.
  useEffect(() => {
    setStars(
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2.5,
      }))
    );
  }, []);

  // Cursor spotlight follows the mouse with rAF for smoothness.
  useEffect(() => {
    let raf = 0;
    let tx = -600;
    let ty = -600;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (spotRef.current) {
            spotRef.current.style.transform = `translate(${tx - 350}px, ${ty - 350}px)`;
          }
        });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* liquid blobs */}
      <div
        className="anim-blob-a absolute -top-40 -left-40 h-[34rem] w-[34rem] blur-[110px]"
        style={{
          opacity: 'var(--blob-o)',
          background: 'radial-gradient(circle at 35% 35%, #8b5cf6, transparent 65%)',
        }}
      />
      <div
        className="anim-blob-b absolute top-1/3 -right-52 h-[38rem] w-[38rem] blur-[120px]"
        style={{
          opacity: 'var(--blob-o)',
          background: 'radial-gradient(circle at 60% 40%, #22d3ee, transparent 65%)',
        }}
      />
      <div
        className="anim-blob-c absolute -bottom-56 left-1/4 h-[36rem] w-[36rem] rounded-full blur-[130px]"
        style={{
          opacity: 'calc(var(--blob-o) * 0.8)',
          background: 'radial-gradient(circle at 50% 50%, #e879f9, transparent 65%)',
        }}
      />

      {/* twinkling stars — fade out in light mode via --star-o */}
      <div className="stars absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* cursor spotlight */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 hidden h-[700px] w-[700px] rounded-full md:block"
        style={{
          background:
            'radial-gradient(circle, var(--spot) 0%, var(--spot-2) 35%, transparent 70%)',
          transform: 'translate(-600px, -600px)',
          willChange: 'transform',
        }}
      />

      {/* film grain */}
      <div className="grain" />
    </div>
  );
}
