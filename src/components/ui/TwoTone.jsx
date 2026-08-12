import Reveal from './Reveal'

/**
 * Section heading in the reference's two-tone style: a light-weight first
 * phrase followed by a bold one, e.g. "Projects **Done**".
 */
export default function TwoTone({ light, bold, lede, id, className = '', size = 'lg' }) {
  /* The reference holds these at roughly 64px across breakpoints and lets the
     two tones wrap onto separate lines when space runs out, so the vw term is
     steep and the cap does most of the work. */
  const sizes = {
    lg: 'text-[clamp(2.5rem,9vw,4rem)]',
    md: 'text-[clamp(1.875rem,6vw,2.75rem)]',
  }

  return (
    <div className={`mx-auto flex max-w-2xl flex-col items-center text-center ${className}`}>
      <Reveal>
        <h2 id={id} className={`${sizes[size]} leading-[1.05] tracking-[-0.03em]`}>
          <span className="font-light">{light} </span>
          <span className="font-bold">{bold}</span>
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-pretty text-muted">{lede}</p>
        </Reveal>
      )}
    </div>
  )
}
