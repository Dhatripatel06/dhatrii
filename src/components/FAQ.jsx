import { useState, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { faqs } from '../data/content'
import TwoTone from './ui/TwoTone'
import Reveal from './ui/Reveal'
import { SPRING_ACCORDION, STAGGER } from './ui/motion'

export default function FAQ() {
  const reduce = useReducedMotion()
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section aria-labelledby="faq-heading" className="section">
      <div className="shell">
        <TwoTone
          id="faq-heading"
          light={faqs.titleLight}
          bold={faqs.titleBold}
          lede={faqs.lede}
        />

        <ul className="mx-auto mt-14 flex max-w-3xl flex-col gap-3">
          {faqs.items.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <Reveal key={item.q} as="li" delay={index * STAGGER}>
                {/* No accent outline on the open card — the reference keeps
                    open and closed items visually identical. */}
                <div
                  className={`overflow-hidden rounded-card border border-line transition-colors duration-300 ${
                    isOpen ? 'bg-surface' : 'bg-surface/60 hover:bg-surface'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-8 sm:py-6"
                    >
                      <span className="font-display text-[1.05rem] font-semibold sm:text-[1.15rem]">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={reduce ? { duration: 0 } : SPRING_ACCORDION}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-text transition-colors duration-300 ${
                          isOpen ? 'bg-white/[0.08]' : ''
                        }`}
                      >
                        <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={
                          reduce ? { duration: 0 } : { ...SPRING_ACCORDION, opacity: { duration: 0.25 } }
                        }
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-pretty text-muted sm:px-8 sm:pb-7">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </ul>

        {/* Closing prompt below the accordion */}
        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-muted">{faqs.footerNote}</p>
          <a
            href={faqs.footerCta.href}
            className="mt-3 inline-flex items-center gap-2.5 font-medium text-text underline underline-offset-4 transition-colors duration-300 hover:text-accent"
          >
            <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            {faqs.footerCta.label}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
