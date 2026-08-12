import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Briefcase } from 'lucide-react'
import { experience } from '../data/content'
import { EASE } from './ui/motion'

/**
 * Career timeline drawn as a dotted arc with a marker at its apex. The period
 * label sits above the arc, the role inside it, and a white company pill with
 * prev/next controls sits on the baseline — as in the reference.
 */
export default function Experience() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const entries = experience.entries
  const entry = entries[index]

  const step = (delta) =>
    setIndex((current) => (current + delta + entries.length) % entries.length)

  return (
    <section aria-labelledby="experience-heading" className="section overflow-hidden">
      <div className="shell">
        <h2 id="experience-heading" className="sr-only">
          Experience timeline
        </h2>

        {/* Period */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={entry.period}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-center font-display text-xl font-bold text-accent"
          >
            {entry.period}
          </motion.p>
        </AnimatePresence>

        <div className="relative mx-auto mt-4 max-w-3xl">
          {/* Dotted arc */}
          <svg
            viewBox="0 0 600 260"
            className="h-auto w-full"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M 30 250 A 270 250 0 0 1 570 250"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 12"
            />
          </svg>

          {/* Apex marker */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center"
          >
            <span className="h-5 w-px bg-accent/70" />
            <span className="mt-1 grid h-5 w-5 place-items-center rounded-full border-2 border-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          </span>

          {/* Role, centred inside the arc */}
          <div className="absolute inset-x-0 top-[38%] px-6 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={entry.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="font-display text-[clamp(1.5rem,3.4vw,2.25rem)] font-light leading-tight">
                  {entry.role}
                </p>
                <p className="font-display text-[clamp(1.75rem,4.2vw,2.75rem)] font-bold leading-tight tracking-[-0.02em]">
                  {entry.title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Baseline endpoints */}
          <span className="absolute bottom-1 left-0 text-sm text-muted">
            {experience.startYear} —
          </span>
          <span className="absolute bottom-1 right-0 text-sm text-muted">
            — {experience.endLabel}
          </span>
        </div>

        {/* Company pill + controls */}
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous role"
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-300 hover:text-text"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={entry.company}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="inline-flex items-center gap-3 rounded-full bg-text px-6 py-3.5 font-display font-semibold text-bg"
            >
              <Briefcase size={18} strokeWidth={2.2} aria-hidden="true" />
              {entry.company}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next role"
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-300 hover:text-text"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>

        <p aria-live="polite" className="sr-only">
          {entry.period}: {entry.role} {entry.title} at {entry.company}
        </p>
      </div>
    </section>
  )
}
