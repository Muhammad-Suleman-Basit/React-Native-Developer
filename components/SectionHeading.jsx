'use client';

import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="eyebrow mb-3">{`// ${eyebrow}`}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      <motion.div
        className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />
      {sub && (
        <Reveal delay={0.15}>
          <p className="text-muted mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
