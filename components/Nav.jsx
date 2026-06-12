'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Moon, Sun, Menu, X, Smartphone } from 'lucide-react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight the section currently in view
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    const apply = () => {
      setDark(next);
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {}
    };
    // buttery cross-fade where supported
    if (document.startViewTransition) document.startViewTransition(apply);
    else apply();
  };

  return (
    <>
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
      />

      <header className="fixed left-0 right-0 top-3 z-[60] flex justify-center px-4">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`glass flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'shadow-xl' : ''
          }`}
        >
          {/* brand */}
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="liquid-ring grid h-9 w-9 place-items-center rounded-xl">
              <Smartphone size={16} className="text-violet-400 transition-transform duration-500 group-hover:rotate-12" />
            </span>
            <span className="font-display text-sm font-bold tracking-wide sm:text-base">
              suleman<span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    active === l.id ? 'text-violet-400' : 'text-muted hover:text-violet-400'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-violet-500/10 ring-1 ring-violet-500/25"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="glass shine grid h-9 w-9 place-items-center rounded-xl transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && (
                  <motion.span
                    key={dark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.35 }}
                    className="grid place-items-center"
                  >
                    {dark ? (
                      <Sun size={16} className="text-amber-300" />
                    ) : (
                      <Moon size={16} className="text-violet-500" />
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* hire-me pill */}
            <a
              href="#contact"
              className="shine hidden rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition-transform duration-300 hover:scale-105 active:scale-95 md:block"
            >
              Hire me
            </a>

            {/* mobile burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="glass grid h-9 w-9 place-items-center rounded-xl md:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed left-4 right-4 top-20 z-[59] md:hidden"
          >
            <div className="glass-strong rounded-2xl p-3">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-violet-500/10 hover:text-violet-400"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-4 py-3 text-center text-sm font-bold text-white"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
