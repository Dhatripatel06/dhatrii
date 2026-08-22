'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { closing } from '@/data/content'
import { socialIcon } from '@/lib/icons'
import SmartImage from '@/components/ui/SmartImage'
import Reveal from '@/components/ui/Reveal'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'
import { SPRING } from '@/lib/motion'

/**
 * The two cards that close the page above the footer, side by side from `sm`
 * up as in the reference: a full-bleed social invite carrying a glyph badge
 * and the wordmark, then an accent panel listing what you get, as tag pills.
 * The grid stretches both to a common height.
 */
export default function Closing() {
  const reduce = useReducedMotion()
  const { social, whyChoose } = closing
  const SocialIcon = socialIcon(social.icon)

  return (
    <section aria-label="More about working together" className="pb-16">
      <div className="shell grid gap-5 sm:grid-cols-2">
        {/* ------------------------------------------- Social invite card -- */}
        <Reveal className="h-full">
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduce ? undefined : { y: -6 }}
            transition={SPRING}
            className="group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-card border border-line p-7"
          >
            {/* Absolute so a missing file's placeholder tile cannot take part
                in the flex flow and push the heading off the card. */}
            <span aria-hidden="true" className="absolute inset-0">
              <SmartImage
                src={social.image}
                alt=""
                label=""
                tint="accent"
                sizes="(min-width: 736px) 360px, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth motion-safe:group-hover:scale-[1.04]"
              />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20"
            />

            {/* Glyph badge, top-left */}
            <span
              aria-hidden="true"
              className="absolute left-7 top-6 grid h-11 w-11 place-items-center rounded-2xl border border-line bg-bg/60 text-accent backdrop-blur-sm transition-colors duration-500 group-hover:border-accent/40"
            >
              <SocialIcon size={19} strokeWidth={2} />
            </span>

            <div className="relative">
              <span className="font-display text-sm font-bold text-accent">
                <span aria-hidden="true">.</span>
                {social.label}
              </span>

              <div className="mt-2 flex items-end justify-between gap-4">
                <h2 className="text-[clamp(1.625rem,5.5vw,2.25rem)] leading-[1.05] tracking-[-0.03em]">
                  <span className="block font-light">{social.titleLight}</span>
                  <span className="block font-bold">{social.titleBold}</span>
                </h2>
                <ArrowUpRight
                  size={40}
                  strokeWidth={1.3}
                  aria-hidden="true"
                  className="shrink-0 text-text transition-transform duration-500 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                />
              </div>
            </div>
          </motion.a>
        </Reveal>

        {/* ----------------------------------------------- Why choose card -- */}
        <Reveal className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-accent p-7 text-bg sm:p-8">
            {/* Dot-grid flourish, top-right */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-7 top-7 h-20 w-20 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
                backgroundSize: '11px 11px',
              }}
            />

            <h2 className="relative text-[clamp(1.625rem,5.5vw,2.25rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="block font-light">{whyChoose.titleLight}</span>
              <span className="block font-bold">{whyChoose.titleBold}</span>
            </h2>

            <Stagger as="ul" className="relative mt-8 flex flex-wrap gap-2" gap={0.06}>
              {whyChoose.tags.map((tag) => (
                <StaggerItem
                  key={tag}
                  as="li"
                  y={12}
                  className="rounded-full bg-bg px-4 py-2 text-sm font-medium text-text"
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
