'use client';

import { motion } from 'framer-motion';
import { BookOpenCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { CORE_SKILLS, TOOLBELT, LEARNING_NOW } from '@/lib/data';

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-hover relative overflow-hidden py-2">
      <div className={`marquee-track gap-3 ${reverse ? 'reverse' : ''}`}>
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            // .chip, not .glass — backdrop-filter on constantly-moving
            // elements forces a backdrop resample every single frame
            className="chip whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:text-violet-400"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="skills"
        title={
          <>
            Honest about where <span className="text-gradient">I am</span>
          </>
        }
        sub="No inflated percentages here — these bars show exactly where a motivated junior stands today, and exactly where the curve is pointing."
      />

      {/* core skill cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_SKILLS.map((s, i) => (
          <Reveal key={s.name} delay={(i % 4) * 0.08}>
            <div className="glass shine group h-full rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600/25 to-cyan-500/25 text-xl ring-1 ring-violet-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {s.icon}
                </span>
                <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400 ring-1 ring-violet-500/25">
                  {s.tag}
                </span>
              </div>
              <p className="mt-4 font-display text-sm font-bold sm:text-base">{s.name}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-500/10 ring-1 ring-violet-500/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                />
              </div>
              <p className="text-muted mt-2 text-right text-xs font-bold">{s.level}%</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* toolbelt marquee */}
      <Reveal className="mt-14">
        <p className="eyebrow mb-4">{`// everyday toolbelt`}</p>
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <MarqueeRow items={TOOLBELT.slice(0, 9)} />
          <MarqueeRow items={TOOLBELT.slice(9)} reverse />
        </div>
      </Reveal>

      {/* currently learning */}
      <Reveal className="mt-12" delay={0.1}>
        <div className="liquid-ring rounded-3xl">
          <div className="glass-strong rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-600/30 to-amber-400/25 text-fuchsia-400 ring-1 ring-fuchsia-500/25">
                <BookOpenCheck size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold sm:text-xl">Currently learning</h3>
                <p className="text-muted text-sm">The roadmap never stops.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {LEARNING_NOW.map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.09, type: 'spring', stiffness: 280, damping: 18 }}
                  className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
                >
                  <span className="anim-pulse-soft h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400" style={{ animationDelay: `${i * 0.3}s` }} />
                  {l}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
