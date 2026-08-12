import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Star, Globe, ArrowUpRight, Twitter, Instagram, Github, Linkedin } from 'lucide-react'
import { hero, profile, socials } from '../data/content'
import SmartImage from './ui/SmartImage'
import ArrowButton from './ui/ArrowButton'
import { SPRING_ENTER, HIDDEN_OPACITY, HERO_PARALLAX } from './ui/motion'

const ICONS = { Twitter, Instagram, Github, Linkedin }

/**
 * Hero built as a single device mockup: a bezelled frame whose upper half is
 * the portrait — with the "Hello" badge top-left and the name overlapping the
 * lower-right of the face — and whose lower half carries the intro, quote,
 * rating and CTAs, exactly as the reference stacks them inside one frame.
 */
export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })
  const imageY = useTransform(smooth, [0, 1], [0, HERO_PARALLAX])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-40">
      {/* Ambient background + oversized ghost type behind the frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grain opacity-50" />
        <div className="absolute left-1/2 top-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[150px]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[22vw] font-bold leading-none text-white/[0.025]">
          {profile.firstName}
        </span>
      </div>

      <div className="shell">
        {/* -------------------------------------------------- Device frame -- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={SPRING_ENTER}
          className="relative mx-auto w-full max-w-[640px] rounded-[52px] bg-gradient-to-b from-[#b4b4b4] via-[#4a4a4a] to-[#232323] p-[5px] shadow-card"
        >
          {/* Side buttons on the bezel */}
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[22%] h-16 w-[3px] rounded-l-full bg-gradient-to-b from-[#9a9a9a] to-[#4a4a4a]"
          />
          <span
            aria-hidden="true"
            className="absolute -left-[3px] top-[34%] h-24 w-[3px] rounded-l-full bg-gradient-to-b from-[#9a9a9a] to-[#4a4a4a]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-[3px] top-[28%] h-20 w-[3px] rounded-r-full bg-gradient-to-b from-[#9a9a9a] to-[#4a4a4a]"
          />

          <div className="overflow-hidden rounded-[47px] bg-bg">
            {/* ------------------------------------------------- Portrait -- */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div style={reduce ? undefined : { y: imageY }} className="absolute inset-0">
                <SmartImage
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}, ${profile.role}`}
                  /* No placeholder caption here — the name already overlays
                     the photo, and a second label competes with it. */
                  label=""
                  tint="accent"
                  eager
                  sizes="(min-width: 640px) 640px, 100vw"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Scrim so the name stays readable over the photo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent"
              />

              {/* "👋 Hello" — top-left, inside the frame */}
              <motion.p
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING_ENTER, delay: 0.6 }}
                className="absolute left-7 top-7 flex items-center gap-2 font-display text-lg font-semibold text-text"
              >
                <span aria-hidden="true">👋</span>
                {hero.hello}
              </motion.p>

              {/* Name — overlapping the lower-right of the face. The two lines
                  converge on entry (first drops, second rises), matching the
                  reference's -20px / +20px pairing. */}
              <h1 className="absolute inset-x-6 bottom-6 text-right leading-[0.92] tracking-[-0.035em] sm:inset-x-8 sm:bottom-8">
                {[profile.firstName, profile.lastName].map((word, index) => (
                  <motion.span
                    key={word}
                    className={`block pb-[0.05em] text-[clamp(2.75rem,9.5vw,5.25rem)] ${
                      index === 0 ? 'font-bold' : 'font-light'
                    }`}
                    initial={
                      reduce ? false : { opacity: HIDDEN_OPACITY, y: index === 0 ? -20 : 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING_ENTER, delay: 0.2 + index * 0.2 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* ---------------------------------------------------- Intro -- */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_ENTER, delay: 0.8 }}
              className="flex flex-col gap-7 px-7 pb-8 pt-6 sm:px-9 sm:pb-10"
            >
              {/* Handle bar separating the photo from the intro */}
              <span
                aria-hidden="true"
                className="mx-auto h-[5px] w-36 rounded-full bg-white/85"
              />

              {/* Role, then socials stacked beneath it */}
              <div className="flex flex-col gap-6">
                <p className="text-[1.05rem] leading-snug text-text">
                  {hero.roleLead} <span className="font-semibold">{hero.roleBold}</span>
                  <br />
                  {hero.roleTail}
                </p>
                <ul className="flex gap-2.5">
                  {socials.slice(0, 3).map((social) => {
                    const Icon = ICONS[social.icon] ?? Github
                    return (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${profile.name} on ${social.label}`}
                          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.05] text-text transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                        >
                          <Icon size={17} strokeWidth={2} aria-hidden="true" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Quote */}
              <p className="text-[clamp(1.35rem,3.4vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-text">
                {hero.quote}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <span className="flex gap-1 text-accent" aria-hidden="true">
                  {Array.from({ length: hero.rating.stars }).map((_, index) => (
                    <Star key={index} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="text-sm text-muted">
                  <span className="sr-only">Rated {hero.rating.stars} out of 5 — </span>
                  {hero.rating.label}
                </span>
              </div>

              {/* CTAs — full width stacked on narrow frames, inline once wide */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ArrowButton
                  href={hero.primaryCta.href}
                  className="justify-between sm:justify-start"
                >
                  {hero.primaryCta.label}
                </ArrowButton>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-line bg-white/[0.03] px-7 py-4 font-medium text-text transition-colors duration-300 hover:bg-white/[0.08]"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>

              {/* Footer row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm">
                <span className="inline-flex items-center gap-2 text-muted">
                  <Globe size={15} strokeWidth={2} aria-hidden="true" />
                  Available <span className="font-semibold text-text">Worldwide</span>
                </span>
                <a
                  href={hero.contactLink.href}
                  className="link-underline inline-flex items-center gap-1.5 font-medium text-text"
                >
                  {hero.contactLink.label}
                  <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
