import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { work, projects } from '../data/content'
import SmartImage from './ui/SmartImage'
import TwoTone from './ui/TwoTone'
import ArrowButton from './ui/ArrowButton'
import Reveal from './ui/Reveal'
import { SPRING } from './ui/motion'

/**
 * Large stacked project cards: full-bleed image on top, then a title row with
 * lowercase tags and a circular arrow button, matching the reference.
 */
export default function Projects() {
  const reduce = useReducedMotion()

  return (
    <section id="work" aria-labelledby="work-heading" className="section">
      <div className="shell">
        <TwoTone id="work-heading" light={work.titleLight} bold={work.titleBold} lede={work.lede} />

        {/* Sticky stack: each card pins a little lower than the one before it,
            so the next card slides up and covers the previous one. */}
        <ul className="mt-14 flex flex-col gap-8 sm:mt-16">
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className="sticky"
              style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}
            >
              <motion.article
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={SPRING}
                className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors duration-500 hover:border-white/[0.14]"
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                  <SmartImage
                    src={project.image}
                    alt={project.title}
                    label={project.title}
                    tint={project.tint}
                    sizes="(min-width: 1024px) 1200px, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-smooth motion-safe:group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent"
                  />
                </div>

                <div className="flex items-center justify-between gap-6 p-7 sm:p-9">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-2xl font-bold tracking-tight sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{project.tags}</p>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-text transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-bg sm:h-16 sm:w-16">
                    <ArrowUpRight
                      size={24}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="transition-transform duration-500 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </motion.article>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <ArrowButton href={work.cta.href}>{work.cta.label}</ArrowButton>
        </Reveal>
      </div>
    </section>
  )
}
