'use client'

import { useCallback, useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'

import { MAGNET_MAX } from '@/lib/motion'

const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

const SPRING_CONFIG = { stiffness: 260, damping: 20, mass: 0.5 }

/**
 * Subtle magnetic hover — the element drifts toward the cursor but never
 * travels more than MAGNET_MAX (6px), then springs back on exit.
 * Reduced-motion users get an ordinary, untransformed element.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.35,
  max = MAGNET_MAX,
  as = 'button',
  ...rest
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(0, SPRING_CONFIG)
  const y = useSpring(0, SPRING_CONFIG)

  const onMove = useCallback(
    (event) => {
      const node = ref.current
      if (!node) return
      const box = node.getBoundingClientRect()
      x.set(clamp((event.clientX - (box.left + box.width / 2)) * strength, max))
      y.set(clamp((event.clientY - (box.top + box.height / 2)) * strength, max))
    },
    [strength, max, x, y],
  )

  const reset = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  const Tag = motion[as] ?? motion.button

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
