import { useState } from 'react'

/**
 * Lazy-loaded image that fades in once decoded. When the file is missing it
 * degrades to a labelled gradient tile instead of a broken-image icon, so the
 * layout stays intact before real assets are dropped in.
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
  wrapperClassName = '',
  tint = 'neutral',
  sizes,
  eager = false,
}) {
  const [status, setStatus] = useState('loading')

  if (status === 'error') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
          TINTS[tint] ?? TINTS.neutral
        } ${wrapperClassName}`}
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
          className={`absolute inset-0 bg-gradient-to-br ${TINTS[tint] ?? TINTS.neutral}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        // React 18 passes this through only in lowercase; camelCase warns.
        fetchpriority={eager ? 'high' : undefined}
        decoding="async"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        className={`${className} transition-opacity duration-700 ease-smooth ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
