'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Briefcase, GraduationCap, Smartphone } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { EXPERIENCE, EDUCATION } from '@/lib/data';

export default function Experience() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 75%', 'end 65%'],
  });

  return (
    <section id="experience" className="relative mx-auto max-w-6xl scroll-mt-28 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="experience"
        title={
          <>
            Earned in the <span className="text-gradient">field</span>
          </>
        }
        sub="Every role below taught me something I now pour straight into mobile development."
      />

      <div ref={lineRef} className="relative pl-8 sm:pl-12">
        {/* rail + animated draw */}
        <span className="absolute bottom-2 left-[11px] top-2 w-px bg-violet-500/15 sm:left-[15px]" />
        <motion.span
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-400 sm:left-[15px]"
        />

        <div className="space-y-10">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.role} delay={0.05}>
              <article className="relative">
                {/* node */}
                <span className="absolute -left-8 top-7 grid h-6 w-6 place-items-center sm:-left-12 sm:h-8 sm:w-8">
                  <span className="absolute h-full w-full rounded-full bg-violet-500/30" style={{ animation: 'ping-ring 2.2s ease-out infinite', animationDelay: `${i * 0.4}s` }} />
                  <span className="relative grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-600/40 sm:h-8 sm:w-8">
                    <Briefcase size={13} />
                  </span>
                </span>

                <div className="glass shine rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold sm:text-xl">{job.role}</h3>
                      <p className="text-sm font-semibold text-violet-400">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {job.badge && (
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                          {job.badge}
                        </span>
                      )}
                      <span className="glass rounded-full px-3.5 py-1.5 text-xs font-bold">
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="text-muted flex gap-2.5 text-sm leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600/10 to-cyan-500/10 p-3.5 ring-1 ring-violet-500/15">
                    <Smartphone size={15} className="mt-0.5 shrink-0 text-cyan-400" />
                    <p className="text-sm">
                      <span className="font-bold text-cyan-400">Mobile takeaway: </span>
                      <span className="text-muted italic">{job.takeaway}</span>
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {/* education */}
          <Reveal delay={0.05}>
            <article className="relative">
              <span className="absolute -left-8 top-7 grid h-6 w-6 place-items-center sm:-left-12 sm:h-8 sm:w-8">
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-fuchsia-500 text-white shadow-lg shadow-amber-500/30 sm:h-8 sm:w-8">
                  <GraduationCap size={14} />
                </span>
              </span>
              <div className="glass shine flex flex-wrap items-center justify-between gap-3 rounded-3xl p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-lg font-bold sm:text-xl">{EDUCATION.degree}</h3>
                  <p className="text-sm font-semibold text-violet-400">{EDUCATION.school}</p>
                  <p className="text-muted mt-1 text-sm">{EDUCATION.place}</p>
                </div>
                <span className="glass rounded-full px-3.5 py-1.5 text-xs font-bold">
                  {EDUCATION.period}
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
