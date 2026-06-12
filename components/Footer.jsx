'use client';

import { ArrowUp, Heart } from 'lucide-react';
import Magnetic from './Magnetic';
import { CONTACT } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-5 pb-10 sm:px-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
        <p className="text-muted text-sm">
          © 2026 {CONTACT.name}. Designed & built with{' '}
          <Heart size={13} className="mx-0.5 inline text-fuchsia-500" fill="currentColor" /> using
          Next.js, React & Tailwind CSS.
        </p>
        <Magnetic strength={0.45}>
          <a
            href="#top"
            aria-label="Back to top"
            className="glass shine grid h-11 w-11 place-items-center rounded-xl transition-all duration-300 hover:scale-110 hover:text-violet-400"
          >
            <ArrowUp size={18} />
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
