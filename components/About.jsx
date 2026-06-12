'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Smartphone, GitBranch, Bug, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { STATS } from '@/lib/data';

function CountUp({ value, decimals = 0, suffix = '', plain = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const shown = plain ? Math.round(n) : n.toFixed(decimals);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

const STRENGTHS = [
  { Icon: Smartphone, label: 'Mobile-first mindset' },
  { Icon: GitBranch, label: 'CI/CD & Git workflows' },
  { Icon: Bug, label: 'QA-grade attention to detail' },
  { Icon: Users, label: 'Agile team communication' },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="about"
        title={
          <>
            The story so <span className="text-gradient">far</span>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* story */}
        <Reveal>
          <div className="glass shine h-full rounded-3xl p-7 sm:p-9">
            <p className="text-base leading-relaxed sm:text-lg">
              I didn&apos;t start in mobile — and that&apos;s my advantage. After graduating in
              Computer Science (2024), I spent my first years in tech doing the unglamorous,
              essential work:{' '}
              <span className="font-semibold text-violet-400">testing software</span>,{' '}
              <span className="font-semibold text-fuchsia-400">keeping Linux systems alive</span>{' '}
              and{' '}
              <span className="font-semibold text-cyan-400">
                coordinating teams that ship real apps
              </span>
              .
            </p>
            <p className="text-muted mt-5 text-base leading-relaxed sm:text-lg">
              Watching mobile developers build products people actually hold in their hands is
              what pulled me in. Now I&apos;m all-in on React Native — writing JavaScript daily,
              shipping practice builds with Expo, and bringing a debugger&apos;s patience and a
              PM&apos;s communication to every line of code.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {STRENGTHS.map(({ Icon, label }, i) => (
                <Reveal key={label} delay={0.1 + i * 0.08}>
                  <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/30 text-violet-400 ring-1 ring-violet-500/25">
                      <Icon size={16} />
                    </span>
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* stats */}
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.1}>
              <div className="glass shine group flex h-full flex-col justify-center rounded-3xl p-5 text-center transition-transform duration-300 hover:-translate-y-1.5 sm:p-6">
                <p className="font-display text-3xl font-bold sm:text-4xl">
                  <span className="text-gradient">
                    <CountUp {...s} />
                  </span>
                </p>
                <p className="text-muted mt-2 text-xs font-semibold leading-snug sm:text-sm">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
