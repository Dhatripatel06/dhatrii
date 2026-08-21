'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

import { setLenis } from '@/lib/lenis'

/**
 * Starts inertial smooth scrolling for the whole document — the viewport eases
 * toward the target rather than tracking the wheel 1:1 — and publishes the
 * instance through `@/lib/lenis` so anchor navigation can hand off to it
 * instead of fighting it with native scrollIntoView.
 *
 * Renders nothing, and is disabled entirely under prefers-reduced-motion,
 * which leaves native scrolling untouched.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      // Exponential ease-out: quick to respond, long settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    setLenis(lenis)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduce])

  return null
}
