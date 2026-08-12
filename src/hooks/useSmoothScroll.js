import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

/**
 * Inertial smooth scrolling, matching the reference's feel — the viewport
 * eases toward the target rather than tracking the wheel 1:1.
 *
 * The instance is exposed on `window.__lenis` so anchor navigation can hand
 * off to it instead of fighting it with native scrollIntoView.
 *
 * Disabled entirely under prefers-reduced-motion, which leaves native
 * scrolling untouched.
 */
export default function useSmoothScroll() {
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

    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete window.__lenis
    }
  }, [reduce])
}
