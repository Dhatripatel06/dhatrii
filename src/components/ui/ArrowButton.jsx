import { ArrowUpRight } from 'lucide-react'

import Magnetic from './Magnetic'
import MotionLink from './MotionLink'

/**
 * The reference's signature CTA: a pill with a circular arrow badge sitting
 * inside its right edge. `tone="accent"` is the accent fill on dark;
 * `tone="outline"` is a bordered dark pill.
 *
 * Same-site hrefs render as next/link so routing stays client-side; external
 * ones stay plain anchors.
 */
export default function ArrowButton({
  as = 'a',
  href,
  children,
  tone = 'accent',
  className = '',
  ...rest
}) {
  const isAccent = tone === 'accent'
  const isInternal = as === 'a' && typeof href === 'string' && href.startsWith('/')

  return (
    <Magnetic
      as={isInternal ? MotionLink : as}
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 font-medium transition-colors duration-300 ${
        isAccent
          ? 'bg-accent text-bg hover:bg-text'
          : 'border border-line bg-white/[0.03] text-text hover:bg-white/[0.08]'
      } ${className}`}
      {...rest}
    >
      {children}
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
          isAccent ? 'bg-bg text-accent' : 'bg-white/[0.06] text-text'
        }`}
      >
        <ArrowUpRight
          size={18}
          strokeWidth={2.2}
          aria-hidden="true"
          className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
        />
      </span>
    </Magnetic>
  )
}
