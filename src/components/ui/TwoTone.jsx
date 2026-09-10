import Reveal from './Reveal'

/* The reference holds these at roughly 64px across breakpoints and lets the
   two tones wrap onto separate lines when space runs out, so the vw term is
   steep and the cap does most of the work. */
const SIZES = {
  lg: 'text-[clamp(2.5rem,9vw,4rem)]',
  md: 'text-[clamp(1.875rem,6vw,2.75rem)]',
}

/**
 * Section heading in the reference's two-tone style: a light-weight first
 * phrase followed by a bold one, e.g. "Projects **Done**".
 *
 * Defaults to h2 because most callers are sections of a page that already has
 * an h1 elsewhere. A route whose page title *is* this heading passes as="h1" —
 * without it those pages ship with no h1 at all.
 */
export default function TwoTone({
  light,
  bold,
  lede,
  id,
  className = '',
  size = 'lg',
  as: Heading = 'h2',
}) {
  return (
    <div className={`mx-auto flex max-w-2xl flex-col items-center text-center ${className}`}>
      <Reveal>
        <Heading id={id} className={`${SIZES[size]} leading-[1.05] tracking-[-0.03em]`}>
          <span className="font-light">{light} </span>
          <span className="font-bold">{bold}</span>
        </Heading>
      </Reveal>
      {lede && (
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-pretty text-muted">{lede}</p>
        </Reveal>
      )}
    </div>
  )
}
