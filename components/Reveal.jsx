'use client';

import { motion } from 'framer-motion';

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
