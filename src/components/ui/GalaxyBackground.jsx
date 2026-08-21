'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Fixed starfield behind the whole page.
 *
 * Drawn on a canvas rather than as DOM nodes so a few hundred stars cost one
 * paint instead of hundreds of layers. The nebula washes are rendered once to
 * an offscreen buffer on resize and blitted each frame — building the radial
 * gradients per frame is what makes this kind of effect expensive.
 *
 * Stars drift against scroll by a per-star depth factor, which reads as
 * parallax. Under prefers-reduced-motion it paints a single static frame and
 * never starts the loop.
 */

/* Positions are viewport-relative; colours match the site accent family. */
const NEBULAE = [
  { x: 0.16, y: 0.1, r: 0.62, rgb: '76, 201, 255', alpha: 0.1 },
  { x: 0.86, y: 0.34, r: 0.55, rgb: '129, 140, 248', alpha: 0.09 },
  { x: 0.46, y: 0.78, r: 0.6, rgb: '52, 211, 153', alpha: 0.045 },
]

export default function GalaxyBackground() {
  const reduce = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let stars = []
    let nebula = null
    let frame = null

    const seedStars = () => {
      const target = Math.round((width * height) / 8600)
      const count = Math.min(Math.max(target, 90), 340)
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.05 + 0.25,
        alpha: Math.random() * 0.45 + 0.22,
        speed: Math.random() * 0.8 + 0.35,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.6 + 0.15,
      }))
    }

    /* Pre-render the nebula washes once; they only change on resize. */
    const buildNebula = () => {
      nebula = document.createElement('canvas')
      nebula.width = width
      nebula.height = height
      const nctx = nebula.getContext('2d')
      if (!nctx) return
      const longest = Math.max(width, height)
      NEBULAE.forEach((n) => {
        const cx = n.x * width
        const cy = n.y * height
        const gradient = nctx.createRadialGradient(cx, cy, 0, cx, cy, n.r * longest)
        gradient.addColorStop(0, `rgba(${n.rgb}, ${n.alpha})`)
        gradient.addColorStop(1, `rgba(${n.rgb}, 0)`)
        nctx.fillStyle = gradient
        nctx.fillRect(0, 0, width, height)
      })
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      if (nebula) ctx.drawImage(nebula, 0, 0)

      const scrolled = window.scrollY || 0
      ctx.fillStyle = '#ffffff'

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i]
        const twinkle = reduce ? 1 : 0.62 + 0.38 * Math.sin(time * 0.001 * s.speed + s.phase)
        // Wrap vertically so the field never runs out as the page scrolls.
        const y = (((s.y * height - scrolled * s.depth * 0.06) % height) + height) % height
        ctx.globalAlpha = s.alpha * twinkle
        ctx.beginPath()
        ctx.arc(s.x * width, y, s.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    const loop = (time) => {
      draw(time)
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
    }

    const start = () => {
      if (reduce || frame !== null) return
      frame = requestAnimationFrame(loop)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedStars()
      buildNebula()
      draw(0)
    }

    /* Don't burn frames on a hidden tab. */
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    start()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />
  )
}
