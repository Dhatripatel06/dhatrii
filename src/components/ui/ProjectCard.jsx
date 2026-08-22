'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import SmartImage from '@/components/ui/SmartImage'
import { SPRING } from '@/lib/motion'

/**
 * The one project card. Home stacks these stickily, /projects lists them
 * plainly, and both link through to the case study at /projects/<slug>.
 *
 * The whole card is the link — the circular arrow is decorative, so there is
 * a single tab stop per project rather than two overlapping ones.
 */
export default function ProjectCard({ project, eager = false }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={SPRING}
      className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors duration-500 hover:border-white/[0.14]"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
          <SmartImage
            src={project.image}
            alt={project.title}
            label={project.title}
            tint={project.tint}
            eager={eager}
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
          <span
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-text transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-bg sm:h-16 sm:w-16"
          >
            <ArrowUpRight
              size={24}
              strokeWidth={1.8}
              className="transition-transform duration-500 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
