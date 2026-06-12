'use client';

import { useState } from 'react';
import { MessageCircle, Mail, Linkedin, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { CONTACT } from '@/lib/data';

const CHANNELS = [
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    desc: 'Fastest way to reach me',
    href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Suleman! Saw your portfolio — let's talk.")}`,
    glow: 'from-emerald-500/30 to-teal-400/20',
    icon: 'text-emerald-400',
    ring: 'ring-emerald-500/25',
  },
  {
    Icon: Mail,
    label: 'Gmail',
    desc: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    glow: 'from-rose-500/30 to-amber-400/20',
    icon: 'text-rose-400',
    ring: 'ring-rose-500/25',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    desc: 'Let’s connect professionally',
    href: CONTACT.linkedin,
    glow: 'from-sky-500/30 to-cyan-400/20',
    icon: 'text-sky-400',
    ring: 'ring-sky-500/25',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="contact"
        title={
          <>
            Let&apos;s build something <span className="text-gradient">people tap</span>
          </>
        }
        sub="Hiring a junior React Native dev or offering an internship? I reply fast, learn faster, and show up every day."
      />

      <Reveal>
        <div className="liquid-ring rounded-[2rem]">
          <div className="glass-strong rounded-[2rem] p-6 sm:p-10">
            {/* min-w-0 on grid items: without it the unbreakable email address
                sets the grid column's minimum width and all cards overflow the
                card container on phones */}
            <div className="grid gap-4 sm:grid-cols-2">
              {CHANNELS.map(({ Icon, label, desc, href, glow, icon, ring }, i) => (
                <Reveal key={label} delay={0.08 * i} className={`min-w-0 ${label === 'LinkedIn' ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.5rem)]' : ''}`}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`glass shine group flex min-w-0 items-center gap-4 rounded-2xl bg-gradient-to-br ${glow} p-5 ring-1 ${ring} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}
                  >
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 ${icon} ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-base font-bold">{label}</span>
                      <span className="text-muted block truncate text-sm">{desc}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-muted ml-auto shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-current" />
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-muted flex items-center gap-2 text-sm font-semibold">
                <MapPin size={16} className="text-fuchsia-400" />
                {CONTACT.location}
              </p>

              <Magnetic strength={0.25}>
                <button
                  onClick={copyEmail}
                  className="glass shine inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check size={15} className="text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy email
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
