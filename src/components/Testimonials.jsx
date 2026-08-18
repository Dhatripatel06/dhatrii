import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '../data/content'
import TwoTone from './ui/TwoTone'
import Reveal from './ui/Reveal'
import { EASE } from './ui/motion'

/**
 * One testimonial at a time: name and role top-left, an accent pixel score block
 * top-right, then the quote, stars and dot pagination — the reference layout.
 */
export default function Testimonials() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const items = testimonials.items
  const item = items[index]

  return (
    <section aria-labelledby="testimonials-heading" className="section">
      <div className="shell">
        <TwoTone
          id="testimonials-heading"
          light={testimonials.titleLight}
          bold={testimonials.titleBold}
          lede={testimonials.lede}
        />

        <Reveal className="mt-14">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-card border border-line bg-surface">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.name}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {/* Header: attribution + pixel score */}
                <div className="flex items-start justify-between gap-6 p-7 pb-0 sm:p-9 sm:pb-0">
                  <figcaption>
                    <span className="block font-display text-xl font-bold leading-tight sm:text-2xl">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{item.role}</span>
                  </figcaption>
                  <span className="grid shrink-0 place-items-center rounded-2xl bg-accent px-5 py-2">
                    <span className="font-pixel text-4xl font-bold leading-none text-bg sm:text-5xl">
                      {item.score}
                    </span>
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="px-7 pb-2 pt-10 text-center sm:px-12">
                  <span aria-hidden="true" className="block text-5xl leading-none text-muted/50">
                    ”
                  </span>
                  <p className="mt-4 text-pretty text-[clamp(1.1rem,2.3vw,1.5rem)] font-medium leading-[1.45]">
                    “{item.quote}”
                  </p>
                </blockquote>

                {/* Stars */}
                <div className="flex justify-center gap-1 pt-6 text-accent">
                  {Array.from({ length: item.stars }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  ))}
                  <span className="sr-only">{item.name}</span>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 p-7 sm:p-9">
                  {items.map((dot, dotIndex) => {
                    const isActive = dotIndex === index
                    return (
                      <button
                        key={dot.name}
                        type="button"
                        onClick={() => setIndex(dotIndex)}
                        aria-label={`Show ${dot.name}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`grid place-items-center rounded-full transition-all duration-300 ${
                          isActive
                            ? 'h-8 w-8 border border-line bg-white/[0.05]'
                            : 'h-8 w-8 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span
                          className={`rounded-full transition-all duration-300 ${
                            isActive ? 'h-2 w-2 bg-text' : 'h-1.5 w-1.5 bg-muted/60'
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
