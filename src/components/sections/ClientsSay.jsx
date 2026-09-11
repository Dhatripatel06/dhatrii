'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

import { approvedTestimonials, clientTestimonials } from '@/data/content'
import Reveal from '@/components/ui/Reveal'
import TwoTone from '@/components/ui/TwoTone'
import { EASE } from '@/lib/motion'

/**
 * Client testimonials, directly above the pricing section so a real
 * endorsement is the last thing read before the numbers.
 *
 * One card at a time with prev/next and dot controls. Everything shown is
 * something the person actually said: no star rating, no photograph, no
 * satisfaction percentage and no review count, because none of those were
 * given. The reference layout carries a percentage in its top right; there is
 * deliberately no equivalent here.
 */

/* "Vishrut Donda" -> "VD". Decorative: the name is rendered as text beside it,
   so identity never depends on reading the avatar. */
const initialsOf = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

export default function ClientsSay() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  const items = approvedTestimonials
  const count = items.length
  const item = items[index]
  const step = (delta) => setIndex((current) => (current + delta + count) % count)

  /* Left/right anywhere in the carousel, so the control is reachable without
     tabbing onto the arrow buttons first. */
  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
  }

  return (
    <section aria-labelledby="clients-say-heading" className="section">
      <div className="shell">
        <TwoTone
          id="clients-say-heading"
          light={clientTestimonials.titleLight}
          bold={clientTestimonials.titleBold}
          lede={clientTestimonials.lede}
        />

        <Reveal className="mt-14">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className="relative overflow-hidden rounded-card border border-line bg-surface shadow-card"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl"
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.name}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative p-8 sm:p-11"
              >
                <figcaption className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-accent/40 bg-bg/60 font-display text-lg font-bold tracking-tight text-accent sm:h-16 sm:w-16 sm:text-xl"
                  >
                    {initialsOf(item.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {[item.project, item.location].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </figcaption>

                <blockquote className="mt-9 text-center">
                  <span
                    aria-hidden="true"
                    className="block font-display text-5xl leading-none text-muted/40"
                  >
                    &rdquo;
                  </span>
                  <p className="mt-4 text-pretty text-[clamp(1.05rem,2.4vw,1.4rem)] font-medium leading-[1.5]">
                    {item.quote}
                  </p>
                </blockquote>

                {/* Only ever rendered when the person actually gave a rating. */}
                {typeof item.rating === 'number' && (
                  <div className="mt-7 flex justify-center gap-1 text-accent">
                    {Array.from({ length: item.rating }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={16}
                        fill="currentColor"
                        strokeWidth={0}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                )}
              </motion.figure>
            </AnimatePresence>

            {/* Controls only exist when there is more than one to move between. */}
            {count > 1 && (
              <div className="relative flex items-center justify-center gap-2 px-6 pb-8 sm:pb-10">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-white/[0.05] hover:text-text"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>

                {items.map((dot, dotIndex) => {
                  const isActive = dotIndex === index
                  return (
                    <button
                      key={dot.name}
                      type="button"
                      onClick={() => setIndex(dotIndex)}
                      aria-label={`Show the testimonial from ${dot.name}`}
                      aria-current={isActive ? 'true' : undefined}
                      className="grid h-8 w-8 place-items-center rounded-full transition-colors duration-300 hover:bg-white/[0.04]"
                    >
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          isActive ? 'h-2 w-2 bg-accent' : 'h-1.5 w-1.5 bg-muted/50'
                        }`}
                      />
                    </button>
                  )
                })}

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next testimonial"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-white/[0.05] hover:text-text"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Announces the change to screen readers without moving focus. */}
            <p aria-live="polite" className="sr-only">
              Testimonial {index + 1} of {count}, from {item.name}, {item.project}, {item.location}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
