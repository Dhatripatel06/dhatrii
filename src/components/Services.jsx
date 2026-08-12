import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/content'
import TwoTone from './ui/TwoTone'
import Reveal from './ui/Reveal'
import { EASE, SPRING } from './ui/motion'

/**
 * Tabbed services panel: a segmented accent pill selector above a card carrying
 * an outlined experience badge, the title, body, an oversized ghost numeral
 * and a large arrow — the reference's layout.
 */
export default function Services() {
  const reduce = useReducedMotion()
  const [activeKey, setActiveKey] = useState(services.tabs[0].key)
  const active = services.tabs.find((tab) => tab.key === activeKey) ?? services.tabs[0]

  return (
    <section id="services" aria-labelledby="services-heading" className="section">
      <div className="shell">
        <TwoTone
          id="services-heading"
          light={services.titleLight}
          bold={services.titleBold}
          lede={services.lede}
        />

        {/* One card holding the tab group and the panel, as in the reference */}
        <Reveal delay={0.08} className="mt-12">
          <div className="relative overflow-hidden rounded-card border border-line bg-surface p-3 sm:p-4">
            {/* Tab group: stacked full-width on mobile, one row from sm up */}
            <div
              role="tablist"
              aria-label="Service areas"
              className="flex flex-col gap-2 rounded-[26px] border border-line bg-bg/50 p-2 sm:flex-row sm:gap-1"
            >
              {services.tabs.map((tab) => {
                const isActive = tab.key === activeKey
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    id={`tab-${tab.key}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.key}`}
                    onClick={() => setActiveKey(tab.key)}
                    className={`relative flex-1 rounded-full px-6 py-3.5 text-[0.95rem] font-medium transition-colors duration-300 ${
                      isActive ? 'text-bg' : 'text-text/80 hover:text-text'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="services-tab"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={reduce ? { duration: 0 } : SPRING}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Panel */}
            <div className="px-5 pb-6 pt-10 sm:px-8 sm:pb-10 sm:pt-14">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.key}
                  id={`panel-${active.key}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${active.key}`}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="inline-flex rounded-full border border-accent px-4 py-1.5 text-sm font-medium text-accent">
                    {active.badge}
                  </span>

                  <h3 className="mt-7 font-display text-[clamp(2rem,7vw,3.5rem)] font-bold tracking-[-0.03em]">
                    {active.title}
                  </h3>

                  <p className="mt-5 max-w-lede text-pretty text-muted">{active.body}</p>

                  <div className="mt-12 flex items-end justify-between gap-6">
                    {/* Ghost numeral */}
                    <span
                      aria-hidden="true"
                      className="select-none font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-none text-white/[0.045]"
                    >
                      {active.number}
                    </span>
                    <a
                      href="#contact"
                      aria-label={`Enquire about ${active.title}`}
                      className="group shrink-0 text-text transition-colors duration-300 hover:text-accent"
                    >
                      <ArrowUpRight
                        size={56}
                        strokeWidth={1.4}
                        aria-hidden="true"
                        className="transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                      />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
