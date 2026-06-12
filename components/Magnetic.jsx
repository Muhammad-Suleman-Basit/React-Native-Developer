'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 16, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 16, mass: 0.6 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
