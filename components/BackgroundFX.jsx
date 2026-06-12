'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundFX() {
  const spotRef = useRef(null);
  // Stars are batched into 3 box-shadow layers (3 composited layers
  // instead of 70) — each layer twinkles as a group on its own rhythm.
  const [starLayers, setStarLayers] = useState([]);

  // Star field is generated after mount to avoid hydration mismatch.
  useEffect(() => {
    const makeLayer = (count) =>
      Array.from({ length: count }, () => {
        const x = (Math.random() * 100).toFixed(2);
        const y = (Math.random() * 100).toFixed(2);
        const spread = Math.random() > 0.6 ? 1 : 0;
        return `${x}vw ${y}vh 0 ${spread}px rgba(255,255,255,0.85)`;
      }).join(', ');

    setStarLayers([
      { id: 0, shadows: makeLayer(20), duration: 3.2, delay: 0 },
      { id: 1, shadows: makeLayer(18), duration: 4.4, delay: 1.3 },
      { id: 2, shadows: makeLayer(18), duration: 5.6, delay: 2.4 },
    ]);
  }, []);

  // Cursor spotlight follows the mouse with rAF for smoothness.
  // Skipped entirely on touch devices — the element is hidden there anyway.
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
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
            spotRef.current.style.transform = `translate3d(${tx - 350}px, ${ty - 350}px, 0)`;
          }
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* liquid blobs — soft radial gradients, no blur() filter:
          a gradient fading to transparent looks the same as a blurred
          disc but costs nothing to composite */}
      <div
        className="anim-blob-a absolute -top-40 -left-40 h-[34rem] w-[34rem]"
        style={{
          opacity: 'var(--blob-o)',
          background:
            'radial-gradient(circle at 40% 40%, rgba(139,92,246,0.55) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)',
        }}
      />
      <div
        className="anim-blob-b absolute top-1/3 -right-52 h-[38rem] w-[38rem]"
        style={{
          opacity: 'var(--blob-o)',
          background:
            'radial-gradient(circle at 55% 45%, rgba(34,211,238,0.5) 0%, rgba(34,211,238,0.16) 40%, transparent 70%)',
        }}
      />
      <div
        className="anim-blob-c absolute -bottom-56 left-1/4 h-[36rem] w-[36rem]"
        style={{
          opacity: 'calc(var(--blob-o) * 0.8)',
          background:
            'radial-gradient(circle at 50% 50%, rgba(232,121,249,0.5) 0%, rgba(232,121,249,0.16) 40%, transparent 70%)',
        }}
      />

      {/* twinkling stars — fade out in light mode via --star-o */}
      <div className="stars absolute inset-0">
        {starLayers.map((l) => (
          <span
            key={l.id}
            className="absolute left-0 top-0 h-[2px] w-[2px] rounded-full"
            style={{
              boxShadow: l.shadows,
              animation: `twinkle ${l.duration}s ease-in-out ${l.delay}s infinite`,
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
          transform: 'translate3d(-600px, -600px, 0)',
          willChange: 'transform',
        }}
      />

      {/* film grain */}
      <div className="grain" />
    </div>
  );
}
