'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * next/image in `fill` mode that fades in once decoded. When the file is
 * missing — `src` is empty, or the request 404s — it degrades to a labelled
 * gradient tile instead of a broken-image icon, so the layout stays intact
 * before real assets are dropped in.
 *
 * The parent must be a positioned box with a definite height — every caller
 * wraps it in either an aspect-ratio box or an inset-0 layer.
 */
/* Kept deliberately low-contrast so a missing file reads as an empty photo
   area rather than a coloured block competing with the type over it. */
const TINTS = {
  accent: 'from-[#4CC9FF]/12 via-[#1A1A1A] to-[#0A0A0A]',
  violet: 'from-[#8B5CF6]/14 via-[#1A1A1A] to-[#0A0A0A]',
  emerald: 'from-[#34D399]/14 via-[#1A1A1A] to-[#0A0A0A]',
  indigo: 'from-[#818CF8]/14 via-[#1A1A1A] to-[#0A0A0A]',
  neutral: 'from-white/[0.07] via-[#1A1A1A] to-[#0A0A0A]',
}

export default function SmartImage({
  src,
  alt,
  label,
  className = '',
  tint = 'neutral',
  sizes,
  eager = false,
}) {
  const [status, setStatus] = useState('loading')
  const gradient = TINTS[tint] ?? TINTS.neutral

  /* A null src never reaches next/image: requesting a path that is not
     there would 404 on every render and log an optimiser error. */
  if (!src || status === 'error') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
      >
        <span className="px-6 text-center font-display text-xs uppercase tracking-[0.18em] text-white/25">
          {label ?? alt}
        </span>
      </div>
    )
  }

  return (
    <>
      {/* Placeholder tone underneath prevents a white flash on dark surfaces. */}
      {status === 'loading' && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={eager}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        className={`${className} transition-opacity duration-700 ease-smooth ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
