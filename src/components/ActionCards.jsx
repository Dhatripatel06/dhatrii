import { motion, useReducedMotion } from 'framer-motion'
import { Rocket, Phone } from 'lucide-react'
import { actionCards } from '../data/content'
import { Stagger, StaggerItem } from './ui/Stagger'
import { SPRING } from './ui/motion'

const ICONS = { Rocket, Phone }

/**
 * The two action buttons that close the services card — a plain one and an
 * accent-outlined one, sharing a row at the foot of the card as in the
 * reference. Rendered by <Services>, not as a section of its own.
 */
export default function ActionCards() {
  const reduce = useReducedMotion()

  return (
    <Stagger className="mt-3 flex gap-2.5">
      {actionCards.map((card) => {
        const Icon = ICONS[card.icon] ?? Rocket
        return (
          <StaggerItem key={card.label} className="flex-1">
            <motion.a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { y: -3 }}
              transition={SPRING}
              className={`group flex items-center justify-center gap-3 rounded-[20px] border px-4 py-5 transition-colors duration-500 ${
                card.outlined
                  ? 'border-accent bg-surface hover:bg-accent/[0.06]'
                  : 'border-line bg-surface hover:border-white/[0.16]'
              }`}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
                className="shrink-0 text-accent transition-transform duration-500 motion-safe:group-hover:scale-110"
              />
              <span className="font-display text-[0.95rem] font-bold tracking-tight sm:text-base">
                {card.label}
              </span>
            </motion.a>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
