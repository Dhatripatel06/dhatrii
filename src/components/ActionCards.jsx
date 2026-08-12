import { motion, useReducedMotion } from 'framer-motion'
import { Rocket, Phone } from 'lucide-react'
import { actionCards } from '../data/content'
import { Stagger, StaggerItem } from './ui/Stagger'
import { SPRING } from './ui/motion'

const ICONS = { Rocket, Phone }

/**
 * Two tall, full-width action cards below the services panel — the first
 * plain, the second outlined in the accent colour, as in the reference.
 */
export default function ActionCards() {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Get started" className="pb-16 sm:pb-20">
      <div className="shell">
        <Stagger className="flex flex-col gap-5">
          {actionCards.map((card) => {
            const Icon = ICONS[card.icon] ?? Rocket
            return (
              <StaggerItem key={card.label}>
                <motion.a
                  href={card.href}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={SPRING}
                  className={`group flex items-center gap-5 rounded-card border px-7 py-8 transition-colors duration-500 sm:px-10 sm:py-10 ${
                    card.outlined
                      ? 'border-accent bg-surface hover:bg-accent/[0.06]'
                      : 'border-line bg-surface hover:border-white/[0.16]'
                  }`}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="shrink-0 text-accent transition-transform duration-500 motion-safe:group-hover:scale-110"
                  />
                  <span className="font-display text-[clamp(1.25rem,4vw,1.75rem)] font-bold tracking-tight">
                    {card.label}
                  </span>
                </motion.a>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
