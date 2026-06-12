'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Home,
  ListChecks,
  BarChart3,
  Wifi,
  Signal,
  BatteryFull,
  Check,
  Loader2,
  Flame,
  Bell,
} from 'lucide-react';

const TABS = [Home, ListChecks, BarChart3];
const INTERVAL = 4200;

/* ----------------------------- screens ----------------------------- */

function ScreenProfile() {
  return (
    <div className="flex h-full flex-col px-4 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-wide text-white/90">My Profile</p>
        <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/10">
          <Bell size={11} className="text-white/80" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-fuchsia-400" />
        </span>
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        className="mx-auto mt-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 p-[2.5px]"
      >
        <span className="grid h-full w-full place-items-center rounded-full bg-[#101024] font-display text-base font-bold text-white">
          MS
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-2 text-center text-[13px] font-bold text-white"
      >
        Muhammad Suleman
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-center text-[10px] text-white/55"
      >
        React Native Developer
      </motion.p>

      <div className="mt-3 flex justify-center gap-1.5">
        {['React Native', 'Expo', 'JS'].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
            className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-semibold text-white/85 ring-1 ring-white/15"
          >
            {t}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 rounded-2xl bg-gradient-to-r from-violet-600/35 to-cyan-500/25 p-3 ring-1 ring-white/15"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" style={{ animation: 'ping-ring 1.6s ease-out infinite' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <p className="text-[10px] font-bold text-white">Open to internships</p>
        </div>
        <p className="mt-1 text-[9px] leading-relaxed text-white/60">
          Building cross-platform apps & learning fast.
        </p>
      </motion.div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ['1.5+', 'yrs in tech'],
          ['100%', 'commitment'],
        ].map(([v, l], i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + i * 0.1 }}
            className="rounded-xl bg-white/[0.07] p-2 text-center ring-1 ring-white/10"
          >
            <p className="font-display text-sm font-bold text-cyan-300">{v}</p>
            <p className="text-[8px] text-white/55">{l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScreenRoadmap() {
  const items = [
    { label: 'Components & JSX', done: true },
    { label: 'Hooks & state', done: true },
    { label: 'Navigation', done: true },
    { label: 'Native device APIs', done: false },
  ];
  return (
    <div className="flex h-full flex-col px-4 pt-3">
      <p className="text-[11px] font-bold tracking-wide text-white/90">Learning roadmap</p>
      <p className="text-[9px] text-white/50">React Native — week 12</p>

      <div className="mt-3 space-y-2">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.14, type: 'spring', stiffness: 260, damping: 22 }}
            className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] p-2.5 ring-1 ring-white/10"
          >
            {it.done ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.14, type: 'spring', stiffness: 400, damping: 14 }}
                className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400"
              >
                <Check size={11} className="text-white" strokeWidth={3.5} />
              </motion.span>
            ) : (
              <span className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-white/30">
                <Loader2 size={11} className="animate-spin text-fuchsia-300" />
              </span>
            )}
            <p className={`text-[10px] font-semibold ${it.done ? 'text-white/85' : 'text-white/60'}`}>
              {it.label}
            </p>
            {!it.done && (
              <span className="ml-auto rounded-full bg-fuchsia-500/20 px-1.5 py-0.5 text-[7.5px] font-bold text-fuchsia-300">
                NOW
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto mb-3"
      >
        <div className="mb-1 flex justify-between text-[9px] text-white/55">
          <span>Overall progress</span>
          <span className="font-bold text-cyan-300">68%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ delay: 0.9, duration: 1.1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
          />
        </div>
      </motion.div>
    </div>
  );
}

function ScreenStats() {
  const bars = [38, 60, 45, 80, 55, 92, 70];
  const R = 24;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex h-full flex-col px-4 pt-3">
      <p className="text-[11px] font-bold tracking-wide text-white/90">This week</p>
      <p className="text-[9px] text-white/50">Hours of building & learning</p>

      <div className="mt-3 flex h-[88px] items-end justify-between gap-1.5 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
            style={{ height: `${h}%`, transformOrigin: 'bottom' }}
            className={`w-full rounded-md ${
              i === 5
                ? 'bg-gradient-to-t from-violet-500 to-cyan-300'
                : 'bg-gradient-to-t from-violet-500/45 to-fuchsia-400/45'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 rounded-xl bg-white/[0.07] p-2.5 ring-1 ring-white/10"
        >
          <Flame size={16} className="text-amber-400" />
          <div>
            <p className="font-display text-xs font-bold text-white">24 days</p>
            <p className="text-[8px] text-white/55">coding streak</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.07] p-2 ring-1 ring-white/10"
        >
          <svg width="44" height="44" viewBox="0 0 60 60" className="-rotate-90">
            <circle cx="30" cy="30" r={R} stroke="rgba(255,255,255,0.12)" strokeWidth="5" fill="none" />
            <motion.circle
              cx="30"
              cy="30"
              r={R}
              stroke="url(#ringGrad)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * 0.28 }}
              transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <p className="font-display text-xs font-bold text-white">72%</p>
            <p className="text-[8px] text-white/55">weekly goal</p>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto mb-3 text-center text-[9px] text-white/45"
      >
        Consistency &gt; intensity 🚀
      </motion.p>
    </div>
  );
}

/* ------------------------------ phone ------------------------------ */

function PhoneMockup() {
  const [screen, setScreen] = useState(0);
  const timer = useRef(null);
  const rootRef = useRef(null);
  // Pause the auto-cycle (and its spring animations) while offscreen.
  const inView = useInView(rootRef, { amount: 0.25 });

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setScreen((s) => (s + 1) % 3), INTERVAL);
  };

  useEffect(() => {
    if (!inView) return;
    startTimer();
    return () => clearInterval(timer.current);
  }, [inView]);

  const pick = (i) => {
    setScreen(i);
    startTimer(); // restart auto-cycle after a manual tap
  };

  const screens = [<ScreenProfile key="p" />, <ScreenRoadmap key="r" />, <ScreenStats key="s" />];

  return (
    <div ref={rootRef} className="relative" style={{ perspective: '1400px' }}>
      {/* glow under the device — soft radial gradient, no blur() filter */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.3) 0%, rgba(232,121,249,0.16) 40%, rgba(34,211,238,0.1) 60%, transparent 75%)',
        }}
      />

      {/* frame */}
      <div className="relative mx-auto h-[560px] w-[270px] rounded-[3rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700 p-[3px] shadow-2xl shadow-violet-900/40 sm:h-[590px] sm:w-[285px]">
        {/* side buttons */}
        <span className="absolute -left-[2.5px] top-28 h-10 w-[3px] rounded-l bg-zinc-500" />
        <span className="absolute -left-[2.5px] top-40 h-10 w-[3px] rounded-l bg-zinc-500" />
        <span className="absolute -right-[2.5px] top-32 h-16 w-[3px] rounded-r bg-zinc-500" />

        <div className="relative h-full w-full overflow-hidden rounded-[2.8rem] bg-[#0b0b1d]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black">
            <span className="absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-zinc-800 ring-1 ring-zinc-700" />
          </div>

          {/* status bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-3.5 text-white">
            <span className="text-[11px] font-bold">9:41</span>
            <span className="flex items-center gap-1">
              <Signal size={11} />
              <Wifi size={11} />
              <BatteryFull size={13} />
            </span>
          </div>

          {/* screen content */}
          <div className="absolute inset-x-0 bottom-[58px] top-[44px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={screen}
                initial={{ opacity: 0, x: 56, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -56, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="h-full"
              >
                {screens[screen]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* tab bar — actually tappable */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-around rounded-2xl bg-white/[0.07] px-2 py-2 ring-1 ring-white/10 backdrop-blur-md">
            {TABS.map((Icon, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                aria-label={`App screen ${i + 1}`}
                className="relative grid h-9 w-12 place-items-center rounded-xl"
              >
                {screen === i && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/70 to-cyan-500/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={17}
                  className={`relative transition-colors ${screen === i ? 'text-white' : 'text-white/40'}`}
                />
              </button>
            ))}
          </div>

          {/* moving screen sheen */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.8rem]">
            <div
              className="absolute -inset-x-10 h-32 rotate-12 bg-gradient-to-b from-white/[0.07] to-transparent"
              style={{ animation: 'scan 9s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// memo: the hero's typewriter used to re-render this whole tree every ~65ms
export default memo(PhoneMockup);
