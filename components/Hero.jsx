'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Linkedin, Mail, MessageCircle, ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import Magnetic from './Magnetic';
import { CONTACT, TYPING_ROLES } from '@/lib/data';

/* typewriter */
function useTypewriter(words, typeMs = 65, deleteMs = 35, holdMs = 1700) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteMs : typeMs
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}

/* Isolated so the 65ms typing ticks only re-render this tiny span,
   not the whole hero (phone mockup, buttons, socials…). */
function TypedRole() {
  const typed = useTypewriter(TYPING_ROLES);
  return <span className="text-gradient">{typed}</span>;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const ORBIT_CHIPS = [
  { label: '⚛︎ React Native', pos: 'left-[-12%] top-[12%]' },
  { label: '{ } JavaScript', pos: 'right-[-14%] top-[30%]' },
  { label: '▲ Expo', pos: 'left-[-8%] bottom-[22%]' },
  { label: '</> JSX', pos: 'right-[-6%] bottom-[8%]' },
];

export default function Hero() {
  // 3D tilt for the phone
  const rx = useSpring(useMotionValue(0), { stiffness: 110, damping: 14 });
  const ry = useSpring(useMotionValue(0), { stiffness: 110, damping: 14 });

  const onTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(py * -10);
    ry.set(px * 12);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="top" className="hero-min-h relative mx-auto flex max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pt-24">
      <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        {/* ------------ copy ------------ */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 glass shine">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" style={{ animation: 'ping-ring 1.8s ease-out infinite' }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-bold tracking-wide sm:text-sm">
              Open to React Native internships
            </span>
            <Sparkles size={14} className="text-amber-400" />
          </motion.div>

          <motion.p variants={item} className="text-muted mb-3 text-lg font-semibold sm:text-xl">
            <span className="anim-wave">👋</span> Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Muhammad
            <br />
            <span className="text-gradient">Suleman</span>
          </motion.h1>

          {/* min-h + wrap: a fixed h-9 clipped the longer roles when they
              wrapped to two lines on narrow phones */}
          <motion.div variants={item} className="mt-5 flex min-h-9 flex-wrap items-center font-display text-lg font-semibold sm:text-2xl">
            <span className="text-muted mr-2">I&apos;m a</span>
            <TypedRole />
            <span className="anim-caret ml-1 inline-block h-6 w-[3px] rounded bg-fuchsia-400 sm:h-7" />
          </motion.div>

          <motion.p variants={item} className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            CS graduate from Pakistan turning a background in{' '}
            <span className="font-semibold text-violet-400">QA, Linux & project management</span>{' '}
            into a craft I love — building smooth, cross-platform mobile apps with{' '}
            <span className="font-semibold text-cyan-400">React Native & Expo</span>. Junior by
            title, relentless by habit.
          </motion.p>

          {/* stacked full-width CTAs on phones, inline on larger screens */}
          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="shine group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-fuchsia-600/30 transition-transform duration-300 active:scale-95 sm:w-auto"
              >
                Let&apos;s talk
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <a
                href="#skills"
                className="glass shine inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-bold transition-transform duration-300 hover:scale-105 active:scale-95 sm:w-auto"
              >
                View skills
              </a>
            </Magnetic>
          </motion.div>

          {/* socials */}
          <motion.div variants={item} className="mt-9 flex items-center gap-3">
            {[
              { Icon: Linkedin, href: CONTACT.linkedin, label: 'LinkedIn' },
              { Icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
              { Icon: MessageCircle, href: `https://wa.me/${CONTACT.whatsapp}`, label: 'WhatsApp' },
            ].map(({ Icon, href, label }) => (
              <Magnetic key={label} strength={0.4}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass shine grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 hover:scale-110 hover:text-violet-400"
                >
                  <Icon size={18} />
                </a>
              </Magnetic>
            ))}
            <span className="text-muted ml-1 hidden text-xs sm:block">— always one tap away</span>
          </motion.div>
        </motion.div>

        {/* ------------ phone ------------ */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto"
          onMouseMove={onTilt}
          onMouseLeave={resetTilt}
        >
          {/* orbiting glass chips */}
          {ORBIT_CHIPS.map((c, i) => (
            <span
              key={c.label}
              className={`chip anim-float absolute z-20 hidden rounded-xl px-3 py-1.5 text-xs font-bold sm:block ${c.pos}`}
              style={{ animationDelay: `${i * 0.9}s`, animationDuration: `${5.5 + i}s` }}
            >
              {c.label}
            </span>
          ))}

          {/* dashed orbit ring */}
          <div className="anim-spin-slow absolute left-1/2 top-1/2 -z-10 hidden h-[125%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet-400/25 sm:block" />

          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="anim-float-slow">
            <PhoneMockup />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-muted absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold lg:flex"
        aria-label="Scroll to about"
      >
        <span>scroll</span>
        <ChevronDown size={16} className="anim-bounce-down" />
      </motion.a>
    </section>
  );
}
