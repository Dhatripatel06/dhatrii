'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Globe, ArrowUpRight } from 'lucide-react'
import { pricing, whatsappHref } from '@/data/content'
import TwoTone from '@/components/ui/TwoTone'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import { EASE, SPRING } from '@/lib/motion'

/**
 * A package toggle above a single plan card with an accent hairline border,
 * pinstripe texture, oversized price and a feature list below it.
 *
 * Pricing is per fixed scope, never per hour, and INR leads the USD line —
 * most enquiries come from Gujarat, so that is the number they are comparing.
 */
export default function Pricing() {
  const reduce = useReducedMotion()
  const [activeKey, setActiveKey] = useState(pricing.plans[0].key)
  const plan = pricing.plans.find((item) => item.key === activeKey) ?? pricing.plans[0]

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="section">
      <div className="shell">
        <TwoTone
          id="pricing-heading"
          light={pricing.titleLight}
          bold={pricing.titleBold}
          lede={pricing.lede}
        />

        {/* Toggle */}
        <Reveal className="mt-10 flex justify-center">
          {/* An equal-column grid rather than flex-wrap: four labels of
              different widths wrapped 3 + 1 and left "Maintenance" stranded on
              its own row. Two even rows on a phone, one row of four from `sm`,
              and the active pill fills its column so every tab reads the same
              size whatever the label length. */}
          <div
            role="tablist"
            aria-label="Pricing plans"
            className="grid w-full grid-cols-2 gap-1 rounded-[28px] border border-line bg-surface p-1.5 sm:grid-cols-4"
          >
            {pricing.plans.map((item) => {
              const isActive = item.key === activeKey
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  id={`price-tab-${item.key}`}
                  aria-selected={isActive}
                  aria-controls={`price-panel-${item.key}`}
                  onClick={() => setActiveKey(item.key)}
                  className={`relative rounded-full px-1.5 py-2.5 text-[0.8rem] font-medium leading-tight transition-colors duration-300 sm:text-[0.9rem] ${
                    isActive ? 'text-bg' : 'text-text/80 hover:text-text'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pricing-toggle"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={reduce ? { duration: 0 } : SPRING}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Card */}
        <Reveal delay={0.08} className="mt-10">
          {/* pt-5 absorbs the priced panel's -mt-5 lift, so the section keeps
              its original vertical rhythm. */}
          <div className="mx-auto max-w-3xl pt-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={plan.key}
                id={`price-panel-${plan.key}`}
                role="tabpanel"
                aria-labelledby={`price-tab-${plan.key}`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {/* Outer sheet. The priced panel below is inset by this
                    padding and pulled up past the top edge, so the sheet reads
                    as a card stacked behind it — the reference's layering. */}
                <div className="rounded-card border border-line bg-sunken p-3 pt-0 shadow-card sm:p-4 sm:pt-0">
                  <div className="pinstripe relative -mt-5 overflow-hidden rounded-[26px] border border-accent/45 bg-surface p-8 shadow-card sm:p-11">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.08] blur-3xl"
                    />

                    <h3 className="relative font-display text-[clamp(2rem,4.4vw,3rem)] font-bold tracking-[-0.03em]">
                      {plan.name}
                    </h3>
                    <p className="relative mt-3 text-muted">{plan.tagline}</p>

                    {/* INR carries the display size; USD sits under it for
                        overseas enquiries. A `unit` only exists on the retainer. */}
                    <div className="relative mt-8">
                      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="font-display text-[clamp(1.9rem,5.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em]">
                          {plan.priceInr}
                        </span>
                        {plan.unit && (
                          <span className="font-display text-xl font-light text-muted">
                            {plan.unit}
                          </span>
                        )}
                      </p>
                      <p className="mt-2 font-display text-lg font-light text-muted">
                        {plan.priceUsd}
                        {plan.unit ? ` ${plan.unit}` : ''}
                      </p>
                    </div>

                    {/* Stacked and centred until the reference's ~810px tablet
                        breakpoint, then split to opposite ends of the card. */}
                    <div className="relative mt-10 flex flex-col items-center gap-4 min-[810px]:flex-row min-[810px]:justify-between">
                      <ArrowButton href={whatsappHref} target="_blank" rel="noopener noreferrer">
                        {plan.cta}
                      </ArrowButton>
                      <span className="text-sm font-semibold text-text">{plan.delivery}</span>
                    </div>
                  </div>

                  {/* Features */}
                  {/* No border here — the reference's feature panel reads as a
                      lifted surface on the darker sheet, not an outlined card. */}
                  <ul className="mt-3 flex flex-col gap-4 rounded-[26px] bg-surface p-8 sm:p-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-text/85">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* These are ranges, and the card has to say so where the
                      numbers are, not only in the section lede. */}
                  <p className="px-5 pt-6 text-sm leading-relaxed text-muted sm:px-6">
                    {pricing.disclaimer}
                  </p>

                  {/* Footer row, sitting on the sheet below the feature panel */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-2 pt-5 text-sm sm:px-6">
                    <span className="inline-flex items-center gap-2 text-muted">
                      <Globe size={15} strokeWidth={2} aria-hidden="true" />
                      {pricing.note}
                    </span>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1.5 font-medium text-accent"
                    >
                      Contact me
                      <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
