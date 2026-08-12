import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { closing } from '../data/content'
import SmartImage from './ui/SmartImage'
import Reveal from './ui/Reveal'
import { Stagger, StaggerItem } from './ui/Stagger'
import { SPRING } from './ui/motion'

/**
 * The two cards that close the page above the footer: a full-bleed social
 * invite, then an accent panel listing what you get, as tag pills.
 */
export default function Closing() {
  const reduce = useReducedMotion()
  const { social, whyChoose } = closing

  return (
    <section aria-label="More about working together" className="pb-16">
      <div className="shell flex flex-col gap-5">
        {/* ------------------------------------------- Social invite card -- */}
        <Reveal>
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduce ? undefined : { y: -6 }}
            transition={SPRING}
            className="group relative block overflow-hidden rounded-card border border-line"
          >
            <div className="relative aspect-[16/11] sm:aspect-[16/9]">
              <SmartImage
                src={social.image}
                alt=""
                label=""
                tint="neutral"
                sizes="(min-width: 736px) 640px, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth motion-safe:group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-bg/25"
              />
            </div>

            {/* Wordmark, top-left */}
            <span className="absolute left-7 top-6 font-display text-sm font-bold text-accent">
              <span aria-hidden="true">.</span>
              {social.label}
            </span>

            {/* Heading + arrow */}
            <div className="absolute inset-x-7 bottom-6 flex items-end justify-between gap-6">
              <h2 className="text-[clamp(1.75rem,6.5vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
                <span className="block font-light">{social.titleLight}</span>
                <span className="block font-light">{social.titleBold}</span>
              </h2>
              <ArrowUpRight
                size={48}
                strokeWidth={1.3}
                aria-hidden="true"
                className="shrink-0 text-text transition-transform duration-500 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
              />
            </div>
          </motion.a>
        </Reveal>

        {/* ----------------------------------------------- Why choose card -- */}
        <Reveal>
          <div className="relative overflow-hidden rounded-card bg-accent p-8 text-bg sm:p-10">
            {/* Dot-grid flourish, top-right */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-8 top-8 h-24 w-24 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
                backgroundSize: '11px 11px',
              }}
            />

            <h2 className="relative text-[clamp(1.75rem,6.5vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="block font-light">{whyChoose.titleLight}</span>
              <span className="block font-bold">{whyChoose.titleBold}</span>
            </h2>

            <Stagger as="ul" className="relative mt-9 flex flex-wrap gap-2.5" gap={0.06}>
              {whyChoose.tags.map((tag) => (
                <StaggerItem
                  key={tag}
                  as="li"
                  y={12}
                  className="rounded-full bg-bg px-5 py-2.5 text-[0.95rem] font-medium text-text"
                >
                  {tag}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
