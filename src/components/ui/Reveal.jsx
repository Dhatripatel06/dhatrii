'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { HIDDEN_OPACITY, SPRING_ENTER, VIEWPORT } from '@/lib/motion'

/**
 * Fade + slide up when scrolled into view, on the reference's entry spring
 * (stiffness 300 / damping 60 / mass 1 — fast, no overshoot). Runs once.
 * Reduced-motion users get a plain element with no transform.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  transition = SPRING_ENTER,
  as = 'div',
  ...rest
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: HIDDEN_OPACITY, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...transition, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
