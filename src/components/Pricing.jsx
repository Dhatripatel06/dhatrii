import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Globe, ArrowUpRight } from 'lucide-react'
import { pricing } from '../data/content'
import TwoTone from './ui/TwoTone'
import ArrowButton from './ui/ArrowButton'
import Reveal from './ui/Reveal'
import { EASE, SPRING } from './ui/motion'

/**
 * Basic / Premium toggle above a single plan card with an accent hairline border,
 * pinstripe texture, oversized price and a feature list below it.
 */
export default function Pricing() {
  const reduce = useReducedMotion()
  const [activeKey, setActiveKey] = useState(pricing.plans[1].key)
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
          <div
            role="tablist"
            aria-label="Pricing plans"
            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1.5"
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
                  className={`relative rounded-full px-8 py-2.5 font-medium transition-colors duration-300 ${
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
          <div className="mx-auto max-w-3xl">
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
                <div className="pinstripe relative overflow-hidden rounded-card border border-accent/45 bg-sunken p-8 shadow-card sm:p-11">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.08] blur-3xl"
                  />

                  <h3 className="relative font-display text-[clamp(2rem,4.4vw,3rem)] font-bold tracking-[-0.03em]">
                    {plan.name}
                  </h3>
                  <p className="relative mt-3 text-muted">{plan.tagline}</p>

                  <p className="relative mt-8 flex items-baseline gap-2">
                    <span className="font-display text-[clamp(3rem,8vw,5rem)] font-bold leading-none tracking-[-0.04em]">
                      {plan.price}
                    </span>
                    <span className="font-display text-2xl font-light text-muted">{plan.unit}</span>
                  </p>

                  {/* Stacked and centred until the reference's ~810px tablet
                      breakpoint, then split to opposite ends of the card. */}
                  <div className="relative mt-10 flex flex-col items-center gap-4 min-[810px]:flex-row min-[810px]:justify-between">
                    <ArrowButton href="#contact">{plan.cta}</ArrowButton>
                    <span className="text-sm text-muted">{plan.delivery}</span>
                  </div>
                </div>

                {/* Features */}
                {/* No border here — the reference's feature panel reads as a
                    slightly lifted surface, not an outlined card. */}
                <ul className="mt-4 flex flex-col gap-4 rounded-card bg-sunken p-8 sm:p-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-text/85">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Footer row */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 text-muted">
                    <Globe size={15} strokeWidth={2} aria-hidden="true" />
                    {pricing.note}
                  </span>
                  <a
                    href="#contact"
                    className="link-underline inline-flex items-center gap-1.5 font-medium text-accent"
                  >
                    Contact me
                    <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
