'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { HIDDEN_OPACITY, SPRING_ENTER, STAGGER, VIEWPORT } from '@/lib/motion'

/** Container revealing <StaggerItem> children a flat 0.2s apart. */
export function Stagger({ children, className, delay = 0, gap = STAGGER, as = 'div', ...rest }) {
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
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className, y = 20, as = 'div', ...rest }) {
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
      variants={{
        hidden: { opacity: HIDDEN_OPACITY, y },
        show: { opacity: 1, y: 0, transition: SPRING_ENTER },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
